import React from "react";
import Navbar from "../components/navbar/navbar(Weather)";
import { useEffect, useState } from "react";
import WeatherComponent1 from "../components/WeatherMonitoring/WeatherComponent1";
import WeatherComponent2 from "../components/WeatherMonitoring/WeatherComponent2";
import WeatherComponent3 from "../components/WeatherMonitoring/WeatherComponent3";
import WeatherComponent4 from "../components/WeatherMonitoring/WeatherComponent4";
import WeatherComponent5 from "../components/WeatherMonitoring/WeatherComponent5";
import WeatherComponent6 from "../components/WeatherMonitoring/WeatherComponent6";

const WeatherMoniter = () => {
  return (
    <>
      <Navbar />;
      <div className="home-row-1 m-5  relative ">
        <div className="weather-C1 flex flex-row">
          <WeatherComponent1 />
          <WeatherComponent2 />
        </div>
        <div className="flex flex-col">
          <div className="weather-C2 flex flex-row">
            <WeatherComponent3 />
            <WeatherComponent4 />
          </div>
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default WeatherMoniter;
