const User = require('../../model/users/UserModel');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const uploadResume = async (req, res) => {
  try {
    const { email } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'resumes',
        public_id: `${file.originalname}_${Date.now()}`
      },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Cloudinary upload error', error });
        }

        user.resume.push({
          filename: file.originalname,
          url: result.secure_url,
          public_id: result.public_id,
          uploadedAt: new Date(),
        });

        await user.save();

        res.status(201).json({ message: 'Resume uploaded successfully', user });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error('Error uploading resume:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getResumes = async (req, res) => {
  const { email } = req.params;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the resumes array from the user object
    const resumes = user.resume;

    res.status(200).json({ resumes });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};

const deleteResume = async (req, res) => {
  try {
    const { email, public_id } = req.body;
    // console.log(public_id);

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Filter out the resume with the matching public_id
    user.resume = user.resume.filter((resume) => resume.public_id !== public_id);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Resume deleted successfully', user: user });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
};

module.exports = { uploadResume, getResumes, deleteResume };
