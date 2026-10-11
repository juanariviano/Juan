import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WallDecor from "./components/WallDecor";
import PencilCursor from "./components/PencilCursor";

function App() {
  return (
    <div className="paper-bg relative min-h-[100dvh] w-full overflow-x-clip text-nb-ink">
      <WallDecor />
      <PencilCursor />
      <Navigation />
      <main className="relative z-[1]">
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
