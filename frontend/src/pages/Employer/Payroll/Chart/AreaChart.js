import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

import PayrollStyle from "../Payroll.module.css";

const data = [
  {
    name: "Tuesday, Feb 1, 2024",
    Revenue: 4000,
    pv: 2400,
    amt: 2400,
    day: "Feb 1",
  },
  {
    name: "Tuesday, Feb 5, 2024",
    Revenue: 3000,
    pv: 1398,
    amt: 2210,
    day: "Feb 4",
  },
  {
    name: "Tuesday, Feb 10, 2024",
    Revenue: 2000,
    pv: 9800,
    amt: 2290,
    day: "Feb 8",
  },
  {
    name: "Tuesday, Feb 15, 2024",
    Revenue: 2780,
    pv: 3908,
    amt: 2000,
    day: "Feb 13",
  },
  {
    name: "Tuesday, Feb 20, 2024",
    Revenue: 1890,
    pv: 4800,
    amt: 2181,
    day: "Feb 17",
  },
  {
    name: "Tuesday, Feb 25, 2024",
    Revenue: 2390,
    pv: 3800,
    amt: 2500,
    day: "Feb 25",
  },
  {
    name: "Tuesday, Feb 30, 2024",
    Revenue: 2390,
    pv: 3800,
    amt: 2500,
    day: "Feb 30",
  },
];

export default function MapOne() {
  return (
    <AreaChart
      width={600}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      style={{ width: "100%" }}
      className={PayrollStyle.chart_num_one}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="day"
        tick={{ fontSize: 10 }}
        axisLine={false}
        color="#E7EAEE"
        tickLine={false}
      />
      <YAxis hide />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="Revenue"
        stroke="#82ca9d"
        fill="url(#colorUv)"
        connectNulls={false}
      />
    </AreaChart>
  );
}
