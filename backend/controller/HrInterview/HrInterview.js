const InterviewVideoUpload = require("../../model/HrInterview/UploadVideo.Model");
const HrInterview = require("../../model/HrInterview/HrInterview.Model");

const cloudinary = require("../../utility/cloudinary");

interviewUploadVideo = (req, res) => {
  console.log(req.body.description);
  cloudinary.cloudinary.uploader.upload(
    req.file.path,
    {
      resource_type: "video",
      folder: "video",
    },
    async (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      const upload = new InterviewVideoUpload({
        name: req.file.originlname,
        url: result.url,
        cloudinary_is: result.public_id,
        description: req.body.description,
      });
      await InterviewVideoUpload.create(upload);
      res.send("video uploaded");
    }
  );
};

//
// const uploadHrQuestion = async (req, res) => {
//   const { hrquestion } = req.body;

//   try {
//     if (hrquestion) {
//       await HrInterview.create(hrquestion);
//       console.log("hrQuestion", hrquestion);
//     }
//     return res.status(200).json(hrquestion);
//   } catch (error) {
//     console.log(error);
//   }
// };

const uploadHrQuestion = async (req, res) => {
  const mcq = new HrInterview({
    hrquestion: req.body.question, // Assuming `question` is the key in the request body
  });

  try {
    const newMCQ = await mcq.save();
    res.status(201).json(newMCQ);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get hr question

const getHrQuestion = async (req, res) => {
  const HrQuestionData = await HrInterview.find({});

  console.log(HrQuestionData);
  res.json(HrQuestionData);
};

module.exports = { interviewUploadVideo, uploadHrQuestion, getHrQuestion };
