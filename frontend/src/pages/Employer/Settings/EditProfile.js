import React, { useEffect, useRef, useState } from "react";
import styleSheet from "../Settings/EditProfile.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../Common-Components/Loaders/Loader";
import { MdModeEdit } from "react-icons/md";
const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

function EditProfile() {
  const imgRef = useRef(null);
  const { email, name } = useSelector((state) => state.Assessment.currentUser);
  const [IsLoading, setIsLoading] = useState(false);
  const [selectedImgPath, setSelectedImg] = useState(null);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    profileImage: "",
    companyName: "",
    aboutCompany: "",
    companyAddress: "",
    companyWebsite: "",
  });

  // ! Onchange event for form input
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    console.log(userDetails);
    if (name === "firstName" || name === "lastName") {
      const firstName =
        name === "firstName" ? value : userDetails.name?.split(" ")[0] ?? "";
      const lastName =
        name === "lastName" ? value : userDetails.name?.split(" ")[1] ?? "";
      const fullName = `${firstName} ${lastName}`;
      setUserDetails({ ...userDetails, name: fullName });
    }

    if (name === "profileImage") {
      if (e.target?.files[0]?.type.split("/")[0] === "image") {
        setUserDetails({
          ...userDetails,
          [name]: URL.createObjectURL(e.target.files[0]),
        });
        setSelectedImg(e.target.files[0]);
      } else {
        toast.error("Invalid image");
      }
    }
  };

  // ! handleSavechanges click
  const handleSaveChangesClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", userDetails?.name);
    formData.append("email", userDetails?.email);
    formData.append("profileImage", selectedImgPath);
    formData.append("companyName", userDetails?.companyName);
    formData.append("aboutCompany", userDetails?.aboutCompany);
    formData.append("companyAddress", userDetails?.companyAddress);
    formData.append("companyWebsite", userDetails?.companyWebsite);
    
    axios
      .patch(`${baseURL}/hr/update-hr/${email}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg);
          setSelectedImg(null);
          loadUserData();
        } else {
          toast.error(response.data.msg);
          setSelectedImg(null);
          loadUserData();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Something went wrong : ${error.msg}`);
        loadUserData();
      });
  };

  //! Load user data by using his email address
  const loadUserData = () => {
    setIsLoading(true);
    axios
      .get(`${baseURL}/hr/get-hr?email=${email}`)
      .then((response) => {
        if (response.data) {
          console.log(response.data.hrDetails);
          const { name, email, profileImage, companyName, aboutCompany, companyAddress, companyWebsite } = response.data.hrDetails;

          setUserDetails({ name, email, profileImage, companyName, aboutCompany, companyAddress, companyWebsite });

          localStorage.setItem(
            "profileImage",
            response.data.hrDetails?.profileImage
          );
          localStorage.setItem("name", response.data.hrDetails?.name);
          localStorage.setItem("email", response.data.hrDetails?.email);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error(`Something went wrong ${error.message}`);
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadUserData, [email]);

  return (
    <main className={styleSheet.mainContainer}>
      {IsLoading ? (
        <Loader />
      ) : (
        <form
          className={styleSheet.editProfile__form}
          onSubmit={(e) => e.preventDefault()}
          encType="multipart/form-data"
        >
          <div className={styleSheet.Form__profileContainer}>
            <label
              htmlFor="profileImage"
              className={styleSheet.form__userLabel}
            >
              Profile Picture
            </label>
            <div className={styleSheet.Form__profileBox}>
              <img
                src={
                  userDetails?.profileImage ??
                  "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                }
                alt={`${name}-Profile`}
                className={styleSheet.Form__userProfile}
                onError={(e) => {
                  e.target.src = `https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg`;
                  e.onError = null;
                }}
              />
              <p
                className={styleSheet.Form__profile_editICON_Box}
                title="Edit Profile"
                onClick={() => imgRef.current.click()}
              >
                <MdModeEdit className={styleSheet.Form__profile_editICON} />
              </p>
              <input
                type="file"
                name="profileImage"
                hidden
                ref={imgRef}
                accept="image/*"
                id="profileImage"
                className={styleSheet.Form__input}
                onChange={handleOnChange}
              />
            </div>
          </div>

          {/* First name and last name */}
          <div className={`${styleSheet.Form__inputRows_Primary}`}>
            <div className={styleSheet.Form__inputBox}>
              <label
                htmlFor="firstName"
                className={styleSheet.Form__inputBox_Label}
              >
                {" "}
                First Name
              </label>
              <input
                type="text"
                value={userDetails.name?.split(" ")[0] ?? ""}
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
                className={styleSheet.Form__input}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>

            <div className={styleSheet.Form__inputBox}>
              <label
                htmlFor="lastName"
                className={styleSheet.Form__inputBox_Label}
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={userDetails.name?.split(" ")[1] ?? ""}
                id="lastName"
                placeholder="Enter your last name"
                className={styleSheet.Form__input}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Email address */}
          <div className={`${styleSheet.Form__inputRows_Secondry}`}>
            <label htmlFor="email" className={styleSheet.Form__inputBox_Label}>
              {" "}
              Email Address
            </label>
            <input
              type="email"
              value={userDetails.email}
              name="email"
              id="email"
              placeholder="Enter your email address"
              className={styleSheet.Form__input}
              onChange={handleOnChange}
              autoComplete="off"
            />

            <label
              htmlFor="companyName"
              className={styleSheet.Form__inputBox_Label}
            >
              {" "}
              Company Name
            </label>
            <input
              type="text"
              value={userDetails.companyName}
              name="companyName"
              id="companyName"
              placeholder="Enter Your Company Name"
              className={styleSheet.Form__input}
              onChange={handleOnChange}
            />

            <label
              htmlFor="aboutCompany"
              className={styleSheet.Form__inputBox_Label}
            >
              {" "}
              About Company
            </label>
            <input
              type="text"
              value={userDetails.aboutCompany}
              name="aboutCompany"
              id="aboutCompany"
              placeholder="Enter About Your Company"
              className={styleSheet.Form__input}
              onChange={handleOnChange}
            />

            <label
              htmlFor="companyAddress"
              className={styleSheet.Form__inputBox_Label}
            >
              {" "}
              Company Address
            </label>
            <input
              type="text"
              value={userDetails.companyAddress}
              name="companyAddress"
              id="companyAddress"
              placeholder="Enter Your Company Address"
              className={styleSheet.Form__input}
              onChange={handleOnChange}
            />

            <label
              htmlFor="companyWebsite"
              className={styleSheet.Form__inputBox_Label}
            >
              {" "}
              Company Website
            </label>
            <input
              type="url"
              value={userDetails.companyWebsite}
              name="companyWebsite"
              id="companyWebsite"
              placeholder="Enter Your Company Website"
              className={styleSheet.Form__input}
              onChange={handleOnChange}
            />
          </div>
          <div className={styleSheet.Form__buttonContainer}>
            <button
              onClick={handleSaveChangesClick}
              type="button"
              className={styleSheet.Form__saveChangesButton}
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </main>
  );
}

export default EditProfile;