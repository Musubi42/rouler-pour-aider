<template>
  <section class="relative py-24 overflow-hidden">

    
    <div class="max-w-3xl mx-10 md:mx-auto mb-12 md:mb-20 text-center -mt-14">

    <!-- TODO : Add countUp & chiffre cles -->
    <!-- flex flex-row -->
      <!-- <span class="text-blue-400 uppercase font-semibold tracking-widest">New feature</span> -->
      <!-- <h2 class="mt-4 mb-6 text-4xl font-bold text-white font-heading">{{ descriptionAsso.title }}</h2>
      <p class="text-lg text-gray-50">{{ descriptionAsso.description }}</p> -->
      <p class="quote text-lg text-secondary text-justify">Nous sommes deux étudiants de l’Oise à mener un défi à la fois sportif et caritatif. Nous avons créé l’association Rouler pour aider en 2019 afin de récolter des dons pour l’Hôpital Necker – Enfants malades AP-HP à Paris. Cette récolte de dons, nous voulons la mener avec un défi sportif d’ampleur car nous sommes convaincus que le sport est un des meilleurs moyens de nous rassembler et véhicule des valeurs de solidarité et de dépassement qui collent parfaitement avec ce pour quoi nous agissons.</p>
      <br>
      <p class="text-lg text-secondary text-justify">En 2020, nous avons traversé la France de Lille à Nice à vélo et avons récolté plus de 33 000 euros. Ces dons sont venus soutenir des actions d’amélioration du bien-être de l’enfant à l’hôpital. Nous pensons avec force que dans le combat d’une maladie le bien-être du patient et de la famille du patient est une composante majeure dont on ne peut faire fi.</p>
      <br>
      <p class="text-lg text-secondary text-justify">Cette année, l’association veut aller plus loin en récoltant au moins 60 000 euros et en réalisant un tour de France à vélo de 3 000 kilomètres du 7 au 25 juillet.</p>
      <br>
      <p class="text-lg text-secondary text-justify">Nous avons besoin de vous pour atteindre cet objectif. Nous avons besoin de vous pour soutenir l’Hôpital Necker – Enfants malades AP-HP. Nous avons besoin de vous pour aider les enfants malades.</p>
    </div>


    <!-- Chiffre -->
    <AssoChiffresCles />

<!-- TODO : Le filigrane demare en dessous des chiffres -->
    <!-- <div class="absolute inset-0">
      <NuxtImg src="/public/dashedLine-zigzag.png" alt="" />
      <img src="public/dashedLine-zigzag.png" alt="" />
    </div> -->

    <div v-for="(person, index) in persons" :key="index"
      class="container px-4 mx-auto" >
      <div class="relative max-w-5xl mx-auto mb-20">
        <div class="bg-white md:clip-path-right-top-sm rounded-lg" >
          <div class="flex flex-col md:flex-row items-center border rounded-lg shadow-lg" 
            :class="{ 'md:flex-row-reverse': index % 2 === 1, 'md:flex-row': index % 2 === 0 }" 
             >
            <!-- TODO : Trouver le moyen d'host les images venant du backoffice directement sur Vercel, Git webhooks ? -->
            <img
              class="w-full md:w-80 h-[350px] object-cover md:clip-path-right-top"
              :class="{ 'md:rounded-l-lg': index % 2 === 0, 'rounded-t-lg': index % 2 === 0, 'rounded-r-lg': index % 2 === 1 }" 
              :src="person?.personPhotoUrl"
              alt=""
            />
            <div class="pl-8 py-10 lg:py-0">
              <h3 class="mb-1 text-3xl font-semibold font-heading text-blue-800">
                {{ capitalizePrenom(person?.prenom) }} {{ person?.nom }}
              </h3>
              <p class="mb-4 text-blue-500">{{ person?.Poste }}</p>
              <p class="text-blue-800 mb-4 mr-4">
                {{ person.description }}
              </p>
              <div class="flex items-center">
                <NuxtLink
                  v-if="person?.reseaux?.facebook"
                  class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                  :to="`${person?.facebook}`" >
                  <IconsFacebook />
                </NuxtLink>
                <NuxtLink
                  v-if="person?.reseaux?.twitter"
                  class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                  :to="`${person?.twitter}`" >
                  <IconsTwitter />
                </NuxtLink>
                <NuxtLink
                  v-if="person?.reseaux?.linkedin"
                  class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                  :to="`${person?.linkedin}`" >
                  <IconsLinkedin />
                </NuxtLink>
                <NuxtLink
                  v-if="person?.reseaux?.instagram"
                  class="inline-flex items-center justify-center w-12 h-12 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                  :to="`${person?.instagram}`" >
                  <IconsInstagram />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dossier à télécharger -->
    <a class="flex flex-col md:flex-row justify-center items-center gap-8 mx-6"
      href="/Rouler_pour_aider_dossier.pdf" download="Rouler_pour_aider_dossier" >
      <div class="flex flex-col items-center cursor-pointer">
        <IconsDownload class="text-8xl text-primary" />
        <p class="text-secondary text-xl">Téléchargez notre dossier</p>
      </div>
      <img src="public/preview-dossier.jpg" alt=""
        class="h-72 md:h-96 w-auto border shadow-lg cursor-pointer" >
    </a>


  </section>
</template>

<style scoped>
.quote::before {
  content: "“";
  font-size: 3em;
  top: -10px;
  left: -20px;
  color: #72BC7A;
}
</style>

<script setup lang="ts">
useSeoMeta({
  title: 'Rouler pour aider - L\'association',
  ogTitle: 'Rouler pour aider - L\'association',
  description: 'L\'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP. Cette ...',
  ogDescription: 'L\'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP. Cette ...',
  ogImage: 'https://roulerpouraider.fr/images/logoBig_roulerPourAider.png',
});

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

interface DescriptionAsso {
  title: string;
  description: string;
}

const persons = ref<Person[]>([]);
const descriptionAsso = ref<string>("");

const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken } } = runtimeConfig;

const transformPersonObject = (personData) => {
  return personData.map((data) => {
    const { photo, nom, prenom, ...otherAttributes } = data.attributes;

    let url = photo.data.attributes.url;
    let lastPart = url.split("/").pop();

    return {
      ...otherAttributes,
      prenom: capitalizePrenom(prenom),
      nom: nom.toUpperCase(),
      personPhotoUrl: "/backoffice/" + lastPart,
    };
  });
};

const getPersons = async () => {
  const url = `${strapiBaseUrl}/api/who-are-wes?populate=*`;

  const { data, pending, error } = await useAsyncData("persons", () => {
      return $fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${strapiToken}`,
        },
      });
    });

  if (!error.value && !pending.value && data.value) {
    persons.value = transformPersonObject(data.value.data);
  } else {
    console.error(error.value);
  }
};

const getDescriptionAsso = async () => {
  const url = `${strapiBaseUrl}/api/description-asso`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  if (!error.value && !pending.value && data.value) {
    descriptionAsso.value = data.value.data.attributes;
  } else {
    console.error(error.value);
  }
};

const capitalizePrenom = (prenom: string) => {
  return prenom.charAt(0).toUpperCase() + prenom.slice(1);
};

getPersons();
getDescriptionAsso();
</script>

