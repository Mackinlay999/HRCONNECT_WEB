const { savedJobCollection, appliedJobCollection } = require("../model/MyJob.model");
const jobCollection = require("../model/Job.Model");
const User = require("../model/users/UserModel");

const createAppliedJob = async (req, res) => {
    try {
        const { _id, email, userData, AppliedDate, jobTitle, employeeEmail, jobPoster, jobDescription, employmentType, location, salaryRange, skilRequired, jobExperience, createdAt, applicationStatus, percentageResult,firstResumeFilename } = req.body;

        console.log(req.body)
        // Current USER
        const mongooseUser = await User.findOne({ email: email });

        // add the applied job appliedjobCollection
        const mongooseResponse = await appliedJobCollection.create({
            jobID: _id, jobTitle: jobTitle, jobPoster: jobPoster, jobDescription: jobDescription, employmentType: employmentType, location: location, salaryRange: salaryRange, skilRequired: skilRequired, employeeEmail: employeeEmail, jobExperience: jobExperience, createdAt: Date.now(), userEmail: email, applicationStatus: applicationStatus
        });
        const userjobdes = {
            jobID: _id, jobTitle: jobTitle, jobDescription: jobDescription, employmentType: employmentType, location: location, salaryRange: salaryRange, testResult: percentageResult, ...userData, AppliedDate: AppliedDate, UserResume:firstResumeFilename
        }

        // update the jobo collection applicationCount by 1 and also update the applidBy data in collection with user emailID everytime any user applied for jobs
        const updateJobCollection = await jobCollection.updateOne({ _id }, {
            $push: { appliedBy: userjobdes },
            $inc: { totalApplication: 1 },
        });


        if (mongooseResponse && updateJobCollection.acknowledged) {
            await savedJobCollection.findOneAndDelete({
                jobID: _id,
                userEmail: email,
            });
            await User.updateOne({ email }, {
                $push: { userAppliedJob: { jobID: _id } },
                userSavedJob: mongooseUser.userSavedJob.filter((data) => data.jobID !== _id)
            });
            res.status(200).json({
                success: true,
                msg: "Job applied Successfully",
            });
        } else {
            res.status(400).json({
                success: false,
                msg: "Try again"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: `server failed! Try again ${error.message}`
        })
    }
}

const getAppliedJob = async (req, res) => {
    try {
        const mongooseResponse = await appliedJobCollection.find({ userEmail: req.params.email })
        if (mongooseResponse) {
            res.status(200).json({
                success: true,
                appliedJob: mongooseResponse
            })
        } else {
            res.status(404).json({
                success: false,
                appliedJob: mongooseResponse
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `server failed! Try again ${error.message}`
        })
    }
}

const getApplicantsForJob = async (req, res) => {

    try {
        const jobId = req.params.jobId;

        // Find all applied jobs for the given jobId
        const applicants = await appliedJobCollection.find({
            jobID: jobId
        });

        if (!applicants || applicants.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No applicants found for this job"
            });
        }

        res.status(200).json({
            success: true,
            applicants: applicants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Server failed! Try again ${error.message}`
        });
    }
}

const removeAppliedJob = async (req, res) => {
    try {
        const [email, jobId] = req.params.email.split("-")
        const mongooseResponse = await appliedJobCollection.findOneAndDelete({
            jobID: jobId,
            userEmail: email,
        });

        const mongooseUser = await User.findOne({ email });

        await User.updateOne({ email }, {
            userSavedJob: mongooseUser.userSavedJob.filter((data) => data.jobID !== jobId)
        });
        if (mongooseResponse) {
            res.status(200).json({
                success: true,
                msg: "Remove from saved collection successfull"
            })
        } else {
            res.status(404).json({
                success: false,
                msg: "Job not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `${error.message}`
        })
    }
}

const updateApplicationStatus = async (req, res) => {
    const { email } = req.params;
    const { applicationStatus, userJobID } = req.body;

    const filterdAppliedJob = await appliedJobCollection.findOne({ jobID: userJobID, userEmail: email })

    if (!filterdAppliedJob?.applicationStatus.some((status) => status.StatusText.toLowerCase() === applicationStatus.StatusText.toLowerCase())) {
        const mongooseUpdateResponse = await appliedJobCollection.updateOne({ jobID: userJobID, userEmail: email }, {
            $push: { applicationStatus: applicationStatus }
        });
        if (mongooseUpdateResponse.modifiedCount > 0) {
            res.status(200).json({
                status: true,
                msg: "Application status updated"
            })
        } else {
            res.status(200).json({
                status: false,
                msg: "Application status Already updated"
            })
        }

    } else {
        res.status(200).json({
            status: false,
            msg: "Application status already updated"
        })
    }

}

//! Saved job related controllers
const createSavedJob = async (req, res) => {
    try {
        const { _id, email, jobTitle, employeeEmail, jobPoster, jobDescription, employmentType, location, salaryRange, skilRequired, jobExperience, createdAt } = req.body;
        const mongooseResponse = await savedJobCollection.create({
            jobID: _id,
            jobTitle: jobTitle,
            jobPoster: jobPoster,
            jobDescription: jobDescription,
            employmentType: employmentType,
            location: location,
            salaryRange: salaryRange,
            skilRequired: skilRequired,
            employeeEmail: employeeEmail,
            jobExperience: jobExperience,
            createdAt: createdAt,
            userEmail: email
        });
        if (mongooseResponse) {
            await User.updateOne({ email }, {
                $push: { userSavedJob: { jobID: _id } },
            });
            res.status(200).json({
                success: true,
                msg: "Job saved Successfully",
            })
        } else {
            res.status(400).json({
                success: false,
                msg: "Try again"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `server failed! Try again ${error.message}`
        })
    }
}

const getSavedJob = async (req, res) => {
    try {
        const mongooseResponse = await savedJobCollection.find({ userEmail: req.params.email })
        if (mongooseResponse) {
            res.status(200).json({
                success: true,
                savedJob: mongooseResponse
            })
        } else {
            res.status(404).json({
                success: false,
                savedJob: mongooseResponse
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `server failed! Try again ${error.message}`
        })
    }
}

const removeSavedJob = async (req, res) => {
    try {
        const [email, jobId] = req.params.email.split("-")
        const mongooseResponse = await savedJobCollection.findOneAndDelete({
            jobID: jobId,
            userEmail: email,
        });
        const mongooseUser = await User.findOne({ email: email });

        await User.updateOne({ email }, {
            userSavedJob: mongooseUser.userSavedJob.filter((data) => data.jobID !== jobId)
        });
        if (mongooseResponse) {
            res.status(200).json({
                success: true,
                msg: "Remove from saved collection successfull"
            })
        } else {
            res.status(404).json({
                success: false,
                msg: "Job not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `server failed! Try again ${error.message}`
        })
    }
}


module.exports = {
    createAppliedJob,
    getAppliedJob,
    removeAppliedJob,
    getApplicantsForJob,
    createSavedJob,
    getSavedJob,
    removeSavedJob,
    updateApplicationStatus
}