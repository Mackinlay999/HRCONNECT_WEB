import React, { useEffect, useState } from "react";
import axios from "axios";
import hrdashboard from "../../Dashboard/HrDashboard.module.css";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";


import { GiTireIronCross } from "react-icons/gi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { io } from "socket.io-client"
import { handleBookmark, handleRemoveBookmark } from "../../../../Redux/ReduxSlice";
import ViewPdf from "../../Dashboard/ViewPdf";
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
const newUrl = process.env.REACT_APP_BACKEND_BASE_URL_WITHOUT_API;

function GenericApplicantView({ jobData, selectedUser, CbToogleDetails }) {
  const socket = io(`${newUrl}`)
  const { bookmarkUser } = useSelector((state) => state.Assessment.currentUser);
  const dispatch = useDispatch();
  const [selectedUserEmail, setSelectedUserEmail] = useState(selectedUser);
  const [userDetails, setUserDetails] = useState([]);
  console.log(userDetails);
  const [ShowPDF, SetshowPDF] = useState(false);
  const [SelectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    setUserDetails(
      jobData?.appliedBy?.filter((data) => data.email === selectedUserEmail)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserEmail]);

  const handleToggleCardActive = (e, email, jobTitle, userJobID) => {
    // Set the selected user email
    setSelectedUserEmail(email);


    // update the application status of the user in the applied collection
    axios.patch(`${baseUrl}/user/My-jobs/applicationStatus/${email}`, {
      applicationStatus: {
        JobStatus: 'In-Progress',
        StatusText: 'Application Viewed',
        updatedAt: Date.now()
      },
      userJobID
    }).then((response) => {
      if (response.data.status) {
        // Sending the notification to the user
        socket.emit("HrSendNotification", JSON.stringify({
          userEmail: email,
          NotificatioNText: `Your application for ${jobTitle} has been viewed by hr`,
          notificationStatus : 'Unread',
          updatedAt: Date.now()
        }));
      }
    })

    const clickedCard = e.currentTarget;

    clickedCard.classList.add(`${hrdashboard.__active_appliedUsers}`);
    if ( clickedCard.classList.contains(`${hrdashboard.__active_appliedUsers}`)) {
      document.querySelectorAll(".appliedUserCard").forEach((card) => {
        if (card !== clickedCard) {
          card.classList.remove(`${hrdashboard.__active_appliedUsers}`);
        }
      });
    }
  };

  const handleSeeResumeClick = (e, user) => {
    e.preventDefault();

    // update the application status of the user in the applied collection
    axios.patch(`${baseUrl}/user/My-jobs/applicationStatus/${user?.email}`, {
      applicationStatus: {
        JobStatus: "In-Progress",
        StatusText: "Resume Viewed",
        updatedAt: Date.now(),
      },
      userJobID: user?.jobID,
    }).then((response) => {
      if (response.data.status) {
        // Sending the notification to the user
        socket.emit("HrSendNotification", JSON.stringify({
          userEmail: user?.email,
          NotificatioNText: `Your Resume for ${user?.jobTitle} has been viewed by hr`,
          notificationStatus : 'Unread',
          updatedAt: Date.now()
        }));
      }
    })

    SetshowPDF(true);
    setSelectedResume({
      userProfile: user?.profileImage,
      userResume: user?.resume[0],
    });
  };

  const handleUserBookmark = (e, user) => {
    e.preventDefault();
    dispatch(
      handleBookmark({
        email: user.email,
        jobTitle: user.jobTitle,
      })
    );
    axios.post(`${baseUrl}/user/bookmarkd/create-bookamark/${localStorage.getItem('email')}`, user).then((response) => {
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    }).catch((error) => {
      toast.error(`${error.message}`)
    })
  };

  const handleRemoveUserBookmark = (e, user) => {
    e.preventDefault();
    dispatch(
      handleRemoveBookmark({
        email: user.email,
        jobTitle: user.jobTitle,
      })
    );
    axios.delete(`${baseUrl}/user/bookmarkd/delete-bookmark/${localStorage.getItem('email')}-${user.email}-${user.jobTitle}`).then((response) => {
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    }).catch((error) => {
      toast.error(`${error.message}`)
    })
  };

  return (
    <>
      <h1 className={hrdashboard.__applicationDetails_Header}>
        Applicant's Details{" "}
        <GiTireIronCross
          className={hrdashboard.__applicationDetails_CloseButton}
          onClick={() => CbToogleDetails(false)}
        />
      </h1>
      <div className={hrdashboard.__applicationDetailsContainer}>
        <div className={hrdashboard.__applicantDetails__ListBox}>
          {jobData?.appliedBy?.map((user) => {
            return (
              <div
                className={`appliedUserCard ${hrdashboard.__appliedUsers} ${hrdashboard.__Secondary_appliedUsers
                  } ${user.email === selectedUser &&
                  hrdashboard.__active_appliedUsers
                  }`}
                key={user._id}
                onClick={(e) => handleToggleCardActive(e, user.email, user?.jobTitle, user?.jobID
                )}
              >
                <div className={hrdashboard.__appliedHeader}>
                  <img
                    className={hrdashboard.__userPF}
                    src={
                      user.profileImage ??
                      "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                    }
                    alt=""
                    onError={(e) => {
                      e.target.src = `https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg`;
                      e.onError = null;
                    }}
                  />
                  <section>
                    <span style={{ fontSize: "20px" }}>
                      <strong>{user.name}</strong>
                    </span>
                    <p style={{ fontSize: "15px" }}>{user.biography}</p>
                  </section>
                  {/* bookmark here */}
                  <FaRegBookmark style={{ fontSize: "20px" }} />
                </div>
                <div className={hrdashboard.__appliedBody}>
                  <span>
                    Location - <strong>{user.location}</strong>
                  </span>
                  <span>
                    Type - <strong>{user.employmentType}</strong>
                  </span>
                </div>
                <div>
                  <h6>Skills</h6>
                  <div className={hrdashboard.__appliedSkills}>
                    {user.skills
                      ?.filter((data, index) => index < 3)
                      .map((skill, index) => {
                        return <span key={skill._id}>{skill.name}</span>;
                      })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={hrdashboard.__applicantDetails_Container}>
          {userDetails?.map((user) => {
            return (
              <div className={hrdashboard.__applicantDetails} key={user._id}>
                <div className={hrdashboard.__appliedHeader}>
                  <img
                    className={hrdashboard.__userPF}
                    src={
                      user.profileImage ??
                      "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                    }
                    alt=""
                    onError={(e) => {
                      e.target.src = `https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg`;
                      e.onError = null;
                    }}
                  />
                  <span style={{ fontSize: "20px" }}>
                    <strong>{user.name}</strong>
                  </span>
                  {bookmarkUser?.some(
                    (data) =>
                      data.email === user.email && data.job_title === user.jobTitle
                  ) ? (
                    <FaBookmark
                      className={hrdashboard.__bookmark}
                      onClick={(e) => handleRemoveUserBookmark(e, user)}
                    />
                  ) : (
                    <FaRegBookmark
                      className={hrdashboard.__bookmark}
                      onClick={(e) => handleUserBookmark(e, user)}
                    />
                  )}
                </div>
                <p style={{ textAlign: "justify" }}>{user.biography}</p>
                <div className={hrdashboard.__applicantPlace}>
                  <span>
                    State - <strong>{user.state}</strong>
                  </span>
                  <span>
                    Country - <strong>{user.country}</strong>
                  </span>
                </div>
                <div>
                  <h6>Skills</h6>
                  <div className={hrdashboard.__appliedSkills}>
                    {user.skills?.map((skill) => {
                      return <span key={skill._id}>{skill.name}</span>;
                    })}
                  </div>
                </div>
                <>
                  <h6>Appilcant Note :</h6>
                  {user.note ?? "N/A"}
                </>
                <div className={hrdashboard.__applicantButtons}>
                  <button
                    className={hrdashboard.__applicantBtn}
                    onClick={(e) => handleSeeResumeClick(e, user)}
                  >
                    See Resume
                  </button>

                  <button
                    className={hrdashboard.__applicantBtn}
                    style={{ background: "blue", padding: "0 4em" }}
                  >
                    Schedule Interview
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {ShowPDF && (
          <ViewPdf CbTogglePDF={SetshowPDF} SelectedResume={SelectedResume} />
        )}
      </div>
    </>
  );
}

export default GenericApplicantView;
