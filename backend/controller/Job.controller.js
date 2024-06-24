const { uploadonCloudinary } = require("../utility/cloudinary");
const {
  savedJobCollection,
  appliedJobCollection,
} = require("../model/MyJob.model");
const jobCollection = require("../model/Job.Model");
const User = require("../model/users/UserModel");

const create = async (req, res) => {
  try {
    console.log('File:', req.file);

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "File is missing" });
    }

    const result = await uploadonCloudinary(req.file.buffer, req.file.originalname);

    if (!result || !result.secure_url) {
      return res.status(500).json({ message: "Error uploading to Cloudinary" });
    }
    const {
      jobTitle,
      jobDescription,
      employmentType,
      location,
      salaryRange,
      skilRequired,
      employeeEmail,
      jobExperience,
      education,
      responsibility,
      howToApply,
      mcq
    } = req.body;

    // Parse the skilRequired string into an array of objects
    const skillArray = skilRequired.split(",").map((skill, index) => ({ name: skill.trim(), index }));

    const mcqData = mcq ? mcq : [];

    const newPost = {
      jobPoster: result.secure_url,
      jobTitle,
      jobDescription,
      employmentType,
      location,
      salaryRange,
      skilRequired: skillArray, // Use the parsed skill array
      employeeEmail,
      jobExperience,
      education,
      responsibility,
      howToApply,
      createdAt: Date.now(),
      mcq: mcqData
    };

    const mongooseResponse = await jobCollection.create(newPost);
    if (mongooseResponse) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
};

const getJobByID = async (req, res) => {
  try {
    const jobs = await jobCollection.findById(req.params.id);
    if (jobs) {
      res.status(200).send({ jobs, success: true });
    } else {
      res.status(404).send({ jobs: "No job found", success: false });
    }
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

const get = async (req, res) => {
  try {
    const jobs = await jobCollection.find({ employeeEmail: req.params.email });

    if (jobs) {
      res.status(200).send({ jobs, success: true });
    } else {
      res.status(404).send({ jobs: "No job found", success: false });
    }
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

const getAll = async (req, res) => {
  try {
    const mongooseResponse = await jobCollection.find({});

    if (mongooseResponse.length === 0) {
      res.status(200).send({ job: "No job found", success: false });
    } else {
      res.status(200).send({ jobs: mongooseResponse, success: true });
    }
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

const update = async (req, res) => {
  try {
    const data = await jobCollection.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );

    res.status(200).send({ job: data, success: true });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

const remove = async (req, res) => {
  try {
    let id = req.params.id;
    const data = await jobCollection.findByIdAndDelete(id);
    await User.updateMany({ $pull: { userSavedJob: { jobID: id } } });
    await User.updateMany({ $pull: { userAppliedJob: { jobID: id } } });
    await appliedJobCollection.deleteMany({ jobID: id });
    await savedJobCollection.deleteMany({ jobID: id });

    if (data) {
      res.status(200).send({ job: data, success: true });
    } else {
      res.status(404).send({ job: "No job found", success: false });
    }
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

module.exports = {
  create,
  get,
  update,
  remove,
  getAll,
  getJobByID,
};
