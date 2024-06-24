import layout from './RecruiterLayout.module.css';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse, faUsers, faUser, faChartSimple, faRobot, faCalendarDays, faGear, faMoneyBill1Wave,
  faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from 'react-responsive'
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux'
import { handleUserLogOut } from '../../../Redux/ReduxSlice';

export default function HR_Navbar() {
  const navigateTo = useNavigate()
  const [tabletView, setTabletView] = useState()
  const tabScreen = useMediaQuery({ maxWidth: 950 })
  const dispatch = useDispatch();
  const { name, profileImage } = useSelector((state) => state.Assessment.currentUser);
  // console.log(profileImage);
  const handleLogoutClick = () => {
    dispatch(handleUserLogOut());
    toast.success(`${name} Logged out !!`)
    setTimeout(() => {
      navigateTo("/login")
    }, 1000);
  }

  useEffect(() => {
    setTabletView(tabScreen)
  }, [tabScreen])

  const toggleText = () => (tabletView ? "HCP" : "HRCONNECT PRO")

  return (
    <div className={layout.__navbar_Page}>
      <h2 className={layout.__nav_Logo} onClick={() => navigateTo('/hr_dashboard')}>{toggleText()}</h2>
      <nav className={layout.__navbar}>
        <NavLink className={({ isActive }) => isActive ? layout.active : layout.__navbar_Links} to='/hr_dashboard'> <FontAwesomeIcon icon={faHouse} /> <span className={layout.__hide}>Dashboard</span> </NavLink>
        <NavLink className={({ isActive }) => isActive ? layout.active : layout.__navbar_Links} to='/create_post'><FontAwesomeIcon icon={faUser} /> <span className={layout.__hide}>Create Post</span> </NavLink>
        <NavLink className={({ isActive }) => isActive ? layout.active : layout.__navbar_Links} to='/employees'> <FontAwesomeIcon icon={faUsers} /> <span className={layout.__hide}>Employees</span> </NavLink>
        <NavLink className={({ isActive }) => isActive ? layout.active : layout.__navbar_Links} to='/payroll'><FontAwesomeIcon icon={faMoneyBill1Wave} /> <span className={layout.__hide}>Payroll</span> </NavLink>
        <NavLink className={({ isActive }) => isActive ? layout.active : layout.__navbar_Links} to='/analytics'><FontAwesomeIcon icon={faChartSimple} /> <span className={layout.__hide}>Analytics</span> </NavLink>
        <NavLink className={({ isActive }) => isActive ? layout.active : layout.__navbar_Links} to='/candidates'><FontAwesomeIcon icon={faUser} /> <span className={layout.__hide}>Candidates</span> </NavLink>
        <NavLink className={({ isActive }) => isActive ? layout.active : layout.__navbar_Links} to='/interview_scheduled'> <FontAwesomeIcon icon={faCalendarDays} /> <span className={layout.__hide}>Interview Scheduled</span> </NavLink>
        <NavLink className={({ isActive }) => isActive ? layout.active : layout.__navbar_Links} to='/chatbot'><FontAwesomeIcon icon={faRobot} /> <span className={layout.__hide}>Chatbot</span> </NavLink>
        <NavLink className={({ isActive }) => isActive ? layout.active : layout.__navbar_Links} to='/Setting'><FontAwesomeIcon icon={faGear} /> <span className={layout.__hide}>Setting</span> </NavLink>
      </nav>

      <div className={layout.__nav_footer_actions}>
        <div className={layout.__user_Info}>
          <img className={layout.__user_Img} title='Profile'
            src={profileImage ?? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg'}
            alt='HrProfilePicture'
            onError={(e) => { e.target.src = `https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg`; e.onError = null; }}
          />
          <span style={{ fontSize: "20px" }}>{name.split(" ")[0]}</span>
        </div>
        <button className={layout.__btn_Logout} onClick={handleLogoutClick}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> <span className={layout.__logout_Text}>Log Out</span>
        </button>
      </div>
    </div>
  )
}
