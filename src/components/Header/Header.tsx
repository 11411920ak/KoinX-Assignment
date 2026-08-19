import { TrendingDown, Info } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">
          <TrendingDown size={22} color="#fff" />
        </div>
        <span className="header-logo-text">KoinX</span>
      </div>

      <div className="header-title-section">
        <h1 className="header-title">Tax Loss Harvesting</h1>
        <div className="header-info-group">
          <Info size={16} className="header-info-icon" />
          <span className="header-info-text">
            How it works?
          </span>
        </div>
      </div>
    </header>
  );
}
