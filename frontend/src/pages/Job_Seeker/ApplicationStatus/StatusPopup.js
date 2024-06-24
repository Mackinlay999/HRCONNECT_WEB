import React from "react";
import { useNavigate } from "react-router-dom";
import ApplicationStyle from "./Application.module.css";
import inProgressICON from "../../../Assets/inProgress__IMG.png";
import ShortListedICON from "../../../Assets/Shorlisted_img.png";
import NOTShortListedICON from "../../../Assets/NOTShorlisted_img.png";
function StatusPopup({ popupType, CbTogglePopup, jobStatus }) {
  const navigateTO = useNavigate();

  const calculateDate = (dateString) => {
    if (dateString) {
      const monthObj = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
      };
      const date = new Date(dateString);
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return (
        <span className={ApplicationStyle.Status__poupBox_date}>
          {day < 10 ? "0" + day : day} {monthObj[month]}{" "}
        </span>
      );
    }
  };
  return (
    <div className={ApplicationStyle.Status__poupMainContainer}>
      <div className={ApplicationStyle.Status__poupBox}>
        <h2 className={ApplicationStyle.Status__poupBox_Heading}>
          Your Application status
        </h2>

        {popupType === "In-Progress" && (
          <>
            <div
              className={`${ApplicationStyle.Status__poupBox_PosterBox} ${ApplicationStyle.Status__poupBox_InProgress_PosterBox}`}
            >
              <img
                src={inProgressICON}
                alt="Application-In-Progress"
                className={`${ApplicationStyle.Status__poupBox_Poster} `}
              />
            </div>
            <h3 className={ApplicationStyle.Status__poupBox_SecondaryHeading}>
              We're reviewing your application{" "}
            </h3>
            <h4 className={ApplicationStyle.Status__poupBox_TertiaryHeading}>
              Thanks for applying. We'll review and consider your application.
              You can check back later to see how things are going.{" "}
            </h4>
          </>
        )}

        {popupType === "Shortlisted" && (
          <>
            <div
              className={`${ApplicationStyle.Status__poupBox_PosterBox} ${ApplicationStyle.Status__poupBox_Shortlisted_PosterBox}`}
            >
              <img
                src={ShortListedICON}
                alt="Application-Shortlisted"
                className={`${ApplicationStyle.Status__poupBox_Poster} ${ApplicationStyle.Status__poupBox_SecondaryPoster}`}
              />
            </div>
            <h3 className={ApplicationStyle.Status__poupBox_SecondaryHeading}>
              Congratulations you are shortlisted
            </h3>
            <h4 className={ApplicationStyle.Status__poupBox_TertiaryHeading}>
              You're one step closer to joining our team. We have a few more
              steps in our hiring process.
            </h4>
          </>
        )}

        {popupType === "Not-Shortlisted" && (
          <>
            <div
              className={`${ApplicationStyle.Status__poupBox_PosterBox} ${ApplicationStyle.Status__poupBox_Not_Shortlisted_PosterBox}`}
            >
              <img
                src={NOTShortListedICON}
                alt="Application-Shortlisted"
                className={`${ApplicationStyle.Status__poupBox_Poster} ${ApplicationStyle.Status__poupBox_SecondaryPoster}`}
              />
            </div>
            <h3 className={ApplicationStyle.Status__poupBox_SecondaryHeading}>
              We're reviewing your application We've decided not to move forward
              with your application.
            </h3>
            <h4 className={ApplicationStyle.Status__poupBox_TertiaryHeading}>
              Our decision was based on the qualifications of other candidates.
              We appreciate your interest and encourage you to apply for other
              positions at our company.
            </h4>
          </>
        )}

        <ul className={ApplicationStyle.Status__poupBox_StatusTimeLineList}>
          <li
            className={`${ApplicationStyle.Status__StatusTimeLineListItem} ${
              jobStatus?.some(
                (data) =>
                  data.StatusText.toLowerCase() === "Applied".toLowerCase()
              ) && ApplicationStyle.completedStep
            }`}
          >
            Applied
            {calculateDate(
              jobStatus.filter((data) => data.StatusText === "Applied")[0]
                ?.updatedAt
            )}
          </li>

          <li
            className={`${ApplicationStyle.Status__StatusTimeLineListItem} ${
              jobStatus?.some(
                (data) =>
                  data.StatusText.toLowerCase() ===
                  "Application Sent".toLowerCase()
              ) && ApplicationStyle.completedStep
            }`}
          >
            Application Sent
            {calculateDate(
              jobStatus.filter(
                (data) => data.StatusText === "Application Sent"
              )[0]?.updatedAt
            )}
          </li>

          <li
            className={`${ApplicationStyle.Status__StatusTimeLineListItem} ${
              jobStatus?.some(
                (data) =>
                  data.StatusText.toLowerCase() ===
                  "Application Viewed".toLowerCase()
              ) && ApplicationStyle.completedStep
            }`}
          >
            Application Viewed
            {calculateDate(
              jobStatus.filter(
                (data) => data.StatusText === "Application Viewed"
              )[0]?.updatedAt
            )}
          </li>

          <li
            className={`${ApplicationStyle.Status__StatusTimeLineListItem} ${
              jobStatus?.some(
                (data) =>
                  data.StatusText.toLowerCase() ===
                  "Resume Viewed".toLowerCase()
              ) && ApplicationStyle.completedStep
            }`}
          >
            Resume Viewed
            {calculateDate(
              jobStatus.filter((data) => data.StatusText === "Resume Viewed")[0]
                ?.updatedAt
            )}
          </li>

          {jobStatus.every(
            (data) =>
              data.JobStatus.toLocaleLowerCase() ===
              "In-Progress".toLocaleLowerCase()
          ) && (
            <li className={`${ApplicationStyle.Status__StatusTimeLineListItem}`}>
              Waiting for recruiter
            </li>
          )}

          {jobStatus.some(
            (data) =>
              data.JobStatus.toLocaleLowerCase() ===
              "Shortlisted".toLocaleLowerCase()
          ) && (
            <li
              className={`${ApplicationStyle.Status__StatusTimeLineListItem} ${ApplicationStyle.completedStep}  ${ApplicationStyle.Shortlisted} `}
            >
              Shortlisted
              {calculateDate(
                jobStatus.filter(
                  (data) =>
                    data.JobStatus.toLocaleLowerCase() ===
                    "Shortlisted".toLocaleLowerCase()
                )[0]?.updatedAt
              )}
            </li>
          )}

          {jobStatus.some(
            (data) =>
              data.JobStatus.toLocaleLowerCase() ===
              "Not-Shortlisted".toLocaleLowerCase()
          ) && (
            <li
              className={`Status__StatusTimeLineListItem completedStepNotSelected Status__StatusTimeLineListItemNotSelected`}
            >
              Not-Shortlisted
              {calculateDate(
                jobStatus.filter(
                  (data) =>
                    data.JobStatus.toLocaleLowerCase() ===
                    "Not-Shortlisted".toLocaleLowerCase()
                )[0]?.updatedAt
              )}
            </li>
          )}
        </ul>

        <button
          className={ApplicationStyle.Status_popupbuttons}
          onClick={() => CbTogglePopup(false)}
        >
          OK, GOT IT
        </button>
        <button
          className={ApplicationStyle.Status_popupbuttons}
          onClick={() => navigateTO("/dashboard")}
        >
          Browse jobs at HRConnect
        </button>
        <span className={ApplicationStyle.Status_popupBottomMSG}>
          HR Connect is proud to be an equal opportunity workplace and is an
          affirmative action employer
        </span>
      </div>
    </div>
  );
}

export default StatusPopup;
