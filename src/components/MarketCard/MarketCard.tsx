import * as React from 'react';
import { useSelector } from 'react-redux';

import {
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';

import {
  BookmarkMarket,
  CardThumbnailChartNo,
  CardThumbnailChartYes,
  Liquidity,
  MarketQuestionBreadCrumbs,
  MarketQuestionDate,
  MarketTradingFee,
  MarketValue,
  MarketVote,
  ShareMarket
} from 'components';

import { RootState } from '../../redux/store';

interface MarketCardListProps {
  questionId: number; // Add the questionId prop to the MarketCard component
  // Rest of the props...
}

const MarketCard: React.FC<MarketCardListProps> = ({ questionId }) => {
  const questions = useSelector(
    (state: RootState) => state.questions.questionsData
  );

  // Find the question corresponding to the given questionId
  const question = questions.find(q => q.id === questionId);

  if (!question) {
    return null;
  }

  return (
    <Box
      key={question.id}
      sx={{
        borderRadius: 1,
        border: 1,
        borderColor: '#E3E7F0',
        width: '100%',
        my: 2
      }}
    >
      <Card sx={{ display: 'flex', width: '100%', boxShadow: 'none' }}>
        <Box sx={{ width: 100, height: 100, my: 'auto', mx: 2 }}>
          <CardMedia
            component="img"
            sx={{
              width: '100px',
              height: '100px',
              borderRadius: '100%',
              border: 2,
              borderColor: '#E3E7F0'
            }}
            image={question.imageUrl}
            alt="question"
          />
        </Box>

        <Grid container>
          <Grid item xl={7} lg={7} md={7}>
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
                {question.question}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xl={5} lg={5} md={5}>
            <Box
              display="flex"
              flexDirection={{
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
                xl: 'row'
              }}
            >
              <Box
                display="flex"
                sx={{
                  border: 1,
                  m: 2,
                  p: 2,
                  borderRadius: 1,
                  borderColor: '#E3E7F0'
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
                      {question.betValueYes}{' '}
                      <Typography variant="overline"> USDT</Typography>
                    </Typography>
                  </Box>
                </Box>
                {/* <Box sx={{ mx: 1 }}>
                  <CardThumbnailChartYes />
                </Box> */}
              </Box>
              <Box
                display="flex"
                sx={{
                  border: 1,
                  m: 2,
                  p: 2,
                  borderRadius: 1,
                  borderColor: '#E3E7F0'
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
                      {question.betValueNo}
                      <Typography variant="overline"> USDT</Typography>
                    </Typography>
                  </Box>
                </Box>
                {/* <Box mx={1}>
                  <CardThumbnailChartNo />
                </Box> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Grid
        container
        sx={{
          backgroundColor: '',
          color: 'primary.light'
        }}
      >
        <Grid
          item
          xl={5}
          lg={5}
          sm={12}
          md={5}
          xs={12}
          flexDirection="row"
          display="flex"
          justifyContent="space-around"
        >
          <MarketValue questionId={questionId} />
          <Liquidity questionId={questionId} />
          <MarketTradingFee questionId={questionId} />
          <MarketQuestionDate questionId={questionId} />
        </Grid>
        <Grid item xl={4} lg={4} />
        <Grid
          item
          xl={3}
          lg={3}
          sm={12}
          md={3}
          xs={12}
          flexDirection="row"
          display="flex"
          justifyContent="space-around"
        >
          <ShareMarket />
          <BookmarkMarket />
          <MarketVote />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarketCard;
