import { Box, Typography, Grid, Container } from "@mui/material";
import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TotalBalanceChart from "./TotalBalanceChart";

const PorfolioTotalBalance: React.FC = () => {
  return (
    <Container maxWidth="xl">
      {" "}
      <Box
        sx={{
          border: 1,
          boxShadow: 1,
          borderRadius: 4,
          padding: 2,
          my: 2,

          backgroundColor: "#F4F4F4", // Change to a more appealing background color
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item xs={12} sm={6} color={"primary.main"}>
            <Typography variant="caption" fontWeight={600}>
              Portfolio Value
            </Typography>
            <Typography variant="h4" component="div" fontWeight={600} my={1}>
              $4498650
            </Typography>
            {/* <Typography variant="subtitle1" color={"primary.main"}>
        Total Balance
      </Typography> */}
          </Grid>
          <Grid item>
            <Box
              sx={{
                backgroundColor: "primary.main",
                display: "inline-block",
                borderRadius: 5,

                padding: 1,
              }}
            >
              <Box display="flex" alignItems="center">
                <ArrowDropUpIcon sx={{ color: "#FFF" }} />
                <Typography sx={{ color: "#FFF" }}>+10200%</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <TotalBalanceChart />
      </Box>
    </Container>
  );
};

export default PorfolioTotalBalance;
