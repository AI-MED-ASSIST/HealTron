export async function fetchSymptoms(): Promise<string[]> {
  const res = await fetch("http://localhost:5001/api/symptoms");
  if (!res.ok) throw new Error("Failed to load symptoms");
  const data = await res.json();
  return data.symptoms || [];
}
