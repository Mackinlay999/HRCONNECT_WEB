const { uploadPhoto } = require("../middleware/fileUploadMiddleware");

const jobRoutes = require("express").Router();

// uploadPhoto()

const {
  create,
  get,
  update,
  remove,
  getAll,
  getJobByID,
} = require("../controller/Job.controller");

const mcqController = require("../controller/InterviewSchedule/AptitudeRoundController");
const { getJobViewedAnalytics,updateJobViews } = require("../controller/UserAnalytics/JobViewedAnalytics");

jobRoutes.post("/create-job", uploadPhoto, create);

jobRoutes.get("/get-job/:email", get);

jobRoutes.get("/job/:id", getJobByID);

jobRoutes.get("/All-jobs", getAll);

jobRoutes.put("/update-job/:id", update);

jobRoutes.delete("/delete-job/:id", remove);

jobRoutes.get('/get-mcq', mcqController.getAllMCQs);

// Route to create a new MCQ
jobRoutes.post('/create', mcqController.createMCQ);

// Route to update an existing MCQ
jobRoutes.patch('/:id', mcqController.updateMCQ);

// Route to delete an MCQ
jobRoutes.delete('/:id', mcqController.deleteMCQ);

jobRoutes.get('/get-job-views', getJobViewedAnalytics)
jobRoutes.post('/update-job-views/:jobId', updateJobViews)

module.exports = jobRoutes;
