import React, { useState, useEffect } from "react";

const WeatherComponent1 = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const api_key = "e3b177641df6073f97de399d1ee1cb35";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const convertToFahrenheit = (temp) => {
    return ((temp - 273.15) * 9) / 5 + 32;
  };

  const convertToCelsius = (temp) => {
    return temp - 273.15;
  };

  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return <div>Loading...</div>;
  }

  const weatherItem = weatherData.list[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png`;
  const tempCelsius = convertToCelsius(weatherItem.main.temp);

  return (
    <>
      <div className="W1-container p-8 flex flex-col WR-1 m-3 rounded-2xl w-1/3 bg-white justify-between ">
        <div className="W-top flex flex-col justify-center items-center gap-2">
          <img
            src={iconUrl}
            alt={weatherItem.weather.main}
            className="weather-icon-main"
          />
          <span className="text-5xl font-bold">{tempCelsius.toFixed(2)}°C</span>
          <span>
            {weatherData.city.name}, {weatherData.city.country}
          </span>
        </div>
        <div className="W-bottom ">
          <div className="w-rows flex flex-row justify-between ">
            <div className="col1 flex flex-col gap-4 items-center">
              <span className="w-span-o">
                {convertToCelsius(weatherItem.main.temp_min).toFixed(2)}°C
              </span>
              <span className="w-span-i">Min Temp: </span>
            </div>
            <div className="col2 flex flex-col gap-4 items-center">
              <span className="w-span-o">
                {convertToCelsius(weatherItem.main.temp_max).toFixed(2)}°C
              </span>
              <span className="w-span-i">Max Temp: </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherComponent1;
