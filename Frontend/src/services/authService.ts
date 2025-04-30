// src/services/authService.ts
import { API_BASE_URL } from "../config";

export const login = async (usernameOrEmail: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usernameOrEmail, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login failed");
  }
  return await response.json(); // expects { user: { … } }
};

export const signup = async (signupData: any) => {
  // Use the signup endpoint; you may adjust as needed.
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signupData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Signup failed");
  }
  return await response.json(); // expects { user: { … } }
};
