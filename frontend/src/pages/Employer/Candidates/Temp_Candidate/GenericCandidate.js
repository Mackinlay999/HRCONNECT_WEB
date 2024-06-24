import React, { useEffect, useState } from 'react'
import hrdashboard from "../../Dashboard/HrDashboard.module.css";
// import ApplicantsDetails from '../../Dashboard/ApplicantsDetails'
// import { FaRegBookmark } from 'react-icons/fa';
import axios from 'axios';
import GenericApplicantView from './GenericApplicantView';


export const GenericCandidate = ({type,job,Users,ShowApplicantDetails, CbToggleDetails}) => {
  // console.log(Users);
  console.log(job);
  const [selectedUser, setSelectedUsers] = useState([]);
  const[User,setUser]=useState([])
  console.log(User);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  console.log(baseUrl);
  const hremail=localStorage.getItem('email')

  const handleUserCardClick = (e, userEmail) => {
    e.preventDefault();
    CbToggleDetails(true);
    setSelectedUsers(userEmail)

  }
  useEffect(()=>{
    if(type==="Bookmarked"){
      axios.get(`${baseUrl}/user/bookmarkd/get-bookmark/${hremail}`)
      .then((res)=>setUser(res.data.bookmarkedUser)).catch((err)=>console.log(err))
     
    }
    else if(type==="Shortlised"){
      axios.get(`${baseUrl}/user/shortlisted/get-shortlist/${hremail}`)
      .then((res)=>setUser(res.data.shortlisedUser)).catch((err)=>console.log(err))


    }
    else if(type==="Rejected"){
      axios.get(`${baseUrl}/user/rejected/get-rejected/${hremail}`)
      .then((res)=>setUser(res.data.rejectedUser)).catch((err)=>console.log(err))
}
    else{
      setUser([])
    }
  },[type,baseUrl,hremail])

  

  return (
    <>
        <h1>{type} Candidates</h1>
    {
        ShowApplicantDetails ? <GenericApplicantView CbToogleDetails={CbToggleDetails} AllUser={Users} selectedUser={selectedUser} /> : 
        <div className={hrdashboard.__appliedUserList}>
          {
            User?.map((user) => {
              console.log(user);
              return (
                <div className={hrdashboard.__appliedUsers} key={user._id} onClick={(e) => handleUserCardClick(e, user?.email, user?.jobID, user?.jobTitle)}>
                  <div className={hrdashboard.__appliedHeader}>
                    <img className={hrdashboard.__userPF} src={user.profileImage ?? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg'} alt="" onError={(e) => { e.target.src = `https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg`; e.onError = null; }} />
                    <section>
                      <span style={{ fontSize: '20px' }}><strong>{user.name}</strong></span>
                      <p style={{ fontSize: '15px' }}>{user.biography}</p>
                    </section>
                    {/* bookmark here */}
                    {/* <FaRegBookmark style={{ fontSize: '20px' }} /> */}
                  </div>
                  <div className={hrdashboard.__appliedBody}>
                    <span>Location - <strong>{user.location}</strong></span>
                    <span>Type - <strong>{user.employmentType}</strong></span>
                  </div>
                  <div>
                    <h6>Skills</h6>
                    <div className={hrdashboard.__appliedSkills}>
                      {
                        user.skills?.map(skill => {
                          return (
                            <span key={skill._id}>{skill.name}</span>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      }

    </>
  )
}
