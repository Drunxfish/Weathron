// Display/Containers
const container = document.querySelector('.wContainer');
const searchBtn = document.querySelector('.initSearch');
const weatherDisplay = document.querySelector('.weather-display');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');

// Elements
const weatherImg = document.querySelector('.weather-display img');
const temperature = document.querySelector('.weather-display .temperature')
const tempDescription = document.querySelector('.weather-display .description');
const humidity = document.querySelector('.weather-details .humidity i');
const wind = document.querySelector('.weather-details .wind i')
const locName = document.querySelector('.location-name');
const regName = document.querySelector('.region-name');


// Asynchronous function to handle API request/display
async function fetchWeather() {
    const APIKey = '##############################'; // Get your own API key <3 :P
    const city = document.querySelector('#search').value;

    // Stops execution
    if (city === '') return;

    try {
        // Request (well aware that this isn't the greatest way to pass APIKEY D:)
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`);

        // Display full container 
        container.style.borderRadius = '0';
        container.style.backdropFilter = 'blur(3px)';
        container.style.height = '760px';

        // Throw error
        if (!response.ok) { throw new Error(); }

        // Remove '404' from screen
        notFound.classList.remove('fade-in');
        notFound.style.display = 'none';


        // Convert data to JSON and assign
        const data = await response.json();
        const current = data.current;
        const location = data.location;
        const condition = current.condition.text;


        // Display data
        weatherImg.src = getCondition(condition);
        locName.textContent = location.name;
        regName.innerHTML = `${location.region}`;
        temperature.innerHTML = `${parseInt(current.temp_c)}<i>°C</i>`;
        tempDescription.textContent = `${condition}`;
        humidity.textContent = `${current.humidity}%`;
        wind.textContent = `${current.wind_kph}KM/H`;


        // Display properties
        weatherDisplay.style.display = '';
        weatherDetails.style.display = '';
        weatherDisplay.classList.add('fade-in')
        weatherDetails.classList.add('fade-in')

    // Display error contents
    } catch (error) {
        weatherDisplay.style.display = 'none';
        weatherDetails.style.display = 'none';
        notFound.style.display = 'block';
        notFound.classList.add('fade-in');
        notFound.classList.remove('fade-out')
    }
}


// Search weather on click
searchBtn.addEventListener('click', fetchWeather);









// Returns image directory in cases as...
function getCondition(cdtn) {
    switch (cdtn) {
        case 'Snow':
        case 'Light snow':
        case 'Moderate snow':
        case 'Heavy snow':
        case 'Blizzard':
            return './../public/Images/snow.png';

        case 'Rain':
        case 'Light rain':
        case 'Moderate rain':
        case 'Heavy rain':
        case 'Patchy rain possible':
        case 'Showers':
            return './../public/Images/rain.png';


        case 'Thunderstorm':
        case 'Thundery outbreaks possible':
            return './../public/Images/thunderstorm.png';

        case 'Cloudy':
        case 'Overcast':
        case 'Partly cloudy':
            return './../public/Images/cloudy.png';

        case 'Sunny':
        case 'Clear':
            return './../public/Images/sunny.png';

        case 'Mist':
        case 'Fog':
            return './../public/Images/fog.png';

        case 'Hail':
        case 'Sleet':
        case 'Ice pellets':
        case 'Freezing rain':
            return './../public/Images/hail.png';

        default:
            return './../public/Images/default.png';
    }
}