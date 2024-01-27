import { useState, useEffect } from "react";
import WeatherComponent5 from "./WeatherComponent5";

const WeatherComponent3 = () => {
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

  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return <div>Loading...</div>;
  }

  const weatherItem = weatherData.list[0];

  const convertToCelsius = (temp) => {
    return temp - 273.15;
  };

  return (
    <>
      <div className="w-1/3  ">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="wind-component w-1/2 shb flex flex-col m-3 rounded-2xl p-4 bg-white">
              <h1 className="text-3xl font-bold flex flex-row gap-3 mb-5">
                Wind{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 416 416"
                  fill="none"
                >
                  <path
                    d="M208 0C93.31 0 0 93.31 0 208C0 322.69 93.31 416 208 416C322.69 416 416 322.69 416 208C416 93.31 322.69 0 208 0ZM313.07 113.33L266.19 230.53C262.971 238.579 258.15 245.891 252.02 252.02C245.891 258.15 238.579 262.971 230.53 266.19L113.33 313.07C111.876 313.652 110.284 313.794 108.75 313.48C107.215 313.165 105.808 312.407 104.7 311.3C103.593 310.192 102.835 308.785 102.52 307.25C102.206 305.716 102.348 304.124 102.93 302.67L149.81 185.47C153.029 177.421 157.85 170.109 163.98 163.98C170.109 157.85 177.421 153.029 185.47 149.81L302.67 102.93C304.124 102.348 305.716 102.206 307.25 102.52C308.785 102.835 310.192 103.593 311.3 104.7C312.407 105.808 313.165 107.215 313.48 108.75C313.794 110.284 313.652 111.876 313.07 113.33Z"
                    fill="#545454"
                  />
                </svg>
              </h1>
              <div className="wind-content flex flex-col gap-1">
                <div className="flex gap-3">
                  <span className="text-s">Deg : </span>
                  <span className="text-xl font-bold">
                    {weatherItem.wind.deg}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-s">gust : </span>
                  <span className="text-xl font-bold">
                    {weatherItem.wind.gust}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-s">speed : </span>
                  <span className="text-xl font-bold">
                    {weatherItem.wind.speed}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-1/2 shb flex flex-col m-3 rounded-2xl p-4 bg-white">
              <h1 className="text-3xl font-bold flex flex-row gap-3 mb-2">
                Feels Like
              </h1>
              <span className="text-xl">
                {convertToCelsius(weatherItem.main.feels_like).toFixed(2)}°C
              </span>
              <span className="text-sm text-slate-700 mt-12">
                Wind is making it feel cooler.
              </span>
            </div>
          </div>
          <div>
            <WeatherComponent5 />
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherComponent3;
