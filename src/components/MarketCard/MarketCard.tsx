import * as React from 'react';
import { useSelector } from 'react-redux';
// import { RootState } from "@/redux/store";

import {
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import { CardThumbnailChartYes } from 'components';
import { CardThumbnailChartNo } from 'components';
import { Liquidity } from 'components';
import { MarketValue } from 'components';
import { MarketTradingFee } from 'components';
import { MarketQuestionDate } from 'components';

import { ShareMarket } from 'components';
import { BookmarkMarket } from 'components';
import { MarketVote } from 'components';
import { MarketQuestionBreadCrumbs } from 'components';

interface MarketCardListProps {
  questionId: number; // Add the questionId prop to the MarketCard component
  // Rest of the props...
}

const MarketCard: React.FC<MarketCardListProps> = ({ questionId }) => {
  // const questions = useSelector(
  //   (state: RootState) => state.questions.questionsData
  // );

  // Find the question corresponding to the given questionId
  // const question = questions.find(q => q.id === questionId);

  // if (!question) {
  //   // Handle the case when the question is not found
  //   return null;
  // }

  return (
    <Container maxWidth={'xl'}>
      {/* Removed unnecessary opening and closing div tags */}
      <Box
        // key={question.id}
        sx={{
          borderRadius: 3,
          boxShadow: 1,
          borderColor: '#8C8881',
          my: 2
        }}
      >
        <Card sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ width: 100, height: 100, my: 'auto', mx: 2 }}>
            <CardMedia
              component="img"
              sx={{
                width: '100px',
                height: '100px',
                borderRadius: '100%'
              }}
              // image={question.imageUrl}
              alt="Live from space album cover"
            />
          </Box>
          <Grid container>
            <Grid item xs={12} xl={7}>
              <CardContent>
                <Box>
                  <MarketQuestionBreadCrumbs questionId={questionId} />
                </Box>
                <Typography
                  component="div"
                  variant="h5"
                  id="question"
                  sx={{ py: 1 }}
                >
                  {/* {question.question} */}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} xl={5}>
              <Box display="flex" flexDirection={{ xs: 'column', xl: 'row' }}>
                <Box
                  display="flex"
                  sx={{
                    border: 1,
                    m: 2,
                    p: 2,
                    borderRadius: 1,
                    borderBottomColor: '#284E45'
                  }}
                >
                  <Box width="100%" sx={{ mx: 1 }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={500}>
                        Yes
                      </Typography>
                    </Box>
                    <Box display="flex">
                      <Typography variant="subtitle2">
                        {/* {question.betValueYes}{' '} */}
                        <Typography variant="overline"> USDT</Typography>
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mx: 1 }}>
                    <CardThumbnailChartYes />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  sx={{
                    border: 1,
                    m: 2,
                    p: 2,
                    borderRadius: 1,
                    borderBottomColor: '#9F3638'
                  }}
                >
                  <Box width="100%" mx={1}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={500}>
                        No
                      </Typography>
                    </Box>
                    <Box display="flex">
                      <Typography variant="subtitle2">
                        {/* {question.betValueNo} */}
                        <Typography variant="overline"> USDT</Typography>
                      </Typography>
                    </Box>
                  </Box>
                  <Box mx={1}>
                    <CardThumbnailChartNo />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Grid
          container
          sx={{
            backgroundColor: 'secondary.main',
            color: 'primary.light'
          }}
        >
          <Grid item xs={12} xl={5}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'space-between', xl: 'space-around' },
                p: 1,
                borderRadius: 3
              }}
            >
              <MarketValue questionId={questionId} />
              <Liquidity questionId={questionId} />
              <MarketTradingFee questionId={questionId} />
              <MarketQuestionDate questionId={questionId} />
            </Box>
          </Grid>
          <Grid item xs={12} xl={4}></Grid>
          <Grid item xs={12} xl={3}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'space-between', xl: 'space-around' }
              }}
            >
              <ShareMarket />
              <BookmarkMarket />
              <MarketVote />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MarketCard;
