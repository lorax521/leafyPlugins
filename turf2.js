L.Mapzen.apiKey = "mapzen-zjC7pba";
L.mapbox.accessToken = 'pk.eyJ1IjoibG9yYXg1MjEiLCJhIjoiY2owaW1uYXBiMDBlZDJxbzM4d2M1a3N6diJ9.jr45mw3pKka1dCwFfC4aOQ';

L.mapbox.accessToken = 'pk.eyJ1IjoibG9yYXg1MjEiLCJhIjoiY2owaW1uYXBiMDBlZDJxbzM4d2M1a3N6diJ9.jr45mw3pKka1dCwFfC4aOQ';
var map = L.mapbox.map('map', 'mapbox.light')
  .setView([38.05, -84.5], 12);
map.scrollWheelZoom.disable();
		
		
L.Routing.control({
  waypoints: [
    L.latLng(38.0534, -84.572),
    L.latLng(38.0506, -84.507),
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
