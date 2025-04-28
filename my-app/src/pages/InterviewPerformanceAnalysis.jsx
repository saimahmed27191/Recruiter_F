import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FiDownload,
  FiClock,
  FiMessageSquare,
  FiAlertTriangle,
} from "react-icons/fi";
import "../styles/InterviewPerformanceAnalysis.css";

const InterviewPerformanceAnalysis = () => {
  const location = useLocation();
  const { feedbackData, audioUrl } = location.state || {};

  useEffect(() => {
    // Attempt to close any active webcam streams
    const closeWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true }).catch(() => null);
        if (stream) {
          stream.getTracks().forEach((track) => {
            track.stop();
            console.log("Webcam track stopped in InterviewPerformanceAnalysis:", track);
          });
        }
      } catch (error) {
        console.log("No active webcam stream to close or permission denied:", error);
      }
    };

    closeWebcam();

    // Cleanup function (runs on unmount)
    return () => {
      // Ensure any remaining tracks are stopped when component unmounts
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => {
            track.stop();
            console.log("Webcam track stopped on unmount:", track);
          });
        })
        .catch(() => {
          // No stream to stop
        });
    };
  }, []);

  if (!feedbackData) {
    return <div>Error: Feedback data not available</div>;
  }

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
            <h2>{feedbackData.overall_score}%</h2>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${feedbackData.overall_score}%` }}
            ></div>
          </div>
        </div>

        <div className="stat-box">
          <p>Duration</p>
          <h2>
            <FiClock /> {(feedbackData.duration * 60).toFixed(2)} Seconds
          </h2>
        </div>

        <div className="stat-box">
          <p>Questions Answered</p>
          <h2>
            <FiMessageSquare /> {feedbackData.questions_answered} /{" "}
            {feedbackData.total_questions}
          </h2>
        </div>
      </div>

      <div className="main-content">
        <div className="feedback">
          <h2>Detailed Feedback</h2>
          {feedbackData.feedback.map((item, index) => (
            <div className="feedback-item" key={index}>
              <h3>
                {item.category} <span>{item.score}/10</span>
              </h3>
              <p>{item.comment}</p>
            </div>
          ))}
        </div>

        <div className="improvement">
          <h2>Areas for Improvement</h2>
          <ul>
            {feedbackData.improvements.map((improvement, index) => (
              <li key={index}>
                <FiAlertTriangle /> {improvement}
              </li>
            ))}
          </ul>
          <button className="schedule-button">
            Schedule a Next Practice Interview
          </button>
        </div>
      </div>

      <div className="summary-section">
        <h2>Summary</h2>
        <p>{feedbackData.summary}</p>
      </div>

      <div className="audio-player">
        <h3>Interview Audio</h3>
        <audio controls src={`http://127.0.0.1:8000${audioUrl}`} />
      </div>
    </div>
  );
};

export default InterviewPerformanceAnalysis;