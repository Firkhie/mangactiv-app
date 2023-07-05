const { Bookmark } = require("../models")
const { default: axios } = require("axios")

class BookmarkController {
  static async createBookmark(req, res, next) {
    try {
      const { userId } = req.user
      const { id } = req.params

      // check apakah user sudah bookmark manga tersebut atau tidak
      const manga = await Bookmark.findOne({ where: { UserId: userId, MangaId: id } })
      if (manga) throw { name: 'DuplicatedManga' }

      // create new bookmark
      const newBookmark = await Bookmark.create({ UserId: userId, MangaId: id })
      res.status(201).json({ message: 'Create new bookmark success!' })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async fetchBookmarks(req, res, next) {
    const { userId } = req.user;
    try {
      const bookmarks = await Bookmark.findAll({ where: { UserId: userId } });
      const mangaDetails = [];

      for (const bookmark of bookmarks) {
        const mangaId = bookmark.MangaId;
        try {
          const mangaResponse = await axios.get(`https://api.mangadex.org/manga/${mangaId}`);
          const mangaData = mangaResponse.data.data;

          // Pengambilan gambar cover manga
          const coverArtId = mangaData.relationships.find(relation => relation.type === 'cover_art').id;
          const coverResponse = await axios.get(`https://api.mangadex.org/cover/${coverArtId}`);
          const coverFileName = coverResponse.data.data.attributes.fileName;
          const coverUrl = `https://uploads.mangadex.org/covers/${mangaData.id}/${coverFileName}`;

          const mangaDetail = {
            bookmarkId: bookmark.id,
            id: mangaData.id,
            name: mangaData.attributes.title.en,
            status: mangaData.attributes.status,
            year: mangaData.attributes.year,
            tags: mangaData.attributes.tags.map(tag => tag.attributes.name.en),
            coverArt: coverUrl,
          };

          mangaDetails.push(mangaDetail);
        } catch (err) {
          console.log(err);
        }
      }

      res.status(200).json({ UserId: userId, bookmarks: mangaDetails });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteBookmarkById(req, res, next) {
    try {
      const { userId } = req.user
      const { id } = req.params

      // check bookmark id ada atau tidak
      const bookmark = await Bookmark.findByPk(id)
      if (!bookmark) throw { name: 'BookmarkNotFound' }

      //authorization
      if (userId !== bookmark.UserId) throw { name: 'Forbidden' }

      await Bookmark.destroy({ where: { id } })
      res.status(200).json({
        message: `Success to delete id ${id}`,
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = BookmarkController