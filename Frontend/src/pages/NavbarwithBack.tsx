// src/components/NavbarWithBack.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion

interface NavbarWithBackProps {
  onClose?: () => void; // Make onClose optional
}

const NavbarWithBack: React.FC<NavbarWithBackProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClose) {
      onClose(); // Call onClose if provided
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4 flex items-center relative"> {/* Added relative for absolute positioning of button */}
      {/* Back Button */}
      <div className="absolute top-6 left-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1.5 rounded-full border-2 border-gray-600 font-bold text-sm sm:text-base text-gray-700 hover:text-blue-500 hover:border-blue-500 transition-colors flex items-center gap-2"
                onClick={onClose} 
              >
                Back
              </motion.button>
            </div>
      {/* You can add other elements or title here if needed.  Consider centering them. */}
    </nav>
  );
};

export default NavbarWithBack;
