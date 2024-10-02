<script setup>
const soins = ref([
  { icon: "/pediatrie.png", bgColor: "#B0E9CD", title: "L’ENSEMBLE DES DISCIPLINES DE PÉDIATRIE ET DE PÉRINATALITÉ", description: "Hôpital pédiatrique de recours pour la France et l’étranger pour certaines spécialités"},
  { icon: "", bgColor: "#F7D7D4", title: "DES SERVICES ADULTES TRÈS SPÉCIALISÉS", description: "Transplantation rénale, Néphrologie, Hématologie, Infectiologie"},
  { icon: "", bgColor: "#E7E8E5", title: "UNE EXPERTISE MALADIES RARES", bullet1: "• 34 centres de référence et 25 centres de compétence labellisées par le ministère de la Santé", bullet2: "• 2 plateformes d’analyses génétiques et cytogénétiques labellisées" },
  { icon: "", bgColor: "#C8E3FF", title: "45 PROGRAMMES D’ÉDUCATION THÉRAPEUTIQUE", description: ""},
  { icon: "", bgColor: "#FFE9C6", title: "UN PLATEAU BIOLOGIQUE INTÉGRÉ AUX SERVICES CLINIQUES ET À LA RECHERCHE", description: ""},
  { icon: "", bgColor: "#B0E9CD", title: "LE SIÈGE DU SAMU DE PARIS", description: ""},
]);
</script>

<template>
  <div class="bg-white">
  <!-- Desktop -->
    <div
      class="hidden md:flex overscroll-none w-[200vw] h-screen flex-nowrap items-center horizontal gap-20"
      :style="{ backgroundColor: talentsBgColor }">
      <!-- Loop through the profiles data to create elements for each one -->
      <section
        v-for="soin in soins"
        class="profile min-h-[250px] w-[300px] flex flex-col text-black text-center px-4 py-8 rounded-2xl"
        :style="{ 'background-color': soin.bgColor }"
      >
        <!-- <NuxtImg class="object-cover w-full" :src="profile.imageUrl" alt="" /> -->
        <img 
          v-if="soin?.icon"
          class="absolute top-[-20%] left-[50%] transform -translate-x-[50%] w-20 h-20 object-cover rounded-full" 
          :src="soin?.icon" 
          alt="" 
        />
        <div class="flex flex-col justify-start w-full">
          <h3 class="font-bold text-xl mb-4">{{ soin?.title }}</h3>
          <p>{{ soin?.description }}</p>
        </div>
      </section>
    </div>

    <!-- Mobile -->
    <!-- <div
      class="flex md:hidden h-screen items-center overflow-x-auto gap-10 relative bg-black md:bg-white"
      @scroll="handleScroll" >
      <section
        v-for="profile in profiles"
        class="text-left min-w-[40vw] h-1/2 flex flex-col content-center items-center relative box-border text-white"
        :key="profile.name"
      >
        <NuxtImg class="object-cover w-full" :src="profile.imageUrl" alt="" />
        <div class="flex flex-col justify-start w-full">
          <h3 class="font-bold text-base">{{ profile.name }}</h3>
          <p class="text-sm">{{ profile.title }}</p>
        </div>
      </section>
      <svg
        v-show="!hasScrolled"
        class="animate-bounce absolute -ml-16 left-1/2 bottom-1/4 mr-4 h-16 w-16 text-white mix-blend-difference"
        fill="none"
        stroke="white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </div> -->
    <!-- <Footer class="hidden md:block" /> -->
  </div>
</template>

<style scoped>
.scroll-snap-container {
  scroll-snap-type: x mandatory;
}

.snap-start {
  scroll-snap-align: start;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

body {
  overscroll-behavior: none;
  height: 100vh;
}
</style>
