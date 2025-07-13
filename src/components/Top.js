import React from "react";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useViewportSize } from "@mantine/hooks";

const Top = () => {
  const [isNavbarShown, setIsNavbarShown] = useState(false);
  const navRef = useRef();
  const { width } = useViewportSize();
  const isMobile = width < 640;

  const showNavbar = () => {
    if (isMobile) {
      setIsNavbarShown((prev) => !prev);
      navRef.current.classList.toggle("hidden");
    }
  };

  return (
    <div className="font-mono fixed top-0 w-full z-50 max-sm:py-0 bg-white dark:bg-black">
      <div className="dark:bg-black flex justify-between px-[100px] mt-3 max-lg:px-5 max-lg:items-center dark:bg-black bg-white z-80 max-sm:h-[50px] max-sm:mt-0 max-sm:relative max-sm:z-[80]">
        <h3 className="font-bold">Hi, I'm Juan</h3>
        
        <div className="flex items-center gap-5">
          <a
            className="text-blue-900 underline dark:text-blue-600"
            href="mailto:juanariviano@gmail.com"
          >
            [Email Me]
          </a>
          {isMobile &&
            (isNavbarShown ? (
              <button onClick={showNavbar}>
                <FaTimes />
              </button>
            ) : (
              <button onClick={showNavbar}>
                <FaBars />
              </button>
            ))}
        </div>
      </div>
      <hr className="mt-3 max-sm:mt-0" />

      {/* Mobile Navbar */}
      <div
        ref={navRef}
        className={`fixed flex flex-col gap-5 h-[100vh] w-full bg-white dark:bg-black z-10 duration-300 ease-in ${
          isNavbarShown ? 'top-[51px]' : '-top-[100vh]'
        }
          `}
      >
        <div className="flex gap-5 pt-5 px-5">
          <div className="flex items-center">
            <input type="radio" name="style"/>
            <label className="ml-2">No CSS</label>
          </div>
          <div className="flex items-center">
            <input type="radio" name="style"/>
            <label className="ml-2">CSS</label>
          </div>
        </div>
        <div className="flex flex-col gap-5 px-5">
          <p className="text-blue-900 underline cursor-pointer dark:text-blue-600">
            <a onClick={showNavbar} href="#intro">[Introduction]</a>
          </p>
          <p className="text-blue-900 underline cursor-pointer dark:text-blue-600">
            <a onClick={showNavbar} href="#about">[About]</a>
            </p>
          <p className="text-blue-900 underline cursor-pointer dark:text-blue-600">
            <a onClick={showNavbar} href="#experience">[Experience]</a>
            </p>
          <p className="text-blue-900 underline cursor-pointer dark:text-blue-600">
            <a onClick={showNavbar} href="#project">[Projects]</a>
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

export default Top;
