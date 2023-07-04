<template>
  <section class="latest">
    <h1>Latest Updates</h1>
    <div class="latest-content">
      <HomeLatestCard />
    </div>
    <div class="see-more">
      <button class="see-more-btn">See More</button>
    </div>
  </section>
</template>

<script>
import HomeLatestCard from './HomeLatestCard.vue'

export default {
  name: 'HomeLatestSection',
  components: {
    HomeLatestCard
  }
}
</script>

<style scoped></style>
