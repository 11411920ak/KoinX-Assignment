import type { Holding } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/calculations';
import { useHarvesting } from '../../context/HarvestingContext';

interface Props {
  holding: Holding;
  index: number;
  isSelected: boolean;
}

function GainCell({ gain, balance }: { gain: number; balance: number }) {
  const isNegative = gain < 0;
  const isNearZero = Math.abs(gain) < 1e-8;
  const colorClass = isNearZero
    ? 'gain-neutral'
    : isNegative
    ? 'cell-gain-negative'
    : 'cell-gain-positive';

  return (
    <div className="gain-cell">
      <span className={`gain-cell-amount ${colorClass}`}>
        {isNearZero ? '—' : formatCurrency(gain)}
      </span>
      <span className="gain-cell-balance">{formatNumber(balance)}</span>
    </div>
  );
}

export default function HoldingRow({ holding, index, isSelected }: Props) {
  const { dispatch } = useHarvesting();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_HOLDING', payload: index });
  };

  return (
    <tr
      className={`holding-row ${isSelected ? 'holding-row-selected' : ''}`}
      onClick={handleToggle}
    >
      {/* Checkbox */}
      <td className="table-cell table-cell-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleToggle}
          onClick={(e) => e.stopPropagation()}
          className="row-checkbox"
          id={`holding-checkbox-${index}`}
        />
      </td>

      {/* Asset */}
      <td className="table-cell">
        <div className="asset-cell">
          <img
            src={holding.logo}
            alt={holding.coin}
            className="asset-logo"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg';
            }}
          />
          <div className="asset-info">
            <span className="asset-coin">{holding.coin}</span>
            <span className="asset-name">{holding.coinName}</span>
          </div>
        </div>
      </td>

      {/* Holdings & Avg Buy Price */}
      <td className="table-cell">
        <div className="holdings-cell">
          <span className="holdings-amount">{formatNumber(holding.totalHolding)}</span>
          <span className="holdings-avg">
            Avg: {formatCurrency(holding.averageBuyPrice)}
          </span>
        </div>
      </td>

      {/* Current Price */}
      <td className="table-cell">
        <span className="current-price">{formatCurrency(holding.currentPrice)}</span>
      </td>

      {/* Short-Term Gain */}
      <td className="table-cell">
        <GainCell gain={holding.stcg.gain} balance={holding.stcg.balance} />
      </td>

      {/* Long-Term Gain */}
      <td className="table-cell">
        <GainCell gain={holding.ltcg.gain} balance={holding.ltcg.balance} />
      </td>

      {/* Amount to Sell */}
      <td className="table-cell">
        {isSelected ? (
          <span className="amount-to-sell">{formatNumber(holding.totalHolding)}</span>
        ) : (
          <span className="amount-to-sell-empty">—</span>
        )}
      </td>
    </tr>
  );
}
