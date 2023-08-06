<template>
  <div class="box" v-for="bookmark in bookmarks.bookmarks" @click.prevent="mangaDetail(bookmark.id)">
      <img v-bind:src="bookmark.coverArt" alt="" />
    <div class="wishlist">
      <a @click.prevent="submitDeleteBookmark(bookmark.bookmarkId)">
        <i class="bx bx-trash"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'MyLibraryCard',
  methods: {
    ...mapActions(useCounterStore, ['fetchBookmarks', 'deleteBookmark', 'failLoadRefresh']),
    async submitDeleteBookmark(id) {
      await event.stopPropagation();
      await this.deleteBookmark(id)
      await this.fetchBookmarks()
    },
    mangaDetail(id) {
      this.$router.push(`/mangadetail/${id}`)
      this.failLoadRefresh()
    }
  },
  computed: {
    ...mapState(useCounterStore, ['bookmarks'])
  },
  async created() {
    await this.fetchBookmarks()
  }
}
</script>

<style scoped>

</style>
