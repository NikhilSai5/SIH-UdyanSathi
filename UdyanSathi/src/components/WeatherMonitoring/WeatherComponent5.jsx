import React from "react";
import { useState, useEffect } from "react";

const WeatherComponent5 = () => {
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
      <div className="flex flex-col shb m-3 rounded-2xl p-12 bg-white">
        <div className="flex flex-row justify-between">
          <div className="weather-col1 flex flex-col ">
            <div className="flex gap-4 flex-col mt-3">
              <h1 className="text-xl  flex flex-row gap-2">
                Humidity
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="30"
                  viewBox="0 0 16 20"
                  fill="none"
                >
                  <path
                    d="M8 19.5C5.78333 19.5 3.89567 18.7333 2.337 17.2C0.778334 15.6667 -0.000666239 13.8 4.27533e-07 11.6C4.27533e-07 10.55 0.204334 9.546 0.613 8.588C1.02167 7.63 1.60067 6.784 2.35 6.05L8 0.5L13.65 6.05C14.4 6.78333 14.9793 7.62933 15.388 8.588C15.7967 9.54667 16.0007 10.5507 16 11.6C16 13.8 15.221 15.6667 13.663 17.2C12.105 18.7333 10.2173 19.5 8 19.5Z"
                    fill="#545454"
                  />
                </svg>
              </h1>

              <span className="text-3xl font-bold">
                {weatherItem.main.humidity}
              </span>
            </div>
            <div className="flex gap-4 flex-col mt-3">
              <h1 className="text-xl  flex flex-row gap-2 items-center justify-center">
                Pressure
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="32"
                  viewBox="0 0 82 76"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.375 3.75C0.375 2.9212 0.70424 2.12634 1.29029 1.54029C1.87634 0.95424 2.6712 0.625 3.5 0.625H62.875C63.7038 0.625 64.4987 0.95424 65.0847 1.54029C65.6708 2.12634 66 2.9212 66 3.75C66 4.5788 65.6708 5.37366 65.0847 5.95971C64.4987 6.54576 63.7038 6.875 62.875 6.875H3.5C2.6712 6.875 1.87634 6.54576 1.29029 5.95971C0.70424 5.37366 0.375 4.5788 0.375 3.75ZM0.375 22.5C0.375 21.6712 0.70424 20.8763 1.29029 20.2903C1.87634 19.7042 2.6712 19.375 3.5 19.375H44.125C44.9538 19.375 45.7487 19.7042 46.3347 20.2903C46.9208 20.8763 47.25 21.6712 47.25 22.5C47.25 23.3288 46.9208 24.1237 46.3347 24.7097C45.7487 25.2958 44.9538 25.625 44.125 25.625H3.5C2.6712 25.625 1.87634 25.2958 1.29029 24.7097C0.70424 24.1237 0.375 23.3288 0.375 22.5ZM62.875 19.375C63.7038 19.375 64.4987 19.7042 65.0847 20.2903C65.6708 20.8763 66 21.6712 66 22.5V64.9583L76.2917 54.6667C76.5778 54.3596 76.9228 54.1134 77.3061 53.9426C77.6894 53.7718 78.1032 53.6799 78.5228 53.6725C78.9424 53.6651 79.3592 53.7423 79.7483 53.8995C80.1374 54.0567 80.4909 54.2906 80.7877 54.5873C81.0844 54.8841 81.3183 55.2376 81.4755 55.6267C81.6327 56.0158 81.7099 56.4326 81.7025 56.8522C81.6951 57.2718 81.6032 57.6856 81.4324 58.0689C81.2616 58.4522 81.0154 58.7972 80.7083 59.0833L65.0833 74.7083C64.4974 75.2936 63.7031 75.6223 62.875 75.6223C62.0469 75.6223 61.2526 75.2936 60.6667 74.7083L45.0417 59.0833C44.7346 58.7972 44.4884 58.4522 44.3176 58.0689C44.1468 57.6856 44.0549 57.2718 44.0475 56.8522C44.0401 56.4326 44.1173 56.0158 44.2745 55.6267C44.4317 55.2376 44.6656 54.8841 44.9623 54.5873C45.2591 54.2906 45.6126 54.0567 46.0017 53.8995C46.3908 53.7423 46.8076 53.6651 47.2272 53.6725C47.6468 53.6799 48.0606 53.7718 48.4439 53.9426C48.8272 54.1134 49.1722 54.3596 49.4583 54.6667L59.75 64.9583V22.5C59.75 21.6712 60.0792 20.8763 60.6653 20.2903C61.2513 19.7042 62.0462 19.375 62.875 19.375ZM0.375 41.25C0.375 40.4212 0.70424 39.6263 1.29029 39.0403C1.87634 38.4542 2.6712 38.125 3.5 38.125H44.125C44.9538 38.125 45.7487 38.4542 46.3347 39.0403C46.9208 39.6263 47.25 40.4212 47.25 41.25C47.25 42.0788 46.9208 42.8737 46.3347 43.4597C45.7487 44.0458 44.9538 44.375 44.125 44.375H3.5C2.6712 44.375 1.87634 44.0458 1.29029 43.4597C0.70424 42.8737 0.375 42.0788 0.375 41.25Z"
                    fill="#545454"
                  />
                </svg>
              </h1>
              <span className="text-3xl font-bold">
                {weatherItem.main.pressure}
              </span>
            </div>
          </div>
          <div className="weather-col2 flex flex-col">
            <div className="flex gap-4 flex-col mt-3">
              <h1 className="text-xl  flex flex-row gap-2 items-center justify-center">
                Gnd_Level
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30    "
                  viewBox="0 0 476 476"
                  fill="none"
                >
                  <path
                    d="M398.104 0C398.631 20.3249 406.804 39.783 421.118 54.7909C435.432 69.7988 454.922 79.3459 476 81.674V0H398.104ZM110 119C67.343 119 30.273 129.965 0 144.322V272.324C30.184 266.874 59.138 263.93 86.82 263.244C137.72 261.984 184.345 268.294 226.564 280.364C269.332 253.254 313.304 227.549 360.951 207.316C286.435 151.018 193.563 119 110 119ZM476 190.98C390.305 206.79 318.34 244.423 249.047 287.465C271.127 295.131 291.897 304.402 311.33 315.002C385.042 355.212 439.467 414.165 474.14 476H476V190.98ZM102.97 280.988C97.774 280.954 92.53 281.004 87.232 281.138C59.55 281.841 30.465 284.918 0 290.638V476H453.242C419.996 420.22 369.655 367.322 302.712 330.805C247.455 300.663 180.896 281.495 102.97 280.988Z"
                    fill="#545454"
                  />
                </svg>
              </h1>
              <span className="text-3xl font-bold">
                {weatherItem.main.grnd_level}
              </span>
            </div>
            <div className="flex gap-4 flex-col mt-3">
              <h1 className="text-xl flex flex-row gap-2 items-center justify-center">
                Sea_Level
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="30"
                  viewBox="0 0 481 480"
                  fill="none"
                >
                  <path
                    d="M240.438 0.188011C108.118 0.188011 0.65625 107.648 0.65625 239.968C0.65625 372.288 108.118 479.75 240.436 479.75C372.756 479.75 480.219 372.29 480.219 239.97C480.219 107.65 372.756 0.187012 240.436 0.187012L240.438 0.188011ZM240.438 18.094C363.091 18.094 462.313 117.316 462.313 239.969C462.313 244.489 462.173 248.983 461.906 253.437C430.961 261.587 393.836 239.213 376.5 209.593C328.94 275.643 286.764 282.785 247.344 208.03C210.402 275.58 143.172 281.186 110.219 228.094C76.4953 274.077 53.5693 280.15 19.1552 256.656C18.7413 251.103 18.5328 245.537 18.5302 239.969C18.5302 117.315 117.784 18.093 240.437 18.093L240.438 18.094ZM378.938 263.314C399.15 303.54 437.541 290.85 460.906 264.874C456.176 307.334 439.511 346.128 414.312 377.874C380.569 396.456 355.444 385.074 324.75 332.25C282.867 407.004 214.938 399.864 164.406 333.813C146.86 362.031 101.486 383.657 67.1263 378.593C45.2433 351.263 29.6813 318.649 22.6863 282.937C46.1763 305.042 86.5763 312.114 107.094 279.312C139.462 327.968 207.496 330.848 247.344 274.25C271.17 308.297 333.309 338.84 378.938 263.312V263.314ZM161.813 387.5C210.293 463.028 299.436 432.516 324.75 398.47C341.947 418.1 362.3 419.266 382.438 410.53C343.976 442.582 294.482 461.875 240.438 461.875C185.746 461.875 135.724 442.118 97.0633 409.375C121.233 417.583 147.615 414.095 161.813 387.5Z"
                    fill="#545454"
                  />
                </svg>
              </h1>
              <span className="text-3xl font-bold">
                {weatherItem.main.sea_level}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherComponent5;
