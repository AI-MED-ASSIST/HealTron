import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { getDiseases } from "../services/diseaseService";

interface Disease {
  _id: string;
  name: string;
}

interface Props {
  onClose: () => void;
  currentConditions: string[];
  onSave: (conditions: string[]) => void;
}

const MedicalHistoryModal: React.FC<Props> = ({
  onClose,
  currentConditions,
  onSave,
}) => {
  const [allDiseases, setAllDiseases] = useState<Disease[]>([]);
  const [filterText, setFilterText] = useState("");
  const [conditions, setConditions] = useState<string[]>(currentConditions);

  // Fetch disease list on mount
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const data = await getDiseases();
        setAllDiseases(data.diseases);
      } catch (error) {
        console.error("Error fetching diseases:", error);
      }
    };
    fetchDiseases();
  }, []);

  // Filter the diseases safely
  const filteredDiseases = allDiseases.filter((d) =>
    d?.name?.toLowerCase().includes(filterText.toLowerCase())
  );

  // Handler for selecting a disease from the dropdown
  const handleSelectDisease = (diseaseName: string) => {
    if (!conditions.includes(diseaseName)) {
      setConditions([...conditions, diseaseName]);
    }
    setFilterText(""); // Reset filter after selection
  };

  const handleDeleteCondition = (condition: string) => {
    setConditions(conditions.filter((c) => c !== condition));
  };

  const handleSave = () => {
    onSave(conditions);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-2 z-50">
      <div className="bg-gray-50 p-6 rounded-2xl w-full max-w-xl border-2 border-gray-700">
        <h2 className="text-xl mb-4 font-bold text-center text-gray-800">
          Add Medical Conditions
        </h2>

        {/* Selected conditions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {conditions.map((cond, idx) => (
            <div
              key={idx}
              className="flex items-center bg-white px-3 py-1 rounded-full border border-gray-400"
            >
              <span className="mr-2 text-gray-700">{cond}</span>
              <button
                onClick={() => handleDeleteCondition(cond)}
                className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>

        {/* Search and Dropdown */}
        <div className="relative mb-4">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search medical conditions..."
            className="w-full p-3 rounded-md bg-white text-gray-700 border-2 border-gray-400 focus:outline-none focus:border-[#2092fa]"
          />
          {filterText && (
            <>
              {filteredDiseases.length > 0 ? (
                <ul className="absolute z-10 w-full bg-white rounded-md mt-1 max-h-48 overflow-y-auto border border-gray-400">
                  {filteredDiseases.map((disease) => (
                    <li
                      key={disease._id}
                      onClick={() => handleSelectDisease(disease.name)}
                      className="cursor-pointer p-2 hover:bg-gray-100 text-gray-700"
                    >
                      {disease.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="absolute z-10 w-full bg-white rounded-md mt-1 p-2 border border-gray-400 text-gray-700">
                  No data available
                </div>
              )}
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#2092fa] text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryModal;
