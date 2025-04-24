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
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-black"
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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold text-[#f6f9fb]">
            PERSONALIZED AI-MED ASSIST
          </h1>
          <p className="text-xl text-[#f6f9fb]">
            Your Intelligent Healthcare Companion
          </p>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
          className="bg-[#f6f9fb] text-black font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-8"
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
