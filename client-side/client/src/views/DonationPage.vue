<template>
  <NavbarCustom />
  <section class="donation">
    <div class="donation-content">
      <h2>Donate Now</h2>
      <form id="donation-form" @submit.prevent="submitDonation">
        <label for="donation-name">Name</label>
        <input
          v-model="name"
          type="text"
          id="donation-name"
          placeholder="Enter name ..."
          autocomplete="off"
          required
        />
        <label for="donation-email">Email</label>
        <input
          v-model="email"
          type="email"
          id="donation-email"
          placeholder="Enter email address ..."
          autocomplete="off"
          required
        />
        <label for="donation-phone">Phone Number</label>
        <input
          v-model="phoneNumber"
          type="text"
          id="donation-phone"
          placeholder="Enter phone number (optional) ..."
          autocomplete="off"
        />
        <!-- <div class="donation-box">
          <label>Pilih Jumlah Donasi:</label><br />
          <button type="submit" name="donation" value="10000">Rp 10.000</button>
          <button type="submit" name="donation" value="20000">Rp 20.000</button>
          <button type="submit" name="donation" value="50000">Rp 50.000</button>
          <button type="submit" name="donation" value="100000">Rp 100.000</button>
        </div> -->
        <label for="donation-amount">Amount</label>
        <input
          v-model="grossAmount"
          type="text"
          id="donation-amount"
          placeholder="Enter amount ..."
          autocomplete="off"
        />
        <button type="submit">Donate</button>
      </form>
    </div>
  </section>
</template>

<script>
import NavbarCustom from '../components/NavbarCustom.vue';
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  name: 'DonationPage',
  data() {
    return {
      name: '',
      email: '',
      phoneNumber: '',
      grossAmount: 0
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['donation']),
    submitDonation() {
      this.donation(this.name, this.email, this.phoneNumber, this.grossAmount)
    }
  },
  components: {
    NavbarCustom
  }
}
</script>
