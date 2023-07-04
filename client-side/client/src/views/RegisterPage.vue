<template>
  <NavbarSection />
  <section class="register">
    <div class="register-content">
      <h2>Register</h2>
      <form id="register-form">
        <label for="register-username">Username</label>
        <input
          type="text"
          id="register-username"
          placeholder="Enter username ..."
          autocomplete="off"
          required
        />
        <label for="register-email">Email</label>
        <input
          type="email"
          id="register-email"
          placeholder="Enter email address ..."
          autocomplete="off"
          required
        />
        <label for="register-password">Password</label>
        <input
          type="password"
          id="register-password"
          placeholder="Enter password ..."
          autocomplete="off"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  </section>
</template>

<script>
import NavbarSection from '../components/NavbarSection.vue';

export default {
  name: 'RegisterPage',
  components: {
    NavbarSection
  }
}
</script>

<style scoped></style>
