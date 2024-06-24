const mongoose = require("mongoose");

const ShortistSchema = new mongoose.Schema({
    employeeEmail: {
        type: String,
    },
    email: {
        type: String,
    },
    Job_title: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    name: {
        type: String,
    },
    biography: {
        type: String,
    },
    country: {
        type: String,
    },
    employmentType: {
        type: String,
    },
    jobDescription: {
        type: String,
    },
    skills: [
        {
            name: { type: String },
            index: { type: Number },
        },
    ],
    resume: [
        {
            filename: String,
            path: String,
            uploadedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    location: {
        type: String,
    },
});

const shortlistedCollection = mongoose.model("ShortlistedUser", ShortistSchema);

module.exports = shortlistedCollection;
