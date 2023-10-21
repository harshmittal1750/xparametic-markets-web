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
import ShowChartIcon from '@mui/icons-material/ShowChart';
const OpenPositions: React.FC = () => {
  const data = [
    {
      name: 'Page A',
      uv: 1200,
      pv: 800,
      amt: 1600
    },
    {
      name: 'Page B',
      uv: 450,
      pv: 300,
      amt: 600
    },
    {
      name: 'Page C',
      uv: 890,
      pv: 600,
      amt: 950
    },
    {
      name: 'Page D',
      uv: 300,
      pv: 200,
      amt: 350
    },
    {
      name: 'Page E',
      uv: 780,
      pv: 400,
      amt: 900
    },
    {
      name: 'Page F',
      uv: 600,
      pv: 450,
      amt: 800
    },
    {
      name: 'Page G',
      uv: 1050,
      pv: 700,
      amt: 1300
    },
    {
      name: 'Page H',
      uv: 1800,
      pv: 1200,
      amt: 2200
    },
    {
      name: 'Page I',
      uv: 950,
      pv: 600,
      amt: 1100
    }
  ];

  return (
    // <Box
    //   className="custom-open-positions"
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
    //     Open Positions
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
          backgroundColor: '#EBF2FD',
          p: 1,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          mr: 10
        }}
      >
        <ShowChartIcon fontSize={'medium'} sx={{ color: 'black' }} />
      </Box>
      <Typography variant="caption" color={'grey'} mt={1}>
        Open Positions
      </Typography>
      <Typography variant="h6" color={'primary.main'}>
        14{' '}
      </Typography>
    </Box>
  );
};

export default OpenPositions;
