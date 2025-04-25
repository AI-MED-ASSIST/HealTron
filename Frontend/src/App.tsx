// src/App.tsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Models from "./components/Models";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./components/Login";
import HeartModel from "./components/models/HeartModel";
import StrokeModel from "./components/models/StrokeModel";
import KidneyModel from "./components/models/KidneyModel";
import DiabetesModel from "./components/models/DiabetesModel";
import PneumoniaModel from "./components/models/PneumoniaModel";
import LiverModel from "./components/models/LiverModel";
import HomePage from "./pages/HomePage";
import Chatbot from "./components/Chatbot";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EditProfilePage from "./pages/EditProfilePage";
import Sidebar from "./components/sidebar";
import { AuthProvider } from "./context/AuthContext";
import MedicalConditionPage from "./pages/MedicalConditionPage";

import SymptomCheckerPage from "./pages/SymptomCheckerPage";
import ViewPreviousHistory from "./pages/ViewPreviousHistory";

// PrivateRoute: if not authenticated, redirect to /login
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  // Sidebar state – default false (not shown)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          <Routes>
            {/* Login Page */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <>
                    {/* Navbar: pass sidebar state and toggler */}
                    <Navbar
                      onProfileClick={() => setSidebarOpen(!sidebarOpen)}
                      sidebarOpen={sidebarOpen}
                    />
                    {/* Render sidebar only when toggled */}
                    {sidebarOpen && (
                      <Sidebar onClose={() => setSidebarOpen(false)} />
                    )}
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/models" element={<Models />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/models/heart" element={<HeartModel />} />
                      <Route path="/models/stroke" element={<StrokeModel />} />
                      <Route path="/models/kidney" element={<KidneyModel />} />
                      <Route
                        path="/models/diabetes"
                        element={<DiabetesModel />}
                      />
                      <Route
                        path="/models/pneumonia"
                        element={<PneumoniaModel />}
                      />
                      <Route path="/models/liver" element={<LiverModel />} />
                      <Route
                        path="/edit-profile/:id"
                        element={<EditProfilePage />}
                      />
                      <Route
                        path="/medical"
                        element={<MedicalConditionPage />}
                      />
                      <Route
                        path="/symptom-checker"
                        element={<SymptomCheckerPage />}
                      />
                      <Route
                        path="/history"
                        element={<ViewPreviousHistory />}
                      />
                    </Routes>
                    <Chatbot />
                    <Footer />
                  </>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
