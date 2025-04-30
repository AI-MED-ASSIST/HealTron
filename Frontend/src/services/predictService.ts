//frontend/src/services/predictService.ts
import { PY_API_BASE_URL } from "../config";
interface PredictResponse {
  predictedDisease: string;
  accuracy: number;
  recommendation: string;
}
export async function predictDisease(
  userId: string,
  symptoms: string[]
): Promise<PredictResponse> {
  const res = await fetch(`${PY_API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, symptoms }),
  });
  if (!res.ok) throw new Error("Prediction failed");
  return res.json();
}
