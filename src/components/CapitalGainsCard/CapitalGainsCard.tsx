import type { ComputedGains } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { Sparkles } from 'lucide-react';

interface Props {
  variant: 'pre' | 'post';
  gains: ComputedGains;
  savings?: number;
}

function GainRow({
  label,
  profits,
  losses,
  net,
  variant,
}: {
  label: string;
  profits: number;
  losses: number;
  net: number;
  variant: 'pre' | 'post';
}) {
  const isPost = variant === 'post';
  return (
    <div className="gain-row">
      <div className={`gain-label ${isPost ? 'gain-label-post' : 'gain-label-pre'}`}>
        {label}
      </div>
      <div className="gain-cols">
        <div className="gain-col">
          <span className={`gain-header-text ${isPost ? 'gain-header-post' : 'gain-header-pre'}`}>
            Profits
          </span>
          <span className="gain-value gain-positive">{formatCurrency(profits)}</span>
        </div>
        <div className="gain-divider" />
        <div className="gain-col">
          <span className={`gain-header-text ${isPost ? 'gain-header-post' : 'gain-header-pre'}`}>
            Losses
          </span>
          <span className="gain-value gain-negative">-{formatCurrency(losses)}</span>
        </div>
        <div className="gain-divider" />
        <div className="gain-col">
          <span className={`gain-header-text ${isPost ? 'gain-header-post' : 'gain-header-pre'}`}>
            Net Capital Gains
          </span>
          <span className={`gain-value ${net >= 0 ? 'gain-positive' : 'gain-negative'}`}>
            {formatCurrency(net)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CapitalGainsCard({ variant, gains, savings = 0 }: Props) {
  const isPost = variant === 'post';

  return (
    <div className={`card ${isPost ? 'card-post' : 'card-pre'}`}>
      <h2 className={`card-title ${isPost ? 'card-title-post' : 'card-title-pre'}`}>
        {isPost ? 'After Harvesting' : 'Pre Harvesting'}
      </h2>

      <div className="card-rows">
        <GainRow
          label="Short-Term"
          profits={gains.stcg.profits}
          losses={gains.stcg.losses}
          net={gains.netStcg}
          variant={variant}
        />
        <div className={`card-separator ${isPost ? 'card-separator-post' : 'card-separator-pre'}`} />
        <GainRow
          label="Long-Term"
          profits={gains.ltcg.profits}
          losses={gains.ltcg.losses}
          net={gains.netLtcg}
          variant={variant}
        />
      </div>

      <div className={`card-footer ${isPost ? 'card-footer-post' : 'card-footer-pre'}`}>
        <span className={`realised-label ${isPost ? 'realised-label-post' : 'realised-label-pre'}`}>
          Realised Capital Gains
        </span>
        <span className={`realised-value ${gains.realisedCapitalGains >= 0 ? 'gain-positive' : 'gain-negative'}`}>
          {formatCurrency(gains.realisedCapitalGains)}
        </span>
      </div>

      {isPost && savings > 0 && (
        <div className="savings-banner">
          <Sparkles size={16} className="savings-icon" />
          <span>
            You&apos;re going to save{' '}
            <strong>{formatCurrency(savings)}</strong> in taxes!
          </span>
        </div>
      )}
    </div>
  );
}
