import React from "react";

const WaterComponent7 = () => {
  // Assume you have data for the 10 most popular rivers with their corresponding pollutant values
  const riversData = [
    {
      name: "Ganges",
      temp: 25,
      do: 7.2,
      ph: 6.8,
      coliform: 150,
      bod: 3,
      nitrate: 5,
    },
    {
      name: "Yamuna",
      temp: 22,
      do: 6.8,
      ph: 7.2,
      coliform: 200,
      bod: 4,
      nitrate: 7,
    },
    {
      name: "Krishna",
      temp: 28,
      do: 7.5,
      ph: 7.0,
      coliform: 180,
      bod: 2,
      nitrate: 4,
    },
    {
      name: "Godavari",
      temp: 26,
      do: 7.0,
      ph: 7.5,
      coliform: 160,
      bod: 3.5,
      nitrate: 6,
    },
    {
      name: "Saraswati",
      temp: 24,
      do: 6.5,
      ph: 6.5,
      coliform: 120,
      bod: 3.8,
      nitrate: 8,
    },
    {
      name: "Tungabhadra",
      temp: 27,
      do: 7.8,
      ph: 7.8,
      coliform: 140,
      bod: 2.5,
      nitrate: 5.5,
    },
    // Add data for other rivers as needed
  ];

  // Display data for the 10 most popular rivers
  const topRivers = riversData.slice(0, 10);

  return (
    <>
      <div className="p-5">
        <h1 className="text-xl text-[#33a0d3] text-start mb-2">
          Water Quality Data
        </h1>
        <p className="text-sm text-slate-500 mb-4">
          Details about Pollutants in Main Rivers
        </p>
        <table className="table min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                River
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Temp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                D.O
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PH
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                COLIFORM
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                BOD
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nitrate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topRivers.map((river, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span>{river.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{river.temp}</td>
                <td className="px-6 py-4 whitespace-nowrap">{river.do}</td>
                <td className="px-6 py-4 whitespace-nowrap">{river.ph}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {river.coliform}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{river.bod}</td>
                <td className="px-6 py-4 whitespace-nowrap">{river.nitrate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WaterComponent7;
