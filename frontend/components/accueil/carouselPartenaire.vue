<template class="" >
  <!-- <Swiper
    :modules="[Navigation, Pagination, Scrollbar, A11y]"
    :slides-per-view="2"
    :space-between="50"
    navigation
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
  >
    <SwiperSlide v-for="slide in images" :key="slide" class="bg-green-300">
      <strong>{{ slide.alt }}</strong>
      <NuxtImg :src="slide.src" :alt="slide.alt" />
    </SwiperSlide>
  </Swiper> -->
  <Swiper 
    :modules="[SwiperAutoplay, SwiperNavigation]"
    :slides-per-view="isMobile ? 1 : 3"
    :autoplay="{ delay: 4000 }"
    :loop="true"
    :navigation="true"
    :pagination="{ clickable: true }"
    :centeredSlides="true"
    :space-between="0"
     >
    <SwiperSlide v-for="(image, index) in partenairesImage" :key="index"
      class="p-10 my-auto">
      <img :src="image.partenairePhotoUrl" :alt="image.partenairePhotoAlt" class="h-full w-full">
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.align-view > div {
  display: flex;
  justify-content: center;
  align-items: center;
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
const images = ref([
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 1',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 2',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 3',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 4',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 5',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 6',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 7',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 8',
  },
]);

const runtimeConfig = useRuntimeConfig();
const {
  public: { strapiBaseUrl, strapiToken },
} = runtimeConfig;

const partenairesImage = ref([]);

const transformPartenaireObject = (partenaireData) => {
  return partenaireData.map((data) => {
    const { image } = data.attributes;

    let url = image.data.attributes.url;
    let lastPart = url.split("/").pop();

    return {
      partenairePhotoUrl: "/backoffice/" + lastPart,
      partenairePhotoAlt: image.data.attributes.name,
    };
  });
};

const getPartenaires = async () => {
  const url = `${strapiBaseUrl}/api/partenaires?populate=*`;

  const { data, pending, error } = await useAsyncData("partenairesImage", () => {
    return $fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
    });
  });

  if (!error.value && !pending.value && data.value) {
    partenairesImage.value = transformPartenaireObject(data.value.data);
  } else {
    console.error(error.value);
  }
};

getPartenaires();

const isMobile = ref(false);

onMounted(() => {
  // Initialize carousel or set up resize observers if needed
  isMobile.value = window.innerWidth < 768;
});
</script>
