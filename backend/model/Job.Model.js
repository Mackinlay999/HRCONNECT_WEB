const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true,
        },
        employeeEmail: {
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
                name: { type: String },
                index: { type: Number }
            }
        ],
        jobExperience: {
            type: String,
            required: true,
        },
        education: {
            type: String,
            // required: true,
        },
        responsibility: {
            type: String,
            // required: true,
        },
        howToApply: {
            type: String,
            // required: true,
        },
        createdAt: {
            type: Number,
        },
        totalApplication: {
            type: Number,
            default: 0,
        },
        appliedBy: [
            {
                type: mongoose.Schema.Types.Mixed, // Store any type of data
                required: true,
            }
        ],
        mcq: [
            {
                question: {
                    type: String,
                },
                options: {
                    type: [String],
                    validate: {
                        validator: function (value) {
                            return value.length === 4;
                        },
                        message: 'Options array must contain exactly four elements'
                    },
                },
                correctAnswer: {
                    type: String,
                }
            }
        ],
        jobViews: [{
           userEmail: {
            type: String,
            required: true,
        },
            viewedAt: {
                type: Date,
                default: Date.now
            }
        }]
    },
);



const jobCollection = mongoose.model('jobs', jobSchema);

module.exports = jobCollection;
