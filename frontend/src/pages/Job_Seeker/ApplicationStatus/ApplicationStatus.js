import React, { useEffect, useState } from "react";
import ApplicationStyle from "./Application.module.css";
import { CalculateTimeAgo } from "../../Common-Components/TimeAgo";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { GiProgression } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

import { MdOutlineCheck } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import axios from "axios";
import Loader from "../../Common-Components/Loaders/Loader";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import locationICON from "../../../Assets/ep_location.png";
import expICON from "../../../Assets/mdi_book-education-outline.png";
import empTypeICON from "../../../Assets/Vector.png";
import StatusPopup from "./StatusPopup";
const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

function ApplicationStatus() {
  const { pathname } = useLocation();
  const navigateTO = useNavigate();

  useEffect(() => {
    if (pathname === "/application") {
      navigateTO(`/application/${"In-Progress"}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className={ApplicationStyle.ApplicationStatus__mainContainer}>
      <nav className={ApplicationStyle.ApplicationStatus__navBar}>
        <NavLink
          to={"/application/In-Progress"}
          className={({ isActive }) =>
            isActive
              ? ApplicationStyle.active
              : ApplicationStyle.ApplicationStatus__navBar_Item
          }
        >
          <GiProgression
            className={ApplicationStyle.ApplicationStatus__navBar_Item_ICON}
          />
          In-Progress
        </NavLink>

        <NavLink
          to={"/application/Shortlisted"}
          className={({ isActive }) =>
            isActive
              ? ApplicationStyle.active
              : ApplicationStyle.ApplicationStatus__navBar_Item
          }
        >
          <span
            className={ApplicationStyle.ApplicationStatus__navBar_Item_ICON_Box}
          >
            <MdOutlineCheck />
          </span>
          Shortlisted
        </NavLink>

        <NavLink
          to={"/application/Not-Shortlisted"}
          className={({ isActive }) =>
            isActive
              ? ApplicationStyle.active
              : ApplicationStyle.ApplicationStatus__navBar_Item
          }
        >
          <span
            className={
              ApplicationStyle.ApplicationStatus__navBar_Item_ICON_SecondaryBox
            }
          >
            <RxCross2 />
          </span>
          Not-Shortlisted
        </NavLink>
      </nav>

      <div className={ApplicationStyle.__outletContainer}>
        <Outlet />
      </div>
    </div>
  );
}

function Status() {
  const { pathname } = useLocation();
  const { email } = useSelector((state) => state.Assessment.currentUser);
  const [IsLoading, setLoading] = useState(false);
  const [appliedJOB, setAppliedJOB] = useState([]);
  const [FilterAppliedJOB, setFilterAppliedJOB] = useState([]);
  const [SelectedJobStatus, setSelectedJobStatus] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showFeedbackPopup, setshowFeedbackPopup] = useState(false);
  const { status } = useParams();

  const handleViewStatusClick = (e, jobStatus) => {
    e.preventDefault();
    setSelectedJobStatus(jobStatus);
    setShowPopup(true);
  };
  const handleViewFeedbackClick = (e, jobTitle) => {
    e.preventDefault();
    setSelectedJobStatus(jobTitle);
    setshowFeedbackPopup(true);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/user/My-jobs/get/apply-job/${email}`)
      .then((response) => {
        if (response.data.success) {
          setAppliedJOB(response.data.appliedJob);
          setFilterAppliedJOB(
            response.data.appliedJob.filter((data) =>
              data.applicationStatus.every(
                (statusData) =>
                  statusData.JobStatus.toLowerCase() ===
                  pathname.split("/")[2].toLowerCase()
              )
            ).sort((a, b) => b.createdAt - a.createdAt)
          );
          setLoading(false);
        } else {
          setAppliedJOB([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`Something went wrong : ${error.message}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filterJob;
    if (pathname === "/application/In-Progress") {
      filterJob = appliedJOB?.filter((data) =>
        data.applicationStatus.every(
          (status) =>
            status.JobStatus.toLowerCase() === "In-Progress".toLocaleLowerCase()
        )
      );
    }

    if (pathname === "/application/Shortlisted") {
      filterJob = appliedJOB?.filter((data) =>
        data.applicationStatus.some(
          (status) =>
            status.JobStatus.toLowerCase() === "Shortlisted".toLocaleLowerCase()
        )
      );
    }

    if (pathname === "/application/Not-Shortlisted") {
      filterJob = appliedJOB?.filter((data) =>
        data.applicationStatus.some(
          (status) =>
            status.JobStatus.toLowerCase() ===
            "Not-Shortlisted".toLocaleLowerCase()
        )
      );
    }

    setFilterAppliedJOB(filterJob);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {IsLoading ? (
        <Loader />
      ) : (
        <>
          {FilterAppliedJOB?.length > 0 ? (
            <>
              {FilterAppliedJOB?.map((data, index) => {
                return (
                  <div
                    key={data._id + index}
                    className={ApplicationStyle.JobStatus_Card_BOX}
                  >
                    <div className={ApplicationStyle.JobStatus_Card_BOX_TOP}>
                      <div className={ApplicationStyle.CardBox_jobProfileBox}>
                        <div className={ApplicationStyle.CardBox_jobPoster}>
                          <img
                            src={data?.jobPoster}
                            alt={`${data?.jobTitle}-Poster`}
                            width={"100%"}
                            height={"100%"}
                          />
                        </div>
                        <p className={ApplicationStyle.CardBox_JObTitle}>
                          <span className={ApplicationStyle.CardBox_Title}>
                            {data.jobTitle.slice(0, 24)}...
                          </span>
                          Applied <CalculateTimeAgo time={data.createdAt} />
                        </p>
                      </div>

                      <p className={ApplicationStyle.CardBox_jobSalaryRange}>
                        <FcMoneyTransfer
                          className={
                            ApplicationStyle.CardBox_jobSalaryRangeICON
                          }
                        />
                        {data.salaryRange} LPA
                      </p>

                      <div
                        className={ApplicationStyle.CardBox_job_ButtonContainer}
                      >
                        {pathname !== "/application/In-Progress" && (
                          <button
                            type="button"
                            className={`${ApplicationStyle.CardBox_job_Buttons} ${ApplicationStyle.CardBox_job_FeedbackButton}`}
                            onClick={(e) =>
                              handleViewFeedbackClick(e, data?.jobTitle)
                            }
                          >
                            View Feedback
                          </button>
                        )}

                        <button
                          type="button"
                          className={`${ApplicationStyle.CardBox_job_Buttons} ${pathname === "/application/In-Progress" &&
                            ApplicationStyle.CardBox_job_Buttons_InProgress
                            } ${pathname === "/application/Shortlisted" &&
                            ApplicationStyle.CardBox_job_Buttons_shortListed
                            } ${pathname === "/application/Not-Shortlisted" &&
                            ApplicationStyle.CardBox_job_Buttons_NOTshortListed
                            }`}
                          onClick={(e) =>
                            handleViewStatusClick(e, data.applicationStatus)
                          }
                        >
                          View Status
                        </button>
                      </div>
                    </div>

                    <div className={ApplicationStyle.JobStatus_Card_BOX_BOTTOM}>
                      <p className={ApplicationStyle.CardBox__InfoBox}>
                        <img
                          src={locationICON}
                          alt="ICON"
                          className={ApplicationStyle.CardBox__jobInfoICON}
                        />
                        {data?.location}
                      </p>

                      <p className={ApplicationStyle.CardBox__InfoBox}>
                        <img
                          src={expICON}
                          alt="ICON"
                          className={ApplicationStyle.CardBox__jobInfoICON}
                        />
                        {data?.jobExperience}
                      </p>

                      <p className={ApplicationStyle.CardBox__InfoBox}>
                        <img
                          src={empTypeICON}
                          alt="ICON"
                          className={ApplicationStyle.CardBox__jobInfoICON}
                        />
                        {data?.employmentType}
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {status === "In-Progress" && (
                <p className={ApplicationStyle.NoDataMsg}>
                  You don't have any applications currently in progress.
                  <Link
                    to={"/dashboard"}
                    className={ApplicationStyle.SearchJobsButton}
                  >
                    Search Jobs
                  </Link>
                </p>
              )}
              {status === "Shortlisted" && (
                <p className={ApplicationStyle.NoDataMsg}>
                  No applications shortlisted yet
                  <Link
                    to={"/application/In-Progress"}
                    className={ApplicationStyle.SearchJobsButton}
                  >
                    Check Status
                  </Link>
                </p>
              )}
              {status === "Not-Shortlisted" && (
                <p className={ApplicationStyle.NoDataMsg}>
                  You haven't received any rejections for your applications.
                  <Link
                    to={"/application/In-Progress"}
                    className={ApplicationStyle.SearchJobsButton}
                  >
                    Check Status
                  </Link>
                </p>
              )}
            </>
          )}
        </>
      )}

      {showPopup && (
        <StatusPopup
          popupType={status}
          CbTogglePopup={setShowPopup}
          jobStatus={SelectedJobStatus}
        />
      )}

      {showFeedbackPopup && (
        <FeedbackPopup
          PositionTitle={SelectedJobStatus}
          CbTogglePopup={setshowFeedbackPopup}
          FeedbackFor={status}
        />
      )}
    </>
  );
}

const FeedbackPopup = ({ PositionTitle, CbTogglePopup, FeedbackFor }) => {
  return (
    <div className={ApplicationStyle.FeedbackPopup_Container}>

      {
        <div className={ApplicationStyle.FeedbackPopup_Box}>
          <h1 className={ApplicationStyle.FeedbackPopup_closeButtonBox}>
            <RxCross2
              className={ApplicationStyle.FeedbackPopup_closeButton}
              onClick={() => CbTogglePopup(false)}
            />
          </h1>
          {
            FeedbackFor === "Shortlisted" ? <p className={ApplicationStyle.FeedbackPopup_FeedbackText}>
              🎉 Congratulations! You've been shortlisted for <strong>{PositionTitle}</strong> position. ! Your
              skills and experience are impressive, and we're excited to learn more
              about you during the upcoming interview rounds. 🚀
            </p> : <p className={ApplicationStyle.FeedbackPopup_FeedbackText}>
              🙁 Thank you for applying for  <strong>{PositionTitle}</strong>  position. While we appreciate your interest, we regret to inform you that you haven't been shortlisted. We encourage you to keep pursuing opportunities that match your skills and experience. Best wishes! 🌟
            </p>
          }
        </div>
      }
    </div>

  );
};

export default ApplicationStatus;
export { Status };
