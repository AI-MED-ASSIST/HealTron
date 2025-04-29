import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const About = () => {
  // Graph Data
  const comparisonData = [
    { metric: "Accuracy", AI_Med_Assist: 95, Existing_Bots: 80 },
    { metric: "Result Speed", AI_Med_Assist: 95, Existing_Bots: 72 },
    { metric: "Efficiency", AI_Med_Assist: 98, Existing_Bots: 74 },
  ];

  const colors = {
    ai: "#2092fa", // Blue for AI-Med Assist
    existing: "#b8b8b8", // New gray for Existing Bots
    cursor: "rgba(255, 255, 255, 0.05)", // Glass-like light white color for cursor hover
  };

  return (
    <section
      className="relative py-12 text-[#001233]"
      style={{
        background: "linear-gradient(135deg, #e0f2ff, #f6fbff)",
      }}
    >
      {/* Title and Subtitle */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-5xl font-extrabold mb-4">
          About Personalized AI Med Assist
        </h1>
        <p className="text-xl text-[#4a4a4a] max-w-3xl mx-auto leading-relaxed">
          Revolutionizing Healthcare with the Power of Artificial Intelligence.
          <br />
          Personalized solutions for modern healthcare needs.
        </p>
      </div>

      {/* Main Content: Image + Text */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4">
        {/* Image Box */}
        <div className="relative w-[330px] h-[330px] flex justify-center items-center">
          <div
            className="relative z-10 w-72 h-72 bg-white border-4 border-gray-300 shadow-2xl rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)" }}
          >
            <img
              src="/H.svg"
              alt="About"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side Text */}
        <div className="max-w-xl text-center md:text-left flex-1">
          <h2 className="text-4xl font-bold mb-6 text-[#001233]">
            Why Choose Us?
          </h2>
          <p className="text-lg mb-4 leading-relaxed">
            Personalized AI Med Assist is a next-gen healthcare platform,
            designed to make your health journey smarter, faster, and safer.
          </p>
          <p className="text-lg mb-4 leading-relaxed">
            Empower yourself with AI-driven diagnostics, real-time health
            tracking, and accurate medical insights — all in one powerful
            platform built just for you.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-lg">
            <li>AI-powered healthcare insights</li>
            <li>Real-time health monitoring</li>
            <li>Custom medical reports</li>
            <li>Advanced diagnostics</li>
            <li>Private and secure data handling</li>
          </ul>
        </div>
      </div>

      {/* Graph Section */}
      <div className="max-w-5xl mx-auto mt-20 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold text-center text-[#001233] mb-8">
          AI Med Assist vs Existing AI Medical Bots
        </h3>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={comparisonData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="metric" stroke="#001233" fontSize={14} />
              <YAxis stroke="#001233" fontSize={14} unit="%" />
              <Tooltip />
              <Legend />
              <Bar dataKey="AI_Med_Assist" name="AI-Med Assist" barSize={40}>
                {comparisonData.map((_, index) => (
                  <Cell key={`cell-ai-${index}`} fill={colors.ai} />
                ))}
              </Bar>
              <Bar dataKey="Existing_Bots" name="Existing AI Bots" barSize={40}>
                {comparisonData.map((_, index) => (
                  <Cell key={`cell-existing-${index}`} fill={colors.existing} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-gray-600 text-center text-sm mt-6">
          Compared based on Accuracy, Result Speed, and Efficiency.
        </p>
      </div>
    </section>
  );
};

export default About;
