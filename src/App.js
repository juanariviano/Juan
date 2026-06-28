import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Stats from "./components/Stats";
import About from "./components/About";
import Experience from "./components/Experience";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-[100dvh] w-full bg-ng-bg text-ng-fg transition-colors duration-200">
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Experience />
        <Project />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
