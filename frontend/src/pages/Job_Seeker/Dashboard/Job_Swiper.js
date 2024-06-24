import React from "react";
import { CalculateTimeAgo } from "../../Common-Components/TimeAgo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import DashBoardStyle from "./DashboardMain.module.css";
import { Link} from "react-router-dom";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL

export default function JobSeekerSwiper({ allJobs }) {


  const handleView = async (e, jobId) =>{
    try {
      const email = localStorage.getItem('email');
      axios.post(`${baseUrl}/jobs/update-job-views/${jobId}?userEmail=${email}`);
  
    } catch (error) {
      console.error('Error updating job views:', error);
    }
  
  }

  const colors = [
    "rgba(203, 240, 251, 1)",
    "rgba(249, 187, 187, 1)",
    "rgba(225, 176, 255, 1)",
  ];

  return (
    <Swiper
      className={DashBoardStyle.job_swiper}
      slidesPerView={4}
      spaceBetween={20}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        421: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        567: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        991: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
    >
      {allJobs.map((item, index) => (
        <SwiperSlide key={item._id}>
          <Link
            to={`/dashboard/${item._id}`}
            className={DashBoardStyle.LINKswiperCard}
            onClick={(e)=>handleView(e,item._id)}
          >
            <div
              className={DashBoardStyle.matched_job_full}
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <div className={DashBoardStyle.company_logoContainer}>
                <img
                  src={item.jobPoster}
                  alt={item.jobTitle}
                  className={DashBoardStyle.company_logo}
                />
              </div>
              <h6 className={DashBoardStyle.company_title}>{item.jobTitle.slice(0, 15)}...</h6>
              <h6 className={DashBoardStyle.company_location}>
                {item.location}
              </h6>
              <h6 className={DashBoardStyle.company_preference}>
                ({item.employmentType})
              </h6>
              <h6 className={DashBoardStyle.company_apply}>
                <CalculateTimeAgo time={item.createdAt} />
                <span className={DashBoardStyle.apply}> Apply </span>
              </h6>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
