import React from "react";
import Navbar from "../components/navbar/navbar(WQI)";
import WaterComponent1 from "../components/WaterQuality/WaterComponent1";
import WaterComponent2 from "../components/WaterQuality/WaterComponent2";
import WaterComponent3 from "../components/WaterQuality/WaterComponent3";
import WaterComponent4 from "../components/WaterQuality/WaterComponent4";

import WaterComponent7 from "../components/WaterQuality/WaterComponent7";

const WaterQualiity = () => {
  return (
    <>
      <Navbar />
      <div className="home-row-1 m-5 flex flex-row relative">
        <div className="C1 m-3 rounded-2xl s">
          <WaterComponent1 />
        </div>
        <div className="C2 m-3 relative rounded-2xl">
          <WaterComponent2 />
        </div>
      </div>
      <div className="home-row-2 flex flex-row relative m-5">
        <div className="C3 m-3 rounded-2xl bg-white">
          <WaterComponent3 />
        </div>
        <div className="C4 m-3 rounded-2xl bg-white">
          <WaterComponent4 />
        </div>
      </div>

      <div className="home-row-4 flex flex-row relative m-5">
        <div className="C7 m-3 rounded-2xl bg-white">
          <WaterComponent7 />
        </div>
      </div>
    </>
  );
};

export default WaterQualiity;
