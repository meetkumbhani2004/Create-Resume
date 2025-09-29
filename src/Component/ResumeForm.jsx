import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./ResumeForm.css";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


const ResumeForm = () => {
  const [step, setStep] = useState(1);
  const [bgColor, setBgColor] = useState("#ffffff"); 
  const [themeColor, setThemeColor] = useState("#3498db");
  const [savedResumes, setSavedResumes] = useState();

const handleColorChange = (e) => {
  setThemeColor(e.target.value);
  document.documentElement.style.setProperty("--theme-color", e.target.value);
};
const handleSave = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  navigate("/resume")
  if (!currentUser) {
    alert("Please login first to save your resume!");
    return;
  }

  const resumeData = {
    formData,
    bgColor,
    themeColor,
    createdAt: new Date().toISOString(), 
  };

  let allResumes = JSON.parse(localStorage.getItem(`resumes_${currentUser.email}`)) || [];


  allResumes.push(resumeData);


  localStorage.setItem(`resumes_${currentUser.email}`, JSON.stringify(allResumes));

  alert("Resume saved successfully!");
};



  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    linkedin: "",
    website: "",
    summary: "",
    skills: [],
    education: [],
    experience: [],
    photo: null,
  });

  const [skillInput, setSkillInput] = useState("");
  const [eduInput, setEduInput] = useState({  institute: "", university: "", city: "", state: "", degree: "", specialization: "", cgpa: "" });
  const [expInput, setExpInput] = useState({
    jobTitle: "",
    employer: "",
    city: "",
    state: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  const handlemainpage = () =>{
    navigate("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoto = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData({ ...formData, photo: file }); 
  }
};

  // addSkill

  const addSkill = () => {
  if (!skillInput.trim()) return;
  setFormData({ ...formData, skills: [...formData.skills, skillInput] });
  setSkillInput("");
};

const deleteSkill = (index) => {
  const updated = formData.skills.filter((_, i) => i !== index);
  setFormData({ ...formData, skills: updated });
};

  //  addEducation 

  const addEducation = () => {
  if (!eduInput.institute || !eduInput.university) return; // basic validation
  setFormData({ ...formData, education: [...formData.education, eduInput] });
   setEduInput({  institute: "", university: "", city: "", state: "", degree: "", specialization: "", cgpa: "" });

  if (eduInput.editIndex !== undefined) {
    // Editing existing
    const updated = [...formData.education];
    updated[eduInput.editIndex] = eduInput;
    setFormData({ ...formData, education: updated });
    setEduInput({ institute: "", university: "", city: "", state: "", degree: "", specialization: "", cgpa: "" });
  } else {
    // Adding new
    setFormData({ ...formData, education: [...formData.education, eduInput] });
    setEduInput({ institute: "", university: "", city: "", state: "", degree: "", specialization: "", cgpa: "" });
  }
};

const editEducation = (index) => {
  setEduInput({ ...formData.education[index], editIndex: index });
};

const deleteEducation = (index) => {
  const updated = formData.education.filter((_, i) => i !== index);
  setFormData({ ...formData, education: updated });
};

// experiance

  const addExperience = () => {
  if (!expInput.jobTitle || !expInput.employer) return; // basic validation
   setFormData({ ...formData, experience: [...formData.experience, expInput] });
    setExpInput({ jobTitle: "", employer: "", city: "", state: "", startYear: "", endYear: "", description: "" });

  if (expInput.editIndex !== undefined) {
    // Editing existing
    const updated = [...formData.experience];
    updated[expInput.editIndex] = expInput;
    setFormData({ ...formData, experience: updated });
    setExpInput({ jobTitle: "", employer: "", city: "", state: "", startYear: "", endYear: "", description: "" });
  } else {
    // Adding new
    setFormData({ ...formData, experience: [...formData.experience, expInput] });
    setExpInput({ jobTitle: "", employer: "", city: "", state: "", startYear: "", endYear: "", description: "" });
  }
};

const editExperience = (index) => {
  setExpInput({ ...formData.experience[index], editIndex: index });
};

const deleteExperience = (index) => {
  const updated = formData.experience.filter((_, i) => i !== index);
  setFormData({ ...formData, experience: updated });
};


const generatePDF = () => {
  const resumeElement = document.getElementById("resume-preview");
  if (!resumeElement) return;

  html2canvas(resumeElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    const pxPerMm = canvas.width / 210; 
    const imgWidth = 210;
    const imgHeight = canvas.height / pxPerMm;

    if (imgHeight <= 297) {
      const pdf = new jsPDF("p", "mm", [imgHeight, imgWidth]);
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${formData.name || "Resume"}.pdf`);
      return;
    }


    const pdf = new jsPDF("p", "mm", "a4");
    let heightLeft = imgHeight;
    let position = 0;

    while (heightLeft > 0) {
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
      position -= 297;
      if (heightLeft > 0) pdf.addPage();
    }

    pdf.save(`${formData.name || "Resume"}.pdf`);
  });
};

const showSavedResume = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  const saved = JSON.parse(localStorage.getItem(`resumes_${currentUser.email}`)) || [];

  if (saved.length > 0) {
  
    setSavedResumes(saved); 
    setStep("list");
  } else {
    alert("No saved resumes found for this account!");
  }
};

const deleteResume = (index) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  let saved = JSON.parse(localStorage.getItem(`resumes_${currentUser.email}`)) || [];

  if (saved[index]) {
 
    saved.splice(index, 1);

    localStorage.setItem(`resumes_${currentUser.email}`, JSON.stringify(saved));


    setSavedResumes(saved);

    alert("Resume deleted successfully!");
  }
};

const loadResume = (index) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const saved = JSON.parse(localStorage.getItem(`resumes_${currentUser.email}`)) || [];
  
  if (saved[index]) {
    const resume = saved[index];
    setFormData(resume.formData);
    setBgColor(resume.bgColor);
    setThemeColor(resume.themeColor);
    setStep(6); 
  }
};


  return (
    <div className="resume-wizard" id="resume">
      < Navbar />

{step === "list" && (
  <div>
    <h2>Your Saved Resumes</h2>
    <ul style={{listStyle:"none"}}>
      {savedResumes.map((resume, index) => (
        <li key={index} style={{marginBottom: "15px"}}>
          <button onClick={() => loadResume(index)} style={{padding:20}}>
            {formData.name} - {new Date(resume.createdAt).toLocaleString()}
          </button>
          <button 
            onClick={() => deleteResume(index)} 
            style={{marginLeft: "10px", color: "red", padding:10}}
           
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
    <button onClick={() => setStep(1)} style={{padding:"10px 20px", alignItems:"center",
      marginLeft:"40px", background:"#ff9800", border:"#ff9800", color:"#fff"
    }}>Back</button>
  </div>
)}

     {step === 1 && (
  <div className="step">
    <div className="prewflex">
      
      <div>
      <strong style={{marginRight:10}}>Build New Resume</strong>
      </div>
      <div>
        <div>
  <button onClick={showSavedResume}>Your Resume</button>
</div>

      </div>

    </div>
    <h2>How would you like employers to contact you?</h2>
      <div className="formstep1">
    <div className="form-fields">
      <div className="form-group">
        <label>Full Name </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Email Address </label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Current Address (Optional)</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>State</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Zip Code</label>
        <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>LinkedIn Profile URL (Optional)</label>
        <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Website URL (Optional)</label>
        <input type="text" name="website" value={formData.website} onChange={handleChange} />
      </div>
    </div>

        <div className="photo-upload">
         {formData.photo ? (
                <img src={URL.createObjectURL(formData.photo)} alt="Profile" className="w-32 h-32 rounded" />
              ) : (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded">Photo</div>
              )}
          <label>Photo (Optional)</label>
          <input type="file" accept="image/*" onChange={handlePhoto} />
          
        </div>
        </div>

    <div className="buttons">
      <button onClick={handlemainpage}>Back</button>
      <button onClick={() => setStep(2)}>Save & Next</button>
    </div>
  </div>
)}

{step === 2 && (
  <div className="step">
    <h2>Experience</h2>

    <div className="form-fields">
      <div className="form-group">
        <label>Job Title</label>
        <input
          type="text"
          value={expInput.jobTitle}
          onChange={(e) => setExpInput({ ...expInput, jobTitle: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Employer</label>
        <input
          type="text"
          value={expInput.employer}
          onChange={(e) => setExpInput({ ...expInput, employer: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          value={expInput.city}
          onChange={(e) => setExpInput({ ...expInput, city: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>State</label>
        <input
          type="text"
          value={expInput.state}
          onChange={(e) => setExpInput({ ...expInput, state: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Start Year</label>
        <input
          type="text"
          value={expInput.startYear}
          onChange={(e) => setExpInput({ ...expInput, startYear: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>End Year</label>
        <input
          type="text"
          value={expInput.endYear}
          onChange={(e) => setExpInput({ ...expInput, endYear: e.target.value })}
        />
      </div>

      <div className="form-group" style={{ gridColumn: "1 / -1" }}>
        <label>Description</label>
        <textarea
          value={expInput.description}
          onChange={(e) => setExpInput({ ...expInput, description: e.target.value })}
        />
      </div>
    </div>

    <button onClick={addExperience} className="buttons1 step4btn">Add Experience</button>

    {/* Experience List */}
    <div className="experience-list">
      {formData.experience.map((ex, i) => (
        <div key={i} className="exp-card">
          <h4>{ex.jobTitle} at {ex.employer}</h4>
          <p><b>Location:</b> {ex.city}, {ex.state}</p>
          <p><b>Duration:</b> {ex.startYear} - {ex.endYear}</p>
          <p>{ex.description}</p>

          <div className="exp-actions">
            <button className="edit-btn" onClick={() => editExperience(i)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteExperience(i)}>Delete</button>
          </div>
        </div>
      ))}
    </div>

    <div className="buttons">
      <button onClick={() => setStep(1)}>Back</button>
      <button onClick={() => setStep(3)}>Save & Next</button>
    </div>
  </div>
)}

{step === 3 && (
  <div className="step">
    <h2>Education</h2>

    <div className="form-fields">
      <div className="form-group">
        <label>Institute Name</label>
        <input
          type="text"
          value={eduInput.institute}
          onChange={(e) => setEduInput({ ...eduInput, institute: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>University Name</label>
        <input
          type="text"
          value={eduInput.university}
          onChange={(e) => setEduInput({ ...eduInput, university: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          value={eduInput.city}
          onChange={(e) => setEduInput({ ...eduInput, city: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>State</label>
        <input
          type="text"
          value={eduInput.state}
          onChange={(e) => setEduInput({ ...eduInput, state: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Degree</label>
        <input
          type="text"
          value={eduInput.degree}
          onChange={(e) => setEduInput({ ...eduInput, degree: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Specialization</label>
        <input
          type="text"
          value={eduInput.specialization}
          onChange={(e) => setEduInput({ ...eduInput, specialization: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>CGPA</label>
        <input
          type="text"
          value={eduInput.cgpa}
          onChange={(e) => setEduInput({ ...eduInput, cgpa: e.target.value })}
        />
      </div>
    </div>

    <button onClick={addEducation}className="step4btn buttons1">Add Education</button>

    {/* Education List */}
    <div className="education-list">
      {formData.education.map((edu, i) => (
        <div key={i} className="edu-card">
          <h4>{edu.institute} ({edu.university})</h4>
          <p><b>Location:</b> {edu.city}, {edu.state}</p>
          <p><b>CGPA:</b> {edu.cgpa}</p>

          <div className="edu-actions">
            <button className="edit-btn" onClick={() => editEducation(i)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteEducation(i)}>Delete</button>
          </div>
        </div>
      ))}
    </div>

    <div className="buttons">
      <button onClick={() => setStep(2)}>Back</button>
      <button onClick={() => setStep(4)}>Save & Next</button>
    </div>
  </div>
)}


{step === 4 && (
  <div className="step1">
    <h2>Skills</h2>

    <div className="inline-input">
      <input
        type="text"
        placeholder="Add skill"
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)}
      />
      <button onClick={addSkill}>Add</button>
    </div>

   
    <div className="skill-list">
      {formData.skills.map((s, i) => (
        <div key={i} className="skill-card">
          <span>{s}</span>
          <button onClick={() => deleteSkill(i)}>✕</button>
        </div>
      ))}
    </div>

    <div className="buttons1">
      <button onClick={() => setStep(3)} className="step4btn">Back</button>
      <button onClick={() => setStep(5)} className="step4btn">Save & Next</button>
    </div>
  </div>
)}




      {step === 5 && (
        <div className="step">
          <h2>Summary</h2>
          <textarea name="summary" placeholder="Summary" value={formData.summary} onChange={handleChange} className="summary"/>
        
          <div className="buttons1">
          <button onClick={() => setStep(4)} className="step4btn">Back</button>
          <button onClick={() => setStep(6)} className="step4btn">Save & Next</button>
          
          </div>
        </div>
      )}

  {step === 6 && (
  <div className="">
    <div className="prewflex">
      <h2>Preview & Download</h2>
      <div>
      <strong style={{marginRight:10}}>Background</strong>
      <input
        type="color"
        name="color"
         value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />
      </div>
      <div>
        <strong style={{marginRight:10}}>Font</strong>
      <input
        type="color"
        name="color"
        value={themeColor}
        onChange={handleColorChange}
      />
      </div>

    </div>
    <div
      className="resume-preview"
      id="resume-preview"
      style={{ backgroundColor: bgColor }}
    >
      <div className="resume-header">
        <div className="profile-pic">
          {formData.photo instanceof File ? (
            <img src={URL.createObjectURL(formData.photo)} alt="Profile" />
          ) : (
            <div className="placeholder">Photo</div>
          )}
          <div>
            <h1>{formData.name || "Your Name"}</h1>
          </div>
        </div>

        <div className="header-info">
          <p>{formData.email} <EmailIcon /> </p>
          <p>{formData.phone} <CallIcon /></p>
          <p>{formData.address} <LocationOnIcon /> </p>
          <p>{formData.city}, {formData.state}</p>
          <p>{formData.linkedin} <LinkedInIcon/> </p>
          <p>{formData.website} <PublicIcon /> </p>
        </div>
      </div>

      <div className="bord">
        <h3>Skills</h3>
        <ul style={{ backgroundColor: bgColor }}>{formData.skills.map((s, i) => <li key={i} className="summerli">{s}</li>)}</ul>
      </div>

      <h3>Education</h3>
      <ul>
        {formData.education.map((e, i) => (
          <li key={i}>
            {e.institute} ({e.university})  
            <br /> {e.city}, {e.state}  
            <br /> CGPA: {e.cgpa}
          </li>
        ))}
      </ul>

      <h3>Experience</h3>
      <ul>
        {formData.experience.map((ex, i) => (
          <li key={i}>
            {ex.jobTitle} at {ex.employer} ({ex.startYear}-{ex.endYear})
            <br /> {ex.city}, {ex.state}
            <br /> {ex.description}
          </li>
        ))}
      </ul>

      <h3>Summary</h3>
      <p>{formData.summary}</p>
    </div>

    <div className="buttons1">
  <button onClick={() => setStep(5)}>Back</button>
  <button onClick={handleSave}>Save</button>  
  <button onClick={generatePDF}>Download PDF</button>
  <button onClick={() => setStep(1)}>Home</button>
</div>
  </div>
)}
</div>
  );
};

export default ResumeForm;
