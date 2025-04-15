import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";
import {
  validateEmail,
  validatePhone,
  validatePassword,
} from "../utils/validations";
import { useAuth } from "../context/AuthContext";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    emergencyContact: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validations.
    if (!formData.username) return setError("Username is required.");
    if (!validateEmail(formData.email))
      return setError("Invalid email format.");
    if (
      !validatePhone(formData.phone) ||
      !validatePhone(formData.emergencyContact)
    )
      return setError("Invalid phone or emergency contact number.");
    if (!validatePassword(formData.password, formData.confirmPassword))
      return setError("Passwords do not match or are too short.");

    try {
      setError("");
      setLoading(true);
      // Call backend signup API
      const data = await signup(formData);
      // Automatically log in the user by storing into global state.
      login(data.user);
      // Show loader/popup alert
      setLoading(false);
      window.alert("User profile created successfully!");
      // Route directly to Edit Profile page for further editing.
      navigate("/edit-profile/" + data.user._id);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-5"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {loading && (
          <p className="text-blue-400 text-center mb-4">
            Creating your profile... Please wait.
          </p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (10 digits)"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
        />
        <input
          type="tel"
          name="emergencyContact"
          placeholder="Primary Emergency Contact (10 digits)"
          value={formData.emergencyContact}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
          pattern="\d{10}"
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          {loading ? "Processing..." : "Register"}
        </button>

        <p
          className="text-sm text-blue-400 text-center mt-3 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
