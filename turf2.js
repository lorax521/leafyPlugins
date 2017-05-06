L.Mapzen.apiKey = "mapzen-zjC7pba";

		/*
		var map = L.map('map').setView([38.05, -84.5], 12);
		
		var HikeBike_HikeBike = L.tileLayer('http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
			maxZoom: 20,
			minZoom: 5,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		*/
		
		var map = L.map('map').setView([38.05, -84.5], 12);
		var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
			maxZoom: 20,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		
		var greenIcon = new L.Icon({
		  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
		  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		  iconSize: [25, 41],
		  iconAnchor: [12, 41],
		  popupAnchor: [1, -34],
		  shadowSize: [41, 41]
		});
		
		L.Routing.control({
		  waypoints: [
		    L.latLng(38.0504, -84.502),
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
		  router: L.Routing.mapzen("mapzen-zjC7pba", {costing:"pedestrian"}),
		  formatter: new L.Routing.mapzenFormatter(),
		  summaryTemplate:'<div class="start">{name}</div><div class="info {costing}">{distance}, {time}</div>',
		  routeWhileDragging: true
		}).addTo(map);
