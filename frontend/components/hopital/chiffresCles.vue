<template>
  <div class="p-10">
    <StickyScroll :content="content" />
  </div>
</template>

<style scoped>
/* Add any specific styles here */
</style>

<script setup lang="ts">
// import StickyScroll from '../components/ui/StickyScrollReveal.vue'; // Assume Vue component equivalent is available

const content = ref([
  {
    title: "Collaborative Editing",
    description: "Work together in real time with your team, clients, and stakeholders...",
    content: <div class="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">Collaborative Editing</div>
  },
  {
    title: "Real time changes",
    description: "See changes as they happen...",
    content: <div class="h-full w-full flex items-center justify-center text-white"><NuxtImage src="/linear.webp" width="300" height="300" class="h-full w-full object-cover" alt="linear board demo" /></div>
  },
  {
    title: "Version control",
    description: "Experience real-time updates...",
    content: <div class="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">Version control</div>
  },
  {
    title: "Running out of content",
    description: "Experience real-time updates...",
    content: <div class="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">Running out of content</div>
  }
]);
</script>

