import React from "react";
import AnimatedBackground from "../animations/AnimatedBackground(WQI)";

const WaterComponent1 = () => {
  return (
    <>
      <div className="relative rounded-2xl h-full">
        <div className="absolute inset-0 rounded-2xl">
          <AnimatedBackground />
        </div>
        <div className=" p-12 rounded-2xl relative z-10 flex flex-col gap-9">
          <div className="C1-txt-1 mb-11">
            <h1 className="text-4xl mb-3">Ganga</h1>

            <p className="text-slate-500 text-xm">
              Real-time Water Quality Index
            </p>
          </div>
          <div className="C1-txt-2 flex flex-row">
            <div className="C1-p1 flex flex-col justify-center gap-1">
              <p className="text-slate-500 text-xm">Last Update:</p>

              <button
                className={`Warning  p-1 rounded-3xl px-3 mt-2 text-white mr-14 bg-blue-500`}
              >
                Danger
              </button>
            </div>
            <div className="C1-p2 mx-auto flex flex-col items-center">
              <h1 className={`ml-52 text-7xl font-bold text-blue-500`}>400</h1>
              <p className="ml-52 text-slate-600">WQI</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaterComponent1;
