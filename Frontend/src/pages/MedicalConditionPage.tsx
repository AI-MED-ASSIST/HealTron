import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";
import MedicalHistoryModal from "../modals/MedicalHistoryModal";
import { updateProfile } from "../services/userService";

const MedicalConditionPage: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setMedicalConditions(user.medicalConditions || []);
    }
  }, [user]);

  const handleDeleteTag = (condition: string) => {
    setMedicalConditions((prev) => prev.filter((item) => item !== condition));
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const updatedUser = await updateProfile(user._id, {
        medicalConditions,
      });
      login(updatedUser);
      alert("Medical conditions updated successfully!");
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to update medical conditions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start w-auto p-4 md:p-8 lg:p-10 pt-8 sm:pt-12 md:pt-16">
      <div className="w-full max-w-4xl bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-2xl border border-gray-600 mt-4 sm:mt-8 lg:pt-16">
        <h1 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 font-semibold text-center text-gray-700 truncate">
          Add Medical Conditions
        </h1>

        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-transparent p-4 sm:p-6 rounded-lg w-full">
            {medicalConditions.length === 0 ? (
              <div className="text-center">
                <p className="text-gray-700 text-xs sm:text-sm md:text-base">
                  Hey! There are no previous medical conditions!! If there are
                  any, add your medical condition by clicking the button below.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-3 sm:mt-4 w-full max-w-[240px] bg-[#2092fa] hover:bg-blue-500 text-white font-semibold py-4 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 text-sm sm:text-base flex items-center justify-center whitespace-nowrap"
                >
                  <FaPlus className="inline mr-2 text-base" />
                  Add Medical Condition
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {medicalConditions.map((condition, idx) => (
                  <div
                    key={idx}
                    className="flex flex-nowrap items-center justify-between bg-white px-2 sm:px-3 py-1 rounded-full shadow-sm border border-gray-600 max-w-[200px]"
                  >
                    <span className="mr-1.5 sm:mr-2 text-gray-700 text-xs sm:text-sm truncate">
                      {condition}
                    </span>
                    <button
                      onClick={() => handleDeleteTag(condition)}
                      className="text-gray-400 hover:text-gray-800 transition-colors duration-200 flex-shrink-0"
                    >
                      <FaTimes className="text-xs sm:text-sm" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setShowModal(true)}
                  className="w-auto min-w-[140px] max-w-[180px] bg-[#2092fa] hover:bg-blue-500 text-white font-bold py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 flex items-center text-nowrap text-xs sm:text-sm"
                >
                  <FaPlus className="mr-1 sm:mr-2 text-xs sm:text-sm" /> Add
                  Medical Condition
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-auto min-w-[120px] max-w-[160px] bg-[#2092fa] hover:bg-blue-500 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 text-xs sm:text-sm"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>

        {showModal && (
          <MedicalHistoryModal
            onClose={() => setShowModal(false)}
            currentConditions={medicalConditions}
            onSave={(conditions: string[]) => setMedicalConditions(conditions)}
            titleClassName="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-3 sm:mb-4"
            modalContentClassName="bg-gray-50 rounded-lg shadow-xl p-4 sm:p-6 border border-gray-400"
            conditionsContainerClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2"
            conditionItemClassName="bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md shadow-sm flex items-center justify-between border border-gray-400"
            deleteButtonClassName="text-gray-400 hover:text-black transition-colors duration-200"
            saveButtonClassName="w-auto min-w-[120px] max-w-[160px] bg-[#2092fa] hover:bg-[#1875cc] text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 text-xs sm:text-sm"
            inputClassName="shadow appearance-none border border-gray-400 rounded w-full py-1.5 sm:py-2 px-2.5 sm:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs sm:text-sm"
            addButtonClassName="w-auto min-w-[120px] max-w-[160px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 text-xs sm:text-sm"
          />
        )}
      </div>
    </div>
  );
};

export default MedicalConditionPage;
