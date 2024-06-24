const express = require("express");
const ConnectDb = require("./Config/config.js");
const app = express();
app.use(express.json());
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./controller/auth/Passport/UserPassport.js");
require("./controller/auth/Passport/LinkedinUserPassport.js");

//!  Assessments Related  Routes and import
const { assessmentRoute } = require("./Routes/Assessment.Route");
const assesmentQuestionRouter = require("./Routes/AssessmentQuestion.Route");
app.use("/api/assessment", assessmentRoute);
app.use("/api/questions", assesmentQuestionRouter);

//!  Auth Related  Routes and import
const userRoutes = require("./Routes/UserRoutes");
app.use("/api", userRoutes);

const HrRoutes = require("./Routes/HrRoutes");
app.use("/api/hr", HrRoutes);

const googleRoutes = require("./Routes/GoogleRoutes.js");
app.use("/", googleRoutes);

const linkedinRoutes = require("./Routes/LinkedinRoutes.js");
app.use("/", linkedinRoutes);

//! Interview Schedule Related Routes and import
const AptitudeQuestionRouter = require("./Routes/InterviewScheduleRoutes/AptitudeRoundRoute");
app.use("/api/aptitude", AptitudeQuestionRouter);

//!  JObs (HR) Related  Routes and import
const jobRoutes = require("./Routes/Job.Route");
app.use("/api/jobs", jobRoutes);

// Resume Routes
const ResumeRoutes = require("./Routes/ResumeRoutes.js");
app.use("/resume", ResumeRoutes);
app.use("/uploads", express.static("uploads"));

//HrINterview Routes
const HrInterviewRoutes = require("./Routes/HrInterview.Route.js");
app.use("/interview", HrInterviewRoutes);

//!  MyJobs (JobSeeker) Related  Routes and import
const myJobRoutes = require("./Routes/MyJob.Route");
app.use("/api/user/My-jobs", myJobRoutes);

// !Bookmarked Routes
const { bookmarkRoutes } = require("./Routes/Bookmark.Route.js");
app.use("/api/user/bookmarkd", bookmarkRoutes);
// !Shortlisted Routes
const { ShortlistedRoute } = require("./Routes/Shortlisted.Route.js");
app.use("/api/user/shortlisted", ShortlistedRoute);
// !Rejected Routes
const { RejectedRoute } = require("./Routes/Rejected.Route.js");
app.use("/api/user/rejected", RejectedRoute);

// ! Notifications Route
const { notificationRoutes } = require("./Routes/Notification.Route.js");
const { InterviewSheduleRoute } = require("./Routes/InterviewScheduleRoutes/InterviewSheduleRoute.js");
app.use("/api/user/notifications", notificationRoutes);

const Port = process.env.PORT;

// Socket IO
const httpServer = require("http").createServer(app);
const connectedUser = [];
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.on("userConnect", (data) => {
    const user = connectedUser?.find(
      (user) => user.email === JSON.parse(data).userEmail
    );
    if (user) {
      user.socketId = socket.id;
    } else {
      connectedUser.push({
        email: JSON.parse(data).userEmail,
        socketId: socket.id,
      });
    }
    // console.log(connectedUser)
  });

  socket.on("HrSendNotification", (data) => {
    const currentSocketID = connectedUser.filter(
      (user) => user.email === JSON.parse(data).userEmail
    )[0]?.socketId;

    if (currentSocketID) {
      io.to(currentSocketID).emit("receiveNotification", data);
    }
  });

  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  // });
});



app.use('/api/interview',InterviewSheduleRoute)



httpServer.listen(Port, async () => {
  try {
    await ConnectDb();
    console.log(`SERVER STARED  : http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.log(`SOMETHING WENT WRONG : ${err}`);
  }
});
