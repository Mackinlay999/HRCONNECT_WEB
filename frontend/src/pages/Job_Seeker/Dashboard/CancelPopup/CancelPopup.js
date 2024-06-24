import React from 'react'
import Profile_style from  "../Profile_style.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { handleSavedJob } from '../../../../Redux/ReduxSlice';
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
const CancelPopup = () => {
    const navigateTO =useNavigate()
    const Job =useLocation().state
    // console.log(Job);
    const dispatch=useDispatch()
    const email =localStorage.getItem('email')

    const handleSaveToLaterClick = (e, item) => {
        e.preventDefault();
        axios
          .post(`${baseUrl}/user/My-jobs/create/save-job`, {
            ...item,
            email,
          })
          .then((response) => {
            if (response.data.success) {
              toast.success(`${response.data.msg}`);
              dispatch(handleSavedJob(item._id));
              navigateTO(-1)
            } else {
              toast.error(`${response.data.msg}`);
            }
          })
          .catch((error) => {
            toast.error(`server failed! Try again ${error.message}`);
          });
      };
  return (
    <div className={Profile_style.Cancel_container}>
        < div className={Profile_style.CancelPopup}>
       
            <p>To complete your application you have to take assessment</p>
        
        <div>
            <p style={{fontSize:20,fontWeight:"bold",color:"black"}}>OR</p>
        </div>
        <div className={Profile_style.btn_box}>
<button className={Profile_style.cancelbtn1} onClick={()=>navigateTO(-1)}>Cancel</button>
<button className={Profile_style.saveforlaterbtn2} onClick={(e)=>handleSaveToLaterClick(e, Job)}>Save for later</button>

        </div>
    </div>
    </div>
  )
}

export default CancelPopup