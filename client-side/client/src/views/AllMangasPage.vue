<template>
  <NavbarCustom />
  <section class="mangas">
    <h1>All Mangas</h1>
    <div class="search-sort-box">
      <div class="search">
        <form class="search-form">
          <input type="text" placeholder="Search..." class="search-input" />
          <button type="submit" class="search-button">Search</button>
        </form>
      </div>
      <div class="sort">
        <label for="sort-select">Sort By:</label>
        <select id="sort-select" class="sort-select">
          <option value="default">Default</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="date">Date</option>
        </select>
      </div>
    </div>
    <div class="mangas-content">
      <AllMangasCard />
    </div>
    <div class="pagination">
      <button @click="goToPage(currentPage - 1)">Previous</button>
      <span>{{ this.currentPage }}</span>
      <button @click="goToPage(currentPage + 1)">Next</button>
    </div>
  </section>
  <FooterCustom />
</template>

<script>
import NavbarCustom from '../components/NavbarCustom.vue'
import AllMangasCard from '../components/AllMangasCard.vue';
import FooterCustom from '../components/FooterCustom.vue'
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'AllMangasPage',
  data() {
    return {
      currentPage: 0
    }
  },
  components: {
    NavbarCustom,
    AllMangasCard,
    FooterCustom
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchAllMangas']),
    goToPage(page) {
      if (page >= 0) {
        this.currentPage = page;
        this.fetchAllMangas(this.currentPage)
      }
    }
  },
  async created() {
    const pageId = this.$route.params.pageId;
    await this.fetchAllMangas(pageId)
    // console.log(this.mangaChapter)
  }
}
</script>
