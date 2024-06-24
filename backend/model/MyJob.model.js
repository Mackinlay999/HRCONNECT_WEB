const mongoose = require('mongoose');

const myJobSchema = new mongoose.Schema(
    {
        jobID: {
            type: String,
            required: true,
        },
        jobTitle: {
            type: String,
            required: true,
        },
        jobPoster: {
            type: String,
            required: true,
        },
        jobDescription: {
            type: String,
            required: true,
        },
        employmentType: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        salaryRange: {
            type: String,
            required: true,
        },
        skilRequired: [
            {
                type: String
            },
        ],
        employeeEmail: {
            type: String,
            required: true,
        },
        jobExperience: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Number,
        },
        userEmail: {
            type: String,
            required: true,
        },
        applicationStatus: [{

            JobStatus: {
                type: String
            },
            StatusText:{
                type: String
            },
            updatedAt: {
                type: Date
            }
        }]
    }
);
const appliedJobCollection = mongoose.model('appliedJob', myJobSchema);
const savedJobCollection = mongoose.model('savedJob', myJobSchema);

module.exports = { appliedJobCollection, savedJobCollection };
