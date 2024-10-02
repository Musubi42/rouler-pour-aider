<template>
  <div>
    <Header :dynamicStyle="headerStyle" />
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
      this.headerStyle = 1;
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