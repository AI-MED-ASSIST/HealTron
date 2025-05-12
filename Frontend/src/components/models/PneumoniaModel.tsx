// src/components/models/PneumoniaModel.tsx
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

const PneumoniaModel: React.FC = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<
    (PredictResponse & { diseaseType: string }) | null
  >(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an X-ray image");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onloadend = async () => {
      setLoading(true);
      try {
        const payload = { image: reader.result as string };

        // Build a prompt that enforces details array
        const prompt =
          `You are a medical assistant. Detect pneumonia from a chest X-ray.\n
Input: JSON with one field, image (base64).\n
Output: A single valid JSON object with exactly these keys:\n` +
          `  • probability (0–1),\n` +
          `  • modelAccuracy (0.8–1),\n` +
          `  • details (array of objects with keys metric, value, status, recommendedRange),\n` +
          `  • recommendation (markdown string).\n` +
          `Ensure that \"details\" is always present. If there are no metrics, set \"details\" to an empty array [].\n\n` +
          `Here is the input:\n${JSON.stringify(payload)}`;

        const res = await fetch(`${API_BASE_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user!._id, message: prompt }),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error: ${text}`);
        }

        const data = await res.json();
        console.log("Raw LLM response:", data.response);

        // Extract full JSON including details
        const jsonMatch = data.response.match(
          /(\{[\s\S]*"details"\s*:\s*\[[\s\S]*\})/
        );
        if (!jsonMatch)
          throw new Error("Invalid or incomplete JSON response from AI");

        const parsed: PredictResponse = JSON.parse(jsonMatch[1]);
        // Validate details
        if (!parsed.details || !Array.isArray(parsed.details)) {
          throw new Error("Model returned invalid details format");
        }
        if (parsed.details.length === 0) {
          throw new Error(
            "Model returned empty details array. Please try again."
          );
        }

        setResult({ ...parsed, diseaseType: "Pneumonia Detection" });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  if (loading) return <Loader />;
  if (result) return <ResultDisplay result={result} />;

  return (
    <div className="min-h-screen pb-12 bg-[#f6f9fb]">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Pneumonia Detection
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Chest X-Ray Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
              required
            />
          </div>
          {previewUrl && (
            <div className="text-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-60 mx-auto my-4"
              />
            </div>
          )}
          <div className="flex justify-center">
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

export default PneumoniaModel;
