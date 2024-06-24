import React, { useState } from 'react'
import createPost from './CreatePost.module.css'
import { IoImageOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from "../../Common-Components/Loaders/Loader";
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
function CreatePostPreview() {
  const [loading, setLoading] = useState(false);
  const navigateTO = useNavigate();
  const { title } = useParams();
  const { state } = useLocation();


  const handleCancleButtonClick = (e) => {
    e.preventDefault();
    navigateTO("/create_post", { state: { ...state } })
  }


  const handleCreatePost = (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();
    formData.set("employeeEmail", localStorage.getItem("email"));
    formData.append("jobPoster", state.selectedImg);
    formData.append("jobTitle", state.jobTitle);
    formData.append("jobDescription", state.jobDescription);
    formData.append("employmentType", state.employmentType);
    formData.append("location", state.location);
    formData.append("salaryRange", state.salaryRange);
    formData.append("skilRequired", state.skilRequired);
    formData.append("jobExperience", state.jobExperience);
    formData.append("education", state.education);
    formData.append("responsibility", state.responsibility);
   formData.append("howToApply", state.howToApply);
    const mcqs = state.mcq ?? [];

    // Append MCQs if available
    if (mcqs.length > 0) {
      mcqs.forEach((mcq, index) => {
        formData.append(`mcq[${index}][question]`, mcq.question);
        mcq.options.forEach((option, optionIndex) => {
          formData.append(`mcq[${index}][options][${optionIndex}]`, option);
        });
        formData.append(`mcq[${index}][correctAnswer]`, mcq.correctAnswer);
      });
    }
    setLoading(true);
    axios.post(`${baseUrl}/jobs/create-job`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        if (response.data.success) {
          toast.success("Post created successfully");
          sessionStorage.clear()
          setLoading(false);
          navigateTO("/create_post")
          localStorage.removeItem("mcqs")
        } else {
          toast.error("Try again");
          setLoading(false)
        }
      })
      .catch((err) => {
        toast.error(`${err.message}`);
        setLoading(false)
      });
  };

  return (
    <div className={createPost.__PostPreviewPage_Container}>
      {
        loading ? <Loader /> : <>

          <h1 className={createPost.__PostPreviewPage_heading}>Create Post</h1>

          <div className={createPost.__PostPreviewPage_PosterContainer}>
            <img src={state?.jobPoster} alt={title} className={createPost.__PostPreviewPage_Poster} />
          </div>

          <div className={createPost.__PostPreviewPage_PosterName_Box}>
            <span className={createPost.__PostPreviewPage__imgUploaded}>
              <IoImageOutline className={createPost.__PostPreviewPage__imgICON} />
              <span className={createPost.__PostPreviewPage__imgUploadedText}>Image Uploaded</span>
            </span>
            <p className={createPost.__PostPreviewPage_PosterName}>
              {state?.selectedImg?.name}
            </p>
          </div>

          <div className={createPost.__PostPreviewPage_PostDescription_Box}>
            <p className={createPost.__PostPreviewPage_Description}>
              {state?.jobDescription}
            </p>

            <p className={createPost.__PostPreviewPage_Description}>
              <strong>Responsibility: </strong>  {state?.responsibility}
            </p>

            <p className={`${createPost.__PostPreviewPage_Description}, ${createPost.__PostPreviewPage_Skils}`}>
              <strong>Skils: </strong>  {
                state?.skilRequired?.map((skils, index)=>{
                  return <span key={index} className={createPost.__PostPreviewSkilsTag}>{skils}</span>
                })
               
              }
            </p>

            <p className={`${createPost.__PostPreviewPage_Description}, ${createPost.__PostPreviewPage_Skils}`}>
              <strong>Qualifications: </strong>  <span> {state?.education}</span>
            </p>

            <p className={`${createPost.__PostPreviewPage_Description}, ${createPost.__PostPreviewPage_Skils}`}>
              <strong>Experience: </strong>  <span> {state?.jobExperience} Years</span>
            </p>

            <p className={`${createPost.__PostPreviewPage_Description}, ${createPost.__PostPreviewPage_Skils}`}>
              <strong>Salary: </strong>  <span> {state?.salaryRange} LPA</span>
            </p>

            <p className={`${createPost.__PostPreviewPage_Description}, ${createPost.__PostPreviewPage_Skils}`}>
              <strong>Location: </strong>  <span> {state?.location}</span>
            </p>

          </div>

          <div className={createPost.__PostPreviewPage_ButtonContainer}>
            <button type="button" className={createPost.__PostPreviewPage_Buttons} onClick={handleCancleButtonClick}>Cancel</button>
            <button type="button" className={createPost.__PostPreviewPage_Buttons} onClick={handleCreatePost}>Post</button>
          </div>

        </>
      }
    </div>
  )
}

export default CreatePostPreview
