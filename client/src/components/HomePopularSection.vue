<template>
  <section class="popular">
    <h1>Popular Titles</h1>
    <div class="popular-content">
      <HomePopularCard />
    </div>
  </section>
</template>

<script>
import HomePopularCard from './HomePopularCard.vue';

export default {
  name: 'HomePopularSection',
  components: {
    HomePopularCard
  }
}
</script>

<style scoped></style>
