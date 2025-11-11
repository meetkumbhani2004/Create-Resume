import React from "react";

const Template4 = ({
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

  const getInitials = (name) => {
    if (!name) return "AA";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
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
          {/* Diamond Initials */}
         <div
  className="relative w-16 h-16 flex items-center justify-center text-white text-xl font-bold mb-3"
  style={{
    backgroundColor: themeColor,
    transform: "rotate(45deg)",
    transformOrigin: "center center",
  }}
>
  <span
    className="absolute transform -rotate-45"
    style={{
      letterSpacing: "1px",
      transformOrigin: "center center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {(() => {
      const initials = getInitials(formData?.name);
      return initials.length === 2 ? (
        <>
          <span>{initials[0]}</span>
          <span>/</span>
          <span>{initials[1]}</span>
        </>
      ) : (
        <span>{initials}</span>
      );
    })()}
  </span>
</div>


          {/* Name & Contact */}
          <div className="flex flex-col items-center w-full">
            <h1
              className="text-2xl md:text-4xl  tracking-wide font-lato font-light"
              style={{ color: "#111" }}
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

      <hr className="border-gray-300 mb-6" />

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
          <section className="mb-6 flex flex-wrap items-start gap-3">
            <h2
              className="section-title text-lg font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed flex-1">
              {formData.summary}
            </p>
          </section>
          <hr className="border-gray-300 mb-6" />
        </>
      )}

      {/* Skills */}
      {formData?.skills?.filter(Boolean).length > 0 && (
        <>
          <section className="mb-6 flex flex-wrap items-start gap-3">
            <h2
              className="section-title text-lg font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Skills
            </h2>
           <div className="grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-4 text-gray-700 flex-1">
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
          <hr className="border-gray-300 mb-6" />
        </>
      )}

      {/* Experience */}
      {formData?.experience?.some(
        (e) =>
          e.jobTitle || e.employer || e.description || e.startYear || e.endYear
      ) && (
        <>
          <section className="mb-6 flex flex-wrap items-start gap-3">
            <h2
              className="section-title text-lg font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Experience
            </h2>
            <div className="flex-1">
              {formData.experience.map((exp, i) => {
                if (
                  !exp.jobTitle &&
                
                  !exp.startYear &&
                  !exp.endYear &&
                  !exp.description
                )
                  return null;

                return (
                  <div key={i} className="mb-4">
                    <div className="flex flex-wrap justify-between items-center">
                      <p className="font-medium text-gray-800">
                        {[exp.jobTitle]
                          .filter(Boolean)
                          .join(" | ")}
                      </p>
                      {(exp.startYear || exp.endYear) && (
                        <p className="text-sm text-gray-600">
                          {[formatDate(exp.startYear), formatDate(exp.endYear)]
                            .filter(Boolean)
                            .join(" – ")}
                        </p>
                      )}
                    </div>
                      {exp.employer && (
                      <p className="text-gray-700 mt-1 ml-1">
                        {exp.employer}
                      </p>
                    )}

                    {exp.description && (
                      <p className="text-gray-700 mt-1 ml-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
          <hr className="border-gray-300 mb-6" />
        </>
      )}

      {/* Education */}
      {formData?.education?.some(
        (edu) => edu.degree || edu.institute || edu.university || edu.date || edu.cgpa
      ) && (
        <>
          <section className="mb-6 flex flex-wrap items-start gap-3">
            <h2
              className="section-title text-lg font-semibold uppercase tracking-wide leading-tight"
              style={{ color: themeColor }}
            >
              Education <br /> & Training
            </h2>

            <div className="flex-1">
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
                  <div key={i} className="mb-4">
                    <div className="flex flex-wrap justify-between items-center">
                      <p className="font-medium text-gray-800">
                        {[edu.institute, edu.university]
                          .filter(Boolean)
                          .join(" | ")}
                      </p>
                      {edu.date && (
                        <p className="text-sm text-gray-600">
                          {formatDate(edu.date)}
                        </p>
                      )}
                    </div>
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
          <hr className="border-gray-300 mb-6" />
        </>
      )}

      {/* Hobbies */}
      {formData?.hobbies?.filter(Boolean).length > 0 && (
        <>
          <section className="mb-6 flex flex-wrap items-start gap-3">
            <h3
              className="section-title text-lg font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Hobbies
            </h3>
             <div className="grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-4 text-gray-700 flex-1">
        {formData.hobbies.filter(Boolean).map((h, i) => (
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
            <span>{h}</span>
          </div>
        ))}
      </div>
          </section>
          <hr className="border-gray-300 mb-6" />
        </>
      )}

      {/* Languages */}
      {formData?.languages?.filter(Boolean).length > 0 && (
        <>
          <section className="mb-6 flex flex-wrap items-start gap-3">
            <h3
              className="section-title text-lg font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Languages
            </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-4 text-gray-700 flex-1">
        {formData.languages.filter(Boolean).map((l, i) => (
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
            <span>{l}</span>
          </div>
        ))}
      </div>
          </section>
          <hr className="border-gray-300 mb-6" />
        </>
      )}

      {/* Awards */}
      {formData?.awards?.filter(Boolean).length > 0 && (
        <>
          <section className="mb-6 flex flex-wrap items-start gap-3">
            <h3
              className="section-title text-lg font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Awards
            </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-4 text-gray-700 flex-1">
        {formData.awards.filter(Boolean).map((a, i) => (
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
            <span>{a}</span>
          </div>
        ))}
      </div>
          </section>
          <hr className="border-gray-300 mb-6" />
        </>
      )}
    </div>
  );
};

export default Template4;
