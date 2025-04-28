// frontend/src/services/diseaseService.ts

export interface Disease {
  _id: string;
  name: string;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const getDiseases = async (
  query: string = ""
): Promise<{ diseases: Disease[] }> => {
  // build URL with optional query param
  const url = new URL(`${API_BASE}/api/diseases`);
  if (query) {
    url.searchParams.append("q", query);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch diseases");
  }

  return (await res.json()) as { diseases: Disease[] };
};
