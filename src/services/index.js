// Export all services from a single file for easier imports

import airstackService from './airstack';
import reservoirService from './reservoir';
import alchemyService from './alchemy';
import supabaseService from './supabase';
import stripeService from './stripe';

// Asset Price Service
export const AssetPriceService = {
  // Get asset prices from Airstack
  getAssetPrices: async (assetSymbol) => {
    return airstackService.fetchAssetPrices(assetSymbol);
  },
  
  // Get NFT prices from Reservoir
  getNftPrices: async (assetSymbol) => {
    return reservoirService.getAssetPriceData(assetSymbol);
  },
  
  // Check if an asset is available on a specific exchange
  checkAssetAvailability: async (assetSymbol, exchangeName) => {
    return airstackService.checkAssetAvailability(assetSymbol, exchangeName);
  }
};

// Transaction Service
export const TransactionService = {
  // Estimate transaction cost
  estimateTransactionCost: async (assetSymbol, amount) => {
    return alchemyService.estimateTransactionCost(assetSymbol, amount);
  },
  
  // Get current gas prices
  getGasPrices: async () => {
    return alchemyService.getGasPrices();
  },
  
  // Execute a trade
  executeTrade: async (orderId, walletAddress) => {
    return reservoirService.executeTrade(orderId, walletAddress);
  }
};

// User Service
export const UserService = {
  // Get user by ID
  getUserById: async (userId) => {
    return supabaseService.getUserById(userId);
  },
  
  // Create or update user
  upsertUser: async (userData) => {
    return supabaseService.upsertUser(userData);
  },
  
  // Sign in with wallet
  signInWithWallet: async (walletAddress) => {
    return supabaseService.signInWithWallet(walletAddress);
  }
};

// Alert Service
export const AlertService = {
  // Get alerts for a user
  getUserAlerts: async (userId) => {
    return supabaseService.getUserAlerts(userId);
  },
  
  // Create a new alert
  createAlert: async (alertData) => {
    return supabaseService.createAlert(alertData);
  },
  
  // Update an alert
  updateAlert: async (alertId, alertData) => {
    return supabaseService.updateAlert(alertId, alertData);
  },
  
  // Delete an alert
  deleteAlert: async (alertId) => {
    return supabaseService.deleteAlert(alertId);
  }
};

// Payment Service
export const PaymentService = {
  // Process a micro-transaction payment
  processMicroTransaction: async (customerId, amount, description) => {
    return stripeService.processMicroTransaction(customerId, amount, description);
  },
  
  // Create a customer
  createCustomer: async (email, name) => {
    return stripeService.createCustomer(email, name);
  },
  
  // Create a subscription
  createSubscription: async (customerId, priceId) => {
    return stripeService.createSubscription(customerId, priceId);
  },
  
  // Get payment methods for a customer
  getPaymentMethods: async (customerId) => {
    return stripeService.getPaymentMethods(customerId);
  }
};

// Export individual services
export {
  airstackService,
  reservoirService,
  alchemyService,
  supabaseService,
  stripeService
};

