import './assets/style.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(vue3GoogleLogin, {
  clientId: '729192810869-pj3n9e3gnchnv73e3iscfr68utepo8i0.apps.googleusercontent.com'
})

app.use(pinia)
app.use(router)

app.mount('#app')



