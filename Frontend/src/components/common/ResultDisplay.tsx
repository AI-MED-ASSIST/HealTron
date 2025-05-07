import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { PredictResponse } from "../../services/aiPredictService";
import { savePrediction } from "../../services/diseasePredService";
import { useAuth } from "../../context/AuthContext";
import ConfirmSaveModal from "../../modals/ConfirmSaveModal";

interface Props {
  result: PredictResponse & { diseaseType: string };
}

const ResultDisplay: React.FC<Props> = ({ result }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { diseaseType, probability, modelAccuracy, details, recommendation } =
    result;

  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Circle chart math
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offsetProb = circumference * (1 - probability);
  const offsetAcc = circumference * (1 - modelAccuracy);

  const doSave = async () => {
    setShowConfirmSave(false);
    try {
      await savePrediction({
        userId: user!._id,
        diseaseType,
        probability,
        modelAccuracy,
        details,
        recommendation,
      });
      alert("Prediction saved!");
    } catch (e: any) {
      if (e.message.includes("Already saved")) {
        setSaveError("This prediction has already been saved.");
      } else {
        setSaveError("Save failed: " + e.message);
      }
    }
  };

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-2">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        {diseaseType} Prediction Report
      </h2>

      {/* Circular Indicators */}
      <div className="flex justify-around mb-6">
        {/* Probability */}
        <div className="flex flex-col items-center">
          <svg width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#3b82f6"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offsetProb}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <text
              x="60"
              y="65"
              textAnchor="middle"
              fontSize="20"
              fill="#1f2937"
              fontWeight="bold"
            >
              {Math.round(probability * 100)}%
            </text>
          </svg>
          <div className="mt-2 font-medium">Probability</div>
        </div>

        {/* Model Accuracy */}
        <div className="flex flex-col items-center">
          <svg width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#10b981"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offsetAcc}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <text
              x="60"
              y="65"
              textAnchor="middle"
              fontSize="20"
              fill="#1f2937"
              fontWeight="bold"
            >
              {Math.round(modelAccuracy * 100)}%
            </text>
          </svg>
          <div className="mt-2 font-medium">Model Accuracy</div>
        </div>
      </div>

      {/* Metrics Analysis */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Metrics Analysis</h3>
        <ul className="list-disc list-inside space-y-1">
          {details.map((d, i) => (
            <li key={i}>
              <strong>{d.metric}</strong>: {d.value} ({d.status}), Range{" "}
              {Array.isArray(d.recommendedRange)
                ? `${d.recommendedRange[0]}–${d.recommendedRange[1]}`
                : d.recommendedRange}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendation */}
      <div>
        <h3 className="font-medium mb-2">Recommendation</h3>
        <ReactMarkdown>{recommendation}</ReactMarkdown>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            setSaveError(null);
            setShowConfirmSave(true);
          }}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Save
        </button>
      </div>

      {/* Save Error */}
      {saveError && (
        <p className="text-center text-red-500 mt-2">{saveError}</p>
      )}

      {/* Confirm Save Modal */}
      <ConfirmSaveModal
        isOpen={showConfirmSave}
        title="Confirm Save"
        message="Are you sure you want to save this prediction?"
        onConfirm={doSave}
        onCancel={() => setShowConfirmSave(false)}
      />
    </div>
  );
};

export default ResultDisplay;
