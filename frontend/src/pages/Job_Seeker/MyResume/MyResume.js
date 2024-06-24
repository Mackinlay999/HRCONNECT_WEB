import React, { useState } from "react";
import { GrNotes } from "react-icons/gr";
import toast from "react-hot-toast";
import ResumeStyle from "./MyResume.module.css";
import image from "./img.png";
import Resume1 from "./canvaresume1.webp";
import Resume2 from "./canvaresume2.webp";
import Resume3 from "./canvaresume3.jpg";
import Resume4 from "./canvaresume4.webp"; 
import Resume5 from "./canvaresume5.webp";
import Resume6 from "./canvaresume6.webp"; 
import Resume7 from "./canvaresume7.webp";
import Resume8 from "./canvaresume8.webp"
import CurrentResume from "./CurrentResume/CurrentResume";
import PreviousResume from "./PreviousResume/PreviousResume";
import Modal from "./Model";
import axios from "axios";

const newUrl = process.env.REACT_APP_BACKEND_BASE_URL_WITHOUT_API;

function MyResume() {
  const [resume_type, setresume_type] = useState("myresume");
  const [btn_Popup, setbtnPopup] = useState(false);
  const email = localStorage.getItem("email");
  const [selectedFile, setSelectedFile] = useState();
  
  // console.log(selectedFile);
  const [selectedTemplates, setSelectedTemplates] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("resumefile", selectedFile);
    setbtnPopup(false);
    setSelectedFile(null)

    try {
      const response = await axios.post(`${newUrl}/resume/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      
      // After successful upload, toggle the upload popup

      setbtnPopup(false);
      
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };

  const handleCheckResumeScore = () => {
    const url = 'https://www.myperfectresume.com/resume/ats-resume-checker';
    window.open(url, '_blank');
  };

  const resumeTemplate = [
    {
      url: "https://www.canva.com/p/templates/EAFUHJL_9dk-white-and-beige-minimalist-designer-professional-cv-resume/",
      image: Resume1
    },
    {
      url: "https://www.canva.com/p/templates/EAFrQwy5ZTU-white-and-beige-simple-student-cv-resume/",
      image: Resume2
    },
    {
      url: "https://www.canva.com/p/templates/EAE_dVkd4js-grey-and-white-minimalist-graphic-designer-resume-template/",
      image: Resume3
    },
    {
      url: "https://www.canva.com/p/templates/EAFwtyUjc9I-professional-cv-resume/",
      image: Resume4
    },
    {
      url:"https://www.canva.com/p/templates/EAFk2sEzxO8-black-modern-professional-resume/",
      image:Resume5
    },
    {
      url:"https://www.canva.com/p/templates/EAFiazXPnWo-professional-modern-cv-resume/",
      image:Resume6
    },
    {
      url:"https://www.canva.com/p/templates/EAFoxAIruaI-professional-cv-resume/",
      image:Resume7
    },
    {
      url:"https://www.canva.com/p/templates/EAE-TBgRwsI-pink-simple-profile-resume/",
      image:Resume8
    }
  ];

  const handleGenerateResume = () => {
    setSelectedTemplates(resumeTemplate);
  };

  const handleCloseModal = () => {
    setSelectedTemplates([]);
  };

  return (
    <>
      <form className={btn_Popup ? `${ResumeStyle.UploadPopUp_box}` : `${ResumeStyle.hidden_popup}`}>
        <i className="fa-solid fa-xmark" onClick={() => setbtnPopup(!btn_Popup)} />
        <div className={ResumeStyle.inner_upload_Box}>
          <p>Upload resume to apply for jobs</p>
          <div className={ResumeStyle.Upload_btn}>
            <label htmlFor="fileInput" className={ResumeStyle.customFileInput}>
              {selectedFile ? (
                <p>{selectedFile.name}</p>
              ) : (
                <div className={ResumeStyle.input_label}>
                  <div>
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  </div>
                  <p>Upload Resume</p>
                </div>
              )}
              <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: "none" }} />
            </label>
          </div>
          <div>............................ or .............................</div>
          <div className={ResumeStyle.Drive_box}>
            <button className={ResumeStyle.google_upload}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" alt="drive" />
              <p>Google Drive</p>
            </button>
            <button className={ResumeStyle.google_upload}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/2202px-Dropbox_Icon.svg.png" alt="drop" />
              <p>Drop Box</p>
            </button>
          </div>
          <button type="submit" onClick={handleUpload} className={ResumeStyle.inner_Upload_btn}> Upload </button>
        </div>
      </form>

      <div className={btn_Popup ? `${ResumeStyle.blur_resume_container}` : `${ResumeStyle.resume_container}`}>
        <div className={ResumeStyle.resume_left_container}>
          <div className={ResumeStyle.resume_type_box}>
            <div className={resume_type === "myresume" ? `${ResumeStyle.job_active}` : `${ResumeStyle.typebox}`} onClick={() => setresume_type("myresume")}>
              <GrNotes />
              <span className={ResumeStyle.Grnotes}>My Resume</span>
            </div>
            <div className={resume_type === "previous_resume" ? `${ResumeStyle.job_active}` : `${ResumeStyle.typebox}`} onClick={() => setresume_type("previous_resume")}>
              <GrNotes />
              <span className={ResumeStyle.Grnotes}>Previous Resume</span>
            </div>
          </div>
          <button className={ResumeStyle.Update_resumeBtn} onClick={() => setbtnPopup(!btn_Popup)}> Update Your Resume </button>

          <div className={ResumeStyle.Resume_Collection_container}>
            {resume_type === "myresume" ? (
              <CurrentResume email={email} />
            ) : (
              <PreviousResume  />
            )}
          </div>
        </div>

        <div className={ResumeStyle.resume_right_container}>
          <div>
            <button className={ResumeStyle.Generatebtn} onClick={handleGenerateResume}>Generate Resume</button>
          </div>
          <div className={ResumeStyle.resume_display}>
            <div className={ResumeStyle.right_title}>Upload your resume ATS friendly</div>
            <img src={image} alt="girl" className={ResumeStyle.right_image} />
            <div className={ResumeStyle.hint_box}>Check your resume score to gauge its effectiveness and suitability for potential job opportunities</div>
          </div>
          <button className={ResumeStyle.resume_btn} onClick={handleCheckResumeScore}> Check your resume score </button>
        </div>
      </div>

      {selectedTemplates.length > 0 && (
        <Modal onClose={handleCloseModal} images={selectedTemplates} />
      )}
    </>
  );
}

export default MyResume;
