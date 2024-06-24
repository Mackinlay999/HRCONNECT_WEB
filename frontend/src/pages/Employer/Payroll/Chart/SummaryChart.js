import * as React from "react";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import PayrollStyle from "../Payroll.module.css";

const data = [
  { value: 400, color: "rgb(81, 198, 251)" },
  { value: 300, color: "rgb(9, 17, 47)" },
  { value: 300, color: "rgb(56, 129, 247)" },
  { value: 300, color: "rgb(195,181,253)" },
];
export default function PieChartWithPaddingAngleTow() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: "60px" }}
      className={PayrollStyle.finalchart}
    >
      <PieChart
        series={[
          {
            startAngle: -180,
            endAngle: 180,
            paddingAngle: 0,
            innerRadius: 100,
            outerRadius: 150,
            data,
          },
        ]}
        margin={{ right: 5 }}
        width={350}
        height={350}
        legend={{ hidden: true }}
      />
    </Stack>
  );
}
