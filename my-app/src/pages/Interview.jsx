import React from "react";
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

const InterviewSetup = () => {
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
            <div className="camera-white">
              <img src={camera_white} />
            </div>
            <p>Camera Preview</p>
          </div>
        </div>

        <p className="select-label">Select Your Ai Interview</p>
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

        <button className="start-button">Start Interview →</button>
        <p className="note">
          Your interview will begin in a room-like environment.
        </p>
      </div>

      <div className="tips-card">
        <h4>Quick tips Before Starting</h4>
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

export default InterviewSetup;
