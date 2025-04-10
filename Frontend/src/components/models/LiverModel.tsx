import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LiverModel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '0',
    Total_Bilirubin: '',
    Direct_Bilirubin: '',
    Alkaline_Phosphotase: '',
    Alamine_Aminotransferase: '',
    Aspartate_Aminotransferase: '',
    Total_Protiens: '',
    Albumin: '',
    Albumin_and_Globulin_Ratio: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex justify-center bg-[#f6f9fb]">
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Liver Prediction</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="Age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            id="Age"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
          />
        </div>

        <div>
          <label htmlFor="Gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            id="Gender"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="Total_Bilirubin" className="block text-sm font-medium text-gray-700 mb-1">Total Bilirubin</label>
          <input
            type="number"
            id="Total_Bilirubin"
            name="Total_Bilirubin"
            value={formData.Total_Bilirubin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
            step="0.001"
          />
        </div>

        <div>
          <label htmlFor="Direct_Bilirubin" className="block text-sm font-medium text-gray-700 mb-1">Direct Bilirubin</label>
          <input
            type="number"
            id="Direct_Bilirubin"
            name="Direct_Bilirubin"
            value={formData.Direct_Bilirubin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
            step="0.001"
          />
        </div>

        <div>
          <label htmlFor="Alkaline_Phosphotase" className="block text-sm font-medium text-gray-700 mb-1">Alkaline Phosphotase</label>
          <input
            type="number"
            id="Alkaline_Phosphotase"
            name="Alkaline_Phosphotase"
            value={formData.Alkaline_Phosphotase}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
            step="0.001"
          />
        </div>

        <div>
          <label htmlFor="Alamine_Aminotransferase" className="block text-sm font-medium text-gray-700 mb-1">Alamine Aminotransferase</label>
          <input
            type="number"
            id="Alamine_Aminotransferase"
            name="Alamine_Aminotransferase"
            value={formData.Alamine_Aminotransferase}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="Aspartate_Aminotransferase" className="block text-sm font-medium text-gray-700 mb-1">Aspartate Aminotransferase</label>
          <input
            type="number"
            id="Aspartate_Aminotransferase"
            name="Aspartate_Aminotransferase"
            value={formData.Aspartate_Aminotransferase}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
            step="0.001"
          />
        </div>

        <div>
          <label htmlFor="Total_Protiens" className="block text-sm font-medium text-gray-700 mb-1">Total Proteins</label>
          <input
            type="number"
            id="Total_Protiens"
            name="Total_Protiens"
            value={formData.Total_Protiens}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
            step="0.001"
          />
        </div>

        <div>
          <label htmlFor="Albumin" className="block text-sm font-medium text-gray-700 mb-1">Albumin</label>
          <input
            type="number"
            id="Albumin"
            name="Albumin"
            value={formData.Albumin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
            step="0.001"
          />
        </div>

        <div>
          <label htmlFor="Albumin_and_Globulin_Ratio" className="block text-sm font-medium text-gray-700 mb-1">Albumin/Globulin Ratio</label>
          <input
            type="number"
            id="Albumin_and_Globulin_Ratio"
            name="Albumin_and_Globulin_Ratio"
            value={formData.Albumin_and_Globulin_Ratio}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
            step="0.001"
          />
        </div>
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

export default LiverModel;