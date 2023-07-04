<template>
  <NavbarSection />
  <section class="all-mangas">
    <h1>All Mangas</h1>
    <div class="search-sort-box">
      <div class="search-box">
        <form class="search-form">
          <i class="bx bx-search-alt-2"></i>
          <input type="text" placeholder="Search..." class="search-input" />
        </form>
      </div>
      <div class="sort-box">
        <label for="sort-select">Sort By:</label>
        <select id="sort-select" class="sort-select">
          <option value="default">Default</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="date">Date</option>
        </select>
      </div>
    </div>
    <div class="all-mangas-content">
      <MangasCard />
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
import NavbarSection from '../components/NavbarSection.vue';
import FooterSection from '../components/FooterSection.vue';
import MangasCard from '../components/MangasCard.vue'

export default {
  name: 'MangasPage',
  components: {
    NavbarSection,
    FooterSection,
    MangasCard
  }
}
</script>

<style scoped></style>
