import React, { useState } from "react";
import JobStyle from "../MyJobs/Job.module.css";

import Applied from "./Applied";
import Saved from "./Saved";
function MyJobs() {
  const [jobtype, setjobtype] = useState("applied");

  return (
    <>
      <div className={JobStyle.myjobs_container}>
        <div className={JobStyle.job_type_box}>
          <div
            className={
              jobtype === "applied"
                ? `${JobStyle.job_active}`
                : `${JobStyle.typebox}`
            }
            onClick={() => setjobtype("applied")}
          >
            <i className="fa-solid fa-suitcase"></i>Applied Jobs
          </div>
          <div
            className={
              jobtype === "saved"
                ? `${JobStyle.job_active}`
                : `${JobStyle.typebox}`
            }
            onClick={() => setjobtype("saved")}
          >
            <i className="fa-solid fa-suitcase"></i> Saved Jobs
          </div>
        </div>

        <div className={JobStyle.mysaved_container}>
          {jobtype === "saved" ? <Saved /> : <Applied />}
        </div>
      </div>
    </>
  );
}

export default MyJobs;
