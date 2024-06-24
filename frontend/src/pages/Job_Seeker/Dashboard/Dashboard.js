import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashBoardStyle from "./DashboardMain.module.css";
import JobSeekerSwiper from "./Job_Swiper";
import fav_icon from "./images/favoutite.png";
import fav_filled_icon from "./images/Filled_favoutite.png";
import money from "./images/money-stack.png";
import location from "./images/ep_location.png";
import fresherImage from "./images/mdi_book-education-outline.png";
import drop from "./images/Vector.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../Common-Components/Loaders/Loader";
import { CalculateTimeAgo } from "../../Common-Components/TimeAgo";
import { useSelector, useDispatch } from "react-redux";
import {
  handleSavedJob,
  handleRemoveSavedJob,
} from "../../../Redux/ReduxSlice";
import {fetchUserData}  from "../../../Redux/UserSlice";
function Dashboard() {
  const { email, savedJob, appliedJob } = useSelector(
    (state) => state.Assessment.currentUser
  );

  const dispatch = useDispatch();
  const [allJobsData, setAllJobData] = useState([]);
  const [BestMatch, setBestmatch] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigateTO = useNavigate();
  const [selectedSort, setSelectedSort] = useState("Sort By");
  const { FilterOptions, SearchOptions } = useSelector((state) => state.Filter);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
  
        // Fetch recommended jobs
        const recommendedJobsResponse = await axios.post(
          `${baseUrl}/recommendations`,
          { email }
        );
  
        if (recommendedJobsResponse.data.success && recommendedJobsResponse.data.recommendedJobs.length > 0) {
          // Set both BestMatch and allJobsData to recommended jobs
          setBestmatch(recommendedJobsResponse.data.recommendedJobs);
          setAllJobData(recommendedJobsResponse.data.recommendedJobs);
        } else {
          // Fetch all jobs if no recommended jobs found
          const allJobsResponse = await axios.get(`${baseUrl}/jobs/All-jobs`);
          if (allJobsResponse.data.success) {
            setBestmatch(allJobsResponse.data.jobs);
            setAllJobData(allJobsResponse.data.jobs);
          }
        }
  
        dispatch(fetchUserData(email));
        setLoading(false);
      } catch (error) {
        toast.error("Server failed to load! Reload your page");
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, [email, dispatch, baseUrl]);

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
        `${baseUrl}/user/My-jobs/delete/save-job/${
          email + "-" + jobId
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

  const loadFilteredData = () => {
    let FilteredData = BestMatch.filter(
      (job) =>
        FilterOptions?.JobType.some(
          (data) => job.employmentType.toLowerCase() === data.toLowerCase()
        ) ||
        FilterOptions?.JobCategory.some(
          (data) => job.employmentType === data
        ) ||
        FilterOptions?.JobLevel.some((data) => job.jobExperience === data) ||
        FilterOptions.SalaryRange.some((data) => {
          return (
            Number(data.split("-")[0]) >=
              Number(job.salaryRange.split("-")[0]) &&
            Number(data.split("-")[1]) <= Number(job.salaryRange.split("-")[1])
          );
        }) ||
        FilterOptions.SalaryRange.some((data) => {
          return Number(job.salaryRange.split("+")[0]) >= 15;
        })
    );
    setAllJobData(FilteredData);
  };

  useEffect(() => {
    if (
      FilterOptions?.JobCategory?.length > 0 ||
      FilterOptions?.JobLevel?.length > 0 ||
      FilterOptions?.JobType?.length > 0 ||
      FilterOptions?.SalaryRange.length > 0
    ) {
      loadFilteredData();
    } else {
      setAllJobData(BestMatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    FilterOptions.JobCategory,
    FilterOptions.JobLevel,
    FilterOptions.JobType,
    FilterOptions.SalaryRange,
  ]);

  useEffect(() => {
    if (SearchOptions.Location || SearchOptions.searchText) {
      let FilteredData = BestMatch.filter((job) =>
        job.location.includes(SearchOptions.Location.trim())
      ).filter(
        (job) =>
          job.jobTitle
            .toLowerCase()
            .includes(SearchOptions.searchText.trim().toLowerCase()) ||
          job.employmentType
            .toLowerCase()
            .includes(SearchOptions.searchText.trim().toLowerCase()) ||
          job?.skilRequired?.some((skil) =>
            skil.name
              .toLowerCase()
              .includes(SearchOptions.searchText.trim().toLowerCase())
          ) ||
          job?.location
            .toLowerCase()
            .includes(SearchOptions.searchText.trim().toLowerCase())
      );
      setAllJobData(FilteredData);
    } else {
      setAllJobData(BestMatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SearchOptions.searchText, SearchOptions.Location]);

  const handleSortBy = (e) => {
    setSelectedSort(e.target.value);
    const sorted = [...BestMatch];
    setAllJobData(sorted);
    switch (e.target.value) {
      case "latest":
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "name":
        sorted.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
        break;
      case "city":
        sorted.sort((a, b) => a.location.localeCompare(b.location));
        break;
      default:
        break;
    }
  };

  return (
    <section className={DashBoardStyle.userDahboard_MainContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={DashBoardStyle.inner_dashboard}>
          <div className={DashBoardStyle.title_sort}>
            <Container>
              <Row className="justify-content-evenly">
                <Col xxl={12}>
                  <div className={DashBoardStyle.title_total}>
                    <div className={DashBoardStyle.title_dashboard}>
                      <h1 className={DashBoardStyle.title_name}>Dashboard</h1>
                    </div>
                    <div className={DashBoardStyle.__dropdown}>
                      <select
                        className={DashBoardStyle.selectOption}
                        value={selectedSort}
                        onChange={handleSortBy}
                      >
                        <option className={DashBoardStyle.options} value="">
                          Sort By
                        </option>
                        <option value="latest">Latest</option>
                        <option value="name">Name</option>
                        <option value="city">City</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="justify-content-evenly">
                <Col xxl={12}>
                  <div className={DashBoardStyle.jobList_total}>
                    <div className={DashBoardStyle.matches_seeAll}>
                      <div className={DashBoardStyle.match_title}>
                        Best Matches for you
                      </div>
                    </div>

                    <div className={DashBoardStyle.matched_job}>
                      <JobSeekerSwiper
                        allJobs={BestMatch.toSorted(
                          (a, b) => a.createdAt - b.createdAt
                        )}
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="justify-content-evenly">
                <Col xxl={12}>
                  <div className={DashBoardStyle.rec_seeAll}>
                    <div className={DashBoardStyle.rec_title}>
                      Recommended Jobs
                    </div>
                  </div>
                  {allJobsData.length === 0 ? (
                    <h2 className={DashBoardStyle.EmptyJoBMSG}>No Job</h2>
                  ) : (
                    <>
                      {allJobsData.map((item) => (
                        <div
                          className={DashBoardStyle.rec_list_view_full}
                          key={item._id}
                        >
                          <div className={DashBoardStyle.rec_list_view}>
                            <div className={DashBoardStyle.rec_company_detail}>
                              <div
                                className={
                                  DashBoardStyle.rec_company_logoContainer
                                }
                              >
                                <img
                                  src={item.jobPoster}
                                  alt={"amazon_image"}
                                  className={DashBoardStyle.rec_company_logo}
                                />
                              </div>
                              <div
                                className={DashBoardStyle.rec_company_job_desc}
                              >
                                <h6
                                  className={
                                    DashBoardStyle.rec_company_job_title
                                  }
                                >
                                  {item.jobTitle}
                                </h6>
                                <h6
                                  className={
                                    DashBoardStyle.rec_company_job_time
                                  }
                                >
                                  <CalculateTimeAgo time={item.createdAt} />
                                </h6>
                              </div>
                            </div>
                            <div className={DashBoardStyle.rec_company_offer}>
                              <img
                                src={money}
                                alt={"money_icon"}
                                className={
                                  DashBoardStyle.rec_company_logo_money
                                }
                              />
                              {item.salaryRange} LPA
                              <span
                                className={
                                  DashBoardStyle.rec_company_logo_money_month
                                }
                              ></span>
                            </div>
                            <div
                              className={DashBoardStyle.rec_company_offer_apply}
                            >
                              {appliedJob?.every(
                                (data) => data.jobID !== item?._id
                              ) && (
                                <div
                                  className={
                                    DashBoardStyle.rec_company_offer_fav
                                  }
                                >
                                  {savedJob?.some(
                                    (data) => data.jobID === item?._id
                                  ) ? (
                                    <img
                                      src={fav_filled_icon}
                                      alt="Favorite Icon"
                                      className={
                                        DashBoardStyle.rec_company_offer_fav_image
                                      }
                                      onClick={(e) =>
                                        handleRemoveSaveClick(e, item?._id)
                                      }
                                    />
                                  ) : (
                                    <img
                                      src={fav_icon}
                                      alt="Favorite Icon"
                                      className={
                                        DashBoardStyle.rec_company_offer_fav_image
                                      }
                                      onClick={(e) =>
                                        handleSaveToLaterClick(e, item)
                                      }
                                    />
                                  )}
                                </div>
                              )}

                              <div
                                className={
                                  DashBoardStyle.rec_company_offer_apply_button
                                }
                              >
                                {appliedJob?.some(
                                  (data) => data.jobID === item?._id
                                ) ? (
                                  <button
                                    className={
                                      DashBoardStyle.DashboardalreadyAppliedButton
                                    }
                                    onClick={() =>
                                      navigateTO(`/dashboard/${item._id}`)
                                    }
                                  >
                                    Applied
                                  </button>
                                ) : (
                                  <button
                                    className={
                                      DashBoardStyle.rec_company_offer_apply_button_style
                                    }
                                    onClick={() =>
                                      navigateTO(`/dashboard/${item._id}`)
                                    }
                                  >
                                    Apply
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          <div
                            className={
                              DashBoardStyle.rec_company_location_details
                            }
                          >
                            <div
                              className={
                                DashBoardStyle.rec_company_location_details_job
                              }
                            >
                              <img
                                src={location}
                                alt={"location"}
                                className={
                                  DashBoardStyle.rec_company_location_logo
                                }
                              />
                              <h6
                                className={
                                  DashBoardStyle.rec_company_location_name
                                }
                              >
                                {item.location}
                              </h6>
                            </div>

                            <div className={DashBoardStyle.rec_company_exp}>
                              <img
                                src={fresherImage}
                                alt={"fresherImage"}
                                className={DashBoardStyle.rec_exp_logo}
                              />
                              <h6 className={DashBoardStyle.rec_exp_name}>
                                {item.jobExperience}
                              </h6>
                            </div>

                            <div
                              className={DashBoardStyle.rec_company_exp_time}
                            >
                              <img
                                src={drop}
                                alt={"drop"}
                                className={DashBoardStyle.rec_exp_logo_time}
                              />
                              <h6 className={DashBoardStyle.rec_exp_name_time}>
                                {item.employmentType}
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
