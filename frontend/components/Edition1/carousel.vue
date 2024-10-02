<template>
  <div>
    <Swiper
      :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 4000 }"
      :pagination="{ enabled: true, clickable: true, dynamicBullets: true, type: 'bullets', dynamicMainBullets: 2 }"
      :centeredSlides="true"
      class="w-full h-auto md:h-[500px] mx-auto "
    >
      <SwiperSlide v-for="(image, index) in images" :key="index" class="p-10 my-auto">
        <img :src="image.src" :alt="image.alt" class="h-full w-auto mx-auto rounded-3xl" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
/* .swiper-slide {
  background-color: yellow;
  display: flex;
} */
.test {
  background-color: red;
}

.swiper-pagination-bullet {
  /* Example - adjust the color as needed */
  @apply bg-gray-500;
  background-color: yellow;
}

.bullet-active {
  /* Example - adjust the color as needed */
  @apply bg-green-500;
}

/* Swiper styles customization if needed */
</style>

<script setup lang="ts">
const carousel = ref(null);

const imageFilenames = ['2020-arrivee-nice.webp', 'depart-lille.webp', 'event-caritatif-1.webp', 'event-caritatif-2.webp', 'event-caritatif-3.webp', 'event-caritatif-4.webp', 'mairie-velo-2.webp', 'mairie-velo.webp', 'nice-arrosage.webp', 'nice-celebration.webp']; // Replace with your known filenames

const images = computed(() => {
  return imageFilenames.map((filename) => {
    return {
      src: `/1ere-edition/${filename}`,
      alt: filename.split('.')[0] // Removes the file extension
    };
  });
});

</script>