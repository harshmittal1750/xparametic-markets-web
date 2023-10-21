import React from 'react';
import { AreaChart, Area } from 'recharts';

// type BetData = {
//   name: string;
//   uv: number;
// };

// const generateChartDataForYes = (yesBetValues: number[]): BetData[] => {
//   const totalYesAmount = yesBetValues.reduce(
//     (sum, betValue) => sum + betValue,
//     0
//   );

//   const data: BetData[] = yesBetValues.map((betValue, index) => ({
//     name: `Bet ${index + 1}`,
//     uv: (betValue / totalYesAmount) * 100,
//   }));

//   return data;
// };

// // Example usage with different bet values for "Yes"
// const yesBetValues: number[] = [300, 450, 200, 150, 350];
// const yesChartData: BetData[] = generateChartDataForYes(yesBetValues);

// console.log(yesChartData);

const yesChartData = [
  {
    name: 'Page A',
    uv: 100,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 300,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 800,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 680,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 1390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const CardThumbnailChartYes: React.FC = () => {
  return (
    <div>
      <AreaChart
        width={80}
        height={60}
        data={yesChartData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5
        }}
      >
        <Area type="monotone" dataKey="uv" stroke="#0ECB81" fill="#0ECB81" />
      </AreaChart>
    </div>
  );
};

export default CardThumbnailChartYes;
