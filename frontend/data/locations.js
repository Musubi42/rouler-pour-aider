export const locations = [
  {
    name: "paris",
    etape: 1,
    etapeVille: "Paris > Blois",
    etapeDate: "DIM. 07/07",
    etapeDistance: "250km",
    labelPosition: 'right',
    latLng: [48.8566, 2.3522],
    popup: "Paris, 1ère étape, Paris à Blois 250km",
    route: generateIntermediatePoints([48.8566, 2.3522], [47.593899, 1.328100], 10),
    imageUrl: '/steps/paris.webp'
  },
  {
    name: "blois",
    etape: 2,
    etapeVille: "Blois > Poitiers",
    etapeDate: "",
    etapeDistance: "250km",
    labelPosition: 'left',
    latLng: [47.593899, 1.328100],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([47.593899, 1.328100], [46.580002, 0.340000], 10), // Just an example
    imageUrl: '/steps/blois.webp'
  },
  {
    name: "poitiers",
    etape: 3,
    etapeVille: "Poitiers > Royan",
    etapeDate: "",
    etapeDistance: "250km",
    labelPosition: 'left',
    latLng: [46.580002, 0.340000],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([46.580002, 0.340000], [45.625580, -1.026930], 10), // Just an example
    imageUrl: '/steps/poitiers.webp'
  },
  {
    name: "royan",
    etape: 4,
    etapeVille: "Royan > Mont-de-Marsan",
    etapeDate: "",
    etapeDistance: "250km",
    labelPosition: 'left',
    latLng: [45.625580, -1.026930],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([45.625580, -1.026930], [43.890970, -0.497870], 10), // Just an example
    imageUrl: '/steps/royan.webp'
  },
  {
    name: "mont-de-Marsan",
    etape: 5,
    etapeVille: "Mont-de-Marsan > Lourdes",
    etapeDate: "",
    etapeDistance: "250km",
    labelPosition: 'left',
    latLng: [43.890970, -0.497870],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([43.890970, -0.497870], [43.097710, -0.045710], 10), // Just an example
    imageUrl: '/steps/mont-de-marsan.webp'
  },
  {
    name: "lourdes",
    etape: 6,
    etapeVille: "Loures > Loudenvielle",
    etapeDate: "",
    etapeDistance: "250km",
    latLng: [43.097710, -0.045710],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([43.097710, -0.045710], [42.795689, 0.412230], 10), // Just an example
    imageUrl: '/steps/lourdes.webp'
  },
  {
    name: "loudenvielle",
    etape: 7,
    etapeVille: "Loudenvielle > Plateau-de-Beille",
    etapeDate: "",
    etapeDistance: "250km",
    labelPosition: 'left',
    latLng: [42.795689, 0.412230],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([42.795689, 0.412230], [42.7218637792, 1.6878555819], 10), // Just an example
    imageUrl: '/steps/loudenvielle.webp'
  },
  {
    name: "plateau-de-Beille",
    etape: 8,
    etapeVille: "Plateau-de-Beille > Béziers",
    etapeDate: "",
    etapeDistance: "250km",
    latLng: [42.7218637792, 1.6878555819],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([42.7218637792, 1.6878555819], [43.344233, 3.215795], 10), // Just an example
    imageUrl: '/steps/plateau-de-beille.webp'
  },
  {
    name: "béziers",
    etape: 9,
    etapeVille: "Béziers > Avignon",
    etapeDate: "",
    etapeDistance: "250km",
    latLng: [43.344233, 3.215795],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([43.344233, 3.215795], [43.949317, 4.805528], 10), // Just an example
    imageUrl: '/steps/beziers.webp'
  },
  {
    name: "avignon",
    etape: 10,
    etapeVille: "Avignon > Sisteron",
    etapeDate: "",
    etapeDistance: "250km",
    latLng: [43.949317, 4.805528],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([43.949317, 4.805528], [44.198475, 5.939613], 10), // Just an example
    imageUrl: '/steps/avignon.webp'
  },
  {
    name: "sisteron",
    etape: 11,
    etapeVille: "Sisteron > Barcelonnette",
    etapeDate: "",
    etapeDistance: "250km",
    latLng: [44.198475, 5.939613],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([44.198475, 5.939613], [44.386300, 6.650463], 10), // Just an example
    imageUrl: '/steps/sisteron.webp'
  },
  {
    name: "barcelonnette",
    etape: 12,
    etapeVille: "Barcelonnette > St-Jean-de-Maurienne",
    etapeDate: "",
    etapeDistance: "250km",
    latLng: [44.386300, 6.650463],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([44.386300, 6.650463], [45.275403, 6.344886], 10), // Just an example
    imageUrl: '/steps/barcelonnette.webp'
  },
  {
    name: "st-Jean-de-Maurienne",
    etape: 13,
    etapeVille: "St-Jean-de-Maurienne > Annecy",
    etapeDate: "",
    etapeDistance: "250km",
    latLng: [45.275403, 6.344886],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([45.275403, 6.344886], [45.899247, 6.129384], 10), // Just an example
    imageUrl: '/steps/st-jean-de-maurienne.webp'
  },
  {
    name: "annecy",
    etape: 14,
    etapeVille: "Annecy > Lons-le-Saunier",
    etapeDate: "",
    etapeDistance: "250km",
    latLng: [45.899247, 6.129384],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([45.899247, 6.129384], [46.671361, 5.550796], 10), // Just an example
    imageUrl: '/steps/annecy.webp'
  },
  {
    name: "lons-le-Saunier",
    etape: 15,
    etapeVille: "Lons-le-Saunier > Chaumont",
    etapeDate: "",
    etapeDistance: "250km",
    latLng: [46.671361, 5.550796],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([46.671361, 5.550796], [48.113748, 5.1392559], 10), // Just an example
    imageUrl: '/steps/lons-le-saunier.webp'
  },
  {
    name: "chaumont",
    etape: 16,
    etapeVille: "Chauumont > Reims",
    etapeDate: "",
    etapeDistance: "250km",
    latLng: [48.113748, 5.1392559],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([48.113748, 5.1392559], [49.258329, 4.031696], 10), // Just an example
    imageUrl: '/steps/chaumont.webp'
  },
  {
    name: "reims",
    etape: 17,
    etapeVille: "Reims > Verneuil-en-Halatte",
    etapeDate: "",
    etapeDistance: "250km",
    latLng: [49.258329, 4.031696],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([49.258329, 4.031696], [49.283329, 2.51667], 10), // Just an example
    imageUrl: '/steps/reims.webp'
  },
  {
    name: "verneuil-en-Halatte",
    etape: 18,
    etapeVille: "Verneuil-en-Halatte > Paris",
    etapeDate: "",
    etapeDistance: "250km",
    labelPosition: 'left',
    latLng: [49.283329, 2.51667],
    popup: "Blois, a beautiful city with rich history in the Loire Valley.",
    route: generateIntermediatePoints([49.283329, 2.51667], [48.8566, 2.3522], 10), // Just an example
    imageUrl: '/steps/verneuil-en-halatte.webp'
  }
  // Add more locations as needed
];

// TODO: Le zoom n'est pas désactivé
export const mapOptions = {
  zoom: 5.5, // Default zoom for dektop devices
  center: [46.2276, 2.2137],
  touchZoom: false,
  dragging: false,
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  attributionControl: false,
};

export const primary = "#72BC7A";
export const primaryLight = "	hsl(126, 36%, 79%)";
export const primaryDark = "	hsl(126, 36%, 39%)";
export const secondary = "#2A5FA4";
export const secondaryLight = "hsl(214, 59%, 70%)";
export const secondaryDark = "hsl(214, 59%, 20%)";

export const geojsonOptions = {
  zoomControl: false,
  style: () => ({
    fillColor: primary,     // Only inside France
    weight: 1,
    opacity: 1,
    color: secondary,      // Color of the border line
    fillOpacity: 1,         // Solid fill
  }),
  interactive: false  // This prevents the layer from being interactive
};

function generateIntermediatePoints(start, end, numPoints) {
  let points = [start];
  for (let i = 1; i <= numPoints; i++) {
    let lat = start[0] + (end[0] - start[0]) * i / (numPoints + 1);
    let lng = start[1] + (end[1] - start[1]) * i / (numPoints + 1);
    points.push([lat, lng]);
  }
  points.push(end);
  return points;
}

export function geoJSONToSVGPath(geoJson, map) {
  let pathString = '';
  const layer = L.geoJSON(geoJson);
  layer.eachLayer(function(layer) {
      const svgPath = new L.SVG();
      svgPath._container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const feature = layer.feature;

      if (feature.geometry.type === 'Polygon') {
          const latlngs = layer.getLatLngs();
          // Single Polygon
          pathString += convertCoordinatesToPath(latlngs[0], map);
      } else if (feature.geometry.type === 'MultiPolygon') {
          // MultiPolygon handling
          const multiLatlngs = layer.getLatLngs();
          multiLatlngs.forEach((polygon) => {
              pathString += convertCoordinatesToPath(polygon[0], map);  // Assuming the first array is the outer boundary
              // If there are holes, they are subsequent arrays
              for (let i = 1; i < polygon.length; i++) {
                  pathString += convertCoordinatesToPath(polygon[i], map);
              }
          });
      }
  });
  return pathString;
}

function convertCoordinatesToPath(coordinates, map) {
    let path = '';
    coordinates.forEach((point, index) => {
        const pt = map.latLngToLayerPoint(point);
        const command = index === 0 ? 'M' : 'L';
        path += `${command}${pt.x},${pt.y} `;
    });
    return path + 'Z'; // Close the path
}

export function createSVGFromPath(map, pathData) {
    const svgNS = "http://www.w3.org/2000/svg";
    const mapSize = map.getSize();  // Get current map dimensions
    const bounds = map.getBounds(); // Get geographic bounds visible in the map
    let topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
    let bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("id", "svg-overlay");
    svg.setAttribute("width", mapSize.x + "px");
    svg.setAttribute("height", mapSize.y + "px");
    svg.setAttribute("viewBox", `0 0 ${mapSize.x} ${mapSize.y}`);
    svg.style.position = "absolute";
    svg.style.left = "0px";
    svg.style.top = "0px";
    svg.style.backgroundColor = "rgb(248 250 252)";
    // svg.setAttribute("viewBox", "0 0 800 600");  // Adjust based on the desired viewable area
    


    const defs = document.createElementNS(svgNS, "defs");

    // Create clipPath using France's border path data
    const clipPath = document.createElementNS(svgNS, "clipPath");
    clipPath.setAttribute("id", "france-clip");

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", pathData);
    clipPath.appendChild(path);
    defs.appendChild(clipPath);

    // Define linear gradient
    const gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.setAttribute("id", "overlay-gradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "0%");
    gradient.setAttribute("y2", "100%");
    appendGradientStops(gradient, svgNS);
    defs.appendChild(gradient);

    svg.appendChild(defs);

    // Image constrained by the clip path
    const image = document.createElementNS(svgNS, "image");
    image.setAttribute("id", "backgroundImage");
    image.setAttributeNS("http://www.w3.org/1999/xlink", "href", '/paris.jpeg');
    image.setAttribute("width", Math.abs(bottomRight.x - topLeft.x) + "px");
    image.setAttribute("height", Math.abs(bottomRight.y - topLeft.y) + "px");

    // // Adjust these values based on trial and error or calculations
    // let scaleX = 1;  // Scale factor for width (adjust as needed)
    // let scaleY = 1;  // Scale factor for height (adjust as needed)
    // let translateX = -50;  // X translation to center the image (adjust as needed)
    // let translateY = -50;  // Y translation to center the image (adjust as needed)

    // image.setAttribute("transform", `scale(${scaleX} ${scaleY}) translate(${translateX} ${translateY})`);
    // image.setAttribute("transform", "translateY(-50px)");
    // image.setAttribute("preserveAspectRatio", "xMidYMid meet");  // Ensures the image is centered and scaled to fit within the viewBox


    // image.setAttribute("width", 700 + "px");
    // image.setAttribute("height", 711 + "px");
    // image.style.transform = "translateY(-50px)";
    image.setAttribute("clip-path", "url(#france-clip)");
    svg.appendChild(image);

    // Rectangle for gradient overlay, also constrained by the same clip path
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("width", mapSize.x + "px");
    rect.setAttribute("height", mapSize.y + "px");
    rect.setAttribute("fill", "url(#overlay-gradient)");
    rect.setAttribute("clip-path", "url(#france-clip)");
    svg.appendChild(rect);

    return svg;
}

function appendGradientStops(gradient, svgNS) {
    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("style", "stop-color:rgba(0, 0, 0, 0.2); stop-opacity:1");
    gradient.appendChild(stop1);

    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("style", "stop-color:rgba(0, 0, 0, 0.5); stop-opacity:1");
    gradient.appendChild(stop2);
}



// onMounted(() => {
//   const map = L.map(mapContainer.value, mapOptions);

//   mapContainer.value.style.cursor = 'default'; 

//   geoFranceBorder = L.geoJSON(franceBorderMetropole, geojsonOptions).addTo(map);

//   // TODO: Create a route that isn't linear but with curves
//   const routeParisToBlois = generateIntermediatePoints([48.8566, 2.3522], [47.5939, 1.3281], 10);
//   polyline.value = L.polyline(routeParisToBlois, {
//     color: 'white',
//     dashArray: '20, 20',
//     dashOffset: '0',
//     weight: 5
//   }).addTo(map);

//   // Add markers


  
//   const parisMarker = L.marker([48.8566, 2.3522], { icon: customIcon }).addTo(map);
//   parisMarker.bindPopup('Paris, 1ère étape, Paris à Blois 250km', {
//     offset: L.point(-2, 35) // Moves the popup 20 pixels down from the marker
//   });
//   markers.value.push(parisMarker);

//   parisMarker.on('mouseover', () => {
//     polylineAnimation(polyline.value);
//     changeBackgroundImage('paris');
//   });

//   parisMarker.on('mouseout', () => {
//     stopAnimation();
//     resetAnimation();
//     resetBackgroundImage();
//   });


//   const bloisMarker = L.marker([47.5939, 1.3281], { icon: customIcon }).addTo(map);
//   var point = L.point(200, 300);
//   bloisMarker.bindPopup('Blois, a beautiful city with rich history in the Loire Valley.', {
//     offset: L.point(-2, 35) // Moves the popup 20 pixels down from the marker
//   });

//   const CustomOverlay = L.Layer.extend({
//     onAdd: function (map) {
//       console.log(map);
//       const latlng = new L.LatLng(47.5939, 1.3281);
//       console.log("latlng", latlng);
//       this._div = L.DomUtil.create('div', 'my-custom-overlay'); // Create a div element with a class for styling
//       this._div.innerText =  "Blois"
//       // Position it at the marker's location
//       const position = map.latLngToLayerPoint(latlng);
//       this._div.style.position = 'absolute';
//       this._div.style.left = (position.x + 20) + 'px';
//       this._div.style.top = position.y + 'px';
//       this._div.style.zIndex = 1000;
//       map.getPanes().overlayPane.appendChild(this._div);
//     },
//     onRemove: function (map) {
//       L.DomUtil.remove(this._div);
//     },
//     updatePosition: function() {
//       const position = this._map.latLngToLayerPoint(latlng);
//       this._div.style.left = position.x + 'px';
//       this._div.style.top = position.y + 'px';
//     }
//   });

//   // Add custom overlay next to the marker
//   const textOverlay = new CustomOverlay({
//     latlng: new L.LatLng(47.5939, 1.3281),
//     text: 'Blois'
//   }).addTo(map);

//   markers.value.push(bloisMarker);



//   // TODO: Il faut que je crée le SVGElement au mounted, par contre à ce moment il me suffit de changer l'image
//   // Créer un SVGElement sans image, au hover rajouter la bonne image
//   function changeBackgroundImage(city) {
//     geoFranceBorder.setStyle({
//       fillColor: 'transparent',
//     });

//     if (city === 'paris') {
//       console.log("Paris");
      
//       const svgPath = geoJSONToSVGPath(franceBorderMetropole, map)

//       const svgElement = createSVGFromPath(map, svgPath, '/paris.jpeg');
//       document.body.appendChild(svgElement);
//     }
//     // Add cases for other cities similarly
//   }

//   function resetBackgroundImage() {
//     geoFranceBorder.setStyle({
//       fillColor: primary,
//     });
//   }
// });

