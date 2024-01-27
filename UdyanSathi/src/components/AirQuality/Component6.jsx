import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import DN from "../../json/GN.json";
import * as d3TimeFormat from "d3-time-format";

const Component6 = () => {
  const chartRef = useRef(null);
  const tooltipRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("CO");
  const options = ["CO", "NO2", "OZONE", "SO2", "AQI", "PM10", "NH3"];
  const [city, setCity] = useState("");
  const [compareCity, setCompareCity] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("last-7-days");

  const cityOptions = [
    "Hyderabad",
    "Greater Noida",
    "Noida",
    "Delhi",
    "Pune",
    "Mumbai",
  ];

  const CompareCityOptions = [
    "Hyderabad",
    "Greater Noida",
    "Noida",
    "Delhi",
    "Pune",
    "Mumbai",
  ];

  const filterOptions = ["last-7-days", "last-15-days", "last-30-days"];

  const [rawdata, setRawdata] = useState(DN);
  const [compareRawData, setCompareRawData] = useState(DN); // Added state for the second city

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCompareCityChange = (event) => {
    setCompareCity(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleTimeRangeChange = (event) => {
    setSelectedTimeRange(event.target.value);
  };

  const filteredData = rawdata
    .filter((entry) => entry.City === city)
    .filter((entry) => {
      const currentDate = new Date(entry.Pol_Date);
      const endDate = new Date(); // Current date
      const startDate = new Date(endDate);

      // Set the start date based on the selected time range
      if (selectedTimeRange === "last-7-days") {
        startDate.setDate(endDate.getDate() - 37);
      } else if (selectedTimeRange === "last-15-days") {
        startDate.setDate(endDate.getDate() - 45);
      } else if (selectedTimeRange === "last-30-days") {
        startDate.setDate(endDate.getDate() - 60);
      }

      return currentDate >= startDate && currentDate <= endDate;
    })
    .map((entry) => {
      const chemicalValue = entry[selectedOption];
      return {
        date: new Date(entry.Pol_Date),
        value: chemicalValue,
        aqi: entry.AQI,
      };
    });

  const filteredCompareData = compareRawData
    .filter((entry) => entry.City === compareCity)
    .filter((entry) => {
      const currentDate = new Date(entry.Pol_Date);
      const endDate = new Date(); // Current date
      const startDate = new Date(endDate);

      // Set the start date based on the selected time range
      if (selectedTimeRange === "last-7-days") {
        startDate.setDate(endDate.getDate() - 37);
      } else if (selectedTimeRange === "last-15-days") {
        startDate.setDate(endDate.getDate() - 45);
      } else if (selectedTimeRange === "last-30-days") {
        startDate.setDate(endDate.getDate() - 60);
      }

      return currentDate >= startDate && currentDate <= endDate;
    })
    .map((entry) => {
      const chemicalValue = entry[selectedOption];
      return {
        date: new Date(entry.Pol_Date),
        value: chemicalValue,
        aqi: entry.AQI,
      };
    });

  console.log(filteredData);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const margin = { top: 20, right: 50, bottom: 60, left: 70 };
    const width = 940 - margin.left - margin.right;
    const height = 370 - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const x = d3
      .scaleTime()
      .domain(
        d3.extent([...filteredData, ...filteredCompareData], (d) => d.date)
      )
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max([...filteredData, ...filteredCompareData], (d) => d.value),
      ])
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value))
      .curve(d3.curveCardinal);

    const area = d3
      .area()
      .x((d) => x(d.date))
      .y0(height)
      .y1((d) => y(d.value))
      .curve(d3.curveCardinal);

    svg.attr("width", width + margin.left + margin.right);
    svg.attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Update y-axis domain based on the extent of the combined filtered data
    y.domain([
      0,
      d3.max([...filteredData, ...filteredCompareData], (d) => d.value),
    ]);

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -height / 2)
      .attr("dy", "1em")
      .attr("fill", "#000")
      .attr("text-anchor", "middle")
      .text(selectedOption);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "#000")
      .attr("text-anchor", "middle")
      .text("Date");

    // Render line and area for the second city (Blue Graph)
    g.append("path")
      .datum(filteredCompareData)

      .attr("fill", "blue")
      .attr("opacity", 0.3)
      .attr("d", area);

    g.append("path")
      .datum(filteredCompareData)
      .attr("fill", "none") // Set fill to none for the line
      .attr("stroke", "blue") // Change color for the second city
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    g.append("path")
      .datum(filteredData)
      .attr("fill", "#FF69B4")
      .attr("opacity", 0.3)
      .attr("d", area);

    // Render line for the first city (Red Graph)
    g.append("path")
      .datum(filteredData)
      .attr("fill", "none") // Set fill to none for the line
      .attr("stroke", "red")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    const tooltip = d3.select(tooltipRef.current);

    g.selectAll(".dot")
      .data([...filteredData, ...filteredCompareData])
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.value))
      .attr("r", 5)
      .attr("fill", (d) => (filteredData.includes(d) ? "red" : "blue")) // Change color based on city
      .on("mouseover", function (event, d) {
        const { clientX, clientY } = event;

        const tooltipContent = `${selectedOption}: ${
          d.value
        }<br>Date: ${d.date.toLocaleDateString()}`;

        d3.select(this).attr("r", 8);

        tooltip
          .style("display", "block")
          .html(tooltipContent)
          .style("left", clientX + 20 + "px")
          .style("top", clientY + 20 + "px");
      })

      .on("mouseout", function () {
        d3.select(this).attr("r", 5);

        tooltip.style("display", "none");
      });
  }, [
    filteredData,
    selectedOption,
    compareRawData,
    compareCity,
    selectedTimeRange,
  ]);

  const downloadCSV = () => {
    const dataToDownload =
      selectedTimeRange === "last-7-days"
        ? filteredData
        : selectedTimeRange === "last-15-days"
        ? filteredData
        : filteredData;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date," +
      selectedOption +
      "\n" +
      dataToDownload
        .map((entry) => `${entry.date.toISOString()},${entry.value}`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${city}_${selectedOption}_${selectedTimeRange}.csv`
    ); // Fix here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="C6-container m-8 flex flex-col">
        <div className="C6-top flex flex-row justify-between">
          <div className="C6-txt flex flex-col">
            <h1 className="C6-heading text-2xl text-[#33a0d3]">
              Historic Air quality Data{" "}
            </h1>
            <span className="text-sm text-slate-500 mt-5">
              Explore the insightful air pollution data for last
            </span>
            <span className="text-sm text-slate-500">
              24 hours, 7days and 1 month
            </span>
          </div>
          <div className="flex flex-row gap-4">
            <div className="best p-3 bg-[#43a53d] text-white w-32 h-14 rounded-xl flex flex-row justify-between items-center">
              <span className="text-xs">
                Best <br /> AQI
              </span>
              <h3 className="text-lg">354</h3>
            </div>
            <div className="worst p-3 bg-[#c22c3d] text-white w-32 h-14 rounded-xl flex flex-row justify-between items-center">
              <span className="text-xs">
                Worst <br /> AQI
              </span>
              <h3 className="text-lg">784</h3>
            </div>
          </div>
        </div>
        <div className="C6-graph">
          <div className="flex flex-row items-center mb-5 ">
            <select
              className="border border-gray-300 p-2 rounded-md mt-3"
              onChange={handleChange}
              value={selectedOption}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-300 p-2 rounded-md mt-3 ml-3"
              onChange={handleCityChange}
              value={city}
            >
              <option value="" disabled>
                Select City
              </option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <span className="p-2 mt-3 text-xs text-slate-500">
              Compare With -
            </span>
            <select
              className="border border-gray-300 p-2 rounded-md mt-3 ml-3"
              onChange={handleCompareCityChange}
              value={compareCity}
            >
              <option value="" disabled>
                {" "}
                Select City
              </option>
              {CompareCityOptions.map((compareCity) => (
                <option key={compareCity} value={compareCity}>
                  {compareCity}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-300 p-2 rounded-md mt-3 ml-3"
              onChange={handleTimeRangeChange}
              value={selectedTimeRange}
            >
              <option value="last-7-days">Last 7 days</option>
              <option value="last-15-days">Last 15 days</option>
              <option value="last-30-days">Last 30 days</option>
            </select>
          </div>
          <svg ref={chartRef}></svg>
          <div
            ref={tooltipRef}
            style={{
              position: "fixed",
              display: "none",
              borderStyle: "solid",
              whiteSpace: "nowrap",
              zIndex: 9999999,
              transition:
                "left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s",
              backgroundColor: "rgb(255, 255, 255)",
              borderWidth: "1px",
              borderColor: "rgb(247, 249, 252)",
              color: "rgb(26, 33, 56)",
              font: "20px / 30px 'Microsoft YaHei'",
              borderRadius: "10px",
              padding: "8px 24px",
              pointerEvents: "none",
              boxShadow: " 1px 1px 3px 2px #ccc",
            }}
          ></div>
          <div className="graph-index flex flex-row gap-3 justify-end">
            <div className="red flex flex-row items-center gap-1">
              <div className="bg-red-500 p-1"></div>
              <span className="text-xs">{city}</span>
            </div>
            <div className="blue flex flex-row items-center gap-1">
              <div className="p-1 bg-blue-500"></div>
              <span className="text-xs">{compareCity}</span>
            </div>
          </div>
          <div className="flex flex-row justify-end mt-2">
            <button className="text-xs mt-2" onClick={downloadCSV}>
              Print Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component6;
