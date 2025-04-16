import React, { useEffect } from "react";
import Home from "../components/Home";
import About from "../components/About";
import Services from "../components/Services";
import Models from "../components/Models";
import Contact from "../components/Contact";

function HomePage() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Home />
      <About />
      <Services />
      <Models />
      <Contact />
    </div>
  );
}

export default HomePage;
