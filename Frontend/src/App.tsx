import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import NavbarWithBack from "./components/NavbarWithBack";
import RoadMap from "./components/RoadMap"; // Import the new component

import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Models from "./components/Models";
import Contact from "./components/Contact";
import HeartModel from "./components/models/HeartModel";
import StrokeModel from "./components/models/StrokeModel";
import KidneyModel from "./components/models/KidneyModel";
import DiabetesModel from "./components/models/DiabetesModel";
import PneumoniaModel from "./components/models/PneumoniaModel";
import LiverModel from "./components/models/LiverModel";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EditProfilePage from "./pages/EditProfilePage";
import MedicalConditionPage from "./pages/MedicalConditionPage";
import SymptomCheckerPage from "./pages/SymptomCheckerPage";
import ViewPreviousHistory from "./pages/ViewPreviousHistory";
import PredictionHistoryPage from "./pages/PredictionHistoryPage";

import { AuthProvider } from "./context/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <AppContent setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </Router>
    </AuthProvider>
  );
}

function AppContent({
  setSidebarOpen,
  sidebarOpen,
}: {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
}) {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const isSpecialPageWithBack =
    location.pathname.startsWith("/edit-profile/") ||
    location.pathname === "/symptom-checker" ||
    location.pathname === "/history" ||
    location.pathname === "/medical" ||
    location.pathname === "/models/heart" ||
    location.pathname === "/models/stroke" ||
    location.pathname === "/models/kidney" ||
    location.pathname === "/models/diabetes" ||
    location.pathname === "/models/pneumonia" ||
    location.pathname === "/models/liver" ||
    location.pathname === "/disease-pred";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {!isAuthPage && !isSpecialPageWithBack && (
        <Navbar
          onProfileClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
      )}
      {location.pathname.startsWith("/edit-profile/") && (
        <NavbarWithBack title="Edit Profile" />
      )}
      {location.pathname === "/symptom-checker" && (
        <NavbarWithBack title="Symptom Checker" />
      )}
      {location.pathname === "/history" && (
        <NavbarWithBack title="Previous History" />
      )}
      {location.pathname === "/medical" && (
        <NavbarWithBack title="Medical Conditions" />
      )}

      {location.pathname === "/models/heart" && (
        <NavbarWithBack title="Heart" />
      )}

      {location.pathname === "/models/stroke" && (
        <NavbarWithBack title="Stroke" />
      )}

      {location.pathname === "/models/kidney" && (
        <NavbarWithBack title="Kidney" />
      )}

      {location.pathname === "/models/diabetes" && (
        <NavbarWithBack title="Diabetes" />
      )}

      {location.pathname === "/models/pneumonia" && (
        <NavbarWithBack title="Pneumonia" />
      )}

      {location.pathname === "/models/liver" && (
        <NavbarWithBack title="Liver" />
      )}
      {location.pathname === "/disease-pred" && (
        <NavbarWithBack title="Disease Prediction Page" />
      )}

      {/* Render sidebar only when toggled */}

      {sidebarOpen && !isAuthPage && !isSpecialPageWithBack && (
        <Sidebar onClose={() => setSidebarOpen(false)} />
      )}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Private Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/models" element={<Models />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/models/heart" element={<HeartModel />} />
                  <Route path="/models/stroke" element={<StrokeModel />} />
                  <Route path="/models/kidney" element={<KidneyModel />} />
                  <Route path="/models/diabetes" element={<DiabetesModel />} />
                  <Route
                    path="/models/pneumonia"
                    element={<PneumoniaModel />}
                  />
                  <Route path="/models/liver" element={<LiverModel />} />
                  <Route
                    path="/edit-profile/:id"
                    element={<EditProfilePage />}
                  />
                  <Route path="/medical" element={<MedicalConditionPage />} />
                  <Route
                    path="/symptom-checker"
                    element={<SymptomCheckerPage />}
                  />
                  <Route path="/history" element={<ViewPreviousHistory />} />
                  <Route
                    path="/disease-pred"
                    element={<PredictionHistoryPage />}
                  />
                  <Route path="/RoadMap" element={<RoadMap />} />
                </Routes>
              </>
            </PrivateRoute>
          }
        />
      </Routes>

      {!isAuthPage && !isSpecialPageWithBack && <Chatbot />}
      {!isAuthPage && !isSpecialPageWithBack && <Footer />}
    </div>
  );
}

export default App;

// // src/App.tsx
// import React, { useState } from "react";
// import {
//   HashRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import About from "./components/About";
// import Services from "./components/Services";
// import Models from "./components/Models";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";

// import HeartModel from "./components/models/HeartModel";
// import StrokeModel from "./components/models/StrokeModel";
// import KidneyModel from "./components/models/KidneyModel";
// import DiabetesModel from "./components/models/DiabetesModel";
// import PneumoniaModel from "./components/models/PneumoniaModel";
// import LiverModel from "./components/models/LiverModel";
// import HomePage from "./pages/HomePage";
// import Chatbot from "./components/Chatbot";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import EditProfilePage from "./pages/EditProfilePage";
// import Sidebar from "./components/sidebar";
// import { AuthProvider } from "./context/AuthContext";
// import MedicalConditionPage from "./pages/MedicalConditionPage";

// import SymptomCheckerPage from "./pages/SymptomCheckerPage";
// import ViewPreviousHistory from "./pages/ViewPreviousHistory";

// import PredictionHistoryPage from "./pages/PredictionHistoryPage";

// // PrivateRoute: if not authenticated, redirect to /login
// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
//   return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
// };

// function App() {
//   // Sidebar state – default false (not shown)
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
//           <Routes>
//             {/* Login Page */}
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignupPage />} />

//             {/* Protected Routes */}
//             <Route
//               path="/*"
//               element={
//                 <PrivateRoute>
//                   <>
//                     {/* Navbar: pass sidebar state and toggler */}
//                     <Navbar
//                       onProfileClick={() => setSidebarOpen(!sidebarOpen)}
//                       sidebarOpen={sidebarOpen}
//                     />
//                     {/* Render sidebar only when toggled */}
//                     {sidebarOpen && (
//                       <Sidebar onClose={() => setSidebarOpen(false)} />
//                     )}
//                     <Routes>
//                       <Route path="/" element={<HomePage />} />
//                       <Route path="/about" element={<About />} />
//                       <Route path="/services" element={<Services />} />
//                       <Route path="/models" element={<Models />} />
//                       <Route path="/contact" element={<Contact />} />
//                       <Route path="/models/heart" element={<HeartModel />} />
//                       <Route path="/models/stroke" element={<StrokeModel />} />
//                       <Route path="/models/kidney" element={<KidneyModel />} />
//                       <Route
//                         path="/models/diabetes"
//                         element={<DiabetesModel />}
//                       />
//                       <Route
//                         path="/models/pneumonia"
//                         element={<PneumoniaModel />}
//                       />
//                       <Route path="/models/liver" element={<LiverModel />} />
//                       <Route
//                         path="/edit-profile/:id"
//                         element={<EditProfilePage />}
//                       />
//                       <Route
//                         path="/medical"
//                         element={<MedicalConditionPage />}
//                       />
//                       <Route
//                         path="/symptom-checker"
//                         element={<SymptomCheckerPage />}
//                       />
//                       <Route
//                         path="/history"
//                         element={<ViewPreviousHistory />}
//                       />
//                       <Route
//                         path="/disease-pred"
//                         element={<PredictionHistoryPage />}
//                       />
//                     </Routes>
//                     <Chatbot />
//                     <Footer />
//                   </>
//                 </PrivateRoute>
//               }
//             />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
