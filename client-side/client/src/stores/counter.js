import { defineStore } from 'pinia'
import axios from 'axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    // baseUrl: 'https://mangactivserver.online',
    baseUrl: 'http://localhost:3000',
    popularMangas: [],
    updatedMangas: [],
    allMangas: [],
    mangaDetail: [],
    mangaPageUrl: '',
    bookmarks: [],
    isFailLoadData: false
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    notifyDefault(message) {
      toast(message, { autoClose: 1000, type: 'default', theme: 'dark' })
    },
    notifySuccess(message) {
      toast(message, { autoClose: 1000, type: 'success', theme: 'dark' })
    },
    notifyWarning(message) {
      toast(message, { autoClose: 1000, type: 'warning', theme: 'dark' })
    },
    notifyError(message) {
      toast(message, { autoClose: 1000, type: 'error', theme: 'dark' })
    },
    failLoadRefresh() {
      this.isFailLoadData = false
    },
    async handleLogin(email, password) {
      try {
        let user = await axios({
          url: this.baseUrl + '/login',
          method: 'post',
          data: { email, password }
        })
        localStorage.setItem('access_token', user.data.access_token)
        this.router.push('/')
        this.notifySuccess('Login success!')
      } catch (err) {
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    async handleLoginGoogle(response) {
      try {
        const LoginGoogle = await axios({
          url: this.baseUrl + '/google-login',
          method: 'post',
          headers: {
            google_token: response.credential
          }
        })
        localStorage.setItem('access_token', LoginGoogle.data.access_token)
        this.router.push('/')
        this.notifySuccess('Login success!')
      } catch (err) {
        console.log(err)
      }
    },
    async handleRegister(username, email, password) {
      try {
        let user = await axios({
          url: this.baseUrl + '/register',
          method: 'post',
          data: { username, email, password }
        })
        this.router.push('/login')
        this.notifySuccess('Register success!')
      } catch (err) {
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    handleLogout() {
      localStorage.clear()
      this.router.push('/login')
    },
    async fetchPopularMangas() {
      try {
        let mangas = await axios({
          url: this.baseUrl + '/popularmangas',
          method: 'get'
        })
        this.popularMangas = mangas.data
      } catch (err) {
        console.log(err)
      }
    },
    async fetchUpdatedMangas() {
      try {
        let mangas = await axios({
          url: this.baseUrl + '/updatedmangas',
          method: 'get'
        })
        this.updatedMangas = mangas.data
      } catch (err) {
        console.log(err)
      }
    },
    async fetchAllMangas(pageId) {
      try {
        const parsedPageId = parseInt(pageId);
        let mangas = await axios({
          url: this.baseUrl + `/allmangas/${parsedPageId}`,
          method: 'get'
        })
        this.allMangas = mangas.data
      } catch (err) {
        console.log(err)
      }
    },
    async fetchMangaDetail(id) {
      try {
        let mangas = await axios({
          url: this.baseUrl + `/mangadetail/${id}`,
          method: 'get'
        })
        this.isFailLoadData = false
        this.mangaDetail = mangas.data
      } catch (err) {
        console.log(err)
        this.isFailLoadData = true
      }
    },
    async fetchMangaChapter(chapterId, pageId) {
      try {
        console.log(chapterId)
        console.log(pageId)
        let response = await axios({
          url: this.baseUrl + `/readmanga/${chapterId}/${pageId}`,
          method: 'get',
          responseType: 'arraybuffer',
        })
        console.log(response.data)
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        this.mangaPageUrl = URL.createObjectURL(blob);
        console.log(this.mangaPageUrl)
      } catch (err) {
        console.log(err, 'INI ERROR')
      }
    },
    async addBookmark(id) {
      try {
        const newBookmark = await axios({
          url: this.baseUrl + `/mylibrary/${id}`,
          method: 'post',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.notifySuccess('Add bookmark success!')
      } catch (err) {
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    async fetchBookmarks() {
      try {
        const bookmarks = await axios({
          url: this.baseUrl + '/mylibrary',
          method: 'get',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.bookmarks = bookmarks.data
      } catch (err) {
        console.log(err)
      }
    },
    async deleteBookmark(id) {
      try {
        const deletedBookmark = await axios({
          url: this.baseUrl + `/mylibrary/${id}`,
          method: 'delete',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.notifySuccess('Delete bookmark success!')
      } catch (err) {
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    async donation(name, email, phoneNumber, grossAmount) {
      try {
        const midtransToken = await axios({
          url: this.baseUrl + '/generate-midtrans-token',
          method: 'post',
          data: { name, email, phoneNumber, grossAmount }
        })
        window.snap.pay(midtransToken.data.token, {
          onSuccess: function(result){
            /* You may add your own implementation here */
            alert("payment success!"); console.log(result);
          }
        })
      } catch (err) {
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    }
  },
})