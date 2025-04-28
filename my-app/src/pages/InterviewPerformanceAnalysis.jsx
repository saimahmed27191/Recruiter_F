import React from "react";
import {
  FiDownload,
  FiClock,
  FiMessageSquare,
  FiAlertTriangle,
} from "react-icons/fi";
import "../styles/InterviewPerformanceAnalysis.css";

const InterviewPerformanceAnalysis = () => {
  return (
    <div className="container">
      <div className="analysis-head">
        <h1>
          Interview <span className="highlight">Performance Analysis</span>
        </h1>
        <button className="download-button">
          <FiDownload /> Download Report
        </button>
      </div>

      <div className="stats">
        <div className="stat-box">
          <div className="stat-head">
            <p>Overall Score</p>
            <h2>85%</h2>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "85%" }}></div>
          </div>
        </div>

        <div className="stat-box">
          <p>Duration</p>
          <h2>
            <FiClock /> 45 Minutes
          </h2>
        </div>

        <div className="stat-box">
          <p>Questions Answers</p>
          <h2>
            <FiMessageSquare /> 12 / 15
          </h2>
        </div>
      </div>

      <div className="main-content">
        <div className="feedback">
          <h2>Detailed Feedback</h2>

          <div className="feedback-item">
            <h3>
              Communication Skills <span>90%</span>
            </h3>
            <p className="feedback-para">
              Excellent articulation and clear communication. Maintained good
              eye contact throughout.
            </p>
          </div>

          <div className="feedback-item">
            <h3>
              Technical Knowledge <span>90%</span>
            </h3>
            <p className="feedback-para">
              Strong understanding of core concepts. Could improve on specific
              implementation details.
            </p>
          </div>

          <div className="feedback-item">
            <h3>
              Problem Solving <span>90%</span>
            </h3>
            <p>
              Good analytical approach. Consider explaining your thought process
              more clearly.
            </p>
          </div>
        </div>

        <div className="improvement">
          <h2>Areas for Improvement</h2>
          <ul>
            <li>
              <FiAlertTriangle /> Work on providing more specific examples from
              past experiences
            </li>
            <li>
              <FiAlertTriangle /> Practice concise answers while maintaining
              completeness
            </li>
            <li>
              <FiAlertTriangle /> Enhance responses to behavioral questions with
              STAR method
            </li>
          </ul>
          <button className="schedule-button">
            Schedule a Next Practice Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPerformanceAnalysis;
