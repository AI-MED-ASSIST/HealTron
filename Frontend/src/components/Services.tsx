import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Brain, FileText, HeartPulse, Activity, Users } from 'lucide-react';

const services = [
  {
    title: 'Disease Prediction',
    description: 'Advanced AI algorithms for accurate disease prediction and risk assessment',
    icon: HeartPulse,
  },
  {
    title: 'Medical Analysis',
    description: 'Comprehensive analysis of medical data and patient history',
    icon: Activity,
  },
  {
    title: 'Health Monitoring',
    description: 'Continuous monitoring of vital health parameters and indicators',
    icon: Stethoscope,
  },
  {
    title: 'AI Diagnostics',
    description: 'Cutting-edge artificial intelligence for medical diagnostics',
    icon: Brain,
  },
  {
    title: 'Medical Reports',
    description: 'Detailed medical reports and analysis documentation',
    icon: FileText,
  },
  {
    title: 'Patient Care',
    description: 'Personalized patient care and health recommendations',
    icon: Users,
  },
];

const Services = () => {
  return (
    <div id="services" className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[#f6f9fb]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive medical services powered by advanced artificial intelligence
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                <service.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;