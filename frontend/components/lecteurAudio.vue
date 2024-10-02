<template>
  <div class="h-16 flex bg-slate-400/50 backdrop-blur-sm rounded-xl">
    <div class="flex flex-1 justify-between">
      <!-- Infos sur le son -->
      <div
        class="flex flex-row gap-4 ml-4 mr-4 content-start center-content items-center"
      >
        <img
          class="h-4/5 aspect-square object-cover rounded"
          :src="currentPodcast ? currentPodcast?.value?.podcastMediaThumbnailUrl : ''"
        />
        <div
          class="justify-center flex flex-col text-ellipsis whitespace-nowrap overflow-hidden"
        >
          <!-- <p>{{ currentPodcast.value }}</p> -->
          <p class="hidden md:font-medium md:block">
            {{ currentPodcast ? currentPodcast?.value?.title : "" }}
          </p>
          <p class="font-medium md:font-normal truncate">
            {{ currentPodcast ? currentPodcast?.value?.resume : "" }}
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
      class="hidden md:flex md:flex-1 md:flex-row gap-4 ml-4 mr-4 content-end center-content items-center justify-end"
    >
      <!-- Music timeline -->
      <div class="flex w-full items-center">
        <div class="flex flex-row gap-1 cursor-default">
          <p ref="audioRef">{{ formatTime(currentTime) }}</p>
          /
          <p>{{ formatTime(currentPodcast ? currentPodcast?.value?.duree : 0) }}</p>
        </div>
        <input
          type="range"
          class="rounded-full ml-2"
          min="0"
          :max="currentPodcast ? currentPodcast?.value?.duree : 0"
          v-model="currentTime"
          @input="changeTime"
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
          class="absolute bottom-full transform translate-y-full mb-[25px]"
          v-show="showVolume"
        >
          <input
            type="range"
            :title="`volume ${volume}%`"
            min="0"
            max="100"
            step="0.5"
            v-model="volume"
            class="vertical rotate-[270deg] rounded-full"
            style="--inputValue: 100%; width: 80px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.video-container {
  overflow-y: scroll; /* Enable vertical scrolling */
  scroll-snap-type: y mandatory; /* Enable snapping behavior */
  position: relative;
}

.video-item {
  height: 80%; /* Each video item takes full viewport height */
  scroll-snap-align: start; /* Snap each video item to the start of the container */
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}

.slide-enter-to,
.slide-leave {
  transform: translateY(0);
}

input[type="range"] {
  /* Remove the default appearance */
  -webkit-appearance: none; /* for Chrome */
  appearance: none;
  width: 100%; /* Full width */
  height: 10px; /* Specified height */
  background: #ddd; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (it will be visible when mouse hover) */
  transition: opacity 0.2s; /* Transition effect when mouse hover */
  cursor: pointer; /* Cursor on hover */
}

input[type="range"]:hover {
  opacity: 1; /* Fully visible when mouse hover */
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /* for Chrome */
  appearance: none;
  width: 15px; /* Set a specific slider handle width */
  height: 15px; /* Slider handle height */
  background: #974dff; /* Green background */
  cursor: pointer; /* Cursor on hover */
  border-radius: 9999px;
}

input[type="range"]::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #4caf50; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>

<script>
import axios from "axios";

export default {
  setup() {
    const isLoading = ref(false);
    let currentPodcast = ref(null);

    // Call the composable function
    const loading = isPodcastLoading();
    isLoading.value = loading;

    const isCurrentPodcast = useCurrentPodcast();
    currentPodcast = isCurrentPodcast.value;

    watch(isCurrentPodcast, (newVal, oldVal) => {
      currentPodcast.value = newVal;
      // changePodcast();
    });

    return {
      isLoading,
      currentPodcast,
    };
  },
  data() {
    return {
      audioSource: null,
      isPlaying: false,
      isPaused: false,
      isLoading: false,
      isSound: true,
      volume: 50,
      showVolume: false,
      currentTime: 0,
    };
  },
  watch: {
    volume(newVolume) {
      // Update the isSound property based on the new volume
      this.isSound = newVolume > 0;
      this.audioSource.volume = newVolume / 100;
    },
  },
  methods: {
    // async loadAndPlayAudio(trackID) {
    //   try {
    //     this.isLoading = true;

    //     var audioResponse = await fetch(`${this.currentPodcast.value.podcastMediaAudioUrl}`);

    //     const blob = await audioResponse.blob();
    //     this.audioSource = new Audio(URL.createObjectURL(blob));
    //     this.audioSource.volume = this.volume / 100;
    //     this.audioSource.play();

    //     this.audioSource.ontimeupdate = () => {
    //       this.currentTime = this.audioSource.currentTime;
    //       if (this.currentTime >= this.audioSource.duration) {
    //         this.playNextSong();
    //       }
    //     };

    //     this.trackID = trackID;
    //     this.isLoading = false;
    //     this.isPlaying = true;
    //   } catch (error) {
    //     this.isLoading = false;
    //     console.error("An error occurred:", error);
    //     // TODO: Handle the error as you see fit
    //   }
    // },

    changePodcast() {
      this.isPlaying = false;
      this.loadAudio(this.currentPodcast.value.id);
    },

    async loadAudio(trackID) {
      try {
        this.isLoading = true;

        var audioResponse = await fetch(
          `${this.currentPodcast.value.podcastMediaAudioUrl}`
        );

        const blob = await audioResponse.blob();
        this.audioSource = new Audio(URL.createObjectURL(blob));
        this.audioSource.volume = this.volume / 100;

        this.audioSource.ontimeupdate = () => {
          this.currentTime = this.audioSource.currentTime;
          // Pauser la musique si elle est terminée
          // if (this.currentTime >= this.audioSource.duration) {
          //   this.playNextSong();
          // }
        };

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error("An error occurred:", error);
        // TODO: Handle the error as you see fit
      }
    },

    playAudio() {
      if (this.audioSource) {
        this.audioSource.play();
        this.isPlaying = true;
      }
    },

    async toggleAudio() {
      if (!this.audioSource) {
        await this.loadAndPlayAudio(this.trackID);
        return;
      }

      if (this.isPlaying) {
        this.audioSource.pause();
        this.isPlaying = false;
      } else {
        this.audioSource.play();
        this.isPlaying = true;
      }
    },

    changeTime(event) {
      // Change the current time of the music when the slider value changes
      this.audioSource.currentTime = event.target.value;
    },
    updateTime() {
      // Update the slider value when the current time of the music changes
      this.currentTime = this.audioSource.currentTime;
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
    toggleSound() {
      // Toggle the sound
      this.isSound = !this.isSound;
      if (this.isSound) {
        this.audioSource.volume = this.volume / 100;
      } else {
        this.audioSource.volume = 0;
      }
    },
  },

  mounted() {},
  async created() {
    // // TODO: Faire une petite gestion d'erreur
  },
  beforeUnmount() {
    // Remove event listeners
    this.$refs.audio.removeEventListener("loadedmetadata", this.updateTime);
    this.$refs.audio.removeEventListener("timeupdate", this.updateTime);
  },
};
</script>
