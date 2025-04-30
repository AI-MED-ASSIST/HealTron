import { PY_API_BASE_URL } from "../config";

export async function fetchSymptoms(): Promise<string[]> {
  const res = await fetch(`${PY_API_BASE_URL}/symptoms`);
  if (!res.ok) throw new Error("Failed to load symptoms");
  const data = await res.json();
  return data.symptoms || [];
}
