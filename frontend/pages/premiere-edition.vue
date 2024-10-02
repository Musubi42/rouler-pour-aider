<template>
<section class="py-6">
  <div class="container px-4 mx-auto">

    <!-- Chiffres clés -->
    <div class="flex flex-wrap my-10">
      <div class="w-full  p-4">
        <p class="text-white text-2xl font-medium text-center bg-secondary rounded-md p-10">En 2020, nous avons traversé la France de Lille à Nice à vélo et nous avons récolté plus de 33 000 euros pour l’Hôpital Necker – Enfants malades AP-HP.</p>
      </div>
    </div>
    <Edition1RouleurChiffresCles />
    <h2 class="text-4xl lg:text-5xl font-semibold text-center mb-14 whitespace-pre-line">
      <pre class="font-Omnes" >Une récolte de dons pour l’Hôpital Necker
      Enfants malades AP-HP à Paris</pre>
    </h2>
    <div class="flex flex-wrap mb-28 md:mb-32">
      <div class="w-full lg:w-1/2 p-4">
        <p class="text-gray-600 text-lg">Peu importe d’où l’on vient en France, quand un enfant est touché par la maladie et en particulier par une maladie rare, Necker est un hôpital de référence.</p>
      </div>
      <div class="w-full lg:w-1/2 p-4">
        <p class="text-gray-600 text-lg">Nous avons choisi cet hôpital car leurs besoins sont grands et ils se doivent de constamment faire évoluer leurs équipements et leurs prises en charge.</p>
      </div>
    </div>

    

    <!-- Hopital dons -->
    <div class="flex flex-wrap mb-28 md:mb-32">
      <div class="w-full lg:w-1/2 px-8">
        <h2 class="text-3xl lg:text-5xl font-bold font-heading mb-20 max-w-xs lg:max-w-lg">Qu’a permis la collecte de dons ?</h2>
        <NuxtImg format="webp" quality="100" class="rounded-3xl mb-8 w-full lg:w-auto" src="/hopital-necker-visite/tablette.webp" alt="" />
        <!-- <NuxtImg class="rounded-3xl mb-8 w-full lg:w-auto" src="/hopital-necker-visite/tablette.jpeg" alt="" /> -->
        <NuxtImg format="webp" quality="100" class="rounded-3xl mb-8 w-full lg:w-auto" src="/hopital-necker-visite/fresque.webp" alt="" />
        <!-- <NuxtImg class="rounded-3xl mb-8 w-full lg:w-auto" src="/hopital-necker-visite/fresque.jpeg" alt="" /> -->
      </div>
      <div class="w-full lg:w-1/2 px-8">
        <p class="text-gray-600 text-lg mb-6">Les dons que nous avons récoltés ont permis de financer des projets d’amélioration de vie du bien-être de l’enfant à l’hôpital comme :</p>
        <div class="flex flex-col gap-2 mb-14">

          <div class="flex items-start flex-nowrap gap-3">
            <div class="mt-[7px] w-4 h-4 rounded-full bg-primary/90 border border-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewbox="0 0 16 16" fill="none">
                <path d="M12.4733 4.8067C12.4114 4.74421 12.3376 4.69461 12.2564 4.66077C12.1752 4.62692 12.088 4.6095 12 4.6095C11.912 4.6095 11.8249 4.62692 11.7436 4.66077C11.6624 4.69461 11.5886 4.74421 11.5267 4.8067L6.56001 9.78003L4.47334 7.6867C4.40899 7.62454 4.33303 7.57566 4.2498 7.54286C4.16656 7.51006 4.07768 7.49397 3.98822 7.49552C3.89877 7.49706 3.8105 7.51622 3.72844 7.55188C3.64639 7.58754 3.57217 7.63902 3.51001 7.70336C3.44785 7.76771 3.39897 7.84367 3.36617 7.92691C3.33337 8.01014 3.31728 8.09903 3.31883 8.18848C3.32038 8.27793 3.33953 8.36621 3.37519 8.44826C3.41085 8.53031 3.46233 8.60454 3.52667 8.6667L6.08667 11.2267C6.14865 11.2892 6.22238 11.3388 6.30362 11.3726C6.38486 11.4065 6.472 11.4239 6.56001 11.4239C6.64802 11.4239 6.73515 11.4065 6.81639 11.3726C6.89763 11.3388 6.97137 11.2892 7.03334 11.2267L12.4733 5.7867C12.541 5.72427 12.595 5.6485 12.632 5.56417C12.6689 5.47983 12.688 5.38876 12.688 5.2967C12.688 5.20463 12.6689 5.11356 12.632 5.02923C12.595 4.94489 12.541 4.86912 12.4733 4.8067Z" fill="white"></path>
              </svg>
            </div>
            <span class="text-lg text-gray-600">L’achat de tablettes tactiles pour les enfants</span>
          </div>


          <div class="flex items-start flex-nowrap gap-3">
            <div class="mt-[7px] w-4 h-4 rounded-full bg-primary/90 border border-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewbox="0 0 16 16" fill="none">
                <path d="M12.4733 4.8067C12.4114 4.74421 12.3376 4.69461 12.2564 4.66077C12.1752 4.62692 12.088 4.6095 12 4.6095C11.912 4.6095 11.8249 4.62692 11.7436 4.66077C11.6624 4.69461 11.5886 4.74421 11.5267 4.8067L6.56001 9.78003L4.47334 7.6867C4.40899 7.62454 4.33303 7.57566 4.2498 7.54286C4.16656 7.51006 4.07768 7.49397 3.98822 7.49552C3.89877 7.49706 3.8105 7.51622 3.72844 7.55188C3.64639 7.58754 3.57217 7.63902 3.51001 7.70336C3.44785 7.76771 3.39897 7.84367 3.36617 7.92691C3.33337 8.01014 3.31728 8.09903 3.31883 8.18848C3.32038 8.27793 3.33953 8.36621 3.37519 8.44826C3.41085 8.53031 3.46233 8.60454 3.52667 8.6667L6.08667 11.2267C6.14865 11.2892 6.22238 11.3388 6.30362 11.3726C6.38486 11.4065 6.472 11.4239 6.56001 11.4239C6.64802 11.4239 6.73515 11.4065 6.81639 11.3726C6.89763 11.3388 6.97137 11.2892 7.03334 11.2267L12.4733 5.7867C12.541 5.72427 12.595 5.6485 12.632 5.56417C12.6689 5.47983 12.688 5.38876 12.688 5.2967C12.688 5.20463 12.6689 5.11356 12.632 5.02923C12.595 4.94489 12.541 4.86912 12.4733 4.8067Z" fill="white"></path>
              </svg>
            </div>
            <span class="text-lg text-gray-600">La réalisation d’une fresque murale dans un couloir de l’hôpital</span>
          </div>

          <div class="flex items-start flex-nowrap gap-3">
            <div class="mt-[7px] w-4 h-4 rounded-full bg-primary/90 border border-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewbox="0 0 16 16" fill="none">
                <path d="M12.4733 4.8067C12.4114 4.74421 12.3376 4.69461 12.2564 4.66077C12.1752 4.62692 12.088 4.6095 12 4.6095C11.912 4.6095 11.8249 4.62692 11.7436 4.66077C11.6624 4.69461 11.5886 4.74421 11.5267 4.8067L6.56001 9.78003L4.47334 7.6867C4.40899 7.62454 4.33303 7.57566 4.2498 7.54286C4.16656 7.51006 4.07768 7.49397 3.98822 7.49552C3.89877 7.49706 3.8105 7.51622 3.72844 7.55188C3.64639 7.58754 3.57217 7.63902 3.51001 7.70336C3.44785 7.76771 3.39897 7.84367 3.36617 7.92691C3.33337 8.01014 3.31728 8.09903 3.31883 8.18848C3.32038 8.27793 3.33953 8.36621 3.37519 8.44826C3.41085 8.53031 3.46233 8.60454 3.52667 8.6667L6.08667 11.2267C6.14865 11.2892 6.22238 11.3388 6.30362 11.3726C6.38486 11.4065 6.472 11.4239 6.56001 11.4239C6.64802 11.4239 6.73515 11.4065 6.81639 11.3726C6.89763 11.3388 6.97137 11.2892 7.03334 11.2267L12.4733 5.7867C12.541 5.72427 12.595 5.6485 12.632 5.56417C12.6689 5.47983 12.688 5.38876 12.688 5.2967C12.688 5.20463 12.6689 5.11356 12.632 5.02923C12.595 4.94489 12.541 4.86912 12.4733 4.8067Z" fill="white"></path>
              </svg>
            </div>
            <span class="text-lg text-gray-600">L’achat de fauteuils-lits pour les accompagnants</span>
          </div>

        </div>
                <NuxtImg format="webp" quality="100" class="rounded-3xl w-full lg:w-auto" src="/hopital-necker-visite/fauteuil-lit.webp" alt="" />
                <!-- <NuxtImg class="rounded-3xl w-full lg:w-auto" src="/hopital-necker-visite/fauteuil-lit.jpeg" alt="" /> -->
      </div>
    </div>

    <!-- Les cyclistes -->
    <!-- <Edition1LesCyclistes /> -->

    <!-- Etapes -->
    <h2 class="text-4xl font-bold font-heading text-center mb-4">Défi sportif</h2>
    <Edition1Etapes />

    <!-- Carousel -->
    <h2 class="text-4xl font-bold font-heading text-center mb-4">Photos</h2>
    <Edition1Carousel />
  </div>
</section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Rouler pour aider - première édition',
  ogTitle: 'Rouler pour aider - première édition',
  description: 'Découvrez la première édition de Rouler pour aider, une association qui récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP.',
  ogDescription: 'Découvrez la première édition de Rouler pour aider, une association qui récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP.',
  ogImage: 'https://roulerpouraider.fr/images/logoBig_roulerPourAider.png',
})
definePageMeta({
  layout: "default",
});

const images = ref([
  {
    src: '/1ere-edition/2020-arrivee-nice.jpg',
    alt: 'Arrivée à Nice',
  },
  {
    src: '/1ere-edition/depart-lille.jpg',
    alt: 'Départ de Lille',
  },
  {
    src: '/1ere-edition/event-caritatif-1.jpg',
    alt: 'Event caritatif 1',
  },
  {
    src: '/1ere-edition/event-caritatif-2.jpg',
    alt: 'Event caritatif 2',
  },
  {
    src: '/1ere-edition/event-caritatif-3.jpg',
    alt: 'event caritatif 3',
  },
  {
    src: '/1ere-edition/event-caritatif-4.jpg',
    alt: 'Event caritatif 4',
  },
  {
    src: '/1ere-edition/mairie-velo.jpg',
    alt: 'Marie à vélo',
  },
  {
    src: '/1ere-edition/mairie-velo-2.jpg',
    alt: 'Marie à vélo 2',
  },
  {
    src: '/1ere-edition/nice-arrosage.jpg',
    alt: 'Nice arrosage',
  },
  {
    src: '/1ere-edition/nice-celebration.jpg',
    alt: 'Nice celebration',
  },
]);

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

onMounted(() => {
  getPersons();
});
</script>

