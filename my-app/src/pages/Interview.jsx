import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Interview.css";
import refresh from "../assets/refresh.svg";
import camera from "../assets/ELEMENTS.svg";
import microphone from "../assets/ELEMENTS (1).svg";
import internet from "../assets/ELEMENTS (2).svg";
import sound from "../assets/ELEMENTS (3).svg";
import correct from "../assets/correct.svg";
import camera_white from "../assets/camera-white.svg";
import men_img from "../assets/men.png";
import women_img from "../assets/female.png";
import { FormContext } from "./FormContext";

const Interview = () => {
  const navigate = useNavigate();
  const { formData } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((error) => {
            console.error("Error playing video stream:", error);
          });
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
        Swal.fire({
          icon: "error",
          title: "Webcam Error",
          text: "Unable to access webcam. Please ensure it is connected and permissions are granted.",
          confirmButtonColor: "#134e4a",
        });
      }
    };
    startVideo();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleStartInterview = async () => {
    setIsLoading(true);
    try {
      const formDataApi = new FormData();
      if (formData.jobDesc) {
        formDataApi.append("job_description", formData.jobDesc);
      }
      if (formData.resume) {
        formDataApi.append("resume", formData.resume);
      }

      const response = await fetch("http://127.0.0.1:8000/start_interview", {
        method: "POST",
        body: formDataApi,
      });

      if (!response.ok) {
        throw new Error("Failed to start interview");
      }

      const data = await response.json();
      localStorage.setItem("session_id", data.session_id);
      navigate("/interview-info", {
        state: { question_text: data.question_text, audio_url: data.audio_url },
      });
    } catch (error) {
      console.error("Error starting interview:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to start the interview. Please try again.",
        confirmButtonColor: "#134e4a",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="interview-setup-page">
      <div className="interview-card">
        <h2 className="setup-title">
          Interview <span>Setup</span>
        </h2>
        <p className="setup-subtitle">
          Please configure your interview settings and check your equipment
        </p>
        <div className="run-check">
          <h3>System Check</h3>
          <a href="#" className="run-check-btn">
            <div className="refresh-img">
              <img src={refresh} />
            </div>
            <p>Run Check</p>
          </a>
        </div>
        <div className="system-check">
          <div className="check-item">
            <div className="camera-wrap">
              <div className="camera-img">
                <img src={camera} />
              </div>
              <p>Camera</p>
            </div>
            <div className="correct-img">
              <img src={correct} />
            </div>
          </div>
          <div className="check-item">
            <div className="camera-wrap">
              <div className="microphone-img">
                <img src={microphone} />
              </div>
              <p>Microphone</p>
            </div>
            <div className="correct-img">
              <img src={correct} />
            </div>
          </div>
          <div className="check-item">
            <div className="camera-wrap">
              <div className="internet-img">
                <img src={internet} />
              </div>
              <p>Internet Connection</p>
            </div>
            <div className="correct-img">
              <img src={correct} />
            </div>
          </div>
          <div className="check-item">
            <div className="camera-wrap">
              <div className="sound-img">
                <img src={sound} />
              </div>
              <p>Speakers</p>
            </div>
            <div className="correct-img">
              <img src={correct} />
            </div>
          </div>
        </div>
        <div className="camera-preview">
          <div className="camera-box">
            <video ref={videoRef} autoPlay muted className="camera-video" />
            <p>Camera Preview</p>
          </div>
        </div>
        <p className="select-label">Select Your AI Interviewer</p>
        <div className="ai-interviewers">
          <div className="interviewer-card">
            <div className="avatar-men">
              <img src={men_img} alt="" />
            </div>
            <p className="interview-para">John Chen</p>
            <span className="inter-span">Tech Lead</span>
          </div>
          <div className="interviewer-card">
            <div className="avatar-female">
              <img src={women_img} alt="" />
            </div>
            <p className="interview-para">Sarah Miller</p>
            <span className="inter-span">Tech Lead</span>
          </div>
          <div className="interviewer-card">
            <div className="avatar-men">
              <img src={men_img} alt="" />
            </div>
            <p className="interview-para">Jack Chan</p>
            <span className="inter-span">Tech Lead</span>
          </div>
        </div>
        <button
          className="start-button"
          onClick={handleStartInterview}
          disabled={isLoading}
        >
          {isLoading ? "Starting..." : "Start Interview →"}
        </button>
        <p className="note">
          Your interview will begin in a room-like environment.
        </p>
      </div>
      <div className="tips-card">
        <h4>Quick Tips Before Starting</h4>
        <ul>
          <li>Ensure you're in a quiet, well-lit environment</li>
          <li>Position yourself centered in the camera frame</li>
          <li>Test your microphone and speaker regularly</li>
          <li>Have your resume and notes nearby, just in case</li>
        </ul>
      </div>
    </div>
  );
};

export default Interview;