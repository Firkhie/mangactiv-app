const { default: axios } = require("axios");

class MangaController {
  // Helper function untuk mengambil data author
  static async fetchAuthor(authorId) {
    const authorResponse = await axios.get(`https://api.mangadex.org/author/${authorId}`);
    return authorResponse.data.data.attributes.name;
  }

  // Helper function untuk mengambil data cover manga
  static async fetchCover(mangaId) {
    const coverResponse = await axios.get(`https://api.mangadex.org/cover/${mangaId}`);
    const coverFileName = coverResponse.data.data.attributes.fileName;
    return `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}`;
  }

  // Helper function untuk mengambil data chapter
  static async fetchChapters(mangaId) {
    const mangaChapters = await axios.get(`https://api.mangadex.org/manga/${mangaId}/aggregate`);
    const chapters = Object.keys(mangaChapters.data.volumes.none.chapters).map((chapterId) => {
      const chapter = mangaChapters.data.volumes.none.chapters[chapterId];
      return {
        id: chapter.id,
        chapter: chapter.chapter,
        pageCount: chapter.count
      };
    });
    return chapters;
  }

  // Fetch mangas
  static async fetchMangas(req, res, next) {
    try {
      let limitPage;
      let offsetPage;
      let queryOfParams;

      // Pengaturan apa saja manga yang akan diambil
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
      } else if (req.path.startsWith('/allmangas/')) {
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
            const authorName = await MangaController.fetchAuthor(authorId);

            // Pengambilan gambar cover manga
            const coverArtId = mangaData.relationships.find((relation) => relation.type === 'cover_art').id;
            const coverUrl = await MangaController.fetchCover(coverArtId);

            // Pengambilan latest chapter
            const chapters = await MangaController.fetchChapters(mangaId);
            const latestChapter = chapters[chapters.length - 1].chapter;

            // Hasil pengambilan data
            return {
              id: mangaData.id,
              name: mangaData.attributes.title.en,
              description: mangaData.attributes.description.en,
              status: mangaData.attributes.status,
              year: mangaData.attributes.year,
              tags: mangaData.attributes.tags.map((tag) => tag.attributes.name.en),
              coverArt: coverUrl,
              latestChapter: latestChapter,
              authorName: authorName,
            };
          } catch (err) {
            console.log(err);
            throw err; // Lebih baik lemparkan kembali kesalahan di sini
          }
        })
      );

      let responseObj = { mangaDataArray };

      if (req.path.startsWith('/allmangas/')) {
        const nextPage = offsetPage / limitPage + 1;
        responseObj = { ...responseObj, nextPage };
      }

      res.status(200).json(responseObj);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // Fetch manga detail
  static async fetchMangaDetail(req, res, next) {
    try {
      const { id } = req.params;

      // Cari manga sesuai ID
      const manga = await axios({
        url: `https://api.mangadex.org/manga/${id}`,
        method: 'get',
      });
      const mangaData = manga.data.data;

      // Pengambilan gambar cover manga
      const coverArtId = mangaData.relationships.find((relation) => relation.type === 'cover_art').id;
      const coverUrl = await MangaController.fetchCover(coverArtId);

      // Pengambilan daftar chapter
      const chapters = await MangaController.fetchChapters(id);
      const totalChapters = chapters.length;

      // Hasil pengambilan data
      res.status(200).json({
        id: mangaData.id,
        name: mangaData.attributes.title.en,
        description: mangaData.attributes.description.en,
        status: mangaData.attributes.status,
        year: mangaData.attributes.year,
        tags: mangaData.attributes.tags.map((tag) => tag.attributes.name.en),
        coverArt: coverUrl,
        latestChapter: mangaData.attributes.latestUploadedChapter,
        totalChapters: totalChapters,
        chapters: chapters,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async fetchMangaPages(req, res, next) {
    try {
      // Mendapatkan URL Images
      const { chapterId, pageId } = req.params
      const chapterImages = await axios({
        url: `https://api.mangadex.org/at-home/server/${chapterId}`,
        method: 'get'
      })
      let chapterImageUrl = `${chapterImages.data.baseUrl}/data/${chapterImages.data.chapter.hash}/${chapterImages.data.chapter.data[pageId]}`

      // Mengubah URL menjadi response stream
      const response = await axios({
        method: 'GET',
        url: chapterImageUrl,
        responseType: 'stream',
      });
      res.setHeader('Content-Type', 'image/jpeg');
      response.data.pipe(res);
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = MangaController;
