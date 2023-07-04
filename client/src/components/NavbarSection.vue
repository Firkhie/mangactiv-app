<template>
  <header>
    <a href="" id="logo">Mangactiv</a>
    <div class="navbar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/mangas/:pageId">All Mangas</RouterLink>
      <RouterLink to="/library">My Library</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <a id="logout-btn">Logout</a>
    </div>
    <div class="bx bx-menu" id="menu-icon"></div>
  </header>
</template>

<script>
export default {
  name: 'NavbarSection',
  mounted() {
    let menu = document.querySelector('#menu-icon')
    let navbar = document.querySelector('.navbar')

    menu.onclick = () => {
      menu.classList.toggle('bx-x')
      navbar.classList.toggle('active')
    }

    window.onscroll = () => {
      menu.classList.remove('bx-x')
      navbar.classList.remove('active')
    }
  }
}
</script>

<style scoped>
#logout-btn {
  cursor: pointer;
}
</style>
