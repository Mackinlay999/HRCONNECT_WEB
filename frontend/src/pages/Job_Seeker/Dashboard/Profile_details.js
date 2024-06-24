import React, { useEffect, useState } from "react";
import Profile_style from "./Profile_style.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CancelPopup from "./CancelPopup/CancelPopup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  handleAppliedJob,
  handleRemoveSavedJob,
} from "../../../Redux/ReduxSlice";
import Loader from "../../Common-Components/Loaders/Loader";
import { fetchJobDetails } from "../../../Redux/JobSlice";
import { io } from "socket.io-client";
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
const Profile_details = () => {
  const socket = io("https://mackinlay-hrconnectweb.onrender.com");
  const [start_popup, setstart_popup] = useState(false);
  const [cancelpopup, setcancelpopup] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const navigateTO = useNavigate();
  const dispatch = useDispatch();
  const Job = useLocation().state;

  const email = localStorage.getItem("email");
  const [userData, setuserData] = useState([]);
  const [name, setname] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/user?email=${email}`);
      setuserData(response.data.userDetails);
      setname(response.data.userDetails.name.split(" "));
    };
    fetchData();
  }, [email]);

  const getFirstResumeFilename = () => {
    if (userData.resume && userData.resume.length > 0) {

      const resumesData=userData.resume;
      const sortedResumes = resumesData.sort(
        (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
      );

      return sortedResumes[0].filename;
    }
    return null; // Return null if no resume data is available
  };

  const firstResumeFilename = getFirstResumeFilename();
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const AppliedDate = `${day < 10 ? "0" : ""}${day}-${
    month < 10 ? "0" : ""
  }${month}-${year}`;

  const formatISODateForInput = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0]; // Extract and format YYYY-MM-DD
  };

  // const handleApply = (e, item) => {
  //   e.preventDefault();
  //   console.log(item)
  //   dispatch(fetchJobDetails(item._id || " "));
  //   if (Job.mcq.length !== 0) {     //if there will be any skill test mcq questions for user then it will be true
  //     if (!cancelpopup && !start_popup) {
  //       setstart_popup(!start_popup);
  //     }
  //   }
  //   else {
  //     e.preventDefault();
  //     axios
  //       .post(`${baseUrl}/user/My-jobs/create/apply-job`, {
  //         ...item,
  //         userData,
  //         email,
  //         AppliedDate,
  //         applicationStatus: [
  //           {
  //             JobStatus: 'In-Progress',
  //             StatusText: 'Applied',
  //             updatedAt: Date.now()
  //           }, {
  //             JobStatus: 'In-Progress',
  //             StatusText: 'Application Sent',
  //             updatedAt: Date.now()
  //           }
  //         ]
  //       })
  //       .then((response) => {
  //         if (response.data.success) {
  //           toast.success(`${response.data.msg}`);
  //           socket.emit("HrSendNotification", JSON.stringify({
  //             userEmail: item?.employeeEmail,
  //             NotificatioNText: `${userData?.name} applied for ${item?.jobTitle} job role.`,
  //             notificationStatus : 'Unread',
  //             updatedAt: Date.now()
  //           }));
  //           dispatch(handleAppliedJob(item._id));
  //           dispatch(handleRemoveSavedJob(item._id));
  //           setIsLoading(false);
  //           navigateTO(-1)
  //         } else {
  //           toast.error(`${response.data.msg}`);

  //           dispatch(fetchJobDetails(item._id || " "));
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error(`server failed! Try again ${error.message}`);

  //         setIsLoading(false);
  //       });
  //   }
  // };

  const handleApply = async (e, item) => {
    e.preventDefault();
    setIsApplying(true);

    try {
      console.log(item);
      await dispatch(fetchJobDetails(item._id || " ")); // Ensure dispatch is awaited if it returns a promise

      if (Job.mcq.length !== 0) {
        // Ensure Job is defined
        if (!cancelpopup && !start_popup) {
          setstart_popup(!start_popup);
        }
      } else {
        e.preventDefault();

        const applicationPayload = {
          ...item,
          firstResumeFilename,
          userData,
          email,
          AppliedDate,
          applicationStatus: [
            {
              JobStatus: "In-Progress",
              StatusText: "Applied",
              updatedAt: Date.now(),
            },
            {
              JobStatus: "In-Progress",
              StatusText: "Application Sent",
              updatedAt: Date.now(),
            },
          ],
        };

        try {
          const response = await axios.post(
            `${baseUrl}/user/My-jobs/create/apply-job`,
            applicationPayload
          );

          if (response.data.success) {
            toast.success(`${response.data.msg}`);
            socket.emit(
              "HrSendNotification",
              JSON.stringify({
                userEmail: item?.employeeEmail,
                NotificatioNText: `${userData?.name} applied for ${item?.jobTitle} job role.`,
                notificationStatus: "Unread",
                updatedAt: Date.now(),
              })
            );
            dispatch(handleAppliedJob(item._id));
            dispatch(handleRemoveSavedJob(item._id));
            setIsLoading(false);
            setIsApplying(false); // Fix variable name to match setIsApplying
            navigateTO(-1);
          } else {
            toast.error(`${response.data.msg}`);
            dispatch(fetchJobDetails(item._id || " "));
          }
        } catch (error) {
          toast.error(`Server failed! Try again. ${error.message}`);
          setIsApplying(false); // Fix variable name to match setIsApplying
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error from handleApply");
    } finally {
      setIsApplying(false);
    }
  };

  const handleCancel = () => {
    // setstart_popup(!start_popup)
    setcancelpopup(!cancelpopup);
  };
  return (
    <>
      {IsLoading ? (
        <Loader />
      ) : (
        <>
          {userData && (
            <>
              <div
                className={
                  start_popup
                    ? `${Profile_style.start_assesment_popup}`
                    : `${Profile_style.start_assesment_popup_hide}`
                }
              >
                <div
                  className={Profile_style.fa_xmark_2}
                  onClick={handleCancel}
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>

                <div className={Profile_style.start_quiz_des}>
                  <div className={Profile_style.check_logo}>
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3>Success</h3>
                  <p>
                    Congratulations, you are one step closer to complete your
                    application
                  </p>
                  <Link
                    to={cancelpopup ? "" : "/skill-assesment-instructions"}
                    state={Job}
                    className={Profile_style.start_assesment_btn}
                  >
                    Start Assesment
                  </Link>
                </div>
              </div>
              {cancelpopup && <CancelPopup />}
              <div
                className={
                  start_popup
                    ? `${Profile_style.profile_blur_container}`
                    : `${Profile_style.profile_main_container}`
                }
              >
                <form className={Profile_style.form_container}>
                  <div className={Profile_style.fa_xmark}>
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => navigateTO(-1)}
                    ></i>
                  </div>

                  {/* <h2>Basic Details</h2> */}
                  <div className={Profile_style.name_section}>
                    <div className={Profile_style.input_name_container}>
                      <label htmlFor="firstname">First Name</label>
                      <input
                        type="text"
                        id="firstname"
                        value={name[0] || ""}
                        readOnly
                      />
                    </div>
                    <div className={Profile_style.input_name_container}>
                      <label htmlFor="lastname">Last Name</label>
                      <input
                        type="text"
                        id="lastname"
                        value={name[1] || ""}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className={Profile_style.email_box}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={userData.email || ""}
                      readOnly
                    />
                    <div className={Profile_style.input_container}>
                      <label htmlFor="resume">Upload Resume *</label>
                      <input
                        type="text"
                        id="resume"
                        value={firstResumeFilename || ""}
                        readOnly
                      />
                    </div>
                    <div className={Profile_style.input_container}>
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        value={userData.website || ""}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className={Profile_style.basic_details_box}>
                    <div className={Profile_style.left_basic_details}>
                      <div className={Profile_style.input_container}>
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input
                          type="number"
                          id="phonenumber"
                          value={userData.phone_number || ""}
                          readOnly
                        />
                      </div>

                      <div className={Profile_style.input_container}>
                        <label htmlFor="country">Country</label>
                        <input
                          type="text"
                          id="country"
                          value={userData.country || ""}
                          readOnly
                        />
                      </div>
                      <div className={Profile_style.input_container}>
                        <label htmlFor="gender">Gender</label>
                        <input
                          type="text"
                          id="gender"
                          value={userData.gender || ""}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className={Profile_style.right_basic_details}>
                      <div className={Profile_style.input_container}>
                        <label htmlFor="DOB">Date of Birth</label>
                        <input
                          type="date"
                          id="DOB"
                          value={formatISODateForInput(userData.dob) || ""}
                          readOnly
                        />
                      </div>
                      <div className={Profile_style.input_container}>
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          id="state"
                          value={userData.state || ""}
                          readOnly
                        />
                      </div>
                      <div className={Profile_style.input_container}>
                        <label htmlFor="marital">Marital Status</label>
                        <input
                          type="text"
                          id="marital"
                          value={userData.marital_status || ""}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <h2>Education Details</h2>
                  <br />
                  <div className={Profile_style.name_section}>
                    <div className={Profile_style.input_name_container}>
                      <label htmlFor="course">Course</label>
                      <input
                        type="text"
                        id="course"
                        value={userData.course || ""}
                        readOnly
                      />
                    </div>
                    <div className={Profile_style.input_name_container}>
                      <label htmlFor="specialization">Specialization</label>
                      <input
                        type="text"
                        id="specialization"
                        value={userData.course || ""}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className={Profile_style.name_section}>
                    <div className={Profile_style.input_name_container}>
                      <label htmlFor="university">University</label>
                      <input
                        type="text"
                        id="university"
                        value={userData.college || ""}
                        readOnly
                      />
                    </div>
                    <div className={Profile_style.input_name_container}>
                      <label htmlFor="percentage">Percentage</label>
                      <input
                        type="text"
                        id="percentage"
                        value={`${userData.percentage}%` || ""}
                        readOnly
                      />
                    </div>
                  </div>
                  <h2>Work Experience (Optional)</h2>
                  <br />
                  <div className={Profile_style.name_section}>
                    <div className={Profile_style.input_name_container}>
                      <label htmlFor="company">Title</label>
                      <input
                        type="text"
                        id="company"
                        value={userData.job_title || ""}
                        readOnly
                      />
                      <label htmlFor="start">Start Date</label>
                      <input
                        type="date"
                        id="start"
                        value={
                          formatISODateForInput(userData.company_start_date) ||
                          ""
                        }
                        readOnly
                      />
                    </div>
                    <div className={Profile_style.input_name_container}>
                      <label htmlFor="experience">Company Name</label>
                      <input
                        type="text"
                        id="experience"
                        value={userData.company || ""}
                        readOnly
                      />
                      <label htmlFor="end">End Date</label>
                      <input
                        type="date"
                        id="end"
                        value={
                          formatISODateForInput(userData.company_end_date) || ""
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className={Profile_style.biography_section}>
                    <div className={Profile_style.input_biography_container}>
                      <label htmlFor="biography">Biography</label>
                      <input
                        type="text"
                        id="biography"
                        value={userData.biography || ""}
                        readOnly
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={Profile_style.save_apply_btn}
                    onClick={(e) => handleApply(e, Job)}
                    disabled={isApplying}
                  >
                    {isApplying? "Job Applying..." : "APPLY JOB"}
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile_details;
