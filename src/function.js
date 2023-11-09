function displayWeather(response) {
  let temp = document.querySelector("#temperature");
  let cityElement = document.querySelector("#location");
  let weatherCloud = document.querySelector("#cloudiness");
  let weatherHumidity = document.querySelector("#humidity");
  let weatherWind = document.querySelector("#wind");
  let weatherDescriptor = document.querySelector("#description");
  let weatherIcon = document.querySelector("#icon");
  let celciusTemperature = response.data.main.temp;
  let timeElement = document.querySelector("#dateTime");
  let date = new Date();

  timeElement.innerHTML = formatDate(date);
  temp.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  weatherCloud.innerHTML = ` ${Math.round(response.data.clouds.all)}`;
  weatherHumidity.innerHTML = ` ${Math.round(response.data.main.humidity)}%`;
  weatherWind.innerHTML = ` ${Math.round(response.data.wind.speed)}mps`;
  weatherDescriptor.innerHTML = response.data.weather[0].main;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].main);
}
function latLonLocation(event) {
  event.preventDefault();
  function pinLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "5263648a192779a590c660d9fb890f22";
    let currentLocationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
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
  let apiKey = "5263648a192779a590c660d9fb890f22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchedCity(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#searchBar");
  search(cityEntered.value);
}

let pin = document.querySelector("#currentLocation");
pin.addEventListener("click", latLonLocation);

let searcher = document.querySelector("#searchCityForm");
searcher.addEventListener("submit", searchedCity);

search("New York");
