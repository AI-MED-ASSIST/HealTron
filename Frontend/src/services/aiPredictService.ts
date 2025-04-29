// src/services/aiPredictService.ts

const BASE_URL = "http://localhost:5001/api/predict";

/**
 * A single metric evaluation.
 */
export interface Detail {
  metric: string;
  value: number;
  status: "low" | "normal" | "high";
  recommendedRange: [number, number];
}

/**
 * The unified response from every disease‐prediction endpoint.
 */
export interface PredictResponse {
  probability: number; // 0…1
  details: Detail[];
  recommendation: string; // markdown OK
}

/**
 * Internal helper to POST to /predict/{model}
 */
async function postPredict(model: string, data: any): Promise<PredictResponse> {
  const res = await fetch(`${BASE_URL}/${model}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Prediction failed: ${text}`);
  }
  return res.json();
}

/** Diabetes */
export function predictDiabetes(
  data: Record<string, any>
): Promise<PredictResponse> {
  return postPredict("diabetes", data);
}

/** Heart Disease */
export function predictHeartDisease(
  data: Record<string, any>
): Promise<PredictResponse> {
  return postPredict("heart", data);
}

/** Kidney Disease */
export function predictKidneyDisease(
  data: Record<string, any>
): Promise<PredictResponse> {
  return postPredict("kidney", data);
}

/** Liver Disease */
export function predictLiverDisease(
  data: Record<string, any>
): Promise<PredictResponse> {
  return postPredict("liver", data);
}

/** Pneumonia (expects `{ image: base64String }`) */
export function predictPneumonia(payload: {
  image: string;
}): Promise<PredictResponse> {
  return postPredict("pneumonia", payload);
}

/** Stroke Risk */
export function predictStroke(
  data: Record<string, any>
): Promise<PredictResponse> {
  return postPredict("stroke", data);
}
