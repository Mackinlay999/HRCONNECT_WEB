import * as React from "react";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { value: 400, color: "rgb(81, 198, 251)" },
  { value: 300, color: "rgb(9, 17, 47)" },
  { value: 300, color: "rgb(56, 129, 247)" },
];

export default function PieChartWithPaddingAngle() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: "60px" }}
    >
      <PieChart
        series={[
          {
            startAngle: -90,
            endAngle: 90,
            paddingAngle: 0,
            innerRadius: 100,
            outerRadius: 150,
            data,
          },
        ]}
        margin={{ right: 10 }}
        width={400}
        height={400}
        slotProps={{
          legend: { hidden: true },
        }}
      />
    </Stack>
  );
}
