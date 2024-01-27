import React, { useState, useEffect } from "react";

const Component5 = () => {
  const [citiesData, setCitiesData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("last-day");
  const [selectedParameter, setSelectedParameter] = useState("AQI");
  const [error, setError] = useState(null);
  const options = ["last-day", "last-7-days", "last-month"];
  const AqiOptions = ["CO", "NH3", "NO2", "OZONE", "PM25", "PM10", "SO2", "AQI"];

  useEffect(() => {
    // Calculate the from_date and to_date based on the selected time interval
    const { from_date, to_date } = getDateRange(selectedOption);
    
    // Fetch air quality data using the parameterized URL
    fetchAirQualityData(from_date, to_date);
  }, [selectedOption, selectedParameter]);

  const getDateRange = (interval) => {
    var newtoday = new Date();
    var year = newtoday.getFullYear();
    var month = String(newtoday.getMonth() + 1).padStart(2, '0');
    var day = String(newtoday.getDate()).padStart(2, '0');
    var formattedDate = year + '-' + month + '-' + day;
    const today = new Date(formattedDate);
    const from_date = new Date(today);

    if (interval === "last-day") {
      from_date.setDate(today.getDate() - 1);
    } else if (interval === "last-7-days") {
      from_date.setDate(today.getDate() - 7);
    } else if (interval === "last-month") {
      from_date.setDate(today.getDate() - 30);
    }

    const to_date = today.toISOString().slice(0, 10);
    return { from_date: from_date.toISOString().slice(0, 10), to_date };
  };

  const fetchAirQualityData = async (from_date, to_date) => {
    try {
      const url = `http://127.0.0.1:8000/api/get-Top10LeastPollutedCities/?from_date=${from_date}&to_date=${to_date}&parameter=${selectedParameter}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const airQualityData = await response.json();
      setCitiesData(airQualityData);
      setError(null); // Reset error state if successful
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again."); // Set an error message
    }
  };

  return (
    <>
      <div className="C3-container flex flex-col gap-3 m-8 rounded-2xl">
        <div className="C3-txt">
          <div className="C3-heading flex flex-row items-center gap-2">
            <h3 className="text-xl text-[#33a0d3]">
              Least polluted cities in India
            </h3>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 128 128"
                fill="none"
              >
                <g clip-path="url(#clip0_710_2)">
                  <path
                    d="M68.9702 31.6601C68.3302 31.1701 67.5902 30.8101 66.7302 30.6101C65.8802 30.4201 64.9802 30.3101 64.0102 30.3101C63.0402 30.3101 62.1302 30.4101 61.2702 30.6101C60.4002 30.8001 59.6602 31.1601 59.0102 31.6601C58.3702 32.1501 57.8702 32.8001 57.5002 33.6101C57.1402 34.4201 56.9502 35.4401 56.9502 36.6501C56.9502 37.8401 57.1402 38.8401 57.5002 39.6701C57.8702 40.4801 58.3702 41.1501 59.0102 41.6401C59.6502 42.1301 60.4002 42.4901 61.2702 42.7001C62.1302 42.9101 63.0402 43.0201 64.0102 43.0201C64.9702 43.0201 65.8802 42.9101 66.7302 42.7001C67.5902 42.4901 68.3302 42.1301 68.9702 41.6401C69.6102 41.1501 70.1202 40.4801 70.5002 39.6701C70.8802 38.8401 71.0702 37.8401 71.0702 36.6501C71.0702 35.4301 70.8802 34.4101 70.5002 33.6101C70.1202 32.8001 69.6102 32.1501 68.9702 31.6601ZM57.5202 48.9401H70.4902V96.4501H57.5202V48.9401Z"
                    fill="#40C0E7"
                  />
                  <path
                    d="M64.0002 0.410034C28.9302 0.410034 0.410156 28.93 0.410156 64C0.410156 99.06 28.9302 127.59 63.9902 127.59C99.0502 127.59 127.58 99.07 127.58 64C127.59 28.93 99.0602 0.410034 64.0002 0.410034ZM64.0002 118.41C34.0002 118.41 9.60016 94 9.60016 64C9.60016 34 34.0002 9.59003 64.0002 9.59003C94.0002 9.59003 118.41 34 118.41 64.01C118.4 94 93.9902 118.41 64.0002 118.41Z"
                    fill="#40C0E7"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_710_2">
                    <rect width="128" height="128" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
          <p className="text-sm text-slate-500 my-3 mb-4">
            Real Time Best city rankings
          </p>
          <div className="select flex flex-row gap-4">
            <select
              className="border border-gray-300 p-2 rounded-md mt-3"
              onChange={(e) => setSelectedOption(e.target.value)}
              value={selectedOption}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-300 p-2 rounded-md mt-3"
              onChange={(e) => setSelectedParameter(e.target.value)}
              value={selectedParameter}
            >
              {AqiOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    AQI
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {citiesData.map((city, index) => (
                  <tr key={index + 1}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{index + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{city.City}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          city[selectedParameter] > 150
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {city[selectedParameter] !== 0 ? city[selectedParameter] : "N/A"}
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

export default Component5;
