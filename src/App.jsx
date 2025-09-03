import React, { useState } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import PriceComparison from './components/PriceComparison';
import AlertsSection from './components/AlertsSection';
import TransactionCosts from './components/TransactionCosts';
import { usePaymentContext } from './hooks/usePaymentContext';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchResults, setSearchResults] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const { createSession } = usePaymentContext();

  const handleSearch = async (asset) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock price data
    const mockResults = {
      asset: asset.toUpperCase(),
      prices: [
        { exchange: 'Uniswap V3', price: 2341.25, volume: '1.2M', change: '+2.1%', available: true },
        { exchange: 'SushiSwap', price: 2339.80, volume: '850K', change: '+1.8%', available: true },
        { exchange: 'Curve', price: 2342.10, volume: '2.1M', change: '+2.3%', available: true },
        { exchange: 'Balancer', price: 2340.50, volume: '650K', change: '+1.9%', available: false },
        { exchange: '1inch', price: 2338.95, volume: '1.8M', change: '+1.7%', available: true },
      ]
    };
    
    setSearchResults(mockResults);
    setSelectedAsset(asset.toUpperCase());
  };

  const handlePriceComparisonPayment = async () => {
    try {
      await createSession();
      // Payment successful - unlock detailed view
      return true;
    } catch (error) {
      console.error('Payment failed:', error);
      return false;
    }
  };

  const handleAlertPayment = async () => {
    try {
      await createSession();
      // Payment successful - create alert
      return true;
    } catch (error) {
      console.error('Payment failed:', error);
      return false;
    }
  };

  const addAlert = async (alertData) => {
    const paid = await handleAlertPayment();
    if (paid) {
      const newAlert = {
        id: Date.now(),
        ...alertData,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      setAlerts(prev => [...prev, newAlert]);
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="min-h-screen backdrop-blur-sm bg-black/20">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 p-1 bg-white/10 rounded-lg backdrop-blur-sm">
            {[
              { id: 'discover', label: 'Price Discovery', icon: '🔍' },
              { id: 'alerts', label: 'Alerts', icon: '🔔' },
              { id: 'costs', label: 'Transaction Costs', icon: '💰' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'discover' && (
            <div className="space-y-8">
              <SearchSection onSearch={handleSearch} />
              {searchResults && (
                <PriceComparison 
                  results={searchResults}
                  onPayment={handlePriceComparisonPayment}
                />
              )}
            </div>
          )}

          {activeTab === 'alerts' && (
            <AlertsSection 
              alerts={alerts}
              onAddAlert={addAlert}
              setAlerts={setAlerts}
            />
          )}

          {activeTab === 'costs' && (
            <TransactionCosts selectedAsset={selectedAsset} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;