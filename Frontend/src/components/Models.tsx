import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, LucideKey as Kidney, Droplets, Settings as Lungs, Activity } from 'lucide-react';

const Models = () => {
  const models = [
    {
      title: 'Heart Disease',
      description: 'Predict heart disease risk using clinical parameters',
      icon: Heart,
      path: '/models/heart',
      color: 'from-red-500 to-pink-500',
    },
    {
      title: 'Stroke',
      description: 'Analyze stroke risk factors and prediction',
      icon: Brain,
      path: '/models/stroke',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Kidney Disease',
      description: 'Evaluate kidney function and disease risk',
      icon: Kidney,
      path: '/models/kidney',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Diabetes',
      description: 'Check diabetes risk based on health metrics',
      icon: Droplets,
      path: '/models/diabetes',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Pneumonia',
      description: 'Detect pneumonia from chest X-ray images',
      icon: Lungs,
      path: '/models/pneumonia',
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Liver Disease',
      description: 'Assess liver health and disease prediction',
      icon: Activity,
      path: '/models/liver',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div id="models" className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#f6f9fb]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Disease Prediction Models
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Advanced AI models for early disease detection and risk assessment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model) => (
          <Link
            key={model.title}
            to={model.path}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-75 group-hover:opacity-85 transition-opacity duration-300`} />
            <div className="relative p-8">
              <model.icon className="h-12 w-12 text-white mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {model.title}
              </h3>
              <p className="text-white/90">{model.description}</p>
              <div className="mt-4 inline-flex items-center text-white font-medium">
                Try Model
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Models;