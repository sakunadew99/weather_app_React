import React, { useState, useEffect } from 'react';
import './WeatherApp.css'

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

// Import background images for different weather conditions
import sunny_bg from '../assets/sunny.jpeg';
import cloudy_bg from '../assets/cloudy.jpg';
import rainy_bg from '../assets/rainy1.webp';
import snowy_bg from '../assets/snowy2.jpg';

const WeatherApp = () => {
  let api_key = "d6a30441f712beb853d68f31a8101e74";

  const [wicon, setWicon] = useState(cloud_icon); // Default weather icon
  const [bgImage, setBgImage] = useState(cloudy_bg); // Default background image

  const search = async () => {
    const element = document.getElementsByClassName('cityInput');
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();

    // Update weather data
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temp = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity+"%";
    wind[0].innerHTML = data.wind.speed+" km/h";
    temp[0].innerHTML = data.main.temp.toFixed(1) +" °C";
    location[0].innerHTML = data.name;

    // Update weather icon and background image based on weather condition
    switch(data.weather[0].icon) {
      case "01d":
      case "01n":
        setWicon(clear_icon);
        setBgImage(sunny_bg);
        break;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        setWicon(cloud_icon);
        setBgImage(cloudy_bg);
        break;
      case "04d":
      case "04n":
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        setWicon(rain_icon);
        setBgImage(rainy_bg);
        break;
      case "13d":
      case "13n":
        setWicon(snow_icon);
        setBgImage(snowy_bg);
        break;
      default:
        setWicon(cloud_icon);
        setBgImage(cloudy_bg);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  }

  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" onKeyPress={handleKeyPress} />

        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt="" /> {/* Display the dynamic icon */}
      </div>
      <div className='weather-temp'>24 °C</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt="" className='icon' />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className='element'>
          <img src={wind_icon} alt="" className='icon' />
          <div className='data'>
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp;
