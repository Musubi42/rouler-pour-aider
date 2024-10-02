<template>
  <section class="py-3">
    <div class="container px-4 mx-auto">
      <div class="pt-6 pb-8 rounded-xl">
        <div class="px-6">
        <!-- TODO : Mettre un meilleur titre -->
          <!-- <h4 class="text-lg text-gray-100 font-semibold mb-6">Étapes</h4> -->
          <img src="/carte.jpeg" alt="" class="h-[400px] w-auto mx-auto mb-10" >
          <div class="w-full mt-6 pb-6 overflow-x-auto">
            <table class="w-full min-w-max">
              <thead>
                <tr class="text-left text-sm font-medium text-white">
                  <th class="p-0 w-4">
                    <div class="py-3 px-6 rounded-tl-xl bg-primary">
                      <span class="font-semibold">Étape</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-primary">
                      <span class="font-semibold">Type</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-primary">
                      <span class="font-semibold">Date</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-primary">
                      <span class="font-semibold"
                        >Départ &amp; Arrivée</span
                      >
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-primary">
                      <span class="font-semibold">Distance</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 rounded-tr-xl bg-primary">
                      <span class="font-semibold">Dénivelé</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr ref="addToRefs"
                  v-for="(etape, index) in etapes"
                  :key="index" >
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6"
                      :class="{ 'rounded-bl-xl': index === etapes.length - 1 }"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      <div class="flex items-center justify-center">
                        <!-- <div
                          class="flex items-center justify-center w-10 h-10 mr-3 bg-gray-400 bg-opacity-20 rounded-md"
                        >
                          <img src="" alt="" />
                        </div> -->
                        <span class="text-sm font-medium">{{ etape.etape }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      {{ etape.type }}
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      <span class="text-sm font-medium"
                        >{{ etape.date}}</span
                      >
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      <span class="text-sm font-medium"
                        >{{ etape.departArrivee }}</span
                      >
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      <span class="text-sm font-medium">{{etape.distance }}</span>
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6"
                      :class="{ 'rounded-br-xl': index === etapes.length - 1 }"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      <span class="text-sm font-medium">{{ etape.denivele }}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const carousel = ref(null);
const etapes = ref([
  {
    etape: '1',
    type: 'Plat',
    date: '26 juillet 2020',
    departArrivee: 'Lille > Amiens',
    distance: '112 km',
    denivele: '755+',
  },
  {
    etape: '2',
    type: 'Plat',
    date: '27 juillet 2020',
    departArrivee: 'Amiens > Reims',
    distance: '199 km',
    denivele: '1861+',
  },
  {
    etape: '3',
    type: 'Plat',
    date: '28 juillet 2020',
    departArrivee: 'Reims > Troyes',
    distance: '138 km',
    denivele: '1154+',
  },
  {
    etape: '4',
    type: 'Accidentée',
    date: '29 juillet 2020',
    departArrivee: 'Troyes > Semur-en-Auxois',
    distance: '130 km',
    denivele: '1474+',
  },
  {
    etape: '5',
    type: 'Plat',
    date: '30 juillet 2020',
    departArrivee: 'Semur-en-Auxois > Dijon',
    distance: '77 km',
    denivele: '1170+',
  },
  {
    etape: '6',
    type: 'Plat',
    date: '31 juillet 2020',
    departArrivee: 'Dijon > Lyon',
    distance: '223 km',
    denivele: '1170+',
  },
  {
    etape: '7',
    type: 'Accidentée',
    date: '2 août 2020',
    departArrivee: 'Lyon > Grenobles',
    distance: '135 km',
    denivele: '1579+',
  },
  {
    etape: '8',
    type: 'Montagne',
    date: '28 juillet 2020',
    departArrivee: 'Grenobles > Barcelonnette',
    distance: '164 km',
    denivele: '3772+',
  },
  {
    etape: '9',
    type: 'Montagne',
    date: '4 août 2020',
    departArrivee: 'Barcelonnette > Nice',
    distance: '149 km',
    denivele: '2377+',
  },
]);

</script>