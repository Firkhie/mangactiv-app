<template>
  <NavbarSection />
  <section class="read-manga">
    <h1>Damedol to Sekai ni Hitori Dake no Fan</h1>
    <h2>Chapter 3</h2>
    <div class="read-manga-content">
      <div class="manga-image">
        <img src="../assets/chapter-page-3.png" alt="" />
      </div>
    </div>
    <div class="pagination">
      <button>Previous</button>
      <span>1</span>
      <button>Next</button>
    </div>
  </section>
  <FooterSection />
</template>

<script>
import NavbarSection from '../components/NavbarSection.vue'
import FooterSection from '../components/FooterSection.vue';

export default {
  name: 'ReadPage',
  components: {
    NavbarSection,
    FooterSection
  }
}
</script>

<style scoped></style>
