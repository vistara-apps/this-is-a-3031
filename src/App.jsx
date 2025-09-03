import React, { useState } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import PriceComparison from './components/PriceComparison';
import AlertsSection from './components/AlertsSection';
import TransactionCosts from './components/TransactionCosts';
import { usePaymentContext } from './hooks/usePaymentContext';

// Import context hooks
import { useAsset } from './context/AssetContext';
import { useAlerts } from './context/AlertContext';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const { createSession } = usePaymentContext();
  
  // Use context hooks instead of local state
  const { 
    searchResults, 
    selectedAsset, 
    searchAssetPrices,
    estimateTransactionCosts 
  } = useAsset();
  
  const { 
    alerts, 
    createAlert 
  } = useAlerts();

  const handleSearch = async (asset) => {
    try {
      await searchAssetPrices(asset);
    } catch (error) {
      console.error('Search failed:', error);
    }
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
    try {
      const paid = await handleAlertPayment();
      if (paid) {
        await createAlert(alertData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to add alert:', error);
      return false;
    }
  };

  // Handle transaction cost estimation
  const handleTransactionCostEstimation = async (amount) => {
    if (selectedAsset) {
      try {
        await estimateTransactionCosts(selectedAsset, amount);
      } catch (error) {
        console.error('Failed to estimate transaction costs:', error);
      }
    }
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
            />
          )}

          {activeTab === 'costs' && (
            <TransactionCosts 
              selectedAsset={selectedAsset} 
              onEstimate={handleTransactionCostEstimation}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
