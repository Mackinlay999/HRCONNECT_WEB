/* eslint-disable react-hooks/exhaustive-deps */
import './SelfAssessment.css'
import assessmentStyle from "./Assessment.module.css";
import React, { useEffect, useState } from "react";
import { PiTimer } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../../Common-Components/Loaders/Loader";
import Timer from "./Timer";
import { useSelector, useDispatch } from "react-redux";
import { handleSelectedOption, calculatedResult } from "../../../Redux/ReduxSlice";
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
function SelfAssessmentPage() {
  const navigateTO = useNavigate();
  const [ShowPopup, setShowPopup] = useState(false);
  const { selectedOption } = useSelector((state) => state.Assessment);
  const dispatchTO = useDispatch();
  const { state } = useLocation();
  const [Loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(null);

  const handleSelectOptions = (e, questionNum, value, optionNUM) => {
    e.preventDefault();

    // !Toogle the marked options
    const ansOptions = document.querySelectorAll(
      ".SelfAssessmentPage__QuestinLIST__AnsweresOTPION"
    );
    const markedOPTION = document.querySelector(`.${optionNUM}`);
    ansOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        ansOptions.forEach((item) => {
          item.classList.remove("Options_selected_Answere");
        });
      });
    });
    markedOPTION.classList.add("Options_selected_Answere");
    //! Toogle the marked options

    const questionNumbering = document.querySelector(`.Question${questionNum}`);

    questionNumbering?.classList.remove("NotAnseredQuestion__numbering");
    questionNumbering?.classList.add("AnsweredQuestion__Numbering");

    let tempSelection = {
      isSelected: `${"." + optionNUM}`,
      value: value,
    };
    dispatchTO(handleSelectedOption({ questionNum, tempSelection }));
  };

  //* Removing the not viewed styling from the question numbering
  useEffect(() => {
    const questionNumbering = document.querySelector(
      `.Question${question?.meta?.pagingCounter}`
    );
    questionNumbering?.classList.remove("notViewdQuestion__Numbering");
    questionNumbering?.classList.add("NotAnseredQuestion__numbering");
  }, [question?.meta?.pagingCounter]);
  //* Removing the not viewed styling from the question numbering

  //? Apply the classname if the user previously select the answere
  useEffect(() => {
    // Removing previous class from the OptoinLIST
    const ansOptions = document.querySelectorAll(
      ".SelfAssessmentPage__QuestinLIST__AnsweresOTPION"
    );
    ansOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        ansOptions.forEach((item) => {
          item.classList.remove("Options_selected_Answere");
        });
      });
    });
    // Removing previous class from the OptoinLIST

    const questionNumbering = document.querySelector(
      `.Question${question?.meta?.pagingCounter}`
    );
    if (selectedOption[question?.meta?.pagingCounter]) {
      const markedOption = document.querySelector(
        `${selectedOption[question?.meta?.pagingCounter].isSelected}`
      );
      questionNumbering.classList.remove("NotAnseredQuestion__numbering");
      questionNumbering.classList.add("AnsweredQuestion__Numbering");
      markedOption.classList.add("Options_selected_Answere");
    }
  }, [selectedOption, question?.meta?.pagingCounter]);
  //? Apply the classname if the user previously select the answere

  // SUBMIT THE ASSESSMENT
  const handleTogglePopup = (e) => {
    e.preventDefault();
    setShowPopup(!ShowPopup);
  };

  // LOAD THE QUESTIONS
  const handleChangeQuestion = (num) => {
    loadQuestion(num);
  };

  const loadQuestion = (num) => {
    if (state) {
      setLoading(true);
      axios
        .get(
          `${baseUrl}/questions/list-question/${state.id}?page=${
            num ? num : 1
          }`
        )
        .then((response) => {
          setQuestion(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      navigateTO("/assessment");
    }
  };
  useEffect(loadQuestion, [state]);

  return (
    <div className="SelfAssessmentPage_Container">
      <div className="SelfAssessmentPage_Box">
        <div className="SelfAssessment__Question_OPtionsBox">
          <header className="Question_OPtionsBox__Header">
            <h1 className="Question_OPtionsBox__Header_Text">
              Self Assessment
            </h1>
            <p className="SelfAssessment__TimerBox">
              Time Remaining
              <span className="SelfAssessment__remainigTimer">
                <PiTimer /> <Timer minutes={state?.time?.split(" ")[0]} />
              </span>
            </p>
          </header>

          <h2 className="SelfAssessmentPage_Box__secondaryHeading">
            Questions
          </h2>

          <div className="SelfAssessment__questionAnswereBox">
            {Loading ? (
              <Loader />
            ) : (
              <>
                {question?.data.map((data) => {
                  return (
                    <ul
                      className="SelfAssessmentPage__QuestinLIST"
                      key={data._id}
                    >
                      <h3 className="SelfAssessmentPage__QuestinLIST__QuestionText">
                        Q.{question?.meta?.pagingCounter}) {data?.question}
                      </h3>

                      <li
                        className="SelfAssessmentPage__QuestinLIST__AnsweresOTPION OptionA"
                        onClick={(e) =>
                          handleSelectOptions(
                            e,
                            question?.meta?.pagingCounter,
                            data?.options[0],
                            "OptionA"
                          )
                        }
                      >
                        <span className="QuestinLIST__AnsweresNumbering">
                          A
                        </span>
                        <span className="QuestionList__AnswereText">
                          {data?.options[0]?.answer}
                        </span>
                      </li>

                      <li
                        className="SelfAssessmentPage__QuestinLIST__AnsweresOTPION OptionB"
                        onClick={(e) =>
                          handleSelectOptions(
                            e,
                            question?.meta?.pagingCounter,
                            data?.options[1],
                            "OptionB"
                          )
                        }
                      >
                        <span className="QuestinLIST__AnsweresNumbering">
                          B
                        </span>
                        <span className="QuestionList__AnswereText">
                          {data?.options[1]?.answer}
                        </span>
                      </li>

                      <li
                        className="SelfAssessmentPage__QuestinLIST__AnsweresOTPION OptionC"
                        onClick={(e) =>
                          handleSelectOptions(
                            e,
                            question?.meta?.pagingCounter,
                            data?.options[2],
                            "OptionC"
                          )
                        }
                      >
                        <span className="QuestinLIST__AnsweresNumbering">
                          C
                        </span>
                        <span className="QuestionList__AnswereText">
                          {data?.options[2]?.answer}
                        </span>
                      </li>

                      <li
                        className="SelfAssessmentPage__QuestinLIST__AnsweresOTPION OptionD"
                        onClick={(e) =>
                          handleSelectOptions(
                            e,
                            question?.meta?.pagingCounter,
                            data?.options[3],
                            "OptionD"
                          )
                        }
                      >
                        <span className="QuestinLIST__AnsweresNumbering">
                          D
                        </span>
                        <span className="QuestionList__AnswereText">
                          {data?.options[3]?.answer}
                        </span>
                      </li>
                    </ul>
                  );
                })}
              </>
            )}
          </div>

          <div className="SelfAssessmetPage__buttonBox">
            {question?.meta?.hasPrevPage && (
              <button
                className="selfAssessmentPage__buttons selfAssessment__prevButton"
                type="button"
                onClick={() => handleChangeQuestion(question?.meta?.prevPage)}
              >
                Previous
              </button>
            )}

            {question?.meta?.hasNextPage ? (
              <button
                className="selfAssessmentPage__buttons"
                type="button"
                onClick={() => handleChangeQuestion(question?.meta?.nextPage)}
              >
                Next
              </button>
            ) : (
              <button
                className="selfAssessmentPage__buttons"
                type="button"
                onClick={handleTogglePopup}
              >
                Submit
              </button>
            )}
          </div>
        </div>

        <div className="SelfAssessment__QuestionNumberingBox">
          <div className="QuestionNumberingBox__NOteBox">
            <h4 className="QuestionNumberingBox__NoteBox_Heading">Note:</h4>
            <p className="NoteBox__NoteText ">
              <span className="NoteBox__ICONBox NotAnseredQuestion__numbering"></span>{" "}
              Not Answered
            </p>
            <p className="NoteBox__NoteText">
              <span className="NoteBox__ICONBox MarkedQuestion__numbering"></span>{" "}
              Marked
            </p>
            <p className="NoteBox__NoteText">
              <span className="NoteBox__ICONBox AnsweredQuestion__Numbering"></span>{" "}
              Answered
            </p>
            <p className="NoteBox__NoteText ">
              <span className="NoteBox__ICONBox notViewdQuestion__Numbering"></span>{" "}
              Not Viewed
            </p>
          </div>

          <h3 className="SelfAssessment__topicName">{state?.name}</h3>

          <div className="SelfAssessment__QuestionNumbering">
            <p
              onClick={() => handleChangeQuestion(1)}
              className={`QuestinNumbering notViewdQuestion__Numbering Question1`}
            >
              1
            </p>
            <p
              onClick={() => handleChangeQuestion(2)}
              className={`QuestinNumbering notViewdQuestion__Numbering Question2`}
            >
              2
            </p>
            <p
              onClick={() => handleChangeQuestion(3)}
              className={`QuestinNumbering notViewdQuestion__Numbering Question3`}
            >
              3
            </p>
            <p
              onClick={() => handleChangeQuestion(4)}
              className={`QuestinNumbering notViewdQuestion__Numbering Question4`}
            >
              4
            </p>
            <p
              onClick={() => handleChangeQuestion(5)}
              className={`QuestinNumbering notViewdQuestion__Numbering Question5`}
            >
              5
            </p>
            <p
              onClick={() => handleChangeQuestion(6)}
              className={`QuestinNumbering notViewdQuestion__Numbering Question6`}
            >
              6
            </p>
            <p
              onClick={() => handleChangeQuestion(7)}
              className={`QuestinNumbering notViewdQuestion__Numbering Question7`}
            >
              7
            </p>
            <p
              onClick={() => handleChangeQuestion(8)}
              className={`QuestinNumbering notViewdQuestion__Numbering Question8`}
            >
              8
            </p>
            <p
              onClick={() => handleChangeQuestion(9)}
              className={`QuestinNumbering notViewdQuestion__Numbering Question9`}
            >
              9
            </p>
            <p
              onClick={() => handleChangeQuestion(10)}
              className={`QuestinNumbering notViewdQuestion__Numbering Question10`}
            >
              10
            </p>
          </div>
        </div>
      </div>

      {ShowPopup && (
        <AssessmentSubmissionPopup
          CbToggle={handleTogglePopup}
          AnsweredQuestion={selectedOption}
        />
      )}
    </div>
  );
}

export default SelfAssessmentPage;

function AssessmentSubmissionPopup({ CbToggle, AnsweredQuestion }) {
  const navigateTO = useNavigate();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const handleSubmitAssessmentClick = (e) => {
    e.preventDefault();
    let correctCount = 0;
    setLoading(true);

    for (const key in AnsweredQuestion) {
      if (AnsweredQuestion.hasOwnProperty(key)) {
        if (AnsweredQuestion[key].value.isCorrect) {
          correctCount++;
        }
      }
    }
    dispatch(calculatedResult(correctCount));

    setTimeout(() => {
      navigateTO("/assessment-result");
      setLoading(false);
    }, 2500);
  };

  return (
    <div className={assessmentStyle.Assessment__popupContainer}>
      <div className={assessmentStyle.Assessment__popup}>
        {Loading ? (
          <Loader />
        ) : (
          <>
            <h2 className={assessmentStyle.Assessment__popup_title}>
              Are you ready to submit the test?
            </h2>
            <h3 className={assessmentStyle.Assessment__popup_Secondarytitle}>
              <span>
                You have ansered{" "}
                <span className={assessmentStyle.Assessmentpopup__answeredQuestion}>
                  {Object.keys(AnsweredQuestion).length}/10
                </span>{" "}
                questions
              </span>
            </h3>
            <div className={assessmentStyle.AssessmentPopup_buttonContainer}>
              <button className={assessmentStyle.AssessmentPopup__button} onClick={CbToggle}>
                No
              </button>
              <button
                className={assessmentStyle.AssessmentPopup__button}
                onClick={handleSubmitAssessmentClick}
              >
                Yes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
