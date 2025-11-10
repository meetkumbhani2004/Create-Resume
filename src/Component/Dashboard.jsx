import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // ✅ Using your configured axios instance
import Step1Contact from "../page/FormHeading";
import Step2Experience from "../page/Experience";
import Step3Education from "../page/Education";
import Step4Skills from "../page/Skill";
import Step5Summary from "../page/Summery";
import Step6Additional from "../page/Addtional";
import TemplateSelector from "./Templateselecter";
import "./ResumeForm.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [step, setStep] = useState("dashboard");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [themeColor, setThemeColor] = useState("#3498db");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    linkedin: "",
    website: "",
    summary: "",
    skills: [],
    education: [],
    experience: [],
    photo: null,
    hobbies: [],
    languages: [],
    awards: [],
  });

  // Input states
  const [skillInput, setSkillInput] = useState("");
  const [aiSkills, setAiSkills] = useState([]);
  const [eduInput, setEduInput] = useState({
    institute: "",
    university: "",
    city: "",
    state: "",
    degree: "",
    specialization: "",
    cgpa: "",
    editIndex: undefined,
  });
  const [expInput, setExpInput] = useState({
    jobTitle: "",
    employer: "",
    city: "",
    state: "",
    startYear: "",
    endYear: "",
    description: "",
    editIndex: undefined,
  });
  const [loadingAI, setLoadingAI] = useState(false);
  const [loading, setLoading] = useState(false);

  // -------------------- AUTH + FETCH --------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
    fetchResumes(storedUser.email);
  }, [navigate]);

  const fetchResumes = async (email) => {
    try {
      const res = await API.get("/resumes", { params: { userEmail: email } });
      setResumes(res.data.resumes || []);
    } catch (err) {
      console.error("Error fetching resumes:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/resumes/${id}`);
      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete resume error:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // -------------------- FORM LOGIC --------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setFormData((p) => ({ ...p, photo: file }));
  };

  // Skill operations
  const addSkill = () => {
    if (!skillInput.trim()) return;
    setFormData((p) => ({ ...p, skills: [...p.skills, skillInput.trim()] }));
    setSkillInput("");
  };
  const deleteSkill = (index) => {
    setFormData((p) => ({
      ...p,
      skills: p.skills.filter((_, i) => i !== index),
    }));
  };

  // Experience
  const addExperience = () => {
    if (!expInput.jobTitle || !expInput.employer) {
      alert("Please enter job title and employer.");
      return;
    }

    const newExp = {
      jobTitle: expInput.jobTitle,
      employer: expInput.employer,
      city: expInput.city,
      state: expInput.state,
      startYear: expInput.startYear,
      endYear: expInput.endYear,
      description: expInput.description,
    };

    if (expInput.editIndex !== undefined) {
      const updated = [...formData.experience];
      updated[expInput.editIndex] = newExp;
      setFormData((p) => ({ ...p, experience: updated }));
    } else {
      setFormData((p) => ({ ...p, experience: [...p.experience, newExp] }));
    }

    setExpInput({
      jobTitle: "",
      employer: "",
      city: "",
      state: "",
      startYear: "",
      endYear: "",
      description: "",
      editIndex: undefined,
    });
  };

  const editExperience = (i) => setExpInput({ ...formData.experience[i], editIndex: i });
  const deleteExperience = (i) =>
    setFormData((p) => ({ ...p, experience: p.experience.filter((_, j) => j !== i) }));

  // Education
  const addEducation = () => {
    if (!eduInput.institute || !eduInput.university) {
      alert("Please enter institute and university.");
      return;
    }

    const newEdu = {
      institute: eduInput.institute,
      university: eduInput.university,
      city: eduInput.city,
      state: eduInput.state,
      degree: eduInput.degree,
      specialization: eduInput.specialization,
      cgpa: eduInput.cgpa,
    };

    if (eduInput.editIndex !== undefined) {
      const updated = [...formData.education];
      updated[eduInput.editIndex] = newEdu;
      setFormData((p) => ({ ...p, education: updated }));
    } else {
      setFormData((p) => ({ ...p, education: [...p.education, newEdu] }));
    }

    setEduInput({
      institute: "",
      university: "",
      city: "",
      state: "",
      degree: "",
      specialization: "",
      cgpa: "",
      editIndex: undefined,
    });
  };

  const editEducation = (i) => setEduInput({ ...formData.education[i], editIndex: i });
  const deleteEducation = (i) =>
    setFormData((p) => ({ ...p, education: p.education.filter((_, j) => j !== i) }));

  // -------------------- SAVE --------------------
  const handleSaveToServer = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!currentUser) {
      alert("Please login first!");
      return;
    }

    try {
      const payload = {
        userEmail: currentUser.email,
        formData,
        bgColor,
        themeColor,
      };
      await API.post("/resumes", payload);
      alert("Resume saved!");
      fetchResumes(currentUser.email);
      setStep("dashboard");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save resume!");
    }
  };

  // -------------------- LOAD RESUME --------------------
  const loadResumeFromServer = (resume) => {
    setFormData(resume.formData);
    setBgColor(resume.bgColor);
    setThemeColor(resume.themeColor);
    setStep(7);
  };

  // -------------------- AI --------------------
  const generateAIExperience = async () => {
    if (!expInput.jobTitle || !expInput.employer) {
      alert("Please enter Job Title and Employer first!");
      return;
    }
    setLoadingAI(true);
    try {
      const res = await API.post("/ai/generate-description", {
        jobTitle: expInput.jobTitle,
        employer: expInput.employer,
        skills: formData.skills || [],
      });
      setExpInput((p) => ({ ...p, description: res.data.description }));
    } catch (err) {
      console.error(err);
      alert("AI generation failed.");
    } finally {
      setLoadingAI(false);
    }
  };

  const getAISkills = async () => {
    setLoading(true);
    try {
      const jobTitle =
        expInput.jobTitle ||
        formData.experience?.[0]?.jobTitle ||
        formData.name ||
        "Professional";
      const employer = expInput.employer || formData.experience?.[0]?.employer || "";
      const res = await API.post("/ai/generate-skills", { jobTitle, employer });
      setAiSkills(res.data.skills || []);
    } catch (err) {
      console.error("Error fetching AI skills:", err);
      alert("AI skills generation failed.");
    } finally {
      setLoading(false);
    }
  };

  const generateAISummary = async () => {
    setLoadingAI(true);
    try {
      const res = await API.post("/ai/generate-summary", { formData });
      setFormData((p) => ({ ...p, summary: res.data.summary }));
    } catch (err) {
      console.error("Error generating summary:", err);
      alert("AI summary failed.");
    } finally {
      setLoadingAI(false);
    }
  };


  

  // -------------------- MAIN RENDER --------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" flex flex-col items-center px-6 py-12">
      {step === "dashboard" && (
        <>
          {/* Header */}
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8 mb-10 text-center">
            {user ? (
              <>
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                  Welcome, <span className="text-green-600">{user.name}</span>
                </h2>
                <p className="text-gray-600 mb-6">{user.email}</p>
                <div className="flex justify-center"> 
                <button
                  onClick={logout}
                  className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="ml-4 px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all" >
                  Home
                </button>
                </div>
              </>
            ) : (
              <div className="text-gray-500">Loading user details...</div>
            )}
          </div>

          {/* Action Boxes */}
          <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            {/* Create Resume */}
            <div
              onClick={() => setStep(1)}
              className="cursor-pointer bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center hover:shadow-xl hover:scale-[1.02] transition-transform"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 flex items-center justify-center rounded-full mb-4 text-3xl font-bold">
                +
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Resume</h3>
              <p className="text-gray-600 text-center">
                Start building a new professional resume.
              </p>
            </div>

            {/* Existing Resumes */}
            <div
              onClick={() =>
                document.getElementById("resumelist")?.scrollIntoView({ behavior: "smooth" })
              }
              className="cursor-pointer bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center hover:shadow-xl hover:scale-[1.02] transition-transform"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mb-4 text-3xl font-bold">
                📄
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Existing Resumes</h3>
              <p className="text-gray-600 text-center">View, edit, or delete your resumes.</p>
            </div>
          </div>

          {/* Resume List */}
          <div
            id="resumelist"
            className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Your Saved Resumes
            </h2>

            {resumes.length === 0 ? (
              <p className="text-gray-500 text-center">No resumes found yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {resumes.map((resume, index) => (
                  <div
                    key={resume._id}
                    className="border rounded-xl p-5 shadow-sm hover:shadow-lg transition-all bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Resume #{index + 1}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Created: {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => loadResumeFromServer(resume)}
                        className="px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(resume._id)}
                        className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      </div>

      {/* Step Components */}
      {step === 1 && (
        <Step1Contact
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handlePhoto={handlePhoto}
          setStep={setStep}
          handlemainpage={() => setStep("dashboard")}
        />
      )}
      {step === 2 && (
        <Step2Experience
          expInput={expInput}
          setExpInput={setExpInput}
          formData={formData}
          setFormData={setFormData}
          addExperience={addExperience}
          editExperience={editExperience}
          deleteExperience={deleteExperience}
          generateAIExperience={generateAIExperience}
          loadingAI={loadingAI}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <Step3Education
          eduInput={eduInput}
          setEduInput={setEduInput}
          formData={formData}
          setFormData={setFormData}
          addEducation={addEducation}
          editEducation={editEducation}
          deleteEducation={deleteEducation}

          setStep={setStep}
        />
      )}
      {step === 4 && (
        <Step4Skills
          skillInput={skillInput}
          setSkillInput={setSkillInput}
          addSkill={addSkill}
          deleteSkill={deleteSkill}
          getAISkills={getAISkills}
          aiSkills={aiSkills}
          loading={loading}
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
          
        />
      )}
      {step === 5 && (
        <Step5Summary
          formData={formData}
          handleChange={(e) => setFormData((p) => ({ ...p, summary: e.target.value }))}
          setStep={setStep}
          generateAISummary={generateAISummary}
          loadingAI={loadingAI}
        />
      )}
      {step === 6 && (
  <Step6Additional
    formData={formData}
    setFormData={setFormData}
    setStep={setStep}
  />
)}

{step === 7 && (
  <TemplateSelector
    formData={formData}
    bgColor={bgColor}
    themeColor={themeColor}
    setStep={setStep}
  />
)}

      {step !== "dashboard" && step !== 6 && (
        <div style={{ marginTop: 20 }} className="flex justify-center mb-10">
          <button
            onClick={handleSaveToServer}
            className="save-btn mr-2"
          >
            Save Resume
          </button>
          <button
            onClick={() => setStep("dashboard")}
            className="save-btn bg-gray-400 hover:bg-gray-500"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
