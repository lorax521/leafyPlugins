var map = L.map('map').setView([38.05, -84.5], 12);

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//turf
//alt key//L.mapbox.accessToken = 'pk.eyJ1IjoibG9yYXg1MjEiLCJhIjoiY2owaW1uYXBiMDBlZDJxbzM4d2M1a3N6diJ9.jr45mw3pKka1dCwFfC4aOQ';
L.mapbox.accessToken = 'pk.eyJ1IjoibG9yYXg1MjEiLCJhIjoiY2oyZTlneWxzMDdsbzJxbHZ1NHVkY284ciJ9.M99KYDewtwHYmtdJO-j4Eg';

/*
var hospitals = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { Name: 'VA Medical Center -- Leestown Division', Address: '2250 Leestown Rd' }, geometry: { type: 'Point', coordinates: [-84.539487, 38.072916] } },
    { type: 'Feature', properties: { Name: 'St. Joseph East', Address: '150 N Eagle Creek Dr' }, geometry: { type: 'Point', coordinates: [-84.440434, 37.998757] } },
    { type: 'Feature', properties: { Name: 'Central Baptist Hospital', Address: '1740 Nicholasville Rd' }, geometry: { type: 'Point', coordinates: [-84.512283, 38.018918] } },
    { type: 'Feature', properties: { Name: 'VA Medical Center -- Cooper Dr Division', Address: '1101 Veterans Dr' }, geometry: { type: 'Point', coordinates: [-84.506483, 38.02972] } },
    { type: 'Feature', properties: { Name: 'Shriners Hospital for Children', Address: '1900 Richmond Rd' }, geometry: { type: 'Point', coordinates: [-84.472941, 38.022564] } },
    { type: 'Feature', properties: { Name: 'Eastern State Hospital', Address: '627 W Fourth St' }, geometry: { type: 'Point', coordinates: [-84.498816, 38.060791] } },
    { type: 'Feature', properties: { Name: 'Cardinal Hill Rehabilitation Hospital', Address: '2050 Versailles Rd' }, geometry: { type: 'Point', coordinates: [-84.54212, 38.046568] } },
    { type: 'Feature', properties: { Name: 'St. Joseph Hospital', ADDRESS: '1 St Joseph Dr' }, geometry: { type: 'Point', coordinates: [-84.523636, 38.032475] } },
    { type: 'Feature', properties: { Name: 'UK Healthcare Good Samaritan Hospital', Address: '310 S Limestone' }, geometry: { type: 'Point', coordinates: [-84.501222, 38.042123] } },
    { type: 'Feature', properties: { Name: 'UK Medical Center', Address: '800 Rose St' }, geometry: { type: 'Point', coordinates: [-84.508205, 38.031254] } }
  ]
};
var libraries = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { Name: 'Village Branch', Address: '2185 Versailles Rd' }, geometry: { type: 'Point', coordinates: [-84.548369, 38.047876] } },
    { type: 'Feature', properties: { Name: 'Northside Branch', ADDRESS: '1733 Russell Cave Rd' }, geometry: { type: 'Point', coordinates: [-84.47135, 38.079734] } },
    { type: 'Feature', properties: { Name: 'Central Library', ADDRESS: '140 E Main St' }, geometry: { type: 'Point', coordinates: [-84.496894, 38.045459] } },
    { type: 'Feature', properties: { Name: 'Beaumont Branch', Address: '3080 Fieldstone Way' }, geometry: { type: 'Point', coordinates: [-84.557948, 38.012502] } },
    { type: 'Feature', properties: { Name: 'Tates Creek Branch', Address: '3628 Walden Dr' }, geometry: { type: 'Point', coordinates: [-84.498679, 37.979598] } },
    { type: 'Feature', properties: { Name: 'Eagle Creek Branch', Address: '101 N Eagle Creek Dr' }, geometry: { type: 'Point', coordinates: [-84.442219, 37.999437] } }
  ]
};
var hospitals2 = {
  'type': 'FeatureCollection',
  'features': [
    { 'type': 'Feature', 'properties': { 'Name': 'VA Medical Center -- Leestown Division', 'Address': '2250 Leestown Rd' }, 'geometry': { 'type': 'Point', 'coordinates': [-84.539487, 38.072916] } },
 	]
};
*/
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

    var hospitalLayer = L.mapbox.featureLayer(hospitals)
      .addTo(map);
    var libraryLayer = L.mapbox.featureLayer(libraries)
      .addTo(map);

/*
var geojsonLayer = new L.GeoJSON.AJAX("turfHospitals.js");       
geojsonLayer.addTo(map);

var geojsonLayer = new L.GeoJSON.AJAX("turfLibraries.js");       
geojsonLayer.addTo(map);
*/

/*
	var bringToFront = {
	"z-index" : 1000,
	radius: 8,
	fillColor: "#ff7800",
	color: "#000",
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8
	};

	L.geoJSON(hospitals, {
		style: bringToFront
	}).addTo(map);
	L.geoJSON(hospitals2, {
		style: bringToFront
	}).addTo(map);
	L.geoJSON(libraries, {
		style: bringToFront
	}).addTo(map);
*/
var marker = L.marker([38.05, -84.53], 
		      {draggable: 'true'}).addTo(map);

    map.fitBounds(libraryLayer.getBounds());


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
