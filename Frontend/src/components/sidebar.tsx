// frontend/src/components/Sidebar.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="fixed top-0 right-0 h-full w-1/4 bg-gray-900 text-white p-6 z-[100] shadow-2xl">
      {/* Back Button */}
      <button
        onClick={onClose}
        className="mb-6 text-gray-300 focus:outline-none"
      >
        ← Back
      </button>
      {/* Profile Info */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={
            user?.profilePic ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQg-lr5__zRqY3mRg6erzAD9n4BGp3G8VfA&s"
          }
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover mb-2"
        />
        <h2 className="font-bold text-lg">{user?.username}</h2>
      </div>
      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <Link
          to={`/edit-profile/${user?._id}`}
          onClick={onClose}
          className="text-blue-400 hover:underline"
        >
          Edit Profile
        </Link>
        <Link
          to="/history"
          onClick={onClose}
          className="text-blue-400 hover:underline"
        >
          View Previous History
        </Link>
        <Link
          to="/medical"
          onClick={onClose}
          className="text-blue-400 hover:underline"
        >
          Add Medical Condition
        </Link>
        <Link
          to="/help"
          onClick={onClose}
          className="text-blue-400 hover:underline"
        >
          Help & Support
        </Link>
      </nav>
      {/* Logout Button at Bottom */}
      <div className="absolute bottom-8 left-6 right-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
