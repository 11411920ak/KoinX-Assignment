import { useHarvesting } from '../../context/HarvestingContext';
import CapitalGainsCard from '../CapitalGainsCard/CapitalGainsCard';
import { TrendingDown } from 'lucide-react';

export default function GainsSection() {
  const { preGains, afterGains, savings, state } = useHarvesting();
  const isLoading = state.loadingGains;

  if (isLoading) {
    return (
      <div className="gains-loader">
        <div className="spinner" />
        <span className="loader-text">Loading capital gains…</span>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="error-state">
        <TrendingDown size={32} className="error-icon" />
        <p className="error-text">{state.error}</p>
      </div>
    );
  }

  if (!preGains || !afterGains) return null;

  return (
    <div className="gains-section">
      <CapitalGainsCard variant="pre" gains={preGains} />
      <CapitalGainsCard variant="post" gains={afterGains} savings={savings} />
    </div>
  );
}
