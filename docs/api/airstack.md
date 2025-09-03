# Airstack API Documentation

## Overview

Airstack provides a unified GraphQL API for querying onchain data, significantly simplifying the process of aggregating liquidity information from fragmented markets. It's designed for this exact use case.

## Authentication

Airstack API requires an API key for authentication. The API key should be included in the `Authorization` header of all requests.

```javascript
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'YOUR_AIRSTACK_API_KEY'
};
```

## Base URL

```
https://api.airstack.xyz/gql
```

## Endpoints

### POST /graphql

This is the main endpoint for all GraphQL queries to the Airstack API.

#### Request

```javascript
const query = `
  query GetAssetPrices {
    TokenBalances(
      input: {
        filter: {
          tokenAddress: {
            _in: ["ETH"]
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

const response = await fetch('https://api.airstack.xyz/gql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'YOUR_AIRSTACK_API_KEY'
  },
  body: JSON.stringify({ query })
});
```

#### Response

```json
{
  "data": {
    "TokenBalances": {
      "TokenBalance": [
        {
          "tokenAddress": "0x...",
          "formattedAmount": 10.5,
          "token": {
            "name": "Ethereum",
            "symbol": "ETH",
            "decimals": 18
          }
        },
        // More token balances...
      ]
    }
  }
}
```

## Common Queries

### Get Asset Prices Across Multiple Exchanges

```graphql
query GetAssetPrices($symbol: String!) {
  TokenBalances(
    input: {
      filter: {
        tokenAddress: {
          _in: [$symbol]
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
    }
  }
}
```

### Check Asset Availability on a Specific Exchange

```graphql
query CheckAssetAvailability($symbol: String!, $exchange: String!) {
  TokenBalances(
    input: {
      filter: {
        tokenAddress: {
          _in: [$symbol]
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
```

## Error Handling

Airstack API returns standard HTTP status codes and error messages in the response body. Common error codes include:

- `400 Bad Request`: The request was malformed or missing required parameters.
- `401 Unauthorized`: The API key is invalid or missing.
- `403 Forbidden`: The API key does not have permission to access the requested resource.
- `429 Too Many Requests`: The API rate limit has been exceeded.
- `500 Internal Server Error`: An error occurred on the server.

## Rate Limits

Airstack API has rate limits based on the API key. The rate limits are not publicly documented, but you should handle rate limit errors gracefully.

## Implementation in AquaFind

In AquaFind, we use the Airstack API to fetch real-time price data for various crypto assets across different decentralized exchanges and protocols. The implementation can be found in the `src/services/airstack.js` file.

```javascript
// Example implementation
import axios from 'axios';

const AIRSTACK_API_URL = 'https://api.airstack.xyz/gql';
const AIRSTACK_API_KEY = import.meta.env.VITE_AIRSTACK_API_KEY;

const airstackClient = axios.create({
  baseURL: AIRSTACK_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': AIRSTACK_API_KEY
  }
});

export const fetchAssetPrices = async (assetSymbol) => {
  try {
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
          }
        }
      }
    `;

    const response = await airstackClient.post('', { query });
    
    // Process the response
    return response.data;
  } catch (error) {
    console.error('Error fetching asset prices from Airstack:', error);
    throw new Error('Failed to fetch asset prices. Please try again later.');
  }
};
```

## Resources

- [Airstack Documentation](https://docs.airstack.xyz/)
- [Airstack GraphQL Explorer](https://app.airstack.xyz/explorer)
- [Airstack API Status](https://status.airstack.xyz/)

