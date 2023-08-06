<template>
  <NavbarCustom />
  <section class="login">
    <div class="login-content">
      <h2>Login</h2>
      <form id="login-form" @submit.prevent="submitLogin">
        <label for="login-email">Email</label>
        <input
          v-model="email"
          type="email"
          id="login-email"
          placeholder="Enter email address ..."
          autocomplete="off"
          required
        />
        <label for="login-password">Password</label>
        <input
          v-model="password"
          type="password"
          id="login-password"
          placeholder="Enter password ..."
          autocomplete="off"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a id="register-anchor" @click.prevent="toRegisterForm">Register here</a></p>
      <p>Or sign in with</p>
      <div id="google-container">
        <GoogleLogin :callback="submitLoginGoogle" prompt />
      </div>
    </div>
  </section>
</template>

<script>
import NavbarCustom from '../components/NavbarCustom.vue';
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
import { GoogleLogin } from 'vue3-google-login'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleLogin', 'handleLoginGoogle']),
    submitLogin() {
      this.handleLogin(this.email, this.password)
    },
    toRegisterForm() {
      this.$router.push('/register')
    },
    submitLoginGoogle(response) {
      this.handleLoginGoogle(response)
    }
  },
  components: {
    GoogleLogin,
    NavbarCustom
  }
}
</script>

<style scoped>
#register-anchor {
  cursor: pointer;
  color: blue;
}
#google-container {
  margin-top: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>