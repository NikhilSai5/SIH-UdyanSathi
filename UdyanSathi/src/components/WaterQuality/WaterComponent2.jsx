import React from "react";
import AnimatedBackground from "../animations/AnimatedBackground(WQI)";

const WaterComponent2 = () => {
  return (
    <>
      <div className="C2-container relative rounded-2xl p-9 flex flex-col justify-around h-full">
        <div className="absolute inset-0 rounded-2xl">
          <AnimatedBackground />
        </div>
        <div className="C2-txt-1 mb-7 flex justify-center ">
          <p className="text-xl text-[#33a0d3]">Major Air pollutants in</p>
        </div>
        <div className="poll-container flex flex-col gap-5">
          <div className="poll-row-1 flex flex-row justify-evenly">
            <div className="ic-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/pm2.5-icon.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>

              <p className="ic-txt">
                30.6
                <span className="ic-span">(Temp)</span>
              </p>
            </div>
            <div className="ic-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/pm10-icon.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>

              <p className="ic-txt">
                6.7
                <span className="ic-span">(D.O.)</span>
                {/* {checkPM10Threshold(pol.PM10)} */}
              </p>
            </div>
            <div className="ic-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/so2.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>

              <p className="ic-txt">
                7.5
                <span className="ic-span">(PH)</span>
              </p>
            </div>
          </div>
          <div className="poll-row-2 flex flex-row justify-evenly">
            <div className="ic-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/CO.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>

              <p className="ic-txt">
                11
                <span className="ic-span">(COLIFORM)</span>
                {/* {checkCOThreshold(pol.CO)} */}
              </p>
            </div>
            <div className="ic-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/o3.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>

              <p className="ic-txt">
                0<span className="ic-span">(BOD)</span>
              </p>
            </div>
            <div className="ic-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/no2.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>

              <p className="ic-txt">
                0.1
                <span className="ic-span">(Nitrate)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaterComponent2;
