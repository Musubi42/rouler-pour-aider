<template>
  <div ref="mapContainer" id="mapContainer" class="-mt-[60px] md:mt-0 h-[500px] md:h-[750px] w-auto md:w-[885px]">
  </div>
</template>

<style scoped>

</style>

<script setup>
import L from "leaflet";
import franceBorderMetropole from "/assets/france-geojson-metropole.json";
import {
  locations,
  primary,
  primaryLight,
  secondary,
  secondaryLight,
  secondaryDark,
  mapOptions,
  geojsonOptions,
  geoJSONToSVGPath,
  createSVGFromPath,
} from "/data/locations.js";

var isMobile = ref(null);
const mapContainer = ref(null);
let map = ref(null);
let geoFranceBorder = ref(null);

const polyline = ref([]);
let animateId = null; // To hold the requestAnimationFrame ID

const markers = ref([]);

const CustomOverlay = L.Layer.extend({
  initialize: function (options) {
    // Store options or set defaults
    this._latlng = options.latlng || new L.LatLng(0, 0); // Default to 0,0 if not provided
    this._text = options.text.charAt(0).toUpperCase() + options.text.slice(1) || ""; // Default to empty string if not provided
    this._labelPosition = options.labelPosition || "right"; // Default to right if not provided
  },
  onAdd: function (map) {
    const latlng = this._latlng;
    this._div = L.DomUtil.create("div", "my-custom-overlay"); // Create a div element with a class for styling
    this._div.innerText = this._text;
    // Position it at the marker's location
    const position = map.latLngToLayerPoint(latlng);
    this._div.style.position = "absolute";
    this._div.style.color = secondaryLight;
    // TODO: retirer le text-shadow sur les villes en dehors de la carte
    this._div.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";
    if (isMobile.value) {
      this._div.style.fontSize = this._text === "Paris" ? "1rem" : "0.7rem";
      this._div.style.fontWeight = this._text === "Paris" ? 700 : 600;
    } else {
      this._div.style.fontSize = this._text === "Paris" ? "1.5rem" : "1.1rem";
      this._div.style.fontWeight = this._text === "Paris" ? 800 : 700;
    }
    // this._div.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';

    // Déterminer si left ou right
    // Si right, position.x + 20
    // Si left = position.x - _div.width - 20
    if (this._labelPosition === "right") {
      this._div.style.left = position.x - 20 + "px";
    } else {
      this._div.style.left = position.x - this._div.offsetWidth - 20 + "px";
    }
    // this._div.style.left = (position.x + 20) + 'px';
    this._div.style.top =
      this._text === "Lourdes" || this._text === "Barcelonnette"
        ? position.y - 15 + "px"
        : position.y - 5 + "px";
    this._div.style.width = "max-content";
    this._div.style.zIndex = 1000;
    map.getPanes().overlayPane.appendChild(this._div);

    // Use requestAnimationFrame to wait for the next repaint
    window.requestAnimationFrame(() => {
      // Now the element is in the DOM and we can measure it
      const width = this._div.offsetWidth;
      if (this._labelPosition === "right") {
        const offsetRight = isMobile.value ? 7 : 20;
        this._div.style.left = position.x + offsetRight + "px";
      } else {
        const offsetLeft = isMobile.value ? 10 : 20;
        this._div.style.left = position.x - width - offsetLeft + "px";
      }
    });
  },
  _updateColor: function (color) {
    this._div.style.color = color;
  },
  _updateFontSize: function (fontSize) {
    this._div.style.fontSize = fontSize;
  },
  // TODO : Comme la map ne doit pas être zoomé ou autre modification, pas besoin d'update
  // onRemove: function (map) {
  //   L.DomUtil.remove(this._div);
  // }
});

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;

  // depending on the device size change the zoom before the creation of the map
  if (isMobile.value) {
    mapOptions.zoom = 5.3;
  }

  const customIcon = new L.icon({
  iconUrl: "/steps/blue-circle.svg", // Adjust the path as necessary
  iconSize: isMobile.value ? [10, 20] : [25, 41], // Size of the icon
  iconAnchor: isMobile.value ? [5, 10] : [14, 20], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

  map = L.map(mapContainer.value, mapOptions);
  map.trackResize = false;
  map.closePopupOnClick = false;
  mapContainer.value.style.cursor = "default";

  geoFranceBorder = L.geoJSON(franceBorderMetropole, geojsonOptions).addTo(map);
  locations.forEach((location, index) => {
    // Add city markers
    const marker = L.marker(location.latLng, { icon: customIcon }).addTo(map);

    // Add text overlay next to the marker
    const textOverlay = new CustomOverlay({
      latlng: L.latLng(location.latLng[0], location.latLng[1]),
      text: location.name,
      labelPosition: isMobile.value && (location.name === "barcelonnette" || location.name === "st-Jean-de-Maurienne") ? "left" : location.labelPosition,
    }).addTo(map);

    // Add popups to the markers
    // marker.bindPopup(location.popup, {
    //   offset: L.point(-2, 35), // Adjust as necessary
    // });

    // marker.closePopupOnClick = true;

    const emit = getCurrentInstance().emit;

    let latest = locations.length === (index + 1) ? true : false;
    marker.on("mouseover", () => {
      focusMarkers(index, latest);
      polylineAnimation(line);
      changeBackgroundImage(location.name, location.imageUrl);

      // Emit a custom event with the location object
      emit('location-hovered', location?.etape, location?.etapeVille, location?.etapeDate, location?.etapeDistance);
    });

    marker.on("mouseout", () => {
      resetMarkers(index, latest);
      resetAnimation(line);
      resetBackgroundImage();
    });

    function focusMarkers(currentIndex, latest) {
      // Update current marker
      const current = markers.value[currentIndex];
      if (current) {
        current.marker.setIcon(
          new L.icon({
            iconUrl: "/steps/primaryLight-circle.svg", // Adjust the path as necessary
            iconSize: isMobile.value ? [10, 20] : [25, 41], // Size of the icon
            iconAnchor: isMobile.value ? [5, 10] : [14, 20], // Point of the icon which will correspond to marker's location
            popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
          })
        );
        current.textOverlay._updateColor(primaryLight);
      }

      // If latest marker goes to the first one of the list
      // Update next marker if it exists
      const next = markers.value[currentIndex + 1];
      if (next) {
        next.marker.setIcon(
          new L.icon({
            iconUrl: "/steps/primaryLight-circle.svg",
            iconSize: isMobile.value ? [10, 20] : [25, 41],
            iconAnchor: isMobile.value ? [5, 10] : [14, 20],
            popupAnchor: [1, -34],
          })
        );
        next.textOverlay._updateColor(primaryLight);
      }

      if (latest) {
        const firstMarker = markers.value[0];

        firstMarker.marker.setIcon(
          new L.icon({
            iconUrl: "/steps/primary-circle.svg",
            iconSize: isMobile.value ? [10, 20] : [25, 41],
            iconAnchor: isMobile.value ? [5, 10] : [14, 20],
            popupAnchor: [1, -34],
          })
        );
        firstMarker.textOverlay._updateColor(primaryLight);
      }
    }

    function resetMarkers(currentIndex, latest) {
      // Reset current marker
      const current = markers.value[currentIndex];
      if (current) {
        current.marker.setIcon(customIcon);
        current.textOverlay._updateColor(secondary);
      }

      // Reset next marker if it exists
      const next = markers.value[currentIndex + 1];
      if (next) {
        next.marker.setIcon(customIcon);
        next.textOverlay._updateColor(secondary);
      }

      if (latest) {
        const firstMarker = markers.value[0];

        firstMarker.marker.setIcon(customIcon);
        firstMarker.textOverlay._updateColor(secondary);
      }
    }

    // Store marker in the Vue reactive data if needed
    markers.value.push({ marker: marker, textOverlay: textOverlay });

    // Add lines between the markers
    const line = L.polyline(location.route, {
      color: secondary,
      dashArray: isMobile.value ? "2, 5" : "5, 10",
      dashOffset: "0",
      weight: isMobile.value ? 2 : 5,
    }).addTo(map);

    // Store the line in the Vue reactive data if needed
    polyline.value.push(line);

    // Check the size of the map and adjust the view accordingly
    // TODO : Mettre à jour le taille du texte et leur positionnement
    // const adjustMapView = () => {
    //   nextTick(() => {
    //     const svgOverlay = document.getElementById("svg-overlay");
    //     if (window.innerWidth < 600) {
    //       // Example breakpoint
    //       // map.setView(5); // Adjust zoom level and center
    //       map.setZoom(5.2);
    //       textOverlay._updateFontSize("0.5rem");
    //       // Update mapSize of the background image
    //     } else {
    //       map.setZoom(mapOptions.zoom);
    //     }
    //     let mapSize = map.getSize(); // Get current map dimensions
    //     // svgOverlay.style.width = mapSize.x + "px"; // Update SVG dimensions
    //     // svgOverlay.style.height = mapSize.y + "px";
    //     svgOverlay.setAttribute("width", mapSize.x + "px");
    //     svgOverlay.setAttribute("height", mapSize.y + "px");
    //     svgOverlay.setAttribute("viewBox", `0 0 ${mapSize.x} ${mapSize.y}`);
    //   });
    // };

    // adjustMapView(); // Adjust on initial load
    // window.addEventListener("resize", adjustMapView); // Adjust on window resize
  });

  const svgPath = geoJSONToSVGPath(franceBorderMetropole, map);
  const svgElement = createSVGFromPath(map, svgPath, "/paris.jpeg");

  nextTick(() => {
    const mapContainer = document.getElementById("mapContainer");
    mapContainer.appendChild(svgElement);
  });

  // TODO: Il faut que je crée le SVGElement au mounted, par contre à ce moment il me suffit de changer l'image
  // Créer un SVGElement sans image, au hover rajouter la bonne image
  function changeBackgroundImage(city, cityImage) {
    const backgroundImage = document.getElementById("backgroundImage");

    // Créez une nouvelle promesse qui se résout lorsque l'image est chargée
    const imageLoaded = new Promise((resolve) => {
      backgroundImage.onload = resolve;
    });

    // Changez l'URL de l'image
    backgroundImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", cityImage);

    // Attendez que l'image soit chargée avant de modifier le style
    imageLoaded.then(() => {
      geoFranceBorder.setStyle({
        fillColor: "transparent",
      });
    });
  }

  function resetBackgroundImage() {
    geoFranceBorder.setStyle({
      fillColor: primary,
    });
  }

  // Add custom overlay next to the marker
  // const textOverlay = new CustomOverlay({
  //   latlng: new L.LatLng(47.5939, 1.3281),
  //   text: 'Blois'
  // }).addTo(map);
});

function polylineAnimation(polyline) {
  let offset = 0;
  
  function animate() {
    offset -= 1;
    polyline.setStyle({
      dashOffset: offset,
      color: primaryLight,
    });
  }
  
  animateId = setInterval(animate, isMobile.value ? 45 : 30);
}

function startAnimation() {
  if (polyline.value) {
    polylineAnimation(polyline.value);
  }
}

function stopAnimation() {
  if (animateId !== null) {
    clearInterval(animateId);
    animateId = null;
  }
}

function resetAnimation(line) {
  stopAnimation();
  line.setStyle({ color: secondary });
}

console.log(isMobile);
// const customIcon = new L.icon({
//   iconUrl: "/steps/blue-circle.svg", // Adjust the path as necessary
//   iconSize: isMobile.value ? [10, 20] : [25, 41], // Size of the icon
//   iconAnchor: isMobile.value ? [5, 10] : [14, 20], // Point of the icon which will correspond to marker's location
//   popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
// });

onBeforeUnmount(() => {
  stopAnimation();
  // window.removeEventListener("resize", adjustMapView);
});
</script>
