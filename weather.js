const searchBar = document.querySelector('.js-search-bar');
const searchBtn = document.querySelector('.js-search-btn');

const weatherApiBaseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
  const apiUrl = weatherApiBaseUrl + city + `&appid=${apiKey}`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  
}

searchBtn.addEventListener('click', () => {
  const cityName = searchBar.value;

  checkWeather(cityName);
})

