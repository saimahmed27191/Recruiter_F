import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaHandPaper, FaComment, FaCog } from "react-icons/fa";
import interview_img from "../assets/interview-img.png";
import "../styles/InterviewInfo.css";

const InterviewInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState({ minutes: 25, seconds: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [readyToRecord, setReadyToRecord] = useState(false);
  const [questionText, setQuestionText] = useState(location.state?.question_text || "");
  const [audioUrl, setAudioUrl] = useState(location.state?.audio_url || "");
  const [feedback, setFeedback] = useState("");
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.seconds === 0) {
            if (prevTime.minutes === 0) {
              clearInterval(interval);
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

  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(`http://127.0.0.1:99${audioUrl}`);
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setReadyToRecord(true);
      });
      audioRef.current.play();
      setIsRunning(true);
      setIsPlaying(true);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream?.getTracks().forEach((track) => track.stop());
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && readyToRecord && !isRecording) {
        e.preventDefault();
        startRecording();
      } else if (e.code === "Space" && isRecording) {
        e.preventDefault();
        stopRecording();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [readyToRecord, isRecording]);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };
    startVideo();
    return () => {
      // Cleanup: Stop all webcam tracks when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => {
          track.stop();
          console.log("Webcam track stopped:", track);
        });
        videoRef.current.srcObject = null; // Clear the stream
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/mp3" });
        await submitAnswer(blob);
        stream.getTracks().forEach((track) => track.stop());
      };
      recorder.start();
      setIsRecording(true);
      setReadyToRecord(false);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const submitAnswer = async (audioBlob) => {
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      console.error("Session ID not found");
      return;
    }

    const formData = new FormData();
    formData.append("session_id", sessionId);
    formData.append("audio", audioBlob, "answer.mp3");

    try {
      const response = await fetch("http://127.0.0.1:99/submit_answer", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }

      const data = await response.json();

      if (data.status === "follow_up") {
        setQuestionText(data.follow_up_question);
        setAudioUrl(data.audio_url);
      } else if (data.status === "next_question") {
        setQuestionText(data.question_text);
        setAudioUrl(data.audio_url);
      } else if (data.status === "complete") {
        navigate("/analysis", {
          state: {
            feedbackData: data.feedback_data,
            audioUrl: data.audio_url,
          },
        });
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="interview-info">
      <div className="top-bar">
        <div className="interview-title">Software Engineer Interview</div>
        <div className="top-buttons">
          <button className="end-button">End Interview</button>
        </div>
      </div>
      <div className="main-area">
        <div className={`panel left-panel ${isPlaying ? "speaking" : ""}`}>
          <img src={interview_img} className="interview_img" />
        </div>
        <div className={`panel right-panel ${isRecording ? "recording" : ""}`}>
          <video ref={videoRef} autoPlay muted className="user-video" />
        </div>
      </div>
      <div className="question-feedback">
        {questionText && !feedback && (
          <p className="question-text">{questionText}</p>
        )}
        {readyToRecord && (
          <p className="instruction">Press spacebar to start recording</p>
        )}
        {isRecording && (
          <p className="instruction">Recording... Press spacebar to stop</p>
        )}
        {feedback && <div className="feedback">{feedback}</div>}
      </div>
      <div className="bottom-bar">
        <div className="timer-flex-container">
          <div className="timer-display">
            {`${time.minutes.toString().padStart(2, "0")}:${time.seconds
              .toString()
              .padStart(2, "0")}`}
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