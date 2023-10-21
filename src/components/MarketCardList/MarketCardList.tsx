import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Box } from '@mui/material';

import { MarketCard } from 'components';

import {
  loadQuestions,
  initialQuestionsState
} from '../../redux/ducks/questionSlice';
import { RootState } from '../../redux/store';

const MarketCardList = () => {
  const dispatch = useDispatch();

  // Load questions data from the Redux store
  useEffect(() => {
    // Simulate fetching data from an API or backend
    const fetchData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dispatch the action to load the questions data into the store
      dispatch(loadQuestions(initialQuestionsState.questionsData));
    };

    fetchData();
  }, [dispatch]);

  const questionsData = useSelector(
    (state: RootState) => state.questions.questionsData
  );

  return (
    <div>
      {questionsData.map(questionItem => (
        <Box
          key={questionItem.id}
          // sx={{ boxShadow: 'none' }}
          sx={{
            width: '100%',
            justifyContent: 'center',
            display: 'flex'
          }}
        >
          <MarketCard questionId={questionItem.id} />
        </Box>
      ))}
    </div>
  );
};

export default MarketCardList;
