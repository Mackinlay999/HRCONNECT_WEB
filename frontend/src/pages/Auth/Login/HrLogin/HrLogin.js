import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import companyLogo from '../../../../Assets/enlarge_title_logo.png'
import loginImage from "../../../../Assets/Login form Image.PNG";
import axios from "axios";
import hrLoginStyle from "../Login.module.css";
import { useDispatch } from "react-redux";
import { handleUserLogin } from "../../../../Redux/ReduxSlice";
import 'animate.css'

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function HrLogin({ toggleLoginType, isHRLogin }) {
  const dispatchTO = useDispatch();
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
    step: 1,
  });

  const [name, setName] = useState("");

  const passwordRef = useRef(null);

  useEffect(() => {
    // Set focus to the password input field when step changes to 2
    if (formData.step === 2) {
      passwordRef.current.focus();
    }
  }, [formData.step]);

  useEffect(() => {
    // Fetch user's name based on their email
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/hr/get-hr?email=${formData.email}`
        );
        const userData = response.data;
        setName(userData.name);
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    };

    if (formData.step === 2) {
      fetchUserData();
    }
  }, [formData.step, formData.email]);

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      localStorage.setItem("email", value);
    }
  };

  const handleEnterKey = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (formData.step === 1) {
        await nextStep();
      } else {
        await handleSubmit(e);
      }
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

  const nextStep = async () => {
    if (!validateCompanyEmail(formData.email)) return;

    setIsValidating(true);
    if (formData.email) {
      try {
        const response = await axios.get(
          `${baseUrl}/hr/get-hr?email=${formData.email}`
        );
        const userData = response.data;
        setName(userData.name);
        setFormData({ ...formData, step: formData.step + 1 });
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        toast.error("Email not registered.");
      } finally {
        setIsValidating(false);
      }
    } else {
      toast.error("Please fill the email field.");
      setIsValidating(false)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCompanyEmail(formData.email)) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${baseUrl}/hr/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { name, email, token, bookmarkUser } = response.data;

      // Store user details in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      dispatchTO(
        handleUserLogin({
          token: token,
          email: email,
          name: name,
          userType: "employee",
          bookmarkUser: bookmarkUser,
        })
      );
      toast.success(`Welcome Back Recruiter, ${name}`);
      setTimeout(() => {
        nav("/");
      }, 1500);
    } catch (error) {
      console.error("Error:", error.response.data);
      toast.error("Invalid Credential");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePassword = () => {
    nav("/hr/forgot-password");
  };

  const handleHrSignup = () => {
    nav("/hr-signup");
  };

  return (
    <div onKeyDown={handleEnterKey}>
      {formData.step === 1 ? (
        <div className={hrLoginStyle.sub_container1}>
          <div className={hrLoginStyle.sub_container2}>
            <div className={hrLoginStyle.main_whole_container}>
              <div className={hrLoginStyle.part_first}>
                <div>
                  <h1
                    className={`${hrLoginStyle.kumar_one_regular} ${hrLoginStyle.step_1_banner_heading_login}`}
                  >
                    <span style={{ color: "#0050D1" }} className={hrLoginStyle.step_1_banner_heading_login}>HR</span>Connect{" "}
                    <div style={{ color: "#00296B", fontFamily:"roboto" }}>Pro</div>
                  </h1>
                  <div>
                    <img
                      src={loginImage}
                      alt="network error"
                      className={`${hrLoginStyle.login_image} animate__animated animate__zoomIn`}
                    />
                  </div>
                </div>
              </div>

              <div className={hrLoginStyle.part_second}>
                <div className={hrLoginStyle.sub_container3}>
                  <div>
                    <img
                      className={hrLoginStyle.sub_container3_imgstyl}
                      src={companyLogo}
                      alt="not_loaded"
                    />
                  </div>
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <span
                      style={{
                        borderBottom: isHRLogin ? "2px solid #FF0000" : "none",
                        cursor: "pointer",
                      }}
                      onClick={toggleLoginType}
                    >
                      Job Seeker
                    </span>
                    <span
                      style={{
                        borderBottom: isHRLogin ? "none" : "2px solid #FF0000",
                        marginLeft: "20px",
                        cursor: "pointer",
                      }}
                    >
                      Employer
                    </span>
                  </div>
                  {/* <div className={hrLoginStyle.sub_container3_styl1}>
                    {" "}
                   Employer
                  </div> */}
                </div>
                <div className={hrLoginStyle.sub_container_style}>
                  <div className="email_form">
                    <Form onSubmit={handleSubmit}>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Your Company Email"
                        className={hrLoginStyle.input_style}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoFocus
                      />
                    </Form>
                  </div>
                  <div
                    style={{
                      paddingTop: "10px",
                      fontSize: "16px",
                      cursor: "pointer",
                      fontFamily:"roboto"
                    }}
                    onClick={handleHrSignup}
                  >
                    Don't have an account?
                    <span style={{ color: "rgba(35, 88, 251, 1)" }}>
                      {" "}
                      Create Account
                    </span>
                  </div>
                  <div className={hrLoginStyle.forgot_style1}>
                    <Button
                      className={hrLoginStyle.next_style}
                      type="submit"
                      onClick={nextStep}
                      disabled={isValidating}
                    >
                      {isValidating ? "Validating..." : "Next"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={hrLoginStyle.sub_container1_style}>
          <div className={hrLoginStyle.sub_container2_pass}>
            <div className={hrLoginStyle.pass_main_container}>
              <div className={hrLoginStyle.pass_part_1}>
              <h1
                    className={`${hrLoginStyle.kumar_one_regular} ${hrLoginStyle.step_1_banner_heading_login}`}
                  >
                    <span style={{ color: "#0050D1" }} className={hrLoginStyle.step_1_banner_heading_login}>HR</span>Connect{" "}
                    <div style={{ color: "#00296B", fontFamily:"roboto" }}>Pro</div>
                  </h1>
                <div className={hrLoginStyle.user_login_detail}>
                  <div className={hrLoginStyle.user_name}>Hi {name}</div>
                  <div>
                    <select className={hrLoginStyle.manage_account}>
                      <option>{formData.email}</option>
                      <option>Manage Account</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={hrLoginStyle.pass_part_2}>
                <div className="">
                  <div>
                    <img
                      className={`${hrLoginStyle.pass_company_logo} animate__animated animate__zoomIn`}
                      src={companyLogo}
                      alt="not_loaded"
                    />
                  </div>
                  <div>
                    <Form>
                      <div style={{ position: "relative" }}>
                        <input
                          type={formData.showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          className={hrLoginStyle.password_input}
                          value={formData.password}
                          onChange={handleChange}
                          required
                          ref={passwordRef}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "58%",
                            right: "80px",
                            transform: "translateY(-20%)",
                            cursor: "pointer",
                          }}
                          onClick={handleShowPassword}
                        >
                          <FontAwesomeIcon
                            icon={formData.showPassword ? faEyeSlash : faEye}
                          />
                        </span>
                      </div>
                    </Form>
                  </div>

                  <div className="">
                    <div style={{ cursor: "pointer" }}>
                      <span
                        onClick={handlePassword}
                        className={hrLoginStyle.forgot_pass}
                      >
                        Forgot Password?
                      </span>
                    </div>
                    <div style={{ cursor: "pointer" }}>
                      <button
                        className={hrLoginStyle.login_button}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? "Logging In..." : "Log In"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HrLogin;
