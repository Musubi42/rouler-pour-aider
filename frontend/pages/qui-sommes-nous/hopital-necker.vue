<template>
  <section class="relative py-16">
    <!-- En attendant d'avoir les éléments de déco, filigrane -->

    <!-- Présentation -->
    <section class="flex flex-col md:flex-row w-full h-full md:h-12/12 mb-8">
      <!-- PP -->
      <div class="flex-1 h-auto w-full md:w-[47%] bg-[#F0EEEE] flex justify-center">
        
        <!-- <NuxtImg src="/oui/image00025.jpeg" alt="Photo de l'hôpital Necker" 
        class="h-full w-full object-cover rounded-lg" />-->
        <!-- <div style="mask-image: url('/mask.svg'); mask-size: cover;"> -->
        <img src="/necker.webp" alt="" class="w-4/5 m-auto py-4" />
        <!-- </div> -->
      </div>
      <!-- Texte -->
      <div
        class="flex flex-1 flex-col w-full md:w-[53%] content-between gap-6 text-xl items-center py-6"
      >
        <h1 class="font-bold px-4 md:px-12 text-4xl text-secondary text-center mt-3 md:mt-16">Hôpital Necker-Enfants malades</h1>
        <div class="text-justify px-4 md:px-12 flex flex-col gap-12 text-xl h-auto my-auto" >
          <p>L’hôpital Necker-Enfants malades est <b>l’hôpital pédiatrique de référence en France.</b></p>
        <p>Son <b>expertise</b> dans la prise en charge des <b>pathologies de l’enfant</b> complétée par plusieurs <b>spécialités adultes</b> en fait un <b>établissement de renommée internationale.</b></p>
        <p><b>L’innovation</b> est au cœur de la stratégie de l’hôpital Necker. Pour mener à bien ses projets et développer l’ensemble de ses <b>missions de soin, de recherche et d’enseignement</b>, l’implication des donateurs est déterminante.</p>
        </div>
      </div>
    </section>


    <!-- Chiffre clés -->
    <section>
    <div class="flex items-center justify-center my-10">
      <img
        src="/dashedLine-straight.png"
        alt=""
        class="mr-4"
      />
      <h2 class="font-bold text-3xl text-secondary text-center">Chiffres clés de l'hôpital</h2>
      <img
        src="/dashedLine-straight.png"
        alt=""
        class="ml-4"
      />
    </div>
      <div class="bg-[#F7F7FA] rounded-lg flex flex-col px-4 md:px-10 py-5 gap-6">
        <!-- Mettre 3 par div -->
        <div class="flex flex-row justify-between">
          <div
            ref="addToRefs"
            v-for="(item, index) in keyNumbers.slice(0, 3)"
            :key="index"
            class="w-1/3 md:w-1/4 flex items-center flex-col"
          >
            <CountUp
              class="font-bold text-primary text-xl md:text-3xl"
              :end="isVisible[index] ? item.number : 0"
            />
            <p class="flex flex-wrap text-center">{{ item.text }}</p>
          </div>
        </div>
        <!-- Seconde ligne -->
        <div class="flex flex-row justify-between">
          <div
            ref="addToRefs"
            v-for="(item, index) in keyNumbers.slice(3)"
            :key="index"
            class="w-1/3 md:w-1/4 flex items-center flex-col"
          >
            <CountUp
              class="font-bold text-primary text-xl md:text-3xl"
              :end="isVisible[index] ? item.number : 0"
            />
            <p class="flex flex-wrap text-center">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>


    <!-- Histoire -->
    <HopitalHistoire />

    <!-- Offre de soins -->
    <!-- <HopitalHorizontalScrolling /> -->
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Rouler pour aider - L\'hopital Necker',
  ogTitle: 'Rouler pour aider - L\'hopital Necker',
  description: 'L\'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP. Cette ...',
  ogDescription: 'L\'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP. Cette ...',
  ogImage: 'https://roulerpouraider.fr/images/logoBig_roulerPourAider.png',
});

definePageMeta({
  layout: "without-hero",
});

const keyNumbers = [
  { number: 506029, text: "Prise en charge" },
  { number: 82425, text: "Passages aux urgences" },
  { number: 582, text: "Lits toutes disciplines confondues" },
  { number: 61, text: "Centres de référence maladies rares" },
  { number: 4777, text: "Professionnels au services des patients" },
  { number: 1079, text: "Publications scientifiques" },
];

interface Person {
  personPhotolUrl: string;
  prenom: string;
  nom: string;
  poste: string;
  description: string;
  reseaux: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

const persons = ref<Person[]>([]);

const runtimeConfig = useRuntimeConfig();
const {
  public: { strapiBaseUrl, strapiToken },
} = runtimeConfig;

const transformPersonObject = (personData) => {
  return personData.map((data) => {
    const { photo, ...otherAttributes } = data.attributes;
    return {
      ...otherAttributes,
      personPhotoUrl: strapiBaseUrl + photo.data.attributes.url,
    };
  });
};

const getPersons = async () => {
  const url = `${strapiBaseUrl}/api/who-are-wes?populate=*`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  if (!error.value && !pending.value && data.value) {
    persons.value = transformPersonObject(data.value.data);
  } else {
    console.error(error);
  }
};

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
