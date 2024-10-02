<template>
  <div class="h-16 flex bg-slate-400/50 backdrop-blur-sm rounded-xl">
    <div class="flex flex-1 justify-between">
      <!-- Infos sur le son -->
      <div
        class="flex flex-row gap-4 ml-4 mr-4 content-start center-content items-center"
      >
        <img
          class="h-4/5 aspect-square object-cover rounded"
          :src="currentPodcast?.podcastMediaThumbnailUrl ? currentPodcast?.podcastMediaThumbnailUrl : ''"
        />
        <!-- 
          :src="currentPodcast ? currentPodcast?.podcastMediaThumbnailUrl : ''" -->
        <div
          class="justify-center flex flex-col text-ellipsis whitespace-nowrap overflow-hidden" >
          <!-- <p>{{ currentPodcast }}</p> -->
          <p class="hidden md:font-medium md:block">
            {{ currentPodcast ? currentPodcast?.title : "" }}
          </p>
          <p class="font-medium md:font-normal truncate">
            {{ currentPodcast ? currentPodcast?.resume : "" }}
          </p>
        </div>
      </div>
    </div>

    <!-- Pause/start previous/next -->
    <div class="flex mx-4 md:mx-10 items-center justify-center">
      <!-- Toggle song -->
      <button
        class="flex w-12 h-12 bg-black text-white rounded-full center-content justify-center items-center"
        @click="toggleAudio"
      >
        <iconsLoading class="w-[24px]" v-if="isLoading" src="" alt="Loading..." />
        <iconsLecture
          class="ml-[3px] w-[24px] text-white"
          v-if="!isPlaying && !isLoading"
        />
        <iconsPause class="w-[24px]" v-if="isPlaying && !isLoading" />
      </button>

      <div class="block md:hidden ml-4">
        <iconsSoundOn @click="toggleSound" v-if="isLoading" class="text-[24px]" />
        <iconsSoundOff @click="toggleSound" v-else class="text-[24px]" />
      </div>
    </div>

    <!-- Control volume son -->
    <div
      class="hidden md:flex md:flex-1 md:flex-row gap-4 ml-4 mr-4 content-end center-content items-center justify-end" >
      <!-- Music timeline -->
      <div class="flex w-full items-center">
        <div class="flex flex-row gap-1 cursor-default">
          <p ref="audioRef">{{ formatTime(currentTime) }}</p>
          /
          <p>{{ formatTime(currentPodcast ? currentPodcast?.duree : 0) }}</p>
        </div>
        <input
          type="range"
          class="rounded-full ml-2 w-full progress-slider"
          min="0"
          :max="currentPodcast ? currentPodcast?.duree : 0"
          v-model="currentTime"
          @input="changeTime"
          :style="progressBarStyle"
        />
      </div>
      <!-- Volume -->
      <!-- <div class="flex items-center">
        <iconsNoSound class="w-[24px]" />
        <input
          type="range"
          :title="`volume ${volume}%`"
          min="0"
          max="100"
          step="0.5"
          v-model="volume"
          class="rounded-full mx-2 cursor-pointer"
          style="--inputValue: 100%; width: 80px"
        />
        <iconsSoundOn class="w-[24px]" />
      </div> -->
      <!-- Volume -->
      <div
        class="flex flex-col relative h-20 justify-center items-center cursor-pointer"
        @mouseenter="showVolume = true"
        @mouseleave="showVolume = false" >
        <div class="z-10">
          <iconsSoundOn @click="toggleSound" v-if="isSound" class="w-[24px]" />
          <iconsSoundOff @click="toggleSound" v-else class="w-[24px]" />
        </div>
        <!-- <transition name="slide"> -->
        <div
          id="volume"
          class="absolute bottom-full transform translate-y-full mb-[25px]"
          v-show="showVolume"
        >
          <input
            type="range"
            :title="`volume ${roundNumber(volume)}%`"
            min="0"
            max="100"
            step="0.5"
            v-model="volume"
            class="vertical rotate-[270deg] rounded-full"
            style="--inputValue: 100%; width: 80px"
            :style="volumeBarStyle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#volume::after {
  transform: rotate(90deg);
  background-color: rgb(148 163 184 / 0.5);
  border-radius: 4px;
  content: "";
  position: absolute;
  top: 0;
  left: -25px;
  width: 160%;
  height: 150%;
  z-index: -1; /* Place the background behind the input */
  transition: top 0.5s ease-in-out;
}

/* #volume:hover::after {
  top: 0; 
} */

input[type="range"] {
  /* Remove the default appearance */
  -webkit-appearance: none; /* for Chrome */
  appearance: none;
  width: 100%; /* Full width */
  height: 10px; /* Specified height */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (it will be visible when mouse hover) */
  transition: opacity 0.2s; /* Transition effect when mouse hover */
}

input[type="range"]:hover {
  opacity: 1; /* Fully visible when mouse hover */
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /* for Chrome */
  appearance: none;
  width: 15px; /* Set a specific slider handle width */
  height: 15px; /* Slider handle height */
  background: rgba(114, 188, 121, 1); /* Green background */ 
  /* filter: brightness(0.75); */
  border-radius: 9999px;
}


</style>

<script lang="ts">

import axios from 'axios';

// TypeScript interface for the podcast
interface Podcast {
  id: number;
  title: string;
  resume: string;
  podcastMediaThumbnailUrl: string;
  podcastMediaAudioUrl: string;
  duree: number;
}

export default {
  props: {
    currentPodcast: {
      type: Object
    },
    isPlaying: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    watch(() => props.currentPodcast, (newVal, oldVal) => {
      if (newVal) {
        // Safely access properties of newVal
        currentPodcast.value = newVal;
        changePodcast(newVal, oldVal);
      }
    });

    // watch(() => props.currentPodcast, (newVal, oldVal) => {
    //   console.log("newVal", newVal);
    //   console.log("oldVal", oldVal);
    //   console.log(newVal.value !== oldVal);
    //     currentPodcast.value = newVal;
    //   if (!(newVal !== oldVal)) {
    //     changePodcast();
    //   }
    // });

    // Reactive states
    const currentPodcast = ref<Podcast | null>(null);
    const isLoading = ref(false);
    const audioSource = ref<HTMLAudioElement | null>(null);
    const isPlaying = ref(false);
    const isSound = ref(true);
    const volume = ref(50);
    const showVolume = ref(false);
    const currentTime = ref(0);

    // Computed and watch
    watch(volume, (newVolume) => {
      isSound.value = newVolume > 0;
      if (audioSource.value) {
        audioSource.value.volume = newVolume / 100;
      }
    });

    watch(isPlaying, (newVal) => { 
      // const emit = defineEmits(['update:isPlaying']);
        emit('update:isPlaying', newVal);
      }
    );

    // Methods
    const changePodcast = async (newVal, oldVal) => {
      if (audioSource.value) {
        audioSource.value.pause();
        audioSource.value.src = ''; // Release the audio resource
      }
      isPlaying.value = false;
      await loadAudio(props.currentPodcast.id);
      if (oldVal !== null) {
        await playAudio();
        isPlaying.value = true;
        emit('update:isPlaying', isPlaying.value);
      }
      

    };

    const loadAudio = async (trackID: number) => {
      try {
        isLoading.value = true;
        const audioResponse = await fetch(props.currentPodcast.podcastMediaAudioUrl);
        const blob = await audioResponse.blob();
        audioSource.value = new Audio(URL.createObjectURL(blob));
        audioSource.value.volume = volume.value / 100;
        audioSource.value.ontimeupdate = () => {
          currentTime.value = audioSource.value?.currentTime ?? 0;
        };
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        console.error("An error occurred:", error);
      }
    };

    const playAudio = () => {
      if (audioSource.value) {
        audioSource.value.play();
        isPlaying.value = true;
      }
    };

    const toggleAudio = async () => {
      if (!audioSource.value) {
        await loadAudio(props.currentPodcast.id);
        return;
      }
      if (isPlaying.value) {
        audioSource.value.pause();
        isPlaying.value = false;
      } else {
        audioSource.value.play();
        isPlaying.value = true;
      }
    };

    const changeTime = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (audioSource.value) {
        audioSource.value.currentTime = Number(target.value);
      }
    };

    const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const toggleSound = () => {
      isSound.value = !isSound.value;
      if (audioSource.value) {
        audioSource.value.volume = isSound.value ? volume.value / 100 : 0;
      }
    };

    const roundNumber = (num: number): number => {
      return Math.round(num * 100) / 100;
    };

    const volumeBarStyle = computed(() => {
      const progress = volume.value;
      return {
        background: `linear-gradient(to right, green ${progress}%, grey ${progress}%, grey 100%)`
      };
    });
    

    const progressBarStyle = computed(() => {
      const duration = currentPodcast.value?.duree || 0;
      const progress = (currentTime.value / duration) * 100;
      return {
        background: `linear-gradient(to right, green ${progress}%, #fff ${progress}%)`
      };
    });

    // Lifecycle hooks
    onMounted(() => {
      // Your mounted logic
    });

    onBeforeUnmount(() => {
      // Cleanup if necessary
      if (audioSource.value) {
        audioSource.value.pause();
        audioSource.value.src = ''; // Release the audio resource
      }
    });


    return {
      isLoading,
      audioSource,
      isPlaying,
      isSound,
      volume,
      showVolume,
      currentTime,
      currentPodcast,
      changePodcast,
      loadAudio,
      playAudio,
      toggleAudio,
      changeTime,
      formatTime,
      toggleSound,
      roundNumber,
      progressBarStyle,
      volumeBarStyle,
    };
  },
};
</script>
