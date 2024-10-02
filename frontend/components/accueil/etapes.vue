<template>
  <section class="py-3">
    <div class="container md:px-4 mx-auto">
      <div class="pt-6 rounded-xl">
        <div class="md:px-6">
        <!-- TODO : Mettre un meilleur titre -->
          <!-- <h4 class="text-lg text-gray-100 font-semibold mb-6">Étapes</h4> -->
          <div class="w-full mt-6 pb-6 overflow-x-auto">
            <table class="w-full min-w-max">
              <thead>
                <tr class="text-left text-sm font-medium text-white">
                  <th class="p-0 w-4">
                    <div class="py-3 px-2 md:px-6 rounded-tl-xl bg-primary">
                      <span class="font-semibold">Étape</span>
                    </div>
                  </th>
                  <!-- <th class="p-0">
                    <div class="py-3 px-6 bg-primary">
                      <span class="font-semibold">Type</span>
                    </div>
                  </th> -->
                  <!-- <th class="p-0">
                    <div class="py-3 px-6 bg-primary">
                      <span class="font-semibold">Date</span>
                    </div>
                  </th> -->
                  <th class="p-0">
                    <div class="py-3 px-2 md:px-6 bg-primary rounded-tr-xl">
                      <span class="font-semibold"
                        >Départ &amp; Arrivée</span
                      >
                    </div>
                  </th>
                  <!-- <th class="p-0">
                    <div class="py-3 px-6 bg-primary">
                      <span class="font-semibold">Distance</span>
                    </div>
                  </th> -->
                  <!-- <th class="p-0">
                    <div class="py-3 px-6 rounded-tr-xl bg-primary">
                      <span class="font-semibold">Dénivelé</span>
                    </div>
                  </th> -->
                </tr>
              </thead>
              <tbody>
                <tr ref="addToRefs"
                  v-for="(etape, index) in etapes"
                  :key="index" >
                  <td class="p-0">
                    <div class="flex items-center h-16 px-2 md:px-6"
                      :class="{ 'rounded-bl-xl': index === etapes.length - 1 }"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      <div class="flex items-center justify-center w-full">
                        <!-- <div
                          class="flex items-center justify-center w-10 h-10 mr-3 bg-gray-400 bg-opacity-20 rounded-md"
                        >
                          <img src="" alt="" />
                        </div> -->
                        <span class="text-sm font-medium">{{ etape.etape }}</span>
                      </div>
                    </div>
                  </td>
                  <!-- <td class="p-0">
                    <div class="flex items-center h-16 px-6"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      {{ etape.type }}
                    </div>
                  </td> -->
                  <!-- <td class="p-0">
                    <div class="flex items-center h-16 px-6"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      <span class="text-sm font-medium"
                        >{{ etape.date}}</span
                      >
                    </div>
                  </td> -->
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6"
                      :class="{ 'rounded-br-xl': index === etapes.length - 1 }"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      <span class="text-sm font-medium"
                        >{{ etape.departArrivee }}</span
                      >
                    </div>
                  </td>
                  <!-- <td class="p-0">
                    <div class="flex items-center h-16 px-6"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      <span class="text-sm font-medium">{{etape.distance }}</span>
                    </div>
                  </td> -->
                  <!-- <td class="p-0">
                    <div class="flex items-center h-16 px-6"
                      :class="{ 'rounded-br-xl': index === etapes.length - 1 }"
                      :style="{ 'background-color': index % 2 === 0 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 0 ? 'black' : 'white' }" >
                      <span class="text-sm font-medium">{{ etape.denivele }}</span>
                    </div>
                  </td> -->
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
    departArrivee: 'Paris > Blois',
  },
  {
    etape: '2',
    departArrivee: 'Blois > Poitier',
  },
  {
    etape: '3',
    departArrivee: 'Poitier > Royan',
  },
  {
    etape: '4',
    departArrivee: 'Royan > Mont-de-Marsan',
  },
  {
    etape: '5',
    departArrivee: 'Mont-de-Marsan > Lourdes',
  },
  {
    etape: '6',
    departArrivee: 'Lourdes > Loudenvielle',
  },
  {
    etape: '7',
    departArrivee: 'Loudenvielle > Plateau de Beille',
  },
  {
    etape: '8',
    departArrivee: 'Plateau de Beille > Béziers',
  },
  {
    etape: '9',
    departArrivee: 'Béziers > Avignon',
  },
  {
    etape: '10',
    departArrivee: 'Avignon > Sisteron',
  },
  {
    etape: '11',
    departArrivee: 'Sisteron > Barcelonnette',
  },
  {
    etape: '12',
    departArrivee: 'Barcelonnette > St-Jean-de-Maurienne',
  },
  {
    etape: '13',
    departArrivee: 'St-Jean-de-Maurienne > Annecy',
  },
  {
    etape: '14',
    departArrivee: 'Annecy > Lons-le-Saunier',
  },
  {
    etape: '15',
    departArrivee: 'Lons-le-Saunier > Chaumont',
  },
  {
    etape: '16',
    departArrivee: 'Chaumont > Reims',
  },
  {
    etape: '17',
    departArrivee: 'Reims > Verneuil-en-Halatte',
  },
  {
    etape: '18',
    departArrivee: 'Verneuil-en-Halatte > Paris',
  },
  
]);

</script>