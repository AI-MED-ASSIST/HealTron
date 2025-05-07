import React, { useEffect } from "react";
import Home from "../components/Home";
import About from "../components/About";
import Performance from "../components/Performance";
import Services from "../components/Services";
import Models from "../components/Models";
import Contact from "../components/Contact";
import RoadMap from "../components/RoadMap";
import Team from "../components/Team";

function HomePage() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Home />
      <About />
      <Performance />
      <Services />
      <Models />
      <RoadMap />
      <Team />
      <Contact />
    </div>
  );
}

export default HomePage;
