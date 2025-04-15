// src/services/authService.ts
export const login = async (usernameOrEmail: string, password: string) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
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
  const response = await fetch("http://localhost:5000/api/users", {
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

// export const signup = async (signupData: any) => {
//   const response = await fetch("http://localhost:5000/api/users", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(signupData),
//   });

//   let errorText = "Signup failed";
//   if (!response.ok) {
//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || errorText);
//     } else {
//       const errorBody = await response.text(); // fallback for HTML or plain text
//       console.error("Server returned non-JSON error:", errorBody);
//       throw new Error(errorText);
//     }
//   }

//   return await response.json();
// };
