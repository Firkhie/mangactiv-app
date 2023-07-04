const Controller = require('../controllers')
const { authentication } = require('../middlewares/auth')
const router = require('express').Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/google-login', Controller.googleLogin)

router.get('/popularmangas', Controller.fetchMangas)
router.get('/updatedmangas', Controller.fetchMangas)
router.get('/allmangas/:pageId', Controller.fetchMangas)
router.get('/mangadetail/:id', Controller.fetchMangaDetail)
router.get('/readmanga/:chapterId/:pageId', Controller.fetchMangaPages)

router.use(authentication)
router.post('/mylibrary/:id', Controller.createBookmark)
router.get('/mylibrary', Controller.fetchBookmarks)
router.delete('/mylibrary/:id', Controller.deleteBookmarkById)

module.exports = router