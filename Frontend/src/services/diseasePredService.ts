// src/services/diseasePredService.ts
import { API_BASE_URL } from "../config";
export interface SavedPrediction {
  _id: string;
  user: string;
  diseaseType: string;
  probability: number;
  modelAccuracy: number;
  details: any[];
  recommendation: string;
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = `${API_BASE_URL}/diseasepred`;

export async function savePrediction(payload: {
  userId: string;
  diseaseType: string;
  probability: number;
  modelAccuracy: number;
  details: any[];
  recommendation: string;
}): Promise<SavedPrediction> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getPredictions(
  userId: string
): Promise<SavedPrediction[]> {
  const res = await fetch(`${BASE_URL}?userId=${userId}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deletePrediction(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
}
