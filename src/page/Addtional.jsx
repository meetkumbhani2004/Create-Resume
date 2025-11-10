// src/page/Additional.jsx
import React, { useState } from "react";

export default function Step6Additional({ formData, setFormData, setStep }) {
  const [hobby, setHobby] = useState("");
  const [language, setLanguage] = useState("");
  const [award, setAward] = useState("");

  // Add item to list
  const addItem = (key, value) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), value.trim()],
    }));
    if (key === "hobbies") setHobby("");
    if (key === "languages") setLanguage("");
    if (key === "awards") setAward("");
  };

  // Delete item
  const deleteItem = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Additional Information
      </h2>

      {/* Hobbies Section */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Hobbies
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            placeholder="e.g. Reading, Traveling"
            className="flex-1 border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
          />
          <button
            onClick={() => addItem("hobbies", hobby)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {(formData.hobbies || []).map((h, i) => (
            <li
              key={i}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {h}
              <button
                onClick={() => deleteItem("hobbies", i)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Languages Section */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Languages
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="e.g. English, Hindi, Spanish"
            className="flex-1 border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
          />
          <button
            onClick={() => addItem("languages", language)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {(formData.languages || []).map((l, i) => (
            <li
              key={i}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {l}
              <button
                onClick={() => deleteItem("languages", i)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Awards Section */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Awards / Achievements
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={award}
            onChange={(e) => setAward(e.target.value)}
            placeholder="e.g. Employee of the Year, Hackathon Winner"
            className="flex-1 border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
          />
          <button
            onClick={() => addItem("awards", award)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {(formData.awards || []).map((a, i) => (
            <li
              key={i}
              className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {a}
              <button
                onClick={() => deleteItem("awards", i)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(5)}
          className="px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
        >
          ← Back
        </button>
        <button
          onClick={() => setStep(7)}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
