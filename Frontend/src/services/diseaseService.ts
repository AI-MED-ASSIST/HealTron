export const getDiseases = async (query: string = "") => {
  const url = query
    ? `http://localhost:5000/api/diseases?q=${encodeURIComponent(query)}`
    : "http://localhost:5000/api/diseases";
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch diseases");
  }
  return res.json(); // expects { diseases: [...] }
};
