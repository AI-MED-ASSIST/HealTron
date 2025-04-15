import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });

  const centerControls = useAnimation();
  const featureControls = useAnimation();

  const features = [
    {
      title: "Evidence-Based",
      description: "Recommendations backed by medical research",
      icon: "📊",
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Personalized Care",
      description: "AI-driven insights tailored to your unique health profile",
      icon: "🧠",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Real-Time Support",
      description: "24/7 assistance when you need it most",
      icon: "⚡",
      color: "bg-teal-50 text-teal-600",
    },
    {
      title: "Secure & Private",
      description: "Enterprise-grade security for your medical data",
      icon: "🛡️",
      color: "bg-purple-50 text-purple-600",
    },
  ];
  const featureAnimation = (index: any) => {
    const positions = [
      { x: -300, y: -300 },
      { x: 300, y: -300 },
      { x: -300, y: 300 },
      { x: 300, y: 300 },
    ];
    return {
      hidden: {
        opacity: 0,
        scale: 0.5,
        x: positions[index].x,
        y: positions[index].y,
      },
      visible: {
        opacity: 1,
        scale: 1,
        x: 270 * Math.cos(index * 90 * (Math.PI / 180)),
        y: 270 * Math.sin(index * 90 * (Math.PI / 180)),
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 10,
          delay: index * 0.15,
        },
      },
    };
  };

  // **Center Circle Animation**
  const centerAnimation = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 8 },
    },
    click: {
      scale: [1, 1.2, 0.9, 1.1, 1],
      transition: { duration: 0.6 },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // **Auto Replay Animation**
  useEffect(() => {
    if (inView) {
      const runAnimations = async () => {
        await centerControls.start("hidden");
        await featureControls.start("hidden");

        await centerControls.start("visible");
        await featureControls.start("visible");

        centerControls.start("pulse");
      };
      runAnimations();
    }
  }, [inView]);

  return (
    <section id="about" ref={ref} className="py-20 bg-[#f6f9fb]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900">AI Med-Assist</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Revolutionizing healthcare through intelligent technology
          </p>
        </div>

        <div className="relative h-[600px] md:h-[700px] flex items-center justify-center">
          {/* Center Circle */}
          <motion.div
            initial="hidden"
            animate={centerControls}
            variants={centerAnimation}
            whileTap="click"
            className="absolute z-10 w-56 h-56 rounded-full bg-white shadow-xl flex flex-col items-center justify-center cursor-pointer"
          >
            <span className="text-6xl mb-1">⚕️</span>
            <p className="text-xl font-bold text-gray-800">AI Med-Assist</p>
          </motion.div>

          {/* Feature Boxes (Coming from 4 Directions) */}
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={featureControls}
              variants={featureAnimation(index)}
              className={`absolute z-10 w-56 h-56 ${feature.color} p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center cursor-pointer`}
            >
              <span className="text-5xl mb-2">{feature.icon}</span>
              <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
              <p className="text-sm leading-tight">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default About;
