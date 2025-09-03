import axios from 'axios';

// Alchemy API service for blockchain data and transaction simulation
const ALCHEMY_API_URL = 'https://eth-mainnet.g.alchemy.com';
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY || 'YOUR_ALCHEMY_API_KEY';

// Create axios instance with Alchemy API configuration
const alchemyClient = axios.create({
  baseURL: `${ALCHEMY_API_URL}/v2/${ALCHEMY_API_KEY}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Get current gas prices
 * @returns {Promise<Object>} - Current gas prices
 */
export const getGasPrices = async () => {
  try {
    const response = await alchemyClient.post('', {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_gasPrice',
      params: []
    });
    
    // Convert from wei to gwei
    const gasPriceWei = parseInt(response.data.result, 16);
    const gasPriceGwei = gasPriceWei / 1e9;
    
    return {
      gasPrice: gasPriceGwei,
      low: gasPriceGwei * 0.8,
      medium: gasPriceGwei,
      high: gasPriceGwei * 1.2
    };
  } catch (error) {
    console.error('Error fetching gas prices from Alchemy:', error);
    throw new Error('Failed to fetch gas prices. Please try again later.');
  }
};

/**
 * Estimate transaction cost
 * @param {string} assetSymbol - The symbol of the asset
 * @param {number} amount - The amount of the asset
 * @returns {Promise<Object>} - Transaction cost estimation
 */
export const estimateTransactionCost = async (assetSymbol, amount = 1) => {
  try {
    // Get current gas prices
    const gasPrices = await getGasPrices();
    
    // This is a placeholder implementation
    // In a real implementation, we would calculate the actual transaction cost
    // based on the gas prices and the specific transaction details
    
    // For now, return mock data that matches our application's structure
    return {
      asset: assetSymbol,
      amount: parseFloat(amount),
      scenarios: [
        {
          exchange: 'Uniswap V3',
          basePrice: 2341.25,
          networkFee: 15.50,
          slippage: 0.1,
          totalCost: 2356.85,
          timeEstimate: '2-3 minutes',
          gasPrice: 'High'
        },
        {
          exchange: 'SushiSwap',
          basePrice: 2339.80,
          networkFee: 12.30,
          slippage: 0.3,
          totalCost: 2352.40,
          timeEstimate: '3-5 minutes',
          gasPrice: 'Medium'
        },
        {
          exchange: 'Curve',
          basePrice: 2342.10,
          networkFee: 8.90,
          slippage: 0.05,
          totalCost: 2351.05,
          timeEstimate: '2-4 minutes',
          gasPrice: 'Low'
        }
      ]
    };
  } catch (error) {
    console.error('Error estimating transaction cost:', error);
    throw new Error('Failed to estimate transaction cost. Please try again later.');
  }
};

/**
 * Get asset contract details
 * @param {string} contractAddress - The contract address of the asset
 * @returns {Promise<Object>} - Asset contract details
 */
export const getAssetContractDetails = async (contractAddress) => {
  try {
    const response = await alchemyClient.post('', {
      jsonrpc: '2.0',
      id: 1,
      method: 'alchemy_getTokenMetadata',
      params: [contractAddress]
    });
    
    return response.data.result;
  } catch (error) {
    console.error('Error fetching asset contract details from Alchemy:', error);
    throw new Error('Failed to fetch asset contract details. Please try again later.');
  }
};

export default {
  getGasPrices,
  estimateTransactionCost,
  getAssetContractDetails
};

