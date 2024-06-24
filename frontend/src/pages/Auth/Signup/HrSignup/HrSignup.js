import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import signupStyle from "../Signup.module.css";
import { useDispatch } from "react-redux";
import { handleUserLogin } from "../../../../Redux/ReduxSlice";

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const Signup = () => {
  const dispatchTO = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isOtpResend, setIsOtpResend] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    conf_password: "",
    showPassword1: false,
    showPassword2: false,
    userType: "employee",
  });

  const nav = useNavigate();

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const toggleShowPassword = (fieldName) => {
    setFormData({ ...formData, [fieldName]: !formData[fieldName] });
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post(`${baseUrl}/hr/check-email`, { email });
      return response.status === 200;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email already registered");
      } else {
        toast.error("An error occurred while checking the email");
      }
      return false;
    }
  };

  const validateCompanyEmail = (email) => {
    const domain = email.split("@")[1];
    const genericDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
    ];

    if (genericDomains.includes(domain)) {
      toast.error("Please use your company email address");
      return false;
    }

    return true;
  };

  const handleEmailBlur = async () => {
    const isValidCompanyEmail = validateCompanyEmail(formData.email);
    if (!isValidCompanyEmail) {
      setEmailValid(false);
      return;
    }

    const isValid = await checkEmailExists(formData.email);
    setEmailValid(isValid);
  };

  const requestOtp = async () => {
    setIsSendingOtp(true);
    try {
      const response = await axios.post(`${baseUrl}/hr/request-otp`, {
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

  const handleRequestOtp = () => {
    requestOtp();
    openModal();
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
      const response = await axios.post(`${baseUrl}/hr/verify-otp`, {
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
        }}
      />
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.password !== formData.conf_password) {
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    if (!emailValid || !isOtpValid) {
      toast.error("Please enter a valid email and verify OTP");
      setIsSubmitting(false);
      return;
    }
    try {
      const { name, email, password, userType } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("userType", userType);

      const response = await axios.post(
        `${baseUrl}/hr/signup`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Store user details in local storage
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      dispatchTO(
        handleUserLogin({
          email: email,
          name: name,
          userType: "employee",
        })
      );
      toast.success(`Welcome ${name}`);
      setTimeout(() => {
        nav("/");
      }, 1500);
    } catch (error) {
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

  return (
    <>
      <div className={signupStyle.signup_container}>
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
                  fontFamily: "roboto",
                  textAlign: "center",
                  marginLeft:"-3rem"
                }}
              >
                Personal Information
              </h4>
              <div>
                <Form onSubmit={handleSubmit}>
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
                    placeholder="Enter Your Company Email Id"
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    className={signupStyle.personal_input_field}
                    required
                  />

                  {!otpSent && formData.email && emailValid && (
                    <Button
                      onClick={handleRequestOtp}
                      disabled={!emailValid}
                      className={`btn btn-primary btn-lg ${signupStyle.request_otp_button}`}
                    >
                      {isSendingOtp ? "Sending OTP..." : "Verify Email"}
                    </Button>
                  )}

                  <Modal show={isModalOpen} onHide={closeModal} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Please Verify OTP</Modal.Title>
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
                        icon={formData.showPassword1 ? faEyeSlash : faEye}
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
                        icon={formData.showPassword2 ? faEyeSlash : faEye}
                        onClick={() => toggleShowPassword("showPassword2")}
                        style={{ cursor: "pointer" }}
                        className={signupStyle.eye_icon}
                      />
                    </div>
                  </div>
                  <div
                    onClick={handleLogin}
                    style={{
                      paddingTop: "10px",
                      fontSize: "16px",
                      cursor: "pointer",
                      fontFamily: "roboto",
                    }}
                  >
                    Already have employer account?&nbsp;
                    <span style={{ color: "rgba(35, 88, 251, 1)" }}>
                      login here
                    </span>
                  </div>
                  <div className={signupStyle.step_button_container}>
                    <Button
                      className={signupStyle.step_button}
                      type="submit"
                      disabled={isSubmitting || !isOtpValid}
                    >
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
