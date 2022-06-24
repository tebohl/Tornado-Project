// Initialize the necessary LayerGroups
let layers = {
  markers: new L.LayerGroup()
  // plates: new L.LayerGroup()
};

// console.log(markers)

// Set data source for tornadoes data
const queryUrl = "../../static/data/tornadoes.json"

var twisterIcon = L.icon({
  iconUrl: '../../static/img/twister.png',

  iconSize:     [36, 24] // size of the icon
  // shadowSize:   [50, 64], // size of the shadow
  // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],  // the same for the shadow
  // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function(data) {
  createMarkers(data);
});

function createMarkers(data) {
  for (var i = 0; i < 100; i++) {
  //   let point = L.circle([data[i].Lat, data[i].Lon], {
  //     color: "red",
  //     fillColor: "red",
  //     fillOpacity: 0.75,
  //     radius: 10
  //   })
    let direction = parseFloat(data[i].Azimuth);
    
    let point = L.marker(L.latLng(data[i].Lat, data[i].Lon), {
      // radius: 10,
      icon: twisterIcon,
      rotationAngle: direction
  });

    point.bindPopup("<h3>" + data[i].Shape +
        "</h3><hr><p> <b>Date/Time: </b>" + data[i].zTime + "</p>" +
        "<p> <b>Angle:</b> " + data[i].Azimuth + "; <b>MXDV:</b> " + data[i].MXDV + "</p>");

    point.addTo(layers.markers);
}
}


// }

// // Set data source for earthquake data
// const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// // Perform a GET request to the query URL/
// d3.json(queryUrl).then(function(data) {
//   createFeatures(data.features);
// });

// function createFeatures(earthquakeData) {

//   // Give each earthquake a popup describing the place, time, magnitude, and depth of the earthquake
//   function popUpMsg(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//         "</h3><hr><p> <b>Date/Time: </b>" + new Date(feature.properties.time) + "</p>" +
//         "<p> <b>Magnitude:</b> " + feature.properties.mag + "; <b>Depth:</b> " + feature.geometry.coordinates[2] + "</p>");
//     }

//   // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // Run the popUpMsg function once for each piece of data in the array
//   let earthquakes = L.geoJSON(earthquakeData, {
//           pointToLayer: function (feature, latlng) {
//               if (feature.geometry.coordinates[2] >= 90) {
//                   return L.circleMarker(latlng, {
//                     radius: feature.properties.mag * 5,
//                     fillColor: "#E74C3C",
//                     color: "black",
//                     weight: 1,
//                     opacity: 1,
//                     fillOpacity: 0.8
//                   });
            
//                 } else if (feature.geometry.coordinates[2] >= 70) {
//                   return L.circleMarker(latlng, {
//                     radius: feature.properties.mag * 5,
//                     fillColor: "#DC7633",
//                     color: "black",
//                     weight: 1,
//                     opacity: 1,
//                     fillOpacity: 0.8
//                   });
            
//                 } else if (feature.geometry.coordinates[2] >= 50) {
//                   return L.circleMarker(latlng, {
//                     radius: feature.properties.mag * 5,
//                     fillColor: "#F39C12",
//                     color: "black",
//                     weight: 1,
//                     opacity: 1,
//                     fillOpacity: 0.8
//                   });
                                      
//                 } else if (feature.geometry.coordinates[2] >= 30) {
//                     return L.circleMarker(latlng, {
//                     radius: feature.properties.mag * 5,
//                     fillColor: "#F1C40F",
//                     color: "black",
//                     weight: 1,
//                     opacity: 1,
//                     fillOpacity: 0.8
//                   });
                                      
//                 } else if (feature.geometry.coordinates[2] >= 10) {
//                     return L.circleMarker(latlng, {
//                     radius: feature.properties.mag * 5,
//                     fillColor: "#DFFF00",
//                     color: "black",
//                     weight: 1,
//                     opacity: 1,
//                     fillOpacity: 0.8
//                   });
              
//                 } else {
//                     return L.circleMarker(latlng, {
//                     radius: feature.properties.mag * 5,
//                     fillColor: "#2ECC71",
//                     color: "black",
//                     weight: 1,
//                     opacity: 1,
//                     fillOpacity: 0.8
//                   });
//                 } 
//           },
//           onEachFeature: popUpMsg
//       });
  
//   // Add to the Earthquakes layer
//   earthquakes.addTo(layers.quakes);
// };

// // Set data source for techtonic data
// const tectUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

// // Perform a GET request to the query URL/
// d3.json(tectUrl).then(function (data) {
//   // Once we get a response, send the data.features object to the createTects function
//   createTects(data.features);
// });

// function createTects(tectData) {

//   // Create a GeoJSON layer that contains the features array on the tectData object
//   // Assign color and set fill opacity to 0
//   var tectplates = L.geoJSON(tectData, {
//     onEachFeature: function (feature, layer) {
//       layer.bindTooltip(feature.geometry).setStyle({color :'#FFA500', fillOpacity: 0})
//   }});

//   // Add to the Tectonic Plates layer
//   tectplates.addTo(layers.plates);
// }

// Create the base layers
let grayScale = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18,
  subdomains: 'abcd',
  minZoom: 0,
  ext: 'png'
});

let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  });

let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Define a baseMaps object to hold our base layers
let baseMaps = {
    "Grayscale" : grayScale,
    "Street" : streetMap,
    "Topographic" : topoMap
    };

// Create an overlay object to hold our overlay
let overlayMaps = {
  "Tornado Paths": layers.markers
  // "Earthquakes": layers.quakes
};

// Create our map, giving it the satellite base and earthquake/plates layers to display on load
let myMap = L.map("map", {
    center: [ 37.09, -95.71 ],
    zoom: 5,
    layers: [grayScale, layers.markers]
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

var sliderControl = L.control.sliderControl({position: "topleft", layer: layers.markers});

//Add the slider to the map ;-)
myMap.addControl(sliderControl);

//And initialize the slider
sliderControl.startSlider();


// Custom marker code
(function() {
  // save these original methods before they are overwritten
  var proto_initIcon = L.Marker.prototype._initIcon;
  var proto_setPos = L.Marker.prototype._setPos;

  var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

  L.Marker.addInitHook(function () {
      var iconOptions = this.options.icon && this.options.icon.options;
      var iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
      if (iconAnchor) {
          iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
      }
      this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom' ;
      this.options.rotationAngle = this.options.rotationAngle || 0;

      // Ensure marker keeps rotated during dragging
      this.on('drag', function(e) { e.target._applyRotation(); });
  });

  L.Marker.include({
      _initIcon: function() {
          proto_initIcon.call(this);
      },

      _setPos: function (pos) {
          proto_setPos.call(this, pos);
          this._applyRotation();
      },

      _applyRotation: function () {
          if(this.options.rotationAngle) {
              this._icon.style[L.DomUtil.TRANSFORM+'Origin'] = this.options.rotationOrigin;

              if(oldIE) {
                  // for IE 9, use the 2D rotation
                  this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)';
              } else {
                  // for modern browsers, prefer the 3D accelerated version
                  this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
              }
          }
      },

      setRotationAngle: function(angle) {
          this.options.rotationAngle = angle;
          this.update();
          return this;
      },

      setRotationOrigin: function(origin) {
          this.options.rotationOrigin = origin;
          this.update();
          return this;
      }
  });
})();

// Slider control code
L.Control.SliderControl = L.Control.extend({
  options: {
      position: 'topright',
      layers: null,
      timeAttribute: 'time',
      isEpoch: false,     // whether the time attribute is seconds elapsed from epoch
      startTimeIdx: 0,    // where to start looking for a timestring
      timeStrLength: 19,  // the size of  yyyy-mm-dd hh:mm:ss - if millis are present this will be larger
      maxValue: -1,
      minValue: 0,
      showAllOnStart: false,
      markers: null,
      range: false,
      follow: false,
      sameDate: false,
      alwaysShowDate : false,
      rezoom: null
  },

  initialize: function (options) {
      L.Util.setOptions(this, options);
      this._layer = this.options.layer;

  },

  extractTimestamp: function(time, options) {
      if (options.isEpoch) {
          time = (new Date(parseInt(time))).toString(); // this is local time
      }
      return time.substr(options.startTimeIdx, options.startTimeIdx + options.timeStrLength);
  },

  setPosition: function (position) {
      var map = this._map;

      if (map) {
          map.removeControl(this);
      }

      this.options.position = position;

      if (map) {
          map.addControl(this);
      }
      this.startSlider();
      return this;
  },

  onAdd: function (map) {
      this.options.map = map;

      // Create a control sliderContainer with a jquery ui slider
      var sliderContainer = L.DomUtil.create('div', 'slider', this._container);
      $(sliderContainer).append('<div id="leaflet-slider" style="width:200px"><div class="ui-slider-handle"></div><div id="slider-timestamp" style="width:200px; margin-top:13px; background-color:#FFFFFF; text-align:center; border-radius:5px;"></div></div>');
      //Prevent map panning/zooming while using the slider
      $(sliderContainer).mousedown(function () {
          map.dragging.disable();
      });
      $(document).mouseup(function () {
          map.dragging.enable();
          //Hide the slider timestamp if not range and option alwaysShowDate is set on false
          if (options.range || !options.alwaysShowDate) {
              $('#slider-timestamp').html('');
          }
      });

      var options = this.options;
      this.options.markers = [];

      //If a layer has been provided: calculate the min and max values for the slider
      if (this._layer) {
          var index_temp = 0;
          this._layer.eachLayer(function (layer) {
              options.markers[index_temp] = layer;
              ++index_temp;
          });
          options.maxValue = index_temp - 1;
          this.options = options;
      } else {
          console.log("Error: You have to specify a layer via new SliderControl({layer: your_layer});");
      }
      return sliderContainer;
  },

  onRemove: function (map) {
      //Delete all markers which where added via the slider and remove the slider div
      for (i = this.options.minValue; i <= this.options.maxValue; i++) {
          map.removeLayer(this.options.markers[i]);
      }
      $('#leaflet-slider').remove();

      // unbind listeners to prevent memory leaks
      $(document).off("mouseup");
      $(".slider").off("mousedown");
  },

  startSlider: function () {
      _options = this.options;
      _extractTimestamp = this.extractTimestamp
      var index_start = _options.minValue;
      if(_options.showAllOnStart){
          index_start = _options.maxValue;
          if(_options.range) _options.values = [_options.minValue,_options.maxValue];
          else _options.value = _options.maxValue;
      }
      $("#leaflet-slider").slider({
          range: _options.range,
          value: _options.value,
          values: _options.values,
          min: _options.minValue,
          max: _options.maxValue,
          sameDate: _options.sameDate,
          step: 1,
          slide: function (e, ui) {
              var map = _options.map;
              var fg = L.featureGroup();
              if(!!_options.markers[ui.value]) {
                  // If there is no time property, this line has to be removed (or exchanged with a different property)
                  if(_options.markers[ui.value].feature !== undefined) {
                      if(_options.markers[ui.value].feature.properties[_options.timeAttribute]){
                          if(_options.markers[ui.value]) $('#slider-timestamp').html(
                              _extractTimestamp(_options.markers[ui.value].feature.properties[_options.timeAttribute], _options));
                      }else {
                          console.error("Time property "+ _options.timeAttribute +" not found in data");
                      }
                  }else {
                      // set by leaflet Vector Layers
                      if(_options.markers [ui.value].options[_options.timeAttribute]){
                          if(_options.markers[ui.value]) $('#slider-timestamp').html(
                              _extractTimestamp(_options.markers[ui.value].options[_options.timeAttribute], _options));
                      }else {
                          console.error("Time property "+ _options.timeAttribute +" not found in data");
                      }
                  }

                  var i;
                  // clear markers
                  for (i = _options.minValue; i <= _options.maxValue; i++) {
                      if(_options.markers[i]) map.removeLayer(_options.markers[i]);
                  }
                  if(_options.range){
                      // jquery ui using range
                      for (i = ui.values[0]; i <= ui.values[1]; i++){
                         if(_options.markers[i]) {
                             map.addLayer(_options.markers[i]);
                             fg.addLayer(_options.markers[i]);
                         }
                      }
                  }else if(_options.follow){
                      for (i = ui.value - _options.follow + 1; i <= ui.value ; i++) {
                          if(_options.markers[i]) {
                              map.addLayer(_options.markers[i]);
                              fg.addLayer(_options.markers[i]);
                          }
                      }
                  }else if(_options.sameDate){
                      var currentTime;
                      if (_options.markers[ui.value].feature !== undefined) {
                          currentTime = _options.markers[ui.value].feature.properties.time;
                      } else {
                          currentTime = _options.markers[ui.value].options.time;
                      }
                      for (i = _options.minValue; i <= _options.maxValue; i++) {
                          if(_options.markers[i].options.time == currentTime) map.addLayer(_options.markers[i]);
                      }
                  }else{
                      for (i = _options.minValue; i <= ui.value ; i++) {
                          if(_options.markers[i]) {
                              map.addLayer(_options.markers[i]);
                              fg.addLayer(_options.markers[i]);
                          }
                      }
                  }
              };
              if(_options.rezoom) {
                  map.fitBounds(fg.getBounds(), {
                      maxZoom: _options.rezoom
                  });
              }
          }
      });
      if (!_options.range && _options.alwaysShowDate) {
          $('#slider-timestamp').html(_extractTimeStamp(_options.markers[index_start].feature.properties[_options.timeAttribute], _options));
      }
      for (i = _options.minValue; i <= index_start; i++) {
          _options.map.addLayer(_options.markers[i]);
      }
  }
});

L.control.sliderControl = function (options) {
  return new L.Control.SliderControl(options);
};