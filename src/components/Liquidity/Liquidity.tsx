import { Box, Typography, Tooltip } from '@mui/material';
import React from 'react';

import { useSelector } from 'react-redux';
// import { RootState } from "@/redux/store";

interface LiquidityProps {
  questionId: number;
}
// import dynamic from 'next/dynamic';
// const WaterDropIcon = dynamic(() => import('@mui/icons-material/WaterDrop'));
const Liquidity: React.FC<LiquidityProps> = ({ questionId }) => {
  // const question = useSelector((state: RootState) => {
  //   const selectedQuestion = state.questions.questionsData.find(
  //     q => q.id === questionId
  //   );
  //   return selectedQuestion;
  // });

  // if (!question) {
  //   // Handle the case when the question is not found
  //   return null;
  // }

  // Format the liquidity value with thousand separators
  // const formattedLiquidity = new Intl.NumberFormat().format(question.liquidity);

  return (
    <Box display="flex" alignItems="center">
      <Tooltip title="Liquidity" aria-label="Liquidity">
        <Box display={'flex'} alignItems={'center'}>
          {/* <WaterDropIcon fontSize="small" /> */}
        </Box>
      </Tooltip>
      <Typography variant="subtitle2" fontWeight={500}>
        {/* {formattedLiquidity}  */}K
      </Typography>
    </Box>
  );
};

export default Liquidity;
