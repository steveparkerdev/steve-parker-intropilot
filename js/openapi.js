const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temperature");
const conditionEl = document.querySelector(".condition");


fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=-80.8409&current=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FNew_York"
)
    .then((res) => res.json())
    .then((data) => {
        const temp = data.current.temperature_2m;
        tempEl.textContent = `${temp}°F`;
    })
    .catch((err) => {
        console.error("Temperature error:", err);
        tempEl.textContent = "N/A";
    });

fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=-80.8409&current=weather_code&timezone=America%2FNew_York"
)
    .then((res) => res.json())
    .then((data) => {
        const code = data.current.weather_code;

        const weatherCodes = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Fog",
            51: "Light drizzle",
            61: "Rain",
            71: "Snow",
            95: "Thunderstorm",
        };

        cityEl.textContent = "Charlotte, NC";

        conditionEl.textContent =
            weatherCodes[code] || "Unknown conditions";
    })
    .catch((err) => {
        console.error("Condition error:", err);
        conditionEl.textContent = "Unavailable";
    });

const forecastContainer = document.querySelector(".weather-forecast");

fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=-80.8409&daily=weather_code&timezone=America%2FNew_York"
)
    .then((res) => res.json())
    .then((data) => {
        const days = data.daily.time;
        const codes = data.daily.weather_code;

        // Map weather codes to icons - will add fontawesome or SVGs in the future
        const weatherMap = {
            0: "☀️ Clear sky",
            1: "🌤️ Mainly clear",
            2: "⛅ Partly cloudy",
            3: "☁️ Overcast",
            45: "🌫️ Fog",
            61: "🌧️ Rain",
            71: "❄️ Snow",
            95: "⛈️ Thunderstorm",
        };

        for (let i = 0; i < days.length; i++) {
            const row = document.createElement("div");
            row.className = "forecast-row";

            const dayEl = document.createElement("span");
            dayEl.className = "day";
            dayEl.textContent = new Date(days[i]).toLocaleDateString("en-US", {
                weekday: "long",
            });

            const iconEl = document.createElement("span");
            iconEl.className = "icon";
            iconEl.textContent = weatherMap[codes[i]] || "❓N/A";

            row.appendChild(dayEl);
            row.appendChild(iconEl);

            forecastContainer.appendChild(row);
        }
    })
    .catch((err) => console.error("Forecast error:", err));
