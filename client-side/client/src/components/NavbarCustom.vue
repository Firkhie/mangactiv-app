<template>
  <header>
    <RouterLink to="/"><a class="logo">Mangactiv</a></RouterLink>
    <div class="navbar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/allmangas/0">All Mangas</RouterLink>
      <RouterLink to="/mylibrary" v-if="access_token">My Library</RouterLink>
      <RouterLink to="/donation">Donate</RouterLink>
      <RouterLink to="/login" v-if="!access_token">Login</RouterLink>
      <a id="logout-btn" @click.prevent="logout" v-if="access_token">Logout</a>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'NavbarCustom',
  methods: {
    ...mapActions(useCounterStore, ['handleLogout', 'fetchPopularMangas', 'fetchUpdatedMangas', 'fetchAllMangas', 'fetchBookmarks']),
    logout() {
      this.handleLogout()      
    },
    async toHomePage() {
      await this.fetchPopularMangas()
      await this.fetchUpdatedMangas()
    },
    async toAllMangasPage() {
      let page = 0
      await this.fetchAllMangas(page)
    },
    async toLibraryPage() {
      await this.fetchBookmarks()
    }
  },
  computed: {
    access_token() {
      return localStorage.access_token
    }
  }
}
</script>

<style scoped>
  #logout-btn {
    cursor: pointer;
  }
</style>
