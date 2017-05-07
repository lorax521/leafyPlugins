//mapzen
L.Mapzen.apiKey = "mapzen-zjC7pba";

var map = L.map('map').setView([38.05, -84.5], 12);

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([38.05, -84.5], 
		      {draggable: 'true'}).addTo(map);

L.Routing.control({
  waypoints: [
    L.latLng(38.052, -84.54),
    L.latLng(38.053, -84.57),
  ],
lineOptions: {
  styles: [ {color: "white",opacity: 0.8, weight: 12},
	  {color: "#2676C6", opacity: 1, weight: 6}
]},	
iconOptions: {
  styles: [ {color: "green"},
	  {color: "pink"}
]},	
  router: L.Routing.mapzen("mapzen-zjC7pba", {costing:"auto"}),
  formatter: new L.Routing.mapzenFormatter(),
  summaryTemplate:'<div class="start">{name}</div><div class="info {costing}">{distance}, {time}</div>',
  routeWhileDragging: true
}).addTo(map);

//turf
//alt key//L.mapbox.accessToken = 'pk.eyJ1IjoibG9yYXg1MjEiLCJhIjoiY2owaW1uYXBiMDBlZDJxbzM4d2M1a3N6diJ9.jr45mw3pKka1dCwFfC4aOQ';
L.mapbox.accessToken = 'pk.eyJ1IjoibG9yYXg1MjEiLCJhIjoiY2oyZTlneWxzMDdsbzJxbHZ1NHVkY284ciJ9.M99KYDewtwHYmtdJO-j4Eg';

for (var i = 0; i < hospitals.features.length; i++) {
  hospitals.features[i].properties['marker-color'] = 'DC143C';
  hospitals.features[i].properties['marker-symbol'] = 'hospital';
  hospitals.features[i].properties['marker-size'] = 'small';
}

for (var j = 0; j < libraries.features.length; j++) {
  libraries.features[j].properties['marker-color'] = '#4169E1';
  libraries.features[j].properties['marker-symbol'] = 'library';
  libraries.features[j].properties['marker-size'] = 'small';
}

var hospitalLayer = L.mapbox.featureLayer(hospitals).addTo(map);
var libraryLayer = L.mapbox.featureLayer(libraries).addTo(map);

map.fitBounds(libraryLayer.getBounds());

//bind a popup to each feature 
hospitalLayer.eachLayer(function(layer) {
  layer.bindPopup('<strong>' + layer.feature.properties.Name + '<strong>', {closeButton: false});
}).addTo(map);

libraryLayer.eachLayer(function(layer) {
  layer.bindPopup(layer.feature.properties.Name, {closeButton: false});
}).addTo(map);

//manages popups on hover
libraryLayer.on('mouseover', function(e) {
  e.layer.openPopup();
});
libraryLayer.on('mouseout', function(e) {
  e.layer.closePopup();
});

hospitalLayer.on('mouseover', function(e) {
  e.layer.openPopup();
});
hospitalLayer.on('mouseout', function(e) {
  e.layer.closePopup();
});

libraryLayer.on('click', function(e) {
  //get the geojson from libraries and hospitals
  var libraryFeatures = libraryLayer.getGeoJSON();
  var hospitalFeatures = hospitalLayer.getGeoJSON();

  //find the nearest hospital to library clicked (turf.js)
  var nearestHospital = turf.nearest(e.layer.feature, hospitalFeatures);  
  

    // change the nearest hospital to a large marker
    nearestHospital.properties['marker-size'] = 'large';

    //adds the new GeoJSON to hospitalLayer
    hospitalLayer.setGeoJSON(hospitalFeatures);

    setTimeout(function(){ 
      nearestHospital.properties['marker-size'] = 'small'; 
      hospitalLayer.setGeoJSON(hospitalFeatures);
      hospitalLayer.eachLayer(function(layer) {
      layer.bindPopup('<strong>' + layer.feature.properties.Name + '<strong>', {closeButton: false});
      }).addTo(map);
    }, 150);
});
