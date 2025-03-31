const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const API_KEY = 'ZLGCE2E6R8D2EU7U9C9L27DNE';
let weatherLocation = '';
let useMetric = false;

async function getWeather() {
    try {
        const response = await fetch(url + weatherLocation + `?key=${API_KEY}&unitGroup=${useMetric ? 'metric' : 'us'}`);
        const locationData = await response.json();
        return locationData;
    } catch (error) {
        console.error(error);
    }
}

const addressElement = document.querySelector('#address');
const conditionsElement = document.querySelector('#conditions');
const temperatureElement = document.querySelector('#temperature');
const descriptionElement = document.querySelector('#description');

function populateData(data) {
    if (data) {
        addressElement.textContent = data.address;
        conditionsElement.textContent = data.currentConditions.conditions;
        temperatureElement.textContent = data.currentConditions.temp;
        descriptionElement.textContent = data.description;
    } else {
        addressElement.textContent = 'No data found'
    }
}

const locationForm = document.querySelector('form');
const locationInput = document.querySelector('#location');

locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    weatherLocation = locationInput.value;
    const weatherData = await getWeather();
    console.log(weatherData);
    populateData(weatherData);
});

const toggleUnitButton = document.querySelector('#toggle-unit');

toggleUnitButton.addEventListener('click', async (e) => {
    useMetric = !useMetric;
    toggleUnitButton.textContent = (useMetric) ? 'C' : 'F';
    const weatherData = await getWeather();
    populateData(weatherData);
});