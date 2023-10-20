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
import EqualizerIcon from '@mui/icons-material/Equalizer';
const TotalEarning: React.FC = () => {
  const data = [
    {
      name: 'Page A',
      uv: 100,
      pv: 400,
      amt: 400
    },
    {
      name: 'Page B',
      uv: 250,
      pv: 139,
      amt: 221
    },
    {
      name: 'Page C',
      uv: 200,
      pv: 980,
      amt: 229
    },
    {
      name: 'Page D',
      uv: 780,
      pv: 908,
      amt: 1000
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 1800,
      amt: 2181
    },
    {
      name: 'Page F',
      uv: 390,
      pv: 800,
      amt: 500
    },
    {
      name: 'Page G',
      uv: 390,
      pv: 400,
      amt: 100
    },
    {
      name: 'Page H',
      uv: 3490,
      pv: 4300,
      amt: 2100
    },
    {
      name: 'Page I',
      uv: 490,
      pv: 300,
      amt: 100
    }
  ];

  return (
    // <Box
    //   className="custom-portfolio-earning"
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
    //     Total Earnings
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
          backgroundColor: '#F5EEFC',
          p: 1,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          mr: 10
        }}
      >
        <EqualizerIcon fontSize={'medium'} sx={{ color: 'black' }} />
      </Box>
      <Typography variant="caption" color={'grey'} mt={1}>
        Volume Traded
      </Typography>
      <Typography variant="h6" color={'primary.main'}>
        $ 251724710{' '}
      </Typography>
    </Box>
  );
};

export default TotalEarning;
