import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaUser } from "react-icons/fa";
import { FaHandPaper, FaComment, FaCog } from "react-icons/fa";
import interview_img from "../assets/interview-img.png";
import "../styles/InterviewInfo.css";

const InterviewInfo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState({ minutes: 25, seconds: 0 });

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.seconds === 0) {
            if (prevTime.minutes === 0) {
              setIsRunning(false);
              return { minutes: 0, seconds: 0 };
            }
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          }
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);

  return (
    <div className="interview-info">
      <div className="top-bar">
        <div className="interview-title">Software Engineer Interview</div>
        <div className="top-buttons">
          <button className="end-button">End Interview</button>
        </div>
      </div>

      <div className="main-area">
        <div className="panel left-panel">
          <img src={interview_img} className="interview_img" />
        </div>
        <div className="panel right-panel">
          <div className="participant-icon">
            <FaUser className="user-icon" />
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <div className="timer-flex-container">
          <div className="timer-display">
            {`${time.minutes.toString().padStart(2, "0")}:${time.seconds
              .toString()
              .padStart(2, "0")}`}
            <button
              onClick={toggleTimer}
              className="timer-toggle-button"
              aria-label={isRunning ? "Pause" : "Play"}
            >
              {isRunning ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        </div>
        <div className="bottom-buttons">
          <button className="hand-button">
            <FaHandPaper className="button-icon" />
            <span>Raise Hand</span>
          </button>
          <button className="chat-button">
            <FaComment className="button-icon" />
            <span>Chat</span>
          </button>
          <button className="settings-button">
            <FaCog className="button-icon" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewInfo;
