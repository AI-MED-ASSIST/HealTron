import React, { useEffect, useState } from "react";
import {
  getPredictions,
  deletePrediction,
  SavedPrediction,
} from "../services/diseasePredService";
import { FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ConfirmModal from "../modals/ConfirmModal";

const PredictionHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<SavedPrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getPredictions(user._id)
      .then(setHistory)
      .catch((e) => alert("Failed to load history: " + e.message))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <p className="text-gray-500">Loading user…</p>
      </div>
    );
  }

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await deletePrediction(deleteId);
      setHistory((h) => h.filter((item) => item._id !== deleteId));
    } catch (e: any) {
      alert("Delete failed: " + e.message);
    } finally {
      setDeleteId(null);
      if (expandedId === deleteId) setExpandedId(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pt-20">
      <div className="mb-6 flex flex-col items-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          &larr; Back
        </button>
        <h1 className="text-3xl font-bold text-center">
          Disease Prediction History
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading history…</p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No previous records found!!
        </p>
      ) : (
        <div className="space-y-4">
          {history.map((h) => {
            const isExpanded = expandedId === h._id;
            return (
              <div
                key={h._id}
                className={`relative bg-white p-4 rounded-lg shadow flex flex-col ${
                  isExpanded ? "max-h-[600px]" : ""
                }`}
              >
                {/* Header */}
                <div
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleExpand(h._id)}
                >
                  <div className="flex items-center gap-2">
                    <strong className="text-lg">{h.diseaseType}</strong>
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(h.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Summary */}
                <div className="text-sm mb-4">
                  <span className="font-medium">Probability:</span>{" "}
                  {(h.probability * 100).toFixed(2)}%{" "}
                  <span className="font-medium ml-4">Accuracy:</span>{" "}
                  {(h.modelAccuracy * 100).toFixed(2)}%
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div
                    className="overflow-y-auto pr-2 pb-12"
                    style={{ maxHeight: "300px" }}
                  >
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Metrics Analysis</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {h.details.map((d, i) => (
                          <li key={i}>
                            <strong>{d.metric}</strong>: {d.value} ({d.status}),
                            Range{" "}
                            {Array.isArray(d.recommendedRange)
                              ? `${d.recommendedRange[0]}–${d.recommendedRange[1]}`
                              : d.recommendedRange}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Recommendation</h3>
                      <ReactMarkdown>{h.recommendation}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Delete Button */}
                <button
                  onClick={() => setDeleteId(h._id)}
                  className="absolute bottom-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Confirm Delete"
        message="Are you sure you want to delete this record?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default PredictionHistoryPage;
