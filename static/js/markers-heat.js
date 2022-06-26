function heat() {
  d3.json("/api/intensity").then(function(data){
  //console.log(data)
  // //list for lat, lon points for heat layer
  var alllatlong= [];
  // lists for cfg
  heatLat= [];
  heatLon= [];
  // add lat and lon to lists
  heatLat.push(data[0].Lat);
  heatLon.push(data[0].Lon);
    //loop through data to create dictionary of lat lon points per plug in template
    for (var i = 0; i < data[0].length; i++) {
      //dict with lat long point
      eachlatlong = {"lat": data[i].Lat, "lng": data[i].Lon};
      //list of lists for heatlayer
      alllatlong.push(eachlatlong);
    };

var heatData = {
  max: 8,
  data: [alllatlong]
};

//base layer is grayscale
var baseLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18,
  subdomains: 'abcd',
  minZoom: 0,
  ext: 'png'
});

var cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 2,
  "maxOpacity": .8,
  // scales the radius based on map zoom
  "scaleRadius": true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": true,
  // which field name in your data represents the latitude - default "lat"
  latField: heatLat,
  // which field name in your data represents the longitude - default "lng"
  lngField: heatLon,
  // which field name in your data represents the data value - default "value"
  //valueField: 'count'
};

var heatmapLayer = new HeatmapOverlay(cfg);

var myMap = new L.Map('map-canvas', {
  center: [ 37.09, -95.71 ],
  zoom: 5,
  layers: [baseLayer, heatmapLayer]
});

heatmapLayer.setData(heatData);

// Create a layer control
// Pass it our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseLayer, heatmapLayer, {
collapsed: false
}).addTo(myMap);


});
};

heat();