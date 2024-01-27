import React, { useEffect, useState } from "react";
// ... (your import statements)

const WeatherComponent4 = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const api_key = "e3b177641df6073f97de399d1ee1cb35";

  useEffect(() => {
    const citiesCoordinates = {
      Mumbai: { latitude: 19.076, longitude: 72.8777 },
      Delhi: { latitude: 28.7041, longitude: 77.1025 },
      Chennai: { latitude: 13.0827, longitude: 80.2707 },
      Bangalore: { latitude: 12.9716, longitude: 77.5946 },
      Kolkata: { latitude: 22.5726, longitude: 88.3639 },
      Jaipur: { latitude: 26.9124, longitude: 75.7873 },
      Ahmedabad: { latitude: 23.03, longitude: 72.58 },
      Pune: { latitude: 18.5204, longitude: 73.8567 },
      Kashmir: { latitude: 33.2778, longitude: 75.3412 },
      Noida: { latitude: 28.5355, longitude: 77.391 },
    };

    // Fetch weather data for each city
    Promise.all(
      Object.entries(citiesCoordinates).map(([city, coords]) =>
        fetchWeatherData(coords.latitude, coords.longitude, city)
      )
    ).then((data) => {
      // Filter out null values (failed API requests)
      const filteredData = data.filter((item) => item !== null);

      // Check if any valid data is present
      if (filteredData.length > 0) {
        setWeatherData(filteredData);
      } else {
        console.error("No valid weather data received.");
      }
    });
  }, []);

  const fetchWeatherData = async (latitude, longitude, city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}`
      );
      const data = await response.json();
      console.log(data);
      return { city, data };
    } catch (error) {
      console.log(`Error fetching data for ${city}:`, error);
      return null;
    }
  };

  if (!weatherData || weatherData.length === 0) {
    return <div>Loading...</div>;
  }

  const tableHeaders = [
    "City",
    "Temperature (°C)",
    "Humidity",
    "Pressure",
    "Wind Speed",
  ];
  const convertToCelsius = (temp) => {
    return temp - 273.15;
  };

  return (
    <>
      <div className="w-2/3">
        <div className="shb flex flex-col m-3 rounded-2xl p-4 bg-white">
          <table className="table-auto">
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="border px-4 py-3 bg-[#838181] text-white nln"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weatherData.map((cityData, index) => {
                const { city, data } = cityData;

                if (!data || !data.list || data.list.length === 0) {
                  return null;
                }

                const weatherItem = data.list[0];
                const temperature = convertToCelsius(
                  weatherItem.main.temp
                ).toFixed(2);
                const humidity = weatherItem.main.humidity;
                const pressure = weatherItem.main.pressure;
                const windSpeed = weatherItem.wind.speed;

                return (
                  <tr key={index}>
                    <td className="border px-4 py-2">{city}</td>
                    <td className="border px-4 py-2">{temperature}</td>
                    <td className="border px-4 py-2">{humidity}</td>
                    <td className="border px-4 py-2">{pressure}</td>
                    <td className="border px-4 py-2">{windSpeed}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WeatherComponent4;
