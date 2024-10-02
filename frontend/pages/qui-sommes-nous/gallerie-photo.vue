<template>
  <section class="relative py-20 md:py-32 overflow-hidden">
    <img
      class="absolute top-0 left-0 mt-4"
      src=""
      alt=""
    />
    <img
      class="absolute top-0 right-0 mt-40"
      src=""
      alt=""
    />
    <div class="relative container px-4 mx-auto">
      <div class="relative max-w-7xl mx-auto">
        <div class="flex flex-wrap -mx-4 -mb-8">

          <div v-for="(gallerie, index) in galleries" :key="index"
            class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8" >
            <a
              class="group block max-w-sm mx-auto md:max-w-none h-full border border-gray-100 bg-white rounded-xl transform hover:scale-105 transition duration-500"
            >
              <!-- <div class="flex items-center justify-between px-4 py-5">
                <span class="text-sm">@saturn_ui</span>
                <img
                  src=""
                  alt=""
                />
              </div> -->
              <div class="h-72 border-b border-gray-100">
                <img
                  class="block w-full h-full"
                  :src="gallerie.galleriePhotoUrl"
                  alt=""
                />
              </div>
              <div class="px-4 pt-4 pb-5">
                <span class="block text-sm tetx-gray-800 mb-2.5" >
                  {{ gallerie.description }}
                </span>
                <div class="flex items-center">
                <!-- <iconsLoading class="w-4 h-4 text-white" v-if="podcast.isLoading" src="" alt="Loading..." /> -->
                  <div class="cursor-pointer" @click="toggleHeart(index)">
                    <transition name="like">
                      <IconsHeartEmpty v-if="!gallerie.liked" class="text-orange-400 mr-2" :class="{ 'like-animation': gallerie.isAnimating }" @animationend="gallerie.isAnimating = false" />
                      <IconsHeartFill v-else class="text-orange-400 mr-2" :class="{ 'like-animation': gallerie.isAnimating }" @animationend="gallerie.isAnimating = false" />
                    </transition>
                  </div>
                  <span class="text-sm text-gray-500">{{ gallerie.nombreLike }}</span>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.like-animation {
  animation: like 0.3s ease-in-out;
}

@keyframes like {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}
</style>

<script setup lang="ts">
useSeoMeta({
  title: 'Rouler pour aider - Gallerie photo',
  ogTitle: 'Rouler pour aider - Gallerie photo',
  description: 'L\'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP. Cette ...',
  ogDescription: 'L\'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP. Cette ...',
  ogImage: 'https://roulerpouraider.fr/images/logoBig_roulerPourAider.png',
});
interface Gallerie {
  galleriePhotolUrl: string;
  description: string;
  nombreLike: number;
  format: {
    paysage: boolean;
    portrait: boolean;
    carre: boolean;
  }
}

const galleries = ref<Gallerie[]>([]);

const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken, strapiGalleriePutLike } } = runtimeConfig;

const transformGallerieObject = (gallerieData) => {
  return gallerieData.map((data) => {
    const { photo, ...otherAttributes } = data.attributes;
    return {
      ...otherAttributes,
      galleriePhotoUrl: strapiBaseUrl + photo.data.attributes.url,
      liked: false, // By default all images are not liked
      isAnimating: false,
    };
  });
};

const getGalleries = async () => {
  const url = `${strapiBaseUrl}/api/galleries?populate=*`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  if (!error.value && !pending.value && data.value) {
    galleries.value = transformGallerieObject(data.value.data);
  } else {
    console.error(error);
  }
};

const addLike = async (gallerieId, nombreLike) => {
  const url = `${strapiBaseUrl}/api/galleries/${gallerieId}`;

  const { data, pending, error } = await useFetch(url, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiGalleriePutLike}`,
    },
    body: {
      data: {
        nombreLike : nombreLike,
      }
    }
  });

  if (!error.value && !pending.value && data.value) {
    console.log(data.value.data.attributes);
  } else {
    console.error(error.value);
  }
};

const isHeartFilled = ref(false);
const isAnimating = ref(false);

// TODO: Envoyer le post au back pour save le like
const toggleHeart = (index) => {
  galleries.value[index].liked = !galleries.value[index].liked;
  galleries.value[index].isAnimating = true;

  galleries.value[index].nombreLike = galleries.value[index].liked ? Number(galleries.value[index].nombreLike) + 1 : galleries.value[index].nombreLike - 1;

  // Update the like in the database
  const gallerieId = index + 1;
  addLike(gallerieId, galleries.value[index].nombreLike);
};

onMounted(() => {
  getGalleries();
});
</script>
