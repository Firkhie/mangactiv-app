<template>
  <NavbarCustom />
  <section class="mylibrary">
    <h1>My Library</h1>
    <div class="mylibrary-content">
      <MyLibraryCard />
    </div>
  </section>
  <FooterCustom />
</template>

<script>
import NavbarCustom from '../components/NavbarCustom.vue'
import MyLibraryCard from '../components/MyLibraryCard.vue'
import FooterCustom from '../components/FooterCustom.vue'

export default {
  name: 'MyLibraryPage',
  components: {
    NavbarCustom,
    MyLibraryCard,
    FooterCustom
  }
}
</script>
