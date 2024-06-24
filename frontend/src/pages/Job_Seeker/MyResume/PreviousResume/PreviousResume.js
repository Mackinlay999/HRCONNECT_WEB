import React, { useState, useEffect } from "react";
import axios from "axios";
import ResumeStyle from "../MyResume.module.css";
import toast from "react-hot-toast";
import Loader from "../../../Common-Components/Loaders/Loader";


// const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
const newUrl = process.env.REACT_APP_BACKEND_BASE_URL_WITHOUT_API
const PreviousResume = () => {
  const [resumes, setResumes] = useState([]);
  const [uploadTrigger, setUploadTrigger] = useState(false); // State to trigger re-fetch
  const [IsLoaded,setIsLoaded]=useState(false)
  const email = localStorage.getItem("email");
  // console.log(resumes);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(
          `${newUrl}/resume/getall/${email}`
        );
        const resumesData = response.data.resumes;

        if (resumesData.length > 0) {
          const sortedResumes = resumesData.sort(
            (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
          );
          setResumes(sortedResumes);
        } else {
          setResumes([]);
        }
        setIsLoaded(true)

      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, [email, uploadTrigger,resumes._id]); // Add uploadTrigger to dependencies

  const rgbArray = [
    "#ff7f50",
    "#87cefa",
    "#da70d6",
    "#32cd32",
    "#6495ed",
    "#ff69b4",
    "#ba55d3",
    "#cd5c5c",
    "#ffa500",
    "#40e0d0",
  ];

  const previewArray = [
    "https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg",
    "https://www.my-resume-templates.com/wp-content/uploads/2023/12/education-resume-example-292.jpg",
    "https://www.my-resume-templates.com/wp-content/uploads/2023/12/personal-resume-example-254.jpg",
    "https://d25zcttzf44i59.cloudfront.net/official-resume-template.png",
  ];

  const handleDeleteResume = async (public_id) => {
    setIsLoaded(false)
    try {
    
      const response = await axios.delete(
       ` ${newUrl}/resume/delete`,
        {
          data: {
            email: email,
            public_id: public_id,
          },
        }
      );
    toast.success(response.data.message); // Log success message

      // Trigger re-fetch by updating uploadTrigger state
      setIsLoaded(true)
      setUploadTrigger((prevState) => !prevState);
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  return (

<>
{IsLoaded?    <div className={ResumeStyle.wrapper}>
{resumes.length > 0 ? (
  <div className={ResumeStyle.content}>
    {resumes.map((resume, index) => (
      <div key={index} className={ResumeStyle.post_resume_section}>
        <div
          style={{ backgroundColor: rgbArray[index % 10] }}
          className={ResumeStyle.circle_section}
        >
          <img
            src={previewArray[index % previewArray.length]}
            alt="preview"
          />
        </div>
        <div
          className={ResumeStyle.post}
          style={{ backgroundColor: rgbArray[index % 10] }}
        >
          <p>{resume.filename}</p>
          <i
            className="fa-solid fa-xmark"
            onClick={() => handleDeleteResume(resume.public_id)}
          ></i>
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="loading">No resumes available</p>
)}
</div>
:<Loader/>}

</>  );
};

export default PreviousResume;
