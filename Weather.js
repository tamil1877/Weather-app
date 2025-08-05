import React, { useState, useEffect } from 'react';
import './Weather.css';
import searchIcon from './search.png';
import clearsky from './clearsky.png';
import fewclouds from './fewclouds.png';
import rain from './rain.jpg';
import mist from './mist.png';
import showerrain from './showerrain.png';
import snow from './snow.jpg';
import thunderstorm from './thunderstrom.jpg';
import scattered from './scattered.png';
import broken from './broken.png';
import defaultIcon from './download.png';

const WeatherDetails = ({ icon, temp, city, country, lat, long, humidity, wind }) => {
  return (
    <>
      <div className="search-cont">
        <img src={icon} alt="weather icon" />
      </div>
      <div className="temp-cont">{temp} °C</div>
      <div className="city-cont">{city}</div>
      <div className="country-cont">{country}</div>
      <div className="coord">
        <div className="lat">
          <span>Latitude</span>
          <span>{lat}</span>
        </div>
        <div className="long">
          <span>Longitude</span>
          <span>{long}</span>
        </div>
      </div>
      <div className="info-cont">
        <div className="humidity">Humidity: {humidity}%</div>
        <div className="wind">Wind: {wind} km/hr</div>
      </div>
    </>
  );
};

function Weather() {
  const apiKey = 'b710dca1308221d676fb4aaf5d3ebafe';

  const [icon, setIcon] = useState(clearsky);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [text, setText] = useState('chennai');

  const weatherMap = {
    "01d": clearsky,
    "01n": clearsky,
    "02d": fewclouds,
    "02n": fewclouds,
    "03d": scattered,
    "03n": scattered,
    "04d": broken,
    "04n": broken,
    "09d": showerrain,
    "09n": showerrain,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  useEffect(() => {
    fetchWeather('chennai');
  }, []);

  const fetchWeather = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === 404) {
        alert('City not found!');
        return;
      }

      const WeatherCode = data.weather[0].icon;
      const mappedIcon = weatherMap[WeatherCode] || defaultIcon;

      setTemp(Math.round(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      setWind(data.wind.speed);
      setHumidity(data.main.humidity);
      setIcon(mappedIcon);
    } catch (error) {
      console.error('Error fetching weather:', error.message);
      alert('Failed to fetch weather data.');
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeather(text);
    }
  };

  return (
    <div>
      <center>
        <h1>Welcome to World Weather</h1>
        <div className="container">
          <div className="input-container">
            <input
              type="text"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              value={text}
              placeholder="Enter worldwide city"
            />
            <div className="searchIcon" onClick={() => fetchWeather(text)}>
              <img src={searchIcon} alt="Search" />
            </div>
          </div>
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            long={long}
            humidity={humidity}
            wind={wind}
          />
        </div>
      </center>
    </div>
  );
}

export default Weather;
