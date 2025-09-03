import axios from 'axios';

// Reservoir API service for NFT liquidity aggregation
const RESERVOIR_API_URL = 'https://api.reservoir.tools';
const RESERVOIR_API_KEY = import.meta.env.VITE_RESERVOIR_API_KEY || 'YOUR_RESERVOIR_API_KEY';

// Create axios instance with Reservoir API configuration
const reservoirClient = axios.create({
  baseURL: RESERVOIR_API_URL,
  headers: {
    'x-api-key': RESERVOIR_API_KEY
  }
});

/**
 * Fetch orders for a specific asset
 * @param {string} assetAddress - The contract address of the asset
 * @param {string} tokenId - The token ID (for NFTs)
 * @returns {Promise<Object>} - Order data
 */
export const fetchOrders = async (assetAddress, tokenId = null) => {
  try {
    const params = {
      contract: assetAddress
    };
    
    if (tokenId) {
      params.tokenId = tokenId;
    }
    
    const response = await reservoirClient.get('/orders', { params });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching orders from Reservoir:', error);
    throw new Error('Failed to fetch orders. Please try again later.');
  }
};

/**
 * Execute a trade for a specific asset
 * @param {string} orderId - The ID of the order to execute
 * @param {string} walletAddress - The wallet address of the user
 * @returns {Promise<Object>} - Trade execution data
 */
export const executeTrade = async (orderId, walletAddress) => {
  try {
    const response = await reservoirClient.post('/execute', {
      orderId,
      walletAddress
    });
    
    return response.data;
  } catch (error) {
    console.error('Error executing trade with Reservoir:', error);
    throw new Error('Failed to execute trade. Please try again later.');
  }
};

/**
 * Get price data for a specific asset
 * @param {string} assetSymbol - The symbol of the asset
 * @returns {Promise<Object>} - Price data
 */
export const getAssetPriceData = async (assetSymbol) => {
  try {
    // This is a placeholder implementation
    // In a real implementation, we would fetch the actual price data from Reservoir
    
    // For now, return mock data that matches our application's structure
    return {
      asset: assetSymbol,
      prices: [
        { exchange: 'OpenSea', price: 0.5, volume: '120K', change: '+5.2%', available: true },
        { exchange: 'LooksRare', price: 0.48, volume: '85K', change: '+4.8%', available: true },
        { exchange: 'X2Y2', price: 0.51, volume: '65K', change: '+6.3%', available: true },
      ]
    };
  } catch (error) {
    console.error('Error getting asset price data from Reservoir:', error);
    throw new Error('Failed to get asset price data. Please try again later.');
  }
};

export default {
  fetchOrders,
  executeTrade,
  getAssetPriceData
};

