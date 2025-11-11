import React from "react";

const Template5 = ({
  formData,
  themeColor = "#1e3a8a",
  bgColor = "#ffffff",
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };



  return (
    <div
      id="resume-preview"
      className="max-w-3xl mx-auto p-8 md:p-10  text-gray-800"
      style={{ backgroundColor: bgColor, fontFamily: "Inter, sans-serif" }}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-between items-center">



          {/* Name & Contact */}
          <div className="flex flex-col items-center w-full">
            <h1
              className="text-2xl md:text-4xl  tracking-wide font-lato font-light mb-2"
              style={{ color: themeColor }}
            >
              {formData?.name || "Full Name"}
            </h1>


            {(formData?.email || formData?.phone || formData?.city) && (
              <p className="text-sm md:text-base text-gray-600 mt-1">
                {[formData?.email, formData?.phone, formData?.city]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
            )}
          </div>
        </div>
      </div>



      {/* Common section wrapper class ensures alignment */}
      <style>
        {`
          .section-title {
            min-width: 130px;
            width: 130px;
          }
        `}
      </style>

      {/* Summary */}
{formData?.summary && (
  <>
    <section className="mb-6 flex flex-col">
      <div className="flex items-center justify-center mb-3">
        <div
          className="flex-1 h-px flex-grow border-t border-gray-300 mt-3"
        
        ></div>
        <h2
          className="mx-3 text-lg font-semibold uppercase tracking-wide text-center"
          style={{ color: themeColor }}
        >
          Summary
        </h2>
        <div
          className="flex-1 h-px flex-grow border-t border-gray-300 mt-3"
         
        ></div>
      </div>

      <p className="text-gray-700 leading-relaxed">{formData.summary}</p>
    </section>
  </>
)}


      {/* Skills */}
     {formData?.skills?.filter(Boolean).length > 0 && (
  <>
    <section className="mb-8">
      {/* Centered Heading with lines */}
      <div className="flex items-center mb-4 ">
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
        <h2
          className="px-4 text-lg font-semibold uppercase tracking-wide text-center"
          style={{ color: themeColor }}
        >
          Skills
        </h2>
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
      </div>

      {/* Two-column skills list */}
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
  </>
)}


      {/* Experience */}
{formData?.experience?.some(
  (e) =>
    e.jobTitle || e.employer || e.description || e.startYear || e.endYear
) && (
  <>
    <section className="mb-8">
      {/* Centered heading with lines */}
      <div className="flex items-center mb-6">
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
        <h2
          className="px-4 text-lg font-semibold uppercase tracking-wide text-center"
          style={{ color: themeColor }}
        >
          Experience
        </h2>
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
      </div>

      {/* Experience Items */}
      <div className="flex flex-col gap-5">
        {formData.experience.map((exp, i) => {
          if (
            !exp.jobTitle &&
            !exp.employer &&
            !exp.startYear &&
            !exp.endYear &&
            !exp.description
          )
            return null;

          return (
            <div key={i} className="text-center">
              {/* Title line */}
              <p className="font-medium text-gray-800">
                {[exp.jobTitle, exp.employer]
                  .filter(Boolean)
                  .join(" | ")}{" "}
                {(exp.startYear || exp.endYear) && (
                  <>
                    {" | "}
                    <span className="text-gray-600 text-sm">
                      {[formatDate(exp.startYear), formatDate(exp.endYear)]
                        .filter(Boolean)
                        .join(" – ")}
                    </span>
                  </>
                )}
              </p>

              {/* Description */}
              {exp.description && (
                <p className="text-gray-700 mt-2 text-sm leading-relaxed max-w-2xl mx-auto">
                  {exp.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  </>
)}


      {/* Education */}
      {formData?.education?.some(
  (edu) => edu.degree || edu.institute || edu.university || edu.date
) && (
  <>
    <section className="mb-8">
      {/* Centered heading with horizontal lines */}
      <div className="flex items-center mb-6">
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
        <h2
          className="px-4 text-lg font-semibold uppercase tracking-wide text-center leading-tight"
          style={{ color: themeColor }}
        >
          Education <br /> & Training
        </h2>
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
      </div>

      {/* Education items */}
      <div className="flex flex-col gap-5">
        {formData.education.map((edu, i) => {
          if (
            !edu.degree &&
            !edu.institute &&
            !edu.university &&
            !edu.date &&
            !edu.cgpa
          )
            return null;

          return (
            <div key={i} className="text-center">
              {/* Top line: institute | university | date */}
              <p className="font-medium text-gray-800">
                {[edu.institute, edu.university, formatDate(edu.date)]
                  .filter(Boolean)
                  .join(" | ")}
              </p>

              {/* Bottom line: degree and cgpa */}
              {(edu.degree || edu.cgpa) && (
                <p className="text-gray-700 mt-2 text-sm leading-relaxed max-w-2xl mx-auto">
                  {edu.degree}
                  {edu.degree && edu.cgpa && " — "}
                  {edu.cgpa && `CGPA: ${edu.cgpa}`}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  </>
)}


{/* Hobbies */}
{formData?.hobbies?.filter(Boolean).length > 0 && (
  <>
    <section className="mb-8">
      {/* Centered heading with lines */}
      <div className="flex items-center mb-6">
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
        <h3
          className="px-4 text-lg font-semibold uppercase tracking-wide text-center"
          style={{ color: themeColor }}
        >
          Hobbies
        </h3>
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
      </div>

      {/* 2-column list */}
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
  </>
)}

{/* Languages */}
{formData?.languages?.filter(Boolean).length > 0 && (
  <>
    <section className="mb-8">
      <div className="flex items-center mb-6">
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
        <h3
          className="px-4 text-lg font-semibold uppercase tracking-wide text-center"
          style={{ color: themeColor }}
        >
          Languages
        </h3>
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
      </div>

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
  </>
)}

{/* Awards */}
{formData?.awards?.filter(Boolean).length > 0 && (
  <>
    <section className="mb-8">
      <div className="flex items-center mb-6">
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
        <h3
          className="px-4 text-lg font-semibold uppercase tracking-wide text-center"
          style={{ color: themeColor }}
        >
          Awards
        </h3>
        <div className="flex-grow border-t border-gray-300 mt-3"></div>
      </div>

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
  </>
)}

    </div>
  );
};

export default Template5;
