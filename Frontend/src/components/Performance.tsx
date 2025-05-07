import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { motion } from 'framer-motion';

const Performance = () => {
  const barChartContainerRef = useRef<HTMLDivElement>(null);
  const lineChartContainerRef = useRef<HTMLDivElement>(null);
  const [barChartDimensions, setBarChartDimensions] = useState({ width: 0, height: 0 });
  const [lineChartDimensions, setLineChartDimensions] = useState({ width: 0, height: 0 });

  const comparisonData = [
    { metric: 'Accuracy', Healtron: 95, Existing_Bots: 80 },
    { metric: 'Result Speed', Healtron: 95, Existing_Bots: 72 },
    { metric: 'Efficiency', Healtron: 98, Existing_Bots: 74 },
  ];

  const performanceData = [
    { name: '', high: 90, low: 38 },
    { name: '', high: 91, low: 30 },
    { name: '', high: 92, low: 35 },
    { name: '', high: 94, low: 28 },
    { name: '', high: 97, low: 27 },
    { name: '', high: 96, low: 32 },
    { name: '', high: 98, low: 31 },
  ];

  const colors = {
    healtron: '#2092fa',
    existing: '#6b7280',
    highPerformance: '#4CAF50',
    lowPerformance: '#F44336',
  };

  useEffect(() => {
    const handleResize = () => {
      if (barChartContainerRef.current) {
        setBarChartDimensions({
          width: barChartContainerRef.current.offsetWidth,
          height: barChartContainerRef.current.offsetHeight,
        });
      }
      if (lineChartContainerRef.current) {
        setLineChartDimensions({
          width: lineChartContainerRef.current.offsetWidth,
          height: lineChartContainerRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 xl:px-16">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Our Healtron & Models Performance
        </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-screen-xl mx-auto"
      >
        {/* Bar Chart */}
        <div className="w-full h-[350px] sm:h-[400px] md:h-[420px] lg:h-[460px] xl:h-[500px]" ref={barChartContainerRef}>
          <div className="bg-blue-100 border border-blue-500 rounded-xl shadow-xl h-full flex flex-col justify-center items-center p-4 sm:p-6">
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" />
                  <XAxis dataKey="metric" stroke="#001233" fontSize={14} />
                  <YAxis stroke="#001233" fontSize={14} unit="%" />
                  <Tooltip />
                  <Legend verticalAlign="bottom" align="center" />
                  <Bar dataKey="Healtron" name="Healtron" barSize={40} fill={colors.healtron} />
                  <Bar dataKey="Existing_Bots" name="Existing AI Bots" barSize={40} fill={colors.existing} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-gray-600 text-sm mt-2">Healtron vs. Existing Bots Performance</p>
          </div>
        </div>

        {/* Line Chart */}
        <div className="w-full h-[350px] sm:h-[400px] md:h-[420px] lg:h-[460px] xl:h-[500px]" ref={lineChartContainerRef}>
          <div className="bg-gray-50 border border-gray-600 rounded-xl shadow-xl h-full flex flex-col justify-center items-center p-4 sm:p-6">
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" />
                  <XAxis dataKey="name" stroke="#001233" fontSize={14} />
                  <YAxis domain={[0, 100]} stroke="#001233" fontSize={14} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend verticalAlign="bottom" align="center" />
                  <Line type="monotone" dataKey="high" stroke={colors.highPerformance} strokeWidth={3} name="High Performance" dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="low" stroke={colors.lowPerformance} strokeWidth={3} name="Low Performance" dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-gray-600 text-sm mt-2">Symptom Analyser Performance (High/Low)</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Performance;
