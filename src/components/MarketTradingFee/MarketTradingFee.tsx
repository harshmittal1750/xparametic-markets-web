import { Box, Tooltip, Typography } from '@mui/material';

import React from 'react';

import PercentIcon from '@mui/icons-material/Percent';

import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

interface MarketTradingFeeProps {
  questionId: number;
}

const MarketTradingFee: React.FC<MarketTradingFeeProps> = ({ questionId }) => {
  const question = useSelector((state: RootState) => {
    const selectedQuestion = state.questions.questionsData.find(
      q => q.id === questionId
    );
    return selectedQuestion;
  });

  if (!question) {
    // Handle the case when the question is not found
    return null;
  }

  // // Format the trading fee as a percentage with 2 decimal places
  //  // const formattedTradingFee = `${(question.tradingFee * 100).toFixed(2)}%`;

  // // Determine the color based on the trading fee value
  // // const textColor =
  // //   question.tradingFee > 0
  // //     ? "green"
  // //     : question.tradingFee < 0
  // //     ? "red"
  // //     : "black";

  return (
    <Box display="flex" alignItems="center">
      <Tooltip title="Trading Fee" aria-label="Trading Fee">
        <Box display="flex" alignItems="center">
          <PercentIcon
            fontSize="small"
            //  htmlColor={textColor}
          />
        </Box>
      </Tooltip>
      <Typography
        variant="subtitle2"
        fontWeight={500}
        // style={{ color: textColor }}
      >
        {question.tradingFee}
      </Typography>
    </Box>
  );
};

export default MarketTradingFee;
