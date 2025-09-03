// Data Models as specified in the PRD

// User Model
export interface User {
  userId: string;
  email: string;
  paymentMethodId?: string;
  alertPreferences?: Record<string, any>;
}

// Asset Model
export interface Asset {
  assetId: string;
  symbol: string;
  name: string;
  decimals: number;
}

// Exchange Model
export interface Exchange {
  exchangeId: string;
  name: string;
  apiUrl: string;
}

// Price Data Model
export interface PriceData {
  assetId: string;
  exchangeId: string;
  price: number;
  timestamp: number;
  orderType: 'buy' | 'sell';
  volume?: string;
  change?: string;
  available: boolean;
}

// Alert Model
export interface Alert {
  alertId: string;
  userId: string;
  assetId: string;
  exchangeId?: string;
  threshold?: number;
  condition: 'becomes_available' | 'price_above' | 'price_below';
  status: 'active' | 'paused' | 'triggered';
  createdAt: string;
}

// Search Result Model
export interface SearchResult {
  asset: string;
  prices: {
    exchange: string;
    price: number;
    volume: string;
    change: string;
    available: boolean;
  }[];
}

// Transaction Cost Model
export interface TransactionCost {
  exchange: string;
  basePrice: number;
  networkFee: number;
  slippage: number;
  totalCost: number;
  timeEstimate: string;
  gasPrice: 'Low' | 'Medium' | 'High';
}

// API Response Types
export interface AirstackResponse {
  data: {
    TokenBalances: {
      TokenBalance: {
        tokenAddress: string;
        formattedAmount: number;
        token: {
          name: string;
          symbol: string;
          decimals: number;
        }
      }[]
    }
  }
}

export interface ReservoirResponse {
  orders: {
    id: string;
    price: number;
    source: string;
    validUntil: number;
    token: {
      tokenId: string;
      collection: {
        name: string;
      }
    }
  }[]
}

export interface AlchemyResponse {
  result: {
    gasPrice: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
  }
}

// Payment Types
export interface PaymentSession {
  sessionId: string;
  amount: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

