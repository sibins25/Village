const Weather_API_KEY = 'ddfb0740b4b8b13b3ddb3f800c4bc2ea'; // Replace with your key
const weatherElement = document.getElementById('weather');

// --- Option 1: Use Geolocation (your current code, but always show your village name)
function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        weatherElement.innerHTML = `<p>Geolocation is not supported by this browser.</p>`;
    }
}

async function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${Weather_API_KEY}`);
        if (!response.ok) throw new Error('Weather data not available.');

        const data = await response.json();
        displayWeather(data);
    } catch (err) {
        console.error('Error fetching weather:', err);
        weatherElement.innerHTML = `<p>Unable to fetch weather data.</p>`;
    }
}

function error() {
    weatherElement.innerHTML = `<p>Unable to retrieve your location.</p>`;
}

// --- Always show your village name in the weather card
function displayWeather(data) {
    const temp = data.main.temp.toFixed(1);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherElement.innerHTML = `
        <div class="weather-card" style="padding:1rem; background:#fffbe7; border-radius:1rem; box-shadow:0 4px 16px #facc15;">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" style="margin:auto;">
            <p>
                <strong style="color:#f59e0b; font-size:1.3rem;">கிளிஞ்சடா கிராமம்</strong>
            </p>
            <p style="font-size:1.1rem;">${temp}°C</p>
            <p style="text-transform:capitalize;">${description}</p>
        </div>
    `;
}

getWeather();