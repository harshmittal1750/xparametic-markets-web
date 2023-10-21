// store/questionsSlice.ts
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Question {
  id: number;
  question: string;
  betValueYes: number;
  betValueNo: number;
  imageUrl: string;
  category: string;
  subCategory: string;
  liquidity: number;
  tradingFee: number;
  expiryDate: string;
  volume: number;
}

export interface QuestionsState {
  questionsData: Question[];
}

export const initialQuestionsState: QuestionsState = {
  questionsData: [
    {
      id: 1,
      question: 'Will 2023 be the hottest year on record?',
      betValueYes: 0.46,
      betValueNo: 0.54,
      imageUrl: 'HotSummer.webp',
      category: 'Climate Risk',
      subCategory: 'Temperature',
      liquidity: 23,
      tradingFee: 3,
      expiryDate: '2024-08-01',
      volume: 123
    },
    {
      id: 2,
      question:
        'Will there be an increase in named storms globally in 2023 compared to 2022? ',
      betValueYes: 0.12,
      betValueNo: 0.88,
      imageUrl: 'Storm.webp',
      category: 'Natural Catastrophe Risk',
      subCategory: 'Storms',
      liquidity: 54,
      tradingFee: 3,
      expiryDate: '2024-03-01',
      volume: 543
    },
    {
      id: 3,
      question:
        'Will the atmospheric CO2 concentration reach 400 ppm by the end of 2023?',
      betValueYes: 0.54,
      betValueNo: 0.46,
      imageUrl: 'GHG.webp',
      category: 'Climate Risk',
      subCategory: 'GHG',
      liquidity: 87,
      tradingFee: 3,
      expiryDate: '2023-01-11',
      volume: 165
    },

    {
      id: 4,
      question:
        'Will the total area burned by wildfires in California exceed 1 million acres in 2024?',
      betValueYes: 0.64,
      betValueNo: 0.36,
      imageUrl: 'Fire.webp',
      category: 'Natural Catastrophe Risk',
      subCategory: 'Wildfires',
      liquidity: 36,
      tradingFee: 3,
      expiryDate: '2024-08-06',
      volume: 23
    }
  ]
};

const questionSlice = createSlice({
  name: 'questions',
  initialState: initialQuestionsState,
  reducers: {
    loadQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questionsData = action.payload;
    }
  }
});

export const { loadQuestions } = questionSlice.actions;

export default questionSlice.reducer;
