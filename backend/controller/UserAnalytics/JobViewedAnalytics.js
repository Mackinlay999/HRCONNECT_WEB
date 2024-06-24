const Job = require("../../model/Job.Model");

const getJobViewedAnalytics = async (req, res) => {
  const { userEmail } = req.query;

  try {
    const jobs = await Job.find({ "jobViews.userEmail": userEmail });

    const jobViewsData = {};
    const currentYear = new Date().getFullYear();
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(currentYear, i).toLocaleString("default", { month: "short" })
    );
    months.forEach((month) => {
      jobViewsData[month] = 0;
    });

    jobs.forEach((job) => {
      job.jobViews.forEach((view) => {
        const monthYear = new Date(view.viewedAt).toLocaleString("default", {
          month: "short",
        });
        if (view.userEmail === userEmail) {
          jobViewsData[monthYear] += 1;
        }
      });
    });

    res.json({ jobViewsData });
  } catch (error) {
    console.error("Error fetching job view analytics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




const updateJobViews = async (req, res) => {
  const { jobId } = req.params;
  const { userEmail } = req.query;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    const alreadyViewed = job.jobViews.some(
      (view) => view.userEmail === userEmail
    );


    if (!alreadyViewed) {
      job.jobViews.push({ userEmail, viewedAt: new Date() });
      await job.save();
      res.json({ message: "Job view tracked successfully" });
    } else {
      res.json({ message: "Job view already tracked" });
    }
  } catch (error) {
    console.error("Error tracking job view:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getJobViewedAnalytics, updateJobViews };
