// frontend/src/components/Navbar.tsx
import React, { useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  onProfileClick: () => void;
  sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onProfileClick, sidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Models", id: "models" },
    { name: "Contact", id: "contact" },
  ];

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full bg-gray-800 shadow-lg backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Brand */}
          <a
            href="#home"
            onClick={() => handleScroll("home")}
            className="text-2xl font-bold text-white cursor-pointer"
          >
            AI-Med Assist
          </a>

          {/* Desktop Navigation Links in the middle */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(link.id);
                }}
                whileHover={{ y: 1, scale: 1.1, color: "#60a5fa" }}
                transition={{ duration: 0.2 }}
                className="text-white transition-all duration-300 py-2 text-sm font-medium cursor-pointer hover:text-blue-400"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Right side: Profile icon with username */}
          <div className="flex items-center">
            <button onClick={onProfileClick} className="focus:outline-none">
              {sidebarOpen ? (
                <ArrowLeft className="h-6 w-6 text-white" />
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
              <span className="ml-2 text-white text-md">{user.username}</span>
            )}
            {/* Mobile Navigation Button */}
            <div className="md:hidden ml-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-white focus:outline-none"
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
        {isOpen && (
          <div className="md:hidden bg-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(link.id);
                  }}
                  whileHover={{ x: 5, scale: 1.05, color: "#60a5fa" }}
                  transition={{ duration: 0.2 }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-blue-400 hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
