// src/components/models/DiabetesModel.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";
import ResultDisplay from "../common/ResultDisplay";

interface Detail {
  metric: string;
  value: string | number;
  status: string;
  recommendedRange: string | [number, number];
}

interface PredictResponse {
  probability: number;
  modelAccuracy: number;
  details: Detail[];
  recommendation: string;
}

const DiabetesModel: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    numberOfTimesPregnant: "",
    glucoseLevel: "",
    bloodPressure: "",
    tricepsSkinFoldThickness: "",
    twoHourSerumInsulin: "",
    bodyMassIndex: "",
    diabetesPedigreeFunction: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<
    (PredictResponse & { diseaseType: string }) | null
  >(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Prompt now requests modelAccuracy after probability
      const prompt = `You are a medical assistant. Evaluate diabetes risk. Input is JSON with patient metrics.
Output MUST be pure JSON with these keys:
  • probability (0–1),
  • modelAccuracy (0–1),
  • details (array of {metric,value,status,recommendedRange}),
  • recommendation (markdown).
Here is the input:

${JSON.stringify(formData)}`;

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user!._id,
          message: prompt,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt);
      }

      const data = await res.json();
      const raw = (data.response as string).match(/\{[\s\S]*\}/)?.[0];
      if (!raw) throw new Error("Invalid JSON response from AI");
      const parsed: PredictResponse = JSON.parse(raw);

      setResult({
        ...parsed,
        diseaseType: "Diabetes",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (result) return <ResultDisplay result={result} />;

  return (
    <div className="min-h-screen pt-20 pb-12 flex justify-center bg-[#f6f9fb]">
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Diabetes Prediction
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, val]) => (
            <div key={key} className="flex flex-col">
              <label
                htmlFor={key}
                className="text-sm font-medium text-gray-700 mb-1"
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type="number"
                id={key}
                name={key}
                value={val}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-black focus:border-black focus:ring-black"
                required
                min="0"
                step="0.1"
              />
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Predict
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiabetesModel;
