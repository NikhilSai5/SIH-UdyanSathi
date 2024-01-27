import React, { useEffect, useState } from "react";

const WeatherComponent2 = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const api_key = "e3b177641df6073f97de399d1ee1cb35";

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const convertToFahrenheit = (temp) => {
    return (temp - 273.15).toFixed(2);
  };

  return (
    <>
      <div className="w-2/3 p-8 flex flex-row WR-1 m-3 rounded-2xl bg-white justify-evenly weather2-top">
        {weatherData &&
          weatherData.list.slice(0, 4).map((day, index) => (
            <div key={index} className="forcast mx-5">
              <div className="flex flex-col gap-20">
                <div className=" flex flex-col justify-center items-center gap-3">
                  {day && (
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt=""
                      className="weather-icon-main w-10"
                    />
                  )}
                  <span>{convertToFahrenheit(day && day.main.temp)}°C</span>
                  <span>{day && day.weather[0].description}</span>
                </div>
                <div className="flex flex-col bg-[#838181] p-2 text-white rounded-xl px-2">
                  <span>
                    Feels like:{" "}
                    {convertToFahrenheit(day && day.main.feels_like)}°C
                  </span>
                  <span>Pressure: {day && day.main.pressure}</span>
                  <span>Humidity: {day && day.main.humidity}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default WeatherComponent2;
