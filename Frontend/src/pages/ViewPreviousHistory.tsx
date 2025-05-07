import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/AuthContext";
import {
  fetchPredictionHistory,
  deletePrediction,
  Prediction,
} from "../services/predictHistoryService";
import { FaChevronDown, FaChevronUp, FaTrash, FaSpinner } from "react-icons/fa";
import ConfirmModal from "../modals/ConfirmModal";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const ViewPreviousHistory: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<Prediction[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);

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

  const toggle = (i: number) => {
    setExpanded((prevExpanded) => (prevExpanded === i ? null : i));
  };

  const handleDelete = async (idx: number) => {
    try {
      await deletePrediction(history[idx].id);
      setHistory((h) => h.filter((_, j) => j !== idx));
      setExpanded(null);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setConfirmIdx(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-10 px-4 md:px-8 lg:px-10">
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
            className="text-4xl mx-auto text-gray-700"
            style={{ animation: "spin 1s linear infinite" }}
          />
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm md:text-base">{error}</p>
      ) : history.length === 0 ? (
        <p className="text-gray-600 text-sm md:text-base">
          No previous checks found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((p, i) => {
            const truncated =
              p.recommendation.length > 100
                ? p.recommendation.slice(0, 100) + "…"
                : p.recommendation;

            return (
              <div
                key={i}
                className={cn(
                  "bg-white rounded-xl shadow-md border border-gray-400 overflow-hidden flex flex-col transition-all duration-300",
                  expanded === i ? "min-h-[300px]" : "h-[180px]"
                )}
              >
                <div className="p-4 flex-grow overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 text-left">
                      <p className="text-lg md:text-xl font-semibold text-gray-800">
                        {p.disease}
                      </p>
                      <p className="text-sm text-gray-500">
                        Accuracy: {Math.round(p.accuracy * 100)}%
                      </p>
                    </div>
                    <div className="flex flex-col items-end ml-4 space-y-2">
                      <p className="text-xs text-gray-600">
                        {new Date(p.timestamp).toLocaleString()}
                      </p>
                      <button
                        onClick={() => toggle(i)}
                        className="text-gray-700 hover:text-gray-900 focus:outline-none"
                      >
                        {expanded === i ? (
                          <FaChevronUp size={18} />
                        ) : (
                          <FaChevronDown size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 text-gray-700 prose max-w-none text-sm md:text-base">
                    {expanded === i ? (
                      <div className="overflow-y-auto max-h-[200px]">
                        <ReactMarkdown>{p.recommendation}</ReactMarkdown>
                      </div>
                    ) : (
                      <ReactMarkdown>{truncated}</ReactMarkdown>
                    )}
                  </div>
                </div>

                {expanded === i && (
                  <div className="px-4 pb-4 text-gray-600 text-xs flex justify-end">
                    Viewed on {new Date(p.timestamp).toLocaleString()}
                  </div>
                )}
                {/* Delete Button at the bottom right */}
                <div className="p-4 flex justify-end">
                  <button
                    onClick={() => setConfirmIdx(i)}
                    className="w-auto min-w-[80px] max-w-[100px] text-white bg-red-500 hover:bg-red-600 focus:outline-none border border-red-700 flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1 rounded"
                  >
                    DELETE
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewPreviousHistory;
