import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import About from "./components/About";
import Experience from "./components/Experience";
import { projectapps } from "./data/projectapps.js";
import { getImageUrl } from "./data/utils.js";
import Footer from "./components/Footer.js";
import Top from "./components/Top.js";
import { useRef } from "react";

function App() {
  // Dark Mode Toggle
  const toogleDark = useRef();

  const darkMode = () => {
    toogleDark.current.classList.toggle('dark:bg-white');
    toogleDark.current.classList.toggle('dark:text-black');
  }

  // Project Sections
  const listApps = projectapps.map((data) => (
    <div className="mb-10 max-md:col-span-5 max-md:mb-2">
      <img src={getImageUrl(data.id)} />
      <h3 className="font-bold mt-2">{data.name}</h3>
      <p>{data.description}</p>
      <div className="flex gap-3">
        <a href={data.github} className="text-blue-900 underline dark:text-blue-600">
          GitHub
        </a>
        {data.deploy != "none" ? (
          <a href={data.deploy} className="text-blue-900 underline dark:text-blue-600">
            UI
          </a>
        ) : null}
      </div>
    </div>
  ));

  return (
    <div ref={toogleDark} className="bg-white dark:bg-black dark:text-white">
      <Top />

      <div className="font-mono grid grid-cols-5 gap-4 pt-[70px] pb-3 mx-[100px] max-lg:mx-5">
        <Navbar />

        <div className="col-span-4 max-xl:col-span-5">
          <h3 id="intro">Introduction</h3>
          <hr className="border-[1px] border-solid border-grey mt-2" />
        </div>
        <Introduction />

        <div className="col-span-4 max-xl:col-span-5">
          <h3 id="about">About</h3>
          <hr className="border-[1px] border-solid border-grey mt-2" />
        </div>
        <About />

        <div className="col-span-4 max-xl:col-span-5">
          <h3 id="experience">Experience</h3>
          <hr className="border-[1px] border-solid border-grey mt-2" />
        </div>
        <Experience />

        <div className="col-span-4 max-xl:col-span-5">
          <h3 id="project">Project</h3>
          <hr className="border-[1px] border-solid border-grey mt-2" />
        </div>
        {listApps}

        <div className="col-span-4 max-xl:col-span-5 max-sm:mt-[30px]">
          <hr className="border-[1px] border-solid border-grey mt-2" />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
