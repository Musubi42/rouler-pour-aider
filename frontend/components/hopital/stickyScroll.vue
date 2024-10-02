<template>
  <div
    :style="{ backgroundColor: backgroundColors[activeCard % backgroundColors.length] }"
    class="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10"
    ref="scrollContainer"
  >
    <div class="relative flex items-start px-4">
      <div class="max-w-2xl">
        <transition-group name="card">
          <div v-for="(item, index) in content" :key="item.title + index" class="my-20">
            <h2
              :class="{ 'opacity-100': activeCard === index, 'opacity-30': activeCard !== index }"
              class="transition-opacity duration-300 ease-in-out text-2xl font-bold text-slate-100"
            >
              {{ item.title }}
            </h2>
            <p
              :class="{ 'opacity-100': activeCard === index, 'opacity-30': activeCard !== index }"
              class="transition-opacity duration-300 ease-in-out text-lg text-slate-300 max-w-sm mt-10"
            >
              {{ item.description }}
            </p>
          </div>
        </transition-group>
        <div class="h-40" />
      </div>
    </div>
    <div
      :style="{ background: linearGradients[activeCard % linearGradients.length] }"
      :class="[contentClassName, 'hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden']"
    >
      <slot :name="`content-${activeCard}`"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps({
  content: Array,
  contentClassName: String,
});

const scrollContainer = ref(null);
const activeCard = ref(0);
const cardLength = props.content.length;

const backgroundColors = ['var(--slate-900)', 'var(--black)', 'var(--neutral-900)'];
const linearGradients = [
  'linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))',
  'linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))',
  'linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))',
];

// Simulate scroll tracking and updating active card
watchEffect(() => {
  if (scrollContainer.value) {
    const handleScroll = () => {
      const scrollY = scrollContainer.value.scrollTop;
      const scrollHeight = scrollContainer.value.scrollHeight;
      const height = scrollContainer.value.clientHeight;
      const scrollPercentage = scrollY / (scrollHeight - height);
      const cardsBreakpoints = props.content.map((_, index) => index / cardLength);
      const closestBreakpointIndex = cardsBreakpoints.reduce(
        (acc, breakpoint, index) => {
          const distance = Math.abs(scrollPercentage - breakpoint);
          return distance < Math.abs(scrollPercentage - cardsBreakpoints[acc]) ? index : acc;
        },
        0
      );
      activeCard.value = closestBreakpointIndex;
    };
    scrollContainer.value.addEventListener('scroll', handleScroll);
    onUnmounted(() => scrollContainer.value.removeEventListener('scroll', handleScroll));
  }
});
</script>

<style scoped>
/* Add your component specific styles here */
</style>
