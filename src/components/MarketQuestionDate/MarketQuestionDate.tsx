import React from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { Box, Typography, Tooltip } from '@mui/material';

import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

interface MarketQuestionDateProps {
  questionId: number;
}

const MarketQuestionDate: React.FC<MarketQuestionDateProps> = ({
  questionId
}) => {
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

  // Format the expiry date
  const expiryDate = new Date(question.expiryDate);
  const formattedExpiryDate = expiryDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Check if the question is expired or expires today
  const today = new Date();
  const isExpired = expiryDate < today;
  const isExpiringToday = expiryDate.toDateString() === today.toDateString();
  const getTooltipTitle = () => {
    if (isExpired) return 'This question has expired.';
    if (isExpiringToday) return 'Expires today!';
    return formattedExpiryDate;
  };
  return (
    <Box display="flex" alignItems="center">
      <Tooltip title={getTooltipTitle()} arrow>
        <Box display="flex" alignItems="center" pr={1}>
          <CalendarMonthIcon fontSize="small" />
        </Box>
      </Tooltip>
      <Typography variant="subtitle2" fontWeight={500}>
        {isExpired ? 'Expired' : formattedExpiryDate}
      </Typography>
    </Box>
  );
};

export default MarketQuestionDate;
