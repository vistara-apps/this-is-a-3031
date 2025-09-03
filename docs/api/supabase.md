# Supabase API Documentation

## Overview

Supabase serves as a backend-as-a-service, providing database, authentication, and potentially real-time features for alerts. In AquaFind, we use Supabase to store user data, alert preferences, and potentially cache fetched price data.

## Authentication

Supabase requires an API key for authentication. There are two types of keys:

1. **anon key**: For public access, used in client-side code.
2. **service_role key**: For server-side access with full permissions.

The API key should be included in the `apikey` header of all requests.

```javascript
const headers = {
  'apikey': 'YOUR_SUPABASE_KEY',
  'Authorization': 'Bearer YOUR_SUPABASE_KEY'
};
```

## Base URL

```
https://YOUR_SUPABASE_URL.supabase.co
```

## Endpoints

### POST /rest/v1/{table}

Insert, update, or delete data in a table.

#### Request

```javascript
const response = await fetch('https://YOUR_SUPABASE_URL.supabase.co/rest/v1/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': 'YOUR_SUPABASE_KEY',
    'Authorization': 'Bearer YOUR_SUPABASE_KEY'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'John Doe'
  })
});
```

### GET /rest/v1/{table}

Fetch data from a table.

#### Request

```javascript
const response = await fetch('https://YOUR_SUPABASE_URL.supabase.co/rest/v1/users?select=*', {
  headers: {
    'apikey': 'YOUR_SUPABASE_KEY',
    'Authorization': 'Bearer YOUR_SUPABASE_KEY'
  }
});
```

### GET /realtime/v1

Subscribe to real-time changes in a table.

#### Request

```javascript
const socket = new WebSocket('wss://YOUR_SUPABASE_URL.supabase.co/realtime/v1');

socket.onopen = () => {
  socket.send(JSON.stringify({
    topic: 'realtime:public:users',
    event: 'phx_join',
    payload: {},
    ref: '1'
  }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};
```

## Database Schema

In AquaFind, we use the following database schema:

### Users Table

```sql
CREATE TABLE users (
  userId UUID PRIMARY KEY,
  email TEXT UNIQUE,
  paymentMethodId TEXT,
  alertPreferences JSONB
);
```

### Alerts Table

```sql
CREATE TABLE alerts (
  alertId UUID PRIMARY KEY,
  userId UUID REFERENCES users(userId),
  assetId TEXT,
  exchangeId TEXT,
  threshold NUMERIC,
  condition TEXT,
  status TEXT,
  createdAt TIMESTAMP
);
```

### Saved Searches Table

```sql
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(userId),
  assetId TEXT,
  createdAt TIMESTAMP
);
```

## Error Handling

Supabase API returns standard HTTP status codes and error messages in the response body. Common error codes include:

- `400 Bad Request`: The request was malformed or missing required parameters.
- `401 Unauthorized`: The API key is invalid or missing.
- `403 Forbidden`: The API key does not have permission to access the requested resource.
- `404 Not Found`: The requested resource was not found.
- `409 Conflict`: The request conflicts with the current state of the resource.
- `500 Internal Server Error`: An error occurred on the server.

## Implementation in AquaFind

In AquaFind, we use the Supabase JavaScript client to interact with the Supabase API. The implementation can be found in the `src/services/supabase.js` file.

```javascript
// Example implementation
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getUserById = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('userId', userId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user data. Please try again later.');
  }
};
```

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Status](https://status.supabase.com/)

