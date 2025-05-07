import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // This will trigger animations both on initial load and on refresh
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Background gradient animation
  const backgroundVariants = {
    hidden: {
      backgroundPosition: "50% 0%",
      opacity: 0.7,
    },
    visible: {
      backgroundPosition: "50% 10%",
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  const handleGetStarted = () => {
    navigate("/symptom-checker");
  };

  return (
    <motion.div
      id="home"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={backgroundVariants}
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden py-20"
      style={{
        backgroundColor: "#f6f9fb",
        backgroundImage: `
          radial-gradient(
            circle at top center,
            rgba(0, 119, 255, 0.25) 0%,
            rgba(246, 249, 251, 1) 40%
          )
        `,
        backgroundSize: "210% 190%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-20 px-4 sm:px-6 md:px-8"
        variants={containerVariants}
      >
        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight"
          variants={itemVariants}
        >
          Your health,
        </motion.div>
        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight"
          variants={itemVariants}
        >
          Redefined by <span className="text-[#2092fa]">AI.</span>
        </motion.div>
        <motion.div
          className="text-base sm:text-lg md:text-xl text-gray-700 mt-2 md:mt-4 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto px-2 sm:px-4 text-center leading-relaxed"
          variants={itemVariants}
        >
          <p>
            Personalized AI Med Assist offers tailored health insights, helping
            you manage your wellness with ease and confidence. With the latest
            AI technology, we make health management simpler and more effective.
          </p>
        </motion.div>
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
          className="bg-[#2092fa] text-gray-50  font-bold px-6 sm:px-7 md:px-10 py-3 md:py-5 rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl hover:bg-[#2092fa] transition-all duration-300 mt-6 md:mt-8"
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Home;
