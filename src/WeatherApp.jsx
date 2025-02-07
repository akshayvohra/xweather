import { useState } from "react";
import "./App.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchWeather() {
    if (!city.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=bd3ad733e0954f7c8ae95318250702&q=${city}`
      );
      if (!response.ok) throw new Error("Invalid city");

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("Failed to fetch weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p>Loading data…</p>}

      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
