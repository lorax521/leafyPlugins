//L.mapbox.accessToken = 'pk.eyJ1IjoibG9yYXg1MjEiLCJhIjoiY2owaW1uYXBiMDBlZDJxbzM4d2M1a3N6diJ9.jr45mw3pKka1dCwFfC4aOQ';
//L.mapbox.accessToken = 'pk.eyJ1IjoibG9yYXg1MjEiLCJhIjoiY2oyZTlneWxzMDdsbzJxbHZ1NHVkY284ciJ9.M99KYDewtwHYmtdJO-j4Eg';


var map = L.map('map').setView([38.05, -84.5], 12);

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


L.mapbox.accessToken = 'pk.eyJ1IjoibG9yYXg1MjEiLCJhIjoiY2owaW1uYXBiMDBlZDJxbzM4d2M1a3N6diJ9.jr45mw3pKka1dCwFfC4aOQ';

    // Add marker color, symbol, and size to hospital GeoJSON
    for (var i = 0; i < hospitals.features.length; i++) {
      hospitals.features[i].properties['marker-color'] = '#DC143C';
      hospitals.features[i].properties['marker-symbol'] = 'hospital';
      hospitals.features[i].properties['marker-size'] = 'small';
    }

    // Add marker color, symbol, and size to library GeoJSON
    for (var j = 0; j < libraries.features.length; j++) {
      libraries.features[j].properties['marker-color'] = '#4169E1';
      libraries.features[j].properties['marker-symbol'] = 'library';
      libraries.features[j].properties['marker-size'] = 'small';
    }
/*
var map = L.map('map').setView([38.05, -84.5], 12);

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
*/

    var map = L.mapbox.map('map', 'mapbox.light')
      .setView([38.05, -84.5], 12);
    map.scrollWheelZoom.disable();

    var hospitalLayer = L.mapbox.featureLayer(hospitals)
      .addTo(map);
    var libraryLayer = L.mapbox.featureLayer(libraries)
      .addTo(map);

    map.fitBounds(libraryLayer.getBounds());

    // Bind a popup to each feature in hospitalLayer and libraryLayer
    hospitalLayer.eachLayer(function(layer) {
      layer.bindPopup('<strong>' + layer.feature.properties.Name + '</strong>', { closeButton: false });
    }).addTo(map);
    libraryLayer.eachLayer(function(layer) {
      layer.bindPopup(layer.feature.properties.Name, { closeButton: false });
    }).addTo(map);

    // Open popups on hover
    libraryLayer.on('mouseover', function(e) {
      e.layer.openPopup();
    });
    hospitalLayer.on('mouseover', function(e) {
      e.layer.openPopup();
    });

	libraryLayer.on('mouseout', function(e) {
	  e.layer.closePopup();
	});
	hospitalLayer.on('mouseout', function(e) {
	  e.layer.closePopup();
	});

    // Reset marker size to small
    function reset() {
      var hospitalFeatures = hospitalLayer.getGeoJSON();
      for (var k = 0; k < hospitalFeatures.features.length; k++) {
        hospitalFeatures.features[k].properties['marker-size'] = 'small';
      }
      hospitalLayer.setGeoJSON(hospitalFeatures);
    }

    // When a library is clicked, do the following
    libraryLayer.on('click', function(e) {
      // Reset any and all marker sizes to small
      reset();
      // Get the GeoJSON from libraryFeatures and hospitalFeatures
      var libraryFeatures = libraryLayer.getGeoJSON();
      var hospitalFeatures = hospitalLayer.getGeoJSON();
      // Using Turf, find the nearest hospital to library clicked
      var nearestHospital = turf.nearest(e.layer.feature, hospitalFeatures);
      // Change the nearest hospital to a large marker
      nearestHospital.properties['marker-size'] = 'large';
      // Add the new GeoJSON to hospitalLayer
      hospitalLayer.setGeoJSON(hospitalFeatures);
      // Bind popups to new hospitalLayer and open popup
      // for nearest hospital
      hospitalLayer.eachLayer(function(layer) {
        layer.bindPopup('<strong>' + layer.feature.properties.Name + '</strong>', { closeButton: false });
        if (layer.feature.properties['marker-size'] === 'large') {
          layer.openPopup();
        }
      });
    });

    // When the map is clicked on anywhere, reset all
    // hospital markers to small
    map.on('click', function(e) {
      reset();
	hospitalLayer.eachLayer(function(layer) {
      		layer.bindPopup('<strong>' + layer.feature.properties.Name + '</strong>', { closeButton: false });
    	}).addTo(map);
    });

/*
var marker = L.marker([38.05, -84.53], 
		      {draggable: 'true'}).addTo(map);
*/

/*
//mapzen
L.Mapzen.apiKey = "mapzen-zjC7pba";

L.Routing.control({
  waypoints: [
    L.latLng(38.052, -84.54),
    L.latLng(38.053, -84.51),
  ],
lineOptions: {
  styles: [ {color: "white",opacity: 0.8, weight: 12},
	  {color: "#2676C6", opacity: 1, weight: 6}
]},	
  router: L.Routing.mapzen("mapzen-zjC7pba", {costing:"auto"}),
  formatter: new L.Routing.mapzenFormatter(),
  summaryTemplate:'<div class="start">{name}</div><div class="info {costing}">{distance}, {time}</div>',
  routeWhileDragging: true
}).addTo(map);
*/
