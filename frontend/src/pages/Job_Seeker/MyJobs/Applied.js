import React, { useEffect, useState } from "react";
import JobStyle from "../MyJobs/Job.module.css";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Loader from "../../Common-Components/Loaders/Loader"
import { useSelector } from 'react-redux'
import toast from "react-hot-toast";
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
const Applied = () => {
  const { email } = useSelector((state) => state.Assessment.currentUser);
  const navi = useNavigate()
  const [applied_jobs, setAppliedJobs] = useState([]);
  const [IsLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${baseUrl}/user/My-jobs/get/apply-job/${email}`).then((response) => {
      if (response.data.success) {
        setAppliedJobs(response.data.appliedJob);
        setIsLoading(false)
      } else {
        setAppliedJobs([]);
        setIsLoading(false)
      }
    }).catch((error) => {
      setIsLoading(false)
      toast.error(`Server failed to load, Realod your page : ${error.message}`)
    })
  }, [email])
  return (
    <>
      {IsLoading ? <Loader /> : <>
        {
          applied_jobs.map((item) => {
            return <div className={JobStyle.company_box} key={item._id}>
              <div className={JobStyle.saved_job_box}>
                <div className={JobStyle.company_job_profile}>
                  <img src={item.jobPoster} alt="comp_logo" />
                  <div className={JobStyle.job_position}>
                    <h5>{item.jobTitle}</h5>
                    <p>{item.createdAt}</p>
                  </div>
                </div>
                <div className={JobStyle.lpa_box}>
                  <i
                    className="fa-solid fa-money-check-dollar"
                    style={{ color: "#067418" }}
                  ></i>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>{item.salaryRange} </span>
                  <span style={{ color: "#9595b4", fontSize: "14px" }}>
                    LPA
                  </span>
                </div>
                <div className={JobStyle.apply_box}>
                  <button className={JobStyle.btn_applied}>APPLIED</button>
                </div>
              </div>
              <div className={JobStyle.location_box}>
                <div className={JobStyle.req_1}>
                  <i
                    className="fa-solid fa-location-dot"
                    style={{ color: "black" }}
                  ></i>

                  {item.location}
                </div>
                <div className={JobStyle.req_1}>
                  <div>
                    <i
                      className="fa-solid fa-envelope-open-text"
                      style={{ color: "black" }}
                    ></i>
                  </div>
                  {item.jobExperience}
                </div>
                <div className={JobStyle.req_1}>
                  <div>
                    <i
                      className="fa-solid fa-droplet"
                      style={{ color: "black" }}
                    ></i>
                  </div>
                  {item.employmentType}
                </div>
              </div>
            </div>
          })
        }
      </>

      }
      {applied_jobs.length === 0 && !IsLoading &&
        <><p>You have not applied for any jobs. Find and grab the opportunity now !</p>
          <button className={JobStyle.find_job_btn} onClick={() => navi('/')}>Find Jobs !</button></>
      }
    </>
  );
};

export default Applied;