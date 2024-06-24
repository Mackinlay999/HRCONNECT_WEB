import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { GiTireIronCross } from "react-icons/gi";
import Loader from "../../Common-Components/Loaders/Loader";
import pageStyle from "./HrDashboard.module.css";
import PdfComp from "../../Job_Seeker/MyResume/PdfComp";

const newUrl = process.env.REACT_APP_BACKEND_BASE_URL_WITHOUT_API;

function ViewPdf({ CbTogglePDF, SelectedResume }) {
  const [resumeError, setResumeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);
  console.log(resumeUrl)

  useEffect(() => {
    const fetchResume = async () => {
      if (SelectedResume && SelectedResume.userResume) {

        setLoading(true);
        try {
          const path = SelectedResume.userResume.url;
          const url = `${newUrl}/${path}`; // Ensure this points to Cloudinary URL
          setResumeUrl(url);
          // console.log(Url)
        } catch (error) {
          console.error('Error viewing resume:', error);
          setResumeError(true);
          toast.error("Error loading Resume");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResume();
  }, [SelectedResume]);

  const handleClosePopup = (e) => {
    e.preventDefault();
    setLoading(false);
    CbTogglePDF(false);
  };

  if (loading) {

    return <Loader />;
  }

  if (resumeError) {
    toast.error("Error loading Resume");
    return null;
  }

  return (
    <section className={pageStyle.__viewPDF_mainContainer}>
      <GiTireIronCross
        onClick={handleClosePopup}
        className={pageStyle.__viewPDF_CloseButton}
      />
      {resumeUrl && (
        <a href={resumeUrl} download="Resume.pdf" className={pageStyle.__viewPDF_downloadButton}>
         <i className="fa-solid fa-download"></i> Download
        </a>
        
      )}
      <div className={pageStyle.__viewPDFBox}>
        {resumeUrl ? (
          <PdfComp pdf={resumeUrl} pagesize="full" />
        ) : (
          <p className={pageStyle.__viewPDF_errorMSG}>
            No Resume Available
          </p>
        )}
      </div>
    </section>
  );
}

export default ViewPdf;

