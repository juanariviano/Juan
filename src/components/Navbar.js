import React from "react";
import "../style/tailwind.css";

const Navbar = () => {
  return (
    <div className="row-[span_10/_span_10] max-xl:row-span-0 max-xl:col-span-5">
      <div className="fixed max-xl:relative">
        <h2 className="text-xl">Juan</h2>
        <h2 className="text-xl">Ariviano</h2>
        <h2 className="text-xl">Chandra</h2>
        <p className="text-xs mt-2 mb-4">Computer Science Student</p>
        <div className="flex flex-col mb-4 max-xl:flex-row max-xl:gap-3">
          <div>
            <input type="radio" />
            <label>No CSS</label>
          </div>
          <div>
            <input type="radio" />
            <label>CSS</label>
          </div>
        </div>
        <div className="flex flex-col flex-wrap gap-3 max-xl:flex-row max-xl:gap-3 max-xl:mt-10 max-xl:mb-[60px]">
          <p className="text-blue-900 underline cursor-pointer dark:text-blue-600">
            <a href="#intro">[Introduction]</a>
          </p>
          <p className="text-blue-900 underline cursor-pointer dark:text-blue-600">
            <a href="#about">[About]</a>
          </p>
          <p className="text-blue-900 underline cursor-pointer dark:text-blue-600">
            <a href="#experience">[Experience]</a> 
          </p>
          <p className="text-blue-900 underline cursor-pointer dark:text-blue-600">
            <a href="#project">[Projects]</a>
          </p>
          <p className="text-blue-900 underline cursor-pointer dark:text-blue-600">
            <a href="https://github.com/juanariviano">[Github]</a>
          </p>
          <p className="text-blue-900 underline cursor-pointer dark:text-blue-600">
            <a href="https://www.linkedin.com/in/juan-ariviano-chandra/">
              [LinkedIn]
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
