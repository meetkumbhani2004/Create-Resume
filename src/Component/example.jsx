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
