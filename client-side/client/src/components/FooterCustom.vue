<template>
  <section class="footer">
    <div class="footer-content">
      <div class="contact-box">
        <li><a>Shop</a></li>
        <li><a>About</a></li>
        <li><a>Faq</a></li>
        <li><a>Contact</a></li>
      </div>
      <div class="contact-box">
        <li><a>Shipping & Returns</a></li>
        <li><a>Store Policy</a></li>
        <li><a>Payment Methods</a></li>
      </div>
      <div class="contact-box">
        <li><a>Contact</a></li>
        <li><a>+62 123-4567-7891</a></li>
      </div>
      <div class="contact-box">
        <li><a>Facebook</a></li>
        <li><a>Instagram</a></li>
        <li><a>Pinterest</a></li>
      </div>
    </div>
    <div class="action">
      <form>
        <input type="email" name="email" placeholder="Your Email" disabled/>
        <input type="submit" name="submit" value="Submit" disabled/>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FooterCustom'
}
</script>
