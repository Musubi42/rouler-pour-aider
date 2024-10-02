<template>
  <section>
    <div class="bg-slate-300 text-black py-8">
      <div class="mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">

        <!-- Intro -->
        <!-- <div class="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
          <p class="ml-2 text-yellow-300 uppercase tracking-loose">Working Process</p>
          <p class="text-3xl md:text-4xl leading-normal md:leading-relaxed mb-2">
            Working Process of Fest
          </p>
          <p class="text-sm md:text-base text-gray-50 mb-4">
            Here’s your guide to the tech fest 2021 process. Go through all the steps to
            know the exact process of the fest.
          </p>
          <a
            href="#"
            class="bg-transparent mr-auto hover:bg-yellow-300 text-yellow-300 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
          >
            Explore Now</a
          >
        </div> -->


        <div class="lg:w-2/3 mx-auto">
          <div class="container mx-auto w-full h-full">
            <div class="relative wrap overflow-hidden p-10 h-full">

              <!-- Vertical line -->
              <!-- <div
                :style="{height: leftLineHeight}"
                class="absolute right-1/2 border-2 border-secondary rounded-b-full"
              ></div> -->
              <div
                :style="{height: progressLineHeight}"
                class="absolute right-1/2 bg-secondary w-2 rounded-b-full z-0"
              ></div>

              <div v-for="(history, index) in histories" :key="index"
                class="mb-8 flex justify-between items-center w-full right-timeline"
                :class="{ 'flex-row-reverse': index % 2 === 1, 'flex-row': index % 2 === 0 }" >
                <div class="order-1 w-5/12"></div>

                <div class="order-1 w-5/12 px-1 py-4">
                  <p class="mb-3 text-lg font-medium text-primary">{{history.date}}</p>
                  <h4 class="mb-3 font-bold text-lg md:text-2xl text-left">
                    {{history.title}}
                  </h4>
                  <p
                    class="text-sm md:text-base leading-snug text-black text-opacity-100" >
                    {{history.description}}
                  </p>
                  <p
                    class="text-sm md:text-base leading-snug text-black text-opacity-100" >
                    {{history.description2}}
                  </p>
                </div>
              </div>

            </div>
            <NuxtImg
              format="webp"
              quality="80"
              class="mx-auto -mt-20 z-10 relative"
              src="/hospital.png"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const histories = [
  {
    index: 1,
    date: "1778 - 1802",
    title: "Création",
    description: "1778 - Création de l’hospice de la Charité St Sulpice Hôpital Necker pour les adultes.",
    description2: "1802 - Création de l'hôpital des enfants malades.",
  },
  {
    index: 2,
    date: "1820",
    title: "Invention du stéthoscope",
    description: "Le Professeur René Laennec invente le stéthoscope à l’hôpital Necker.",
  },
  {
    index: 3,
    date: "1959",
    title: "Découverte de la trisomie 21",
    description: "Le Professeur Jérôme Lejeune découvre la trisomie 21 à l’hôpital Necker.",
  },
  {
    index: 4,
    date: "1985",
    title: "Découverte du virus du SIDA",
    description: "Découverte de la transmission du virus du sida (VIH) de la mère à l’enfant",
  },
  {
    index: 5,
    date: "1994",
    title: "1ere greffe foie et grêle réalisée en Europe",
    description: "1ere greffe foie et grêle réalisée en Europe à l’hôpital Necker.",
  },
  {
    index: 6,
    data: "1999",
    title: "1ere thérapie génique au monde des bébés bulles (Prs Fischer et Cavazzana)",
    description: "1ere thérapie génique au monde des bébés bulles (Prs Fischer et Cavazzana) à l’hôpital Necker.",
  },
  {
    index: 7,
    date: "2018",
    title: "1ere médicale : nouvelle approche thérapeutique dans le Syndrome de Cloves (Dr Canaud)",
    description: "1ere médicale : nouvelle approche thérapeutique dans le Syndrome de Cloves (Dr Canaud) à l’hôpital Necker.",
  }
];
// import { ref, watch } from 'vue';
import { useWindowScroll } from '@vueuse/core';

// Refs for line heights
const progressLineHeight = ref('0%');
const timelineOffset = ref(0);

// Use the useWindowScroll composable to react to scroll changes
const { y } = useWindowScroll();

onMounted(() => {
  // Calculate the offset of the timeline from the top of the page
  const timelineElement = document.querySelector('.right-timeline');
  timelineOffset.value = timelineElement.getBoundingClientRect().top + window.pageYOffset;
});

watch(y, (newY) => {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const adjustedScrollPosition = newY - timelineOffset.value;
  const progress = Math.max(0, adjustedScrollPosition / (totalHeight - timelineOffset.value) * 100);
  progressLineHeight.value = `${progress}%`;
});
</script>