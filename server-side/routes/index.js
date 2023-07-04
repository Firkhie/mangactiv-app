const MangaController = require('../controllers/mangaController')
const UserController = require('../controllers/userController')
const { authentication } = require('../middlewares/auth')
const router = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-login', UserController.googleLogin)

router.get('/popularmangas', MangaController.fetchMangas)
router.get('/latestmangas', MangaController.fetchMangas)
router.get('/allmangas/:pageId', MangaController.fetchMangas)
router.get('/mangadetail/:id', MangaController.fetchMangaDetail)
router.get('/readmanga/:chapterId/:pageId', MangaController.fetchMangaPages)

// router.use(authentication)
// router.post('/mylibrary/:id', Controller.createBookmark)
// router.get('/mylibrary', Controller.fetchBookmarks)
// router.delete('/mylibrary/:id', Controller.deleteBookmarkById)

module.exports = router