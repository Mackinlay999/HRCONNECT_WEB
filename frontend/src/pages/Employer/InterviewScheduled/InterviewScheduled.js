import React, { useState, useEffect } from "react";
import { Table, Image, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// import tableImage from "../../../Assets/tableImage.PNG";
import InterviewStyle from "./InterviewScheduled.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark, faCalendarCheck, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const InterviewScheduled = () => {
  const [interviewedUsers, setInterviewedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [feedback, setFeedback] = useState("");
  const nav=useNavigate()
  useEffect(() => {
    fetchInterviewedUsers();
  }, []);

  const fetchInterviewedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8585/api/interview/getCandidate');
      console.log(response.data); 
      if (response.data.success) {
        setInterviewedUsers(response.data.data);
      } else {
        console.error("Failed to fetch interviewed users");
      }
    } catch (error) {
      console.error("Error fetching interviewed users:", error);
    }
  };

  const handleInterview = (user) => {
    nav("/schedule-interview", { state: user });
  };

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFeedback("");
  };

  const handleSendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:8585/api/interview/send-feedback', {
        candidateName: selectedUser.userName,
        candidateEmail: selectedUser.userEmail,
        feedback: feedback,
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success('Feedback sent successfully')
      } else {
        toast.error('Feedback sent failed')
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Failed to send feedback.');
    }
    handleCloseModal();
  };
  const rows = interviewedUsers.map((user, index) => {
    console.log(user); 
    return (
      <tr key={index} className={InterviewStyle.Maincontainer}>
        <td className={InterviewStyle.name_column}>
          <div className={InterviewStyle.name_content}>
            <Image
              src={user.UserProfile}
              roundedCircle
              className={InterviewStyle.avatar}
            />
            <span className={InterviewStyle.name}>{user.userName}</span>
          </div>
        </td>
        <td className={InterviewStyle.data_cell}>
          <span className={InterviewStyle.gold_star}>&#9733;</span>
          {user.interviewType}
        </td>
        <td className={InterviewStyle.data_cell}>
          {user.interviewDate}
        </td>
        <td className={InterviewStyle.data_cell}>
          {user.interviewTime}
        </td>
        <td className={InterviewStyle.data_cell}>
          {user.location}
        </td>
        <td>
          <button
            style={{
              border: "none",
              borderRadius: "5px",
              backgroundColor: "rgba(0, 183, 7, 1)",
              color: "white",
              fontSize: "12px",
              padding: "5px",
            }}
            onClick={() => handleInterview(user)}
            >
            Schedule Interview
          </button>
        </td>
        <td>
          <button
            style={{
              border: "1px solid rgba(225, 220, 217, 1)",
              borderRadius: "5px",
              backgroundColor: "transparent",
              color: "rgba(21, 84, 246, 1)",
              fontSize: "12px",
              padding: "5px",
            }}
            onClick={() => handleShowModal(user)}
          >
            Write Feedback
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className={InterviewStyle.cardcontainer}>
        <div className={InterviewStyle.cardcontainer1}>
          <div className={InterviewStyle.childbox1}>
            <FontAwesomeIcon icon={faCalendarDays} />
          </div>
          <div className={InterviewStyle.childbox1text}>Upcoming Event</div>
        </div>
        <div className={InterviewStyle.cardcontainer1}>
          <div className={InterviewStyle.childbox2}>
            <FontAwesomeIcon icon={faCalendarXmark} />
          </div>
          <div className={InterviewStyle.childbox2text}>Meeting Cancelled</div>
        </div>
        <div className={InterviewStyle.cardcontainer1}>
          <div className={InterviewStyle.childbox3}>
            <FontAwesomeIcon icon={faCalendarCheck} />
          </div>
          <div className={InterviewStyle.childbox3text}>Meeting Done</div>
        </div>
      </div>
      <div className={InterviewStyle.table_container}>
        <div className={InterviewStyle.table_border}>
          <div className={InterviewStyle.table_wrapper}>
            <Table bordered hover className={InterviewStyle.custom_table}>
              <thead>
                <tr>
                  <th className={InterviewStyle.table_header}>Name</th>
                  <th className={InterviewStyle.table_header}>Type</th>
                  <th className={InterviewStyle.table_header}>Date</th>
                  <th className={InterviewStyle.table_header}>Time</th>
                  <th className={InterviewStyle.table_header}>Location</th>
                  <th className={InterviewStyle.table_header}></th>
                  <th className={InterviewStyle.table_header}></th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Write Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="feedback">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendEmail}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InterviewScheduled;
