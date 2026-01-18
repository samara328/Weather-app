const apiKey = "ae156cdc4769e519ff057940982ad13d";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

// Background images for weather types
const weatherBackgrounds = {
    clear: "https://images.pexels.com/photos/31608714/pexels-photo-31608714.jpeg",
    clouds: "https://images.pexels.com/photos/2093252/pexels-photo-2093252.jpeg",
    rain: "https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg",
    snow: "https://images.pexels.com/photos/14928986/pexels-photo-14928986.jpeg",
    thunderstorm: "https://images.pexels.com/photos/6312517/pexels-photo-6312517.jpeg",
    drizzle: "https://images.pexels.com/photos/8549418/pexels-photo-8549418.jpeg",
    mist: "https://images.pexels.com/photos/1287083/pexels-photo-1287083.jpeg",
    default: "https://images.pexels.com/photos/108941/pexels-photo-108941.jpeg"
};

// Button click
searchBtn.addEventListener("click", getWeather);

// Enter key search
cityInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.innerHTML = "Please enter a city name";
        return;
    }

    weatherResult.innerHTML = "⏳ Loading weather...";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                weatherResult.innerHTML = "❌ City not found";
                return;
            }

            const temp = data.main.temp;
            const feelsLike = data.main.feels_like;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;
            const icon = data.weather[0].icon;
            const mainWeather = data.weather[0].main.toLowerCase();

            // Capitalize description
            const description =
                data.weather[0].description.charAt(0).toUpperCase() +
                data.weather[0].description.slice(1);

            // Date & time
            const now = new Date();
            const dateTime = now.toLocaleString();

            // Update UI
            weatherResult.innerHTML = `
                <h3>${data.name}</h3>
                <p>🕒 ${dateTime}</p>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                <p>${description}</p>
                <p>🌡 Temperature: ${temp}°C</p>
                <p>🤔 Feels Like: ${feelsLike}°C</p>
                <p>💧 Humidity: ${humidity}%</p>
                <p>💨 Wind: ${wind} m/s</p>
            `;

            // Change background
            const bgUrl = weatherBackgrounds[mainWeather] || weatherBackgrounds.default;
            document.body.style.backgroundImage = `url('${bgUrl}')`;
        })
        .catch(() => {
            weatherResult.innerHTML = "⚠️ Error fetching weather data";
        });
}
