import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DiabetesModel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numberOfTimesPregnant: '',
    glucoseLevel: '',
    bloodPressure: '',
    tricepsSkinFoldThickness: '',
    twoHourSerumInsulin: '',
    bodyMassIndex: '',
    diabetesPedigreeFunction: '',
    age: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex justify-center bg-[#f6f9fb]">
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Diabetes Prediction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key, idx) => (
            <div key={idx} className="flex flex-col">
              <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="number"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-black focus:border-black focus:ring-black"
                required
                min="0"
                step="0.1"
              />
            </div>
          ))}
           <div className="flex justify-center mt-6 space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Predict
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiabetesModel;
