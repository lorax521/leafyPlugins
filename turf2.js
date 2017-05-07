L.Mapzen.apiKey = "mapzen-zjC7pba";

var map = L.map('map').setView([39.733635, -104.962921], 13);

var HikeBike_HikeBike = L.tileLayer('http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
	maxZoom: 20,
	minZoom: 5,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.Routing.control({
  waypoints: [
    L.latLng(39.734435, -104.964921),
    L.latLng(39.731635, -104.960921),
  ],
lineOptions: {
  styles: [ {color: "white",opacity: 0.8, weight: 12},
	  {color: "#2676C6", opacity: 1, weight: 6}
]},	
iconOptions: {
  styles: [ {color: "green"},
	  {color: "pink"}
]},	
  router: L.Routing.mapzen("mapzen-zjC7pba", {costing:"pedestrian"}),
  formatter: new L.Routing.mapzenFormatter(),
  summaryTemplate:'<div class="start">{name}</div><div class="info {costing}">{distance}, {time}</div>',
  routeWhileDragging: true
}).addTo(map);
