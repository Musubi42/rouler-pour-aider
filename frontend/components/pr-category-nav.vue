<template>
  <nav class="flex mx-6">
    <ul class="flex flex-row text-lg justify-evenly w-screen">
      <nuxt-link to="/nos-retombees-presse/nos-articles-de-presse">
        <li class="bg-secondary/70 flex flex-col  items-center justify-center hover:bg-secondary" :class="{ active: isActive('articles-de-presse') }">
          <div class="flex items-center my-3">
            <IconsPress class="text-white text-5xl" />
          </div>
          <div class="flex flex-col bg-white m-3 mt-0 p-3 min-w-48">
            <span class="font-normal leading-4">NOS</span>
            <span class="font-bold text-xl leading-4">articles de presse</span>
          </div>
        </li>
      </nuxt-link>

      <nuxt-link to="/nos-retombees-presse/nos-interviews">
        <li class="bg-secondary/70 flex flex-col  items-center justify-center hover:bg-secondary" :class="{ active: isActive('nos-interviews') }">
          <div class="flex items-center my-3">
            <IconsInterview class="text-white text-5xl" />
          </div>
          <div class="flex flex-col bg-white m-3 mt-0 p-3 min-w-48">
            <span class="font-normal leading-4">NOS</span>
            <span class="font-bold text-xl leading-4">interviews</span>
          </div>
        </li>
      </nuxt-link>

      <nuxt-link to="/nos-retombees-presse/nos-passages-radio-test">
        <li class="bg-secondary/70 flex flex-col  items-center justify-center hover:bg-secondary" :class="{ active: isActive('nos-passages-radio') }">
          <div class="flex items-center my-3">
            <IconsRadio class="text-white text-5xl" />
          </div>
          <div class="flex flex-col bg-white m-3 mt-0 p-3 min-w-48">
            <span class="font-normal leading-4">NOS</span>
            <span class="font-bold text-xl leading-4">passages radio</span>
          </div>
        </li>
      </nuxt-link>

      <nuxt-link to="/nos-retombees-presse/nos-reportages-tv">
        <li class="bg-secondary/70 flex flex-col  items-center justify-center hover:bg-secondary" :class="{ active: isActive('nos-reportages-tv') }">
          <div class="flex items-center my-3">
            <IconsTv class="text-white text-5xl" />
          </div>
          <div class="flex flex-col bg-white m-3 mt-0 p-3 min-w-48">
            <span class="font-normal leading-4">NOS</span>
            <span class="font-bold text-xl leading-4">reportages TV</span>
          </div>
        </li>
      </nuxt-link>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    isActive(category) {
      return this.$route.path.includes(category);
    },
  },
};
</script>
