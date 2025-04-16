// frontend/src/modals/MedicalHistoryModal.tsx
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

  // Filter the diseases based on filterText
  const filteredDiseases = allDiseases.filter((d) =>
    d.name.toLowerCase().includes(filterText.toLowerCase())
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
      <div className="bg-gray-800 p-6 rounded w-full max-w-md">
        <h2 className="text-xl mb-4 font-bold text-white">
          Add Medical Conditions
        </h2>
        {/* Display selected conditions as tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {conditions.map((cond, idx) => (
            <div
              key={idx}
              className="flex items-center bg-gray-700 px-3 py-1 rounded-full"
            >
              <span className="mr-2 text-white">{cond}</span>
              <button
                onClick={() => handleDeleteCondition(cond)}
                className="text-red-500"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
        {/* Search and Dropdown Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search medical conditions..."
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
          />
          {filterText && (
            <>
              {filteredDiseases.length > 0 ? (
                <ul className="absolute z-10 w-full bg-gray-700 rounded-md mt-1 max-h-48 overflow-y-auto border border-gray-600">
                  {filteredDiseases.map((disease) => (
                    <li
                      key={disease._id}
                      onClick={() => handleSelectDisease(disease.name)}
                      className="cursor-pointer p-2 hover:bg-gray-600 text-white"
                    >
                      {disease.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="absolute z-10 w-full bg-gray-700 rounded-md mt-1 p-2 border border-gray-600 text-white">
                  No data available
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryModal;

// import React, { useState } from "react";
// import { FaPlus, FaTimes } from "react-icons/fa";

// interface Props {
//   onClose: () => void;
//   currentConditions: string[];
//   onSave: (conditions: string[]) => void;
// }

// const MedicalHistoryModal: React.FC<Props> = ({
//   onClose,
//   currentConditions,
//   onSave,
// }) => {
//   const [inputCondition, setInputCondition] = useState("");

//   // Local copy of conditions that will be saved on close
//   const [conditions, setConditions] = useState<string[]>(currentConditions);

//   const handleAddCondition = () => {
//     if (inputCondition.trim() && !conditions.includes(inputCondition.trim())) {
//       setConditions([...conditions, inputCondition.trim()]);
//       setInputCondition("");
//     }
//   };

//   const handleDeleteCondition = (condition: string) => {
//     setConditions(conditions.filter((c) => c !== condition));
//   };

//   const handleSave = () => {
//     onSave(conditions);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-2 z-50">
//       <div className="bg-gray-800 p-6 rounded w-full max-w-md">
//         <h2 className="text-xl mb-4 font-bold text-white">
//           Add Medical Conditions
//         </h2>
//         <div className="flex items-center mb-4">
//           <input
//             type="text"
//             value={inputCondition}
//             onChange={(e) => setInputCondition(e.target.value)}
//             placeholder="Enter medical condition"
//             className="flex-1 p-3 rounded-md bg-gray-700 text-white focus:outline-none"
//           />
//           <button
//             onClick={handleAddCondition}
//             className="ml-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition"
//           >
//             <FaPlus />
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2 mb-4">
//           {conditions.map((cond, idx) => (
//             <div
//               key={idx}
//               className="flex items-center bg-gray-700 px-3 py-1 rounded-full"
//             >
//               <span className="mr-2 text-white">{cond}</span>
//               <button
//                 onClick={() => handleDeleteCondition(cond)}
//                 className="text-red-500"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicalHistoryModal;
