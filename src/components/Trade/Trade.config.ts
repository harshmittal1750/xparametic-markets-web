/* eslint-disable import/prefer-default-export */
import type { Views } from './Trade.types';

const views: Views = {
  default: {
    background: {
      image: false
    },
    market: {
      categories: false,
      title: false
    }
  },
  modal: {
    background: {
      image: true
    },
    market: {
      categories: true,
      title: true
    }
  }
};

export { views };
