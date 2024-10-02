<template>
  <div>
    <ul class="w-[90%] mx-auto">
      <li v-for="(podcast, index) in podcasts" :key="index" class="flex flex-row w-full border-b py-8 items-center">
        <img
          :src="podcast.podcastMediaThumbnailUrl"
          alt="Logo du podcast"
          class="h-20 md:h-44 aspect-square md:aspect-video object-cover mr-4 rounded-lg"
        />
        <div class="flex flex-col">
          <h2 class="text-lg font-semibold">{{ podcast.title }}</h2>
          <p class="hidden md:block text-sm font-normal">{{ podcast.resume }}</p>
          <div class="flex flex-row mt-2 gap-x-2">
            <div>
              <button class="bg-black rounded-full w-8 h-8" @click="setCurrentPodcast(podcast)">
                <!-- <span class="flex justify-center">
                  <IconsLecture class="w-4 h-4 ml-1 text-white" />
                </span> -->
                <!-- <p>{{ podcast.isPlaying }}</p> -->
                <span class="flex justify-center" >
                
                  <iconsLoading class="w-4 h-4 text-white" v-if="podcast.isLoading" src="" alt="Loading..." />
                  <iconsLecture
                    class="w-4 h-4 ml-1 text-white"
                    v-if="!podcast.isPlaying && !podcast.isLoading"
                    alt="Lecture"
                  />
                  <iconsPause class="w-4 h-4 text-white" v-if="podcast.isPlaying && !podcast.isLoading" alt="Pause" />
                </span>
              </button>
            </div>
            <div class="flex items-center">
              <span>{{ formatDate(podcast.datePublication) }}</span>
              <span class="">&nbsp;•&nbsp;</span>
              <span>{{ formatTime(podcast.duree) }} min</span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="fixed w-full p-4 bottom-0 z-10">
      <LecteurAudioTest :currentPodcast="currentPodcast" @update:isPlaying="handleIsPlayingUpdate" />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Rouler pour aider - Nos passages radio',
  ogTitle: 'Rouler pour aider - Nos passages radio',
  description: 'L\'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP. Cette ...',
  ogDescription: 'L\'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP. Cette ...',
  ogImage: 'https://roulerpouraider.fr/images/logoBig_roulerPourAider.png',
});

// Avec le nouveau design plus besoin
// definePageMeta({
//   layout: "pr",
// });

interface Podcast {
  id: number;
  title: string;
  resume: string;
  podcastMediaThumbnailUrl: string;
  podcastMediaAudioUrl: string;
  duree: number;
  datePublication: string;
  isPlaying: boolean;
  isLoading: boolean;
}

const podcasts = ref<Podcast[]>([]);
const currentPodcast = ref<Podcast | null>(null);
const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken } } = runtimeConfig;

const handleIsPlayingUpdate = (newStatus) => {
  if (currentPodcast.value) {
    const podcastIndex = podcasts.value.findIndex(podcast => podcast.id === currentPodcast.value.id);
    if (podcastIndex !== -1) {
      podcasts.value[podcastIndex].isLoading = false;
      podcasts.value[podcastIndex].isPlaying = newStatus;
    }
  }
}

const setCurrentPodcast = (podcast: Podcast) => {
  // Le isPlaying il faut le récupérer de l'autre component quand il a récupéré l'audio
  // podcast.isPlaying = !podcast.isPlaying; 
  podcast.isLoading = true; // set isLoading state to true
  currentPodcast.value = podcast;
};

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const transformPodcastObject = (podcastData) => {
  return podcastData.map((data) => {
    const { podcast, thumbnail, ...otherAttributes } = data.attributes;
    return {
      ...otherAttributes,
      podcastMediaThumbnailUrl: strapiBaseUrl + thumbnail.data.attributes.url,
      podcastMediaAudioUrl: strapiBaseUrl + podcast.data.attributes.url,
      id: data.id,
      isPlaying: false,
    };
  });
};

const getPodcastMetadata = async () => {
  const url = `${strapiBaseUrl}/api/podcasts?populate=thumbnail&populate=podcast`;

  const { data, pending, error } = await useAsyncData("podcasts", () => {
      return $fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${strapiToken}`,
        },
      });
    });

  if (!error.value && !pending.value && data.value) {
    podcasts.value = transformPodcastObject(data.value.data);
    if (podcasts.value.length > 0) {
      currentPodcast.value = podcasts.value[0];
    }
  } else {
    console.error(error);
  }
};


const formatDate = (date: string): string => {
  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const year = dateObj.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
}; 

getPodcastMetadata();
</script>
