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
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const LiquidityProvided: React.FC = () => {
  const data = [
    {
      name: 'Page A',
      uv: 820,
      pv: 600,
      amt: 1000
    },
    {
      name: 'Page B',
      uv: 400,
      pv: 230,
      amt: 350
    },
    {
      name: 'Page C',
      uv: 180,
      pv: 890,
      amt: 590
    },
    {
      name: 'Page D',
      uv: 1300,
      pv: 960,
      amt: 1400
    },
    {
      name: 'Page E',
      uv: 980,
      pv: 710,
      amt: 870
    },
    {
      name: 'Page F',
      uv: 550,
      pv: 870,
      amt: 430
    },
    {
      name: 'Page G',
      uv: 920,
      pv: 500,
      amt: 790
    },
    {
      name: 'Page H',
      uv: 1490,
      pv: 1340,
      amt: 1200
    },
    {
      name: 'Page I',
      uv: 620,
      pv: 490,
      amt: 890
    }
  ];

  return (
    // <Box
    //   className="custom-liquidity-provided"
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
    //     Liquidity Provided
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
          backgroundColor: '#ECF6F0',
          p: 1,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          mr: 10
        }}
      >
        <AutoGraphIcon fontSize={'medium'} sx={{ color: 'black' }} />
      </Box>
      <Typography variant="caption" color={'grey'} mt={1}>
        Liquidity Provided
      </Typography>
      <Typography variant="h6" color={'primary.main'}>
        $ 65140{' '}
      </Typography>
    </Box>
  );
};

export default LiquidityProvided;
