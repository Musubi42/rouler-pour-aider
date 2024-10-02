<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
}
</style>

<script setup>
// import { ref, onMounted } from 'vue';
import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
import franceBorder from '/assets/france-geojson.json'; // Adjust path as necessary

const mapContainer = ref(null);

onMounted(() => {
  const map = L.map(mapContainer.value, {
    center: [46.2276, 2.2137], // Centered over France
    zoom: 5
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const geoJsonLayer = L.geoJSON(franceBorder, {
    style: {
      color: 'blue',
      weight: 2
    }
  }).addTo(map);

  // Fit map to GeoJSON bounds
  map.fitBounds(geoJsonLayer.getBounds());

  // Define bounds for the image overlay, should ideally match or be within France's bounds
  const bounds = geoJsonLayer.getBounds();

  // Add an image overlay
  const imageUrl = '/hospital.png'; // This should be the URL to the image you want to use
  L.imageOverlay(imageUrl, bounds, {opacity: 0.7}).addTo(map);

  // Apply clipping using CSS or SVG (additional setup may be required)
});
</script>