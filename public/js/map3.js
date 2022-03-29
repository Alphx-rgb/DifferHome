let lng=document.currentScript.getAttribute('lat'),
	lat=document.currentScript.getAttribute('long'),marker;
mapboxgl.accessToken = 'pk.eyJ1IjoiYWtzaGF5LWFkaGFuYSIsImEiOiJja3lidjNoOW8wajZlMm9xb3QxaGo2MW5wIn0.d3-byCvalXyvUT6swhWkQA';
var map = new mapboxgl.Map({
	zoom: 10,
	center: [lng, lat],
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11'
});

marker = new mapboxgl.Marker()
		.setLngLat([lng, lat])
		.addTo(map);