import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchSymptoms } from "../services/symptomService";
import { predictDisease } from "../services/predictService";
import { addMedicalCondition } from "../services/userService";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const steps = ["User Details", "Select Symptoms", "Results"] as const;

const SymptomCheckerPage: React.FC = () => {
  const { user, login } = useAuth();
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

  const display = (val: any) =>
    val === null || val === undefined ? "null" : val;

  useEffect(() => {
    setLoading(true);
    fetchSymptoms()
      .then(setSymptoms)
      .catch(() => setError("Failed toload symptoms"))
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 p-4 md:p-6 flex flex-col items-center min-h-[200px]"
          >
            <h2 className="text-xl md:text-2xl font-bold text-blue-400 text-center mb-2">
              Your Profile
            </h2>
            <ul className="space-y-2 mt-2 text-center w-full">
              <li>
                <strong>Username:</strong>{" "}
                <span className="text-gray-700">{display(user?.username)}</span>
              </li>
              <li>
                <strong>Age:</strong>{" "}
                <span className="text-gray-700">{display(user?.age)}</span>
              </li>
              <li>
                <strong>Gender:</strong>{" "}
                <span className="text-gray-700">{display(user?.gender)}</span>
              </li>
              <li>
                <strong>Height:</strong>{" "}
                <span className="text-gray-700">
                  {display(user?.height)} cm
                </span>
              </li>
              <li>
                <strong>Weight:</strong>{" "}
                <span className="text-gray-700">
                  {display(user?.weight)} kg
                </span>
              </li>
              <li className="gap-2">
                <strong>Medical Conditions:</strong>{" "}
                <span className="text-gray-700">
                  {user?.medicalConditions === null
                    ? "null"
                    : user?.medicalConditions?.length
                    ? user.medicalConditions.join(", ")
                    : "None"}
                </span>
              </li>
            </ul>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            <h2 className="text-xl font-bold text-blue-400 mb-2 text-center">
              Choose Symptoms
            </h2>
            {loading ? (
              <div className="text-center py-10">
                <FaSpinner className="animate-spin text-4xl mx-auto text-blue-400" />
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Search symptoms..."
                  className="w-full p-2 rounded bg-gray-100 text-gray-700 mb-3 focus:border-[#2092fa] border border-gray-300 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[120px] overflow-y-auto mb-3">
                  {filtered.map((sym) => (
                    <button
                      key={sym}
                      onClick={() => handleSelect(sym)}
                      className={`px-2 py-1 rounded-full border text-sm ${
                        selected.includes(sym)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                      } focus:outline-none`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
                {selected.length > 0 && (
                  <div className="mt-3">
                    <h3 className="font-semibold text-blue-400 mb-1 text-sm">
                      Selected:
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {selected.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center bg-gray-100 px-2 py-0.5 rounded-full text-xs sm:text-sm text-gray-700 border border-gray-300"
                        >
                          {s}
                          <button
                            onClick={() => handleSelect(s)}
                            className="ml-1 text-gray-400 hover:text-gray-700 focus:outline-none text-xs"
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
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 p-4 md:p-6 flex flex-col items-center w-full max-w-full"
          >
            {loading ? (
              <div className="text-center py-10">
                <FaSpinner className="animate-spin text-4xl mx-auto text-blue-400" />
                <p className="mt-2 text-gray-700">Fetching prediction...</p>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : prediction ? (
              <>
                <div className="w-full max-w-3xl mx-auto">
                  <h2 className="text-2xl md:text-3xl text-center font-bold text-blue-600 mb-2">
                    Result
                  </h2>
                  <div className="flex items-center mb-2">
                    <p>
                      <strong className="text-md md:text-lg">Disease:</strong>{" "}
                      <span className="text-gray-900 text-md md:text-lg">
                        {prediction.disease}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3">
                    <strong className="text-md md:text-lg">Accuracy:</strong>
                    <div className="w-full sm:w-48">
                      <div className="w-full bg-gray-200 rounded-full h-4 flex items-center">
                        <div
                          className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                          style={{ width: `${prediction.accuracy * 100}%` }}
                        ></div>
                        <div className="text-xs text-gray-600 ml-2">
                          {Math.round(prediction.accuracy * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-3xl mx-auto">
                  <h3 className="font-semibold text-blue-400 mb-1">
                    Recommendation
                  </h3>
                  <div className="bg-gray-50 rounded-md p-4 text-gray-700 border border-gray-300 max-h-[180px] overflow-y-auto">
                    <ReactMarkdown>{prediction.recommendation}</ReactMarkdown>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleAddCondition}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add to Medical Conditions
                  </button>
                </div>
              </>
            ) : null}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen py-6 md:py-10 flex flex-col items-center "
      style={{
        backgroundColor: "#f6f9fb",
        backgroundImage: `
          radial-gradient(
            circle at bottom center,        /* Gradient from bottom */
            rgba(0, 119, 255, 0.25) 0%,
            rgba(246, 249, 251, 1) 40%
          )
        `,
        backgroundSize: "210% 190%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 100%" /* Start gradient from bottom */,
      }}
    >
      <div
        className={`mx-2 w-[calc(100%-1rem)] sm:mx-auto sm:w-[95%] rounded-lg shadow-2xl border border-[#2092fa] bg-gray-50 ${
          currentStep === 2 ? "md:max-w-[900px]" : "md:max-w-3xl"
        }`}
      >
        <div className="flex justify-center items-center mb-4 p-4">
          <div className="flex justify-between items-center w-full max-w-md gap-0">
            {steps.map((_, idx) => (
              <div key={idx} className="flex items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-sm sm:text-lg font-medium z-10 ${
                    idx === currentStep
                      ? "bg-[#2092fa] text-white"
                      : idx < currentStep
                      ? "bg-[#48bb78] text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 ${
                      idx < currentStep ? "bg-[#48bb78]" : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div>{renderStep()}</div>

        <div className="mt-2 flex flex-row justify-between p-4 md:p-6">
          <div className="flex items-center">
            {currentStep === 0 && (
              <div className="flex items-start sm:items-center mr-4">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="mr-2 mt-1 sm:mt-0 form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-700 rounded"
                />
                <label
                  htmlFor="agree"
                  className="select-none text-gray-700 text-sm sm:text-base leading-tight"
                >
                  I agree to the terms and conditions
                </label>
              </div>
            )}
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="w-20 sm:w-24 h-8 sm:h-10 flex items-center justify-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none text-xs sm:text-sm"
              >
                <FaChevronLeft /> Back
              </button>
            )}
          </div>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !agreed) ||
                (currentStep === 1 && selected.length === 0)
              }
              className="w-20 sm:w-24 h-8 sm:h-10 flex items-center justify-center gap-2 px-4 py-2 bg-[#2092fa] text-white rounded hover:bg-blue-500 disabled:opacity-50 focus:outline-none text-xs sm:text-sm"
            >
              Next <FaChevronRight />
            </button>
          ) : (
            <div className="flex flex-row gap-3">
              <button
                onClick={handleRestart}
                className="hidden md:block w-24 h-10 px-4 py-2 bg-[#6b46c1] text-white rounded hover:bg-[#553c9a] focus:outline-none text-sm"
              >
                Check
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-20 sm:w-24 h-8 sm:h-10 px-4 py-2 bg-[#2092fa] text-white rounded hover:bg-blue-500 focus:outline-none text-xs sm:text-sm"
              >
                Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;
