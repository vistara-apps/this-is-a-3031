import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'YOUR_SUPABASE_KEY';

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * User Management
 */

/**
 * Get user by ID
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - User data
 */
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

/**
 * Create or update user
 * @param {Object} userData - The user data to create or update
 * @returns {Promise<Object>} - Created or updated user data
 */
export const upsertUser = async (userData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert(userData)
      .select();
    
    if (error) throw error;
    
    return data[0];
  } catch (error) {
    console.error('Error upserting user:', error);
    throw new Error('Failed to create or update user. Please try again later.');
  }
};

/**
 * Alert Management
 */

/**
 * Get alerts for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Array>} - User's alerts
 */
export const getUserAlerts = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('userId', userId);
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching user alerts:', error);
    throw new Error('Failed to fetch alerts. Please try again later.');
  }
};

/**
 * Create a new alert
 * @param {Object} alertData - The alert data to create
 * @returns {Promise<Object>} - Created alert data
 */
export const createAlert = async (alertData) => {
  try {
    const { data, error } = await supabase
      .from('alerts')
      .insert(alertData)
      .select();
    
    if (error) throw error;
    
    return data[0];
  } catch (error) {
    console.error('Error creating alert:', error);
    throw new Error('Failed to create alert. Please try again later.');
  }
};

/**
 * Update an alert
 * @param {string} alertId - The ID of the alert to update
 * @param {Object} alertData - The alert data to update
 * @returns {Promise<Object>} - Updated alert data
 */
export const updateAlert = async (alertId, alertData) => {
  try {
    const { data, error } = await supabase
      .from('alerts')
      .update(alertData)
      .eq('alertId', alertId)
      .select();
    
    if (error) throw error;
    
    return data[0];
  } catch (error) {
    console.error('Error updating alert:', error);
    throw new Error('Failed to update alert. Please try again later.');
  }
};

/**
 * Delete an alert
 * @param {string} alertId - The ID of the alert to delete
 * @returns {Promise<void>}
 */
export const deleteAlert = async (alertId) => {
  try {
    const { error } = await supabase
      .from('alerts')
      .delete()
      .eq('alertId', alertId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting alert:', error);
    throw new Error('Failed to delete alert. Please try again later.');
  }
};

/**
 * Saved Searches
 */

/**
 * Get saved searches for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Array>} - User's saved searches
 */
export const getUserSavedSearches = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('userId', userId);
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching saved searches:', error);
    throw new Error('Failed to fetch saved searches. Please try again later.');
  }
};

/**
 * Save a search
 * @param {Object} searchData - The search data to save
 * @returns {Promise<Object>} - Saved search data
 */
export const saveSearch = async (searchData) => {
  try {
    const { data, error } = await supabase
      .from('saved_searches')
      .insert(searchData)
      .select();
    
    if (error) throw error;
    
    return data[0];
  } catch (error) {
    console.error('Error saving search:', error);
    throw new Error('Failed to save search. Please try again later.');
  }
};

/**
 * Delete a saved search
 * @param {string} searchId - The ID of the saved search to delete
 * @returns {Promise<void>}
 */
export const deleteSavedSearch = async (searchId) => {
  try {
    const { error } = await supabase
      .from('saved_searches')
      .delete()
      .eq('id', searchId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting saved search:', error);
    throw new Error('Failed to delete saved search. Please try again later.');
  }
};

/**
 * Authentication
 */

/**
 * Sign in with wallet
 * @param {string} walletAddress - The wallet address to sign in with
 * @returns {Promise<Object>} - Session data
 */
export const signInWithWallet = async (walletAddress) => {
  try {
    // This is a placeholder implementation
    // In a real implementation, we would use Supabase Auth to sign in with a wallet
    
    // For now, return mock data
    return {
      user: {
        id: 'user_123',
        wallet_address: walletAddress
      },
      session: {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token'
      }
    };
  } catch (error) {
    console.error('Error signing in with wallet:', error);
    throw new Error('Failed to sign in with wallet. Please try again later.');
  }
};

export default {
  getUserById,
  upsertUser,
  getUserAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
  getUserSavedSearches,
  saveSearch,
  deleteSavedSearch,
  signInWithWallet
};

