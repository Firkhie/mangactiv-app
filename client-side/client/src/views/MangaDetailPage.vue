<template>
  <NavbarCustom />
  <section class="manga-detail" v-if="!isFailLoadData">
    <div class="manga-detail-content">
      <MangaDetailCard />
    </div>
    <div class="manga-chapter-content">
      <MangaDetailChapterCard />
    </div>
  </section>
  <section class="notfound" v-if="isFailLoadData">
    <h1>404: Page Not Found</h1>
  </section>
  <FooterCustom />
</template>

<script>
import NavbarCustom from '../components/NavbarCustom.vue';
import MangaDetailCard from '../components/MangaDetailCard.vue';
import MangaDetailChapterCard from '../components/MangaDetailChapterCard.vue';
import FooterCustom from '../components/FooterCustom.vue';
import { mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'MangaDetailPage',
  components: {
    NavbarCustom,
    MangaDetailCard,
    MangaDetailChapterCard,
    FooterCustom
  },
  computed: {
    ...mapState(useCounterStore, ['isFailLoadData'])
  },
}
</script>
<style scoped>
.notfound {
  margin-top: 5rem;
  margin-bottom: 15rem;
}
</style>
