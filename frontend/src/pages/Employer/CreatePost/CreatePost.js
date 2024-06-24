import React, { useEffect, useRef, useState } from "react";
import createPost from './CreatePost.module.css'
import toast from "react-hot-toast";
import noImg from "../../../Assets/noImage.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

export default function CreatePost() {
  const imgRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigateTO = useNavigate();
  const { state } = useLocation();
  const [Skils, setSkils] = useState("");
  const [SkilsTags, SetSkilsTags] = useState([]);
  const [post, setPost] = useState({
    jobPoster: "",
    jobTitle: "",
    jobDescription: "",
    employmentType: "",
    location: "",
    salaryRange: "",
    skilRequired: [],
    jobExperience: "",
    education: "",
    responsibility: "",
    howToApply: "",
    employeeEmail: localStorage.getItem("email"),
    mcq: null
  });


  const handleOnChange = (e) => {
    if (e.target.name === "jobPoster") {
      if (e.target?.files[0]?.type.split("/")[0] === "image") {
        setPost({
          ...post,
          [e.target.name]: URL.createObjectURL(e.target.files[0]),
        });
        setSelectedImg(e.target.files[0]);
      } else {
        toast.error("Invalid image");
      }
    } else {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  };

  const handleSavePreviewClick = (e) => {
    e.preventDefault();
    if (post.jobPoster === "") {
      toast((t) => (
        <span>
          Select an <b>image</b> for post
        </span>
      ));
    }
    else if (
      post.jobTitle === "" ||
      post.jobDescription === "" ||
      post.employmentType === "" ||
      post.location === "" ||
      post.salaryRange === "" ||
      post.skilRequired.length <=0 ||
      post.jobExperience === "" ||
      post.education === "" ||
      post.responsibility === "" ||
      post.howToApply === ""
    ) {
      toast("All Fields Required !!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    else {
      navigateTO(`/create_post/${post.jobTitle}`, { state: { ...post, selectedImg } });
    }
  }

  const handleCancleClick = (e) => {
    e.preventDefault();
    setPost({
      jobPoster: "",
      jobTitle: "",
      jobDescription: "",
      employmentType: "",
      location: "",
      salaryRange: "",
      skilRequired: "",
      jobExperience: "",
      education: "",
      responsibility: "",
      howToApply: "",
      employeeEmail: localStorage.getItem("email"),
    })
    setSelectedImg(null)
  }

  const handleSetPreAssessmentButtonClick = (e) => {
    e.preventDefault();
    navigateTO(`/create_post/Set-Pre-Assessment`, { state: { ...post, selectedImg } });
  }

  const handleSkilsKeyDown = (e) => {
    if ((e.key === "Enter") && e.target.value.trim().length > 2) {

      if (post.skilRequired?.every((data) => data.toUpperCase() !== Skils.toUpperCase())) {
        post.skilRequired.push(Skils.toUpperCase())
        setPost(post);
      }
      setSkils("");
    } else if (e.key === 'Backspace' && e.target.value === '') {
      SetSkilsTags(SkilsTags.slice(0, -1));
    }
  }

  const handleRemoveSkils = (e, tagToRemove) => {
    setPost({...post,"skilRequired" : post.skilRequired.filter(tag => tag !== tagToRemove) })
  }

  useEffect(() => {
    if (state) {
      setPost({
        jobPoster: state?.jobPoster,
        jobTitle: state?.jobTitle,
        jobDescription: state?.jobDescription,
        employmentType: state?.employmentType,
        location: state?.location,
        salaryRange: state?.salaryRange,
        skilRequired: state?.skilRequired,
        jobExperience: state?.jobExperience,
        education: state?.education,
        responsibility: state?.responsibility,
        howToApply: state?.howToApply,
        employeeEmail: state?.employeeEmail,
        mcq: state?.mcq
      });
      setSelectedImg(state?.selectedImg)
    }
  }, [state]);

  return (
    <>
      <div className={createPost.__create_Post_Page}>
        <header className={createPost.__create_Post_Header}>
          <h1 style={{ fontSize: "30px" }}>Create Post</h1>
        </header>

        <div className={createPost.__postDetails}>

          <div className={createPost.__imgContainer}>
            <img className={createPost.__previewImg} src={post.jobPoster} alt="preview img" onError={(e) => { e.target.src = `${noImg}`; e.onError = null; }} onClick={(e) => imgRef.current.click()} />
            {
              !post.jobPoster && <p className={createPost.__previewImgText}>
                drop your image here or <span
                  style={{ color: "blue", fontWeight: "700", cursor: "pointer", marginLeft: "5px" }} onClick={(e) => imgRef.current.click()}> browse </span>
              </p>
            }
            <input type="file" accept="image/*" ref={imgRef} hidden name="jobPoster" onChange={handleOnChange} />
          </div>

          <form
            className={createPost.__createPost_Form}
            onSubmit={(e) => e.preventDefault()}
          >

            <div className={createPost.__input_Grps}>
              <label htmlFor="jobTitle">Job Title</label> <br />
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={post.jobTitle}
                className={createPost.__inputs}
                onChange={handleOnChange}
              />
            </div>

            <div className={createPost.__input_Grps}>
              <label htmlFor="employmentType">Employment Type</label> <br />
              <select
                className={createPost.__createPost_Select}
                name="employmentType"
                id="employmentType"
                onChange={handleOnChange}
                value={post.employmentType}
              >
                <option value="">Select your Empoyment Type</option>
                <option value="part time">Part Time</option>
                <option value="full time">Full Time</option>
                <option value="contractual">Contractual</option>
              </select>
            </div>

            <div className={createPost.__input_Grps}>
              <label htmlFor="location">Location</label> <br />
              <input
                type="text"
                name="location"
                id="location"
                value={post.location}
                className={createPost.__inputs}
                onChange={handleOnChange}
              />
            </div>

            <div className={createPost.__input_Grps}>
              <label htmlFor="salaryRange">Salary Range (INR)</label> <br />
              <select
                className={createPost.__createPost_Select}
                name="salaryRange"
                id="salaryRange"
                onChange={handleOnChange}
                value={post.salaryRange} 
              >
                <option value="">Select your job experience</option>
                <option value="2-3">2 - 3 LPA</option>
                <option value="3-5">3 - 5 LPA</option>
                <option value="5-7">5 - 7 LPA</option>
                <option value="7-9">7 - 9 LPA</option>
                <option value="10-12">10 - 12 LPA</option>
                <option value="15+">15+ LPA</option>
              </select>
            </div>


            <div className={createPost.__input_Grps}>
              <label htmlFor="skilRequired">Skill Required</label>
              <span className={createPost.__input_Grps_labelInfo}>Press <strong>ENTER</strong> for register the skil set</span>
               <br />
              {
                 post.skilRequired?.length > 0 && <ul className={createPost.__requiredSkils_List}>
                  {
                     post.skilRequired?.map((item, index) => {
                      return <li className={createPost.__requiredSkils_List_ITEM} key={index}> <span>{item}</span> <RxCross2 className={createPost.userSkils_item_DeleteButton} onClick={(e) => handleRemoveSkils(e, item)} /></li>
                    })
                  }
                </ul>
              }
              <input
                type="text"
                name="skilRequired"
                id="skilRequired"
                value={Skils}
                className={createPost.__inputs}
                onChange={(e) => setSkils(e.target.value)}
                placeholder="Enter your skils"
                onKeyDown={handleSkilsKeyDown}
              />
            </div>

            <div className={createPost.__input_Grps}>
              <label htmlFor="jobExperience">Job Experince</label> <br />
              <select
                className={createPost.__createPost_Select}
                name="jobExperience"
                id="jobExperience"
                onChange={handleOnChange}
                value={post.jobExperience}
              >
                <option value="">Select your job experience</option>
                <option value="fresher">Fresher</option>
                <option value="0-6">0 - 6 months</option>
                <option value="1-2">1 - 2 years</option>
                <option value="2-3">2 - 3 years</option>
                <option value="3-4">3 - 4 years</option>
                <option value="4-5">4 - 5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            <div className={createPost.__input_Grps}>
              <label htmlFor="education">Education</label> <br />
              <textarea
                type="text"
                name="education"
                id="education"
                value={post.education}
                className={createPost.__inputs}
                onChange={handleOnChange}
              />
            </div>

            <div className={createPost.__input_Grps}>
              <label htmlFor="responsibility">Responsibility</label> <br />
              <textarea
                type="text"
                name="responsibility"
                id="responsibility"
                value={post.responsibility}
                className={createPost.__inputs}
                onChange={handleOnChange}
              />
            </div>

            <div className={createPost.__input_Grps}>
              <label htmlFor="jobDescription">Job Description</label> <br />
              <textarea
                type="text"
                name="jobDescription"
                id="jobDescription"
                value={post.jobDescription}
                className={createPost.__inputs}
                onChange={handleOnChange}
              />
            </div>
            
            <div className={createPost.__input_Grps}>
              <label htmlFor="howToApply">How to Apply</label> <br />
              <input
                type="text"
                name="howToApply"
                id="howToApply"
                value={post.howToApply}
                className={createPost.__inputs}
                onChange={handleOnChange}
              />
            </div>

            <div className={createPost.preAssessment_buttonContainer}>
              <button type="button" className={createPost.preAssessment_button} onClick={handleSetPreAssessmentButtonClick}>Set Pre-Assessment Questions</button>
            </div>

          </form>
        </div>

        <div className={createPost.__buttons}>
          <button className={createPost.__btn_Cancel} onClick={handleCancleClick}>Cancel</button>
          <button className={createPost.__btn_Save} onClick={handleSavePreviewClick}>
            Save & Preview
          </button>
        </div>
      </div>

    </>
  );
}