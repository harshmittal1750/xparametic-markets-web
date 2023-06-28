/* eslint-disable import/prefer-default-export */
import type { Views } from './Trade.types';

const views: Views = {
  default: {
    background: {
      image: false
    },
    market: {
      details: false
    }
  },
  modal: {
    background: {
      image: true
    },
    market: {
      details: true
    }
  }
};

export { views };
