const { default: axios } = require("axios")
const { comparePass } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { User, Bookmark } = require("../models")
const { OAuth2Client } = require('google-auth-library');

class Controller {
   static async register(req, res, next) {
      try {
         const { username, email, password } = req.body
         if (!username) throw { name: 'UsernameRequired' }
         if (!email) throw { name: 'EmailRequired' }
         if (!password) throw { name: 'PasswordRequired' }

         const createdUser = await User.create({ username, email, password })
         res.status(201).json({ id: createdUser.id, username: createdUser.username })
      } catch (err) {
         next(err)
      }
   }

   static async login(req, res, next) {
      try {
         const { email, password } = req.body
         if (!email) throw { name: 'EmailRequired' }
         if (!password) throw { name: 'PasswordRequired' }

         const user = await User.findOne({ where: { email } })
         if (user) {
            let checkPassword = comparePass(password, user.password)
            if (checkPassword) {
               let access_token = signToken({ id: user.id })
               res.status(200).json({ access_token })
            } else {
               throw { name: 'EmailPasswordInvalid' }
            }
         } else {
            throw { name: 'EmailPasswordInvalid' }
         }
      } catch (err) {
         next(err)
      }
   }

   static async googleLogin(req, res, next) {
      try {
         const { google_token } = req.headers

         const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
         const ticket = await client.verifyIdToken({
            idToken: google_token,
            audience: process.env.GOOGLE_CLIENT_ID,
         });

         const payload = ticket.getPayload();

         let user = await User.findOne({
            where: {
               email: payload.email
            }
         })

         const { given_name, email } = payload
         if (!user) {
            if (req.path === '/google-login') {
               user = await User.create({ username: given_name, email, password: String(Math.random()), role: 'Staff' })
            } else if (req.path === '/pub/google-login') {
               user = await User.create({ username: given_name, email, password: String(Math.random()), role: 'Customer' })
            }
         }
         const access_token = signToken({
            id: user.id
         })
         res.status(200).json({ access_token, email, role: user.role, username: user.username })
      } catch (err) {
         console.log(err)
         next(err)
      }
   }

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
         } else if (req.path === '/updatedmangas') {
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
         if (req.path.startsWith('/allmangas/')) {
            const nextPage = offsetPage / limitPage + 1;
            responseObj = { ...responseObj, nextPage };
         }

         res.status(200).json(mangaDataArray);
      } catch (err) {
         console.log(err);
         next(err);
      }
   }

   static async fetchMangaDetail(req, res, next) {
      try {
         const { id } = req.params
         // Cari manga sesuai ID
         const manga = await axios({
            url: `https://api.mangadex.org/manga/${id}`,
            method: 'get'
         })
         const mangaData = manga.data.data;
         // Pengambilan gambar cover manga
         const coverArtId = mangaData.relationships.find((relation) => relation.type === 'cover_art').id;
         const coverResponse = await axios({
            url: `https://api.mangadex.org/cover/${coverArtId}`,
            method: 'get'
         });
         const coverFileName = coverResponse.data.data.attributes.fileName;
         const coverUrl = `https://uploads.mangadex.org/covers/${mangaData.id}/${coverFileName}`;
         // Pengambilan daftar chapter
         const mangaChapters = await axios({
            url: `https://api.mangadex.org/manga/${id}/aggregate`,
            method: 'get'
         })
         // Total page pada setiap chapter
         const totalChapters = mangaChapters.data.volumes.none.count;
         // Pengambilan seluruh detail pada tiap chapter
         const chapters = Object.keys(mangaChapters.data.volumes.none.chapters).map((chapterId) => {
            const chapter = mangaChapters.data.volumes.none.chapters[chapterId];
            return {
               id: chapter.id,
               chapter: chapter.chapter,
               pageCount: chapter.count
            }
         })
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
         })
      } catch (err) {
         console.log(err)
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

   static async createBookmark(req, res, next) {
      try {
         const { userId } = req.user
         console.log(userId, 'INI USERID')
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

module.exports = Controller