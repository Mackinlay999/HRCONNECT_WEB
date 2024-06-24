import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
//   YAxis,
  CartesianGrid,
  Tooltip,
//   ResponsiveContainer,
} from "recharts";

import FrequencyStyle from './Analytics.module.css'

const data = [
  {
    name: "",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Time",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const FrequencyChart = () => {
  return (
    <>
   <div className={FrequencyStyle.frequency_main_parent}>
   <div className={FrequencyStyle.frequency_container}>
        <div className={FrequencyStyle.first_completion_section}>
          <div>Assessment Completion Rate</div>
          <h5>85%</h5>
        </div>

        <div className={FrequencyStyle.second_completion_section}>
          <div style={{ fontSize: "12px" }}>Skill Gap Analysis</div>
          <h5>20%</h5>
        </div>
      </div>
      <h4>Trend Analysis</h4>
      <div>Frequency</div>
      <AreaChart
        width={700}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0050D1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00296B" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
    </>
  );
};

export default FrequencyChart;
