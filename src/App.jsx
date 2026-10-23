import {useEffect, useState} from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import SoftSkills from "./components/SoftSkills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import BackgroundEffects from "./components/BackgroundEffects";

function getTheme() {
  try {
    return localStorage.getItem("theme") || "dark";
  } catch {
    return "dark";
  }
}

export default function App() {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      infinite: false,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return (
    <>
      <ScrollProgress />
      <BackgroundEffects />
      <Navbar
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />
      <main>
        <Hero />
        <About />
        <Skills />
        {/* <Education /> */}
        <Projects />
        {/* <Certifications /> */}
        <SoftSkills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
