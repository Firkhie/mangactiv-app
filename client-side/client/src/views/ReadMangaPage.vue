<template>
  <NavbarCustom />
  <section class="read-manga">
    <h1>{{ mangaName }}</h1>
    <h2>Chapter {{ openedChapter }}</h2>
    <div class="read-manga-content">
      <div class="manga-image">
        <img v-bind:src="mangaPageUrl" alt="" />
      </div>
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
import FooterCustom from '../components/FooterCustom.vue'
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'ReadMangaPage',
  data() {
    return {
      currentPage: 0,
      mangaName: localStorage.getItem('mangaName'),
      openedChapter: localStorage.getItem('openedChapter')
    }
  },
  components: {
    NavbarCustom,
    FooterCustom
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchMangaChapter']),
    goToPage(page) {
      if (page >= 0) {
        this.currentPage = page;
        this.fetchMangaChapter(this.$route.params.chapterId, this.currentPage)
      }
    }
  },
  computed: {
    ...mapState(useCounterStore, ['mangaPageUrl', 'mangaDetail'])
  },
  async created() {
    const chapterId = this.$route.params.chapterId;
    await this.fetchMangaChapter(chapterId, 0)
    // console.log(this.mangaPageUrl)
  }
}
</script>
