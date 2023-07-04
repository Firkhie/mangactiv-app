<template>
  <NavbarSection />
  <section class="manga-detail">
    <div class="manga-detail-content">
      <div class="card">
        <div class="left-card">
          <img src="../assets/cover-1.jpg" alt="" />
        </div>
        <div class="right-card">
          <div class="genres-status">
            <div class="genres">
              <span>Comedy</span>
              <span>Romance</span>
            </div>
            <div class="status">
              <i class="bx bxs-circle"></i>
              <span>Ongoing</span>
            </div>
          </div>
          <div class="title">
            <h4>
              Damedol to Sekai ni Hitori Dake no Fan Damedol to Sekai ni Hitori Dake no Fan Damedol
              to Sekai ni Hitori Dake no Fan Damedol to Sekai ni Hitori Dake no Fan
            </h4>
          </div>
          <div class="rating-chapter-year">
            <p><i class="bx bx-star"></i> 9.00</p>
            <p>|</p>
            <p>Latest Chapter : 1</p>
            <p>|</p>
            <p>Released : 2022</p>
          </div>
          <div class="description">
            <p>
              "Urumin" is an idol, but she can't sing or dance well, and she got a dishonest
              character. Kimiya is the only fan in the world who likes her. The relationship between
              the two of them is a little different from the usual relationships between idols and
              fans! This is a "precious" love comedy that depicts the daily life of a bad idol and
              the man who keeps on promoting her, and the way he loves her! relationships between
              idols and fans! This is a "precious" love comedy that depicts the daily life of a bad
              idol and the man who keeps on promoting her, and the way he loves her! relationships
              between idols and fans! This is a "precious" love comedy that depicts the daily life
              of a bad idol and the man who keeps on promoting her, and the way he loves her!
              relationships between idols and fans! This is a "precious" love comedy that depicts
              the daily life of a bad idol and the man who keeps on promoting her, and the way he
              loves her!
            </p>
          </div>
          <div class="bookmark-chapter">
            <a href="#"><i class="bx bx-bookmark"></i></a>
            <button>First Chapter</button>
            <button>Latest Chapter</button>
          </div>
        </div>
      </div>
    </div>
    <div class="manga-chapter-content">
      <DetailChapterCard />
    </div>
  </section>
  <FooterSection />
</template>

<script>
import NavbarSection from '../components/NavbarSection.vue';
import FooterSection from '../components/FooterSection.vue';
import DetailChapterCard from '../components/DetailChapterCard.vue';

export default {
  name: 'DetailPage',
  components: {
    NavbarSection,
    FooterSection,
    DetailChapterCard
  }
}
</script>

<style scoped></style>
