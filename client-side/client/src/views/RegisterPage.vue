<template>
  <NavbarCustom />
  <section class="register">
    <div class="register-content">
      <h2>Register</h2>
      <form id="register-form" @submit.prevent="submitRegister">
        <label for="register-username">Username</label>
        <input
          v-model="username"
          type="text"
          id="register-username"
          placeholder="Enter username ..."
          autocomplete="off"
          required
        />
        <label for="register-email">Email</label>
        <input
          v-model="email"
          type="email"
          id="register-email"
          placeholder="Enter email address ..."
          autocomplete="off"
          required
        />
        <label for="register-password">Password</label>
        <input
          v-model="password"
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
import NavbarCustom from '../components/NavbarCustom.vue';
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['handleRegister']),
    submitRegister() {
      this.handleRegister(this.username, this.email, this.password)
    }
  },
  components: {
    NavbarCustom
  }
}
</script>
