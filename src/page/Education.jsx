// src/components/steps/Step3Education.jsx
import React from "react";

export default function Step3Education({
  eduInput,
  setEduInput,
  formData,
  setFormData,
  addEducation,
  editEducation,
  deleteEducation,
  setStep,
}) {
  // ✅ Handle adding education and clearing fields
  // const handleAddEducation = () => {
  //   if (
  //     eduInput.institute ||
  //     eduInput.university ||
  //     eduInput.city ||
  //     eduInput.degree ||
  //     eduInput.date ||
  //     eduInput.cgpa
  //   ) {
  //     setFormData({
  //       ...formData,
  //       education: [...formData.education, eduInput],
  //     });
  //     setEduInput({
  //       institute: "",
  //       university: "",
  //       city: "",
  //       state: "",
  //       degree: "",
  //       date: "",
  //       cgpa: "",
  //     });
  //   }
  // };

  // ✅ Auto-save if user clicks Save & Next without adding
  const handleNext = () => {
    if (
      eduInput.institute ||
      eduInput.university ||
      eduInput.city ||
      eduInput.degree ||
      eduInput.date ||
      eduInput.cgpa
    ) {
      const isDuplicate = formData.education.some(
        (edu) =>
          edu.institute === eduInput.institute &&
          edu.university === eduInput.university &&
          edu.degree === eduInput.degree &&
          edu.cgpa === eduInput.cgpa &&
          edu.date === eduInput.date
      );
      if (!isDuplicate) {
        setFormData({
          ...formData,
          education: [...formData.education, eduInput],
        });
      }
    }
    setStep(4);
  };

  return (
    <div className="step">
      <h2>Education</h2>

      {/* ✅ Add Education button */}
      <button
        onClick={addEducation}
        className="step4btn buttons1"
        style={{ marginBottom: "1rem" }}
      >
        + Add Another Education
      </button>

      {/* ✅ Form Fields */}
      <div className="form-fields">
        {[
          "institute",
          "university",
          "city",
          "degree",
          "date", 
          "cgpa",
        ].map((field) => (
          <div key={field} className="form-group">
            <label>
              {field === "date"
                ? "Completion Date"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "date" ? "date" : "text"}
              value={eduInput[field] || ""}
              onChange={(e) =>
                setEduInput({ ...eduInput, [field]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      {/* ✅ Education list */}
      <div className="education-list">
        {formData.education.map((edu, i) => (
          <div key={i} className="edu-card">
            <h4>
              {edu.institute} ({edu.university})
            </h4>
            <p>
              <b>Location:</b> {edu.city}
            </p>
            <p>
              <b>Degree:</b> {edu.degree}
            </p>
            <p>
              <b>Completion Date:</b> {edu.date}
            </p>
            <p>
              <b>CGPA:</b> {edu.cgpa}
            </p>
            <div className="edu-actions">
              <button className="edit-btn" onClick={() => editEducation(i)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteEducation(i)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/*  Navigation buttons */}
      <div className="buttons">
        <button onClick={() => setStep(2)}>Back</button>
        <button onClick={handleNext}>Save & Next</button>
      </div>
    </div>
  );
}
