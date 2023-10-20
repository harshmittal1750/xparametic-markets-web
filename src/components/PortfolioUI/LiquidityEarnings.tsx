import { Box, Typography } from '@mui/material';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';

const LiquidityEarnings: React.FC = () => {
  const data = [
    {
      name: 'Page A',
      uv: 650,
      pv: 200,
      amt: 800
    },
    {
      name: 'Page B',
      uv: 300,
      pv: 430,
      amt: 350
    },
    {
      name: 'Page C',
      uv: 180,
      pv: 720,
      amt: 450
    },
    {
      name: 'Page D',
      uv: 1100,
      pv: 860,
      amt: 1000
    },
    {
      name: 'Page E',
      uv: 880,
      pv: 540,
      amt: 650
    },
    {
      name: 'Page F',
      uv: 400,
      pv: 680,
      amt: 370
    },
    {
      name: 'Page G',
      uv: 750,
      pv: 350,
      amt: 720
    },
    {
      name: 'Page H',
      uv: 1300,
      pv: 990,
      amt: 1400
    },
    {
      name: 'Page I',
      uv: 490,
      pv: 360,
      amt: 790
    }
  ];

  return (
    // <Box
    //   className="custom-liquidity-earnings"
    //   sx={{
    //     borderRadius: 4,
    //     m: 2,
    //     boxShadow: 1,
    //     backgroundColor: "#fff",
    //     padding: 1,
    //   }}
    // >
    //   <Typography
    //     variant="subtitle1"
    //     sx={{ color: "background.default", mb: 1 }}
    //   >
    //     Liquidity Earnings
    //   </Typography>

    //   <AreaChart
    //     width={320}
    //     height={60}
    //     data={data}
    //     margin={{
    //       top: 5,
    //       right: 0,
    //       left: 0,
    //       bottom: 5,
    //     }}
    //   >
    //     <Area
    //       type="monotone"
    //       dataKey="uv"
    //       stroke="#FFFFFF"
    //       fill="#FFFFFF"
    //       fillOpacity={0.4}
    //     />
    //   </AreaChart>
    // </Box>
    <Box
      borderRadius={2}
      my={1}
      // boxShadow={1}
      width={300}
      px={3}
      py={2}
      border={1}
      borderColor={'gray'}
      sx={{
        // backgroundImage:
        //   " linear-gradient(to right top, #1752f0, #5351ec, #7151e8, #8851e4, #9b51df)",
        backgroundColor: '#ffffff',
        backgroundBlendMode: 'difference'
      }}
      // justifyContent={"center"}
      // alignItems={"center"}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box
        sx={{
          borderRadius: '100%',
          backgroundColor: '#FEF5ED',
          p: 1,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          mr: 10
        }}
      >
        <StackedLineChartIcon fontSize={'medium'} sx={{ color: 'black' }} />
      </Box>
      <Typography variant="caption" color={'grey'} mt={1}>
        Liquidity Earnings
      </Typography>
      <Typography variant="h6" color={'primary.main'}>
        $ 1650{' '}
      </Typography>
      {/* <AreaChart
        width={320}
        height={60}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#FFFFFF"
          fill="#FFFFFF"
          fillOpacity={0.4}
        />
      </AreaChart> */}
    </Box>
  );
};

export default LiquidityEarnings;
