// src/components/steps/Step2Experience.jsx
import React from "react";

export default function Step2Experience({
  expInput,
  setExpInput,
  formData,
  setFormData,
  addExperience,
  editExperience,
  deleteExperience,
  generateAIExperience,
  loadingAI,
  setStep,
}) {
  const handleNext = () => {
    if (
      expInput.jobTitle ||
      expInput.employer ||
      expInput.city ||
      expInput.state ||
      expInput.startYear ||
      expInput.endYear ||
      expInput.description
    ) {
      const isDuplicate = formData.experience.some(
        (ex) =>
          ex.jobTitle === expInput.jobTitle &&
          ex.employer === expInput.employer &&
          ex.startYear === expInput.startYear
      );
      if (!isDuplicate) {
        setFormData({
          ...formData,
          experience: [...formData.experience, expInput],
        });
      }
    }
    setStep(3);
  };

  const handleCurrentToggle = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setExpInput({ ...expInput, endYear: "Present" });
    } else {
      setExpInput({ ...expInput, endYear: "" });
    }
  };

  return (
    <div className="step">
      <h2>Experience</h2>

      {/* ✅ Add Experience Button */}
      <button
        onClick={addExperience}
        className="buttons1 step4btn"
        style={{ marginBottom: "1rem" }}
      >
        + Add Another Experience
      </button>

      <div className="form-fields">
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            value={expInput.jobTitle}
            onChange={(e) =>
              setExpInput({ ...expInput, jobTitle: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Employer</label>
          <input
            type="text"
            value={expInput.employer}
            onChange={(e) =>
              setExpInput({ ...expInput, employer: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            value={expInput.city}
            onChange={(e) =>
              setExpInput({ ...expInput, city: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            value={expInput.state}
            onChange={(e) =>
              setExpInput({ ...expInput, state: e.target.value })
            }
          />
        </div>

        {/* ✅ Start Date (Date Picker) */}
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="month"
            value={expInput.startYear}
            onChange={(e) =>
              setExpInput({ ...expInput, startYear: e.target.value })
            }
          />
        </div>

        {/* ✅ End Date + "Current" checkbox */}
        <div className="form-group">
          <label>End Date</label>
          <input
            type="month"
            value={expInput.endYear === "Present" ? "" : expInput.endYear}
            onChange={(e) =>
              setExpInput({ ...expInput, endYear: e.target.value })
            }
            disabled={expInput.endYear === "Present"}
          />
          <label style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <input
              type="checkbox"
              checked={expInput.endYear === "Present"}
              onChange={handleCurrentToggle}
            />
            Currently Working Here
          </label>
        </div>

        <div className="form-group" style={{ gridColumn: "1 / -1" }}>
          <label>Description</label>
          <textarea
            value={expInput.description}
            onChange={(e) =>
              setExpInput({ ...expInput, description: e.target.value })
            }
          />
          <button onClick={generateAIExperience} disabled={loadingAI}>
            {loadingAI ? "Generating..." : "✨ Use AI to Auto Write"}
          </button>
        </div>
      </div>

      {/* ✅ Experience List */}
      <div className="experience-list">
        {formData.experience.map((ex, i) => (
          <div key={i} className="exp-card">
            <h4>
              {ex.jobTitle} at {ex.employer}
            </h4>
            <p>
              <b>Location:</b> {ex.city}, {ex.state}
            </p>
            <p>
              <b>Duration:</b> {ex.startYear} - {ex.endYear}
            </p>
            <p>{ex.description}</p>

            <div className="exp-actions">
              <button className="edit-btn" onClick={() => editExperience(i)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteExperience(i)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Navigation Buttons */}
      <div className="buttons">
        <button onClick={() => setStep(1)}>Back</button>
        <button onClick={handleNext}>Save & Next</button>
      </div>
    </div>
  );
}
