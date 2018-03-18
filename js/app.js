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
    getPhoto()
});

// funcion de localizacion html5
function getLocation() {
    if (navigator.geolocation) {
        // console.log(navigator)
        // depende de la respuesta del usuario
        navigator.geolocation.getCurrentPosition(showPosition, showError);

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

function showError () {
    alert('algo salio mal')
}

// Api de wheather
function getData(latitude, longitude) {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d96034d5eefa15652e80d2d363658c1e/${latitude},${longitude}/?units=si`).then(function(response){
        return response.json().then(function(json){
            getInfoWeather(json)
        });
    });
};

getData()
function getInfoWeather(json) {
    console.log(json)
    const degrees = json.currently.temperature;
    const icon = json.currently.icon;
    const wind = json.currently.windSpeed;
    const humidity = json.currently.humidity;
    const uvIndex = json.currently.uvIndex;
    const pressure = json.currently.pressure;
    
    paintWeather(degrees, wind, humidity, uvIndex, pressure)
    skycons(icon)
};


function paintWeather(degrees, wind, humidity, uvIndex, pressure) {
    templete =`<div class="row">
    <canvas id="icon-weather" width="100" height="100" class="col-xs-6 col-xs-offset-3"></canvas>
</div>
<div class="row">
    <div class="col-xs-6 col-xs-offset-3">
        <h1 class="text-center">${degrees} º</h1>
    </div>
</div>
<div class="row">
    <div class="col-md-3 col-md-offset-4 col-xs-12">
        <div class="row">
            <div class="col-xs-6">
                <h3>Wind</h3>
            </div>
            <div class="col-xs-6 text-right">
                <h3>${wind} m/s</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <h3>Humidity</h3>
            </div>
            <div class="col-xs-6 text-right">
                <h3>${humidity} %</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <h3>UV Index</h3>
            </div>
            <div class="col-xs-6 text-right">
                <h3>${uvIndex}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <h3>Pressure</h3>
            </div>
            <div class="col-xs-6 text-right">
                <h3>${pressure} hPa</h3>
            </div>
        </div>
    </div>
</div>`

    const containerWeather = document.getElementById('weather_container');
    containerWeather.innerHTML = templete
};

// api unsplash
function getPhoto() {
    fetch(`https://source.unsplash.com/random`).then(function(response1){
        paintPicture(response1)
    }).catch(function() {
        console.log('no photo')
    })
};

function paintPicture(response1) {
    let photo = response1.url
    let urlString = "url(" + photo +")"
    // console.log(urlString)
    const containerPhoto = document.getElementById('weather_container')
    containerPhoto.style.backgroundImage = urlString
    containerPhoto.style.backgroundSize = 'cover'
    containerPhoto.style.backgroundPosition = 'center center'
    containerPhoto.style.backgroundRepeat = 'no-repeat'
};

// para los iconos
function skycons(icon) {
    console.log(icon)
const icons = new Skycons({
            "color" : "white"})

    icons.set(document.getElementById('icon-weather'), icon)
 
// animate the icons
icons.play();
}
