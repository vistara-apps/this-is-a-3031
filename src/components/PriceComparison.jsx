import React, { useState } from 'react';
import { ExternalLink, Lock, Unlock, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import { useAsset } from '../context/AssetContext';

const PriceComparison = ({ results, onPayment }) => {
  const [isPaid, setIsPaid] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  
  // Use the asset context for additional functionality
  const { isLoading } = useAsset();

  const handlePayment = async () => {
    setIsPaymentLoading(true);
    try {
      const success = await onPayment();
      if (success) {
        setIsPaid(true);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
    setIsPaymentLoading(false);
  };

  // If the component is in a loading state, show a loading indicator
  if (isLoading) {
    return (
      <div className="glass-effect rounded-xl p-6 text-center">
        <Loader2 className="w-12 h-12 text-white/50 mx-auto mb-4 animate-spin" />
        <h3 className="text-xl font-semibold text-white mb-2">Loading Price Data</h3>
        <p className="text-white/70">Fetching the latest prices across exchanges...</p>
      </div>
    );
  }

  const sortedPrices = [...results.prices].sort((a, b) => a.price - b.price);
  const bestPrice = sortedPrices[0];

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">
          {results.asset} Price Comparison
        </h3>
        {!isPaid && (
          <button
            onClick={handlePayment}
            disabled={isPaymentLoading}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Lock className="w-4 h-4" />
            <span>{isPaymentLoading ? 'Processing...' : 'Unlock Details ($0.10)'}</span>
          </button>
        )}
        {isPaid && (
          <div className="flex items-center space-x-2 text-green-400">
            <Unlock className="w-4 h-4" />
            <span>Details Unlocked</span>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {sortedPrices.map((price, index) => (
          <div
            key={price.exchange}
            className={`p-4 rounded-lg border ${
              price.exchange === bestPrice.exchange
                ? 'border-green-400 bg-green-500/10'
                : 'border-white/20 bg-white/5'
            } ${!price.available ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-white">{price.exchange}</span>
                  {price.exchange === bestPrice.exchange && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                      Best Price
                    </span>
                  )}
                  {!price.available && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                      Unavailable
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-xl font-bold text-white">
                    ${price.price.toLocaleString()}
                  </div>
                  {isPaid && (
                    <div className="text-sm text-white/70">
                      Vol: {price.volume}
                    </div>
                  )}
                </div>
                
                {isPaid && (
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 ${
                      price.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {price.change.startsWith('+') ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm">{price.change}</span>
                    </div>
                  </div>
                )}
                
                {price.available && (
                  <ExternalLink className="w-5 h-5 text-white/50 hover:text-white cursor-pointer" />
                )}
              </div>
            </div>
            
            {!isPaid && index === 0 && (
              <div className="mt-2 text-sm text-white/50">
                Unlock detailed analytics including volume, 24h change, and direct trade links
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isPaid && (
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
          <h4 className="font-semibold text-white mb-2">Market Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-white/70">Price Range:</span>
              <span className="text-white ml-2">
                ${Math.min(...results.prices.map(p => p.price)).toLocaleString()} - 
                ${Math.max(...results.prices.map(p => p.price)).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-white/70">Best Exchange:</span>
              <span className="text-white ml-2">{bestPrice.exchange}</span>
            </div>
            <div>
              <span className="text-white/70">Available Markets:</span>
              <span className="text-white ml-2">
                {results.prices.filter(p => p.available).length}/{results.prices.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceComparison;
