<template>
  <div class="w-auto border border-gray-200 bg-secondary/20 rounded-3xl flex flex-wrap mb-32 mx-4 md:mx-32">
    <!-- TODO : trouver les logos -->
    <div
      ref="addToRefs"
      v-for="(item, index) in keyNumbers"
      :key="index"
      class="w-auto md:w-1/2 lg:w-1/4 py-8 content-center items-center flex flex-col mx-auto" >
      <!-- <div class=""> -->
        <img :src="item.logo" alt=""
          class="h-12 w-12">
        <CountUp
          class="font-bold text-primary text-3xl"
          :end="isVisible[index] ? item.number : 0"
        />
        <p class="text-gray-600 mb-2">{{ item.text }}</p>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const keyNumbers = [
  { number: 2, text: "Étudiants", logo: "/logos/dons.png" },
  { number: 40, text: "Bénévoles", logo: "/logos/volunteer.png" },
  { number: 8, text: "Partenaires", logo: "/logos/partner.png" },
];

const counters = ref([]);
const isVisible = reactive(keyNumbers.map(() => false));

let observer;

const addToRefs = ref([]);

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        isVisible[index] = entry.isIntersecting;
      });
    },
    {
      threshold: 0.5,
    }
  );

  addToRefs.value.forEach((ref) => {
    observer.observe(ref);
  });
});

onUnmounted(() => {
  counters.value.forEach((addToRefs) => observer.unobserve(counter));
});
</script>
