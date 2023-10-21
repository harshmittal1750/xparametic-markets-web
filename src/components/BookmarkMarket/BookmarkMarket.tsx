import React, { useState } from 'react';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Box, IconButton, Tooltip } from '@mui/material';

const BookmarkMarket = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked(prev => !prev);
  };

  return (
    <Box display="flex">
      <Tooltip title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}>
        <IconButton
          disableRipple
          onClick={handleBookmarkToggle}
          sx={{
            color: 'primary.light',

            '&:hover': { backgroundColor: 'transparent' }
          }}
        >
          {isBookmarked ? (
            <BookmarkAddedIcon fontSize="small" />
          ) : (
            <BookmarkAddIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default BookmarkMarket;
