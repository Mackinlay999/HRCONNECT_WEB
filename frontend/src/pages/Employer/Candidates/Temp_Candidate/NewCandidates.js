import React, { useEffect, useState } from 'react'
import  './Candidate.css'  
import { GenericCandidate } from './GenericCandidate'
import axios from 'axios'
import PdfComp from '../../../Job_Seeker/MyResume/PdfComp';
import { GiTireIronCross } from 'react-icons/gi';
import pageStyle from "../../Dashboard/HrDashboard.module.css";

const NewCandidates = () => {
    const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
    const newUrl = process.env.REACT_APP_BACKEND_BASE_URL_WITHOUT_API;

    const [ShowApplicantDetails, setShowApplicantDetails] = useState(false);
    const[Showpdf,setShowpdf]=useState(false)
    const [resumeUrl,setResumeUrl]=useState(null)
    const [SelectAll,setSelectAll]=useState(false)

    const[candidatetype,setCandidateType]=useState('Total')

   
    const hremail = localStorage.getItem("email")
    const [AllJobs, setAllJobs] = useState([])

    useEffect(() => {
        axios.get(`${baseUrl}/jobs/get-job/${hremail}`).then((res) => {
            setAllJobs(res.data.jobs)
        }).catch((err) => console.log(err))
    }, [hremail, setAllJobs,baseUrl])

    const AppliedUsers = AllJobs
    .map((data) => data.appliedBy)
    .flat(2)
    .map((data2) => data2);
    console.log(AppliedUsers);
    console.log(AllJobs);

const handelChangeCandidates=(type)=>{
if(type==="Bookmarked"){
    setCandidateType(type)
    setShowApplicantDetails(false)
}
else if(type==="Rejected"){
    setCandidateType(type)
    setShowApplicantDetails(false)

}
else if(type==="Shortlisted"){
    setCandidateType(type)
    setShowApplicantDetails(false)

}
else if(type==="Total"){
    setCandidateType(type)
    setShowApplicantDetails(false) 
}

}
function handleShowResume(e,path){
setShowpdf(true)
const url = `${newUrl}/${path}`; // Ensure this points to Cloudinary URL
console.log(url)    
setResumeUrl(url);
}

function handleClosePopup(){
setShowpdf(false)
}
  return (
    <div className="main_candidate">
            <div className='candidate-main'>
                <div className={candidatetype==='Total'  ? 'candidate-sub-main-2' : 'candidate-sub-main-1'} id='bookmark-floating-2' onClick={()=>handelChangeCandidates('Total')}>
                    <div>
                        <p>Total Appliations</p>
                    </div>
                    <div className='candidate-progress-data'>
                        <h2>5421</h2>
                        <svg className="progress-ring" width="120" height="120">

                            <circle
                                className="progress-ring-circle"
                                stroke="#dddddd"
                                strokeWidth="5"
                                fill="transparent"
                                radius={2}
                                cx="60"
                                cy="60"
                            />
                            <circle
                                className="progress-ring-circle"
                                stroke="#ff9d56"
                                strokeWidth="5"
                                fill="transparent"
                                cx="60"
                                radius={2}

                                cy="60"
                            />
                            <text x="50%" y="55%" textAnchor="middle" fill="black" fontSize="20">
                                20
                            </text>
                        </svg>

                    </div>
                </div>
                <div className={candidatetype==='Rejected'  ? 'candidate-sub-main-2' : 'candidate-sub-main-1'} id='bookmark-floating-2' onClick={()=>handelChangeCandidates('Rejected')} >
                    <div>
                        <p>Rejected Applications</p>
                    </div>
                    <div className='candidate-progress-data'>
                        <h2>5421</h2>

                        <svg className="progress-ring" width="120" height="120">
                            <circle
                                className="progress-ring-circle"
                                stroke="#dddddd"
                                strokeWidth="5"
                                radius={2}

                                fill="transparent"
                                cx="60"
                                cy="60"
                            />
                            <circle
                                className="progress-ring-circle"
                                stroke="#b82d0f"
                                strokeWidth="5"
                                fill="transparent"
                                cx="60"
                                cy="60"
                            />
                            <text x="50%" y="55%" textAnchor="middle" fill="black" fontSize="20">
                                99
                            </text>
                        </svg>

                    </div>
                </div>
                <div className={candidatetype==='Shortlisted' ? 'candidate-sub-main-2' : 'candidate-sub-main-1'} id='bookmark-floating-2'onClick={()=>handelChangeCandidates('Shortlisted')} >
                    <div>
                        <p>Shortlisted Applications</p>
                    </div>
                    <div className='candidate-progress-data'>
                        <h2>5421</h2>
                        <svg className="progress-ring" width="120" height="120">
                            <circle
                                className="progress-ring-circle"
                                stroke="#dddddd"
                                strokeWidth="5"
                                radius={2}

                                fill="transparent"
                                cx="60"
                                cy="60"
                            />
                            <circle
                                className="progress-ring-circle"
                                stroke="#52c02c"
                                strokeWidth="5"
                                fill="transparent"
                                cx="60"
                                cy="60"
                            />
                            <text x="50%" y="55%" textAnchor="middle" fill="black" fontSize="20">
                                40
                            </text>
                        </svg>

                    </div>
                </div>
                <div className={candidatetype==='Bookmarked' ? 'candidate-sub-main-2' : 'candidate-sub-main-1'} id='bookmark-floating-2' onClick={()=>handelChangeCandidates('Bookmarked')}>
                    <div>
                        <p>Profile Bookmarked</p>
                    </div>
                    <div className='candidate-progress-data'>
                        <h2>5421</h2>
                        <svg className="progress-ring" width="120" height="120">
                            <circle
                                className="progress-ring-circle"
                                stroke="#dddddd"
                                strokeWidth="5"
                                radius={2}

                                fill="transparent"
                                cx="60"
                                cy="60"
                            />
                            <circle
                                className="progress-ring-circle"
                                stroke="#52c02c"
                                strokeWidth="5"
                                fill="transparent"
                                cx="60"
                                cy="60"
                            />
                            <text x="50%" y="55%" textAnchor="middle" fill="black" fontSize="20">
                                50
                            </text>
                        </svg>

                    </div>
                </div>

                
                    </div>
                   {candidatetype==="Rejected" &&<GenericCandidate type={candidatetype} Users={AppliedUsers} job={AllJobs} ShowApplicantDetails={ShowApplicantDetails} CbToggleDetails={setShowApplicantDetails} />}
                   {candidatetype==="Shortlisted" &&<GenericCandidate type={candidatetype} Users={AppliedUsers} job={AllJobs} ShowApplicantDetails={ShowApplicantDetails} CbToggleDetails={setShowApplicantDetails} />}
                   {candidatetype==="Bookmarked" &&<GenericCandidate type={candidatetype} Users={AppliedUsers} job={AllJobs} ShowApplicantDetails={ShowApplicantDetails} CbToggleDetails={setShowApplicantDetails} />}
                    {candidatetype==='Total' &&<div><div className='candidate-main-2'>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1%", marginTop: "1%" }}>
                            <h2>Total Candidates</h2>
                            <select>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                            </select>
                        </div>
                        <div>
                        <button style={{backgroundColor:"red"}}>Rejected</button>
                        <button style={{backgroundColor:"green"}}>Selected</button>
                        <input type='checkbox' id='selectAll' onClick={()=>setSelectAll(!SelectAll)}/><label htmlFor='selectAll'>SelectAll</label>
                            <table className='candidate-table'>
                                <thead style={{ backgroundColor: "#fa7902", height: "2%" }}>
                                    <tr>
                                        <th>Candidate Name</th>
                                        <th >Rating</th>
                                        <th >Stages</th>
                                        <th>Applied Role</th>
                                        <th >Applied Date</th>
                                        <th>Attachments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        AppliedUsers.map((item, index) => (
                                           
                                            <tr key={index}>

                                                <td style={{ display: "flex", alignItems: "center", gap: "10px" }}>  {SelectAll?<input type='checkbox' checked={SelectAll?true:false}/>:<input type='checkbox'/>}
                                                <img src={item.profileImage ?? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg'} height="50px" alt='pro' /> <p>{item.name}</p></td>
                                                <td> {item.testResult}&#9734; </td>
                                                <td>Pending</td>
                                                <td>{item.jobTitle}</td>
                                                <td>{item.AppliedDate}</td>
                                                <td key={index} style={{cursor:"pointer"}}onClick={(e)=>handleShowResume(e,item.resume[0].path)}>{item.resume[0].filename.split('.'||"-")[0]}</td>




                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
{Showpdf?                            <section className={pageStyle.__viewPDF_mainContainer}>
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
          <PdfComp pdf={resumeUrl} pagesize='full' />
        ) : (
          <p className={pageStyle.__viewPDF_errorMSG}>
            No Resume Available
          </p>
        )}
      </div>
    </section>
:""}
                          
                        </div>
                    </div></div>}


    </div>
  )
}

export default NewCandidates