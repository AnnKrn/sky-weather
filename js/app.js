// primer request de data. Coordenadas glorieta de insurgentes
// const myHeaders = new Headers({
//     /*'Access-Control-Allow-Origin': '*',*/
//     'Access-Control-Allow-Credentials': true,
//     'Access-Control-Allow-Origin': 'https://darksky.net',
//     'Access-Control-Request-Method': 'FETCH'
// });

// const miInit = { /*mode: 'no-cors',*/
//                 mode: 'cors',
//                 headers: myHeaders,
//             };
// Failed to load https://api.darksky.net/forecast/d96034d5eefa15652e80d2d363658c1e/19.422734,-99.161364: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

// Geolocalización automatica con html5
$(document).ready(function(){
    getLocation()
});

function getLocation() {
    if (navigator.geolocation) {
        // console.log(navigator)
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        console.log('Geolocation is not suported by this browser')
    }
};

function showPosition (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // console.log(longitude) 
    getData(latitude, longitude)
}

function getData(latitude, longitude) {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d96034d5eefa15652e80d2d363658c1e/${latitude},${longitude}`).then(function(response){
        return response.json().then(function(json){
            getInfoWeather(json)
        });
    });
};

getData()
function getInfoWeather(json) {
    // console.log(json)
    const icon = json.currently.icon;
    const wind = json.currently.windSpeed;
    const humidity = json.currently.humidity;
    const uvIndex = json.currently.uvIndex;
    const pressure = json.currently.pressure;
    
    paintWeather(icon, wind, humidity, uvIndex, pressure)
    // console.log(wind)
};


function paintWeather(icon, wind, humidity, uvIndex, pressure) {
    templete =`<div class="row">
        <img src="${icon}" alt="">
    </div>
    <div class="row">
        <h1 id="degres" class="text-center col-xs-12"></h1>
    </div>
    <div class="row">
        <h3>Wind </h3> <span class="text-right">${wind}</span>
        <h3>Humidity <span class="text-right">${humidity}</span></h3>
        <h3>UV Index <span class="text-right">${uvIndex}</span></h3>
        <h3>Pressure <span class="text-right">${pressure}</span></h3>
    </div>`

    const containerWeather = document.getElementById('weather_container');
    containerWeather.innerHTML = templete
};