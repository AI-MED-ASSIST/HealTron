// src/components/models/LiverModel.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";
import ResultDisplay from "../common/ResultDisplay";

import { API_BASE_URL } from "../../config";
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

const LiverModel: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "0",
    Total_Bilirubin: "",
    Direct_Bilirubin: "",
    Alkaline_Phosphotase: "",
    Alamine_Aminotransferase: "",
    Aspartate_Aminotransferase: "",
    Total_Protiens: "",
    Albumin: "",
    Albumin_and_Globulin_Ratio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<
    (PredictResponse & { diseaseType: string }) | null
  >(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const prompt = `You are a medical assistant. Evaluate liver disease risk. Input is JSON with patient metrics.
Output MUST be pure JSON with these keys:
  • probability (0–1),
  • modelAccuracy (0–1),
  • details (array of {metric,value,status,recommendedRange}),
  • recommendation (markdown).
Here is the input:
${JSON.stringify(formData)}`;

      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user!._id, message: prompt }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const raw = (data.response as string).match(/\{[\s\S]*\}/)?.[0];
      if (!raw) throw new Error("Invalid JSON response from AI");
      const parsed: PredictResponse = JSON.parse(raw);
      setResult({ ...parsed, diseaseType: "Liver Disease" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (result) return <ResultDisplay result={result} />;

  return (
    <div className="min-h-screen pb-12 flex justify-center bg-[#f6f9fb]">
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Liver Disease Prediction
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, val]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                {key
                  .replace(/_/g, " ")
                  .replace(/([A-Z])/g, " $1")
                  .trim()}
              </label>
              {key === "Gender" ? (
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-black"
                >
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                </select>
              ) : (
                <input
                  type="number"
                  name={key}
                  value={val}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-black"
                  required
                  min="0"
                  step="any"
                />
              )}
            </div>
          ))}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Predict
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiverModel;
