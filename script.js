const searchInput = document.querySelector('#cityInput'); // Correctly targeting the input
const searchButton = document.querySelector('.search button');

const apiKey = '296b41159753bb35882b72195ef972a4';

// Event listener for the button click
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        updateWeatherInfo(city);
        searchInput.value = ''; // Clear the input field
    }
});

// Event listener for the 'Enter' key press
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && searchInput.value.trim() !== '') {
        updateWeatherInfo(searchInput.value.trim());
        searchInput.value = ''; // Clear the input field
    }
});

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    return response.json();
}

async function updateWeatherInfo(city) {
    try {
        const weatherData = await getFetchData('weather', city);
        
        if (weatherData.cod === '404') { // If city is not found, show error
            document.getElementById('errorMessage').style.display = 'block';
        } else {
            // Hide error message
            document.getElementById('errorMessage').style.display = 'none';

    // Update the DOM with the weather data (assuming this structure)
    document.querySelector('.temp').innerText = `${weatherData.main.temp}°C`;
    document.querySelector('.city').innerText = weatherData.name;
    document.querySelector('.humidity').innerText = `${weatherData.main.humidity}%`;
    document.querySelector('.wind').innerText = `${weatherData.wind.speed} km/h`;
}
} catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('errorMessage').style.display = 'block'; // Display error message in case of network or other issues
}
}

async function updateWeatherInfo(city) {
    try {
        const weatherData = await getFetchData('weather', city);
        
        if (weatherData.cod === '404') { 
            document.getElementById('errorMessage').style.display = 'block';
        } else {
            document.getElementById('errorMessage').style.display = 'none';

            const temp = weatherData.main.temp;
            document.querySelector('.temp').innerText = `${temp}°C`;
            document.querySelector('.city').innerText = weatherData.name;
            document.querySelector('.humidity').innerText = `${weatherData.main.humidity}%`;
            document.querySelector('.wind').innerText = `${weatherData.wind.speed} km/h`;

            // Update weather description based on temperature
            let weatherDescription = '';
            if (temp < 10) {
                weatherDescription = 'cold';
            } else if (temp >= 10 && temp < 20) {
                weatherDescription = 'cool';
            } else if (temp >= 20 && temp < 30) {
                weatherDescription = 'warm';
            } else {
                weatherDescription = 'hot';
            }

            document.querySelector('.about-weather').innerText = weatherDescription;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('errorMessage').style.display = 'block';
    }
}





