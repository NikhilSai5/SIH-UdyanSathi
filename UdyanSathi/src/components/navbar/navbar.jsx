import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar({ onSearchSelected }) {
  var apiUrl = " ";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestions1, setSuggestions1] = useState([]);

  const searchInput = React.createRef();
  const searchInput1 = React.createRef();
  const [defaultSuggestions, setDefaultSuggestions] = useState([]);

  var now = new Date();

  // Subtract one hour from the current time
  now.setHours(now.getHours() - 1);

  // Set minutes and seconds to zero
  now.setMinutes(0);
  now.setSeconds(0);

  // Format the date and time as "YYYY-MM-DD HH:00:00"
  var formattedDateTime =
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2) +
    " " +
    ("0" + now.getHours()).slice(-2) +
    ":00:00";

  useEffect(() => {
    // Make an API call to fetch the data when searchTerm changes
    if (searchTerm.length >= 3) {
      fetch(
        `http://127.0.0.1:8000/api/get-stations/?pol_Station=${searchTerm}&pol_Date=${formattedDateTime}`
      )
        .then((response) => response.json())
        .then((data) => {
          setDefaultSuggestions(data.map((station) => station.Station));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [searchTerm, formattedDateTime]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // Default search suggestions (you can replace these with your own suggestions)
  // const defaultSuggestions = [
  //   "Delhi",
  //   "Knowledge Park - III, Greater Noida - UPPCB",
  //   "Knowledge Park - V, Greater Noida - UPPCB",
  //   "Sector - 125, Noida - UPPCB",
  //   "Sector - 62, Noida - IMD",
  //   "Sector-1, Noida - UPPCB",
  //   "Sector-116, Noida - UPPCB",
  //   "Ghaziabad",
  //   "Meerut",
  //   "Assam",
  // ];

  // Function to update search suggestions based on user input
  const updateSuggestions = () => {
    const input = searchInput.current.value.toLowerCase();
    setSearchTerm(input);
    const filteredSuggestions = defaultSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(input)
    );
    setSuggestions(filteredSuggestions);
  };

  // Function to select a suggestion and insert it into the search input
  const selectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]); // Clear suggestions when a suggestion is selected
    // Optionally, you can perform a search or submit the form here
    performSearch(suggestion);
    onSearchSelected(suggestion);
  };

  // Determine whether to display the suggestions
  const showSuggestions = suggestions.length > 0 && searchTerm !== "";

  const updateSuggestions1 = () => {
    const input = searchInput1.current.value.toLowerCase();
    setSearchTerm1(input);
    const filteredSuggestions1 = defaultSuggestions.filter((suggestion1) =>
      suggestion1.toLowerCase().includes(input)
    );
    setSuggestions1(filteredSuggestions1);
  };

  // Function to select a suggestion and insert it into the search input
  const selectSuggestion1 = (suggestion1) => {
    setSearchTerm1(suggestion1);
    setSuggestions1([]); // Clear suggestions when a suggestion is selected
    // Optionally, you can perform a search or submit the form here
    performSearch(suggestion1);
    onSearchSelected(suggestion1);
  };

  // Determine whether to display the suggestions
  const showSuggestions1 = suggestions1.length > 0 && searchTerm1 !== "";

  const performSearch = (selectedSuggestion) => {
    // Replace this with your actual search logic, e.g., making an API call
    // Get the current date and time
    // Get the current date and time

    console.log(formattedDateTime);

    const baseUrl = "http://127.0.0.1:8000/api/";
    const endpoint = "get-pollution-by-date-station/";
    const queryParams = {
      pol_Date: formattedDateTime,
      pol_Station: selectedSuggestion,
    };

    apiUrl = `${baseUrl}${endpoint}?${new URLSearchParams(queryParams)}`;
    localStorage.setItem("url", apiUrl);
    localStorage.setItem("station", selectedSuggestion);
    console.log(`Performing a search with the selected suggestion: ${apiUrl}`);
  };

  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-2xl bg-opacity-10 shadow-2xl border-slate-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            className="h-8 bg-transparent rounded-2xl"
            alt="Udyan Sathi Logo"
          />
          <span className="text-2xl  text-black font-semibold">
            Udyan Sathi
          </span>
        </Link>

        <div className="md:hidden">
          <button
            type="button"
            className="bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent\
      focus:ring-4 focus:ring-gray-200 dark:focus:ring-transparent rounded-lg\
      text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-400\
      border-transparent hover:border-gray-500 dark:hover:border-gray-400 text-sm p-2.5 mr-1"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>

        <div
          className={`w-full md:w-auto md:order-1 md:flex ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8">
            <div className="flex space-x-4 text-black items-center">
              <Link
                to="/"
                className="hover:text-slate-600 transition ease-in-out delay-100"
              >
                Air Quality
              </Link>
              <Link
                to="/water-quality-index"
                className="hover:text-slate-600 transition ease-in-out delay-100"
              >
                Water Quality
              </Link>
              <Link
                to="/weather"
                className="hover:text-slate-600 transition ease-in-out delay-100"
              >
                Weather
              </Link>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-black "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokelinecap="round"
                    strokelinejoin="round"
                    strokewidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 pl-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search..."
                ref={searchInput}
                value={searchTerm}
                onChange={updateSuggestions}
              />
              {showSuggestions && (
                <div className="suggestions absolute top-10 left-0 right-0 bg-white border border-gray-200 rounded max-h-80 overflow-y-auto z-10">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
      <div
        className={`bg-white border border-gray-100 rounded-lg mt-2 p-4 md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          ref={searchInput1}
          value={searchTerm1}
          onChange={updateSuggestions1}
        />
      </div>
      {showSuggestions1 && (
        <div className="suggestions absolute top-30 left-0 right-0 bg-white border border-gray-200 rounded max-h-20 overflow-y-auto z-10">
          {suggestions1.map((suggestion1, index) => (
            <div
              key={index}
              className="suggestion p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => selectSuggestion1(suggestion1)}
            >
              {suggestion1}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
