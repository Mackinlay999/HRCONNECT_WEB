import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOption: {},
  result: 0,
  percentageResult: 0,
  currentUser: {
    token: localStorage.getItem("token") || "",
    profileImage: localStorage.getItem("profileImage") || "",
    email: localStorage.getItem("email") || "",
    name: localStorage.getItem("name") || "",
    userType: localStorage.getItem("userType") || "",
    savedJob: localStorage.getItem("savedJob") ? JSON.parse(localStorage.getItem("savedJob")) : [],
    appliedJob: localStorage.getItem("appliedJob") ? JSON.parse(localStorage.getItem("appliedJob")) : [],
    bookmarkUser: localStorage.getItem("bookmarkUser") ? JSON.parse(localStorage.getItem("bookmarkUser")) : [],
  },
};

const ReduxSlice = createSlice({
  name: "ReduxSlice",
  // initialState: {
  //   selectedOption: {},
  //   result: 0,
  //   percentageResult: 0,
  //   currentUser: {
  //     token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  //     profileImage: localStorage.getItem("profileImage")
  //       ? localStorage.getItem("profileImage")
  //       : "",
  //     email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
  //     name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
  //     userType: localStorage.getItem("userType")
  //       ? localStorage.getItem("userType")
  //       : "",
  //     savedJob:
  //       localStorage.getItem("userType") !== "employee"
  //         ? JSON.parse(localStorage.getItem("savedJob"))
  //         : [],
  //     appliedJob:
  //       localStorage.getItem("userType") !== "employee"
  //         ? JSON.parse(localStorage.getItem("appliedJob"))
  //         : [],
  //     bookmarkUser:
  //       localStorage.getItem("userType") === "employee"
  //         ? JSON.parse(localStorage.getItem("bookmarkUser")) ?? []
  //         : [],
  //   },
  // },

  initialState,
  reducers: {
    handleSelectedOption(state, action) {
      state.selectedOption[`${action.payload.questionNum}`] =
        action.payload.tempSelection;
    },

    calculatedResult(state, action) {
      state.selectedOption = {};
      state.result = action.payload;
      state.percentageResult = ((action.payload * 10) / 100) * 100 + "%";
    },
    handleClearResult(state) {
      state.selectedOption = {};
      state.result = 0;
      state.percentageResult = 0;
    },

    handleUserLogin(state, action) {
      state.currentUser.token = action.payload.token;
      state.currentUser.email = action.payload.email;
      state.currentUser.name = action.payload.name;
      state.currentUser.userType = action.payload.userType;
      state.currentUser.profileImage = action.payload.profileImage || "";
      if (action.payload.userType !== "employee") {
        state.currentUser.savedJob = action.payload.savedJob || [];
        state.currentUser.appliedJob = action.payload.appliedJob || [];
      }

      if (action.payload.userType === "employee") {
        state.currentUser.bookmarkUser = action.payload.bookmarkUser || [];
      }

      localStorage.setItem("token", state.currentUser.token);
      localStorage.setItem("email", state.currentUser.email);
      localStorage.setItem("name", state.currentUser.name);
      localStorage.setItem("userType", state.currentUser.userType);
      localStorage.setItem("profileImage", state.currentUser.profileImage);

      if (action.payload.userType !== "employee") {
        localStorage.setItem(
          "savedJob",
          JSON.stringify(state.currentUser.savedJob)
        );
        localStorage.setItem(
          "appliedJob",
          JSON.stringify(state.currentUser.appliedJob)
        );
      }

      if (action.payload.userType === "employee") {
        localStorage.setItem(
          "bookmarkUser",
          JSON.stringify(state.currentUser.bookmarkUser)
        );
      }
    },

    handleSavedJob(state, action) {
      state.currentUser.savedJob.push({
        jobID: action.payload,
      });
      localStorage.setItem(
        "savedJob",
        JSON.stringify(state.currentUser.savedJob)
      );
    },

    handleAppliedJob(state, action) {
      state.currentUser.appliedJob.push({
        jobID: action.payload,
      });
      localStorage.setItem(
        "appliedJob",
        JSON.stringify(state.currentUser.appliedJob)
      );
    },

    handleRemoveSavedJob(state, action) {
      let filteredData = state.currentUser.savedJob.filter(
        (data) => data.jobID !== action.payload
      );
      state.currentUser.savedJob = filteredData;
      localStorage.setItem(
        "savedJob",
        JSON.stringify(state.currentUser.savedJob)
      );
    },

    handleBookmark(state, action) {
      state.currentUser.bookmarkUser.push({
        email: action.payload.email,
        job_title: action.payload.jobTitle,
      });
      localStorage.setItem(
        "bookmarkUser",
        JSON.stringify(state.currentUser.bookmarkUser)
      );
    },

    handleRemoveBookmark(state, action) {
      let filteredData = state.currentUser.bookmarkUser.filter(
        (data) => data.email === action.payload.email
      ).filter(
        (data) => data.job_title !== action.payload.jobTitle
      );

      state.currentUser.bookmarkUser = filteredData;
      localStorage.setItem(
        "bookmarkUser",
        JSON.stringify(state.currentUser.bookmarkUser)
      );
    },

    handleUserLogOut(state) {
      state.currentUser.token = "";
      state.currentUser.email = "";
      state.currentUser.name = "";
      state.currentUser.userType = "";
      state.currentUser.savedJob = [];
      state.currentUser.appliedJob = [];
      localStorage.clear();
    },
  },
});
export const {
  handleSelectedOption,
  calculatedResult,
  handleClearResult,
  handleUserLogin,
  handleUserLogOut,
  handleSavedJob,
  handleRemoveSavedJob,
  handleAppliedJob,
  handleBookmark,
  handleRemoveBookmark
} = ReduxSlice.actions;
export default ReduxSlice.reducer;
