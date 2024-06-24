import React, { useEffect } from "react";
import employees from './Employees.module.css';
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Employees() {
  const { pathname } = useLocation();
  const navigateTO = useNavigate();

  useEffect(() => {
    if (pathname === "/employees") navigateTO("/employees/attendance");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div>
      <nav className={employees.__employee_ToggleNav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? employees.active : employees.__employee_Links
          }
          to="/employees/on_time"
        >
          <div className={employees.__employee_Links_Toggles}>
            <h1>360</h1>
            <div>
              <p style={{ fontSize: "18px", fontWeight: "500" }}>On Time</p>
              <div
                style={{
                  fontSize: "15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >

                <div className={employees.__employee_PresenceColor} /> -10% Less
                than yesterday
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? employees.active : employees.__employee_Links
          }
          to="/employees/absent"
        >
          <div className={employees.__employee_Links_Toggles}>
            <h1>30</h1>
            <div>
              <p style={{ fontSize: "18px", fontWeight: "500" }}>Absent</p>
              <div
                style={{
                  fontSize: "15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >

                <div
                  className={employees.__employee_PresenceColor}
                  style={{ background: "rgb(248, 170, 183)" }}
                />
                +3% Increase than yesterday
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? employees.active : employees.__employee_Links
          }
          to="/employees/late_arrivals"
        >
          <div className={employees.__employee_Links_Toggles}>
            <h1>62</h1>
            <div>
              <p style={{ fontSize: "18px", fontWeight: "500" }}>
                Late Arrivals
              </p>
              <div
                style={{
                  fontSize: "15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div
                  className={employees.__employee_PresenceColor}
                  style={{ background: "rgb(248, 170, 183)" }}
                />
                +3% Increase than yesterday
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? employees.active : employees.__employee_Links
          }
          to="/employees/leave_requests"
        >
          <div className={employees.__employee_Links_Toggles}>
            <h1>6</h1>
            <div>
              <p style={{ fontSize: "18px", fontWeight: "500" }}>
                Leave Requests
              </p>
              <div
                style={{
                  fontSize: "15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div className={employees.__employee_PresenceColor} /> -10% Less
                than yesterday
              </div>
            </div>
          </div>
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
