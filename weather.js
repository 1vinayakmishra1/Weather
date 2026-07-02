const searchBar = document.querySelector('.js-search-bar');
const searchBtn = document.querySelector('.js-search-btn');
const weatherImg = document.querySelector('.js-weather-img');
const temp = document.querySelector('.js-temprature');
const cityCountry = document.querySelector('.js-city');
const description = document.querySelector('.js-weather-description');
const windImg = document.querySelector('.js-windspeed');
const windSpeed = document.querySelector('.js-wind-speed');
const humidityImg = document.querySelector('.js-humidity');
const humid = document.querySelector('.js-humid');
const humididtyContainer = document.querySelector('.humidity');
const windspeedContainer = document.querySelector('.windspeed');
const mainCard = document.querySelector('.main-card');
const additionalDetails = document.querySelector('.additional-details');

const weatherApiBaseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const weatherIconMap = {
  'clearDay': 'assets/images/sun.svg',
  'clearNight': 'assets/images/clear_night.svg',
  'cloudDay': 'assets/images/cloud_day.svg',
  'cloudNight': 'assets/images/cloud_night.svg',
  'drizzleDay': 'assets/images/drizzle_day.svg',
  'drizzleNight': 'assets/images/drizzle_night.svg',
  'dust': 'assets/images/dust.svg',
  'mist': 'assets/images/mist.svg',
  'rain': 'assets/images/rain.svg',
  'snow': 'assets/images/snow.svg',
  'thunderstorm': 'assets/images/thunderstorm.svg',
  'tornado': 'assets/images/tornado.svg',
  'windy': 'assets/images/windy.svg'
}

async function checkWeather(city) {
  const apiUrl = weatherApiBaseUrl + city + `&appid=${apiKey}`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);

  const removeAllData = () => {
    mainCard.classList.remove('has-data');
    weatherImg.classList.remove('has-data');
    temp.classList.remove('has-data');
    cityCountry.classList.remove('has-data');
    description.classList.remove('has-data');
    additionalDetails.classList.remove('has-data');
    humididtyContainer.classList.remove('has-data');
    windspeedContainer.classList.remove('has-data');
  }

  if (data.cod === '404' || searchBar.value === '') {
      removeAllData();

      weatherImg.innerHTML = '';
      temp.innerHTML = '';
      cityCountry.innerHTML = 'city not found';
      description.innerHTML = '';
      windImg.innerHTML = '';
      windSpeed.innerHTML = '';
      humidityImg.innerHTML = '';
      humid.innerHTML = '';
      searchBar.value = '';
    } else {
      mainCard.classList.add('has-data');
      weatherImg.classList.add('has-data');
      temp.classList.add('has-data');
      cityCountry.classList.add('has-data');
      description.classList.add('has-data');
      additionalDetails.classList.add('has-data');
      humididtyContainer.classList.add('has-data');
      windspeedContainer.classList.add('has-data');

      temp.innerHTML = `${(data.main.temp.toFixed(1))}°C`;
      cityCountry.innerHTML = `${data.name}, ${data.sys.country}`;
      description.innerHTML = `${data.weather?.[0]?.description ?? 'No description'}`;
      windImg.innerHTML = `<img src="assets/weather-wind-svgrepo-com.svg" alt="" class="wind-speed-img">`;
      windSpeed.innerHTML = `${data.wind.speed} km/h`;
      humidityImg.innerHTML = `<img src="assets/humidity-svgrepo-com.svg" alt="" class="humidity-img">`;
      humid.innerHTML = `${data.main.humidity}%`;
      searchBar.value = '';


        const mainCondition = data.weather[0].main;
        const isDay = data.weather[0].icon.endsWith('d');

        let customIconKey = 'clearDay';

          if (mainCondition === 'Clear') {
            customIconKey = isDay ? 'clearDay' : 'clearNight';
          } else if (mainCondition === 'Clouds') {
            customIconKey = isDay ? 'cloudDay' : 'cloudNight';
          } else if (mainCondition === 'Rain') {
            customIconKey = 'rain';
          } else if (mainCondition === 'Drizzle') {
            customIconKey = isDay ? 'drizzleDay' : 'drizzleNight';
          } else if (mainCondition === 'Snow') {
            customIconKey = 'snow';
          } else if (mainCondition === 'Thunderstorm') {
            customIconKey = 'thunderstorm';
          } else if (mainCondition === 'Mist' || mainCondition === 'Haze' || mainCondition === 'Fog') {
            customIconKey = 'mist';
          } else if (mainCondition === 'Squall') {
            customIconKey = 'windy';
          } else if (mainCondition === 'Tornado') {
            customIconKey = 'tornado';
          } else if (mainCondition === 'Dust') {
            customIconKey = 'dust';
          }

          const imagePath = weatherIconMap[customIconKey] || 'assets/images/sun.svg';
          weatherImg.innerHTML = `<img src="${imagePath}" alt="${data.weather[0].description}">`
    }
}

searchBtn.addEventListener('click', () => {
  const cityName = searchBar.value.trim();
  checkWeather(cityName);
});

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {  
    const cityName = searchBar.value.trim();
    checkWeather(cityName);
    searchBar.blur();
  }
});
