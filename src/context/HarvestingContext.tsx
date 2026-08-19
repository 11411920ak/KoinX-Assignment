import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import type { Holding, CapitalGains, ComputedGains } from '../types';
import { fetchHoldings } from '../api/holdingsApi';
import { fetchCapitalGains } from '../api/capitalGainsApi';
import {
  computeGains,
  computeAfterHarvestingGains,
  sortHoldings,
} from '../utils/calculations';

// ─── State ───────────────────────────────────────────────────────────────────

interface State {
  holdings: Holding[];
  capitalGains: CapitalGains | null;
  selectedIds: Set<number>;
  loadingHoldings: boolean;
  loadingGains: boolean;
  error: string | null;
}

const initialState: State = {
  holdings: [],
  capitalGains: null,
  selectedIds: new Set(),
  loadingHoldings: true,
  loadingGains: true,
  error: null,
};

// ─── Actions ─────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_HOLDINGS'; payload: Holding[] }
  | { type: 'SET_CAPITAL_GAINS'; payload: CapitalGains }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'TOGGLE_HOLDING'; payload: number }
  | { type: 'SELECT_ALL' }
  | { type: 'DESELECT_ALL' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_HOLDINGS':
      return { ...state, holdings: action.payload, loadingHoldings: false };
    case 'SET_CAPITAL_GAINS':
      return { ...state, capitalGains: action.payload, loadingGains: false };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loadingHoldings: false,
        loadingGains: false,
      };
    case 'TOGGLE_HOLDING': {
      const next = new Set(state.selectedIds);
      if (next.has(action.payload)) {
        next.delete(action.payload);
      } else {
        next.add(action.payload);
      }
      return { ...state, selectedIds: next };
    }
    case 'SELECT_ALL': {
      const all = new Set(state.holdings.map((_, i) => i));
      return { ...state, selectedIds: all };
    }
    case 'DESELECT_ALL':
      return { ...state, selectedIds: new Set() };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ContextValue {
  state: State;
  sortedHoldings: Holding[];
  preGains: ComputedGains | null;
  afterGains: ComputedGains | null;
  savings: number;
  dispatch: React.Dispatch<Action>;
}

const HarvestingContext = createContext<ContextValue | null>(null);

export function HarvestingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchHoldings()
      .then((data) => dispatch({ type: 'SET_HOLDINGS', payload: data }))
      .catch(() => dispatch({ type: 'SET_ERROR', payload: 'Failed to load holdings.' }));

    fetchCapitalGains()
      .then((data) =>
        dispatch({ type: 'SET_CAPITAL_GAINS', payload: data.capitalGains })
      )
      .catch(() =>
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load capital gains.' })
      );
  }, []);

  const sortedHoldings = useMemo(() => sortHoldings(state.holdings), [state.holdings]);

  const preGains = useMemo(
    () => (state.capitalGains ? computeGains(state.capitalGains) : null),
    [state.capitalGains]
  );

  const afterGains = useMemo(() => {
    if (!state.capitalGains) return null;
    const selected = [...state.selectedIds].map((i) => state.holdings[i]);
    return computeAfterHarvestingGains(state.capitalGains, selected);
  }, [state.capitalGains, state.selectedIds, state.holdings]);

  const savings = useMemo(() => {
    if (!preGains || !afterGains) return 0;
    return preGains.realisedCapitalGains - afterGains.realisedCapitalGains;
  }, [preGains, afterGains]);

  return (
    <HarvestingContext.Provider
      value={{ state, sortedHoldings, preGains, afterGains, savings, dispatch }}
    >
      {children}
    </HarvestingContext.Provider>
  );
}

export function useHarvesting() {
  const ctx = useContext(HarvestingContext);
  if (!ctx) throw new Error('useHarvesting must be used inside HarvestingProvider');
  return ctx;
}
