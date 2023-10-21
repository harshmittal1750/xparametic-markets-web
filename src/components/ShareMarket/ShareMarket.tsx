import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import { Box, IconButton, Tooltip } from '@mui/material';

const ShareMarket = () => {
  const handleShareClick = () => {
    // Replace 'YOUR_TWEET_MESSAGE' with the desired tweet message
    const tweetMessage = 'Check out this awesome market!';

    // Generate the Twitter share URL with the tweet message as a query parameter
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetMessage
    )}`;

    // Open the share URL in a new window
    window.open(tweetUrl, '_blank');
  };

  return (
    <Box display="flex" alignItems="center">
      <Tooltip title="Share this Market on Twitter">
        <IconButton
          disableRipple
          onClick={handleShareClick}
          // color="primary"
          aria-label="Share on Twitter"
          sx={{
            p: 1,
            '&:hover': { backgroundColor: 'transparent' }
          }}
        >
          <ShareIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ShareMarket;
