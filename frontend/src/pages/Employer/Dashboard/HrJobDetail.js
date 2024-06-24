import React, { useState, useEffect } from "react";
import axios from "axios";
import hrdashboard from './HrDashboard.module.css'
import { FaRegBookmark } from "react-icons/fa";
import ApplicantsDetails from "./ApplicantsDetails.js"
import { io } from "socket.io-client"
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
const newUrl = process.env.REACT_APP_BACKEND_BASE_URL_WITHOUT_API;
const HrJobDetail = ({ jobId, ShowApplicantDetails, CbToggleDetails }) => {
  const socket = io(`${newUrl}`)
  const [job, setJob] = useState(null);
  const [selectedUser, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/jobs/job/${jobId}`);
        const selectedJob = response.data.jobs;
        setJob(selectedJob);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchData();
  }, [jobId]);

  const handleUserCardClick = (e, userEmail, userJobID, jobTitle) => {
    e.preventDefault();
    CbToggleDetails(true);
    setUsers(userEmail)

    // update the application status of the user in the applied collection
    axios.patch(`${baseUrl}/user/My-jobs/applicationStatus/${userEmail}`, {
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
          userEmail: userEmail,
          NotificatioNText: `Your application for ${jobTitle} has been viewed by hr`,
          notificationStatus: 'Unread',
          updatedAt: Date.now()
        }));
      }
    })
  }
  return (
    <>
      <div className={hrdashboard._jobDetails} key={job && job._id}>
        <h2>{job && job.jobTitle} needed.</h2>
        <p>{job && job.jobDescription}</p>
        <p style={{ paddingTop: "20px", fontSize: "18px" }}>
          <strong>Requirements</strong>
          <p style={{ textAlign: 'justify' }}>{job && job.responsibility}</p>
        </p>

        <div className={hrdashboard.hr_job_detail_skill_container_main}>
          <p style={{ color: "rgba(255, 184, 0, 1)", fontWeight: '800' }}> Skills :</p>
          <div className={hrdashboard.hr_job_detail_skill_container}>
            <ul>
              {job && job.skilRequired.map((skill) => (
                <li key={skill.index} className={hrdashboard.hr_job_detail_skill}>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={hrdashboard.hr_job_detail_location}>
          <div className={hrdashboard.__jobLeftSection} style={{ display: 'flex' }}>
            <p className={hrdashboard.hr_job_detail_location_childrens}>
              Location -
              <span style={{ paddingLeft: ".5em" }}>
                <strong>{job && job.location}</strong>
              </span>
            </p>
            <p className={hrdashboard.hr_job_detail_location_childrens}>
              Type -
              <span style={{ paddingLeft: ".5em" }}>
                <strong>{job && job.employmentType}</strong>
              </span>
            </p>
          </div>
          <p className={hrdashboard.hr_job_detail_location_childrens}>
            Salary :
            <span style={{ paddingLeft: ".5em" }}>
              <strong>{job && job.salaryRange} LPA</strong>
            </span>
          </p>
        </div>
      </div>

      {
        ShowApplicantDetails ? <ApplicantsDetails CbToogleDetails={CbToggleDetails} jobData={job} selectedUser={selectedUser} /> : <div className={hrdashboard.__appliedUserList}>
          {
            job?.appliedBy?.map((user) => {
              return (
                <div className={hrdashboard.__appliedUsers} key={user._id} onClick={(e) => handleUserCardClick(e, user?.email, user?.jobID, user?.jobTitle)}>
                  <div className={hrdashboard.__appliedHeader}>
                    <img className={hrdashboard.__userPF} src={user.profileImage ?? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg'} alt="" onError={(e) => { e.target.src = `https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg`; e.onError = null; }} />
                    <section>
                      <span style={{ fontSize: '20px' }}><strong>{user.name}</strong></span>
                      <p style={{ fontSize: '15px', overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>{user.biography}</p>
                    </section>
                    <FaRegBookmark className={hrdashboard.__bookmark} style={{ fontSize: '20px' }} />
                  </div>
                  <div className={hrdashboard.__appliedBody}>
                    <span>Location - <strong>{user.location}</strong></span>
                    <span>Type - <strong>{user.employmentType}</strong></span>
                  </div>
                  <div>
                    <h6>Skills</h6>
                    <div className={hrdashboard.__appliedSkills}>
                      {
                        user.skills?.map(skill => {
                          return (
                            <span key={skill._id}>{skill.name}</span>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      }
    </>
  );
};

export default HrJobDetail;
