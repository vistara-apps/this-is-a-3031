# Stripe API Documentation

## Overview

Stripe is a standard and reliable way to process online payments, including small, frequent transactions required for the micro-transaction model in AquaFind. In AquaFind, we use Stripe to handle micro-transaction payments from users.

## Authentication

Stripe API requires an API key for authentication. There are two types of keys:

1. **Publishable key**: For client-side code, used to identify your account.
2. **Secret key**: For server-side code, used to authenticate API requests.

The API key should be included in the `Authorization` header of all requests.

```javascript
const headers = {
  'Authorization': 'Bearer YOUR_STRIPE_SECRET_KEY'
};
```

## Base URL

```
https://api.stripe.com/v1
```

## Endpoints

### POST /v1/payment_intents

Create a payment intent.

#### Request

```javascript
const response = await fetch('https://api.stripe.com/v1/payment_intents', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer YOUR_STRIPE_SECRET_KEY'
  },
  body: new URLSearchParams({
    amount: 1000, // $10.00
    currency: 'usd',
    payment_method_types: ['card']
  })
});
```

#### Response

```json
{
  "id": "pi_...",
  "object": "payment_intent",
  "amount": 1000,
  "amount_received": 0,
  "client_secret": "pi_..._secret_...",
  "currency": "usd",
  "status": "requires_payment_method"
}
```

### POST /v1/customers

Create a customer.

#### Request

```javascript
const response = await fetch('https://api.stripe.com/v1/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer YOUR_STRIPE_SECRET_KEY'
  },
  body: new URLSearchParams({
    email: 'customer@example.com',
    name: 'John Doe'
  })
});
```

#### Response

```json
{
  "id": "cus_...",
  "object": "customer",
  "email": "customer@example.com",
  "name": "John Doe"
}
```

## Error Handling

Stripe API returns standard HTTP status codes and error messages in the response body. Common error codes include:

- `400 Bad Request`: The request was malformed or missing required parameters.
- `401 Unauthorized`: The API key is invalid or missing.
- `402 Payment Required`: The payment failed.
- `404 Not Found`: The requested resource was not found.
- `429 Too Many Requests`: The API rate limit has been exceeded.
- `500 Internal Server Error`: An error occurred on the server.

## Implementation in AquaFind

In AquaFind, we use the Stripe API to handle micro-transaction payments from users. The implementation can be found in the `src/services/stripe.js` file.

**Note**: In a real application, Stripe API calls should be made from a backend server to keep your secret key secure. The following example is simplified for demonstration purposes.

```javascript
// Example implementation
import axios from 'axios';

const STRIPE_API_URL = 'https://api.stripe.com/v1';
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripeClient = axios.create({
  baseURL: STRIPE_API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${STRIPE_PUBLIC_KEY}`
  }
});

export const processMicroTransaction = async (customerId, amount, description) => {
  try {
    // In a real application, this would be a call to your backend server
    // which would then process the payment using the Stripe API
    
    // For now, return mock data
    return {
      id: 'mock_payment_id',
      amount,
      description,
      status: 'succeeded'
    };
  } catch (error) {
    console.error('Error processing micro-transaction:', error);
    throw new Error('Failed to process payment. Please try again later.');
  }
};
```

## Micro-transaction Model in AquaFind

In AquaFind, we use a micro-transaction model for monetization:

- **Price Comparisons**: $0.10 per comparison
- **Availability Alerts**: $0.50 per alert

We also offer alternative pricing models:

- **Subscription**: $5/month for unlimited comparisons
- **Freemium**: 5 free comparisons per day, then pay-per-use
- **Transaction-based fees**: Taker fee on trades executed via the platform (if that feature is added later)

## Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Status](https://status.stripe.com/)

