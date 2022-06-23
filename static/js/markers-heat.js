// Initialize the necessary LayerGroups
let layers = {
  quakes: new L.LayerGroup(),
  plates: new L.LayerGroup()
};

// Set data source for earthquake data
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Give each earthquake a popup describing the place, time, magnitude, and depth of the earthquake
  function popUpMsg(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p> <b>Date/Time: </b>" + new Date(feature.properties.time) + "</p>" +
        "<p> <b>Magnitude:</b> " + feature.properties.mag + "; <b>Depth:</b> " + feature.geometry.coordinates[2] + "</p>");
    }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the popUpMsg function once for each piece of data in the array
  let earthquakes = L.geoJSON(earthquakeData, {
          pointToLayer: function (feature, latlng) {
              if (feature.geometry.coordinates[2] >= 90) {
                  return L.circleMarker(latlng, {
                    radius: feature.properties.mag * 5,
                    fillColor: "#E74C3C",
                    color: "black",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  });
            
                } else if (feature.geometry.coordinates[2] >= 70) {
                  return L.circleMarker(latlng, {
                    radius: feature.properties.mag * 5,
                    fillColor: "#DC7633",
                    color: "black",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  });
            
                } else if (feature.geometry.coordinates[2] >= 50) {
                  return L.circleMarker(latlng, {
                    radius: feature.properties.mag * 5,
                    fillColor: "#F39C12",
                    color: "black",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  });
                                      
                } else if (feature.geometry.coordinates[2] >= 30) {
                    return L.circleMarker(latlng, {
                    radius: feature.properties.mag * 5,
                    fillColor: "#F1C40F",
                    color: "black",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  });
                                      
                } else if (feature.geometry.coordinates[2] >= 10) {
                    return L.circleMarker(latlng, {
                    radius: feature.properties.mag * 5,
                    fillColor: "#DFFF00",
                    color: "black",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  });
              
                } else {
                    return L.circleMarker(latlng, {
                    radius: feature.properties.mag * 5,
                    fillColor: "#2ECC71",
                    color: "black",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  });
                } 
          },
          onEachFeature: popUpMsg
      });
  
  // Add to the Earthquakes layer
  earthquakes.addTo(layers.quakes);
};

// Set data source for techtonic data
const tectUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

// Perform a GET request to the query URL/
d3.json(tectUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createTects function
  createTects(data.features);
});

function createTects(tectData) {

  // Create a GeoJSON layer that contains the features array on the tectData object
  // Assign color and set fill opacity to 0
  var tectplates = L.geoJSON(tectData, {
    onEachFeature: function (feature, layer) {
      layer.bindTooltip(feature.geometry).setStyle({color :'#FFA500', fillOpacity: 0})
  }});

  // Add to the Tectonic Plates layer
  tectplates.addTo(layers.plates);
}

// Create the base layers
let satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18
  });

let grayMap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18,
  subdomains: 'abcd',
  minZoom: 0,
  ext: 'png'
});

let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Define a baseMaps object to hold our base layers
let baseMaps = {
    "Satellite" : satelliteMap,
    "Grayscale": grayMap,
    "Topographic" : topoMap
    };

// Create an overlay object to hold our overlay
let overlayMaps = {
  "Tectonic Plates": layers.plates,
  "Earthquakes": layers.quakes
};

// Create our map, giving it the satellite base and earthquake/plates layers to display on load
let myMap = L.map("map", {
    center: [ 37.09, -95.71 ],
    zoom: 5,
    layers: [satelliteMap, layers.plates]
});

// Create a layer control
// Pass it our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

// Add legend
function getColor(d) {
  if (d === '90') {return "#E74C3C"}
  else if (d === '70') {return "#DC7633"}
  else if (d === '50') {return "#F39C12"}
  else if (d === '30') {return "#F1C40F"}
  else if (d === '10') {return "#DFFF00"}
  else if (d === '-10') {return "#2ECC71"}
  else {return "#FFEDA0"};
  }

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {
  
  var div = L.DomUtil.create('div', 'info legend');
  labels = ['-10','10','30', '50','70','90'];

  for (var i = 0; i < labels.length; i++) {
      div.innerHTML += '<i style="background:' + getColor(labels[i]) +
      '"></i> ' + labels[i] + (labels[i + 1] ? '&ndash;' + labels[i + 1] + '<br>' : '+');
      }
      return div;
      };

legend.addTo(myMap);