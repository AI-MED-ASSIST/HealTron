import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Github, MessageCircle } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#00000E] text-white py-12 flex flex-col items-center w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
                <div className="mb-6">
          <img 
            src="/images/D_logo.png" 
            alt="AI Med-Assist Logo" 
            className="h-12 sm:h-16 md:h-20 object-contain mx-auto"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mb-8 text-lg text-center"
        >
          {['Home', 'About', 'Services', 'Models', 'Contact'].map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
              whileHover={{ y: -2, scale: 1.1, color: '#60a5fa' }}
              transition={{ duration: 0.2 }}
              className="text-white transition-all duration-300 cursor-pointer hover:text-blue-400"
            >
              {item}
            </motion.button>
          ))}
        </motion.div>
        {/* Social Media Icons */}
        <div className="flex flex-wrap justify-center space-x-6 mb-6">
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, color: '#60a5fa' }}
            transition={{ duration: 0.2 }}
            className="text-white hover:text-blue-400 transition-all duration-300"
          >
            <MessageCircle className="h-6 w-6" /> 
          </motion.a>
          <motion.a
            href="https://www.instagram.com/d_i_n_e_s_h_h_/"
            whileHover={{ scale: 1.2, color: '#60a5fa' }}
            transition={{ duration: 0.2 }}
            className="text-white hover:text-blue-400 transition-all duration-300"
          >
            <Instagram className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/dinesh-nt-20b0b6256/"
            whileHover={{ scale: 1.2, color: '#60a5fa' }}
            transition={{ duration: 0.2 }}
            className="text-white hover:text-blue-400 transition-all duration-300"
          >
            <Linkedin className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, color: '#60a5fa' }}
            transition={{ duration: 0.2 }}
            className="text-white hover:text-blue-400 transition-all duration-300"
          >
            <Github className="h-6 w-6" />
          </motion.a>
        </div>
      </div>
      <div className="border-t border-gray-800 w-full text-center text-white py-4">
        <p>&copy; {new Date().getFullYear()} AI Med-Assist. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
