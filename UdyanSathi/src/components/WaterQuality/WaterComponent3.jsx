import React, { useState } from "react";

const WaterComponent3 = () => {
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("last-day");
  const [selectedParameter, setSelectedParameter] = useState("AQI");
  const options = ["last-day", "last-7-days", "last-month"];
  const WqiOptions = ["Temp", "D.O.", "PH", "COLIFORM", "BOD", "Nitrate"];

  // Define the rivers array with their WQI values (for demonstration purposes)
  const rivers = [
    { name: "Ganges", wqi: Math.floor(Math.random() * 100) },
    { name: "Yamuna", wqi: Math.floor(Math.random() * 100) },
    { name: "Krishna", wqi: Math.floor(Math.random() * 100) },
    { name: "Godavari", wqi: Math.floor(Math.random() * 100) },
    { name: "Saraswati", wqi: Math.floor(Math.random() * 100) },
    { name: "Tungabhadra", wqi: Math.floor(Math.random() * 100) },
  ];

  return (
    <>
      <div className="C3-container flex flex-col gap-3 m-8 rounded-2xl">
        <div className="C3-txt">
          <div className="C3-heading flex flex-row items-center gap-2">
            <h3 className="text-xl text-[#33a0d3]">
              Most polluted Rivers in India
            </h3>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 128 128"
                fill="none"
              >
                {/* ... (SVG code) */}
              </svg>
            </span>
          </div>
          <p className="text-sm text-slate-500 my-3 mb-4">
            Real Time worst river rankings
          </p>
          <div className="select flex flex-row gap-4">
            {/* ... (select dropdowns code) */}
          </div>
        </div>
        <div className="C3-table">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    River
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    WQI
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rivers.map((river, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{index + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{river.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                      >
                        {river.wqi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default WaterComponent3;
