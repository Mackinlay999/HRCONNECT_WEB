import React, { useEffect } from "react";
import mailICON from "../../../Assets/mailICON.jpg";
import clockICON from "../../../Assets/clockICON.jpg";
import activeICON from "../../../Assets/ActiveICON.jpg";
import callICON from "../../../Assets/callICON.png";
import loginICON from "../../../Assets/loginICON.png";
import { NavLink,useLocation, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import userAnalyticsStyle from "./Analytics.module.css";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import axios from 'axios'
import FrequencyChart from "./Frequency";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL

function UserAnalytics() {
  const { pathname } = useLocation();
  const navigateTO = useNavigate();
  useEffect(() => {
    if (pathname === "/analytics") {
      navigateTO("/analytics/weekly");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const period = pathname.split('/')[2];

  return (
    <>
      <div className={userAnalyticsStyle.analyticsPage__box}>
        <AnalyticsPageNavbar />
         <AnalyticsPageCarousel period={period} />
        <AnalyticsReportComponent/>
      </div>
    </>
  );
}

export default UserAnalytics;

function AnalyticsPageNavbar() {
  return (
    <nav className={userAnalyticsStyle.analyticsPage__navbar}>
      <NavLink to={"/analytics/weekly"} className={({ isActive }) =>
                  isActive ? userAnalyticsStyle.active : userAnalyticsStyle.analyticsPage__navLInks
                }>
        Weekly
      </NavLink>
      <NavLink to={"/analytics/monthly"} className={({ isActive }) =>
                  isActive ? userAnalyticsStyle.active : userAnalyticsStyle.analyticsPage__navLInks
                }>
        Monthly
      </NavLink>
      <NavLink to={"/analytics/yearly"} className={({ isActive }) =>
                  isActive ? userAnalyticsStyle.active : userAnalyticsStyle.analyticsPage__navLInks
                }>
        Yearly
      </NavLink>
    </nav>
  );
}

const dummyData = [
  {
    name: "Jan",
    value: 250,
  },
  {
    name: "Feb",
    value: 200,
  },
  {
    name: "Mar",
    value: 150,
  },
  {
    name: "Apr",
    value: 200,
  },
  {
    name: "Jun",
    value: 50,
  },
  {
    name: "Jul",
    value: 150,
  },
  {
    name: "Aug",
    value: 100,
  },
  {
    name: "Sep",
    value: 120,
  },
  {
    name: "Oct",
    value: 220,
  },
  {
    name: "Nov",
    value: 180,
  },
  {
    name: "Dec",
    value: 210,
  },
];

function AnalyticsReportComponent() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [jobViewData, setjobViewData] = useState([]);

   useEffect(() => {
     const fetchAnalyticsData = async () => {
      const email = localStorage.getItem("email")
       try {
         const response = await axios.get(`${baseUrl}/analytics/job-application?email=${email}`)
         setAnalyticsData(response.data);
        //  console.log(response.data)
       } catch (error) {
         console.error('Error fetching analytics data:', error);
       }
     };
 
     fetchAnalyticsData();
   }, []); 

   useEffect(() => {
    const fetchJobViewData = async () => {
     const email = localStorage.getItem("email")
     try {
      const response = await axios.get(`${baseUrl}/jobs/get-job-views?userEmail=${email}`);
      const data = response.data.jobViewsData;

      // Convert jobViewsData object to array of objects
      const jobViewsArray = Object.keys(data).map(month => ({ month, views: data[month] }));
      setjobViewData(jobViewsArray);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchJobViewData();
  }, []);
  return (
    <section className={userAnalyticsStyle.analyticsReportComponent__container}>
      <div className={userAnalyticsStyle.analyticsPage__analysis__Box}>
        <div className={userAnalyticsStyle.analysisBox__header}>
          <h2 className={userAnalyticsStyle.analysisBox__header__primaryText}>
            Job Application Analytics
          </h2>
          <span className={userAnalyticsStyle.analysisBox__header__secondaryText}>
            Success rate
          </span>
        </div>
        <div style={{ height: "400px", width:'80%', marginLeft:'69px', marginTop:'20px' }}>
          <ResponsiveContainer>
            <BarChart data={analyticsData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false}  />
              <YAxis axisLine={false} tickLine={false} />
              <Bar dataKey="jobApplications" fill="#00296B" barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div></div>

      <div className={userAnalyticsStyle.analyticsPage__analysis__Box}>
        <div className={userAnalyticsStyle.analysisBox__header}>
          <h2 className={userAnalyticsStyle.analysisBox__header__primaryText}>Profile Viewed</h2>
          <span className={userAnalyticsStyle.analysisBox__header__secondaryText}>20 views</span>
        </div>

        <div className={userAnalyticsStyle.spline_chart_design} style={{height:'400px', width:'80%', marginLeft:'100px'}}>
          <ResponsiveContainer>
            <SplineChart />
          </ResponsiveContainer>
        </div>
      </div>

      <div className={userAnalyticsStyle.analyticsPage__analysis__Box}>
        <div className={userAnalyticsStyle.analysisBox__header}>
          <h2 className={userAnalyticsStyle.analysisBox__header__primaryText}>activities</h2>
          <span className={userAnalyticsStyle.analysisBox__header__secondaryText}>
            Success rate
          </span>
        </div>
        <div style={{height:'400px', width:'80%', marginLeft:'100px', marginTop:'30px'}}>
          <ResponsiveContainer>
            <BarChart data={dummyData}>
              <XAxis dataKey={"name"}  axisLine={false} tickLine={false} />
              <YAxis  axisLine={false} tickLine={false} />
              <Bar dataKey={"value"} fill="#00296B" barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={userAnalyticsStyle.analyticsPage__analysis__Box}>
        <div className={userAnalyticsStyle.analysisBox__header}>
          <h2 className={userAnalyticsStyle.analysisBox__header__primaryText}>job views</h2>
          <span className={userAnalyticsStyle.analysisBox__header__secondaryText}>
            Success rate
          </span>
        </div>

        <div style={{ height: '400px', width: '80%', marginLeft: '100px', marginTop: '30px' }}>
        <ResponsiveContainer>
          <BarChart data={jobViewData}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false}/>
            <Bar dataKey="views" fill="#00296B" barSize={35} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>

      <div className={userAnalyticsStyle.analyticsPage__analysis__Box}>
        <div className={userAnalyticsStyle.analysisBox__header}>
          <h2 className={userAnalyticsStyle.analysisBox__header__primaryText}>Profile Viewed</h2>
          <span className={userAnalyticsStyle.analysisBox__header__secondaryText}>20 views</span>
        </div>

        <div>
          <ResponsiveContainer>
            <FrequencyChart />
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function AnalyticsPageCarousel({ period }) {
  const [email, setEmail] = useState(null); 
  const [loginFrequency, setLoginFrequency] = useState(null);
  const [timeSpent, setTimeSpent] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        setEmail(storedEmail);
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          let timeSpentResponse;
          if (period === 'weekly') {
            timeSpentResponse = await axios.get(`${baseUrl}/analytics/time-spent/weekly?email=${email}`);
          } else if (period === 'monthly') {
            timeSpentResponse = await axios.get(`${baseUrl}/analytics/time-spent/monthly?email=${email}`);
          } else if (period === 'yearly') {
            timeSpentResponse = await axios.get(`${baseUrl}/analytics/time-spent/yearly?email=${email}`);
          }
          setTimeSpent(timeSpentResponse.data.timeSpent);

          let loginFrequencyResponse;
          if (period === 'weekly') {
            loginFrequencyResponse = await axios.get(`${baseUrl}/analytics/login-frequency/weekly?email=${email}`);
          } else if (period === 'monthly') {
            loginFrequencyResponse = await axios.get(`${baseUrl}/analytics/login-frequency/monthly?email=${email}`);
          } else if (period === 'yearly') {
            loginFrequencyResponse = await axios.get(`${baseUrl}/analytics/login-frequency/yearly?email=${email}`);
          }
          setLoginFrequency(loginFrequencyResponse.data.loginFrequency);
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchData();
  }, [period, email]); 



  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const Carousel_Card = [
    {
      cardID: 1,
      cardICON: mailICON,
      cardTitle: "Contacted by mail",
      cardData: "13 Mail",
      cardBG: "#D3C0FB",
    },
    {
      cardID: 2,
      cardICON: callICON,
      cardTitle: "Contacted by call",
      cardData: "5 calls",
      cardBG: "#F9BBBB",
    },
    {
      cardID: 3,
      cardICON: clockICON,
      cardTitle: "Time Spent",
      cardData: `${timeSpent} Min`, 
      cardBG: "#CBF0FB",
    },
    {
      cardID: 4,
      cardICON: activeICON,
      cardTitle: "Active users",
      cardData: "5000",
      cardBG: "#D3C0FB",
    },
    {
      cardID: 5,
      cardICON: loginICON,
      cardTitle: "Login Frequency",
      cardData: `${loginFrequency} Times`, 
      cardBG: "#f9bbbb",
    },
  ];

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      infinite={false}
      keyBoardControl={true}
      customTransition="all .3"
      transitionDuration={3000}
      containerClass="carousel-container AnalyticsPageCarousel_container"
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
    >
      {Carousel_Card.map((data) => {
        return (
          <div
            key={data.cardID}
            className={userAnalyticsStyle.AnalyticsPageCarousel_Card}
            style={{ backgroundColor: `${data.cardBG}`, marginLeft:'35px' }}
          >
            <h1 className={userAnalyticsStyle.AnalyticsPageCarousel_CardTitle}>
              <img
                src={data.cardICON}
                alt=""
                className={userAnalyticsStyle.AnalyticsPageCarousel_CardICON}
              />{" "}
              {data?.cardTitle}
            </h1>
            <p className={userAnalyticsStyle.AnalyticsPageCarousel_CardData}>{data.cardData}</p>
          </div>
        );
      })}
    </Carousel>
  );
}

function SplineChart() {
  const [data] = useState({
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Profile Views",
        data: [50, 120, 70, 180, 220, 200, 180, 200, 100, 80, 120, 160],
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        borderColor: "#0050D1",
        tension: 0.4,
        fill: true,
        pointStyle: "rect",
        pointBorderColor: "blue",
        pointBackgroundColor: "#fff",
        showLine: true,
      },
    ],
  });

  // console.lo);
  return (
    <div style={{ height: "420px" }}>
      <Line data={data}>Hello</Line>
    </div>
  );
}
