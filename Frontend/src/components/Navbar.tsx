import React, { useState, useEffect } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Link as ScrollLink } from "react-scroll";
import { useLocation } from "react-router-dom";

interface NavbarProps {
  onProfileClick: () => void;
  sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onProfileClick, sidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Models", id: "models" },
    { name: "Contact", id: "contact" },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 10;
      setIsScrolled(!isTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  // Determine if we should show white background
  const shouldShowWhiteBg = isScrolled || location.pathname !== "/";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 select-none ${
        shouldShowWhiteBg ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Brand */}
          <div className="text-2xl font-bold text-gray-800">
            Heal<span className="text-[#0077b6]">Tron</span>
          </div>

          {/* Desktop Navigation Links in the middle */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <ScrollLink
                  to={link.id}
                  smooth
                  offset={-80}
                  duration={500}
                  className="text-gray-700 text-base font-medium hover:text-[#0077b6] cursor-pointer transition-colors"
                >
                  {link.name}
                </ScrollLink>
              </motion.div>
            ))}
          </div>

          {/* Right side: Profile icon with username */}
          <div className="flex items-center">
            <button onClick={onProfileClick} className="focus:outline-none">
              {sidebarOpen ? (
                <ArrowLeft className="h-6 w-6 text-[#1c2434]" />
              ) : (
                <img
                  src={
                    user?.profilePic ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQg-lr5__zRqY3mRg6erzAD9n4BGp3G8VfA&s"
                  }
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover cursor-pointer border border-gray-300"
                />
              )}
            </button>
            {user?.username && (
              <span className="ml-2 text-gray-700 text-md">
                {user.username}
              </span>
            )}
            {/* Mobile Navigation Button */}
            <div className="md:hidden ml-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-[#0077b6] focus:outline-none"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-white w-full absolute left-0 shadow-md rounded-b-lg"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col p-4 space-y-4">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ x: 5, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ScrollLink
                      to={link.id}
                      smooth
                      offset={-80}
                      duration={500}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 text-base font-medium hover:text-[#0077b6] cursor-pointer transition-colors"
                    >
                      {link.name}
                    </ScrollLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
