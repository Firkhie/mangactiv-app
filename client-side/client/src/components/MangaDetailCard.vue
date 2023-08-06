<template>
  <div class="box">
    <div class="left">
      <img v-bind:src="mangaDetail.coverArt" alt="" />
    </div>
    <div class="right">
      <div class="genres" v-if="mangaDetail.tags">
        <span>{{ mangaDetail.tags[0] }}</span>
        <span>{{ mangaDetail.tags[1] }}</span>
        <span>{{ mangaDetail.tags[2] }}</span>
      </div>
      <h4>{{ mangaDetail.name }}</h4>
      <h5>{{ mangaDetail.description }}</h5>
      <div class="detail-button">
        <a @click.prevent="submitAddBookmark(mangaDetail.id)"><i class="bx bx-bookmark"></i></a>
        <button>First Chapter</button>
        <button>Latest Chapter</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'MangaDetailCard',
  methods: {
    ...mapActions(useCounterStore, ['fetchMangaDetail', 'addBookmark', 'fetchBookmarks']),
    submitAddBookmark(id) {
      this.addBookmark(id)
      this.fetchBookmarks()
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
