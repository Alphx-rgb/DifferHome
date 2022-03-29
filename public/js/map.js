mapboxgl.accessToken = 'pk.eyJ1IjoiYWtzaGF5LWFkaGFuYSIsImEiOiJja3lidjNoOW8wajZlMm9xb3QxaGo2MW5wIn0.d3-byCvalXyvUT6swhWkQA';
var map = new mapboxgl.Map({
	zoom: 10,
	center: [86.47472132080998, 23.8121817595987],
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11'
});
let lat,lang,marker2;
map.on('click',function(e){
	if (marker2) {
		marker2.remove();
	}
	lang = e.lngLat.lng;
	lat = e.lngLat.lat;
	// console.log(lang);
	$('#xc').attr('value',lang);
	// console.log(lat);
	$('#yc').attr('value',lat);
	map.flyTo({
		center: [lang, lat]
	})
	// map.setZoom(12);
	marker2 = new mapboxgl.Marker()
		.setLngLat([lang, lat])
		.addTo(map);
	// map = new mapboxgl.Map({
	// 	zoom: 10,
	// });
})
map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl
	})
,"top-left");

const nav = new mapboxgl.NavigationControl();
map.addControl(nav);