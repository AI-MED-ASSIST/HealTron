import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/AuthContext";
import {
  fetchPredictionHistory,
  deletePrediction,
  Prediction,
} from "../services/predictHistoryService";
import { FaSpinner, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import ConfirmModal from "../modals/ConfirmModal";
import { useNavigate } from "react-router-dom";

const ViewPreviousHistory: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<Prediction[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const preds = await fetchPredictionHistory(user!._id);
        setHistory(preds);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (user) load();
  }, [user]);

  const toggle = (i: number) => setExpanded(expanded === i ? null : i);

  const handleDelete = async (idx: number) => {
    try {
      await deletePrediction(history[idx].id);
      setHistory((h) => h.filter((_, j) => j !== idx));
      if (expanded === idx) setExpanded(null);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setConfirmIdx(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100 pt-20 px-6">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Previous Symptom Checks
      </h1>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmIdx !== null}
        message={`Delete prediction for "${
          confirmIdx !== null ? history[confirmIdx].disease : ""
        }"?`}
        onCancel={() => setConfirmIdx(null)}
        onConfirm={() => handleDelete(confirmIdx!)}
      />

      {loading ? (
        <div className="text-center py-20">
          <FaSpinner
            className="text-4xl mx-auto"
            style={{ animation: "spin 1s linear infinite" }}
          />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : history.length === 0 ? (
        <p>No previous checks found.</p>
      ) : (
        <div className="space-y-4">
          {history.map((p, i) => {
            const truncated =
              p.recommendation.length > 100
                ? p.recommendation.slice(0, 100) + "…"
                : p.recommendation;

            return (
              <div
                key={i}
                className="bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 text-left">
                      <p className="text-xl font-semibold">{p.disease}</p>
                      <p className="text-sm text-gray-400">
                        Accuracy: {Math.round(p.accuracy * 100)}%
                      </p>
                    </div>
                    <div className="flex flex-col items-end ml-4 space-y-2">
                      <p className="text-xs text-gray-500">
                        {new Date(p.timestamp).toLocaleString()}
                      </p>
                      <button
                        onClick={() => toggle(i)}
                        className="text-gray-300 hover:text-white focus:outline-none"
                      >
                        {expanded === i ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      <button
                        onClick={() => setConfirmIdx(i)}
                        className="text-red-500 hover:text-red-400 focus:outline-none"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 text-gray-300 prose prose-invert max-w-none">
                    {expanded === i ? (
                      <ReactMarkdown>{p.recommendation}</ReactMarkdown>
                    ) : (
                      <ReactMarkdown>{truncated}</ReactMarkdown>
                    )}
                  </div>
                </div>

                {expanded === i && (
                  <div className="px-4 pb-4 text-gray-400 text-xs flex justify-end">
                    Viewed on {new Date(p.timestamp).toLocaleString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewPreviousHistory;
