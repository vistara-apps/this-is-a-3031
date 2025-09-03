import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { AlertService, PaymentService } from '../services';

// Create context
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const { user } = useUser();
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user alerts when user is loaded
  useEffect(() => {
    const fetchAlerts = async () => {
      if (!user) {
        setAlerts([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const userAlerts = await AlertService.getUserAlerts(user.id);
        setAlerts(userAlerts || []);
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setError('Failed to fetch alerts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [user]);

  // Create a new alert with payment
  const createAlert = async (alertData) => {
    if (!user) throw new Error('User not authenticated');

    setIsLoading(true);
    setError(null);

    try {
      // Process payment for alert creation
      const paymentResult = await PaymentService.processMicroTransaction(
        user.id,
        50, // $0.50 in cents
        `Alert for ${alertData.asset}`
      );

      if (paymentResult.status !== 'succeeded') {
        throw new Error('Payment failed');
      }

      // Create the alert
      const newAlert = await AlertService.createAlert({
        userId: user.id,
        ...alertData,
        createdAt: new Date().toISOString(),
        status: 'active'
      });

      setAlerts(prev => [...prev, newAlert]);
      return newAlert;
    } catch (err) {
      console.error('Error creating alert:', err);
      setError('Failed to create alert. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an alert
  const updateAlert = async (alertId, alertData) => {
    if (!user) throw new Error('User not authenticated');

    setIsLoading(true);
    setError(null);

    try {
      const updatedAlert = await AlertService.updateAlert(alertId, alertData);
      setAlerts(prev => prev.map(alert => 
        alert.alertId === alertId ? updatedAlert : alert
      ));
      return updatedAlert;
    } catch (err) {
      console.error('Error updating alert:', err);
      setError('Failed to update alert. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an alert
  const deleteAlert = async (alertId) => {
    if (!user) throw new Error('User not authenticated');

    setIsLoading(true);
    setError(null);

    try {
      await AlertService.deleteAlert(alertId);
      setAlerts(prev => prev.filter(alert => alert.alertId !== alertId));
    } catch (err) {
      console.error('Error deleting alert:', err);
      setError('Failed to delete alert. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle alert status (active/paused)
  const toggleAlertStatus = async (alertId) => {
    if (!user) throw new Error('User not authenticated');

    const alert = alerts.find(a => a.alertId === alertId);
    if (!alert) throw new Error('Alert not found');

    const newStatus = alert.status === 'active' ? 'paused' : 'active';
    
    return updateAlert(alertId, { status: newStatus });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts,
        isLoading,
        error,
        createAlert,
        updateAlert,
        deleteAlert,
        toggleAlertStatus
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook to use the alert context
export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

export default AlertContext;

