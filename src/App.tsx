import { HarvestingProvider } from './context/HarvestingContext';
import Header from './components/Header/Header';
import GainsSection from './components/GainsSection/GainsSection';
import HoldingsTable from './components/HoldingsTable/HoldingsTable';

export default function App() {
  return (
    <HarvestingProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <GainsSection />
          <HoldingsTable />
        </main>
      </div>
    </HarvestingProvider>
  );
}
