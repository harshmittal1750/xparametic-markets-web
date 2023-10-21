import React from 'react';

import { useSelector } from 'react-redux';

import LeaderBoardIcon from '@mui/icons-material/LeaderboardOutlined';
import { Box, Typography, Tooltip } from '@mui/material';

import { RootState } from '../../redux/store';

interface MarketValueProps {
  questionId: number;
}

const MarketValue: React.FC<MarketValueProps> = ({ questionId }) => {
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

  // Format the market value with thousand separators and currency symbol
  const formattedMarketValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(question.volume);

  return (
    <Box display="flex" alignItems="center">
      <Tooltip title="Market Value" aria-label="Market Value">
        <Box display="flex" alignItems="center">
          <LeaderBoardIcon fontSize="small" />
        </Box>
      </Tooltip>
      <Typography variant="subtitle2" fontWeight={500}>
        {formattedMarketValue}K
      </Typography>
    </Box>
  );
};

export default MarketValue;
