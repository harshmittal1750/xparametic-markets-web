/* eslint-disable import/prefer-default-export */
import uuid from 'react-uuid';

const defaultBinaryOutcomes = [
  { id: uuid(), name: 'Yes', probability: 50 },
  { id: uuid(), name: 'No', probability: 50 }
];

export { defaultBinaryOutcomes };
