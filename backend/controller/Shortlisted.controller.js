const shortlistedCollection = require("../model/ShortlistedUser.model");
const HrUser = require("../model/users/HrUserModel");



const createShortlist = async (req, res) => {
    const { HrEmail } = req.params;
    const { email, profileImage, name, jobTitle
        , biography, country, job_title, employmentType, jobDescription, skills, resume, location } = req.body;
    try {

        // Matching the current HR - Email and User - Email with 
        const mongooseResponse = await shortlistedCollection.create({
            employeeEmail: HrEmail,
            email: email,
            Job_title: jobTitle,
            profileImage,
            name: name,
            biography: biography,
            country: country,
            employmentType: employmentType,
            jobDescription: jobDescription,
            skills: skills,
            resume: resume,
            location: location
        });

        // Update the hr user collection based on the BOOKMARKED USER
        await HrUser.updateOne({ email: HrEmail }, {
            $push: {
                shortlistedUsers: {
                    email: email,
                    job_title: jobTitle,
                }
            },
        });
        if (mongooseResponse) {
            return res.status(200).json({
                success: true,
                msg: "User added to bookmarked collection"
            })

        } else {
            return res.status(200).json({
                success: false,
                msg: "Something went wrong, Try again later"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(`Internal server Error : ${error.message}`)
    }

}

const getShortlist = async (req, res) => {
    const { HrEmail } = req.params;

    try {
        const mongooseResponse = await shortlistedCollection.find({ employeeEmail: HrEmail });

        if (mongooseResponse.length > 0) {
            res.status(200).json({
                success: true,
                shortlistedUser: mongooseResponse
            })
        } else {
            res.status(404).json({
                success: false,
                shortlistedUser: mongooseResponse
            })
        }
    } catch (error) {
        res.status(500).send(`Internal server Error : ${error.message}`)
    }
}

const removeShortlist = async (req, res) => {

    const [employeeEmail, email, Job_title] = req.params.HrEmail.split("-");
    try {
        const mongooseResponse = await shortlistedCollection.deleteMany({
            employeeEmail: employeeEmail,
            email: email,
            Job_title: Job_title,
        });
        const mongooseUser = await HrUser.findOne({ email: employeeEmail });

        await HrUser.updateOne({ email: employeeEmail }, {
            shortlistedUsers: mongooseUser.shortlistedUsers.filter((data) => data.email === email).filter((data) => data.job_title !== Job_title)
        });

        if (mongooseResponse) {
            return res.status(200).json({
                success: true,
                msg: "User removed from  bookmarked collection"
            })

        } else {
            return res.status(200).json({
                success: false,
                msg: "Something went wrong, Try again later"
            })
        }


    } catch (error) {
        res.status(500).send(`Internal server Error : ${error.message}`)
    }
}


module.exports = {
    createShortlist,
    getShortlist,
    removeShortlist,
}
