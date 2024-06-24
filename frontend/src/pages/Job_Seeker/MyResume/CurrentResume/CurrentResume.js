import React, { useEffect, useState } from "react";
import ResumeStyle from "../MyResume.module.css";
import axios from "axios";
import PdfComp from "../PdfComp";
import Loader from "../../../Common-Components/Loaders/Loader";
const newURl = process.env.REACT_APP_BACKEND_BASE_URL_WITHOUT_API;
const CurrentResume = ({ email }) => {
  const [latestResume, setLatestResume] = useState(null); // Initialize latestResume as null
  const [IsLoaded,setIsLoaded]=useState(false)
  // console.log(latestResume);

  // console.log(email);   
  // const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(`${newURl}/resume/getall/${email}`);
        const resumesData = response.data.resumes;
        // console.log(resumesData);

        if (resumesData.length > 0) {
          const sortedResumes = resumesData.sort(
            (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
          );
          setLatestResume(sortedResumes[0]);
        } else {
          setLatestResume(null);
        }
        setIsLoaded(true)
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, [email]);

  return (
  <>
  {IsLoaded?    <div className={ResumeStyle.Current_Resume_Container}>
      <div className={ResumeStyle.resume_name_box}>
        <p style={{ fontWeight: "bold" }}>Name</p>
        <p style={{background:"linear-gradient(90deg, #00296B 0%, #0050D1 100%)",color:"white" }} className={ResumeStyle.pdf_name}>
          {latestResume ? latestResume.filename : "No Resume Available"}
        </p>
      </div>

      {latestResume &&
        latestResume.public_id && ( // Render PdfComp only if latestResume and latestResume.path are defined
          <PdfComp key={latestResume._id} pdf={`${latestResume.url}`} />
        )}
    </div>
:<Loader/>}
  </>
  );

};

export default CurrentResume;
