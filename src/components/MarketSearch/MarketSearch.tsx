import React, { useState, ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';

const MarketSearch = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    console.log('Search value:', event.target.value);
    // Here you can add the logic for on-type search
  };

  return (
    <Box m={2} display="flex" width="100%">
      <TextField
        fullWidth
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search"
        variant="outlined"
      />
    </Box>
  );
};

export default MarketSearch;
