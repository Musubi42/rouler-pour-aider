<template>
  <div class="hidden md:block fixed bottom-2 right-5 z-50" 
    :class="{ 'bottom-24': isRadioPlayerVisible }"
    @mouseenter="showIcons = true" @mouseleave="showIcons = false">
    <div class="social-button w-12 h-12 bg-white rounded-[9999px] flex flex-col items-center justify-center relative cursor-pointer overflow-hidden transition-transform shadow-md shadow-slate-700" 
      :class="{ 'is-active': showIcons }" >
      <IconsSocialNetworks class="icon-networks h-6 w-6 absolute right-[14px] text-secondary" />
      <transition-group name="social-icon-animation" tag="div" class="social-icons">
        <NuxtLink to="https://www.linkedin.com/company/rouler-pour-aider" v-if="showIcons" class="icon cursor-pointer" key="linkedin" target="_blank">
          <IconsLinkedin />
        </NuxtLink>
        <NuxtLink to="https://www.facebook.com/roulerpouraider" v-if="showIcons" class="icon cursor-pointer" key="facebook" target="_blank">
          <IconsFacebook />
        </NuxtLink>
        <NuxtLink to="https://www.tiktok.com/@roulerpouraider?_t=8kyEoHbGNN3&_r=1" v-if="showIcons" class="icon cursor-pointer" key="tiktok" target="_blank">
          <IconsTiktok />
        </NuxtLink>
        <NuxtLink to="https://www.instagram.com/roulerpouraider/" v-if="showIcons" class="icon cursor-pointer" key="instagram" target="_blank">
          <IconsInstagram />
        </NuxtLink>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

const showIcons = ref(false);
const isRadioPlayerVisible = ref(false);

watch(route, () => {
  if (process.client) {
    isRadioPlayerVisible.value = route.path === "/nos-retombees-presse/nos-passages-radio"
  }
})
</script>

<style scoped>
.social-button-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.social-button {
  transition: width 0.3s ease-in-out;
}

.social-icons {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 25%; /* Align icons to expand from the center of the button */
  left: 105%;
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.social-button.is-active {
  width: 260px;
}

.social-button.is-active .social-icons {
  transform: translateX(calc(-100% - 50px)); /* Move icons to the left by their width plus the button width */
}

.icon {
  margin: 5px 0;
  width: 50px; 
}

.social-icon-animation-enter-active,
.social-icon-animation-leave-active {
  transition: all 0.3s ease;
}

.social-icon-animation-enter-from,
.social-icon-animation-leave-to {
  opacity: 0;
  transform: translateX(50px); /* Start from the center of the button */
}

.social-icon-animation-enter-to,
.social-icon-animation-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
