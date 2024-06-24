import React, { useEffect } from "react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "../Redux/UserSlice.js";
import GoogleCallback from "../pages/Auth/GoogleCallback.js";
import LinkedInCallback from "../pages/Auth/LinkedinCallback.js";
//! These All Files are imported for the JobSeeker Routes
const JobSeekerLayout = lazy(() =>
  import("../pages/Job_Seeker/JobSeekerLayout")
);
const Dashboard = lazy(() =>
  import("../pages/Job_Seeker/Dashboard/Dashboard.js")
);
const Assessment = lazy(() =>
  import("../pages/Job_Seeker/Assessment/Assessment.js")
);
const InstructionPage = lazy(() =>
  import("../pages/Job_Seeker/Assessment/InstructionPage.js")
);
const SelfAssessmentPage = lazy(() =>
  import("../pages/Job_Seeker/Assessment/SelfAssessmentPage.js")
);
const AssessmentResult = lazy(() =>
  import("../pages/Job_Seeker/Assessment/AssessmentResult.js")
);

const Analytics = lazy(() =>
  import("../pages/Job_Seeker/Analytics/UserAnalytics.js")
);
const AnalyticsReportComponent = lazy(() =>
  import("../pages/Job_Seeker/Analytics/UserAnalytics.js")
);
const MYJobs = lazy(() => import("../pages/Job_Seeker/MyJobs/MyJobs.js"));
const MYResume = lazy(() => import("../pages/Job_Seeker/MyResume/MyResume.js"));
const Application = lazy(() =>
  import("../pages/Job_Seeker/ApplicationStatus/ApplicationStatus.js")
);
const Status = lazy(() =>
  import("../pages/Job_Seeker/ApplicationStatus/ApplicationStatus.js").then(
    (module) => ({ default: module.Status })
  )
);
const Interviews = lazy(() =>
  import("../pages/Job_Seeker/InterviewScheduled/Interview.js")
);
const WebCamInterview = lazy(() =>
  import("../pages/Job_Seeker/InterviewScheduled/WebcamRecorder.js")
);
const Settings = lazy(() => import("../pages/Job_Seeker/Settings/Setting.js"));
const JobListDetailedView = lazy(() =>
  import("../pages/Job_Seeker/Dashboard/DetailedView.js")
);
const ProfileDetails = lazy(() =>
  import("../pages/Job_Seeker/Dashboard/Profile_details.js")
);
const CandidateProfileDetails = lazy(() =>
  import("../pages/Job_Seeker/EditMyProfile/EditProfile.js")
);
const AssesmentInstruction = lazy(() =>
  import("../pages/Job_Seeker/Assessment/JobAssesment/AssesmentInstruction.js")
);
const JobAssesment = lazy(() =>
  import("../pages/Job_Seeker/Assessment/JobAssesment/JobAssesment.js")
);
const JobAssesmentResult = lazy(() =>
  import("../pages/Job_Seeker/Assessment/JobAssesment/JobAssesmentResult.js")
);
const ChatBot = lazy(() => import("../pages/Job_Seeker/Chatbot/ChatBot.js"));
const Chatarea = lazy(() => import("../pages/Job_Seeker/Chatbot/Chatarea.js"));

//! These All Files are imported for the Employer Routes
const Addemployee = lazy(() =>
  import("../pages/Employer/AddEmployee/AddEmployee.js")
);
const MainContainer = lazy(() =>
  import("../pages/Employer/components/MainContainer.js")
);
const HRDashboard = lazy(() =>
  import("../pages/Employer/Dashboard/HRDashboard.js")
);
const CreatePost = lazy(() =>
  import("../pages/Employer/CreatePost/CreatePost.js")
);
const PreviewCreatePost = lazy(() =>
  import("../pages/Employer/CreatePost/CreatePostPreview.js")
);
const PreAssesment = lazy(() =>
  import("../pages/Employer/CreatePost/PreAssesment.js")
);
const Employees = lazy(() =>
  import("../pages/Employer/Employees/Employees.js")
);
const Attendance = lazy(() =>
  import("../pages/Employer/Employees/Attendance.js")
);
const OnTime = lazy(() => import("../pages/Employer/Employees/OnTime.js"));
const Absent = lazy(() => import("../pages/Employer/Employees/Absent.js"));
const LateArrivals = lazy(() =>
  import("../pages/Employer/Employees/LateArrivals.js")
);
const LeaveRequests = lazy(() =>
  import("../pages/Employer/Employees/LeaveRequests.js")
);
const Payroll = lazy(() => import("../pages/Employer/Payroll/Payroll.js"));
const HRAnalytics = lazy(() =>
  import("../pages/Employer/Analytic/HrAnalytics.js")
);
const Candidates = lazy(() =>
  import("../pages/Employer/Candidates/Temp_Candidate/NewCandidates.js")
);
const InterviewScheduled = lazy(() =>
  import("../pages/Employer/InterviewScheduled/InterviewScheduled.js")
);
const CreateInterview = lazy(() =>
  import("../pages/Employer/InterviewScheduled/CreateInterview.js")
);
const EmployerChatBot = lazy(() =>
  import("../pages/Employer/ChatBot/EmployerChatBot.js")
);
const ChatArea = lazy(() => import("../pages/Employer/ChatBot/Chatarea.js"));
const Setting = lazy(() => import("../pages/Employer/Settings/Setting.js"));
const EditProfile = lazy(() =>
  import("../pages/Employer/Settings/EditProfile.js")
);

//! These All Files are imported for the Auth Routes

const LoginPage = lazy(() =>
  import("../pages/Auth/Login/ToggleLogin/LoginPage")
);
const Signup = lazy(() => import("../pages/Auth/Signup/UserSignup/UserSignup"));
const HrLogin = lazy(() => import("../pages/Auth/Login/HrLogin/HrLogin"));
const HrSignup = lazy(() =>
  import("../pages/Auth/Signup/HrSignup/HrSignup.js")
);
const ResetPassword = lazy(() =>
  import("../pages/Auth/Password/User/ResetPassword/ResetPassword.js")
);
const ForgotPassword = lazy(() =>
  import("../pages/Auth/Password/User/ForgotPassword/ForgotPassword.js")
);
const HrResetPassword = lazy(() =>
  import("../pages/Auth/Password/Hr/ResetPassword/HrResetPassword")
);
const HrForgotPassword = lazy(() =>
  import("../pages/Auth/Password/Hr/ForgotPassword/HrForgotPassword")
);

//! These All Files are imported for the Auth Routes

function AppRoute() {
  const { userType } = useSelector((state) => state.Assessment.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      {userType === "user" && <JobSeekerRoutes />}

      {userType === "employee" && <EmployerRoutes />}

      {!userType && <AuthRouter />}
    </>
  );
}

export default AppRoute;

// All Routing related to the JOB SEEKERS must be defined HERE
function JobSeekerRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense>
            <JobSeekerLayout />
          </Suspense>
        }
      >
        <Route
          path="/dashboard"
          element={
            <Suspense>
              {" "}
              <Dashboard />{" "}
            </Suspense>
          }
        />
        <Route
          path="/assessment"
          element={
            <Suspense>
              {" "}
              <Assessment />{" "}
            </Suspense>
          }
        />
        <Route
          path="/chatbot"
          element={
            <Suspense>
              {" "}
              <ChatBot />{" "}
            </Suspense>
          }
        />
        <Route
          path="/chatarea"
          element={
            <Suspense>
              {" "}
              <Chatarea />{" "}
            </Suspense>
          }
        />
        <Route
          path="/analytics"
          element={
            <Suspense>
              {" "}
              <Analytics />{" "}
            </Suspense>
          }
        />
        <Route
          path="/analytics/weekly"
          element={
            <Suspense>
              {" "}
              <AnalyticsReportComponent />{" "}
            </Suspense>
          }
        />
        <Route
          path="/analytics/monthly"
          element={
            <Suspense>
              {" "}
              <AnalyticsReportComponent />{" "}
            </Suspense>
          }
        />
        <Route
          path="/analytics/yearly"
          element={
            <Suspense>
              {" "}
              <AnalyticsReportComponent />{" "}
            </Suspense>
          }
        />
        <Route
          path="/myjobs"
          element={
            <Suspense>
              {" "}
              <MYJobs />{" "}
            </Suspense>
          }
        />
        <Route
          path="/myresume"
          element={
            <Suspense>
              {" "}
              <MYResume />{" "}
            </Suspense>
          }
        />

        <Route
          path="/application"
          element={
            <Suspense>
              {" "}
              <Application />{" "}
            </Suspense>
          }
        >
          <Route
            path="/application/:status"
            element={
              <Suspense>
                {" "}
                <Status />{" "}
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/interviews"
          element={
            <Suspense>
              {" "}
              <Interviews />{" "}
            </Suspense>
          }
        />
        <Route
          path="/webcamInterview"
          element={
            <Suspense>
              <WebCamInterview />
            </Suspense>
          }
        />
        <Route
          path="/settings"
          element={
            <Suspense>
              {" "}
              <Settings />{" "}
            </Suspense>
          }
        />
        <Route
          path="/settings/editprofile"
          element={
            <Suspense>
              {" "}
              <CandidateProfileDetails />{" "}
            </Suspense>
          }
        />
        <Route
          path="/dashboard/:id"
          element={
            <Suspense>
              {" "}
              <JobListDetailedView />{" "}
            </Suspense>
          }
        />
        <Route
          path="/dashboard/profile_details"
          element={
            <Suspense>
              {" "}
              <ProfileDetails />{" "}
            </Suspense>
          }
        />
      </Route>

      <Route
        path="/assessment-Instructions"
        element={
          <Suspense>
            <InstructionPage />
          </Suspense>
        }
      />
      <Route
        path="/assessment-test"
        element={
          <Suspense>
            <SelfAssessmentPage />
          </Suspense>
        }
      />
      <Route
        path="/assessment-result"
        element={
          <Suspense>
            <AssessmentResult />
          </Suspense>
        }
      />
      <Route
        path="/skill-assesment-instructions"
        element={
          <Suspense>
            <AssesmentInstruction />
          </Suspense>
        }
      />
      <Route
        path="/job-assesment-test"
        element={
          <Suspense>
            <JobAssesment />
          </Suspense>
        }
      />
      <Route
        path="/job-assesment-result"
        element={
          <Suspense>
            <JobAssesmentResult />
          </Suspense>
        }
      />

      <Route
        path="/assessment-Instructions"
        element={
          <Suspense>
            {" "}
            <InstructionPage />
          </Suspense>
        }
      />
      <Route
        path="/assessment-test"
        element={
          <Suspense>
            {" "}
            <SelfAssessmentPage />
          </Suspense>
        }
      />
      <Route
        path="/assessment-result"
        element={
          <Suspense>
            {" "}
            <AssessmentResult />
          </Suspense>
        }
      />
    </Routes>
  );
}

function EmployerRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense>
            {" "}
            <MainContainer />
          </Suspense>
        }
      >
        <Route
          path="/addemployee"
          element={
            <Suspense>
              {" "}
              <Addemployee />{" "}
            </Suspense>
          }
        />
        <Route
          path="/hr_dashboard"
          element={
            <Suspense>
              {" "}
              <HRDashboard />{" "}
            </Suspense>
          }
        />
        <Route
          path="/create_post"
          element={
            <Suspense>
              {" "}
              <CreatePost />{" "}
            </Suspense>
          }
        />
        <Route
          path="/create_post/:title"
          element={
            <Suspense>
              {" "}
              <PreviewCreatePost />{" "}
            </Suspense>
          }
        />
        <Route
          path="/create_post/Set-Pre-Assessment"
          element={
            <Suspense>
              {" "}
              <PreAssesment />{" "}
            </Suspense>
          }
        />
        <Route
          path="/employees"
          element={
            <Suspense>
              {" "}
              <Employees />{" "}
            </Suspense>
          }
        >
          <Route
            path="/employees/attendance"
            element={
              <Suspense>
                {" "}
                <Attendance />{" "}
              </Suspense>
            }
          />
          <Route
            path="/employees/on_time"
            element={
              <Suspense>
                {" "}
                <OnTime />{" "}
              </Suspense>
            }
          />
          <Route
            path="/employees/absent"
            element={
              <Suspense>
                {" "}
                <Absent />{" "}
              </Suspense>
            }
          />
          <Route
            path="/employees/late_arrivals"
            element={
              <Suspense>
                {" "}
                <LateArrivals />{" "}
              </Suspense>
            }
          />
          <Route
            path="/employees/leave_requests"
            element={
              <Suspense>
                {" "}
                <LeaveRequests />{" "}
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/payroll"
          element={
            <Suspense>
              {" "}
              <Payroll />{" "}
            </Suspense>
          }
        />
        <Route
          path="/analytics"
          element={
            <Suspense>
              {" "}
              <HRAnalytics />{" "}
            </Suspense>
          }
        />
        <Route
          path="/candidates"
          element={
            <Suspense>
              {" "}
              <Candidates />{" "}
            </Suspense>
          }
        />
        <Route
          path="/interview_scheduled"
          element={
            <Suspense>
              {" "}
              <InterviewScheduled />{" "}
            </Suspense>
          }
        />
        <Route
          path="/schedule-interview"
          element={
            <Suspense>
              {" "}
              <CreateInterview />{" "}
            </Suspense>
          }
        />
        <Route
          path="/chatbot"
          element={
            <Suspense>
              {" "}
              <EmployerChatBot />{" "}
            </Suspense>
          }
        />
        <Route
          path="/Chatarea"
          element={
            <Suspense>
              {" "}
              <ChatArea />{" "}
            </Suspense>
          }
        />
        <Route
          path="/Setting"
          element={
            <Suspense>
              {" "}
              <Setting />{" "}
            </Suspense>
          }
        />
        <Route
          path="/Setting/Editprofile"
          element={
            <Suspense>
              {" "}
              <EditProfile />{" "}
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/*"
        element={
          <Suspense>
            {" "}
            <MainContainer />
          </Suspense>
        }
      />
    </Routes>
  );
}

// All Routing related to the Auth must be defined HERE
function AuthRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense>
            {" "}
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/user-signup"
        element={
          <Suspense>
            {" "}
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="/hr-signup"
        element={
          <Suspense>
            {" "}
            <HrSignup />
          </Suspense>
        }
      />
      <Route
        path="/hr-login"
        element={
          <Suspense>
            {" "}
            <HrLogin />
          </Suspense>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <Suspense>
            {" "}
            <ResetPassword />
          </Suspense>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Suspense>
            {" "}
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route
        path="/hr/reset-password/:token"
        element={
          <Suspense>
            {" "}
            <HrResetPassword />
          </Suspense>
        }
      />
      <Route
        path="/hr/forgot-password"
        element={
          <Suspense>
            {" "}
            <HrForgotPassword />
          </Suspense>
        }
      />
      <Route
        path="/*"
        element={
          <Suspense>
            {" "}
            <LoginPage />
          </Suspense>
        }
      />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
    </Routes>
  );
}
