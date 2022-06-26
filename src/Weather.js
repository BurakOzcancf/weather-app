import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [value, setValue] = useState("");
  const [weather, setWeather] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  function getCurrentCoords() {
    function success(position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    }
    navigator.geolocation.getCurrentPosition(success);
  }
  getCurrentCoords();

  useEffect(() => {
    if (value) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=bfe8822c7b4e4ea63ea1348642874f7f`
        )
        .then((res) => {
          setWeather(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (lat && lon) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=bfe8822c7b4e4ea63ea1348642874f7f`
        )
        .then((res) => {
          setWeather(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [lon, lat, value]);

  function handleSubmit(e) {
    e.preventDefault();
    setValue(city);
    setCity("");
  }

  function background() {
    if (weather) {
      console.log(weather.weather[0].main);
      if (weather.weather[0].main === "Snow") {
        return "snow";
      }
      if (weather.weather[0].main === "Clouds") {
        return "cloud";
      }
      if (weather.weather[0].main === "Rain") {
        return "rain";
      }
      if (weather.weather[0].main === "Clear") {
        return "clear";
      }
    }
  }

  return (
    <main className={background()}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder="Search by city name..."
          className="weather__input"
        />
        <button className="weather__btn">Go</button>
      </form>
      {weather && (
        <div className="weather__container">
          <div className="weather__city">
            {weather.name} {weather.sys.country}
          </div>
          <div className="weather__temp">
            <p>Temp:</p>
            <span>{Math.round(weather.main.temp)} &#8451;</span>
          </div>
          <div className="weather__maxtemp">
            <p>Max temp:</p>
            <span>{Math.ceil(weather.main.temp_max)} &#8451;</span>
          </div>
          <div className="weather__mintemp">
            <p>Min temp:</p>
            <span>{Math.floor(weather.main.temp_min)} &#8451;</span>
          </div>
          <div className="weather__sit">
            {" "}
            {weather.weather.map((item) => item.description)}{" "}
          </div>
          {/* <div className='weather__mainsit'> {weather.weather.map(item => item.main)} </div> */}
        </div>
      )}
    </main>
  );
};

export default Weather;
