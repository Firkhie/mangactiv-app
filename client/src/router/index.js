import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import MangasPage from '../views/MangasPage.vue'
import DetailPage from '../views/DetailPage.vue'
import LibraryPage from '../views/LibraryPage.vue'
import ReadPage from '../views/ReadPage.vue'

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
      path: '/mangas/:pageId',
      name: 'mangas',
      component: MangasPage
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPage
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryPage
    },
    {
      path: '/read/:chapterId/:pageId',
      name: 'read',
      component: ReadPage
    },
  ]
})

export default router
