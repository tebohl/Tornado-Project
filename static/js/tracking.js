// Initialize the necessary LayerGroups
let layers = {
  markers: new L.LayerGroup()
};
  // plates: new L.LayerGroup()
  
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
let map = L.map("map", {
    center: [ 37.09, -95.71 ],
    zoom: 5,
    layers: [grayScale, layers.markers]
});

// Create a layer control
// Pass it our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

// Set data source for tornadoes data
const queryUrl = "../../static/data/tornadoes.json"

// let dropdownValue = null
// let results = null
let resultCount = null

// Set date selector at load
function init(){
  // Code that runs once (only on page load or refresh)
  // Fetch the JSON data and console log it to confirm retrieval

  d3.json(queryUrl).then(function(data) {

      const groups = data.reduce((groups, cell) => {
        const date = cell.zTime.split('T')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(cell);
        return groups;
      }, {});
    
      // Edit: to add it in the array format instead
      const dateCells = Object.keys(groups).map((date) => {
        return {
          date,
          cells: groups[date]
        };
      });
    
      console.log(dateCells);

      // Populate the dropdown menu with the available dates
      let date_select = d3.select('#selDataset');
      for(let i=0; i<dateCells.length; i++){
          date_select.append("option")
          .text(dateCells[i].date)
          .attr("value", dateCells[i].date)
      }
      
      let dropdownValue = dateCells[0].date
      let results = dateCells.filter(i=> i.date == dropdownValue) // .filter(i=> i.Time > sliderVal - )
      let initialDate = dateCells[0].date

      // Create the slidebar
      let recordCt = results[0].cells.length

      let begin = results[0].cells[0].zTime
      let end = results[0].cells[recordCt - 1].zTime
    
      console.log(results[0].cells[0].zTime)
      
    
      // let beginTime = dateCells[0].cells[0].Time
      // var array = beginTime.split(":");
      // var begin = (parseInt(array[0], 10) * 60 * 60) + (parseInt(array[1], 10) * 60) + parseInt(array[2], 10)
    
      // let endTime = dateCells[0].cells[recordCt - 1].Time
      // var array = endTime.split(":");
      // var end = (parseInt(array[0], 10) * 60 * 60) + (parseInt(array[1], 10) * 60) + parseInt(array[2], 10)
      // console.log(end)
    
      function timestamp(str) {
        return new Date(str).getTime();
      }
      let calc = timestamp(begin)
      console.log(calc)
      // let startRange = new Date(begin).setUTCHours( 0,0,0,0 );
      // console.log(startRange)
    
      // let endRange = new Date(begin).setUTCHours( 23,59,59,59 );
      // console.log(end.toUTCString())
    
      var slidervar = document.getElementById('slider');
      noUiSlider.create(slidervar, {
          connect: true,
          start: [ timestamp(begin), timestamp(end) ],
          step: 60 * 60 * 1000,
          range: {
              min: timestamp(begin),
              max: timestamp(end)
          }
        });
    
      document.getElementById('input-number-min').setAttribute("value", timestamp(begin));
      document.getElementById('input-number-max').setAttribute("value", timestamp(end)); 
    
      var inputNumberMin = document.getElementById('input-number-min');
      var inputNumberMax = document.getElementById('input-number-max');
      inputNumberMin.addEventListener('change', function(){
          slidervar.noUiSlider.set([this.value, null]);
      });
      inputNumberMax.addEventListener('change', function(){
          slidervar.noUiSlider.set([null, this.value]);
      });

      // Run functions to generate plots
      createMap(results);
    });
}

// Function called, runs init instructions
// Runs only on load and refresh of browser page
init();

// Function that runs whenever the dropdown is changed
function optionChanged(newDate){
  layers.markers.clearLayers();
  
  // code that updates graphics
  d3.json(queryUrl).then(function(data) {

    const groups = data.reduce((groups, cell) => {
      const date = cell.zTime.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(cell);
      return groups;
    }, {});
  
    // Edit: to add it in the array format instead
    const dateCells = Object.keys(groups).map((date) => {
      return {
        date,
        cells: groups[date]
      };
    });
  
  let dropdownValue = newDate;
  let results = dateCells.filter(i=> i.date == dropdownValue)
  let resultCount = results[0].cells.length

  createMap(results);
}
)};

      
      

slidervar.noUiSlider.on('update', function( values, handle ) {
  //handle = 0 if min-slider is moved and handle = 1 if max slider is moved
  if (handle==0){
      document.getElementById('input-number-min').value = values[0];
  } else {
      document.getElementById('input-number-max').value =  values[1];
  }

  rangeMin = document.getElementById('input-number-min').value;
  rangeMax = document.getElementById('input-number-max').value;

  //   for(let j=0; j<recordCt; j++){
  //     date_select.append("option")
  //     .text(dateCells[i].date)
  //     .attr("value", dateCells[i].date)
  // } 
  //   results = results.filter(i=> timestamp(i[0].cells[i].zTime) <= rangeMax).filter(i=> timestamp(i[0].cells[i].zTime) >= rangeMin);
  //   // console.log(slideResults)
  //   // createMap(slideResults)
  cellData = results[0].cells
  results = cellData.filter(i=> timestamp(i.zTime) <= rangeMax).filter(i=> timestamp(i.zTime) >= rangeMin);
  // results = results[0].cells.filter(i=> timestamp([i].zTime) <= rangeMax).filter(i=> timestamp([i].zTime) >= rangeMin);
  console.log(results)
  //and repopulate it
  // popplaces = new L.geoJson(exp_popplaces,{
  //     onEachFeature: pop_popplaces,
  //         filter:
  //             function(feature, layer) {
  //                  return (feature.properties.pop_max <= rangeMax) && (feature.properties.pop_max >= rangeMin);
  //             },
  //     pointToLayer: popplaces_marker
  // })
  //and back again into the cluster group
  // cluster_popplaces.addLayer(popplaces);
  createMap(results)
//we will definitely do more here...wait
})




function createMap(results){

var twisterIcon = L.icon({
  iconUrl: '../../static/img/twister.png',

  iconSize:     [36, 24] // size of the icon
  // shadowSize:   [50, 64], // size of the shadow
  // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],  // the same for the shadow
  // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

for (var i = 0; i < results.length; i++) {

    if (results[i].Azimuth < 180){
      var twisterIcon = L.icon({
        iconUrl: '../../static/img/twister.png',
      
        iconSize:     [24, 36] // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      })}
    else {
      var twisterIcon = L.icon({
        iconUrl: '../../static/img/twister-flip.png',
      
        iconSize:     [24, 36] // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      })
    };

    
  
    let direction = parseFloat(results[i].Azimuth);
    
    let point = L.marker(L.latLng(results[i].Lat, results[i].Lon), {
      icon: twisterIcon,
      rotationAngle: direction
  });

    point.bindPopup("<h3>" + results[i].Shape +
        "</h3><hr><p> <b>Date/Time: </b>" + results[i].zTime + "</p>" +
        "<p> <b>Direction (degrees):</b> " + results[i].Azimuth + "; <b>MXDV:</b> " + results[i].MXDV + "</p>");

    point.addTo(layers.markers);
};

// // Add slider
// var sliderControl = L.control.sliderControl({
//   position: "topleft",
//   layer: layers.markers
// });

// map.addControl(sliderControl);

// sliderControl.startSlider();

// // Add legend
// function getColor(d) {
//   if (d === '90') {return "#E74C3C"}
//   else if (d === '70') {return "#DC7633"}
//   else if (d === '50') {return "#F39C12"}
//   else if (d === '30') {return "#F1C40F"}
//   else if (d === '10') {return "#DFFF00"}
//   else if (d === '-10') {return "#2ECC71"}
//   else {return "#FFEDA0"};
//   }

// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {
  
//   var div = L.DomUtil.create('div', 'info legend');
//   labels = ['-10','10','30', '50','70','90'];

//   for (var i = 0; i < labels.length; i++) {
//       div.innerHTML += '<i style="background:' + getColor(labels[i]) +
//       '"></i> ' + labels[i] + (labels[i + 1] ? '&ndash;' + labels[i + 1] + '<br>' : '+');
//       }
//       return div;
//       };

// legend.addTo(map);

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
}




