<template>
  <div>
    <section class="flex flex-wrap flex-col md:flex-row bg-gray-200 pt-10">
      <div
        v-for="(reportage, index) in reportages"
        :key="index"
        class="px-4 mb-8 w-full md:w-4/12 flex flex-col"
      >
        <div class="bg-white flex flex-col h-1/2">
          <NuxtLink :to="`${reportage.reportageUrl}`" class="relative h-full">
            <img
              :src="reportage?.reportageTvThumbnailUrl"
              alt=""
              class="w-full h-full object-cover overflow-hidden rounded-t"
            />
            <span class="top-4 left-4 absolute rounded-md bg-primary py-1 px-2">{{
              reportage?.source
            }}</span>
          </NuxtLink>
        </div>

        <div class="flex gap-4 flex-col p-4 h-1/2 bg-white rounded-b">
          <div v-if="reportage.tags" class="flex flex-row text-secondary">
            <span v-for="(tag, index) in reportage.tags" :key="index" class="bg-secondary py-1 px-2 text-white rounded-lg"
            >
              #{{ tag }}
              <span v-if="index < reportage.tags.length - 1" class="mx-2">|</span>
            </span>
          </div>
          <div v-else class="text-white">
            <span>|</span>
          </div>
          <div class="flex flex-col justify-between flex-wrap h-full" >
            <h3 class="mb-4 md:mb-1 text-2xl font-bold text-ellipsis line-clamp-3 whitespace-break-spaces overflow-hidden" >
              {{ reportage.title }}
            </h3>
            <div class="flex justify-between">
              <p class="font-light">{{ formatDate(reportage.dataPublication) }}</p>
              <button type="">
                <NuxtLink
                  :to="`${reportage.reportageUrl}`"
                  class="rounded-md bg-primary/90 text-white hover:bg-primary py-1 px-2"
                  target="_blank" >Regarder sur {{ reportage.reportageUrlOrigin }}
                  </NuxtLink >
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Rouler pour aider - Nos reportages TV',
  ogTitle: 'Rouler pour aider - Nos reportages TV',
  description: 'L\'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP. Cette ...',
  ogDescription: 'L\'association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l\'Hôpital Necker – Enfants malades AP-HP. Cette ...',
  ogImage: 'https://roulerpouraider.fr/images/logoBig_roulerPourAider.png',
});

interface Reportage {
  id: number;
  source: string;
  tags: string[];
  title: string;
  reportageTvThumbnailUrl: string;
  reportageUrl: string;
  reportageUrlOrigin: string;
  datePublication: number;
}

const reportages = ref<Reportage[]>([]);
const runtimeConfig = useRuntimeConfig();
const {
  public: { strapiBaseUrl, strapiToken },
} = runtimeConfig;

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

const transformReportageTvObject = (reportageTvData) => {
  return reportageTvData.map((data) => {
    const { thumbnail, ...otherAttributes } = data.attributes;
    return {
      ...otherAttributes,
      reportageTvThumbnailUrl: strapiBaseUrl + thumbnail.data.attributes.url,
      id: data.id,
    };
  });
};

const getReportages = async () => {
  const url = `${strapiBaseUrl}/api/reportage-tvs?populate=*`;

  const { data, pending, error } = await useAsyncData("reportages", () => {
      return $fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${strapiToken}`,
        },
      });
    });

  if (data.value) {
    reportages.value = transformReportageTvObject(data.value.data);
  } else {
    console.error(error.value);
  }
};

getReportages();
</script>
