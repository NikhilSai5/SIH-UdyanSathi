import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import Component1 from "./Component1";
import Component2 from "./Component2";

function ParentComponent() {
  const [selectedSearch, setSelectedSearch] = useState("");
  const [dangerAlert, setDangerAlert] = useState(null);

  const handleSearchSelected = (search) => {
    setSelectedSearch(search);
  };

  const [childData, setChildData] = useState(null);

  const handleChildData = (data) => {
    console.log("Data received from child:", data);

    checkPollutionConditions(data);
    setChildData(data);
  };

  const checkPollutionConditions = (data) => {
    const { OZONE, CO, PM10, PM25, NO2, SO2 } = data[0];
    let maxPollutant = null;

    if (OZONE > 30) {
      maxPollutant = {
        level: "Danger",
        message: "Crop burning may be the cause.",
        chemical: "Ozone",
        amount: OZONE,
      };
    }
    if (CO > 60) {
      maxPollutant = {
        level: "Danger",
        message: "Cars may be contributing to the pollution.",
        chemical: "Carbon Monoxide (CO)",
        amount: CO,
      };
    }
    if (PM10 > 200 || PM25 > 200) {
      const maxPM = PM10 > PM25 ? PM10 : PM25;
      maxPollutant = {
        level: "Danger",
        message: "Dust pollution is high.",
        chemical: `Particulate Matter (${maxPM === PM10 ? "PM10" : "PM2.5"})`,
        amount: maxPM,
      };
    }
    if (NO2 > 80) {
      maxPollutant = {
        level: "Danger",
        message: "Factories may be emitting nitrogen dioxide.",
        chemical: "Nitrogen Dioxide (NO2)",
        amount: NO2,
      };
    }
    if (SO2 > 70) {
      maxPollutant = {
        level: "Danger",
        message: "Factories may be emitting sulfur dioxide.",
        chemical: "Sulfur Dioxide (SO2)",
        amount: SO2,
      };
    }

    if (maxPollutant) {
      setDangerAlert(maxPollutant);
    } else {
      setDangerAlert(null);
    }
  };

  console.log("Hello", childData);

  return (
    <div>
      <Navbar onSearchSelected={handleSearchSelected} />
      {dangerAlert && (
        <div
          role="alert"
          className="alert-container aa px-8 mt-3 rounded-xl animated"
        >
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            {dangerAlert.level}
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{dangerAlert.message}</p>
            <p>
              Chemical: {dangerAlert.chemical}, Amount: {dangerAlert.amount}
            </p>
          </div>
        </div>
      )}
      <div className="home-row-1 m-5 flex flex-row relative">
        <div className="C1 m-3 rounded-2xl s">
          <Component1 selectedSearch={selectedSearch} />
        </div>
        <div className="C2 m-3 relative rounded-2xl">
          <Component2
            selectedSearch={selectedSearch}
            onData={handleChildData}
          />
        </div>
      </div>
    </div>
  );
}

export default ParentComponent;
