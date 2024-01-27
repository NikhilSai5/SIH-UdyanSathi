import React from "react";
import Searchbox from "./Searchbox";
import { Link } from "react-router-dom";

const NewNavbar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-2xl bg-opacity-10 shadow-xl border-slate-800">
      <div className=" mx-auto px-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-10">
            <span className="text-2xl text-black font-semibold">
              Udyan Sathi
            </span>
          </div>

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
              Water Quaity
            </Link>

            <Searchbox />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NewNavbar;
