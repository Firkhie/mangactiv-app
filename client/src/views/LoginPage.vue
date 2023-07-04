<template>
  <NavbarSection />
  <section class="login">
    <div class="login-content">
      <h2>Login</h2>
      <form id="login-form">
        <label for="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          placeholder="Enter email address ..."
          autocomplete="off"
          required
        />
        <label for="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          placeholder="Enter password ..."
          autocomplete="off"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="#">Register here</a></p>
      <p>Or login with</p>
    </div>
  </section>
</template>

<script>
import NavbarSection from '../components/NavbarSection.vue';

export default {
  name: 'LoginPage',
  components: {
    NavbarSection
  }
}
</script>

<style scoped></style>
