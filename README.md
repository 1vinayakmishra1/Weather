# Weather

A small static weather lookup web app that uses the OpenWeatherMap API to show current weather for a city.

## Files

- weather.html — main page
- weather.css — styles
- weather.js — client-side logic
- config.js — holds the API key 
- assets/ — images and icons

## Setup

1. Get an OpenWeatherMap API key: https://openweathermap.org/api
2. Create a `config.js` file in the project root with:

```js
const apiKey = "YOUR_API_KEY_HERE";
```

3. Open `weather.html` in your browser and search a city.

Notes:
- The repository's `config.js` file is listed in `.gitignore` to avoid accidentally committing API keys.

## License

This project is released under the MIT License — see `LICENSE`.
