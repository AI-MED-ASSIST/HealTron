import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, signup } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { motion, useAnimation, useInView } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "/public/Healtron.png"; // Make sure the path is correct
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "../utils/validations";

const LoginPage: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, login: authLogin } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Signup Form State
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    email: "",
    phone: "",
    emergencyContact: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
  }, [location.pathname]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const data = await login(usernameOrEmail, password);
      authLogin(data.user);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupFormData.username) return setError("Username is required.");
    if (!validateEmail(signupFormData.email))
      return setError("Invalid email format.");
    if (!validatePhone(signupFormData.phone))
      return setError("Invalid phone number.");
    if (!validatePhone(signupFormData.emergencyContact))
      return setError("Invalid emergency contact number.");
    if (
      !validatePassword(signupFormData.password, signupFormData.confirmPassword)
    )
      return setError("Passwords do not match or are too short.");

    setIsLoading(true);
    setError("");
    try {
      const data = await signup(signupFormData);
      authLogin(data.user);
      setIsLoading(false);
      window.alert("User profile created successfully!");
      navigate("/");
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Signup failed");
    }
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setError("");
  };

  const bubbleColors = [
    "rgba(255, 255, 255, 0.1)",
    "rgba(245, 245, 245, 0.15)",
  ];

  const createFloatingBubbles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 40 + 15;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const moveX = (Math.random() - 0.5) * 80;
      const moveY = (Math.random() - 0.5) * 80;
      const duration = Math.random() * 12 + 8;
      const delay = Math.random() * 4;
      const colorIndex = Math.floor(Math.random() * bubbleColors.length);
      const color = bubbleColors[colorIndex];
      const blur = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.3 + 0.1;

      return (
        <motion.div
          key={`float-bubble-${i}`}
          initial={{
            x: `${startX}vw`,
            y: `${startY}vh`,
            opacity: opacity,
          }}
          animate={{
            x: `${startX + moveX}vw`,
            y: `${startY + moveY}vh`,
            opacity: opacity + 0.1,
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: `${size}px`,
            height: `${size}px`,
            zIndex: 0,
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: color,
              filter: `blur(${blur}px)`,
              boxShadow: `0 0 5px rgba(255, 255, 255, 0.05)`,
            }}
          />
        </motion.div>
      );
    });
  };

  const floatingBubbles = useMemo(() => createFloatingBubbles(15), []);

  const backgroundVariants = {
    hidden: {
      backgroundPosition: "50% 100%",
      opacity: 0.7,
    },
    visible: {
      backgroundPosition: "50% 90%",
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0">
        {floatingBubbles}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-full w-full overflow-y-auto md:overflow-hidden">
        {/* Left Section (Constant for both forms) */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={backgroundVariants}
          className="min-h-screen md:h-full md:w-1/2 flex flex-col justify-center items-center text-center p-6 md:p-12"
          style={{
            backgroundColor: "#f6f9fb",
            backgroundImage:
              "radial-gradient(circle at bottom center, rgba(0, 119, 255, 0.25) 0%, rgba(246, 249, 251, 1) 40%)",
            backgroundSize: "210% 190%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            src={Logo}
            alt="AI Med-Assist Logo"
            className="mx-auto h-20 md:h-24 lg:h-36 mb-8"
          />
          <div className="text-xxl sm:text-4xl font-extrabold text-gray-800 flex-shrink-0 mb-6">
            Personalized<span className="text-[#2092fa]"> AI Med-Assist</span>
          </div>

          <p className="text-lg md:text-xl font-bold text-gray-500 mb-6">
            Your Personalized Health Companion
          </p>
          <p className="text-base md:text-xl text-gray-700 leading-relaxed max-w-md">
            Unlock a new era of healthcare with AI-powered insights and
            personalized assistance. Our platform helps you monitor your health,
            understand symptoms, and connect with the information you need to
            make informed decisions.
          </p>
        </motion.div>

        {/* Right Section (Login or Signup Form) */}
        <div className="min-h-screen md:h-full md:w-1/2 flex justify-center items-center p-6 md:p-12 bg-gray-50">
          <div className="w-full max-w-md">
            {isSignup ? (
              <>
                <div className="mb-6 text-center md:text-left">
                  <h2 className="text-3xl text-center font-extrabold text-gray-800 mb-4">
                    Sign Up
                  </h2>
                  <p className="text-lg text-gray-600 text-center">
                    Create your account.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-500 text-sm rounded-md border border-red-200">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="signup-username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      id="signup-username"
                      type="text"
                      name="username"
                      placeholder="Your Username"
                      value={signupFormData.username}
                      onChange={handleSignupChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2092fa]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="signup-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      name="email"
                      placeholder="123@example.com"
                      value={signupFormData.email}
                      onChange={handleSignupChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2092fa]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="signup-phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number (10 digits)
                      </label>
                      <input
                        id="signup-phone"
                        type="tel"
                        name="phone"
                        placeholder="Enter 10 digit phone number"
                        value={signupFormData.phone}
                        onChange={handleSignupChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2092fa]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="signup-emergency-contact"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Emergency Contact (10 digits)
                      </label>
                      <input
                        id="signup-emergency-contact"
                        type="tel"
                        name="emergencyContact"
                        placeholder="Enter 10 digit emergency number"
                        value={signupFormData.emergencyContact}
                        onChange={handleSignupChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2092fa]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="signup-password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password (min 6 characters)
                      </label>
                      <input
                        id="signup-password"
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={signupFormData.password}
                        onChange={handleSignupChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2092fa]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="signup-confirm-password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <input
                        id="signup-confirm-password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Your Password"
                        value={signupFormData.confirmPassword}
                        onChange={handleSignupChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2092fa]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-md bg-[#2092fa] hover:bg-blue-600 text-white font-semibold transition focus:outline-none ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Signing up..." : "Register"}
                  </button>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={toggleSignup}
                        className="font-semibold text-blue-500 hover:underline focus:outline-none"
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="mb-6 text-center md:text-left">
                  <h2 className="text-3xl text-center font-extrabold text-gray-800 mb-4">
                    Welcome back!
                  </h2>
                  <p className="text-lg text-gray-600 text-center">
                    log in to your account.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-500 text-sm rounded-md border border-red-200">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="text"
                      placeholder="123@example.com"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2092fa]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2092fa] pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <FiEyeOff size={20} />
                        ) : (
                          <FiEye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end text-sm">
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-blue-500 hover:underline focus:outline-none"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-md bg-[#2092fa] hover:bg-blue-600 text-white font-semibold transition focus:outline-none ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Signing in..." : "Login now"}
                  </button>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={toggleSignup}
                        className="font-semibold text-blue-500 hover:underline focus:outline-none"
                      >
                        Signup now
                      </button>
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
