# Alchemy API Documentation

## Overview

Alchemy provides robust node infrastructure which is useful for lower-level data verification or if specific exchange data isn't readily available via Airstack. In AquaFind, we use Alchemy for transaction simulation and checking asset contract details.

## Authentication

Alchemy API requires an API key for authentication. The API key should be included in the URL of all requests.

```
https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
```

## Base URL

```
https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
```

## Endpoints

### POST /

This is the main endpoint for all JSON-RPC requests to the Alchemy API.

#### Request

```javascript
const response = await fetch('https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_gasPrice',
    params: []
  })
});
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x4a817c800"
}
```

## Common Methods

### eth_gasPrice

Get the current gas price.

```javascript
const response = await alchemyClient.post('', {
  jsonrpc: '2.0',
  id: 1,
  method: 'eth_gasPrice',
  params: []
});

// Convert from wei to gwei
const gasPriceWei = parseInt(response.data.result, 16);
const gasPriceGwei = gasPriceWei / 1e9;
```

### alchemy_getTokenMetadata

Get metadata for a token.

```javascript
const response = await alchemyClient.post('', {
  jsonrpc: '2.0',
  id: 1,
  method: 'alchemy_getTokenMetadata',
  params: ['0x...'] // Contract address
});
```

### eth_estimateGas

Estimate the gas required for a transaction.

```javascript
const response = await alchemyClient.post('', {
  jsonrpc: '2.0',
  id: 1,
  method: 'eth_estimateGas',
  params: [{
    from: '0x...',
    to: '0x...',
    value: '0x...',
    data: '0x...'
  }]
});
```

## Error Handling

Alchemy API returns standard JSON-RPC error responses. Common error codes include:

- `-32700`: Parse error
- `-32600`: Invalid request
- `-32601`: Method not found
- `-32602`: Invalid params
- `-32603`: Internal error
- `-32000` to `-32099`: Server error

## Rate Limits

Alchemy API has rate limits based on the API key and subscription plan. The rate limits are documented in the Alchemy dashboard.

## Implementation in AquaFind

In AquaFind, we use the Alchemy API to interact with blockchain data, potentially for transaction simulation or checking asset contract details. The implementation can be found in the `src/services/alchemy.js` file.

```javascript
// Example implementation
import axios from 'axios';

const ALCHEMY_API_URL = 'https://eth-mainnet.g.alchemy.com';
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

const alchemyClient = axios.create({
  baseURL: `${ALCHEMY_API_URL}/v2/${ALCHEMY_API_KEY}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

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
```

## Resources

- [Alchemy Documentation](https://docs.alchemy.com/alchemy/)
- [Alchemy API Reference](https://docs.alchemy.com/reference/api-overview)
- [Alchemy Dashboard](https://dashboard.alchemy.com/)

