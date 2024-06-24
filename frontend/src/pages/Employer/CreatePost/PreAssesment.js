import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import PreAssesmentStyle from "./Preassessment.module.css";

const PreAssesment = () => {
  const [mcqs, setMCQs] = useState(() => {
    const savedMCQs = localStorage.getItem("mcqs");
    return savedMCQs ? JSON.parse(savedMCQs) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswers, setCorrectAnswers] = useState(
    Array(mcqs.length).fill(null)
  );
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    // Save MCQs to local storage when component unmounts
    return () => {
      localStorage.setItem("mcqs", JSON.stringify(mcqs));
    };
  }, [mcqs]);

  const handleEdit = (index) => {
    const mcqToEdit = mcqs[index];
    setNewQuestion(mcqToEdit.question);
    setOptions([...mcqToEdit.options]);
    setEditingIndex(index);
    setShowModal(true);
    toast.success("Question updated successfully.");
  };

  const handleAddMCQ = () => {
    // Check if question and options are not empty
    if (
      newQuestion.trim() === "" ||
      options.some((option) => option.trim() === "")
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    // Check if at least one correct answer is selected
    if (!correctAnswers.includes(true)) {
      toast.error("Please select the correct answer for the question");
      return;
    }

    let updatedMCQs;
    if (editingIndex !== null) {
      updatedMCQs = [...mcqs];
      updatedMCQs[editingIndex] = {
        question: newQuestion,
        options: [...options],
        correctAnswer: options.findIndex(
          (option, index) => correctAnswers[index]
        ),
      };
    } else {
      const correctIndex = options.findIndex(
        (option, index) => correctAnswers[index]
      );
      const newMCQ = {
        question: newQuestion,
        options: [...options],
        correctAnswer: correctIndex,
      };
      updatedMCQs = [...mcqs, newMCQ];
      toast.success("Question added successfully.");
    }

    setMCQs(updatedMCQs);
    setShowModal(false);
    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswers(Array(updatedMCQs.length).fill(false)); // Reset correct answers
  };

  const handleDelete = (index) => {
    const updatedMCQs = [...mcqs];
    updatedMCQs.splice(index, 1);
    setMCQs(updatedMCQs);
    toast.success("Question deleted");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mcqs.length !== 10) {
      toast.error("Please provide exactly 10 questions");
    } else {
      navigate("/create_post", { state: { ...state, mcq: mcqs } });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false);
    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setMCQs([]); // Clear MCQs
    navigate(-1);
  };

  return (
    <>
      <div className={PreAssesmentStyle.aptitude_round_container}>
        <div className={PreAssesmentStyle.rounds_heading}>MCQ Questions</div>

        <div className={PreAssesmentStyle.aptitude_heading_container}>
          <div
            className={PreAssesmentStyle.aptitude_round_question_option_heading}
          >
            Question
          </div>
          <div
            className={PreAssesmentStyle.aptitude_round_question_option_heading}
          >
            Option
          </div>
        </div>

        <div>
          {/* MCQ rendering */}
          {mcqs.map((mcq, index) => (
            <div key={index}>
              <div className={PreAssesmentStyle.aptitude_round_flex_container}>
                <div>
                  <div
                    className={
                      PreAssesmentStyle.aptitude_round_question_container_first_question
                    }
                  >
                    <div
                      className={
                        PreAssesmentStyle.aptitude_round_question_number
                      }
                    >
                      Question no. {index + 1}
                    </div>
                    <div className={PreAssesmentStyle.aptitude_round_question}>
                      {mcq.question}
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    className={
                      PreAssesmentStyle.aptitude_round_option_container_first_option
                    }
                  >
                    <ol type="A">
                      {mcq.options.map((option, idx) => (
                        <li key={idx}>{option}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
              <div
                className={
                  PreAssesmentStyle.aptitude_round_edit_del_btn_container
                }
              >
                <Button variant="warning" onClick={() => handleEdit(index)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(index)}
                  className={PreAssesmentStyle.aptitude_round_del_btn}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}

          {/* Add MCQ button */}
          <div className={PreAssesmentStyle.add_btn_container}>
            <Button
              className={PreAssesmentStyle.add_btn}
              onClick={() => setShowModal(true)}
            >
              ADD +
            </Button>
          </div>
        </div>

        {/* MCQ modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add MCQ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="question">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </Form.Group>
              {options.map((option, index) => (
                <Form.Group
                  controlId={`option${index}`}
                  key={index}
                  style={{ marginTop: "10px" }}
                >
                  <Form.Label>Option {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Enter option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                  />

                  <Form.Check
                    style={{ marginTop: "5px" }}
                    type="radio"
                    id={`correct-answer-${index}`}
                    label={`Correct Answer`}
                    checked={correctAnswers[index]}
                    onChange={() => {
                      const newCorrectAnswers = Array(
                        correctAnswers.length
                      ).fill(false); // Reset all to false
                      newCorrectAnswers[index] = true; // Set the current one to true
                      setCorrectAnswers(newCorrectAnswers);
                    }}
                  />
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddMCQ}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className={PreAssesmentStyle.form_action_btn_container}>
        <div className={PreAssesmentStyle.cancel_btn_container}>
          <Button
            className={PreAssesmentStyle.cancel_btn}
            onClick={handleCancel}
          >
            CANCEL
          </Button>
        </div>
        <div className={PreAssesmentStyle.submit_btn_container}>
          <Button
            className={PreAssesmentStyle.submit_btn}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </>
  );
};

export default PreAssesment;
