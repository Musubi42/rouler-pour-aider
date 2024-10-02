<template>
  <section class="overflow-hidden pt-6">
    <div class="container mx-auto md:px-4">
      <div class="rounded-2xl pt-14 lg:px-18">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-2/3">
            <div
              :style="{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/hopital-necker-visite/image00060.jpeg')`,
              }"
              class="bg-contain h-full rounded-2xl pt-6 px-3 md:px-8 overflow-hidden"
            >
              <h3 class="text-center font-semibold text-lg text-white drop-shadow-2xl">
                Contribuez à notre cause pour améliorer le bien-être des patients et de
                leur famille. Chaque don compte pour faire une réelle différence !
              </h3>

              <div class="flex flex-col w-full bottom-2 mt-20 gap-4">
                <div class="flex flex-row gap-4 md:gap-6">
                  <div
                    class="flex flex-1 flex-col p-2 md:p-6 rounded-xl border border-white bg-white/50 justify-center backdrop-blur-sm"
                  >
                    <h4 class="text-center text-base font-light">Objectif</h4>
                    <p
                      class="text-base md:text-3xl font-semibold text-center text-secondary"
                    >
                      60 000€
                    </p>
                  </div>
                  <div
                    class="flex flex-1 flex-col p-2 md:p-6 rounded-xl border border-white bg-white/50 justify-center backdrop-blur-sm"
                  >
                    <h4 class="text-center text-sm font-light">Jours restants</h4>
                    <p
                      class="text-base md:text-3xl font-semibold text-secondary text-center"
                    >
                      {{ dayLeft() }}
                    </p>
                  </div>
                  <div
                    class="flex flex-1 flex-col p-2 md:p-6 rounded-xl border border-white bg-white/50 justify-center backdrop-blur-sm"
                  >
                    <h4 class="text-center text-base font-light">Donateurs</h4>
                    <p
                      class="text-base md:text-3xl font-semibold text-secondary text-center"
                    >
                      {{ websiteStore.contributors_count }}
                    </p>
                  </div>
                </div>

                <div class="containerr mt-12 mb-8"
                  ref="donationsContainer" >
                  <div ref="progressBarContainer" class="progress2 cursor-auto">
                    <div ref="progressBar" class="progress-bar2 relative" title="Dons">
                      <span class="tooltip"
                        ><CountUp :end="isVisible ? websiteStore.current_amount : 0" />
                        €</span
                      >
                    </div>
                  </div>
                </div>

                <div class="flex flex-row gap-6 justify-center mb-4">
                  <button type="" class="mb-5">
                    <NuxtLink
                      to="https://solidarite.fondationaphp.fr/projects/rouler-pour-aider-fr"
                      class="text-white bg-primary py-3 px-5 rounded-xl"
                    >
                      Faites un don
                    </NuxtLink>
                  </button>

                  <NuxtLink to="/qui-sommes-nous/hopital-necker" class="text-white underline drop-shadow-md"
                    ><p class="drop-shadow-xl">En savoir plus</p></NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/3 pl-4 pt-10 md:pt-0">
            <div class="flex flex-col justify-between h-full gap-6">
              <div
                v-for="(donationGoal, index) in donationGoals"
                :key="index"
                class="relative rounded-xl flex items-center p-5 gap-3 bg-white border border-black"
              >
                <span class="absolute -top-6 left-3"
                  ><span v-html="formatNumber(donationGoal.current_amount)"></span>
                  €</span
                >
                <div
                  class="absolute top-0 left-0 bottom-0 bg-green-500 text-base z-0 transition-[width] duration-500 ease-in-out rounded-xl"
                  :style="{ width: donationGoal.percentage + '%' }"
                ></div>

                <!-- Content -->
                <div
                  class="z-10 flex items-center justify-center w-12 h-12 rounded-lg shadow-md"
                >
                  <img :src="donationGoal.logo" alt="Logo de donation" />
                </div>

                <p class="z-10 mb-1 text-black">
                  {{ donationGoal.text }}
                </p>

                <!-- Percentage text -->
                <span class="z-10 absolute bottom-0 right-0 px-2">
                  <p class="text-black">{{ donationGoal.percentage }}% de {{ donationGoal.objective }}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.containerr {
  width: auto;
  text-align: center;
}

.progress2 {
  padding: 6px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
}

.progress-bar2 {
  height: 18px;
  border-radius: 30px;
  background-image: linear-gradient(
    to bottom,
    rgba(114, 188, 122, 0.3),
    rgba(114, 188, 122, 0.5)
  );
  transition: 2.5s linear;
  transition-property: width, rgba(0, 0, 0, 0.25);
}

.tooltip {
  position: absolute;
  bottom: 150%;
  right: 0%;
  transform: translateX(50%);
  margin-bottom: 5px;
  background-color: white;
  padding: 4px 8px;
  color: black;
  font-size: 12px;
  border-radius: 4px;
  display: block;
  white-space: nowrap;
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px; /* Half the width of the triangle */
  border-width: 5px;
  border-style: solid;
  border-color: white transparent transparent transparent;
}

.progress2:not(.progress-moved) .progress-bar2 {
  width: 0; /* Ensure the width starts at 0 when not visible */
}

.progress2.progress-moved .progress-bar2 {
  /* Your existing animation styles */
}

.progress-moved .progress-bar2 {
  background-color: rgba(114, 188, 122);
  animation: progressAnimation 6s;
}

@keyframes progressAnimation {
  0% {
    width: 0%;
    background-color: rgba(114, 188, 122, 0.3);
  }
  100% {
    width: 90%;
    background-color: rgba(114, 188, 122, 0.5);
  }
}
</style>

<script setup lang="ts">
const donationGoals = reactive([
  {
    logo: "logos/lit-hopitaux.png",
    text: "10 fauteuils-lits",
    objective: 10000,
    current_amount: 0,
    percentage: 0,
  },
  {
    logo: "logos/animation.png",
    text: "2 semaines d'animation",
    objective: 10000,
    current_amount: 0,
    percentage: 0,
  },
  {
    logo: "logos/decoration-salle.png",
    text: "2 services décorés",
    objective: 10000,
    current_amount: 0,
    percentage: 0,
  },
  {
    logo: "logos/salle-parents.png",
    text: "1 création d'un salon des parents",
    objective: 30000,
    current_amount: 0,
    percentage: 0,
  },
]);

interface DonationGoal {
  current_amount: number;
  target_amount: number;
  days_left: number;
  contributors_count: number;
}

const donations = ref<DonationGoal | null>(null);

const donationTargetAmountPercentage = computed(() => {
  if (donations.value) {
    return (donations.value.current_amount / donations.value.target_amount) * 100;
  }
  return 0;
});

const dayLeft = () => {
  const today = new Date();
  const end = new Date("2024-09-30");
  const diff = end.getTime() - today.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days;
};

const getDonations = async () => {
  const { data, pending, error } = await useAsyncData("todos", () => {
    return $fetch('/api/refreshDonation', {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      server: false, // This ensures the data is only fetched on the client-side
    });
  });


  if (!error.value && !pending.value && data.value) {
    donations.value = transformDonations(data.value);
    updateDonationGoals();
  } else {
    console.error(error);
  }
};

const transformDonations = (donations) => {
  return {
    current_amount: Math.round(donations.current_amount),
    target_amount: donations.target_amount,
    days_left: donations.days_left,
    contributors_count: donations.contributors_count,
  };
};

const updateDonationGoals = (donationsValue) => {
  let remainingAmount = donationsValue ? donationsValue.current_amount : 0;

  for (let i = 0; i < donationGoals.length; i++) {
    if (remainingAmount >= donationGoals[i].objective) {
      donationGoals[i].current_amount = donationGoals[i].objective;
      donationGoals[i].percentage = 100;
      remainingAmount -= donationGoals[i].objective;
    } else {
      donationGoals[i].current_amount = remainingAmount;
      donationGoals[i].percentage = Math.round((remainingAmount / donationGoals[i].objective) * 100);
      remainingAmount = 0;
    }
  }
};

const formatNumber = (value) => {
  const parts = value.toString().split(/(?=(?:...)*$)/);
  return parts.map((part) => `<span class="mr-1">${part}</span>`).join("  ");
};

const donationsContainer = ref();
const progressBar = ref(null);
const progressBarContainer = ref(null);
let observer;

const isVisible = ref(false);

const websiteStore = useWebsiteStore();

onMounted(async () => {
  await websiteStore.fetch();

  const { current_amount, contributors_count } = storeToRefs(websiteStore);

  watch(() => websiteStore.data, (newVal, oldVal) => {
    let currentValue = null;

    if (newVal != oldVal) {
      donations.value = transformDonations(newVal);
      updateDonationGoals(newVal);
    }

  }, { immediate: true, deep: true });

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log("entry");
        if (entry.isIntersecting) {
          isVisible.value = entry.isIntersecting;
          progressBar.value.classList.add("progress-moved");
          console.log("donationTargetAmountPercentage");
          let percentage = (donations.value.current_amount / donations.value.target_amount) * 100;
          progressBar.value.style.width = `${percentage}%`;
          progressBar.value.style.backgroundColor = "rgba(114, 188, 122)";
          // progressBarContainer.value.style.width = `${donationTargetAmountPercentage.value}%`;
          // entry.target.classList.add('progress-moved');
          observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
      });
    },
    {
      threshold: 0.5, // Configure as needed, 0.5 means 50% of the item should be visible
    }
  );

  // if (donationsContainer.value) {
    observer.observe(donationsContainer.value);
  // }
});

onBeforeMount(async () => {
  // await getDonations();
});
</script>
