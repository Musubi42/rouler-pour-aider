<template>
  <div class="mx-8 mt-20">
    <section
      v-for="(partenaire, index) in partenaires"
      :key="index"
      class="flex flex-col w-full container mx-auto justify-between mb-6"
    >
      <div class="flex flex-col">
        <div
          class="relative flex w-full content-between"
          :class="{
            'flex-row-reverse': index % 2 === 1,
            'flex-row': index % 2 === 0,
          }"
        >
          <div class="flex flex-col gap-4 justify-start items-center align-middle w-full md:w-7/12">
            <!-- Title -->
            <div class="font-semibold text-3xl w-full text-left md:text-center">
              {{ partenaire.title }}
            </div>
            <div
            v-if="isMobile"
            class="w-5/12 md:w-5/12"
            :class="{
              'mr-10': index % 2 === 1,
              'md:mr-20': index % 2 === 1,
              'ml-10': index % 2 === 0,
            }" >
            <!-- TODO : Trouver le moyen d'host les images venant du backoffice directement sur Vercel, Git webhooks ? -->
            <NuxtImg
              format="webp"
              quality="80"
              :src="`${partenaire.partenairePhotoPath}`"
              class="h-full md:h-72 object-contain"
              alt=""
            />
          </div>
            <!-- Description -->
            <div class="w-full text-left">{{ partenaire.description }}</div>
            <!-- Réseaux sociaux -->
            <div
              v-if="partenaire.siteWebUrl || partenaire.reseaux"
              class="hidden md:absolute mt-7 md:mt-0 bottom-0 left-0 md:flex items-center w-full"
              :class="{
                'flex-row': index % 2 === 1,
              }" >
              <NuxtLink
                v-if="partenaire.siteWebUrl"
                class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                :to="`${partenaire?.siteWebUrl}`"
                target="_blank"
              >
                <IconsWeb />
              </NuxtLink>
              <NuxtLink
                v-if="partenaire?.reseaux?.facebook"
                class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                :to="`${partenaire?.facebook}`"
                target="_blank"
              >
                <IconsFacebook />
              </NuxtLink>
              <NuxtLink
                v-if="partenaire?.reseaux?.twitter"
                class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                :to="`${partenaire?.twitter}`"
                target="_blank"
              >
                <IconsTwitter />
              </NuxtLink>
              <NuxtLink
                v-if="partenaire?.reseaux?.linkedin"
                class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                :to="`${partenaire?.linkedin}`"
                target="_blank"
              >
                <IconsLinkedin />
              </NuxtLink>
              <NuxtLink
                v-if="partenaire?.reseaux?.instagram"
                class="inline-flex items-center justify-center w-12 h-12 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                :to="`${partenaire?.instagram}`"
                target="_blank"
              >
                <IconsInstagram />
              </NuxtLink>
            </div>
          </div>
          <!-- Image -->
          <div
            v-if="!isMobile"
            class="w-5/12 md:w-5/12"
            :class="{
              'mr-10': index % 2 === 1,
              'md:mr-20': index % 2 === 1,
              'ml-10': index % 2 === 0,
            }" >
            <!-- TODO : Trouver le moyen d'host les images venant du backoffice directement sur Vercel, Git webhooks ? -->
            <NuxtImg
              format="webp"
              quality="80"
              :src="`${partenaire.partenairePhotoPath}`"
              class="h-full md:h-72 object-contain"
              alt=""
            />
          </div>
        </div>

        <div class="flex md:hidden items-center w-full mt-6">
          <NuxtLink
            v-if="partenaire.siteWebUrl"
            class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
            :to="`${partenaire?.siteWebUrl}`"
            target="_blank"
          >
            <IconsWeb />
          </NuxtLink>
          <NuxtLink
            v-if="partenaire?.reseaux?.facebook"
            class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
            :to="`${partenaire?.facebook}`"
            target="_blank"
          >
            <IconsFacebook />
          </NuxtLink>
          <NuxtLink
            v-if="partenaire?.reseaux?.twitter"
            class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
            :to="`${partenaire?.twitter}`"
            target="_blank"
          >
            <IconsTwitter />
          </NuxtLink>
          <NuxtLink
            v-if="partenaire?.reseaux?.linkedin"
            class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
            :to="`${partenaire?.linkedin}`"
            target="_blank"
          >
            <IconsLinkedin />
          </NuxtLink>
          <NuxtLink
            v-if="partenaire?.reseaux?.instagram"
            class="inline-flex items-center justify-center w-12 h-12 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
            :to="`${partenaire?.instagram}`"
            target="_blank"
          >
            <IconsInstagram />
          </NuxtLink>
        </div>
      </div>

      <img
        src="/dashedLine-straight.png"
        alt=""
        class="my-10"
        :style="{ display: index === partenaires.length - 1 ? 'none' : 'block' }"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Rouler pour aider - Nos partenaires',
  ogTitle: 'Rouler pour aider - Nos partenaires',
  description: 'Découvrez nos partenaires qui nous soutiennent dans notre mission de récolter des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP.',
  ogDescription: 'Découvrez nos partenaires qui nous soutiennent dans notre mission de récolter des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP.',
  ogImage: 'https://roulerpouraider.fr/images/logoBig_roulerPourAider.png',
})

interface Partenaire {
  title: string;
  description: string;
  reseaux: {
    facebook: string;
    instagram: string;
    tiktok: string;
    twitter: string;
    linkedin: string;
  };
  partenairePhotoPath: string;
  siteWebUrl: string;
}

const partenaires = ref<Partenaire[]>([]);

const runtimeConfig = useRuntimeConfig();
const {
  public: { strapiBaseUrl, strapiToken },
} = runtimeConfig;

const transformPartenaireObject = (partenaireData) => {
  return partenaireData.map((data) => {
    const { image, ...otherAttributes } = data.attributes;
    let url = image.data.attributes.url;
    let lastPart = url.split("/").pop();

    return {
      ...otherAttributes,
      partenairePhotoPath: "/backoffice/" + lastPart,
    };
  });
};

const getPartenaires = async () => {
  const url = `${strapiBaseUrl}/api/partenaires?populate=*`;
  // if (process.env.GENERATE) {
    const { data, pending, error } = await useAsyncData("partenaires", () => {
      return $fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${strapiToken}`,
        },
      });
    });

    if (!error.value && !pending.value && data.value) {
      partenaires.value = transformPartenaireObject(data.value.data);
    } else {
      console.error(error.value);
    }
  // }
};

getPartenaires();

const isMobile = ref(false);

onMounted(() => {
  // Initialize carousel or set up resize observers if needed
  isMobile.value = window.innerWidth < 768;
});
</script>
