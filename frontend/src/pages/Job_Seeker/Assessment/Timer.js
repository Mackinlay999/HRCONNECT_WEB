import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { calculatedResult } from '../../../Redux/ReduxSlice';

function Timer({ minutes, type, AnsweredQuestion, correctAnswer }) {
  const [seconds, setSeconds] = useState(Number(minutes) * 60);
  const navigateTo = useNavigate();
  const dispatchTO = useDispatch()

  const handleSubmitAssessmentClick = () => {

    let correctCount = 0;
    // console.log(correctCount);  
    Object.keys(AnsweredQuestion).forEach((questionId) => {
      const actualAnswer = parseInt(correctAnswer[questionId - 1].correctAnswer);
      const myAnswer = parseInt(AnsweredQuestion[questionId].option); // Parse option to integer if needed
      // console.log(actualAnswer);
      // console.log(myAnswer);
      if (myAnswer === actualAnswer) { // Check if answer matches
        correctCount++; // Increment correctCount if answers match
      }

    });

    dispatchTO(calculatedResult(correctCount));

    setTimeout(() => {
      navigateTo("/job-assesment-result");
    }, 2500);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        if (seconds === 60) {
          toast.error("Hurry up! Last 1 min left")
        }
      }
      else {
        clearInterval(intervalId);
        if (type === "Job_Assesment") {
          handleSubmitAssessmentClick()
          navigateTo('/job-assesment-result')
        } else {
          navigateTo('/assessment-result');
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, navigateTo, type, AnsweredQuestion, correctAnswer]);

  const formattedTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      {formattedTime()}
    </>
  );
}

export default Timer;
