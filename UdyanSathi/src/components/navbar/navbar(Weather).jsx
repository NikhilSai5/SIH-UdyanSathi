import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
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

        <div className={`w-full md:w-auto md:order-1 md:flex `}>
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
              />
            </div>
          </ul>
        </div>
      </div>
      <div
        className={`bg-white border border-gray-100 rounded-lg mt-2 p-4 md:hidden `}
      >
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
        />
      </div>
    </nav>
  );
}

export default Navbar;
