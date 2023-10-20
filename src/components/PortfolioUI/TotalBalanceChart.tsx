import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { pv: 'January', uv: 722343 },
  { pv: 'February', uv: 1121200 },
  { pv: 'March', uv: 1682000 },
  { pv: 'April', uv: 1189050 },
  { pv: 'May', uv: 1165200 },
  { pv: 'June', uv: 2228200 },
  { pv: 'July', uv: 1990120 },
  { pv: 'August', uv: 2273400 },
  { pv: 'September', uv: 3043200 },
  { pv: 'October', uv: 2758000 },
  { pv: 'November', uv: 3865700 },
  { pv: 'December', uv: 4498650 }

  // Add more data points as needed for different time periods
];

// export const calculateTotalBalance = (data: any) => {
//   let totalBalance = 0;

//   const balanceData = data.map((item: any) => {
//     totalBalance += item.uv;
//     return { pv: item.pv, uv: totalBalance };
//   });

//   return balanceData;
// };
export default function TotalBalanceChart() {
  // const getCircleColor = (value) => {
  //   if (value > 0) {
  //     return "green"; // Circle will be green for positive values
  //   } else if (value < 0) {
  //     return "red"; // Circle will be red for negative values
  //   } else {
  //     return "blue"; // Circle will be blue for zero values
  //   }
  // };

  // Find the minimum value of uv in the data
  // const minUv = Math.min(...data.map((item) => item.uv));
  // const yAxisMin = minUv - 100; // Adjust the padding as needed

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="pv"
          name="date"
          // unit="UTC"
          // tickFormatter={(dateString) =>
          //   new Date(dateString).toLocaleDateString()
          // }
        />
        <YAxis
          dataKey="uv"
          name="(P&L)"
          unit="$"
          type="number"
          fontSize={14}
          // domain={[yAxisMin, "dataMax + 100"]} /// Adjust the Y-axis domain to exclude the minimum value
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value, name) => [`${value} $`, 'P&L']}
        />
        {/* <Area
          type="monotone"
          dataKey="uv"
          stroke="#5779C7"
          fill="#5779C7"
          fillOpacity={0.6}
          dot={{ r: 4, stroke: "#5779C7", fill: getCircleColor }} // Use getCircleColor function to set custom dot color
        /> */}
        <Area
          type="natural"
          dataKey="uv"
          stroke="#5779C7"
          strokeWidth={3}
          fill="#5779C7"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
