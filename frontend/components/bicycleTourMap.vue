<template>
  <div class="relative h-screen">
  <!-- Why not -->
  <!-- <LMap 
      style="width: 100%; height: 100%" 
      :zoom="5.5" 
      :center="[46.2276, 2.2137]"
      :zoomControl="false"
      :scrollWheelZoom="false" 
      :doubleClickZoom="false" 
      :touchZoom="false" 
      :dragging="false"
    > -->
    <LMap style="width: 100%; height: 100%"
      :zoom="5.5"
      :center="[46.2276, 2.2137]"
      :touchZoom="false"
      :dragging="false"
      :zoomControl="false" >
      <LTileLayer style="background-color: red" />
      <LGeoJson :geojson="franceBorder" :options="geojsonOptions"
        :optionsStyle="options" />
      <LMarker 
        :lat-lng="[48.8566, 2.3522]"
        :icon="customIcon"
        @mouseover="startAnimation" @mouseout="resetAnimation" >
        <LPopup>Paris, the capital city of France.</LPopup>
      </LMarker>
      <LMarker :lat-lng="[47.5939, 1.3281]"
        :icon="customIcon" >
        <LPopup>Blois, a beautiful city with rich history in the Loire Valley.</LPopup>
      </LMarker>
      <LPolyline :lat-lngs="[[48.8566, 2.3522], [47.5939, 1.3281]]" :options="polylineOptions" ref="animatedLine"></LPolyline>
    </LMap>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// TODO : Ne garder que la métropole
import franceBorder from '/assets/france-geojson.json'; // adjust path as necessary

// const polylineOptions = reactive({
//   color: 'red',
//   dashArray: '10, 20',
//   weight: 5
// });

const polylineOptions = {
  color: 'red',
  dashArray: '10, 20',
  weight: 5
};

// You can style the GeoJSON layer as needed
const geojsonOptions = ref({
  style: {
    fillColor: 'transparent',     // Only inside France
    weight: 100,
    opacity: 1,
    color: 'red',         // Color of the border line
    fillOpacity: 0         // Solid fill
  }
});

const options = ref({
    fillColor: '#72BC7A',     // Only inside France
    weight: 1,
    opacity: 1,
    color: '#2A5FA4',         // Color of the border line
    fillOpacity: 1         // Solid fill
});

const customIcon = new L.icon({
  iconUrl: '/blue-circle.svg', // Adjust the path as necessary
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
});

/**
 * Generates intermediate points between two geographical coordinates.
 * @param {Array} start The starting coordinate [latitude, longitude].
 * @param {Array} end The ending coordinate [latitude, longitude].
 * @param {number} numPoints The number of intermediate points to generate.
 * @returns {Array} Array of points including start and end.
 */
function generateIntermediatePoints(start, end, numPoints) {
    let points = [];
    // Include the start point
    points.push(start);

    for (let i = 1; i <= numPoints; i++) {
        let lat = start[0] + (end[0] - start[0]) * i / (numPoints + 1);
        let lng = start[1] + (end[1] - start[1]) * i / (numPoints + 1);
        points.push([lat, lng]);
    }

    // Include the end point
    points.push(end);
    return points;
}

// Usage
let start = [48.8566, 2.3522]; // Paris
let end = [47.5939, 1.3281];   // Blois
let numIntermediatePoints = 10; // Number of intermediate points

let route = generateIntermediatePoints(start, end, numIntermediatePoints);

</script>

<style scoped>
/* Ensure the map takes full height */
.h-screen { height: 100vh; }
</style>
