import { PY_API_BASE_URL } from "../config";

export interface Prediction {
  disease: string;
  accuracy: number;
  recommendation: string;
  timestamp: string;
}

export async function fetchPredictionHistory(
  userId: string
): Promise<Prediction[]> {
  const res = await fetch(`${PY_API_BASE_URL}/predictions/${userId}`);
  if (!res.ok) throw new Error("Could not load prediction history");
  const data = await res.json();
  return data.predictions as Prediction[];
}

export async function deletePrediction(id: string): Promise<void> {
  const res = await fetch(`${PY_API_BASE_URL}/predictions/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete prediction");
  }
}
