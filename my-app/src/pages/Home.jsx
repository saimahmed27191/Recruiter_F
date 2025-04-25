import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Home.css";
import upload_img from "../assets/upload-img.svg";

const Home = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [resume, setResume] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResume(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please upload a PDF file.",
        confirmButtonColor: "#134e4a",
      });
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobTitle.trim() || !jobDesc.trim() || !resume) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields and upload your resume.",
        confirmButtonColor: "#134e4a",
      });
      return;
    }
    console.log("Form submitted", { jobTitle, jobDesc, resume });
    navigate("/interview");
  };

  return (
    <div className="interview-page">
      <main className="main">
        <div className="form-card">
          <h2 className="form-title">
            Set Up Your <span>Interview</span>
          </h2>
          <p className="form-subtitle">
            Enter the job details to customize your interview experience
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                placeholder="e.g. Senior Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Job Description URL (Optional)</label>
              <input type="url" />
            </div>

            <div className="form-group">
              <label>Or Paste Job Description</label>
              <textarea
                rows="3"
                placeholder="Paste or type the job description here..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="upload-main">
              <div className="form-group">
                <label>Upload Your Resume</label>
                <div
                  className="upload-box"
                  onClick={handleUploadClick}
                  style={{ cursor: "pointer" }}
                >
                  <div className="upload-icon">
                    <img
                      src={upload_img}
                      alt="Upload"
                      className="upload-icon"
                    />
                  </div>
                  <p>
                    Drag & drop files here or <span>browse</span>
                  </p>
                  {resume && (
                    <p style={{ marginTop: "10px", color: "#374151" }}>
                      {resume.name}
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>

              <button type="submit" className="submit-button">
                Start Interview →
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
