<template>
  <NavbarCustom />
  <HeroCustom />
  <section class="popular">
    <h1>Popular Titles</h1>
    <div class="popular-content">
      <HomePopularCard />
    </div>
  </section>
  <section class="latest">
    <h1>Latest Updates</h1>
    <div class="latest-content">
      <HomeLatestCard />
    </div>
    <button class="see-more" @click.prevent="changePage">See More</button>
  </section>
  <FooterCustom />
</template>

<script>
import NavbarCustom from '../components/NavbarCustom.vue';
import HeroCustom from '../components/HeroCustom.vue'
import HomePopularCard from '../components/HomePopularCard.vue';
import HomeLatestCard from '../components/HomeLatestCard.vue';
import FooterCustom from '../components/FooterCustom.vue';
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'HomePage',
  components: {
    NavbarCustom,
    HeroCustom,
    HomePopularCard,
    HomeLatestCard,
    FooterCustom
  },
  methods: {
    ...mapActions(useCounterStore, ['failLoadRefresh']),
    changePage() {
      let page = 0
      this.$router.push(`/allmangas/${page}`)
      this.failLoadRefresh()
    }
  }
}
</script>
