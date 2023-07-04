<template>
  <NavbarSection />
  <section class="my-library">
    <h1>My Library</h1>
    <div class="my-library-content">
      <LibraryCard />
    </div>
  </section>
  <FooterSection />
</template>

<script>
import NavbarSection from '../components/NavbarSection.vue';
import FooterSection from '../components/FooterSection.vue';
import LibraryCard from '../components/LibraryCard.vue';

export default {
  name: 'LibraryPage',
  components: {
    NavbarSection,
    FooterSection,
    LibraryCard
  }
}
</script>

<style scoped></style>
