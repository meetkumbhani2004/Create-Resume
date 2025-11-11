import React from "react";

const Template1 = ({
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

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center md:text-2xl">
        Template 1
      </h2>

      <div
        id="resume-preview"
        className="
          mx-auto 
          w-full 
          max-w-3xl 
          p-6 md:p-10 
          bg-white 
          shadow-md 
          rounded-lg 
          border border-gray-200
          text-[14px] md:text-[15px] 
          leading-relaxed 
          transition-all 
          duration-300
        "
        style={{
          backgroundColor: bgColor,
          color: "#111",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center">
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


            <h1
              className="text-2xl md:text-3xl font-bold"
              style={{ color: themeColor }}
            >
              {formData?.name || "Unnamed"}
            </h1>

            <p className="text-sm md:text-base text-gray-600 mt-1">
              {formData?.email || ""}
              {formData?.email && formData?.phone ? " | " : ""}
              {formData?.phone || ""}
            </p>

            {(formData?.city || formData?.state) && (
              <p className="text-sm md:text-base text-gray-600">
                {[formData.city, formData.state].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
        </div>

        <hr className="border-gray-300 mb-6" />

        {/* Summary */}
        {formData?.summary && (
          <section className="mb-6">
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
          <section className="mb-6">
            <h3
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: themeColor }}
            >
              Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-y-1">
  {formData?.skills?.map((skill, index) => (
    <div key={index} className="flex items-center gap-2">
      <span
        style={{
          fontSize: "1rem",
          lineHeight: "1",
          color: "text-gray-700",
          marginTop: "2px",
        }}
      >
        •
      </span>
      <span className="text-gray-700">{skill}</span>
    </div>
  ))}
</div>

          </section>
        )}

        {/* Education */}
        {formData?.education?.length > 0 && (
          <section className="mb-6">
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
          <section className="mb-6">
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
          <section className="mb-6">
            <h3
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: themeColor }}
            >
              Hobbies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-4 text-gray-700">
  {formData?.hobbies?.filter(Boolean).map((hobby, i) => (
    <div key={i} className="flex items-center gap-2">
      <span
        style={{
          fontSize: "1rem",
          lineHeight: "1",
          color: "text-gray-700",
          marginTop: "2px",
        }}
      >
        •
      </span>
      <span className="text-gray-700">{hobby}</span>
    </div>
  ))}
</div>

          </section>
        )}

        {/* Languages */}
        {formData?.languages?.length > 0 && (
          <section className="mb-6">
            <h3
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: themeColor }}
            >
              Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-4 text-gray-700">
  {formData?.languages?.filter(Boolean).map((language, i) => (
    <div key={i} className="flex items-center gap-2"> 
      <span
        style={{
          fontSize: "1rem",
          lineHeight: "1",
          color: "text-gray-700",
          marginTop: "2px",
        }}
      >
        •
      </span>
      <span className="text-gray-700">{language}</span>
    </div>
  ))}
</div>
          </section>
        )}

        {/* Awards */}
        {formData?.awards?.length > 0 && (
          <section>
            <h3
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: themeColor }}
            >
              Awards & Achievements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-4 text-gray-700">
  {formData?.awards?.filter(Boolean).map((award, i) => (
    <div key={i} className="flex items-center gap-2">
      <span
        style={{
          fontSize: "1rem",
          lineHeight: "1",
          color: "text-gray-700",
          marginTop: "2px",
        }}
      >
        •
      </span>
      <span className="text-gray-700">{award}</span>
    </div>
  ))}
</div>
          </section>
        )}
      </div>
    </>
  );
};

export default Template1;
