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
// funcion de data general
function getInfoWeather(json) {
    // console.log(json)
    const degrees = json.currently.temperature;
    const icon = json.currently.icon;
    const wind = json.currently.windSpeed;
    const humidity = json.currently.humidity;
    const uvIndex = json.currently.uvIndex;
    const pressure = json.currently.pressure;
    getInfoWekly(json)
    paintWeather(degrees, wind, humidity, uvIndex, pressure)
    skycons(icon)
};

// funcion de data semanal
function getInfoWekly(json) {
    // console.log(json)
    const week = json.daily.data;
    console.log(week)
    week.forEach(item => {
        const maxTemperature = item.apparentTemperatureMax
        const minTemperature = item.apparentTemperatureMin
        const weekIcon = item.icon
        paintWeek(maxTemperature,minTemperature)
        // skyconsWeek(weekIcon)
    })
}
// funcion que pinta prediccion principal
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

// funcion que pinta datos de la semana
function paintWeek(maxTemperature, minTemperature) {
    const weekTemplete = `
    <div class="row">
        <div class="col-md-3 col-md-offset-4 col-xs-12">
            <div class="row">
                <canvas width="100" height="100" class="col-xs-2 icon-week"></canvas>            
                <div class="col-xs-4">
                    <h4>Lunes</h4>
                </div>
                <div class="col-xs-6 text-right">
                    <h4>${minTemperature}º - ${maxTemperature}º</h4>
                </div>
            </div>
            <div class="row">
                    <div class="col-md-3 col-md-offset-4 col-xs-12">
                        <div class="row">
                            <canvas width="100" height="100" class="col-xs-2 icon-week"></canvas>            
                            <div class="col-xs-4">
                                <h5>Martes</h5>
                            </div>
                            <div class="col-xs-6 text-right">
                                <h5>${minTemperature}º - ${maxTemperature}º</h5>
                            </div>
                        </div>
                        <div class="row">
                                <div class="col-md-3 col-md-offset-4 col-xs-12">
                                    <div class="row">
                                        <canvas id="icon-weather" width="100" height="100" class="col-xs-2"></canvas>            
                                        <div class="col-xs-4">
                                            <h5>Miercoles</h5>
                                        </div>
                                        <div class="col-xs-6 text-right">
                                            <h5>${minTemperature}º - ${maxTemperature}º</h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                            <div class="col-md-3 col-md-offset-4 col-xs-12">
                                                <div class="row">
                                                    <canvas id="icon-weather" width="100" height="100" class="col-xs-2"></canvas>            
                                                    <div class="col-xs-4">
                                                        <h5>Jueves</h5>
                                                    </div>
                                                    <div class="col-xs-6 text-right">
                                                        <h5>${minTemperature}º - ${maxTemperature}º</h5>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                        <div class="col-md-3 col-md-offset-4 col-xs-12">
                                                            <div class="row">
                                                                <canvas id="icon-weather" width="100" height="100" class="col-xs-2"></canvas>            
                                                                <div class="col-xs-4">
                                                                    <h5>Viernes</h5>
                                                                </div>
                                                                <div class="col-xs-6 text-right">
                                                                    <h5>${minTemperature}º - ${maxTemperature}º</h5>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                    <div class="col-md-3 col-md-offset-4 col-xs-12">
                                                                        <div class="row">
                                                                            <canvas id="icon-weather" width="100" height="100" class="col-xs-2"></canvas>            
                                                                            <div class="col-xs-4">
                                                                                <h5>Sábado</h5>
                                                                            </div>
                                                                            <div class="col-xs-6 text-right">
                                                                                <h5>${minTemperature}º - ${maxTemperature}º</h5>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                                <div class="col-md-3 col-md-offset-4 col-xs-12">
                                                                                    <div class="row">
                                                                                        <canvas id="icon-weather" width="100" height="100" class="col-xs-2"></canvas>            
                                                                                        <div class="col-xs-4">
                                                                                            <h5>Domingo</h5>
                                                                                        </div>
                                                                                        <div class="col-xs-6 text-right">
                                                                                            <h5>${minTemperature}º - ${maxTemperature}º</h5>
                                                                                        </div>
                                                                                    </div>`
    const containerWeek = document.getElementById('weather_container_week');
    containerWeek.innerHTML = weekTemplete
}
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
    // const containerPhoto = document.getElementById('weather_container_week')
    const containerPhoto = document.getElementsByClassName('photo-container')
    const arrayContainerPhoto = Array.from(containerPhoto)

    arrayContainerPhoto.forEach(item => {
        item.style.backgroundImage = urlString
        item.style.backgroundSize = 'cover'
        item.style.backgroundPosition = 'center center'
        item.style.backgroundRepeat = 'no-repeat'
    })
};

// para los iconos
function skycons(icon) {
    // console.log(icon)
    const icons = new Skycons({
            "color" : "white"})

    icons.set(document.getElementById('icon-weather'), icon)
 
// animate the icons
icons.play();
}

// function skyconsWeek(weekIcon) {
//     console.log(weekIcon)
//     const icons = new Skycons({
//             "color" : "white"})
//     const arrayIconWeek = Array.from(document.getElementsByClassName('icon-week'))
    

//     icons.set(arrayIconWeek, weekIcon)
 
// // animate the icons
// icons.play();
// }

