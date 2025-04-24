// src/pages/SymptomCheckerPage.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchSymptoms } from "../services/symptomService";
import { predictDisease } from "../services/predictService";
import { addMedicalCondition } from "../services/userService";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const steps = ["User Details", "Select Symptoms", "Results"] as const;

const SymptomCheckerPage: React.FC = () => {
  const { user, login } = useAuth(); // assume AuthContext provides setUser
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [prediction, setPrediction] = useState<{
    disease: string;
    accuracy: number;
    recommendation: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load symptom list
  useEffect(() => {
    setLoading(true);
    fetchSymptoms()
      .then(setSymptoms)
      .catch(() => setError("Failed to load symptoms"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = symptoms.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (sym: string) => {
    setSelected((prev) =>
      prev.includes(sym) ? prev.filter((x) => x !== sym) : [...prev, sym]
    );
  };

  const handleNext = async () => {
    setError("");
    if (currentStep === 1) {
      setLoading(true);
      try {
        const { predictedDisease, accuracy, recommendation } =
          await predictDisease(user!._id, selected);
        setPrediction({ disease: predictedDisease, accuracy, recommendation });
        setCurrentStep(2);
      } catch {
        setError("Prediction failed");
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) setPrediction(null);
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const handleRestart = () => {
    setAgreed(false);
    setSelected([]);
    setPrediction(null);
    setSearchTerm("");
    setCurrentStep(0);
    setError("");
  };

  const handleAddCondition = async () => {
    if (!prediction) return;
    setLoading(true);
    try {
      const updatedConditions = await addMedicalCondition(
        user!._id,
        prediction.disease
      );
      // Update context so Nav/Profile shows new condition
      login({ ...user!, medicalConditions: updatedConditions });
      alert("Added to medical conditions!");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Profile</h2>
            <ul className="space-y-1">
              <li>
                <strong>Username:</strong> {user?.username}
              </li>
              <li>
                <strong>Age:</strong> {user?.age}
              </li>
              <li>
                <strong>Gender:</strong> {user?.gender}
              </li>
              <li>
                <strong>Height:</strong> {user?.height} cm
              </li>
              <li>
                <strong>Weight:</strong> {user?.weight} kg
              </li>
              <li>
                <strong>Medical Conditions:</strong>{" "}
                {user?.medicalConditions.length
                  ? user.medicalConditions.join(", ")
                  : "None"}
              </li>
            </ul>
            <div className="flex items-center mt-4">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="mr-2"
              />
              <label htmlFor="agree" className="select-none">
                I agree to the terms and conditions
              </label>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Choose Symptoms</h2>
            {loading ? (
              <div className="text-center py-10">
                <FaSpinner className="animate-spin text-4xl mx-auto" />
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 rounded bg-gray-800 text-white mb-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto mb-4">
                  {filtered.map((sym) => (
                    <button
                      key={sym}
                      onClick={() => handleSelect(sym)}
                      className={`px-3 py-1 rounded-full border ${
                        selected.includes(sym)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                      }`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
                {selected.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Selected:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selected.map((s) => (
                        <span
                          key={s}
                          className="flex items-center bg-gray-700 px-3 py-1 rounded-full"
                        >
                          {s}
                          <button
                            onClick={() => handleSelect(s)}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-10">
                <FaSpinner className="animate-spin text-4xl mx-auto" />
                <p className="mt-2">Fetching prediction...</p>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : prediction ? (
              <>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Result</h2>
                  <p>
                    <strong>Disease:</strong> {prediction.disease}
                  </p>
                  <p>
                    <strong>Accuracy:</strong>{" "}
                    {Math.round(prediction.accuracy * 100)}%
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Recommendation</h3>
                  <span>
                    <ReactMarkdown>{prediction.recommendation}</ReactMarkdown>
                  </span>
                </div>
                {/* ← New Add button below */}
                <button
                  onClick={handleAddCondition}
                  disabled={loading}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                >
                  {loading ? "Adding…" : "ADD to Medical Conditions"}
                </button>
              </>
            ) : null}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Stepper */}
        <div className="flex justify-between mb-8">
          {steps.map((_, idx) => (
            <div key={idx} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-medium ${
                  idx === currentStep
                    ? "bg-blue-500"
                    : idx < currentStep
                    ? "bg-green-500"
                    : "bg-gray-700"
                }`}
              >
                {idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    idx < currentStep ? "bg-green-500" : "bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              <FaChevronLeft /> Back
            </button>
          ) : (
            <div />
          )}
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !agreed) ||
                (currentStep === 1 && selected.length === 0)
              }
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-400 disabled:opacity-50"
            >
              Next <FaChevronRight />
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-400"
              >
                New Check
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Return Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;
