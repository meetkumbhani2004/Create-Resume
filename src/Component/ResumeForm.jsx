// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Step1Contact from "../page/FormHeading";
// import Step2Experience from "../page/Experience";
// import Step3Education from "../page/Education";
// import Step4Skills from "../page/Skill";
// import Step5Summary from "../page/Summery";
// import TemplateSelector from "./Templateselecter";
// import "./ResumeForm.css";
// import { keyframes } from "@emotion/react";

// const ResumeForm = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [bgColor, setBgColor] = useState("#ffffff");
//   const [themeColor, setThemeColor] = useState("#3498db");
//   const [savedResumes, setSavedResumes] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     linkedin: "",
//     website: "",
//     summary: "",
//     skills: [],
//     education: [],
//     experience: [],
//     photo: null,
//   });

//   const [skillInput, setSkillInput] = useState("");
//   const [aiSkills, setAiSkills] = useState([]);
//   const [eduInput, setEduInput] = useState({
//     institute: "",
//     university: "",
//     city: "",
//     state: "",
//     degree: "",
//     specialization: "",
//     cgpa: "",
//     editIndex: undefined,
//   });
//   const [expInput, setExpInput] = useState({
//     jobTitle: "",
//     employer: "",
//     city: "",
//     state: "",
//     startYear: "",
//     endYear: "",
//     description: "",
//     editIndex: undefined,
//   });

//   const [loadingAI, setLoadingAI] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     document.documentElement.style.setProperty("--theme-color", themeColor);
//   }, [themeColor]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const handlePhoto = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData((p) => ({ ...p, photo: file }));
//     }
//   };

//   // Add skill
//   const addSkill = () => {
//     if (!skillInput.trim()) return;
//     setFormData((p) => ({ ...p, skills: [...p.skills, skillInput.trim()] }));
//     setSkillInput("");
//   };

//   const deleteSkill = (index) => {
//     setFormData((p) => ({ ...p, skills: p.skills.filter((_, i) => i !== index) }));
//   };

//   // GET AI SKILLS (aligned with backend)
//   const getAISkills = async () => {
//     setLoading(true);
//     try {
//       // prefer current expInput jobTitle, else use first saved experience, else use name
//       const jobTitle =
//         expInput.jobTitle ||
//         formData.experience?.[0]?.jobTitle ||
//         formData.name ||
//         "Professional";
//       const employer = expInput.employer || formData.experience?.[0]?.employer || "";
//       const res = await axios.post("http://localhost:5000/api/ai/generate-skills", {
//         jobTitle,
//         employer,
//       });
//       setAiSkills(res.data.skills || []);
//     } catch (err) {
//       console.error("Error fetching AI skills:", err);
//       alert("AI skills generation failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add/Edit education
//   const addEducation = () => {
//     if (!eduInput.institute || !eduInput.university) {
//       alert("Please enter institute and university.");
//       return;
//     }

//     if (eduInput.editIndex !== undefined && eduInput.editIndex !== null) {
//       const updated = [...formData.education];
//       updated[eduInput.editIndex] = {
//         institute: eduInput.institute,
//         university: eduInput.university,
//         city: eduInput.city,
//         state: eduInput.state,
//         degree: eduInput.degree,
//         specialization: eduInput.specialization,
//         cgpa: eduInput.cgpa,
//       };
//       setFormData((p) => ({ ...p, education: updated }));
//     } else {
//       setFormData((p) => ({
//         ...p,
//         education: [...p.education, {
//           institute: eduInput.institute,
//           university: eduInput.university,
//           city: eduInput.city,
//           state: eduInput.state,
//           degree: eduInput.degree,
//           specialization: eduInput.specialization,
//           cgpa: eduInput.cgpa,
//         }],
//       }));
//     }
//     setEduInput({ institute: "", university: "", city: "", state: "", degree: "", specialization: "", cgpa: "", editIndex: undefined });
//   };

//   const editEducation = (index) => {
//     setEduInput({ ...formData.education[index], editIndex: index });
//   };

//   const deleteEducation = (index) => {
//     setFormData((p) => ({ ...p, education: p.education.filter((_, i) => i !== index) }));
//   };

//   // Add/Edit experience
//   const addExperience = () => {
//     if (!expInput.jobTitle || !expInput.employer) {
//       alert("Please enter job title and employer.");
//       return;
//     }

//     const newExp = {
//       jobTitle: expInput.jobTitle,
//       employer: expInput.employer,
//       city: expInput.city,
//       state: expInput.state,
//       startYear: expInput.startYear,
//       endYear: expInput.endYear,
//       description: expInput.description,
//     };

//     if (expInput.editIndex !== undefined && expInput.editIndex !== null) {
//       const updated = [...formData.experience];
//       updated[expInput.editIndex] = newExp;
//       setFormData((p) => ({ ...p, experience: updated }));
//     } else {
//       setFormData((p) => ({ ...p, experience: [...p.experience, newExp] }));
//     }

//     setExpInput({ jobTitle: "", employer: "", city: "", state: "", startYear: "", endYear: "", description: "", editIndex: undefined });
//   };

//   const editExperience = (index) => {
//     setExpInput({ ...formData.experience[index], editIndex: index });
//   };

//   const deleteExperience = (index) => {
//     setFormData((p) => ({ ...p, experience: p.experience.filter((_, i) => i !== index) }));
//   };

//   // Generate AI description for experience (calls backend)
//   const generateAIExperience = async () => {
//     if (!expInput.jobTitle || !expInput.employer) {
//       alert("Please enter Job Title and Employer first!");
//       return;
//     }
//     setLoadingAI(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/ai/generate-description", {
//         jobTitle: expInput.jobTitle,
//         employer: expInput.employer,
//         skills: formData.skills || [],
//       });
//       setExpInput((p) => ({ ...p, description: res.data.description }));
//     } catch (err) {
//       console.error(err);
//       alert("AI generation failed.");
//     } finally {
//       setLoadingAI(false);
//     }
//   };

//   // Generate summary via backend
//   const generateAISummary = async () => {
//     setLoadingAI(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/ai/generate-summary", { formData });
//       setFormData((p) => ({ ...p, summary: res.data.summary }));
//     } catch (err) {
//       console.error("Error generating summary:", err);
//       alert("AI summary failed.");
//     } finally {
//       setLoadingAI(false);
//     }
//   };

//   // Save resume to backend (and update local saved list)
//   const handleSaveToServer = async () => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
//     if (!currentUser) {
//       alert("Please login first to save your resume!");
//       return;
//     }

//     try {
//       const payload = {
//         userEmail: currentUser.email,
//         formData: {
//           ...formData,
//           // photo is a File; you may want to upload it separately; here we omit photo or send placeholder
//         },
//         bgColor,
//         themeColor,
//       };
//       const res = await axios.post("http://localhost:5000/api/resumes", payload);
//       alert("Resume saved to server!");
//       // refresh saved list
//       fetchSavedResumes();
//     } catch (err) {
//       console.error("Save to server error:", err);
//       alert("Failed to save resume on server.");
//     }
//   };

//   // Local save (optional) and navigate to resume listing
//   // const handleSaveLocal = () => {
//   //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   //   if (!currentUser) {
//   //     alert("Please login first to save your resume locally!");
//   //     return;
//   //   }

//   //   const resumeData = {
//   //     formData,
//   //     bgColor,
//   //     themeColor,
//   //     createdAt: new Date().toISOString(),
//   //   };

//   //   let all = JSON.parse(localStorage.getItem(`resumes_${currentUser.email}`)) || [];
//   //   all.unshift(resumeData);
//   //   localStorage.setItem(`resumes_${currentUser.email}`, JSON.stringify(all));
//   //   alert("Resume saved in browser storage!");
//   // };

//   // Fetch saved resumes from server
//   const fetchSavedResumes = async () => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
//     if (!currentUser) {
//       alert("Please login first!");
//       return;
//     }
//     try {
//       const res = await axios.get("http://localhost:5000/api/resumes", {
//         params: { userEmail: currentUser.email },
//       });
//       setSavedResumes(res.data.resumes || []);
//       setStep("list");
//       console.log("Fetched saved resumes:", res.data.resumes);
//     } catch (err) {
//       console.error("Fetch saved resumes error:", err);
//       alert("Could not fetch saved resumes from server.");
//     }
//   };

//   const deleteResumeServer = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/resumes/${id}`);
//       alert("Deleted");
//       fetchSavedResumes();
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   const loadResumeFromServer = (resume) => {
//     if (!resume) return;
//     setFormData(resume.formData);
//     setBgColor(resume.bgColor);
//     setThemeColor(resume.themeColor);
//     setStep(6);
//   };

//   const handlemainpage = () => navigate("/");

//   return (
//     <div className="resume-wizard" id="resume">
//       {step === "list" && (
//         <div>
//           <h2>Your Saved Resumes</h2>
//           <ul style={{ listStyle: "none" }}>
//             {savedResumes.length === 0 && <li>No saved resumes.</li>}
//             {savedResumes.map((resume, index) => (
//               <li key={resume._id || index} style={{ marginBottom: 15 }}>
//                 <button
//                   onClick={() => loadResumeFromServer(resume)}
//                   style={{ padding: 12 }}
//                 >
//                   {resume.formData?.name || "Unknown"} -{" "}
//                   {new Date(resume.createdAt || resume._id?.getTimestamp?.() || Date.now()).toLocaleString()}
//                 </button>
//                 <button
//                   onClick={() => deleteResumeServer(resume._id)}
//                   style={{ marginLeft: 10, color: "red", padding: 10 }}
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <button
//             onClick={() => setStep(1)}
//             style={{
//               padding: "10px 20px",
//               alignItems: "center",
//               marginLeft: "0px",
//               background: "#ff9800",
//               border: "none",
//               color: "#fff",
//             }}
//           >
//             Back
//           </button>
//         </div>
//       )}

//       {step === 1 && (
//         <Step1Contact
//           formData={formData}
//           setFormData={setFormData}
//           handleChange={handleChange}
//           handlePhoto={handlePhoto}
//           setStep={setStep}
//           handlemainpage={handlemainpage}
//         />
//       )}
//       {step === 2 && (
//         <Step2Experience
//           expInput={expInput}
//           setExpInput={setExpInput}
//           formData={formData}
//           setFormData={setFormData}
//           addExperience={addExperience}
//           editExperience={editExperience}
//           deleteExperience={deleteExperience}
//           generateAIExperience={generateAIExperience}
//           loadingAI={loadingAI}
//           setStep={setStep}
//         />
//       )}
//       {step === 3 && (
//         <Step3Education
//           eduInput={eduInput}
//           setEduInput={setEduInput}
//           formData={formData}
//           setFormData={setFormData}
//           addEducation={addEducation}
//           editEducation={editEducation}
//           deleteEducation={deleteEducation}
//           setStep={setStep}
//         />
//       )}
//       {step === 4 && (
//         <Step4Skills
//           skillInput={skillInput}
//           setSkillInput={setSkillInput}
//           addSkill={addSkill}
//           deleteSkill={deleteSkill}
//           getAISkills={getAISkills}
//           aiSkills={aiSkills}
//           loading={loading}
//           formData={formData}
//           setFormData={setFormData}
//           setStep={setStep}
//         />
//       )}
//       {step === 5 && (
//         <Step5Summary
//           formData={formData}
//           handleChange={(e) => setFormData((p) => ({ ...p, summary: e.target.value }))}
//           generateAISummary={generateAISummary}
//           setStep={setStep}
//         />
//       )}
//       {step === 6 && (
//         <TemplateSelector formData={formData} bgColor={bgColor} themeColor={themeColor}
//         setStep={setStep} />

//       )}

      
//       <div style={{ marginTop: 20 }}>
//         <button className="save-btn" onClick={handleSaveToServer} style={{ marginRight: 10 }}>Save to resume</button>
//         <button  className="save-btn" onClick={fetchSavedResumes}>your resume</button>
//       </div>
//     </div>
//   );
// };

// export default ResumeForm;