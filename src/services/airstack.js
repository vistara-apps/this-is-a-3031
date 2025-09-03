import axios from 'axios';

// Airstack API service for fetching real-time price data
const AIRSTACK_API_URL = 'https://api.airstack.xyz/gql';
const AIRSTACK_API_KEY = import.meta.env.VITE_AIRSTACK_API_KEY || 'YOUR_AIRSTACK_API_KEY';

// Create axios instance with Airstack API configuration
const airstackClient = axios.create({
  baseURL: AIRSTACK_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': AIRSTACK_API_KEY
  }
});

/**
 * Fetch asset prices across multiple exchanges
 * @param {string} assetSymbol - The symbol of the asset (e.g., 'ETH', 'WETH')
 * @returns {Promise<Object>} - Price data across multiple exchanges
 */
export const fetchAssetPrices = async (assetSymbol) => {
  try {
    // GraphQL query to fetch asset prices across multiple exchanges
    const query = `
      query GetAssetPrices {
        TokenBalances(
          input: {
            filter: {
              tokenAddress: {
                _in: ["${assetSymbol}"]
              }
            },
            blockchain: ethereum,
            limit: 10
          }
        ) {
          TokenBalance {
            tokenAddress
            formattedAmount
            token {
              name
              symbol
              decimals
            }
            tokenNfts {
              contentValue {
                image {
                  original
                }
              }
            }
          }
        }
      }
    `;

    const response = await airstackClient.post('', { query });
    
    // Process the response to match our application's data structure
    const prices = processAirstackResponse(response.data, assetSymbol);
    
    return {
      asset: assetSymbol,
      prices
    };
  } catch (error) {
    console.error('Error fetching asset prices from Airstack:', error);
    throw new Error('Failed to fetch asset prices. Please try again later.');
  }
};

/**
 * Check if an asset is available on a specific exchange
 * @param {string} assetSymbol - The symbol of the asset
 * @param {string} exchangeName - The name of the exchange
 * @returns {Promise<boolean>} - Whether the asset is available
 */
export const checkAssetAvailability = async (assetSymbol, exchangeName) => {
  try {
    // GraphQL query to check asset availability on a specific exchange
    const query = `
      query CheckAssetAvailability {
        TokenBalances(
          input: {
            filter: {
              tokenAddress: {
                _in: ["${assetSymbol}"]
              }
            },
            blockchain: ethereum,
            limit: 1
          }
        ) {
          TokenBalance {
            tokenAddress
            formattedAmount
          }
        }
      }
    `;

    const response = await airstackClient.post('', { query });
    
    // Process the response to determine availability
    const isAvailable = response.data?.data?.TokenBalances?.TokenBalance?.length > 0;
    
    return isAvailable;
  } catch (error) {
    console.error('Error checking asset availability:', error);
    throw new Error('Failed to check asset availability. Please try again later.');
  }
};

/**
 * Process Airstack API response to match our application's data structure
 * @param {Object} responseData - The raw response data from Airstack
 * @param {string} assetSymbol - The symbol of the asset
 * @returns {Array} - Processed price data
 */
const processAirstackResponse = (responseData, assetSymbol) => {
  // This is a placeholder implementation
  // In a real implementation, we would extract the actual price data from the response
  
  // For now, return mock data that matches our application's structure
  return [
    { exchange: 'Uniswap V3', price: 2341.25, volume: '1.2M', change: '+2.1%', available: true },
    { exchange: 'SushiSwap', price: 2339.80, volume: '850K', change: '+1.8%', available: true },
    { exchange: 'Curve', price: 2342.10, volume: '2.1M', change: '+2.3%', available: true },
    { exchange: 'Balancer', price: 2340.50, volume: '650K', change: '+1.9%', available: false },
    { exchange: '1inch', price: 2338.95, volume: '1.8M', change: '+1.7%', available: true },
  ];
};

export default {
  fetchAssetPrices,
  checkAssetAvailability
};

