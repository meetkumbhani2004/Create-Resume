import React from "react";

const Template6 = ({
  formData,
  themeColor = "#1e3a8a",
  bgColor = "#ffffff",
  setStep,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  // Detect if background is white
  const isWhiteBg =
    bgColor?.toLowerCase() === "#ffffff" || bgColor?.toLowerCase() === "white";

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center md:text-2xl">
        Template 6
      </h2>

      <div
        id="resume-preview"
        className="mx-auto w-full max-w-3xl shadow-md text-[14px] md:text-[15px] leading-relaxed transition-all duration-300 bg-white rounded-lg overflow-hidden"
        style={{
          color: "#111",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* 🔹 Full-width Header Section */}
        <div
  className="w-full relative flex flex-col items-center justify-center text-center mb-6"
  style={{
    background: bgColor,
    margin: 0,
    padding: "2.5rem 1rem 1rem", // top padding more, bottom smaller
  }}
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
      className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full mb-4 shadow-md border-2 border-white"
    />
  )}

  {/* Name Centered */}
  <h1
    className="text-4xl md:text-4xl font-bold mb-10"
    style={{
      color: isWhiteBg ? themeColor : "#ffffff",
      lineHeight: "1.1",
    }}
  >
    {formData?.name || "Unnamed"}
  </h1>

  {/* Info Line — touching bottom edge */}
  <p
    className="text-sm md:text-base absolute bottom-2 w-full text-center px-4"
    style={{
      color: isWhiteBg ? "#1e3a8a" : "#f3f4f6",
    }}
  >
    {formData?.city || ""}
    {formData?.city && formData?.state ? " | " : ""}
    {formData?.state || ""}
    {formData?.state && (formData?.email || formData?.phone) ? " | " : ""}
    {formData?.email || ""}
    {formData?.email && formData?.phone ? " | " : ""}
    {formData?.phone || ""}
  </p>
</div>


        {/* Divider */}
        <hr className="border-gray-300 mb-6" />

        {/* Summary */}
        {formData?.summary && (
           
          <section className="mb-6 px-10">
            <h3
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: themeColor }}
            >
              Professional Summary
            </h3>
            <p className="text-gray-700">{formData.summary}</p>
          </section>
         
        )}

        {/* Skills */}
        {formData?.skills?.length > 0 && (
          <section className="mb-6 px-10">
            <h3
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: themeColor }}
            >
              Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-4 text-gray-700">
        {formData.skills.filter(Boolean).map((skill, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              style={{
                fontSize: "1rem",
                lineHeight: "1",
                color: "#000",
                marginTop: "2px",
              }}
            >
              •
            </span>
            <span>{skill}</span>
          </div>
        ))}
      </div>
          </section>
        )}

        {/* Education */}
        {formData?.education?.length > 0 && (
          <section className="mb-6 px-10">
            <h3
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: themeColor }}
            >
              Education
            </h3>
            {formData.education.map((edu, i) => (
              <div key={i} className="mb-3">
                {edu.institute && (
                  <p className="font-medium text-gray-800">{edu.institute}</p>
                )}
                {(edu.degree || edu.university) && (
                  <p className="text-sm text-gray-600">
                    {[edu.degree, edu.university].filter(Boolean).join(" — ")}
                  </p>
                )}
                {(edu.cgpa || edu.date) && (
                  <p className="text-sm text-gray-600">
                    {[edu.cgpa, formatDate(edu.date)]
                      .filter(Boolean)
                      .join(" — ")}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {formData?.experience?.length > 0 && (
          <section className="mb-6 px-10">
            <h3
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: themeColor }}
            >
              Experience
            </h3>
            {formData.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                {(exp.jobTitle || exp.employer) && (
                  <p className="font-medium text-gray-800">
                    {[exp.jobTitle, exp.employer]
                      .filter(Boolean)
                      .join(" at ")}
                  </p>
                )}
                {(exp.startYear || exp.endYear) && (
                  <p className="text-sm text-gray-600 mb-1">
                    {[formatDate(exp.startYear), formatDate(exp.endYear)]
                      .filter(Boolean)
                      .join(" – ")}
                  </p>
                )}
                {exp.description && (
                  <p className="text-gray-700">{exp.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Hobbies */}
        {formData?.hobbies?.length > 0 && (
          <section className="mb-6 px-10">
            <h3
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: themeColor }}
            >
              Hobbies
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700 list-disc pl-5 max-w-2xl mx-auto">
        {formData.hobbies.filter(Boolean).map((hobby, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              style={{
                fontSize: "1rem",
                lineHeight: "1",
                color: "#000",
                marginTop: "2px",
              }}
            > •
            </span>
            <span>{hobby}</span>
          </div>
        ))}
      </div>
          </section>
        )}

        {/* Languages */}
        {formData?.languages?.length > 0 && (
          <section className="mb-6 px-10">
            <h3
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: themeColor }}
            >
              Languages
            </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700 list-disc pl-5 max-w-2xl mx-auto">
        {formData.languages.filter(Boolean).map((lang, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              style={{
                fontSize: "1rem",
                lineHeight: "1",
                color: "#000",
                marginTop: "2px",
              }}
            >
              •
            </span>
            <span>{lang}</span>
          </div>
        ))}
      </div>
          </section>
        )}

        {/* Awards */}
        {formData?.awards?.length > 0 && (
          <section className="mb-6 px-10">
            <h3
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: themeColor }}
            >
              Awards & Achievements
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700 list-disc pl-5 max-w-2xl mx-auto">
        {formData.awards.filter(Boolean).map((award, i) => (
          <div key={i} className="flex items-center gap-2"> 
            <span
              style={{
                fontSize: "1rem",
                lineHeight: "1",
                color: "#000",
                marginTop: "2px",
              }}
            >
              •
            </span>
            <span>{award}</span>
          </div>
        ))}
      </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Template6;
