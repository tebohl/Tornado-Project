function heat() {
  // access mongo data via flask route
  d3.json("/api/intensity").then(function(data){
    //console.log(data)
    // //list for lat, lon points for heat layer
    var alllatlong= [];
    // lists for cfg
    //heatLat= [];
    //heatLon= [];
    // add lat and lon to lists
    //heatLat.push(data[0].Lat);
    //heatLon.push(data[0].Lon);
    //console.log(heatLat);

    var latdata = data[0].Lat
    var londata = data[0].Lon
    var ids = data[0].PKID;
    //loop through data to create list of lat lon points
    for (var i = 0; i < ids.length; i++) {
      //list with lat long point
      eachlatlong = [latdata[i], londata[i]];
      //list of lists for heatlayer
      alllatlong.push(eachlatlong);
    };

    //console.log(alllatlong);
    //builidng the map
    //base layer is grayscale
    var baseLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    subdomains: 'abcd',
    minZoom: 0,
    ext: 'png'
    });

    var myMap = L.map('map', {
    center: [ 37.09, -95.71 ],
    zoom: 5,
    layers: [baseLayer]
    });

    var heatmap = L.webGLHeatmap({
      opacity: 0.8,
    });

    heatmap.setData(alllatlong);

    myMap.addLayer( heatmap );
    

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
    "Grayscale": baseLayer
    };
    // Define a baseMaps object to hold our overlay
    var overlayMaps = {
    "Heat Map": heatmap
    };
    // Create a layer control
    // Pass it our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(null, overlayMaps, {
    collapsed: false
    }).addTo(myMap);


  });
};

heat();

