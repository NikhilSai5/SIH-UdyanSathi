import React from "react";
import { useState } from "react";

const Searchbox = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestions1, setSuggestions1] = useState([]);

  const searchInput = React.createRef();
  const searchInput1 = React.createRef();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // Default search suggestions (you can replace these with your own suggestions)
  const defaultSuggestions = [
    "Delhi",
    "Greater Noida",
    "Noida",
    "Ghaziabad",
    "Meerut",
    "Assam",
  ];

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
  };

  return (
    <>
      <div class="relative hidden md:block ">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
          <svg
            class="w-4 h-4 text-gray-800 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">Search icon</span>
        </div>
        <input
          type="text"
          id="search-navbar"
          class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-800 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-600 dark:text-black "
          placeholder="Search..."
          ref={searchInput}
          value={searchTerm}
          onChange={updateSuggestions}
        />
        {showSuggestions && (
          <div className="suggestions absolute top-10 left-0 right-0 bg-white border border-gray-200 rounded max-h-32 overflow-y-auto z-10">
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
    </>
  );
};

export default Searchbox;
