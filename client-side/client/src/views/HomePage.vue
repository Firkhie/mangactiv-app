<template>
  <NavbarSection />
  <HomePopularSection />
  <HomeLatestSection />
  <FooterSection />
</template>

<script>
import NavbarSection from '../components/NavbarSection.vue';
import FooterSection from '../components/FooterSection.vue';
import HomePopularSection from '../components/HomePopularSection.vue';
import HomeLatestSection from '../components/HomeLatestSection.vue';

export default {
  name: 'HomePage',
  components: {
    NavbarSection,
    FooterSection,
    HomePopularSection,
    HomeLatestSection
  }
}
</script>

<style scoped></style>