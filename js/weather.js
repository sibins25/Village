const apiKey = "b10632c504034b9ab9a171528250506";
const weatherWidget = document.getElementById("weatherWidget");

// Kilinjada coordinates 
const lat = 11.3145;
const lon = 76.7373;

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
    );
    if (!response.ok) throw new Error("Weather fetch failed");

    const data = await response.json();
    const { temp_c, condition } = data.current;

    weatherWidget.innerHTML = `
      <div class="flex items-center gap-2">
        <img src="${condition.icon}" alt="${condition.text}" class="w-8 h-8" />
        <div>
          <p class="text-sm font-medium">${condition.text}</p>
          <p class="text-lg font-bold">${temp_c}°C</p>
        </div>
      </div>
    `;
  } catch (error) {
    weatherWidget.textContent = "Weather unavailable ❌";
  }
}

fetchWeather();