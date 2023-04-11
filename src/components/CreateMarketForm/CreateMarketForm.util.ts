import uuid from 'react-uuid';

import dayjs from 'dayjs';
import { almost } from 'helpers/math';
import sum from 'lodash/sum';
import * as Yup from 'yup';

import type { CreateMarketFormData } from './CreateMarketForm.type';

const initialValues: CreateMarketFormData = {
  question: '',
  answerType: 'binary',
  outcomes: [
    { id: uuid(), name: 'Yes', probability: 50 },
    { id: uuid(), name: 'No', probability: 50 }
  ],
  image: {
    file: undefined,
    hash: '',
    isUploaded: false
  },
  category: '',
  subcategory: '',
  closingDate: dayjs().toString(),
  liquidity: 0,
  resolutionSource: ''
};

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Market Question is required.'),
  image: Yup.object().shape({
    hash: Yup.string().required('Image is required.')
  }),
  outcomes: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Outcome name is required.'),
        probability: Yup.number()
          .moreThan(0, 'Probability must be greater than 0%.')
          .lessThan(100, 'Probability must be less than 100%.')
          .required('Probability is required.')
      })
    )
    .test('sum', 'Sum of probabilities must be 100%', (_value, context) => {
      const { outcomes } = context.parent;
      const probabilities = outcomes.map(outcome => outcome.probability);
      const sumOfProbabilities = sum(probabilities);
      return almost(sumOfProbabilities, 100);
    }),
  category: Yup.string().required('Category is required.'),
  subcategory: Yup.string().required('Subcategory is required.'),
  closingDate: Yup.date()
    .min(
      dayjs().format('MM/DD/YYYY HH:mm'),
      `Closing date must be later than ${dayjs().format('DD/MM/YYYY HH:mm')}`
    )
    .required('Closing date is required.'),
  liquidity: Yup.number().moreThan(0).required('Liquidity is required.'),
  resolutionSource: Yup.string()
    .url('Please enter a valid url.')
    .required('Resolution source is required.')
});

export { initialValues, validationSchema };
