import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import google from "../../../../Assets/Google Logo.jpg";
import linkedin from "../../../../Assets/linkedin logo.jpg";
import apple from "../../../../Assets/Apple logo.jpg";
import axios from "axios";
import signupStyle from "../Signup.module.css";
import { useDispatch } from "react-redux";
import { handleUserLogin } from "../../../../Redux/ReduxSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import 'animate.css';

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
const newUrl = process.env.REACT_APP_BACKEND_BASE_URL_WITHOUT_API;

const Signup = () => {
  const dispatchTO = useDispatch();
  const [stillWorking, setStillWorking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isOtpResend, setIsOtpResend] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    resume: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    phone_number: "",
    dob: "",
    country: "",
    state: "",
    showPassword1: false,
    showPassword2: false,
    college: "",
    course: "",
    course_start_date: "",
    course_end_date: "",
    percentage: "",
    job_title: "",
    company: "",
    company_start_date: "",
    company_end_date: "",
    userType: "user",
    step: 1, // Initial step
  });
console.log(formData);
  const nav = useNavigate();

  const currentYear = new Date().getFullYear();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle special fields separately
    if (name === "dob") {
      setFormData({ ...formData, dob: value });
    } else if (name === "course_start_date") {
      setFormData({ ...formData, course_start_date: value });
    } else if (name === "course_end_date") {
      setFormData({ ...formData, course_end_date: value });
    } else if (name === "company_start_date") {
      setFormData({ ...formData, company_start_date: value });
    } else if (name === "company_end_date") {
      setFormData({ ...formData, company_end_date: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log("Form details", formData);
  };

  const handleOtpInputChange = (index, value) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtpInputs = [...otpInputs];
      newOtpInputs[index] = value;
      setOtpInputs(newOtpInputs);
      // Move focus to the next input field
      if (value !== "" && index < otpInputs.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && otpInputs[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone_number: phone });
    console.log("Phone number updated", phone);
  };

  const toggleShowPassword = (fieldName) => {
    setFormData({ ...formData, [fieldName]: !formData[fieldName] });
  };

  const handleResumeChange = (e) => {
    // Update the 'resume' state with the selected file
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const checkPhoneNumberExists = async (phoneNumber) => {
    try {
      const response = await axios.post(`${baseUrl}/checkPhoneNumber`, {
        phoneNumber,
      });
      return response.data.available;
    } catch (error) {
      console.error("Error checking phone number existence:", error);
      return false;
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post(`${baseUrl}/check-email`, { email });
      return response.status === 200 && !response.data.exists;
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false;
    }
  };

  const requestOtp = async () => {
    setIsSendingOtp(true);
    try {
      const emailExists = await checkEmailExists(formData.email);
      if (!emailExists) {
        toast.error("Email already registered");
        return;
      }

      const response = await axios.post(`${baseUrl}/request-otp`, {
        email: formData.email,
      });
      if (response.status === 200) {
        setOtpSent(true);
        toast.success("OTP sent to your email");
        setResendTimer(60);
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleRequestOtp = async () => {
    try {
      const emailExists = await checkEmailExists(formData.email);
      if (!emailExists) {
        toast.error("Email already registered");
        return;
      }

      requestOtp();
      openModal();
    } catch (error) {
      toast.error("Failed to request OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    setIsOtpResend(true);
    try {
      await requestOtp();
    } catch (error) {
      toast.error("Failed to Resend OTP. Please try again.");
    } finally {
      setIsOtpResend(false);
    }
  };

  const handleOtpModalSubmit = async () => {
    const otp = otpInputs.join("");
    setIsVerifyingOtp(true);

    try {
      const response = await axios.post(`${baseUrl}/verify-otp`, {
        email: formData.email,
        otp,
      });
      if (response.status === 200) {
        setIsOtpValid(true);
        toast.success("OTP verified successfully");
        setIsModalOpen(false);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const renderOtpInputs = () => {
    return otpInputs.map((value, index) => (
      <input
        key={index}
        type="text"
        id={`otp-input-${index}`}
        value={value}
        maxLength={1}
        onChange={(e) => handleOtpInputChange(index, e.target.value)}
        onKeyDown={(e) => handleOtpKeyDown(index, e)}
        style={{
          width: "50px",
          height: "50px",
          margin: "5px",
          textAlign: "center",
          fontSize: "20px",
          fontFamily: "roboto",
        }}
      />
    ));
  };

  const nextStep = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Check if the current step requires the resume
      if (formData.step === 1) {
        if (!formData.resume) {
          toast.error("Please upload your resume");
          return;
        } else {
          toast.success("Resume Uploaded Sucessfully");
          setFormData({ ...formData, step: formData.step + 1 });
        }
      }

      if (formData.step === 2) {
        // Check if all required fields are filled
        if (
          !formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.conf_password
        ) {
          toast.error("Please fill in all required fields");
          return;
        }
        // Check if passwords match
        if (formData.password !== formData.conf_password) {
          toast.error("Passwords do not match");
          return;
        }
        const isEmailAvailable = await checkEmailExists(formData.email);
        if (!isEmailAvailable) {
          return;
        } else {
          toast.success("Personal Details Successfully filled");
          setFormData({ ...formData, step: formData.step + 1 });
        }
      }

      if (formData.step === 3) {
        // Check if all required fields are filled
        if (
          !formData.phone_number ||
          !formData.dob ||
          !formData.country ||
          !formData.state
        ) {
          toast.error("Please fill in all required fields");
          return;
        } else {
          // Check if the phone number is available
          const isPhoneAvailable = await checkPhoneNumberExists(
            formData.phone_number
          );
          if (!isPhoneAvailable) {
            toast.error("Phone number is already registered");
            return;
          }

          // Calculate age from date of birth
          const dobDate = new Date(formData.dob);
          const today = new Date();
          let age = today.getFullYear() - dobDate.getFullYear();
          const monthDiff = today.getMonth() - dobDate.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < dobDate.getDate())
          ) {
            age--;
          }

          // Check if age is at least 18
          if (age < 18) {
            toast.error("You must be at least 18 years old to sign up");
            return;
          }

          toast.success("Basic Details Successfully filled");
          setFormData({ ...formData, step: formData.step + 1 });
        }
      }

      if (formData.step === 4) {
        // Check if all required fields are filled
        if (
          !formData.college ||
          !formData.course ||
          !formData.course_start_date ||
          !formData.course_end_date
        ) {
          toast.error("Please fill in all required fields");
          return;
        }

        // Parse start and end dates
        const startDate = new Date(formData.course_start_date);
        const endDate = new Date(formData.course_end_date);

        // Check if start date is greater than end date
        if (startDate >= endDate) {
          toast.error("Start date must be greater than end date");
          return;
        }

        // Check if difference between start and end date is at least one year
        const oneYear = 1000 * 60 * 60 * 24 * 365; // milliseconds in one year
        if (endDate - startDate < oneYear) {
          toast.error(
            "Difference between start and end date must be at least one year"
          );
          return;
        }

        toast.success("Education Details Successfully filled");
        setFormData({ ...formData, step: formData.step + 1 });
      }
    } catch (error) {
      toast.error("Step Error, Debug Needed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.password !== formData.conf_password) {
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    if (!formData.email || !isOtpValid) {
      toast.error("Please enter a valid email and verify OTP");
      setIsSubmitting(false);
      return;
    }
    try {
      const {
        resume,
        name,
        email,
        password,
        phone_number,
        dob,
        country,
        state,
        college,
        course,
        course_start_date,
        course_end_date,
        percentage,
        job_title,
        company,
        company_start_date,
        company_end_date,
        userType,
      } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("phone_number", phone_number);
      formDataToSend.append("dob", dob);
      formDataToSend.append("country", country);
      formDataToSend.append("state", state);
      formDataToSend.append("college", college);
      formDataToSend.append("course", course);
      formDataToSend.append("course_start_date", course_start_date);
      formDataToSend.append("course_end_date", course_end_date);
      formDataToSend.append("percentage", percentage);
      formDataToSend.append("job_title", job_title);
      formDataToSend.append("company", company);
      formDataToSend.append("company_start_date", company_start_date);
      formDataToSend.append("company_end_date", company_end_date);
      formDataToSend.append("resume", resume);
      formDataToSend.append("userType", userType);

      const response = await axios.post(`${baseUrl}/signup`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success response
      const { token, savedJob, appliedJob } = response.data;

      dispatchTO(
        handleUserLogin({ token, email, name, userType, savedJob, appliedJob })
      );
      toast.success(`Welcome ${name}`);
      setTimeout(() => {
        nav("/");
      }, 1500);
    } catch (error) {
      // Handle error response
      if (error.response) {
        console.error("Error:", error.response.data);
        toast.error("Internal Server Error");
      } else {
        console.error("Error:", error.message);
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    nav("/login");
  };

  // Function to calculate the duration between start and end date in months
  const calculateDuration = () => {
    if (formData.company_start_date) {
      const startDate = new Date(formData.company_start_date);
      const endDate = stillWorking
        ? new Date()
        : new Date(formData.company_end_date);
      const diffTime = Math.abs(endDate - startDate);
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)); // Assuming 30 days in a month for simplicity
      return diffMonths;
    }
    return 0;
  };

  // Function to format the duration in months
  const formatDurationMonths = (duration) => {
    const lowerYear = Math.floor(duration / 12);
    const upperYear = lowerYear + 1;
    if (duration % 12 === 0) {
      return `${lowerYear} year${lowerYear !== 1 ? "s" : ""}`;
    } else {
      return `${lowerYear} - ${upperYear} years`;
    }
  };

  const handleGoogleSignup = (userType) => {
    try {
      const googleSignupUrl = `${newUrl}/auth/google?userType=${userType}`;
      window.location.href = googleSignupUrl;
    } catch (error) {
      console.error("Google signup error:", error);
    }
  };

  const handleLinkedInSignup = (userType) => {
    try {
      const linkedInSignupUrl = `${newUrl}/auth/linkedin?userType=${userType}`;
      window.location.href = linkedInSignupUrl;
    } catch (error) {
      console.error("LinkedIn signup error:", error);
    }
  };

  return (
    <>
      {/* first card */}

      <div className={signupStyle.signup_container}>
        {formData.step === 1 && (
          <div className={signupStyle.step_container}>
            <div className={signupStyle.step_flex_container}>
              <div className={signupStyle.step_1_part_1}>
                <h1
                  className={` ${signupStyle.kumar_one_regular} ${signupStyle.step_1_banner_heading_signup}`}
                >
                  WELCOME <br />
                  BACK
                </h1>
                <div className={signupStyle.create_account_name_container}>
                  <h3>Create an Account</h3>
                  <div>
                    To keep connected with us please signup <br /> with your
                    personal info
                  </div>
                </div>
              </div>

              <div className={signupStyle.step_1_part_2}>
                <h3 className={signupStyle.upload_resume_heading}>
                  Upload Resume
                </h3>
                <Form onSubmit={nextStep}>
                  <Form.Group as={Row} className="mb-3 m-lg-3">
                    <Col sm="9">
                      <Form.Control
                        type="file"
                        name="resume"
                        accept="application/pdf"
                        onChange={handleResumeChange}
                        className={signupStyle.resume_handler}
                      />
                    </Col>
                  </Form.Group>
                  <div className={signupStyle.step_button_container}>
                    <Button
                      className={signupStyle.step_button}
                      type="submit"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save and Continue"}
                    </Button>
                  </div>
                </Form>
                <div className={signupStyle.forgot_style1}>
                  <span
                    onClick={handleLogin}
                    style={{
                      cursor: "pointer",
                      fontSize: "16px",
                      fontFamily: "roboto",
                    }}
                  >
                    Already have an account?
                    <span style={{ color: "rgba(35, 88, 251, 1)" }}>
                      Login here
                    </span>
                  </span>
                </div>
                <div style={{ textAlign: "center" }}>OR</div>
                <ul className={signupStyle.login_social_list}>
                  <li className={signupStyle.social_list_item}>
                    <img
                      src={google}
                      alt="network-error"
                      className={signupStyle.social_image_google}
                      onClick={() => handleGoogleSignup(formData.userType)}
                    />
                  </li>

                  <li className={signupStyle.social_list_item}>
                    <img
                      src={linkedin}
                      alt="network-error"
                      className={signupStyle.social_image_linkedin}
                      onClick={() => handleLinkedInSignup(formData.userType)}
                    />
                  </li>

                  <li className={signupStyle.social_list_item}>
                    <img
                      src={apple}
                      alt="network-error"
                      className={signupStyle.social_image}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {formData.step === 2 && (
          <div className={signupStyle.step_container}>
            <div className={signupStyle.step_flex_container}>
              <div className={signupStyle.step_1_part_1}>
                <h1
                  className={` ${signupStyle.kumar_one_regular} ${signupStyle.step_1_banner_heading_signup}`}
                >
                  WELCOME <br />
                  BACK
                </h1>
                <div className={signupStyle.create_account_name_container}>
                  <h3>Create an Account</h3>
                  <div>
                    To keep connected with us please signup <br /> with your
                    personal info
                  </div>
                </div>
              </div>
              <div className={signupStyle.step_2_part_2}>
                <h4
                  style={{
                    paddingBottom: "10px",
                    textAlign: "center",
                    fontFamily: "Oswald",
                    marginLeft: "-2.5rem",
                  }}
                >
                  Personal Information
                </h4>
                <div>
                  <Form className="m-lg-3">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      onChange={handleChange}
                      className={signupStyle.personal_input_field}
                      required
                    />

                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Email Id"
                      onChange={handleChange}
                      className={signupStyle.personal_input_field}
                      required
                    />
                    {!otpSent && formData.email && (
                      <Button
                        onClick={handleRequestOtp}
                        disabled={!formData.email}
                        className={`btn btn-primary btn-lg ${signupStyle.request_otp_button}`}
                      >
                        {isSendingOtp ? "Sending OTP..." : "Verify Email"}
                      </Button>
                    )}

                    <Modal show={isModalOpen} onHide={closeModal} centered>
                      <Modal.Header closeButton>
                        <Modal.Title style={{ fontFamily: "roboto" }}>
                          Please Verify OTP
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {renderOtpInputs()}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                          }}
                        >
                          <Button
                            variant="link"
                            onClick={handleResendOtp}
                            disabled={isOtpResend || resendTimer}
                          >
                            {resendTimer > 0
                              ? `Resend OTP in ${resendTimer}s`
                              : isOtpResend
                              ? "Resending OTP..."
                              : "Resend OTP"}
                          </Button>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleOtpModalSubmit}
                          disabled={isVerifyingOtp}
                          style={{
                            color: "white",
                            background:
                              "linear-gradient(90deg, #0050d1 0%, #00296b 100%)",
                          }}
                        >
                          {isVerifyingOtp ? "Verifying OTP..." : "Verify OTP"}
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <div className={signupStyle.password_container}>
                      <div>
                        <Form.Control
                          type={formData.showPassword1 ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          className={signupStyle.personal_input_field}
                          required
                        />
                      </div>

                      <div>
                        <FontAwesomeIcon
                          icon={formData.showPassword1 ? faEyeSlash : faEye} // Use imported icon variables
                          onClick={() => toggleShowPassword("showPassword1")}
                          style={{ cursor: "pointer" }}
                          className={signupStyle.eye_icon}
                        />
                      </div>
                    </div>

                    <div className={signupStyle.password_container}>
                      <div>
                        <Form.Control
                          type={formData.showPassword2 ? "text" : "password"}
                          name="conf_password"
                          placeholder="Confirm Password"
                          onChange={handleChange}
                          className={signupStyle.personal_input_field}
                          required
                        />
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={formData.showPassword2 ? faEyeSlash : faEye} // Use imported icon variables
                          onClick={() => toggleShowPassword("showPassword2")}
                          style={{ cursor: "pointer" }}
                          className={signupStyle.eye_icon}
                        />
                      </div>
                    </div>
                  </Form>
                </div>
                <div className={signupStyle.step_button_container}>
                  <Button
                    className={signupStyle.step_button}
                    onClick={nextStep}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save and Continue"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {formData.step === 3 && (
          <div className={signupStyle.step_container}>
            <div className={signupStyle.step_flex_container}>
              <div className={signupStyle.step_1_part_1}>
                <h1
                  className={` ${signupStyle.kumar_one_regular} ${signupStyle.step_1_banner_heading_signup}`}
                >
                  WELCOME <br />
                  BACK
                </h1>
                <div className={signupStyle.create_account_name_container}>
                  <h3>Create an Account</h3>
                  <div>
                    To keep connected with us please signup <br /> with your
                    personal info
                  </div>
                </div>
              </div>
              <div className={signupStyle.step_2_part_2}>
                <h4
                  style={{
                    paddingBottom: "10px",
                    textAlign: "center",
                    fontFamily: "Oswald",
                    marginLeft: "-2.5rem",
                  }}
                >
                  Basic Details
                </h4>
                <div>
                  <Form className="m-lg-3">
                    <PhoneInput
                      country={"in"}
                      value={formData.phone_number}
                      onChange={handlePhoneChange}
                      inputProps={{
                        name: "phone_number",
                        required: true,
                        autoFocus: true,
                        placeholder: "Enter Mobile Number",
                      }}
                      containerClass={signupStyle.customPhoneInput}
                      inputClass={signupStyle.customPhoneInputInput}
                    />

                    <DatePicker
                      name="dob"
                      selected={formData.dob}
                      onChange={(date) =>
                        setFormData({ ...formData, dob: date })
                      }
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date("1970-01-01")} // Set minimum date to 1970-01-01
                      maxDate={new Date(currentYear, 11, 31)} // Set maximum date to the last day of the current year
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={44}
                      className={signupStyle.react_date_form_control}
                      placeholderText="DD/MM/YYYY"
                      required
                    />

                    <Form.Control
                      type="text"
                      name="country"
                      placeholder="Select Country"
                      onChange={handleChange}
                      className={signupStyle.personal_input_field}
                      required
                    />

                    <Form.Control
                      type="text"
                      name="state"
                      placeholder="Select State"
                      onChange={handleChange}
                      className={signupStyle.personal_input_field}
                      required
                    />
                  </Form>
                </div>
                <div className={signupStyle.step_button_container}>
                  <Button
                    className={signupStyle.step_button}
                    onClick={nextStep}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save and Continue"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {formData.step === 4 && (
          <div className={signupStyle.step_container}>
            <div className={signupStyle.step_flex_container}>
              <div className={signupStyle.step_1_part_1}>
                <h1
                  className={` ${signupStyle.kumar_one_regular} ${signupStyle.step_1_banner_heading_signup}`}
                >
                  WELCOME <br />
                  BACK
                </h1>
                <div className={signupStyle.create_account_name_container}>
                  <h3>Create an Account</h3>
                  <div>
                    To keep connected with us please signup <br /> with your
                    personal info
                  </div>
                </div>
              </div>
              <div className={signupStyle.step_4_part_2}>
                <h4
                  style={{
                    paddingBottom: "10px",
                    textAlign: "center",
                    fontFamily: "Oswald",
                    marginLeft: "-3.5rem",
                  }}
                >
                  Education Details
                </h4>
                <div>
                  <Form.Control
                    type="text"
                    placeholder="College/Universities"
                    name="college"
                    onChange={handleChange}
                    className={signupStyle.personal_input_field}
                    required
                  />

                  <Form.Control
                    type="text"
                    placeholder="Enter Field Of Specialization"
                    name="course"
                    onChange={handleChange}
                    className={signupStyle.personal_input_field}
                    required
                  />
                </div>
                <div className={signupStyle.education_date_container}>
                  <div className={signupStyle.date_container}>
                    <button className={signupStyle.date_buttons}>
                      Start Date
                    </button>
                    <DatePicker
                      name="course_start_date"
                      dateFormat="dd/MM/yy"
                      selected={formData.course_start_date}
                      onChange={(date) =>
                        setFormData({ ...formData, course_start_date: date })
                      }
                      className={signupStyle.education_detail_start_date}
                      placeholderText="DD/MM/YY"
                      minDate={new Date("1970-01-01")} // Set minimum date to 1970-01-01
                      maxDate={new Date(currentYear, 11, 31)} // Set maximum date to the last day of the current year
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={44}
                      required
                    />
                  </div>
                  <div className={signupStyle.date_container}>
                    <button className={signupStyle.date_buttons}>
                      End Date
                    </button>
                    <DatePicker
                      name="course_end_date"
                      dateFormat="dd/MM/yy"
                      selected={formData.course_end_date}
                      onChange={(date) =>
                        setFormData({ ...formData, course_end_date: date })
                      }
                      className={signupStyle.education_detail_start_date}
                      placeholderText="DD/MM/YY"
                      minDate={new Date("1970-01-01")} // Set minimum date to 1970-01-01
                      maxDate={new Date(currentYear, 11, 31)} // Set maximum date to the last day of the current year
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={44}
                      required
                    />
                  </div>
                </div>
                <Form.Control
                  type="number"
                  placeholder="Percentage/CGPA"
                  name="percentage"
                  onChange={handleChange}
                  className={signupStyle.personal_input_field}
                  required
                />

                <div className={signupStyle.step_button_container}>
                  <Button
                    className={signupStyle.step_button}
                    onClick={nextStep}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save and Continue"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {formData.step === 5 && (
          <div className={signupStyle.step_container}>
            <div className={signupStyle.step_flex_container}>
              <div className={signupStyle.step_1_part_1}>
                <h1
                  className={`${signupStyle.kumar_one_regular} ${signupStyle.step_1_banner_heading_signup}`}
                >
                  WELCOME <br />
                  BACK
                </h1>
                <div className={signupStyle.create_account_name_container}>
                  <h3>Create an Account</h3>
                  <div>
                    To keep connected with us please signup <br /> with your
                    personal info
                  </div>
                </div>
              </div>
              <div className={signupStyle.step_4_part_2}>
                <h4
                  style={{
                    paddingBottom: "10px",
                    textAlign: "center",
                    fontFamily: "Oswald",
                    marginLeft: "-3.5rem",
                  }}
                >
                  Experience (Optional)
                </h4>
                <div>
                  <Form.Control
                    type="text"
                    placeholder="Enter Job Title"
                    name="job_title"
                    onChange={handleChange}
                    className={signupStyle.personal_input_field}
                    required
                  />

                  <Form.Control
                    type="text"
                    placeholder="Enter Company"
                    name="company"
                    onChange={handleChange}
                    className={signupStyle.personal_input_field}
                    required
                  />
                </div>
                <div className={signupStyle.education_date_container}>
                  <div className={signupStyle.date_container}>
                    <button className={signupStyle.date_buttons}>
                      Start Date
                    </button>
                    <DatePicker
                      name="company_start_date"
                      dateFormat="dd/MM/yy"
                      selected={formData.company_start_date}
                      onChange={(date) =>
                        setFormData({ ...formData, company_start_date: date })
                      }
                      className={signupStyle.education_detail_start_date}
                      placeholderText="DD/MM/YY"
                      minDate={new Date("1970-01-01")}
                      maxDate={new Date()}
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={44}
                      required
                    />
                  </div>
                  <div className={signupStyle.date_container}>
                    <button className={signupStyle.date_buttons}>
                      End Date
                    </button>
                    <DatePicker
                      name="company_end_date"
                      dateFormat="dd/MM/yy"
                      selected={formData.company_end_date}
                      onChange={(date) =>
                        setFormData({ ...formData, company_end_date: date })
                      }
                      className={signupStyle.education_detail_start_date}
                      placeholderText="DD/MM/YY"
                      minDate={new Date("1970-01-01")}
                      maxDate={new Date()}
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={44}
                      disabled={stillWorking}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      checked={stillWorking}
                      onChange={(e) => {
                        setStillWorking(e.target.checked);
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          company_end_date: e.target.checked
                            ? null
                            : prevFormData.company_end_date,
                        }));
                      }}
                    />
                    <label
                      style={{
                        fontSize: "14px",
                        paddingBottom: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      Still Working
                    </label>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={formatDurationMonths(calculateDuration())}
                      readOnly
                      placeholder="experience"
                      className={signupStyle.personal_input_field}
                      style={{
                        paddingLeft: "10px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        border: "1px solid grey",
                      }}
                    />
                  </div>
                </div>
                <div className={signupStyle.step_button_container}>
                  <Button
                    className={signupStyle.step_button}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;
