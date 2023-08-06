<template>
  <div class="box" v-for="chapters in mangaDetail.chapters" @click.prevent="readManga(chapters.id, chapters.chapter)">
    <div class="left">
      <h4>{{ chapters.chapter }}</h4>
      <p>June 6, 2023</p>
    </div>
    <div class="right">
      <p>Flame Scans</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'MangaDetailChapterCard',
  methods: {
    ...mapActions(useCounterStore, ['fetchMangaDetail']),
    readManga(chapterId, openChapter) {
      this.$router.push(`/readmanga/${chapterId}/0`)
      localStorage.setItem('mangaName', this.mangaDetail.name)
      localStorage.setItem('openedChapter', openChapter)
    }
  },
  computed: {
    ...mapState(useCounterStore, ['mangaDetail'])
  },
  async created() {
    const id = this.$route.params.id;
    await this.fetchMangaDetail(id)
  }
}
</script>
