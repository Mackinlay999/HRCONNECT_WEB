import React from "react";
import navStyle from "./SideNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FaHouse } from "react-icons/fa6";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { HiBriefcase } from "react-icons/hi";
import { SiSimpleanalytics } from "react-icons/si";
import { GrDocumentText } from "react-icons/gr";
import { GoSmiley } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { useSelector, useDispatch } from 'react-redux'
import { handleUserLogOut } from "../../../../Redux/ReduxSlice";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios'
// latest 
const newUrl = process.env.REACT_APP_BACKEND_BASE_URL_WITHOUT_API

const menuItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHouse className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/assessment",
    name: "Assessment",
    icon: <FaEnvelopeOpenText className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/chatbot",
    name: "Chat bot",
    icon: <FontAwesomeIcon icon={faRobot} className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: <SiSimpleanalytics className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/myjobs",
    name: "My jobs",
    icon: <HiBriefcase className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/myresume",
    name: "My Resume",
    icon: <GrDocumentText className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/application",
    name: "Application Status",
    icon: <GoSmiley className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/interviews",
    name: "Interview Scheduled",
    icon: <FontAwesomeIcon icon={faCalendarDays} className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <IoSettingsOutline className={navStyle.JobSeeker_navITEMICON} />,
  },
];

function SideNavbar() {
  const dispatch = useDispatch();
  const navigateTO = useNavigate()
  const { name, profileImage } = useSelector((state) => state.Assessment.currentUser);

  const handleLogoutClick = async () => {
    try {
      dispatch(handleUserLogOut());
      const response = await axios.get(`${newUrl}/logout`);
      if (response.status !== 200) {
        throw new Error('Logout failed');
      }
      toast.success(`${name} Logged out !!`);
      setTimeout(() => {
        navigateTO("/login");
      }, 1000);
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <>
      <div className={navStyle.SidenavBar__Container}>
        <div className={navStyle.sidenavBar__AppLOGOBOX}>
          <h1 className={navStyle.sidenavBar__appLOGO}>
            <span onClick={(()=>navigateTO("/dashboard"))} className={navStyle.sidenavBar_DeskLOGO}>HRConnect Pro</span>{" "}
            <span onClick={(()=>navigateTO("/dashboard"))} className={navStyle.sidenavBar_LOGO}>HCP</span>
          </h1>
        </div>
        <nav className={navStyle.JobSeeker_nav}>
          {menuItems.map((data, index) => {
            return (
              <NavLink
                key={index}
                to={data.path}
                className={({ isActive }) =>
                  isActive ? navStyle.active : navStyle.JobSeeker_navITEM_LINK
                }
              >
                <Tooltip title={data.name} arrow placement="right-end" className={navStyle.toolTip}>
                  <p className={navStyle.JobSeeker__navItem}>
                    {data.icon}
                    <span className={navStyle.navTextHIDE}>{data.name}</span>
                  </p>
                </Tooltip>
              </NavLink>
            );
          })}
        </nav>
        <div>
          <div className={navStyle.sidenavBar__profileBox}>
            <Tooltip title="Profile" arrow placement="right-end">
              <img
                src={profileImage ?? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg'}
                alt="UserProfilePicture"
                className={navStyle.sidenavBar__userProfilePicture}
                onError={(e) => { e.target.src = `https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg`; e.onError = null; }}
              />
            </Tooltip>
            <p className={navStyle.sidenavBar__userName}>
              {name && name?.split(" ")[0]}
            </p>
            <DropDownMENU userName={name} userLogOut={handleLogoutClick} />
          </div>
          <button className={navStyle.logOutButton} onClick={handleLogoutClick} >
            <RiLogoutCircleRLine className={navStyle.logOutButtonICON} />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

export default SideNavbar;

function DropDownMENU({ userName, userLogOut }) {
  const navigateTO = useNavigate()

  return (
    <div className={navStyle.ProfileDropDownContainer}>
      <p className={`${navStyle.dropDownITEM} ${navStyle.dropDownITEM_Name}`}> {userName && userName}</p>
      <button className={`${navStyle.dropDownITEM} ${navStyle.dropDownITEM_Button}`} onClick={(e) => navigateTO("/settings/editprofile")}>Edit Profile</button>
      <button className={`${navStyle.dropDownITEM} ${navStyle.dropDownITEM_Button}`} onClick={userLogOut}>  <RiLogoutCircleRLine className={navStyle.logOutButtonICON} />
        Log Out </button>
    </div>
  );
}
