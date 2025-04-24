// src/services/userService.ts
export const getProfile = async (userId: string) => {
  const response = await fetch(`http://localhost:5000/api/users/${userId}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Get profile failed");
  }
  return await response.json(); // expects { user: { … } }
};

export const updateProfile = async (userId: string, updateData: any) => {
  const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Profile update failed");
  }
  return await response.json(); // expects { user: { … } }
};

// src/services/userService.ts
export async function addMedicalCondition(
  userId: string,
  condition: string
): Promise<string[]> {
  const res = await fetch(
    `http://localhost:5000/api/users/${userId}/medical-conditions`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ condition }),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to add medical condition");
  }
  const data = await res.json();
  return data.medicalConditions as string[];
}
