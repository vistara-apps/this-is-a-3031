import React, { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { useAsset } from '../context/AssetContext';

const SearchSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the asset context for loading state
  const { isLoading } = useAsset();

  const popularAssets = ['ETH', 'WETH', 'USDC', 'DAI', 'WBTC', 'UNI'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim() || isLoading) return;
    
    try {
      await onSearch(searchTerm);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handlePopularAssetClick = async (asset) => {
    if (isLoading) return;
    
    setSearchTerm(asset);
    try {
      await onSearch(asset);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="glass-effect rounded-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Find the Best Crypto Prices
        </h2>
        <p className="text-white/70">
          Compare prices across all major exchanges instantly
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter asset symbol (e.g., ETH, WETH)"
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-white/70 text-sm mb-4">Popular assets:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {popularAssets.map(asset => (
            <button
              key={asset}
              onClick={() => handlePopularAssetClick(asset)}
              disabled={isLoading}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white rounded-full text-sm transition-colors duration-200 flex items-center space-x-1"
            >
              <TrendingUp className="w-3 h-3" />
              <span>{asset}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
