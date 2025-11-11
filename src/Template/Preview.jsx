import React, { useEffect } from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Step6Preview({
  formData,
  bgColor,
  themeColor,
  setStep,
}) {
  useEffect(() => {
    if (formData?.fromDashboard) {
      setStep(6);
    }
  }, [formData, setStep]);

    const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString; // fallback if invalid
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Template 3</h2>

      <div
        id="resume-preview"
        className="p-6 rounded-lg shadow-md"
        style={{ backgroundColor: bgColor, color: themeColor }}
      >

        <style>
    {`
      #resume-preview p,li,h1,h2,h3,h4,h5,h6 {
        margin-bottom: var(--paragraph-spacing, 10px);
      }
    `}
  </style>
        <div className="resume-header flex justify-between">
          <div>
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
            {formData.name && (
              <h1 className="text-2xl font-bold">{formData.name}</h1>
            )}
          </div>

          <div className="text-sm">
            {formData.email && (
              <p>
                <EmailIcon fontSize="small" /> {formData.email}
              </p>
            )}
            {formData.phone && (
              <p>
                <CallIcon fontSize="small" /> {formData.phone}
              </p>
            )}
            {formData.address && (
              <p>
                <LocationOnIcon fontSize="small" /> {formData.address}
              </p>
            )}
            {formData.linkedin && (
              <p>
                <LinkedInIcon fontSize="small" />{" "}
                <a href={formData.linkedin} target="_blank" rel="noreferrer">
                  {formData.linkedin}
                </a>
              </p>
            )}
            {formData.website && (
              <p>
                <PublicIcon fontSize="small" />{" "}
                <a href={formData.website} target="_blank" rel="noreferrer">
                  {formData.website}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        {formData.summary && (
          <>
            <h3 className="text-lg font-semibold mt-6 mb-1">Summary</h3>
            <p>{formData.summary}</p>
          </>
        )}

        {/* Skills */}
        {formData.skills?.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-6 mb-1">Skills</h3>
            <ul className="grid grid-cols-2 gap-1 list-disc pl-5">
              {formData.skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </>
        )}

        {/* Education */}
        {formData.education?.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-6 mb-1">Education</h3>
            {formData.education.map((e, i) => (
              <div key={i} className="mb-2">
                <strong>{e.institute}</strong>
{e.university ? ` (${e.university})` : ""}
<br />

                {e.city && `${e.city}${e.state ? ", " + e.state : ""}`}
                {e.cgpa && <div>CGPA: {e.cgpa} </div>}
              </div>
            ))}
          </>
        )}

        {/* Experience */}
        {formData.experience?.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-6 mb-1">Experience</h3>
            {formData.experience.map((ex, i) => (
              <div key={i} className="mb-2">
                <strong>{ex.jobTitle}</strong> at {ex.employer} (
                {formatDate(ex.startYear)}
                { ex.startYear && ex.endYear ? " – " : "" }
                {formatDate(ex.endYear)})
                <p>{ex.description}</p>
              </div>
            ))}
          </>
        )}

                {formData?.hobbies?.length > 0 && (
          <section className="mb-6">
            <h3
              className="text-lg font-semibold mt-6 mb-1"
              style={{ color: themeColor }}
            >
              Hobbies
            </h3>
            <ul className="grid grid-cols-2 gap-1 list-disc pl-5">
              {formData.hobbies.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {formData?.languages?.length > 0 && (
          <section className="mb-6">
            <h3
              className="text-lg font-semibold mt-6 mb-1"
              style={{ color: themeColor }}
            >
              Languages
            </h3>
            <ul className="grid grid-cols-2 gap-1 list-disc pl-5">
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
              className="text-lg font-semibold mt-6 mb-1"
              style={{ color: themeColor }}
            >
              Awards & Achievements
            </h3>
            <ul className="grid grid-cols-2 gap-1 list-disc pl-5">
              {formData.awards.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
