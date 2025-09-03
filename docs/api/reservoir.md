# Reservoir API Documentation

## Overview

Reservoir is a key player for NFT liquidity aggregation. While the current focus of AquaFind is on fungible tokens, Reservoir API provides complementary data and will be crucial if the app expands to include NFTs.

## Authentication

Reservoir API requires an API key for authentication. The API key should be included in the `x-api-key` header of all requests.

```javascript
const headers = {
  'x-api-key': 'YOUR_RESERVOIR_API_KEY'
};
```

## Base URL

```
https://api.reservoir.tools
```

## Endpoints

### GET /orders

Fetch orders for a specific asset.

#### Parameters

- `contract` (required): The contract address of the asset.
- `tokenId` (optional): The token ID (for NFTs).

#### Request

```javascript
const response = await fetch('https://api.reservoir.tools/orders?contract=0x...', {
  headers: {
    'x-api-key': 'YOUR_RESERVOIR_API_KEY'
  }
});
```

#### Response

```json
{
  "orders": [
    {
      "id": "0x...",
      "price": 0.5,
      "source": "OpenSea",
      "validUntil": 1625097600,
      "token": {
        "tokenId": "123",
        "collection": {
          "name": "CryptoPunks"
        }
      }
    },
    // More orders...
  ]
}
```

### POST /execute

Execute a trade for a specific asset.

#### Parameters

- `orderId` (required): The ID of the order to execute.
- `walletAddress` (required): The wallet address of the user.

#### Request

```javascript
const response = await fetch('https://api.reservoir.tools/execute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_RESERVOIR_API_KEY'
  },
  body: JSON.stringify({
    orderId: '0x...',
    walletAddress: '0x...'
  })
});
```

#### Response

```json
{
  "id": "0x...",
  "status": "success",
  "transaction": {
    "hash": "0x...",
    "from": "0x...",
    "to": "0x...",
    "value": "0.5"
  }
}
```

## Error Handling

Reservoir API returns standard HTTP status codes and error messages in the response body. Common error codes include:

- `400 Bad Request`: The request was malformed or missing required parameters.
- `401 Unauthorized`: The API key is invalid or missing.
- `403 Forbidden`: The API key does not have permission to access the requested resource.
- `429 Too Many Requests`: The API rate limit has been exceeded.
- `500 Internal Server Error`: An error occurred on the server.

## Rate Limits

Reservoir API has rate limits based on the API key. The rate limits are not publicly documented, but you should handle rate limit errors gracefully.

## Implementation in AquaFind

In AquaFind, we use the Reservoir API to get real-time orderbook data, pricing, and potentially execute trades for NFTs. The implementation can be found in the `src/services/reservoir.js` file.

```javascript
// Example implementation
import axios from 'axios';

const RESERVOIR_API_URL = 'https://api.reservoir.tools';
const RESERVOIR_API_KEY = import.meta.env.VITE_RESERVOIR_API_KEY;

const reservoirClient = axios.create({
  baseURL: RESERVOIR_API_URL,
  headers: {
    'x-api-key': RESERVOIR_API_KEY
  }
});

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
```

## Resources

- [Reservoir Documentation](https://docs.reservoir.tools/)
- [Reservoir API Reference](https://docs.reservoir.tools/reference/overview)
- [Reservoir Status](https://status.reservoir.tools/)

