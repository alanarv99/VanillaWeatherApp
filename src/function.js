function displayWeather(response) {
  let cities = document.querySelector("#location");
  cities.innerHTML = response.data.name;

  let temp = document.querySelector("#temperature");
  let tempy = Math.round(response.data.main.temp);
  temp.innerHTML = `${tempy}°C`;
}

let apiKey = "cd173a006b0e51dac58c6d8064c94178";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
