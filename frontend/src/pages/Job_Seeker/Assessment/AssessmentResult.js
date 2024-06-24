/* eslint-disable react-hooks/exhaustive-deps */
import assessmentStyle from "./Assessment.module.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleClearResult } from "../../../Redux/ReduxSlice";
import { useNavigate } from "react-router-dom";

function AssessmentResult() {
  const { result, percentageResult } = useSelector((state) => state.Assessment);
  const navigateTO = useNavigate();
  const dispatchTO = useDispatch();

  const handleDoneButtonClick = (e) => {
    e.preventDefault();
    navigateTO("/assessment");
    dispatchTO(handleClearResult());
  };

  // useEffect(() => {
  //   if (percentageResult === 0) {
  //     navigateTO("/assessment");
  //   }
  // }, [percentageResult]);
  return (
    <div className={assessmentStyle.SelfAssessmentPage__ResultContainer}>
      <div className={assessmentStyle.SelfAssessmentPage__resultBox}>
        <h1 className={assessmentStyle.ResultBox__title}>Exam Result</h1>

        <div className={assessmentStyle.ResultBox__SuccessPoster}>{percentageResult}</div>
        <p className={assessmentStyle.ResultBox_SccessText}>
          You have answered
          <span className={assessmentStyle.ResultBox_QuestionAnswered_text}>
            {result}/10
          </span>{" "}
          question correctly
        </p>

        <button
          className={assessmentStyle.ResultBox__doneBUtton}
          onClick={handleDoneButtonClick}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default AssessmentResult;
