function displayWeather(response) {
  let temp = document.querySelector("#temperature");
  let cityElement = document.querySelector("#location");
  let weatherHumidity = document.querySelector("#humidity");
  let weatherWind = document.querySelector("#wind");
  let weatherDescriptor = document.querySelector("#description");
  let weatherIcon = document.querySelector("#icon");
  let celciusTemperature = response.data.temperature.current;
  let timeElement = document.querySelector("#time");
  let date = new Date();

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  temp.innerHTML = Math.round(celciusTemperature);
  weatherHumidity.innerHTML = ` ${response.data.temperature.humidity}%`;
  weatherWind.innerHTML = ` ${Math.round(response.data.wind.speed)}km/h`;
  weatherDescriptor.innerHTML = response.data.condition.description;
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;

  getForecast(response.data.city);
}
function latLonLocation(event) {
  event.preventDefault();
  function pinLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "260420cae416f4dteddo330fbd8c9c7b";
    let currentLocationApiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
    axios.get(currentLocationApiUrl).then(displayWeather);
  }
  navigator.geolocation.getCurrentPosition(pinLocation);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let dater = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${month} ${dater} at ${hour}:${minutes}`;
}
function search(city) {
  let apiKey = "260420cae416f4dteddo330fbd8c9c7b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchedCity(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#searchBar");
  search(cityEntered.value);
}

let pin = document.querySelector("#currentLocation");
pin.addEventListener("click", latLonLocation);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "260420cae416f4dteddo330fbd8c9c7b";
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(forecastApiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div>
        <span class="forecastDay">${formatDay(day.time)}</span>
        <div >
        <img src="${day.condition.icon_url}" class="forecastIcon"/>
        </div>
        <div class="forecastTemperatures">
          <span class="forecastTemp">
            <strong>${Math.round(day.temperature.maximum)} | </strong>
          </span>
          <div>
            <span class="forecastTemp"> ${Math.round(
              day.temperature.minimum
            )}</span>
          </div>
        </div>
      </div>
      `;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searcher = document.querySelector("#searchCityForm");
searcher.addEventListener("submit", searchedCity);

search("New York");
