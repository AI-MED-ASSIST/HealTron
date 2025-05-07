import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sidebar from "./sidebar";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

interface NavbarWithBackProps {
  title?: string;
  onClose?: () => void;
}

const NavbarWithBack: React.FC<NavbarWithBackProps> = ({ title, onClose }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const titleRef = useRef<HTMLSpanElement>(null);
  const [titleWidth, setTitleWidth] = useState<string>("auto");

  useEffect(() => {
    const updateTitleWidth = () => {
      if (titleRef.current) {
        const width = titleRef.current.offsetWidth;
        setTitleWidth(`${width}px`);
      } else {
        setTitleWidth("auto");
      }
    };

    updateTitleWidth();
    window.addEventListener("resize", updateTitleWidth);
    return () => window.removeEventListener("resize", updateTitleWidth);
  }, [title, isSidebarOpen]);

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-3 px-4 shadow-2xl w-full">
      <div className="max-w-6xl mx-auto flex items-center justify-between sm:justify-around md:justify-between relative">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="px-4 py-1.5 rounded-full border-2 border-gray-600 font-bold text-sm sm:text-base text-gray-700 hover:text-blue-500 hover:border-blue-500 transition-colors flex items-center gap-2"
        >
          Back
        </motion.button>

        {/* Title */}
        <span
          ref={titleRef}
          className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg sm:text-xl text-gray-700 text-center whitespace-nowrap"
          style={{
            width: titleWidth,
            transition: "width 0.3s ease",
          }}
        >
          {title}
        </span>

        {/* Profile Picture or Sidebar Toggle */}
        <div className="ml-3 flex-shrink-0">
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isSidebarOpen ? (
              <ArrowLeft className="h-8 w-8 text-[#1c2434]" />
            ) : (
              <img
                src={
                  user?.profilePic ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQg-lr5__zRqY3mRg6erzAD9n4BGp3G8VfA&s"
                }
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover border border-gray-600"
              />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
    </nav>
  );
};

export default NavbarWithBack;
