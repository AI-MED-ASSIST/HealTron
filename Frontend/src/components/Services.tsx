import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import personalHealthcare from "../../public/Services/Personal Healthcare.png";
import medicalanalysis from "../../public/Services/Medical Analysis.png";
import realtime from "../../public/Services/Realtime.png";
import medicalreport from "../../public/Services/Medical Report.png";
import aidiagnosis from "../../public/Services/AI Diagnostics.png";
import safesecure from "../../public/Services/Safe & Secure.png";

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const features = [
    {
      title: "Personalized Healthcare",
      description:
        "Tailored Solutions for Every Patient. The AI system customizes healthcare solutions by analyzing individual health data, providing personalized treatments and care recommendations.",
      image: personalHealthcare,
    },
    {
      title: "Medical Analysis",
      description:
        "Comprehensive Analysis of Medical Data and Patient History. The system analyzes medical data and patient records, providing healthcare professionals with insights to make informed, personalized treatment decisions.",
      image: medicalanalysis,
    },
    {
      title: "Real-Time Healthcare Insights",
      description:
        "Immediate Action Based on Real-Time Health Monitoring. Real-time health data enables quick responses to changes in health status, supporting proactive and immediate healthcare actions.",
      image: realtime,
    },
    {
      title: "Medical Reports",
      description:
        "Detailed Medical Reports and Analysis Documentation. Comprehensive reports and analysis documentation help both patients and healthcare providers stay informed about health conditions and treatment options.",
      image: medicalreport,
    },
    {
      title: "AI Diagnostics",
      description:
        "Cutting-edge Artificial Intelligence for Medical Diagnostics. AI-powered diagnostic tools quickly analyze symptoms and test results, providing accurate diagnoses and assisting doctors in delivering timely treatments.",
      image: aidiagnosis,
    },
    {
      title: "Safe & Secure",
      description:
        "Your health data is protected with advanced encryption and security protocols, ensuring your privacy and confidentiality at all times.",
      image: safesecure,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="services"
      ref={ref}
      className="py-10 md:py-12 lg:py-12 text-center overflow-hidden bg-gray-50"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
          Our Services
        </h2>
        <h3 className="text-xl md:text-2xl text-gray-700 mb-8 md:mb-8">
          Smart, Tailored Healthcare at Your Fingertips
        </h3>

        <div className="relative flex items-center justify-center">
          {/* Hide this button on mobile */}
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute left-0 md:left-10 lg:left-28 z-10 bg-[#2092fa] hover:bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center shadow-md transition transform hover:scale-105"
            style={{
              top: "50%",
              transform: "translateY(-60%)",
            }}
          >
            <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Hide this button on mobile */}
          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-0 md:right-8 lg:right-28 z-10 bg-[#2092fa] hover:bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center shadow-md transition transform hover:scale-105"
            style={{
              top: "50%",
              transform: "translateY(-60%)",
            }}
          >
            <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div className="w-full max-w-2xl mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-start h-[360px] md:h-[400px] lg:h-[420px] text-center">
              <img
                src={features[currentIndex].image}
                alt={features[currentIndex].title}
                className="w-20 h-20 md:w-28 md:h-28  object-contain"
              />
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                {features[currentIndex].title}
              </h3>
              <p className="text-base md:text-lg text-gray-600 max-w-xl overflow-auto px-2">
                {features[currentIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* Adjusted margin-top for pagination dots */}
        <div className="flex justify-center  space-x-2 md:space-x-3 mb-8">
          {features.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-[#2092fa]" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
