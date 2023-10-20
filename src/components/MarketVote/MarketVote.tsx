import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface MarketVoteProps {
  initialValue?: number;
}

const MarketVote: React.FC<MarketVoteProps> = ({ initialValue = 0 }) => {
  const [voteCount, setVoteCount] = useState(initialValue);

  const handleVoteUp = () => {
    setVoteCount(prevCount => prevCount + 1);
  };

  const handleVoteDown = () => {
    setVoteCount(prevCount => Math.max(prevCount - 1, 0));
  };

  return (
    <Box display="flex" alignItems={'center'}>
      <Tooltip title="Vote Up">
        <IconButton
          disableRipple
          onClick={handleVoteUp}
          sx={{
            color: 'primary.light',
            '&:hover': { backgroundColor: 'transparent' }
          }}
        >
          <ThumbUpAltIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title={voteCount}>
        <Typography variant="subtitle1" fontWeight={500}>
          {voteCount}
        </Typography>
      </Tooltip>
      <Tooltip title="Vote Down">
        <IconButton
          disableRipple
          onClick={handleVoteDown}
          sx={{
            color: 'primary.light',
            '&:hover': { backgroundColor: 'transparent' }
          }}
        >
          <ThumbDownAltIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default MarketVote;
