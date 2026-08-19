import type { CapitalGains, ComputedGains, Holding } from '../types';

export function computeGains(capitalGains: CapitalGains): ComputedGains {
  const netStcg = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const netLtcg = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  return {
    stcg: capitalGains.stcg,
    ltcg: capitalGains.ltcg,
    netStcg,
    netLtcg,
    realisedCapitalGains: netStcg + netLtcg,
  };
}

export function computeAfterHarvestingGains(
  baseGains: CapitalGains,
  selectedHoldings: Holding[]
): ComputedGains {
  let stcgProfits = baseGains.stcg.profits;
  let stcgLosses = baseGains.stcg.losses;
  let ltcgProfits = baseGains.ltcg.profits;
  let ltcgLosses = baseGains.ltcg.losses;

  for (const holding of selectedHoldings) {
    const stcgGain = holding.stcg.gain;
    const ltcgGain = holding.ltcg.gain;

    if (stcgGain > 0) {
      stcgProfits += stcgGain;
    } else if (stcgGain < 0) {
      stcgLosses += Math.abs(stcgGain);
    }

    if (ltcgGain > 0) {
      ltcgProfits += ltcgGain;
    } else if (ltcgGain < 0) {
      ltcgLosses += Math.abs(ltcgGain);
    }
  }

  const netStcg = stcgProfits - stcgLosses;
  const netLtcg = ltcgProfits - ltcgLosses;

  return {
    stcg: { profits: stcgProfits, losses: stcgLosses },
    ltcg: { profits: ltcgProfits, losses: ltcgLosses },
    netStcg,
    netLtcg,
    realisedCapitalGains: netStcg + netLtcg,
  };
}

export function formatCurrency(value: number): string {
  const absValue = Math.abs(value);
  let formatted: string;

  if (absValue >= 1e7) {
    formatted = (absValue / 1e7).toFixed(2) + ' Cr';
  } else if (absValue >= 1e5) {
    formatted = (absValue / 1e5).toFixed(2) + ' L';
  } else {
    formatted = absValue.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (value < 0 ? '-' : '') + '₹' + formatted;
}

export function formatNumber(value: number, maxDecimals = 8): string {
  if (Math.abs(value) < 1e-10) return '0';
  if (Math.abs(value) < 0.0001) {
    return value.toExponential(4);
  }
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });
}

/**
 * Sort holdings:
 * 1. Assets with any loss first (most negative gain at top)
 * 2. Then assets with gains (highest gain at top)
 */
export function sortHoldings(holdings: Holding[]): Holding[] {
  return [...holdings].sort((a, b) => {
    const aMinGain = Math.min(a.stcg.gain, a.ltcg.gain);
    const bMinGain = Math.min(b.stcg.gain, b.ltcg.gain);
    return aMinGain - bMinGain;
  });
}
