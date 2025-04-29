import { API_BASE_URL } from "../config";

export interface Detail {
  metric: string;
  value: number;
  status: "low" | "normal" | "high";
  recommendedRange: [number, number];
}

export interface PredictResponse {
  probability: number; // between 0 and 1
  details: Detail[];
  recommendation: string;
}

export async function predict(
  model: string,
  data: any
): Promise<PredictResponse> {
  const res = await fetch(`${API_BASE_URL}/predict/${model}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Server error: ${res.statusText}`);
  }
  return res.json();
}
