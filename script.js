const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const API_KEY = 'ZLGCE2E6R8D2EU7U9C9L27DNE';

async function getWeather(location) {
    try {
        const response = await fetch(url + location + `?key=${API_KEY}`);
        const locationData = await response.json();
        return locationData;
    } catch (error) {
        console.error(error);
    }
}

const locationForm = document.querySelector('form');
const locationInput = document.querySelector('#location');

locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = locationInput.value;
    const weatherData = await getWeather(location);
    console.log(weatherData);
});