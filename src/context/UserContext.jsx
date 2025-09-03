import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { UserService } from '../services';

// Create context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data when wallet is connected
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isConnected || !address) {
        setUser(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Sign in with wallet or create a new user
        const userData = await UserService.signInWithWallet(address);
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [address, isConnected]);

  // Update user data
  const updateUser = async (userData) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await UserService.upsertUser({
        ...user,
        ...userData
      });
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error('Error updating user data:', err);
      setError('Failed to update user data. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Add payment method
  const addPaymentMethod = async (paymentMethodId) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await UserService.upsertUser({
        ...user,
        paymentMethodId
      });
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error('Error adding payment method:', err);
      setError('Failed to add payment method. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update alert preferences
  const updateAlertPreferences = async (preferences) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await UserService.upsertUser({
        ...user,
        alertPreferences: {
          ...user.alertPreferences,
          ...preferences
        }
      });
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error('Error updating alert preferences:', err);
      setError('Failed to update alert preferences. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        error,
        updateUser,
        addPaymentMethod,
        updateAlertPreferences
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;

