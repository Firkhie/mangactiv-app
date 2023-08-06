<template>
  <div class="box" v-for="updatedManga in updatedMangas" @click.prevent="mangaDetail(updatedManga.id)">
    <div class="left">
      <img v-bind:src="updatedManga.coverArt" alt="" />
    </div>
    <div class="right">
      <div class="manga-name">
        <h4>{{ updatedManga.name }}</h4>
      </div>
      <div class="manga-latest">
        <p>Chapter {{ updatedManga.latestChapter }}</p>
      </div>
      <div class="manga-author">
        <h5>{{ updatedManga.authorName }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'HomeLatestCard',
  computed: {
    ...mapState(useCounterStore, ['updatedMangas'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchUpdatedMangas']),
    mangaDetail(id) {
      this.$router.push(`/mangadetail/${id}`)
    }
  },
  async created() {
    await this.fetchUpdatedMangas()
  }
}
</script>

<style scoped>
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 10px;
}
.manga-name {
  max-height: 50px;
  overflow: hidden;
}
.manga-author {
  margin-bottom: 0.5rem;
}
</style>
