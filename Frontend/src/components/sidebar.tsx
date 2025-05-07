// frontend/src/components/Sidebar.tsx
import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HashLink } from "react-router-hash-link"; // Import HashLink
import { motion } from "framer-motion"; // Import motion
import {
  FaUserEdit,
  FaPlusSquare,
  FaHistory,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 z-[100] bg-[#ffffff] transition-colors duration-300 rounded-3xl border-l border-gray-800`}
    >
      {/* Back Button */}
      <div className="absolute top-6 left-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-1.5 rounded-full border-2 border-gray-600 font-bold text-sm sm:text-base text-gray-700 hover:text-blue-500 hover:border-blue-500 transition-colors flex items-center gap-2"
          onClick={onClose}
        >
          Back
        </motion.button>
      </div>
      {/* Profile Info */}
      <div className="flex flex-col items-center mt-28 mb-8">
        <img
          src={
            user?.profilePic ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQg-lr5__zRqY3mRg6erzAD9n4BGp3G8VfA&s"
          }
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover mb-2"
        />
        <h2 className="font-bold text-lg text-gray-700 text-center">
          {user?.username}
        </h2>
      </div>
      {/* Navigation Links */}
      <nav className="flex flex-col gap-3 px-2">
        <Link
          to={`/edit-profile/${user?._id}`}
          onClick={onClose}
          className="text-gray-700 hover:shadow-md py-2 px-4 rounded-md block text-center hover:bg-gray-200 transition-colors duration-200 flex items-center gap-3"
        >
          <FaUserEdit className="text-gray-500 " />
          Edit Profile
        </Link>
        <Link
          to="/medical"
          onClick={onClose}
          className="text-gray-700 hover:shadow-md py-2 px-4 rounded-md block text-center hover:bg-gray-200 transition-colors duration-200 flex items-center gap-3"
        >
          <FaPlusSquare className="text-gray-500" />
          Add Medical Condition
        </Link>
        <Link
          to="/history"
          onClick={onClose}
          className="text-gray-700 hover:shadow-md py-2 px-4 rounded-md block text-center hover:bg-gray-200 transition-colors duration-200 flex items-center gap-3"
        >
          <FaHistory className="text-gray-500" />
          Symptom Checker History
        </Link>
        <Link
          to="/disease-pred"
          onClick={onClose}
          className="text-gray-700 hover:shadow-md py-2 px-4 rounded-md block text-center hover:bg-gray-200 transition-colors duration-200 flex items-center gap-3"
        >
          <FaHistory className="text-gray-500" />
          Disease Prediction History
        </Link>
        <HashLink // Use HashLink instead of Link
          to="/#contact" // Link to the element with the id "contact" on the home page
          onClick={onClose}
          className="text-gray-700 hover:shadow-md py-2 px-4 rounded-md block text-center hover:bg-gray-200 transition-colors duration-200 flex items-center gap-3"
        >
          <FaQuestionCircle className="text-gray-500" />
          Help & Support
        </HashLink>
      </nav>
      {/* Logout Button at Bottom */}
      <div className="absolute bottom-8 left-6 right-6 flex justify-center">
        <button
          onClick={handleLogout}
          className="w-full bg-[#2092fa] text-white p-3 rounded hover:bg-blue-500 focus:outline-none hover:shadow-md hover:shadow-gray-200 flex items-center justify-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
