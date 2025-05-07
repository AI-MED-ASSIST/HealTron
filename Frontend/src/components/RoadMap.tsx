import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import first from "../../public/RoadMap/firstimage.png";
import second from "../../public/RoadMap/secondimage.png";
import third from "../../public/RoadMap/thirdimage.png";

const RoadMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const steps = [
    {
      number: "1",
      title: "Update Profile",
      description: " Upload or check your profile details.",
      image: first,
    },
    {
      number: "2",
      title: "Select Symptoms",
      description: "Choose your symptoms, and AI analyze processing.",
      image: second,
    },
    {
      number: "3",
      title: "Check the results",
      description: "View possible conditions and see recommendations.",
      image: third,
    },
  ];

  const handleCheckClick = () => {
    navigate("/symptom-checker");
  };

  return (
    <section ref={ref} className="bg-gray-50 py-12" id="roadmap">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Symptom Checker
          </h2>
          <h3 className="text-xl md:text-2xl text-gray-700 py-6">
            Personalized Health Analysis Powered by AI
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto ml-16"
        >
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-center mb-12 md:mb-0 max-w-xs"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl relative z-10 border-2 border-[#2092fa]">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  <div className="absolute top-0 right-0 bg-[#2092fa] text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transform translate-x-1/5 -translate-y-1/4 border-4 border-white">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#1a2e4c] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  variants={itemVariants}
                  className="hidden md:block w-48 h-[2px] bg-[#2092fa] relative top-[-64px]"
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Check button */}
        <motion.div
          className="text-center mt-12 mr-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <motion.button
            onClick={handleCheckClick}
            className="bg-gray-50 border-2 border-[#2092fa] text-gray-800 px-6 py-6 rounded-full hover:bg-[#2092fa] hover:text-white transition-colors duration-200 cursor-pointer text-lg font-bold"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{
              y: 0,
              scale: 1,
            }}
          >
            Check Symptom Analyzer
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default RoadMap;
