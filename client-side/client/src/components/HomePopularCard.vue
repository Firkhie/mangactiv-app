<template>
  <div class="box" v-for="popularManga in popularMangas" @click.prevent="mangaDetail(popularManga.id)">
    <div class="left">
      <img v-bind:src="popularManga.coverArt" alt="" />
    </div>
    <div class="right">
      <div class="genres">
        <span>{{ popularManga.tags[0] }}</span>
        <span>{{ popularManga.tags[1] }}</span>
        <span>{{ popularManga.tags[2] }}</span>
      </div>
      <div class="title">
        <h4>{{ popularManga.name }}</h4>
      </div>
      <div class="description">
        <h5>{{ popularManga.description }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'HomePopularCard',
  computed: {
    ...mapState(useCounterStore, ['popularMangas'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchPopularMangas', 'failLoadRefresh']),
    mangaDetail(id) {
      this.$router.push(`/mangadetail/${id}`)
      this.failLoadRefresh()
    }
  },
  async created() {
    await this.fetchPopularMangas()
  }
}
</script>

<style scoped>
.description {
  margin-top: 10px;
  height: 120px;
  overflow: hidden;
}
</style> */