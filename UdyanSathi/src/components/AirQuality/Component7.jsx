import React, { useEffect, useState } from "react";
// import AQIdata from "../../json/Component7-table-data.json";

const Component7 = () => {
  const [AQIdata, setAQIdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/get-MetroCityData/");
        const data = await response.json();
        setAQIdata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const getIconPath = (city) => {
    return `/icons/${city}.svg`;
  };

  return (
    <div className="p-5">
      <h1 className="text-xl text-[#33a0d3] text-start mb-2">
        Air Quality Data
      </h1>
      <p className="text-sm text-slate-500 mb-4">
        Details about Pollutant in metropolitan cities
      </p>
      <table className="table min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              City
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CO
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NH3
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NO2
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              OZONE
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              PM25
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              PM10
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SO2
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              AQI
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {AQIdata.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={getIconPath(item.City)}
                    alt={`${item.City} icon`}
                    className="w-7 h-7 mr-2"
                  />
                  <span>{item.City}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.CO}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.NH3}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.NO2}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.OZONE}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.PM25}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.PM10}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.SO2}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.AQI}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Component7;
