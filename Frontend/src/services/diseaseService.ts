export interface Disease {
  _id: string;
  name: string;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const getDiseases = async (
  query: string = ""
): Promise<{ diseases: Disease[] }> => {
  const url = new URL(`${API_BASE}/api/diseases`);
  if (query) url.searchParams.append("q", query);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to fetch diseases");
  }
  return res.json() as Promise<{ diseases: Disease[] }>;
};
