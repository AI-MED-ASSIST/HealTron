// frontend/src/modals/MedicalHistoryModal.tsx
import React, { useState } from "react";

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
  const [conditions, setConditions] = useState<string[]>(currentConditions);
  const [newCondition, setNewCondition] = useState("");

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      setConditions([...conditions, newCondition.trim()]);
      setNewCondition("");
    }
  };

  const handleSave = () => {
    onSave(conditions);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-2 z-50">
      <div className="bg-gray-800 p-6 rounded w-full max-w-md">
        <h2 className="text-xl mb-4 font-bold text-white">Medical History</h2>
        {conditions.length === 0 ? (
          <p className="text-gray-400 mb-4">No Medical History</p>
        ) : (
          <ul className="list-disc pl-6 mb-4 text-white">
            {conditions.map((cond, index) => (
              <li key={index}>{cond}</li>
            ))}
          </ul>
        )}
        <input
          type="text"
          value={newCondition}
          onChange={(e) => setNewCondition(e.target.value)}
          placeholder="Enter new condition"
          className="w-full p-3 border rounded bg-gray-700 text-white mb-4 focus:outline-none"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleAddCondition}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Add
          </button>
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
