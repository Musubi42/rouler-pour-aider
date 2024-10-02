<template>
  <section class="mt-10" >
    <div class="flex flex-row gap-4 px-4 md:px-6 py-6 bg-secondary/20 overflow-x-auto -mx-6 md:-mx-40" >
      <div class="flex flex-1 justify-center text-primary font-medium py-3 px-5 rounded-xl cursor-pointer border border-primary"
        v-for="(mounth, index) in eventMounth"
        :key="index"
        @click="chooseMounth(index)"
        :class="{'bg-primary': selectedMounth[index], 'text-white': selectedMounth[index], 'hover:bg-primary/10': !selectedMounth[index]}" >
        {{ mounth }}
      </div>
    </div>

    <div class="flex flex-wrap items-center">
      <div class="w-full sm:w-1/2 md:w-1/3 p-4" v-for="(event, index) in evenements[mounth]" :key="index">
        <NuxtLink class="relative cursor-pointer" target="_blank"
          :href="buildGoogleCalendarLink(event.titre, event.description, event.localisation, event.debut, event.fin)" >
        <!-- :style="{ 'border-color': event?.isPast ? 'gray' : 'lawngreen' }" -->
          <div class="flex flex-col gap-2 border p-4 rounded-xl ombre"
            :class="{'border-primary': !event.isPast, 'border-gray-300': event.isPast, 'cursor-not-allowed': event?.isPast, 'hover:-translate-y-2': !event.isPast }">
            <div class="flex flex-row place-content-between items-center">
              <div class="text-primary font-semibold">
                {{ event.titre }}
              </div>
              <div v-if="event?.isPast" class="p-2 rounded-md text-sm bg-primary text-white z-10 min-w-[121px]" >
                événement passé
              </div>
              <div v-if="!event?.isPast" class="p-2 rounded-md text-sm bg-primary text-white z-10 ml-5 min-w-fit" >
                {{ formatDate(event.debutOriginal) }}
              </div>
            </div>
            <div class="text-gray-500 text-ellipsis line-clamp-3 whitespace-break-spaces overflow-hidden min-h-[70px]">
              {{ event.description }} 
            </div>
            <a class="text-primary underline">
              Ajouter à mon calendrier
            </a>
          </div>
          <!-- TODO: Calculer si l'event est passé v-if="event.isPast" -->
          <!-- inset-0 bg-gray-200/10 m-[1px] backdrop-blur-[1px]  -->
          <div v-if="event?.isPast" class="absolute glassmorphism inset-0 rounded-xl" :class="{ 'cursor-not-allowed': event?.isPast }"></div>
          <!-- <div v-if="event?.isPast" class="absolute inset-0 bg-gray-200/10 m-[1px] backdrop-blur-[1px] rounded-xl"></div> -->
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.glassmorphism {
  background: rgba( 255, 255, 255, 0.25 );
  /* box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ); */
  backdrop-filter: blur( 1px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  /* border: 1px solid rgba( 255, 255, 255, 0.18 ); */
  margin: 2px;
}

.ombre {
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
}
</style>


<script setup lang="ts">
let monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const eventMounth = ["Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre"];

const selectedMounth = ref([true, false, false, false, false, false, false]);
const mounth = ref("Mars");

// TODO : A mettre dans utils
// utils/formatDate.js
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const daysOfWeek = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  const dayOfWeek = daysOfWeek[date.getUTCDay()];

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');

  return `${dayOfWeek} ${day}/${month}`;
}

const chooseMounth = (index: number) => {
  selectedMounth.value = Array(eventMounth.length).fill(false);
  selectedMounth.value[index] = true;

  mounth.value = eventMounth[index];
}

const eventTitle = encodeURIComponent("Mon Événement");
const eventDetails = encodeURIComponent("Voici les détails de l'événement");
const eventLocation = encodeURIComponent("Senlis, 60300 Senlis, France");
const startDate = "20240430T090000Z"; // Format: YYYYMMDDThhmmssZ
const endDate = "20240430T110000Z";

const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDetails}&location=${eventLocation}&sf=true&output=xml`;

// Utilisez googleCalendarUrl comme l'attribut href de votre lien
const buildGoogleCalendarLink = (title, description, location, startDate, endDate) => {
  const now = new Date();
  const convertedNow = formatDateToCustom(now);

  if (startDate < convertedNow) {
    return;
  }

  const eventTitle = encodeURIComponent(title);
  const eventDetails = encodeURIComponent(description);
  const eventLocation = encodeURIComponent(location);
  const formattedStartDate = encodeURIComponent(startDate);
  const formattedEndDate = encodeURIComponent(endDate);

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${formattedStartDate}/${formattedEndDate}&details=${eventDetails}&location=${eventLocation}&sf=true&output=xml`;
};

function formatDateToCustom(date) {
    if (!(date instanceof Date)) {
        throw new Error("Input must be a Date object.");
    }

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; 
    const day = date.getUTCDate();
    
    const milliseconds = date.getUTCHours() * 3600000 + date.getUTCMinutes() * 60000 + date.getUTCSeconds() * 1000 + date.getUTCMilliseconds();

    const monthFormatted = month.toString().padStart(2, '0');
    const dayFormatted = day.toString().padStart(2, '0');
    
    return `${year}${monthFormatted}${dayFormatted}T${milliseconds}Z`;
}

const evenements = ref<[]>([]);

const runtimeConfig = useRuntimeConfig();
const {
  public: { strapiBaseUrl, strapiToken },
} = runtimeConfig;

const transformEvenementsObject = (partenaireData) => {
  let eventsByMonth = {};

  partenaireData.forEach((data) => {
    const { titre, description, localisation, debut, fin } = data.attributes;
    let mois = monthNames[new Date(debut).getMonth()];

    let event = {
      titre,
      description,
      localisation,
      debut: new Date(debut).toISOString().replace(/-|:|\.\d\d\d/g,""),
      debutOriginal: debut,
      fin: new Date(fin).toISOString().replace(/-|:|\.\d\d\d/g,""),
      isPast: new Date(debut) < new Date(),
    };

    if (!eventsByMonth[mois]) {
      eventsByMonth[mois] = [];
    }

    eventsByMonth[mois].push(event);
  });

  return eventsByMonth;
};

const getEvenements = async () => {
  const url = `${strapiBaseUrl}/api/evenements`;

  // if (process.env.GENERATE) {
    const { data, pending, error } = await useAsyncData("evenements", () => {
      return $fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${strapiToken}`,
        },
      });
    });

    if (!error.value && !pending.value && data.value) {
      evenements.value = transformEvenementsObject(data.value.data);
    } else {
      console.error("oui" + error.value);
    }
  // }
};

getEvenements();

</script>