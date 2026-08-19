import { useState } from 'react';
import { useHarvesting } from '../../context/HarvestingContext';
import HoldingRow from './HoldingRow';
import { ChevronDown, ChevronUp } from 'lucide-react';

const INITIAL_ROWS = 5;

export default function HoldingsTable() {
  const { state, sortedHoldings, dispatch } = useHarvesting();
  const { selectedIds, loadingHoldings } = state;
  const [showAll, setShowAll] = useState(false);

  const displayedHoldings = showAll
    ? sortedHoldings
    : sortedHoldings.slice(0, INITIAL_ROWS);

  const totalCount = sortedHoldings.length;
  const selectedCount = selectedIds.size;
  const allSelected = totalCount > 0 && selectedCount === totalCount;
  const someSelected = selectedCount > 0 && selectedCount < totalCount;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch({ type: 'SELECT_ALL' });
    } else {
      dispatch({ type: 'DESELECT_ALL' });
    }
  };

  if (loadingHoldings) {
    return (
      <div className="table-loader">
        <div className="spinner" />
        <span className="loader-text">Loading holdings…</span>
      </div>
    );
  }

  return (
    <section className="table-section">
      <div className="table-header-bar">
        <h2 className="table-section-title">Holdings</h2>
        {selectedCount > 0 && (
          <span className="selected-badge">
            {selectedCount} asset{selectedCount !== 1 ? 's' : ''} selected
          </span>
        )}
      </div>

      <div className="table-wrapper">
        <table className="holdings-table">
          <thead>
            <tr className="table-head-row">
              <th className="table-th table-th-checkbox">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                  className="row-checkbox"
                  id="select-all-checkbox"
                />
              </th>
              <th className="table-th">Asset</th>
              <th className="table-th">Holdings &amp; Avg Buy Price</th>
              <th className="table-th">Current Price</th>
              <th className="table-th">
                <div className="th-gain-header">
                  Short-Term Gain
                  <span className="th-gain-sub">Amount | Balance</span>
                </div>
              </th>
              <th className="table-th">
                <div className="th-gain-header">
                  Long-Term Gain
                  <span className="th-gain-sub">Amount | Balance</span>
                </div>
              </th>
              <th className="table-th">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {displayedHoldings.map((holding) => {
              // Find real index in state.holdings (not sortedHoldings) for consistent selection
              const realIndex = state.holdings.indexOf(holding);
              return (
                <HoldingRow
                  key={`${holding.coin}-${realIndex}`}
                  holding={holding}
                  index={realIndex}
                  isSelected={selectedIds.has(realIndex)}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {totalCount > INITIAL_ROWS && (
        <button
          className="view-all-btn"
          onClick={() => setShowAll((prev) => !prev)}
          id="view-all-toggle"
        >
          {showAll ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              View All {totalCount} Assets
            </>
          )}
        </button>
      )}
    </section>
  );
}
