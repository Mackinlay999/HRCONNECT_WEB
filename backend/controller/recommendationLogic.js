const User = require('../model/users/UserModel');
const Job = require('../model/Job.Model');

const recommendJobsForUser = async (req, res) => {
  const email = req.body ? req.body.email : req.email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res ? res.status(404).json({ success: false, message: 'User not found' }) : [];
    }

    const { course, job_title, company } = user;

    let query = { $or: [] };

    if (job_title && company) {
      query.$or.push({ jobTitle: { $regex: new RegExp(job_title, 'i') } });
      query.$or.push({ company: { $regex: new RegExp(company, 'i') } });
    } else if (course) {
      query.$or.push({ education: { $regex: new RegExp(course, 'i') } });
      query.$or.push({ jobTitle: { $regex: new RegExp(course, 'i') } });
    } else {
      return res ? res.status(400).json({ success: false, message: 'No relevant user data provided' }) : [];
    }

    const recommendedJobs = await Job.find(query);
    // console.log("Recommended jobs found:", recommendedJobs.length, recommendedJobs.map(job => ({
    //   jobTitle: job.jobTitle,
    //   education: job.education,
    // })));

    return res ? res.status(200).json({ success: true, recommendedJobs }) : recommendedJobs;
  } catch (error) {
    console.error(error);
    return res ? res.status(500).json({ success: false, message: 'Internal Server Error' }) : [];
  }
};

module.exports = { recommendJobsForUser };
