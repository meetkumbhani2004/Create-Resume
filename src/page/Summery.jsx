import React from "react";

export default function Step5Summary({ formData, handleChange, generateAISummary, setStep }) {
  return (
    <div className="step">
      <h2>Summary</h2>
      <textarea
        name="summary"
        placeholder="Write your summary or generate using AI"
        value={formData.summary}
        onChange={handleChange}
        className="summary"
      />

      <button type="button" onClick={generateAISummary} className="step4btn mt-2">
        ✨ Generate with AI
      </button>

      <div className="buttons1">
        <button onClick={() => setStep(4)} className="step4btn">
          Back
        </button>
        <button onClick={() => setStep(6)} className="step4btn">
          Save & Next
        </button>
      </div>
    </div>
  );
}
