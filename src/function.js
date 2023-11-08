function displayWeather(response) {
  let temp = document.querySelector("#temperature");
  let cityElement = document.querySelector("#location");
  let weatherCloud = document.querySelector("#cloudiness");
  let weatherHumidity = document.querySelector("#humidity");
  let weatherWind = document.querySelector("#wind");
  let weatherDescriptor = document.querySelector("#description");
  let weatherIcon = document.querySelector("#icon");

  temp.innerHTML = Math.round(response.data.main.temp);
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
let pin = document.querySelector("#currentLocation");
pin.addEventListener("click", latLonLocation);

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
let searcher = document.querySelector("#searchCityForm");
searcher.addEventListener("submit", searchedCity);
