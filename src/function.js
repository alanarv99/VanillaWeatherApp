function searchCity(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#searchBar");
  let cityTitle = document.querySelector("#location");
  cityTitle.innerHTML = `${cityEntered.value}`;
  let city = cityEntered.value;

  function displayWeather(response) {
    let temp = document.querySelector("#temperature");
    let tempRounded = Math.round(response.data.main.temp);
    temp.innerHTML = ` ${tempRounded}°C`;

    let weatherCloud = document.querySelector("#cloudiness");
    let cloudRounded = Math.round(response.data.clouds.all);
    weatherCloud.innerHTML = ` ${cloudRounded}%`;

    let weatherHumidity = document.querySelector("#humidity");
    let humidityRounded = Math.round(response.data.main.humidity);
    weatherHumidity.innerHTML = ` ${humidityRounded}%`;

    let weatherWind = document.querySelector("#wind");
    let windRounded = Math.round(response.data.wind.speed);
    weatherWind.innerHTML = ` ${windRounded}mps`;

    let weatherDescriptor = document.querySelector("#description");
    weatherDescriptor.innerHTML = response.data.weather[0].main;
  }

  let apiKey = "cd173a006b0e51dac58c6d8064c94178";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
let search = document.querySelector("#searchCityForm");
search.addEventListener("submit", searchCity);

function currentLocationWeather(event) {
  event.preventDefault();
  function displayWeather(response) {
    let city = document.querySelector("#location");
    city.innerHTML = response.data.name;

    let temp = document.querySelector("#temperature");
    let tempRounded = Math.round(response.data.main.temp);
    temp.innerHTML = `${tempRounded}°C`;

    let weatherCloud = document.querySelector("#cloudiness");
    let cloudRounded = Math.round(response.data.clouds.all);
    weatherCloud.innerHTML = `${cloudRounded}%`;

    let weatherHumidity = document.querySelector("#humidity");
    let humidityRounded = Math.round(response.data.main.humidity);
    weatherHumidity.innerHTML = `${humidityRounded}%`;

    let weatherWind = document.querySelector("#wind");
    let windRounded = Math.round(response.data.wind.speed);
    weatherWind.innerHTML = `${windRounded}mps`;

    let weatherDescriptor = document.querySelector("#description");
    weatherDescriptor.innerHTML = response.data.weather[0].main;
  }
  function pinLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "cd173a006b0e51dac58c6d8064c94178";
    let currentLocationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(currentLocationApiUrl).then(displayWeather);
  }
  navigator.geolocation.getCurrentPosition(pinLocation);
}
let pin = document.querySelector("#currentLocation");
pin.addEventListener("click", currentLocationWeather);
