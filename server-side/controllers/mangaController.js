const { default: axios } = require("axios")

class MangaController {
  static async fetchMangas(req, res, next) {
    try {
      // Pengaturan apa saja manga yang akan diambil
      let limitPage;
      let offsetPage;
      let queryOfParams;

      if (req.path === '/popularmangas') {
        limitPage = 2;
        offsetPage = 0;
        queryOfParams = {
          'order[rating]': 'desc',
          'order[followedCount]': 'desc',
        };
      } else if (req.path === '/latestmangas') {
        limitPage = 6;
        offsetPage = 0;
        queryOfParams = {
          'order[latestUploadedChapter]': 'desc',
        };
      } else if (req.path.startsWith('/mangas/')) {
        const { pageId } = req.params;
        const parsedPageId = parseInt(pageId);

        if (isNaN(parsedPageId) || parsedPageId < 0) throw { name: 'NotFound' };

        limitPage = 8;
        offsetPage = 8 * parsedPageId;
        queryOfParams = {
          'order[latestUploadedChapter]': 'desc',
        };
      }

      // Pengambilan ID dari manga
      const mangasId = await axios.get('https://api.mangadex.org/manga', {
        params: {
          limit: limitPage,
          offset: offsetPage,
          ...queryOfParams,
        },
      });

      // Kumpulan dari ID manga
      const fetchedMangasId = mangasId.data.data.map((manga) => manga.id);

      // Promise.all digunakan agar dapat fetch seluruh data dari API
      const mangaDataArray = await Promise.all(
        fetchedMangasId.map(async (mangaId) => {
          try {
            // Pengambilan raw data manga dari ID yang di dapat
            const mangaResponse = await axios.get(`https://api.mangadex.org/manga/${mangaId}`);
            const mangaData = mangaResponse.data.data;
            // Pengambilan nama author
            const authorId = mangaData.relationships.find((relation) => relation.type === 'author').id;
            const authorResponse = await axios.get(`https://api.mangadex.org/author/${authorId}`);
            const authorName = authorResponse.data.data.attributes.name;
            // Pengambilan gambar cover manga
            const coverArtId = mangaData.relationships.find((relation) => relation.type === 'cover_art').id;
            const coverResponse = await axios.get(`https://api.mangadex.org/cover/${coverArtId}`);
            const coverFileName = coverResponse.data.data.attributes.fileName;
            const coverUrl = `https://uploads.mangadex.org/covers/${mangaData.id}/${coverFileName}`;
            // Pengambilan latest chapter
            const mangaChapters = await axios.get(`https://api.mangadex.org/manga/${mangaData.id}/aggregate`);
            const latestVolumes = Object.values(mangaChapters.data.volumes);
            const lastVolume = latestVolumes[latestVolumes.length - 1].volume;
            const lastChapters = Object.keys(latestVolumes[latestVolumes.length - 1].chapters);
            const lastChapter = lastChapters[lastChapters.length - 1];
            // Hasil pengambilan data
            return {
              id: mangaData.id,
              name: mangaData.attributes.title.en,
              description: mangaData.attributes.description.en,
              status: mangaData.attributes.status,
              year: mangaData.attributes.year,
              tags: mangaData.attributes.tags.map((tag) => tag.attributes.name.en),
              coverArt: coverUrl,
              latestChapter: lastChapter,
              authorName: authorName,
            };
          } catch (err) {
            console.log(err);
            throw err; // Lebih baik lemparkan kembali kesalahan di sini
          }
        })
      );

      let responseObj = { mangaDataArray };
      if (req.path.startsWith('/mangas/')) {
        const nextPage = offsetPage / limitPage + 1;
        responseObj = { ...responseObj, nextPage };
      }

      res.status(200).json(mangaDataArray);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = MangaController