import React, { useState } from "react";
import './WeatherInfo.css'; 
const WeatherInfo = () => {
    const [weatherId, setWeatherId] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const fetchWeather = async () => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherId}&appid=4a1f8a61b74546825af1e0be106e797b&units=metric`;

        try {
            const response = await fetch(weatherUrl);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            setWeatherData(data);
            setError('');
        } catch (error) {
            setError(error.message);
            setWeatherData(null);
        }
    };

    const displayWeatherInfo = () => {
        if (!weatherData) return null;
        return (
            <div>
                <h2>{weatherData.weather[0].main}</h2>
                <p><strong>Temp:</strong> {weatherData.main.temp}°C</p>
                <p><strong>Feels Like:</strong> {weatherData.main.feels_like}°C</p>
                <p><strong>Min Temp:</strong> {weatherData.main.temp_min}°C</p>
                <p><strong>Max Temp:</strong> {weatherData.main.temp_max}°C</p>
                <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
                <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                <h2>Wind</h2>
                <p><strong>Speed:</strong> {weatherData.wind.speed} m/s</p>
                <p><strong>Direction:</strong> {weatherData.wind.deg}°</p>
                <h2>{weatherData.weather[0].icon}</h2>
                <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weather icon" />
            </div>
        );
    };
    const displayError = () => {
        if (!error) return null;
        return <p style={{ color: 'red' }}>{error}</p>;
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
            <h1>Weather Info</h1>
            <div>
                <label htmlFor="weatherId">Weather City:</label>
                <input
                    type="text"
                    id="weatherId"
                    value={weatherId}
                    onChange={(e) => setWeatherId(e.target.value)}
                    placeholder="Enter city name"
                />
                <button onClick={fetchWeather}>Fetch Weather</button>
            </div>
            <div id="output" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                {displayWeatherInfo()}
                {displayError()}
            </div>
        </div>
    );
};

export default WeatherInfo;

