const provider = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
const copyright =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>';
let map,
	number = 0,
	queryResponse,
	type;

async function _getLatAndLon(country){
	const ENDPOINT = `https://nominatim.openstreetmap.org/search?format=json&q=${country}`
	const request = await fetch(`${ENDPOINT}`);
	const data = await request.json();
	console.log(data);
	console.log(data[0].lat);
	const lat = data[0].lat;
	console.log(data[0].lon);
	const lon = data[0].lon;
	_showMap(lat,lon);


}
function _showMap(lat,lon){
	map.setView([lat,lon], 5);
	L.tileLayer(provider, {attribution: copyright}).addTo(map);

	// L.tileLayer(provider, {attribution: copyright}).addTo(map);
}

// 3 Met de data van de API kunnen we de app opvullen
function showResult(number){

	type.innerHTML = queryResponse.data[number].fields.type[0].name;
	// We gaan eerst een paar onderdelen opvullen
	// Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
	_getLatAndLon(
		queryResponse.data[number].fields.country[0].name
	);

};
// 2 Aan de hand van een longitude en latitude gaan we de openwheater map API ophalen.
let getAPI = async (lat, lon) => {
	// Eerst bouwen we onze url op

	/*** ⚠️☠️ API-key van Martijn Loth, misbruik zal bestraft worden ☠️️️️️⚠️ ***/
	const ENDPOINT = `https://api.reliefweb.int/v1/disasters?appname=rwint-user-0&profile=list&preset=latest&slim=1`;

	// Met de fetch API proberen we de data op te halen.
	const request = await fetch(`${ENDPOINT}`);
	const data = await request.json();
	console.log(data);
	console.log(data.data[0].fields.country[0].name);
	queryResponse = data;
	showResult(0);
	NextAndPreviousButton();
};

function NextAndPreviousButton(){
	document.querySelector('.js-buttonPrevious').addEventListener("click",function(){	
		number++;
		showResult(number);
	});
	document.querySelector('.js-buttonNext').addEventListener("click",function(){
		if(number == 0) return;
		number--;
		showResult(number);
	});
}

document.addEventListener('DOMContentLoaded', function() {
	type = document.querySelector('.js-type');
	map = L.map("mapid")
	// 1 We will query the API with longitude and latitude.
	getAPI();
});
