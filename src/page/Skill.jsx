import React from "react";

export default function Step4Skills({
  skillInput,
  setSkillInput,
  addSkill,
  deleteSkill,
  getAISkills,
  aiSkills,
  loading,
  formData,
  setFormData,
  setStep,
}) {
  return (
    <div className="step1">
      <h2>Skills</h2>

      <div className="inline-input">
        <input
          type="text"
          placeholder="Add skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <button onClick={addSkill}>Add</button>
      </div>

      <div className="ai-skill-section">
        <button onClick={getAISkills} disabled={loading}>
          {loading ? "Suggesting..." : "✨ Suggest Skills with AI"}
        </button>

        {aiSkills.length > 0 && (
          <div className="ai-skill-list">
            <h4>Suggested Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {aiSkills.map((skill, index) => (
                <button
                  key={index}
                  className="ai-skill-chip"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      skills: [...formData.skills, skill],
                    })
                  }
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="skill-list">
        {formData.skills.map((s, i) => (
          <div key={i} className="skill-card">
            <span>{s}</span>
            <button onClick={() => deleteSkill(i)}>✕</button>
          </div>
        ))}
      </div>

      <div className="buttons1">
        <button onClick={() => setStep(3)} className="step4btn">
          Back
        </button>
        <button onClick={() => setStep(5)} className="step4btn">
          Save & Next
        </button>
      </div>
    </div>
  );
}
