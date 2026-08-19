export interface GainData {
  balance: number;
  gain: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainData;
  ltcg: GainData;
}

export interface GainCategory {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: GainCategory;
  ltcg: GainCategory;
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}

export interface ComputedGains {
  stcg: GainCategory;
  ltcg: GainCategory;
  netStcg: number;
  netLtcg: number;
  realisedCapitalGains: number;
}
