import React from "react";
import { motion } from "framer-motion";
import { Github, Instagram, MessageSquare } from "lucide-react";
import Healtronlogo from "../../public/Healtron.png";

const Footer = () => {
  const navigateTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-50 text-gray-700 py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Logo */}
        <img
          src={Healtronlogo}
          alt="AI Med-Assist Logo"
          className="h-16 md:h-20 object-contain mx-auto mb-2"
        />

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          AI Med Assist
        </h2>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {[
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Services", id: "services" },
            { name: "Models", id: "models" },
            { name: "RoadMap", id: "roadmap" },
            { name: "Team", id: "team" },
            { name: "Contact", id: "contact" },
            { name: "Symptom Checker", id: "home" },
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className="text-gray-700 hover:text-blue-500 transition-all duration-300 font-medium"
              whileHover={{ y: -2, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-8 mb-4">
          <motion.a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-700 hover:text-black transition-all duration-300"
          >
            <Github className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="https://whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-700 hover:text-green-500 transition-all duration-300"
          >
            <MessageSquare className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-700 hover:text-pink-500 transition-all duration-300"
          >
            <Instagram className="h-6 w-6" />
          </motion.a>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 w-full text-center pt-4">
          <p className="text-gray-700 text-sm">
            &copy; {new Date().getFullYear()} AI Med Assist. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
