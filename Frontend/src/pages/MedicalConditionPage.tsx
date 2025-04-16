// frontend/src/pages/MedicalConditionPage.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProfile, updateProfile } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";
import MedicalHistoryModal from "../modals/MedicalHistoryModal";

const MedicalConditionPage: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Load user's medical conditions from global state (or fetched profile if necessary)
  useEffect(() => {
    if (user) {
      setMedicalConditions(user.medicalConditions || []);
    }
  }, [user]);

  // Handler to remove a condition locally from the tag list
  const handleDeleteTag = (condition: string) => {
    setMedicalConditions((prev) => prev.filter((item) => item !== condition));
  };

  // Save profile: Update user with new medical conditions
  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await updateProfile(user._id, { medicalConditions });
      login(data.user); // Update global state with new data
      alert("Profile updated successfully");
      navigate("/"); // Redirect to Home page
    } catch (err: any) {
      setError(err.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 text-white bg-gray-900 min-h-screen min-w-full pt-20">
      <h1 className="text-3xl mb-6 font-bold text-center">
        Medical Conditions
      </h1>

      {/* Centered Card Layout for Medical Conditions */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
          {medicalConditions.length === 0 ? (
            <div className="text-center">
              <p>
                Hey! There are no previous medical conditions!! If there are
                any, add your medical condition by clicking the button below.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                <FaPlus className="inline mr-2" /> Add Medical Condition
              </button>
            </div>
          ) : (
            // Using grid to show a maximum of 4 tags per row on large screens
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {medicalConditions.map((condition, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-700 px-3 py-1 rounded-full"
                >
                  <span className="mr-2">{condition}</span>
                  <button
                    onClick={() => handleDeleteTag(condition)}
                    className="text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              {/* Button to add new condition */}
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center bg-blue-600 px-3 py-1 rounded-full hover:bg-blue-700 transition text-nowrap"
              >
                <FaPlus className="mr-2" /> Add Medical Condition
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-green-600 px-6 py-3 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>

      {showModal && (
        <MedicalHistoryModal
          onClose={() => setShowModal(false)}
          currentConditions={medicalConditions}
          onSave={(conditions: string[]) => setMedicalConditions(conditions)}
        />
      )}
    </div>
  );
};

export default MedicalConditionPage;
