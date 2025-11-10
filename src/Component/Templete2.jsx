// src/components/Templates/Template2.jsx
import React from "react";

const Template2 = ({
  formData = {},
  themeColor = "#2563eb",
  bgColor = "#f9fafb",
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center">Template 2</h2>
      <div
        id="resume-preview"
        className="max-w-[900px] mx-auto my-8 rounded-lg overflow-hidden shadow-lg border"
        style={{
          backgroundColor: bgColor,
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      >
        <style>
          {`
            #resume-preview p,li,h1,h2,h3,h4,h5,h6 {
              margin-bottom: var(--paragraph-spacing, 10px);
            }
          `}
        </style>

        <div className="flex min-h-[1120px]">
          {/* Sidebar */}
          <div
            className="w-1/3 p-8 text-white flex flex-col"
            style={{ backgroundColor: themeColor }}
          >
            {/* Profile Image */}
                        {formData?.photo && (
  <img
    src={
      typeof formData.photo === "string"
        ? formData.photo
        : URL.createObjectURL(formData.photo)
    }
    alt="Profile"
    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full mb-3 shadow-sm"
  />
)}

            {/* Personal Info */}
            <h1 className="text-2xl font-bold mb-2">
              {formData?.name || "Your Name"}
            </h1>
            <p className="text-sm mb-1">{formData?.email}</p>
            <p className="text-sm mb-1">{formData?.phone}</p>
            <p className="text-sm mb-6">
              {formData?.city}, {formData?.state}
            </p>

            {/* Skills */}
            {formData?.skills?.length > 0 && (
              <div className="mt-2">
                <h3 className="text-lg font-semibold mb-2 border-b border-white pb-1">
                  Skills
                </h3>
                <ul className="space-y-1 text-sm pl-2">
                  {formData.skills.map((skill, i) => (
                    <li key={i}>• {skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ✅ Hobbies (only if added) */}
            {formData?.hobbies?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 border-b border-white pb-1">
                  Hobbies
                </h3>
                <ul className="space-y-1 text-sm pl-2">
                  {formData.hobbies.map((hobby, i) => (
                    <li key={i}>• {hobby}</li>
                  ))}
                </ul>
              </div>
            )}

            {formData?.languages?.length > 0 && (
          <section className="mb-6">
            <h3
              className="text-lg font-semibold mb-2 border-b border-white pb-1"
            
            >
              Languages
            </h3>
            <ul className="space-y-1 text-sm pl-2">
              {formData.languages.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Awards */}
        {formData?.awards?.length > 0 && (
          <section>
            <h3
              className="text-lg font-semibold mb-2 border-b border-white pb-1"
            >
              Awards & Achievements
            </h3>
            <ul className="space-y-1 text-sm pl-2">
              {formData.awards.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>
        )}
          </div>

          {/* Main Section */}
          <div className="w-2/3 p-8 flex flex-col justify-start space-y-8">
            {/* Summary */}
            {formData?.summary && (
              <section>
                <h3
                  className="text-xl font-semibold mb-3 pb-1 border-b-2"
                  style={{ borderColor: themeColor }}
                >
                  Professional Summary
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {formData.summary}
                </p>
              </section>
            )}

            {/* Education */}
            {formData?.education?.length > 0 && (
              <section>
                <h3
                  className="text-xl font-semibold mb-3 pb-1 border-b-2"
                  style={{ borderColor: themeColor }}
                >
                  Education
                </h3>
                <div className="space-y-3">
                  {formData.education.map((edu, i) => (
                    <div key={i}>
                      <p className="font-medium text-gray-800 text-base">
                        {edu.institute}
                      </p>
                      <p className="text-sm text-gray-600">
                        {edu.degree}
                        {edu.degree && edu.university ? " — " : ""}
                        {edu.university}
                      </p>
                      <p className="text-sm text-gray-600">
                        {edu.cgpa}
                        {edu.cgpa && formatDate(edu.date) ? " — " : ""}
                        {formatDate(edu.date)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experience */}
            {formData?.experience?.length > 0 && (
              <section>
                <h3
                  className="text-xl font-semibold mb-3 pb-1 border-b-2"
                  style={{ borderColor: themeColor }}
                >
                  Experience
                </h3>
                <div className="space-y-4">
                  {formData.experience.map((exp, i) => (
                    <div key={i}>
                      <p className="font-medium text-gray-800 text-base">
                        {exp.jobTitle}
                        {exp.jobTitle && exp.employer ? " at " : ""}
                        {exp.employer}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        {formatDate(exp.startYear)}
                        {formatDate(exp.startYear) &&
                        formatDate(exp.endYear)
                          ? " – "
                          : ""}
                        {formatDate(exp.endYear)}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Template2;
