<template>
  <div class="box" v-for="allManga in allMangas" @click.prevent="mangaDetail(allManga.id)">
    <div class="left">
      <img v-bind:src="allManga.coverArt" alt="" />
    </div>
    <div class="right">
      <div class="genres">
        <span>{{ allManga.tags[0] }}</span>
        <span>{{ allManga.tags[1] }}</span>
        <span>{{ allManga.tags[2] }}</span>
      </div>
      <h4>{{ allManga.name }}</h4>
      <div class="rating">
        <p><i class="bx bx-star"></i></p>
        <p>9.00</p>
      </div>
    </div>
    <div class="wishlist">
      <a href="#"><i class="bx bx-bookmark"></i></a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'AllMangasCard',
  computed: {
    ...mapState(useCounterStore, ['allMangas'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchAllMangas', 'failLoadRefresh']),
    mangaDetail(id) {
      this.$router.push(`/mangadetail/${id}`)
      this.failLoadRefresh()
    }
  },
  async created() {
    await this.fetchAllMangas()
  }
}
</script>
