import assessmentStyle from "./Assessment.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../Common-Components/Loaders/Loader";
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
function Assessment() {
  const [Loading, setLoading] = useState(false);
  const [assessmentData, setAssessmentData] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/assessment/getAll-assessment`)
      .then((res) => {
        setAssessmentData(res.data.data);
        setLoading(false);
      });
  }, []);
  return (
    <div className={assessmentStyle.insider_page}>
      <h1 className={assessmentStyle.__assessment_Header}>Online Assessment</h1>
      <div className={assessmentStyle.assessment}>
        {Loading ? (
          <Loader />
        ) : (
          <>
            {assessmentData?.map((data) => {
              return (
                <Link
                  to={"/assessment-Instructions"}
                  state={data}
                  key={data._id}
                  className={assessmentStyle.assessment_item}
                >
                  <img
                    className={assessmentStyle.__assessment_Img}
                    src={data.image}
                    alt="react logo"
                  />
                  <h3>{data.name}</h3>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Assessment;
