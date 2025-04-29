// src/services/chatPredictService.ts

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
 * The unified response from Gemini: our AI must return exactly this JSON.
 */
export interface PredictResponse {
  probability: number; // 0…1
  details: Detail[];
  recommendation: string; // markdown OK
}

// Your deployed Gemini model name:
const GEMINI_MODEL = "models/chat-bison-001";

interface GeminiRequest {
  model: string;
  prompt: {
    messages: Array<{ author: "system" | "user"; content: string }>;
  };
}

interface GeminiResponse {
  candidates: Array<{ author: string; content: string }>;
  // …other fields omitted
}

async function callGemini(payload: GeminiRequest): Promise<GeminiResponse> {
  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Chat API error: ${txt}`);
  }
  return res.json();
}

async function parsePredict(
  modelName: string,
  data: any
): Promise<PredictResponse> {
  // 1) system prompt primes the behavior
  // 2) user prompt carries the JSON input
  const req: GeminiRequest = {
    model: GEMINI_MODEL,
    prompt: {
      messages: [
        {
          author: "system",
          content: `You are a medical assistant. Evaluate ${modelName} risk.  Input is JSON with patient metrics.  Output MUST be pure JSON with keys: probability (0–1), details (array of {metric,value,status,recommendedRange}), recommendation (markdown).`,
        },
        {
          author: "user",
          content: JSON.stringify(data),
        },
      ],
    },
  };

  const geminiRes = await callGemini(req);
  const raw = geminiRes.candidates[0].content.trim();

  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON from AI: ${raw}`);
  }
}

/** Diabetes */
export function predictDiabetes(
  data: Record<string, any>
): Promise<PredictResponse> {
  return parsePredict("diabetes", data);
}
/** Heart Disease */
export function predictHeartDisease(
  data: Record<string, any>
): Promise<PredictResponse> {
  return parsePredict("heart disease", data);
}
/** Kidney Disease */
export function predictKidneyDisease(
  data: Record<string, any>
): Promise<PredictResponse> {
  return parsePredict("kidney disease", data);
}
/** Liver Disease */
export function predictLiverDisease(
  data: Record<string, any>
): Promise<PredictResponse> {
  return parsePredict("liver disease", data);
}
/** Pneumonia (send {image: base64}) */
export function predictPneumonia(data: {
  image: string;
}): Promise<PredictResponse> {
  return parsePredict("pneumonia detection", data);
}
/** Stroke Risk */
export function predictStroke(
  data: Record<string, any>
): Promise<PredictResponse> {
  return parsePredict("stroke risk", data);
}
