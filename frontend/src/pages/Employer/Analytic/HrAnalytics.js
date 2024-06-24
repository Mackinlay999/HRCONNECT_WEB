import React from "react";
import mailICON from "../../../Assets/mailICON.jpg";
import clockICON from "../../../Assets/clockICON.jpg";
import activeICON from "../../../Assets/ActiveICON.jpg";
import callICON from "../../../Assets/callICON.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Brush,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from "recharts";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { Line } from "react-chartjs-2";
import hrAnalyticStyle from './HrAnalytics.module.css'

const dummyData = [
  {
    name: "Mon",
    value: 446,
  },
  {
    name: "Tue",
    value: 285,
  },
  {
    name: "Wed",
    value: 382,
  },
  {
    name: "Thu",
    value: 368,
  },
  {
    name: "Fri",
    value: 413,
  },
  {
    name: "Sat",
    value: 307,
  },
  {
    name: "Sun",
    value: 432,
  },
];

const HRAnalytic = () => {
  return (
    <>
      <div className={hrAnalyticStyle.hr_analytic_container}>
        <HRAnalyticsPageCarousel />
        {/* <SplineChart /> */}
        <HiringLineChart/>
        <EmailSentBarGraph data={dummyData} />
        <PieArcLabel />
      </div>
    </>
  );
};

export default HRAnalytic;

function HRAnalyticsPageCarousel() {
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
      cardBG: "#ffffff",
    },
    {
      cardID: 2,
      cardICON: callICON,
      cardTitle: "Contacted by call",
      cardData: "5 calls",
      cardBG: "#ffffff",
    },
    {
      cardID: 3,
      cardICON: clockICON,
      cardTitle: "Time Spent",
      cardData: "15 Min",
      cardBG: "#ffffff",
    },
    {
      cardID: 4,
      cardICON: activeICON,
      cardTitle: "Active users",
      cardData: "5000",
      cardBG: "#ffffff",
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
      containerClass="{carousel-container AnalyticsPageCarousel_container}"
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
    >
      {Carousel_Card.map((data) => {
        return (
          <div
            key={data.cardID}
            className={hrAnalyticStyle.AnalyticsPageCarousel_Card}
            style={{ backgroundColor: `${data.cardBG}` }}
          >
            <div className={hrAnalyticStyle.AnalyticsPageCarousel_CardTitle}>
              <img
                src={data.cardICON}
                alt=""
                className={hrAnalyticStyle.AnalyticsPageCarousel_CardICON}
              />{" "}
              {data?.cardTitle}
            </div>
            <p className={hrAnalyticStyle.AnalyticsPageCarousel_CardData}>
              <strong>{data.cardData}</strong>
            </p>
          </div>
        );
      })}
    </Carousel>
  );
}

const Hiringdata = [
  {
    name: "January",
    uv: 50,
    pv: 90,
  },
  {
    name: "February",
    uv: 100,
    pv: 120,
  },
  {
    name: "March",
    uv: 150,
    pv: 100,
  },
  {
    name: "April",
    uv: 200,
    pv: 180,
  },
  {
    name: "May",
    uv: 250,
    pv: 205,
  },
  {
    name: "June",
    uv: 300,
    pv: 190,
  },
  {
    name: "July",
    uv: 350,
    pv: 250,
  }
];

const HiringLineChart = ()=>{
  return(
    <div className={hrAnalyticStyle.hr_bar_container}>
    <div style={{paddingBottom:'10px'}}><strong>Hiring in past few months</strong></div>
  <LineChart
  width={500}
  height={200}
  data={Hiringdata}
  syncId="anyId"
  margin={{
    top: 10,
    right: 30,
    left: 0,
    bottom: 0
  }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
</LineChart>
    </div>
  )
}

 const EmailSentBarGraph = ({ data }) => {
  return (
    <>
       <div className={hrAnalyticStyle.hr_bar_container}>
        <div style={{fontSize:'25px', fontWeight:'500'}}>Mail Sent</div>
        <div><span style={{color:'lightgreen'}}>+1.43%</span> &nbsp; March 25 - March 31</div>
       <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" axisLine={false} tick={{ dy: 10 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" barSize={40} shape={<RoundedRectangle />}/>
      </BarChart>
    </ResponsiveContainer>
       </div>
    </>
  );
};

const RoundedRectangle = (props) => {
  const { x, y, width, height } = props;

  // Define border radius
  const borderRadius = 10;

  return (
    <path
      d={`M${x},${y + borderRadius} 
          A${borderRadius},${borderRadius} 0 0 1 ${x + borderRadius},${y} 
          L${x + width - borderRadius},${y} 
          A${borderRadius},${borderRadius} 0 0 1 ${x + width},${y + borderRadius} 
          L${x + width},${y + height - borderRadius} 
          A${borderRadius},${borderRadius} 0 0 1 ${x + width - borderRadius},${y + height} 
          L${x + borderRadius},${y + height} 
          A${borderRadius},${borderRadius} 0 0 1 ${x},${y + height - borderRadius} 
          Z`}
      fill={props.fill}
    />
  );
};


function PieArcLabel() {
  const data = [
    { value: 35, label: "Women" },
    { value: 65, label: "Men" },
  ];

  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const formattedData = data.map((item) => ({
    ...item,
    percentage: `${((item.value / total) * 100)
      .toFixed(2)
      .replace(".00", "")}%`,
  }));

  const size = {
    width: 450,
    height: 450,
  };

  return (
    <div className={hrAnalyticStyle.pie_chart_container}>
      <div style={{ fontSize: "20px", fontWeight: "700" }}>
        Statistic By Gender
      </div>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.percentage})`,
            arcLabelMinAngle: 45,
            data: formattedData,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        {...size}
      />
    </div>
  );
}

