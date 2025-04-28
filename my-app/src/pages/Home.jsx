import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Home.css";
import upload_img from "../assets/upload-img.svg";
import { FormContext } from "./FormContext";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormContext);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, resume: file }));
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
                value={formData.jobTitle || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Job Description URL (Optional)</label>
              <input type="url" disabled />
            </div>
            <div className="form-group">
              <label>Or Paste Job Description</label>
              <textarea
                rows="3"
                placeholder="Paste or type the job description here..."
                value={formData.jobDesc || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, jobDesc: e.target.value }))
                }
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
                    <img src={upload_img} alt="Upload" className="upload-icon" />
                  </div>
                  <p>
                    Drag & drop files here or <span>browse</span>
                  </p>
                  {formData.resume && (
                    <p style={{ marginTop: "10px", color: "#374151" }}>
                      {formData.resume.name}
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
               Start Interview <FaArrowRightLong />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;