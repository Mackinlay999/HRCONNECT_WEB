import React, { useRef, useState, useEffect } from "react";
import "./webcam.css";
import axios from "axios";
const WebcamRecorder = () => {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [hrQuestions, setHrQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8585/interview/HrInterviewRound"
        );
        setHrQuestions(response.data || []);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching HR questions:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (hrQuestions.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % hrQuestions.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [hrQuestions]);

  const startRecording = () => {
    if (mediaStream) {
      const recorder = new MediaRecorder(mediaStream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setVideoChunks((prevChunks) => [...prevChunks, e.data]);
        }
      };
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleStartClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      startRecording();
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const handleStopClick = () => {
    stopRecording();
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
    uploadVideo();
  };

  const uploadVideo = async () => {
    const blob = new Blob(videoChunks, { type: "video/webm" });
    const formData = new FormData();
    formData.append("file", blob, "recorded-video.webm");

    try {
      const response = await fetch(
        "http://localhost:8585/interview/uploadInterview",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Video uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="webcam_main_container">
      <div className="webcam_block">
        <video ref={videoRef} width="640" height="480" autoPlay muted />
        <div align="center">
          {recording ? (
            <button onClick={handleStopClick}>Stop Recording</button>
          ) : (
            <button onClick={handleStartClick}>Start Recording</button>
          )}
        </div>
      </div>
      <div className="hrquestion_block">
        <h1>Interview Question Round</h1>
        <p>
          {hrQuestions.length > 0
            ? hrQuestions[currentIndex].hrquestion
            : "Loading questions..."}
        </p>
      </div>
    </div>
  );
};

export default WebcamRecorder;
