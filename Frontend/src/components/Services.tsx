import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Services = () => {
  const features = [
    {
      title: "Personalized Healthcare",
      description:
        "Tailored Solutions for Every Patient. The AI system customizes healthcare solutions by analyzing individual health data, providing personalized treatments and care recommendations.",
      image: "/Services/Personal Healthcare.png",
    },
    {
      title: "Medical Analysis",
      description:
        "Comprehensive Analysis of Medical Data and Patient History. The system analyzes medical data and patient records, providing healthcare professionals with insights to make informed, personalized treatment decisions.",
      image: "/Services/Medical Analysis.png",
    },
    {
      title: "Real-Time Healthcare Insights",
      description:
        "Immediate Action Based on Real-Time Health Monitoring. Real-time health data enables quick responses to changes in health status, supporting proactive and immediate healthcare actions.",
      image: "/Services/Realtime.png",
    },
    {
      title: "Medical Reports",
      description:
        "Detailed Medical Reports and Analysis Documentation. Comprehensive reports and analysis documentation help both patients and healthcare providers stay informed about health conditions and treatment options.",
      image: "/Services/Medical Report.png",
    },
    {
      title: "AI Diagnostics",
      description:
        "Cutting-edge Artificial Intelligence for Medical Diagnostics. AI-powered diagnostic tools quickly analyze symptoms and test results, providing accurate diagnoses and assisting doctors in delivering timely treatments.",
      image: "/Services/AI Diagnostics.png",
    },
    {
      title: "Safe & Secure",
      description:
        "Your health data is protected with advanced encryption and security protocols, ensuring your privacy and confidentiality at all times.",
      image: "/Services/Safe & Secure.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  // Automatic slide change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 4000); // 3000 milliseconds = 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]); // Listen to currentIndex change

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">
        Our <span className="text-[#2092fa]">Services</span>
      </h2>
      <h3 className="text 3xl font-serif text-gray-600 mb-4">to get inghj</h3>

      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-32 z-10 bg-[#2092fa] hover:bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition"
          style={{
            top: "50%",
            transform: "translateY(160%)",
          }}
        >
          <FaChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-32 z-10 bg-[#2092fa] hover:bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition"
          style={{
            top: "50%",
            transform: "translateY(160%)",
          }}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Content Section */}
      <div className="mt-8 max-w-xl mx-auto">
        <img
          src={features[currentIndex].image}
          alt={features[currentIndex].title}
          className="w-24 h-34 mx-auto mb-4 object-contain"
        />
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">
          {features[currentIndex].title}
        </h3>
        <p className="text-gray-600">{features[currentIndex].description}</p>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {features.map((_, index) => (
          <span
            key={index}
            className={`w-4 h-4 rounded-full ${
              index === currentIndex ? "bg-[#2092fa]" : "bg-gray-400"
            }`}
            style={{ transition: "all 0.3s" }}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
