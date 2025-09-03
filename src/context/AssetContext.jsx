import React, { createContext, useContext, useState } from 'react';
import { AssetPriceService, TransactionService } from '../services';

// Create context
const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [transactionCosts, setTransactionCosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search for asset prices
  const searchAssetPrices = async (assetSymbol) => {
    if (!assetSymbol) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await AssetPriceService.getAssetPrices(assetSymbol);
      setSearchResults(results);
      setSelectedAsset(assetSymbol.toUpperCase());
      return results;
    } catch (err) {
      console.error('Error searching asset prices:', err);
      setError('Failed to fetch asset prices. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if an asset is available on a specific exchange
  const checkAssetAvailability = async (assetSymbol, exchangeName) => {
    if (!assetSymbol || !exchangeName) return false;

    setIsLoading(true);
    setError(null);

    try {
      const isAvailable = await AssetPriceService.checkAssetAvailability(assetSymbol, exchangeName);
      return isAvailable;
    } catch (err) {
      console.error('Error checking asset availability:', err);
      setError('Failed to check asset availability. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Estimate transaction costs
  const estimateTransactionCosts = async (assetSymbol, amount = 1) => {
    if (!assetSymbol) return;

    setIsLoading(true);
    setError(null);

    try {
      const costs = await TransactionService.estimateTransactionCost(assetSymbol, amount);
      setTransactionCosts(costs);
      return costs;
    } catch (err) {
      console.error('Error estimating transaction costs:', err);
      setError('Failed to estimate transaction costs. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear search results
  const clearSearchResults = () => {
    setSearchResults(null);
    setSelectedAsset(null);
    setTransactionCosts(null);
  };

  return (
    <AssetContext.Provider
      value={{
        searchResults,
        selectedAsset,
        transactionCosts,
        isLoading,
        error,
        searchAssetPrices,
        checkAssetAvailability,
        estimateTransactionCosts,
        clearSearchResults
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

// Custom hook to use the asset context
export const useAsset = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAsset must be used within an AssetProvider');
  }
  return context;
};

export default AssetContext;

