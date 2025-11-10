import React, { useState } from "react";
import Template1 from "./Templete";
import Template2 from "./Templete2";
import Step6Preview from "./Preview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

export default function TemplateSelector({ formData, setStep }) {
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [themeColor, setThemeColor] = useState("#3498db");
  const [fontSize, setFontSize] = useState("16px");
  const [lineHeight, setLineHeight] = useState("1.5");
  const [paragraphSpacing, setParagraphSpacing] = useState("10px");

  const navigate = useNavigate();

  const handleColorChange = (e) => {
    setThemeColor(e.target.value);
    document.documentElement.style.setProperty("--theme-color", e.target.value);
  };




const generatePDF = async (formData) => {
  const resumeElement = document.getElementById("resume-preview");

  if (!resumeElement) {
    alert("Preview not found! Please ensure your template has id='resume-preview'.");
    return;
  }

  // Capture resume as canvas
  const canvas = await html2canvas(resumeElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  // Initialize standard A4 PDF
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

  // Convert canvas to mm dimensions
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // 🧮 Scale image if it’s taller than page
  let finalHeight = imgHeight;
  let finalWidth = imgWidth;
  let offsetX = 0;
  let offsetY = 0;

  if (imgHeight > pdfHeight) {
    const scaleFactor = pdfHeight / imgHeight;
    finalHeight = imgHeight * scaleFactor;
    finalWidth = imgWidth * scaleFactor;
  }

  // Center the resume both ways
  offsetX = (pdfWidth - finalWidth) / 2;
  offsetY = (pdfHeight - finalHeight) / 2;

  // Add image and save
  pdf.addImage(imgData, "PNG", offsetX, offsetY, finalWidth, finalHeight);
  pdf.save(`${formData?.name || "Resume"}.pdf`);
};


  const previewStyles = {
    fontSize,
    lineHeight,
    "--paragraph-spacing": paragraphSpacing,
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* LEFT SIDE: Filters & Options */}
      <div className="w-full md:w-1/3 bg-white shadow-md p-6 border-r border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Customize Resume
        </h2>

        {/* 🎨 Color & Style Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <strong>Background</strong>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 border rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <strong>Font Color</strong>
            <input
              type="color"
              value={themeColor}
              onChange={handleColorChange}
              className="w-10 h-10 border rounded"
            />
          </div>

          <div>
            <strong>Font Size</strong>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full mt-1 border px-2 py-1 rounded"
            >
              <option value="14px">Small</option>
              <option value="16px">Medium</option>
              <option value="18px">Large</option>
              <option value="20px">Extra Large</option>
            </select>
          </div>

          <div>
            <strong>Line Height</strong>
            <select
              value={lineHeight}
              onChange={(e) => setLineHeight(e.target.value)}
              className="w-full mt-1 border px-2 py-1 rounded"
            >
              <option value="1.2">Tight</option>
              <option value="1.5">Normal</option>
              <option value="1.8">Relaxed</option>
              <option value="2">Spacious</option>
            </select>
          </div>

          <div>
            <strong>Paragraph Gap</strong>
            <select
              value={paragraphSpacing}
              onChange={(e) => setParagraphSpacing(e.target.value)}
              className="w-full mt-1 border px-2 py-1 rounded"
            >
              <option value="6px">Small</option>
              <option value="10px">Normal</option>
              <option value="16px">Medium</option>
              <option value="24px">Large</option>
            </select>
          </div>
        </div>

        {/* Template Selection */}
        <h3 className="text-lg font-semibold mt-8 mb-3">Select Template</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTemplate("template1")}
            className={`px-3 py-2 border rounded ${
              selectedTemplate === "template1"
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Template 1
          </button>
          <button
            onClick={() => setSelectedTemplate("template2")}
            className={`px-3 py-2 border rounded ${
              selectedTemplate === "template2"
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Template 2
          </button>
          <button
            onClick={() => setSelectedTemplate("template3")}
            className={`px-3 py-2 border rounded ${
              selectedTemplate === "template3"
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Template 3
          </button>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col gap-3 mt-10">
          <button
            onClick={() => setStep(6)}
            className="bg-gray-200 hover:bg-gray-300 py-2 rounded"
          >
            ⬅ Back
          </button>
         
          <button
  onClick={() => generatePDF(formData)}
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
  Download PDF
</button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded"
          >
            🏠 Home
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Resume Preview */}
      <div className="w-full md:w-2/3 p-6 overflow-auto bg-gray-100 flex justify-center items-start">
        <div className="max-w-3xl w-full" style={previewStyles}>
          {selectedTemplate === "template1" && (
            <Template1
              formData={formData}
              bgColor={bgColor}
              themeColor={themeColor}
            />
          )}
          {selectedTemplate === "template2" && (
            <Template2
              formData={formData}
              bgColor={bgColor}
              themeColor={themeColor}
            />
          )}
          {selectedTemplate === "template3" && (
            <Step6Preview
              formData={formData}
              bgColor={bgColor}
              themeColor={themeColor}
            />
          )}
        </div>
      </div>
    </div>
  );
}
