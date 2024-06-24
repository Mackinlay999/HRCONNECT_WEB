import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Interviewcss from "./Interview.module.css";
import maleImage from '../../../Assets/Male-Image.png';
import { IoStar } from "react-icons/io5";
import { BsPersonVideo } from "react-icons/bs";
import { GrTextAlignFull } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { BsFileImage } from "react-icons/bs";

function Interview() {
  const navigation = useNavigate();
  const location = useLocation();
  const { userEmail, userName } = location.state;
  const [file, setFile] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState({
    interviewType: "",
    interviewDate: "",
    interviewTime: "",
    interviewerName: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInterviewDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("userEmail", userEmail);
      formData.append("userName", userName);
      formData.append("interviewDetails", JSON.stringify(interviewDetails));
      if (file) {
        formData.append("file", file);
      }

      const response = await axios.post(`http://localhost:8585/api/interview/schedule-interview`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigation('/interview_scheduled');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error scheduling interview:", error.response ? error.response.data : error.message);
      toast.error("Failed to schedule interview.");
    }
  };

  return (
    <div className={Interviewcss.main_containers}>
      <div className={Interviewcss.uppercontainer}>
        <div className={Interviewcss.uppercontainer_left}>
          <img className={Interviewcss.upper_cont_img} src={maleImage} alt="network-error" />
          <div className={Interviewcss.uppercontainer_left1}>
            <p>{userName}</p>
            <p>
              <IoStar className={Interviewcss.star} />
              4.0
            </p>
          </div>
        </div>
        <div className={Interviewcss.uppercontainer_right}>
          <p>Candidate ID:</p>
          <p>12345678</p>
        </div>
      </div>
      <hr className={Interviewcss.horizontal_line}></hr>
      <div className={Interviewcss.formMain_cont}>
        <div className={Interviewcss.formMain_cont1}>
          <div className={Interviewcss.formSub_con1}>
            <label htmlFor="interviewType" className={Interviewcss.box}>
              <BsPersonVideo />
              Interview type
            </label>
            <br />
            <select id="interviewType" name="interviewType" className={Interviewcss.boxes} value={interviewDetails.interviewType} onChange={handleChange}>
              <option value=""></option>
              <option value="walk">Walk-in-drive</option>
              <option value="virtual">Virtual</option>
              <option value="face">Face to face</option>
            </select>
          </div>
          <div className={`${Interviewcss.formSub_con} ${Interviewcss.formSub_contain}`}>
            <label htmlFor="description" className={Interviewcss.box}>
              <GrTextAlignFull />
              Description
            </label>
            <textarea id="description" name="description" className={`${Interviewcss.description_input} ${Interviewcss.des}`} value={interviewDetails.description} onChange={handleChange} />
          </div>
        </div>
        <div className={Interviewcss.formMain_cont2}>
          <div className={Interviewcss.formSub_con}>
            <label htmlFor="interviewDate" className={Interviewcss.box}>
              <FaRegCalendarAlt />
              Interview date
            </label>
            <input type="date" id="interviewDate" name="interviewDate" className={Interviewcss.description_input} value={interviewDetails.interviewDate} onChange={handleChange} />
          </div>
          <div className={Interviewcss.formSub_con}>
            <label htmlFor="interviewTime" className={Interviewcss.box}>
              <MdAccessTime />
              Interview time
            </label>
            <input type="time" id="interviewTime" name="interviewTime" className={Interviewcss.description_input} value={interviewDetails.interviewTime} onChange={handleChange} />
          </div>
        </div>
        <div className={Interviewcss.formMain_cont3}>
          <div className={Interviewcss.formSub_con}>
            <label htmlFor="interviewerName" className={Interviewcss.box}>
              <FaUser />
              Interviewer name
            </label>
            <input type="text" id="interviewerName" name="interviewerName" className={Interviewcss.description_input} value={interviewDetails.interviewerName} onChange={handleChange} />
          </div>
          <div className={Interviewcss.formSub_con}>
            <label htmlFor="location" className={Interviewcss.box}>
              <IoLocationOutline />
              Location
            </label>
            <input type="text" id="location" name="location" className={Interviewcss.description_input} value={interviewDetails.location} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div>
        <p className={Interviewcss.fileupload}>
          <IoMdAttach />
          Attachments
        </p>
        <div className={Interviewcss.filebox}>
          <BsFileImage className={Interviewcss.imgs} />
          <span> Drop your image here or</span>
          <label htmlFor="file">
            <span className={Interviewcss.f}>browse</span>
          </label>
          <input type="file" id="file" onChange={handleFileChange}></input>
        </div>
      </div>
      <div className={Interviewcss.last_container}>
        <button className={Interviewcss.cancel_btn}>Cancel</button>
        <button className={Interviewcss.Interview_btn} onClick={handleSchedule}>
          Schedule Interview
        </button>
      </div>
    </div>
  );
}

export default Interview;
