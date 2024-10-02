<template>
  <div class="bg-slate-50" >
    <Header :dynamicStyle="headerStyle" />
    <HeroAccueil />
    <NuxtPage />
    <SocialMedia />
    <Footer />
  </div>
</template>


<script>
export default {
  data() {
    return {
      headerStyle: {
        backgroundColor: 'transparent',
      },
    };
  },
  methods: {
    // Pour le bug safari scroll top en négatif
    handleScroll() {
      this.headerStyle = (window.scrollY || window.pageYOffset) <= 0 ? 0 : 1;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>