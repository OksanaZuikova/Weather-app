let now = new Date();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}
let month = months[now.getMonth()];
let year = now.getFullYear();
let currentDate = document.querySelector("li#date");
currentDate.innerHTML = `${date}.${month}.${year}`;

let day = days[now.getDay()];
let time = document.querySelector("li#time");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${day} ${hours}:${minutes}`;

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
let celsiusValue;

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitValue = (celsiusValue * 9) / 5 + 32;
  let degrees = document.querySelector(".degrees");
  degrees.innerHTML = Math.round(fahrenheitValue);
  fahrenheit.style.color = "#020138";
  celsius.style.color = "#717086";
}

fahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let degrees = document.querySelector(".degrees");
  degrees.innerHTML = celsiusValue;
  fahrenheit.style.color = "#717086";
  celsius.style.color = "#020138";
}

celsius.addEventListener("click", showCelsius);

function showTemperature(response) {
  fahrenheit.style.color = "#717086";
  celsius.style.color = "#020138";
  let temperature = Math.round(response.data.main.temp);
  celsiusValue = temperature;
  let city = response.data.name;
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = temperature;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = windSpeed;
  let humidityValue = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humidityValue;
  let descriptionValue = response.data.weather[0].main;
  let description = document.querySelector("#description");
  description.innerHTML = descriptionValue;
  let minTempValue = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = minTempValue;
  let maxTempValue = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = maxTempValue;
  let pressureValue = response.data.main.pressure;
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = pressureValue;
  let cloudsValue = response.data.clouds.all;
  let clouds = document.querySelector("#clouds");
  clouds.innerHTML = cloudsValue;
  let sunriseTime = new Date(response.data.sys.sunrise * 1000);
  let sunrise = document.querySelector("#sunrise");
  let sunriseMinutes = sunriseTime.getMinutes();
  if (sunriseMinutes < 10) {
    sunriseMinutes = `0${sunriseMinutes}`;
  }
  sunrise.innerHTML = `${sunriseTime.getHours()}:${sunriseMinutes}`;
  let sunsetTime = new Date(response.data.sys.sunset * 1000);
  let sunset = document.querySelector("#sunset");
  let sunsetMinutes = sunsetTime.getMinutes();
  if (sunsetMinutes < 10) {
    sunsetMinutes = `0${sunsetMinutes}`;
  }
  sunset.innerHTML = `${sunriseTime.getHours()}:${sunsetMinutes}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showValue(searchCity) {
  let apiKey = "4153903a26a56002551e2a95d2d2783b";
  let units = "metric";
  let city = searchCity;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  if (searchInput.value) {
    let searchCity = searchInput.value;
    showValue(searchCity);
  }
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4153903a26a56002551e2a95d2d2783b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function showCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", showCurrentWeather);

showValue("Kyiv");
