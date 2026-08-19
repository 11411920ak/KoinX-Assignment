import type { CapitalGainsResponse } from '../types';

const CAPITAL_GAINS_DATA: CapitalGainsResponse = {
  capitalGains: {
    stcg: {
      profits: 70200.88,
      losses: 1548.53,
    },
    ltcg: {
      profits: 5020,
      losses: 3050,
    },
  },
};

export const fetchCapitalGains = (): Promise<CapitalGainsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CAPITAL_GAINS_DATA);
    }, 600);
  });
};
