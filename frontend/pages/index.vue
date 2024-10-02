<template>
  <div class="mx-6 md:mx-40">
    <p class="quote mt-10 mx-4 md:mx-20 text-lg text-secondary text-justify">
      Nous sommes deux étudiants de l’Oise à mener un défi à la fois sportif et caritatif.
      Nous avons créé l’association Rouler pour aider en 2019 afin de récolter des dons
      pour l’Hôpital Necker – Enfants malades AP-HP à Paris. Cette récolte de dons, nous
      voulons la mener avec un défi sportif d’ampleur car nous sommes convaincus que le
      sport est un des meilleurs moyens de nous rassembler et véhicule des valeurs de
      solidarité et de dépassement qui collent parfaitement avec ce pour quoi nous
      agissons.
    </p>
    <section class="mt-10">
      <h2 class="font-semibold text-3xl text-secondary title-underline">
        Un défi sportif ambitieux
      </h2>
      <!-- TODO : rajouter le text du qui sommes nous -->
      <AccueilChiffresCles />
    </section>

    <section class="mt-24">
      <h2 class="relative z-10 font-semibold text-3xl text-secondary title-underline">
        Un tour de France pour les enfants hospitalisés
      </h2>

      <div class="flex flex-col md:flex-row w-full mt-6 md:mt-6">
        <!-- TODO : Pour la partie mobile -->
        <!-- <div v-if="isMobile">
          <div class="w-full md:w-1/2 h-auto flex flex-col justify-around items-center">
            <img class="object-contain" src="/1ere-edition/map.png" alt="" />
          </div>

          <div class="w-full md:w-1/2">
            <AccueilEtapes />
          </div>
        </div> -->

        <!-- Pour la partie desktop -->
        <!-- <div > -->
          <!-- <div v-else class="w-full h-3/4 -translate-x-[200px]"> -->
          <div class="w-full h-3/4 md:-translate-x-[200px]">
            <AccueilMapCycle @location-hovered="handleLocationHovered" />
          </div>
          <div
            ref="addToRefs"
            class="w-auto mx-auto z-10 -mt-20 md:my-auto md:-ml-[100px] md:w-1/2 lg:w-1/3 p-0 md:p-4 hover:-translate-y-2 transition-transform duration-300 ease-in-out"
          >
            <div
              class="w-max px-4 md:px-8 py-3 md:py-6 rounded-3xl border border-gray-100 flex flex-col gap-8 card-shadow h-auto"
            >
              <div class="w-full flex flex-col justify-start gap-4">
                <div class="bg-primary px-4 py-1 rounded w-fit">
                  {{ etapeDateRef }}
                </div>
                <div class="flex flex-col font-semibold text-base md:text-xl">
                  <span>ÉTAPE {{ etapeNumeroRef }}</span>
                  <span>{{ etapeVilleRef }}</span>
                </div>
                <!-- TODO : Choper des icons pour la longueur, plat, montagne ... -->
                <div class="flex flex-row -mb-4">
                  <!-- Longueur -->
                  <!-- <div class="flex flex-row" > -->
                  <!-- <div>
                      <img src="/velo.png" alt="" class="w-12">
                    </div> -->
                  <!-- <p>
                      <span class="font-light text-base" >Longueur</span>
                      <br>
                      <span class="font-normal text-base" > 206 km</span>
                    </p>
                  </div> -->
                  <!-- Type de route -->
                  <!-- <div class="flex flex-row" >
                    <div>
                      <img src="/velo.png" alt="" class="w-12">
                    </div>
                    <p>
                      <span class="font-light text-sm" >Longueur</span>
                      <br>
                      206 km
                    </p>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        <!-- </div> -->
      </div>
    </section>

    <section class="mt-16 md:mt-0 snap-start">
      <h2 class="font-semibold text-2xl md:text-3xl text-secondary title-underline">
        Nous récoltons des dons pour améliorer le bien-être des patients et de leur
        famille
      </h2>

      <AccueilDons />
    </section>

    <section class="mt-24 snap-start">
      <h2 class="font-semibold text-3xl text-secondary title-underline">
        Calendrier des manifestations
      </h2>

      <AccueilCalendrier />
    </section>

    <section class="mt-24">
      <h2 class="font-semibold text-3xl text-secondary title-underline">
        Nos partenaires
      </h2>

      <AccueilCarouselPartenaire />
    </section>
  </div>
</template>

<style scoped>
.card-shadow {
  box-shadow: 5px 5px 8px rgb(156 156 156 / 30%);
}

.scroll-snap-type {
  scroll-snap-type: y mandatory;
  overflow-y: auto; /* Ensure the container can scroll */
  height: 100%;
}

.quote::before {
  content: "“";
  font-size: 3em;
  top: -10px;
  left: -20px;
  color: #72bc7a;
}
</style>

<script setup lang="ts">
definePageMeta({
  layout: "accueil",
});

useSeoMeta({
  title: "Rouler pour aider - Accueil",
  ogTitle: "Rouler pour aider - Accueil",
  description:
    "L'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l'Hôpital Necker – Enfants malades AP-HP. Cette ...",
  ogDescription:
    "L'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l'Hôpital Necker – Enfants malades AP-HP. Cette ...",
  ogImage: "https://roulerpouraider.fr/images/logoBig_roulerPourAider.png",
});

const etapeDateRef = ref(null);
const etapeDistanceRef = ref(null);
const etapeNumeroRef = ref(null);
const etapeVilleRef = ref(null);

const handleLocationHovered = (etapeNumero, etapeVille, etapeDate, etapeDistance) => {
  etapeDateRef.value = etapeDate;
  etapeDistanceRef.value = etapeDistance;
  etapeNumeroRef.value = etapeNumero;
  etapeVilleRef.value = etapeVille;
};

const isMobile = ref(false);

onMounted(() => {
  // Initialize carousel or set up resize observers if needed
  isMobile.value = window.innerWidth < 768;
});
</script>
