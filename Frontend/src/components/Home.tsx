import React from "react";
import { motion } from "framer-motion";
import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense } from "react";
import type { Points as PointsType } from "three";
import { useNavigate } from "react-router-dom";

const StarBackground = (props: PointsProps) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={new Float32Array(sphere)}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/symptom-checker");
  };

  return (
    <div
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundColor: "#f6f9fb",
        backgroundImage: `
          radial-gradient(
            circle at top center,
            rgba(0, 119, 255, 0.25) 0%,
            rgba(246, 249, 251, 1) 40%
          )
        `,
        backgroundSize: "150% 150%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      {/* Stars Animation Only */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <StarBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-20 px-4">
        {/* Quote Section */}
        <div className="text-5xl font-extrabold text-[#001233] leading-tight">
          Your health,
        </div>
        <div className="text-5xl font-extrabold text-[#001233] leading-tight">
          Redefined by AI.
        </div>

        {/* Statement Section */}
        <div className="text-xl text-[#4a4a4a] mt-4 max-w-3xl mx-auto px-4 text-center leading-relaxed">
          <p>
            Personalized AI Med Assist offers tailored health insights, helping
            you manage your wellness with ease and confidence. With the latest
            AI technology, we make health management simpler and more effective.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleGetStarted}
          className="bg-[#2092fa] text-white px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:bg-[] transition-all duration-300 mt-8"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
