import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
    { name: "Road Map", id: "roadmap" },
    { name: "Team", id: "team" },
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

  const shouldShowWhiteBg = isScrolled || location.pathname !== "/";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 select-none ${
        shouldShowWhiteBg ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="text-xl sm:text-2xl font-extrabold text-gray-800 flex-shrink-0">
            HEAL<span className="text-[#2092fa]">TRON</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 lg:space-x-8 justify-center flex-grow">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <ScrollLink
                  to={link.id}
                  smooth
                  offset={-80}
                  duration={500}
                  className="text-sm lg:text-base font-medium text-gray-700 hover:text-[#2092fa] cursor-pointer transition-colors whitespace-nowrap"
                >
                  {link.name}
                </ScrollLink>
              </motion.div>
            ))}
          </div>

          {/* Profile + Mobile Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onProfileClick}
              className="focus:outline-none flex items-center"
            >
              <img
                src={
                  user?.profilePic ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQg-lr5__zRqY3mRg6erzAD9n4BGp3G8VfA&s"
                }
                alt="Profile"
                className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 rounded-full object-cover cursor-pointer border border-gray-800"
              />
              {user?.username && (
                <span className="ml-2 hidden lg:inline text-sm lg:text-base text-gray-700 font-bold">
                  {user.username}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5 xs:h-6 xs:w-6" />
              ) : (
                <Menu className="h-5 w-5 xs:h-6 xs:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="py-2 px-4 space-y-3">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ScrollLink
                      to={link.id}
                      smooth
                      offset={-80}
                      duration={500}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-base text-gray-700 font-medium hover:text-[#2092fa] cursor-pointer transition-colors"
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
