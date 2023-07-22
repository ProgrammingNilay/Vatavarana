const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');

const weather_img = document.querySelector('.weather-img');
const temperature = document.getElementById('temperature');
const feel_like = document.getElementById('feel-like');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');

const timezone = document.getElementById('time-zone');
const country = document.querySelector('.country');

const time = document.querySelector('.time');
const date = document.querySelector('.date');

const location_not_found = document.querySelector('.location-not-found'); 

const weather_body = document.querySelector('.weather-body');

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
setInterval(() => {
    const timeEl = new Date();
    const year = timeEl.getFullYear();
    const month = timeEl.getMonth();
    const dateEl = timeEl.getDate();
    const day = timeEl.getDay();
    const hours = timeEl.getHours();
    const hours12 = hours >= 13 ? hours % 12 : hours;
    const minutes = timeEl.getMinutes();
    const seconds = timeEl.getSeconds();
    const ampm = hours >=12 ? 'PM' : 'AM';

    time.innerHTML = hours12 + ":" + minutes + ":" + seconds + ' ' + ampm

    date.innerHTML = days[day] + ', ' + dateEl + ' ' + months[month] + ' ' + year

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}
async function checkWeather(city){
    const api_key = "17e2d4a69707b3ce956c8cd48a8032cb";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "block";
    country.innerHTML = `${weather_data.sys.country}`;
    timezone.innerHTML = inputBox.value;
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} °C`;
    feel_like.innerHTML = `${Math.round(weather_data.main.feels_like - 273.15)} °C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity} %`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/h`;
    pressure.innerHTML = `${weather_data.main.pressure} hPa`;
    visibility.innerHTML = `${weather_data.visibility / 1000} Km`;

    weather_img.innerHTML =`<img src="http://openweathermap.org/img/wn//${weather_data.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">`;

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});