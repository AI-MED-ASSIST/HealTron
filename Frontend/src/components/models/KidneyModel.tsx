import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KidneyModel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    blood_pressure: '',
    Specific_Gravity: '',
    Blood_Glucose_Random: '',
    Blood_Urea: '',
    Serum_Creatinine: '',
    Hemoglobin: '',
    Pus_Cell_Clumps: '0',
    Bacteria: '0',
    Hypertension: '0',
    Diabetes_Mellitus: '0',
    Coronary_Artery_Disease: '0',
    Appetite: '0',
    Pedal_Edema: '0',
    Anemia: '0'
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Kidney Disease Prediction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key, idx) => (
            <div key={idx} className="flex flex-col">
              <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-1">
                {key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {['Pus_Cell_Clumps', 'Bacteria', 'Hypertension', 'Diabetes_Mellitus', 'Coronary_Artery_Disease', 'Appetite', 'Pedal_Edema', 'Anemia'].includes(key) ? (
                <select
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-black focus:border-black focus:ring-black"
                >
                  {key === 'Pus_Cell_Clumps' || key === 'Bacteria' ? (
                    <><option value="0">Not Present</option><option value="1">Present</option></>
                  ) : null}
                  {key === 'Hypertension' || key === 'Diabetes_Mellitus' || key === 'Coronary_Artery_Disease' || key === 'Pedal_Edema' || key === 'Anemia' ? (
                    <><option value="0">No</option><option value="1">Yes</option></>
                  ) : null}
                  {key === 'Appetite' ? (
                    <><option value="0">Good</option><option value="1">Poor</option></>
                  ) : null}
                </select>
              ) : (
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
              )}
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

export default KidneyModel;