import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import UserDashBoardStyle from "./Detailedview.module.css";
import { IoCloseOutline } from "react-icons/io5";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CalculateTimeAgo } from "../../Common-Components/TimeAgo";
import fresherImage from "./images/mdi_book-education-outline.png";
import drop from "./images/Vector.png";
import fav_icon from "./images/favoutite.png";
import money from "./images/money-stack.png";
import location from "./images/ep_location.png";
import starLogo from "./images/star.png";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../Common-Components/Loaders/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  handleSavedJob,
  handleRemoveSavedJob,
} from "../../../Redux/ReduxSlice";

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL

export default function JobListDetailedView() {
  const { email, savedJob, appliedJob } = useSelector(
    (state) => state.Assessment.currentUser
  );
  const dispatch = useDispatch();

  const [allJobsData, setAllJobData] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [jobDetailsLoad, setJobDetailsLoad] = useState(false);
  const [IsLoading, setLoading] = useState(false);
  const { id } = useParams();

const handleView = async () =>{
  try {
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const jobId = segments[segments.length - 1]; 

    const email = localStorage.getItem('email');
    axios.post(`${baseUrl}/jobs/update-job-views/${jobId}?userEmail=${email}`);

  } catch (error) {
    console.error('Error updating job views:', error);
  }

}


  const loadJobDetails = (e, jobID) => {
    setJobDetailsLoad(true);
    axios
      .get(`${baseUrl}/jobs/job/${jobID}`)
      .then((response) => {
        if (response.data.success) {
          setJobDetails(response.data.jobs);
          console.log(response.data.jobs)
          setJobDetailsLoad(false);
        } else {
          setJobDetails([]);
          setJobDetailsLoad(false);
        }
      })
      .catch((error) => {
        toast.error(
          `Check your internet connection and try again ${error.message}`
        );
        setJobDetailsLoad(false);
      });
  };

  const handleSaveToLaterClick = (e, item) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/user/My-jobs/create/save-job`, {
        ...item,
        email,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(`${response.data.msg}`);
          dispatch(handleSavedJob(item._id));
        } else {
          toast.error(`${response.data.msg}`);
        }
      })
      .catch((error) => {
        toast.error(`server failed! Try again ${error.message}`);
      });
  };

  const handleRemoveSaveClick = (e, jobId) => {
    e.preventDefault();
    axios
      .delete(
        `${baseUrl}/user/My-jobs/delete/save-job/${email + "-" + jobId
        }`
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(`${response.data.msg}`);
          dispatch(handleRemoveSavedJob(jobId));
        } else {
          toast.error(`${response.data.msg}`);
        }
      })
      .catch((error) => {
        toast.error(`server failed! Try again ${error.message}`);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch recommended jobs
        const recommendedJobsResponse = await axios.post(`${baseUrl}/recommendations`, { email });
  
        if (recommendedJobsResponse.data.success && recommendedJobsResponse.data.recommendedJobs.length > 0) {
          setAllJobData(recommendedJobsResponse.data.recommendedJobs);
        } else {
          // Fetch all jobs as a fallback
          const allJobsResponse = await axios.get(`${baseUrl}/jobs/All-jobs`);
          if (allJobsResponse.data.success) {
            setAllJobData(allJobsResponse.data.jobs);
          } else {
            setAllJobData([]);
          }
        }
  
        // Fetch job details separately if needed
        const jobDetailsResponse = await axios.get(`${baseUrl}/jobs/job/${id}`);
        if (jobDetailsResponse.data.success) {
          setJobDetails(jobDetailsResponse.data.jobs);
        } else {
          setJobDetails([]);
        }
      } catch (error) {
        toast.error(`Server failed to load! Reload your page: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [email, id]); // Make sure to include all dependencies
    

  
    const targetRef = useRef(null);
  
    const scrollToTop = () => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // navigateTO('/dashboard/profile_details')
    };

     
  return (
    <div
      className={`${UserDashBoardStyle.detailed_view_full_full} mainViewDetailsPage`}
      ref={targetRef}
    >
      {IsLoading ? (
        <Loader />
      ) : (
        <Container>
          <Row className={UserDashBoardStyle.detailed_view_row_style}>
            <Col xxl={3} xl={3} lg={3} md={4}>
              {allJobsData.map((item) => (
                <NavLink
                  to={`/dashboard/${item._id}`}
                  className={UserDashBoardStyle.detailed_view_full_small}
                  key={item._id}
                  onClick={(e) => loadJobDetails(e, item._id)}
                >
                  <div onClick={handleView}>
                  <div className={UserDashBoardStyle.detailed_view_full}>
                    <div
                      className={`${UserDashBoardStyle.detail_list_view_full}
                   ${item._id === id && UserDashBoardStyle.selected}`}
                    >
                      <div className={UserDashBoardStyle.detail_list_view}>
                        <div
                          className={UserDashBoardStyle.detail_company_detail}
                        >
                          <div
                            className={
                              UserDashBoardStyle.detail_company_logo_Container
                            }
                          >
                            <img
                              src={item.jobPoster}
                              alt={item.jobTitle}
                              className={UserDashBoardStyle.detail_company_logo}
                            />
                          </div>

                          <div
                            className={
                              UserDashBoardStyle.detail_company_job_desc
                            }
                          >
                            <h6
                              className={
                                UserDashBoardStyle.detail_company_job_title
                              }
                            >
                              {item.jobTitle.slice(0, 10)}...
                            </h6>
                            <h6
                              className={
                                UserDashBoardStyle.detail_company_job_time
                              }
                            >
                              <CalculateTimeAgo time={item.createdAt} />
                            </h6>
                            <div
                              className={
                                UserDashBoardStyle.detail_company_offer
                              }
                            >
                              <img
                                src={money}
                                alt={"money_icon"}
                                className={
                                  UserDashBoardStyle.detail_company_logo_money
                                }
                              />
                              {item.salaryRange} LPA
                              <span
                                className={
                                  UserDashBoardStyle.detail_company_logo_money_month
                                }
                              ></span>
                            </div>
                          </div>
                        </div>

                        <div
                          className={
                            UserDashBoardStyle.detail_company_offer_apply
                          }
                        >
                          <div
                            className={
                              UserDashBoardStyle.detail_company_offer_fav
                            }
                          >
                            <img
                              src={fav_icon}
                              alt="Favorite Icon"
                              className={
                                UserDashBoardStyle.detail_company_offer_fav_image
                              }
                            />
                          </div>
                          <div
                            className={
                              UserDashBoardStyle.detail_company_offer_apply_button
                            }
                          >
                            <button
                              className={
                                UserDashBoardStyle.detail_company_offer_apply_button_style
                              }
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>

                      <div
                        className={
                          UserDashBoardStyle.detail_company_location_details
                        }
                      >
                        <div
                          className={
                            UserDashBoardStyle.detail_company_location_details_job
                          }
                        >
                          <img
                            src={location}
                            alt={"location"}
                            className={
                              UserDashBoardStyle.detail_company_location_logo
                            }
                          />
                          <h6
                            className={
                              UserDashBoardStyle.detail_company_location_name
                            }
                          >
                            {item.location}
                          </h6>
                        </div>

                        <div className={UserDashBoardStyle.detail_company_exp}>
                          <img
                            src={fresherImage}
                            alt={"fresherImage"}
                            className={UserDashBoardStyle.detail_exp_logo}
                          />
                          <h6 className={UserDashBoardStyle.detail_exp_name}>
                            {item.jobExperience}
                          </h6>
                        </div>

                        <div
                          className={UserDashBoardStyle.detail_company_exp_time}
                        >
                          <img
                            src={drop}
                            alt={"drop"}
                            className={UserDashBoardStyle.detail_exp_logo_time}
                          />
                          <h6
                            className={UserDashBoardStyle.detail_exp_name_time}
                          >
                            {item.employmentType}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </NavLink>
              ))}
            </Col>

            <Col xxl={6} xl={6} lg={6} md={5}>
              <div className={UserDashBoardStyle.detail_job_view_company_full}>
                {jobDetailsLoad ? (
                  <Loader />
                ) : (
                  <>
                    <div className={UserDashBoardStyle.detail_job_link_part}>
                      <Link
                        to="/dashboard"
                        className={UserDashBoardStyle.close_button}
                      >
                        <IoCloseOutline />
                      </Link>
                    </div>
                    <div
                      className={UserDashBoardStyle.company_background_image}
                      style={{
                        backgroundImage: `url(${jobDetails?.jobPoster})`,
                      }}
                    >
                      <div
                        className={
                          UserDashBoardStyle.detail_company_logo_user_Container
                        }
                      >
                        <img
                          src={jobDetails?.jobPoster}
                          alt={jobDetails?.jobTitle}
                          className={
                            UserDashBoardStyle.detail_company_logo_user
                          }
                        />
                      </div>
                    </div>

                    <div className={UserDashBoardStyle.company_title}>
                      {jobDetails?.jobTitle}
                    </div>

                    <div className={UserDashBoardStyle.company_location}>
                      {jobDetails?.location}
                    </div>

                    <div className={UserDashBoardStyle.border_style}></div>

                    <div className={UserDashBoardStyle.company_description}>
                      <div
                        className={UserDashBoardStyle.company_description_title}
                      >
                        Description
                      </div>
                      <div
                        className={
                          UserDashBoardStyle.company_description_requirement
                        }
                      >
                        {jobDetails?.jobDescription}
                      </div>
                    </div>
                    <div className={UserDashBoardStyle.company_skill}>
                      <div className={UserDashBoardStyle.company_skill_title}>
                        Skills Required
                      </div>
                      <div className={UserDashBoardStyle.company_skill_list}>
                        <ul
                          className={
                            UserDashBoardStyle.company_skill_list_display
                          }
                        >
                          {jobDetails?.skilRequired?.map((skill, index) => {
                            return (
                              <li
                                key={index}
                                className={
                                  UserDashBoardStyle.company_skill_list_display_Item
                                }
                              >
                                {skill.name}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>

                    <div className={UserDashBoardStyle.company_salary}>
                      <div className={UserDashBoardStyle.company_salary_title}>
                        Salary
                      </div>

                      <div className={UserDashBoardStyle.company_salary_offer}>
                        {jobDetails?.salaryRange} LPA
                      </div>
                    </div>

                    {jobDetails?.education && (
                      <div className={UserDashBoardStyle.company_education}>
                        <div
                          className={UserDashBoardStyle.company_education_title}
                        >
                          Education
                        </div>

                        <div
                          className={UserDashBoardStyle.company_education_offer}
                        >
                          {jobDetails?.education}
                        </div>
                      </div>
                    )}

                    {jobDetails?.responsibility && (
                      <div
                        className={UserDashBoardStyle.company_responsibilities}
                      >
                        <div
                          className={
                            UserDashBoardStyle.company_responsibilities_title
                          }
                        >
                          Responsibilities
                        </div>

                        <div
                          className={
                            UserDashBoardStyle.company_responsibilities_offer
                          }
                        >
                          {jobDetails?.responsibility}
                        </div>
                      </div>
                    )}

                    <div className={UserDashBoardStyle.company_how_apply}>
                      <div
                        className={UserDashBoardStyle.company_how_apply_title}
                      >
                        How To Apply
                      </div>

                      <div
                        className={UserDashBoardStyle.company_how_apply_offer}
                      >
                        {jobDetails?.howToApply}
                      </div>
                    </div>
                    <div className={UserDashBoardStyle.company_apply_button}>
                      {appliedJob?.some(
                        (data) => data.jobID === jobDetails?._id
                      ) ? (
                        <button
                          className={UserDashBoardStyle.alreadyAppliedButton}
                        >
                          Already Applied
                        </button>
                      ) : (
                        <Link
                          className={
                            UserDashBoardStyle.company_apply_button_one
                          }
                          to={'/dashboard/profile_details'}
                          state={jobDetails}
                          // onClick={(e) => handleApplyButtonClick(e, jobDetails)}
                          onClick={()=>scrollToTop()}
                        >
                          APPLY
                        </Link>
                      )}
                    </div>

                    {appliedJob?.every(
                      (data) => data.jobID !== jobDetails?._id
                    ) && (
                        <div
                          className={UserDashBoardStyle.company_save_later_button}
                        >
                          {savedJob?.some(
                            (data) => data.jobID === jobDetails?._id
                          ) ? (
                            <button
                              className={
                                UserDashBoardStyle.company_apply_button_two
                              }
                              onClick={(e) =>
                                handleRemoveSaveClick(e, jobDetails?._id)
                              }
                            >
                              Remove save
                            </button>
                          ) : (
                            <button
                              className={
                                UserDashBoardStyle.company_apply_button_two
                              }
                              onClick={(e) =>
                                handleSaveToLaterClick(e, jobDetails)
                              }
                            >
                              SAVE FOR LATER
                            </button>
                          )}
                        </div>
                      )}
                  </>
                )}
              </div>
            </Col>

            <Col xxl={3} xl={3} lg={3} md={3}>
              <div className={UserDashBoardStyle.company_location_details}>
                <div className={UserDashBoardStyle.company_location_map}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.8919182852333!2d2.0837716!3d41.3547029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a499dd66e8a9ed%3A0x77d319df67d291b!2sJumpYard%20Barcelona!5e0!3m2!1sen!2sin!4v1712922634844!5m2!1sen!2sin"
                    width="100%"
                    height="350"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="JumpYard Barcelona Location"
                    className={UserDashBoardStyle.company_location_map_design}
                  ></iframe>
                </div>

                <div className={UserDashBoardStyle.company_about}>
                  <div className={UserDashBoardStyle.company_about_section}>
                    <div
                      className={UserDashBoardStyle.company_about_section_title}
                    >
                      About
                    </div>

                    <div className={UserDashBoardStyle.company_about_desc}>
                      {jobDetails?.about}
                    </div>

                    {/*  review section starts  */}
                    <div className={UserDashBoardStyle.company_review}>
                      <div className={UserDashBoardStyle.company_review_title}>
                        Review & Reviews
                      </div>

                      <div className={UserDashBoardStyle.company_summary_title}>
                        Summary
                      </div>

                      <div className={UserDashBoardStyle.company_summary_style}>
                        <div
                          className={
                            UserDashBoardStyle.company_summary_progress
                          }
                        >
                          <ul
                            className={
                              UserDashBoardStyle.company_summary_progress_fun
                            }
                          >
                            {[5, 4, 3, 2, 1].map((value, index) => {
                              let width;
                              let orangeWidth;
                              let grayWidth;

                              switch (value) {
                                case 5:
                                  orangeWidth = "100%";
                                  grayWidth = "0%";
                                  width = "100%";
                                  break;
                                case 4:
                                  orangeWidth = "75%";
                                  grayWidth = "25%";
                                  width = "100%";
                                  break;
                                case 3:
                                  orangeWidth = "50%";
                                  grayWidth = "50%";
                                  width = "100%";
                                  break;
                                case 2:
                                  orangeWidth = "25%";
                                  grayWidth = "75%";
                                  width = "100%";
                                  break;
                                case 1:
                                  orangeWidth = "10%";
                                  grayWidth = "90%";
                                  width = "100%";
                                  break;
                                default:
                                  orangeWidth = "0%";
                                  grayWidth = "100%";
                                  width = "100%";
                              }

                              return (
                                <li key={index}>
                                  <div
                                    className={UserDashBoardStyle.ratingNumber}
                                  >
                                    {value}
                                  </div>
                                  <button
                                    className={
                                      UserDashBoardStyle.company_summary_progress_border
                                    }
                                    style={{
                                      width: width,
                                      position: "relative",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: orangeWidth,
                                        backgroundColor: "orange",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        width: grayWidth,
                                        backgroundColor: "rgba(0, 0, 0, 0.06)",
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                      }}
                                    ></div>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className={UserDashBoardStyle.company_rating_star}>
                          <div
                            className={UserDashBoardStyle.company_rating_rating}
                          >
                            <div
                              className={
                                UserDashBoardStyle.company_rating_rating_data
                              }
                            >
                              {jobDetails?.rating}
                            </div>

                            <span
                              className={UserDashBoardStyle.review_star_gap}
                            >
                              <img
                                src={starLogo}
                                alt={"starLogo"}
                                className={UserDashBoardStyle.review_star}
                              />
                            </span>
                          </div>

                          <div
                            className={UserDashBoardStyle.company_review_full}
                          >
                            {jobDetails?.review} Reviews
                          </div>

                          <div
                            className={UserDashBoardStyle.company_review_rec}
                          >
                            {jobDetails?.recommended}%
                          </div>

                          <div
                            className={
                              UserDashBoardStyle.company_review_Recommended
                            }
                          >
                            Recommended
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
