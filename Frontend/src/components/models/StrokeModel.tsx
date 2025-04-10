import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StrokeModel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    avg_glucose_level: '',
    hypertension: '0',
    heart_disease: '0',
    gender: 'male',
    ever_married: 'yes',
    work_type: 'Private',
    residence_type: 'Urban',
    smoking_status: 'never smoked'
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Stroke Risk Prediction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key, idx) => (
            <div key={idx} className="flex flex-col">
              <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-1">
                {key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {['hypertension', 'heart_disease', 'gender', 'ever_married', 'work_type', 'residence_type', 'smoking_status'].includes(key) ? (
                <select
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-black focus:border-black focus:ring-black"
                >
                  {key === 'gender' && (<><option value="male">Male</option><option value="female">Female</option></>)}
                  {key === 'hypertension' || key === 'heart_disease' ? (<><option value="0">No</option><option value="1">Yes</option></>) : null}
                  {key === 'ever_married' && (<><option value="yes">Yes</option><option value="no">No</option></>)}
                  {key === 'work_type' && (
                    <>
                      <option value="Private">Private</option>
                      <option value="Self-employed">Self-employed</option>
                      <option value="Government Job">Government Job</option>
                      <option value="Children">Children</option>
                      <option value="Never worked">Never worked</option>
                    </>
                  )}
                  {key === 'residence_type' && (<><option value="Urban">Urban</option><option value="Rural">Rural</option></>)}
                  {key === 'smoking_status' && (
                    <>
                      <option value="never smoked">Never Smoked</option>
                      <option value="formerly smoked">Formerly Smoked</option>
                      <option value="smokes">Smokes</option>
                    </>
                  )}
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

export default StrokeModel;