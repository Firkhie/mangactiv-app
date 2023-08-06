import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import AllMangasPage from '../views/AllMangasPage.vue'
import MangaDetailPage from '../views/MangaDetailPage.vue'
import ReadMangaPage from '../views/ReadMangaPage.vue'
import MyLibraryPage from '../views/MyLibraryPage.vue'
import DonationPage from '../views/DonationPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/allmangas/:pageId',
      name: 'allmangas',
      component: AllMangasPage
    },
    {
      path: '/mangadetail/:id',
      name: 'mangadetail',
      component: MangaDetailPage
    },
    {
      path: '/readmanga/:chapterId/:pageId',
      name: 'readmanga',
      component: ReadMangaPage
    },
    {
      path: '/mylibrary',
      name: 'mylibrary',
      component: MyLibraryPage
    },
    {
      path: '/donation',
      name: 'donation',
      component: DonationPage
    },
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem('access_token')
  
  if (!isAuthenticated && to.name == 'mylibrary') next('/')
  if (isAuthenticated && to.name == 'login') next('/')
  if (isAuthenticated && to.name == 'register') next('/')
  // if (to.matched.length === 0) next(from.path)
  next()
})

export default router
