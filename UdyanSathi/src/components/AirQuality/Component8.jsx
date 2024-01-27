import React, { useState, useEffect } from "react";
import data from "../../json/data.json";

const Component8 = () => {
const [ApiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/get-AqiCalData/?format=api&pol_Station=%22Secretariat%2C+Amaravati+-+APPCB%22");
        const data = await response.json();
        setApiData(data);
        console.log("Response:", response);
        console.log("Data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const monthsData = data.reduce((acc, entry) => {
    const month = entry.Date.split("-")[1];
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(entry);
    return acc;
  }, {});

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getColorBasedOnAQI = (aqi) => {
    if (aqi <= 50) {
      return "#34a12b"; // green
    } else if (aqi <= 100) {
      return "#ecc93d"; // yellow
    } else if (aqi <= 200) {
      return "#e9572a"; // orange
    } else if (aqi <= 300) {
      return "#ec4d9f"; // pink
    } else if (aqi <= 400) {
      return "#9858a2"; // purple
    } else {
      return "#c11e2f"; // red
    }
  };

  return (
    <div className="cal-container m-8">
      <div className="cal-txt flex flex-row items-center justify-between">
        <h1 className="text-2xl text-black font-bold text-start mb-2 align-middle">
          AQI Calender
        </h1>
        <div className="markings flex flex-row">
          <div className="w-24 h-7 bg-[#34a12b] flex justify-center items-center">
            <span className="text-white text-sm">0 - 50</span>
          </div>
          <div className="w-24 h-7 bg-[#d4cc0f] flex justify-center items-center">
            <span className="text-white text-sm">51 - 100</span>
          </div>
          <div className="w-24 h-7 bg-[#e9572a] flex justify-center items-center">
            <span className="text-white text-sm">101 - 200</span>
          </div>
          <div className="w-24 h-7 bg-[#ec4d9f] flex justify-center items-center">
            <span className="text-white text-sm">201 - 300</span>
          </div>
          <div className="w-24 h-7 bg-[#9858a2] flex justify-center items-center">
            <span className="text-white text-sm">301 - 400</span>
          </div>
          <div className="w-24 h-7 bg-[#c11e2f] flex justify-center items-center">
            <span className="text-white text-sm">401 - 500</span>
          </div>
        </div>
      </div>
      <div className="cal mt-5 flex flex-row gap-2">
        {Object.entries(monthsData).map(([month, dates], index) => (
          <div key={index} className="box1">
            <div className="txt-head">
              <p className="heading">{monthNames[parseInt(month, 10) - 1]}</p>
            </div>
            <div className="innerbox-container">
              {dates.map((date, innerIndex) => (
                <div
                  key={innerIndex}
                  className="innerbx1"
                  style={{ backgroundColor: getColorBasedOnAQI(date.AQI) }}
                  title={`Date: ${date.Date} AQI: ${date.AQI}`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Component8;
