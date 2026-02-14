import "./App.css";
import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import About from "./components/About";
import Experience from "./components/Experience";
import Project from "./components/Project.js";
import Footer from "./components/Footer.js";
import Top from "./components/Top.js";
import { useRef } from "react";

function App() {
  // Dark Mode Toggle
  const toogleDark = useRef();

  // const darkMode = () => {
  //   toogleDark.current.classList.toggle('dark:bg-white');
  //   toogleDark.current.classList.toggle('dark:text-black');
  // }

  return (
    <div ref={toogleDark} className="bg-white dark:bg-black dark:text-white">
      <Top />

      <div className="font-mono grid grid-cols-4 gap-4 pt-[70px] pb-3 mx-[100px] max-lg:mx-4 max-xl:grid-cols-3">
        <Navbar />

        <div className="col-span-3 max-xl:col-span-3">
          <h3 id="intro">Introduction</h3>
          <hr className="border-[1px] border-solid border-grey mt-2" />
        </div>
        <Introduction />

        <div className="col-span-3 max-xl:col-span-3">
          <h3 id="about">About</h3>
          <hr className="border-[1px] border-solid border-grey mt-2" />
        </div>
        <About />

        <div className="col-span-3 max-xl:col-span-3">
          <h3 id="experience">Experience</h3>
          <hr className="border-[1px] border-solid border-grey mt-2" />
        </div>
        <Experience />

        <div className="col-span-3 max-xl:col-span-3">
          <h3 id="project">Project</h3>
          <hr className="border-[1px] border-solid border-grey mt-2" />
        </div>
        <Project />

        <div className="col-span-3 max-xl:col-span-3 max-sm:mt-[30px]">
          <hr className="border-[1px] border-solid border-grey mt-2" />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
