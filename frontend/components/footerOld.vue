<template>
  <footer class="flex flex-col md:flex-row w-screen py-8 items-center md:items-start bg-secondary">
    <div class="flex items-center justify-center w-full md:w-1/2 mb-9 md:mb-0">
      <div class="flex flex-col items-center">
        <span class="mb-6 font-extrabold text-xl">Nous suivre</span>
        <div class="flex flex-row gap-10">
          <a href="https://www.facebook.com/" target="_blank"><IconsFacebook class="text-4xl" /></a>
          <a href="https://www.instagram.com/" target="_blank"><IconsInstagram class="text-4xl" /></a>
          <a href="https://www.linkedin.com/" target="_blank"><IconsLinkedin class="text-4xl" /></a>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center w-full md:w-1/2">
      <div class="flex flex-col items-center">
        <span class="mb-4 font-extrabold text-xl">Contactez nous</span>
        <p>Une questions ? Une remarque ? Des suggestions ?</p>
        <p>N'hésitez pas à nous contacter</p>
        <span class="block text-lg font-semibold"
          ><a href="mailto:roulerpouraider60@gmail.com"
            >roulerpouraider60@gmail.com</a
          ></span
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
