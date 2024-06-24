import React, { useEffect } from 'react'
import HrNavbar from './HrNavbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import TopBar from './TopBar'
import layout from './RecruiterLayout.module.css';

export default function MainContainer() {
  const navigateTo = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {

    // (pathname !== "/hr_dashboard" &&
    // pathname !== "/create_post" &&
    // pathname !== "/employees" &&
    // pathname !== "/employees/attendance" &&
    // pathname !== "/employees/on_time" &&
    // pathname !== "/employees/absent" &&
    // pathname !== "/employees/late_arrivals" &&
    // pathname !== "/employees/leave_requests" &&
    // pathname !== "/payroll" &&
    // pathname !== "/analytics" &&
    // pathname !== "/candidates" &&
    // pathname !== "/interview_scheduled" &&
    // pathname !== "/schedule-interview" &&
    // pathname !== "/chatbot" &&
    // pathname !== "/Setting")
    if (pathname === "/")
      navigateTo('/hr_dashboard')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className={layout.__mainContainer}>
      <HrNavbar />
      <div className={layout.__subContainer}>
        <TopBar />
        <div className={layout.__outletContainer}>
          <Outlet />
        </div>
      </div>
    </div >
  )
}
