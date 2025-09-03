import React, { useState } from 'react';
import { Plus, Bell, BellOff, Trash2, Loader2 } from 'lucide-react';
import { useAlerts } from '../context/AlertContext';

const AlertsSection = ({ alerts, onAddAlert }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    asset: '',
    exchange: '',
    threshold: '',
    condition: 'becomes_available'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use the alerts context for additional functionality
  const { toggleAlertStatus, deleteAlert: deleteAlertFromContext, isLoading } = useAlerts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await onAddAlert(formData);
      if (success) {
        setFormData({ asset: '', exchange: '', threshold: '', condition: 'becomes_available' });
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Error creating alert:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleAlert = async (id) => {
    try {
      await toggleAlertStatus(id);
    } catch (error) {
      console.error('Error toggling alert status:', error);
    }
  };

  const handleDeleteAlert = async (id) => {
    try {
      await deleteAlertFromContext(id);
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Asset Availability Alerts</h3>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Create Alert</span>
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white/5 rounded-lg border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Asset Symbol</label>
                <input
                  type="text"
                  value={formData.asset}
                  onChange={(e) => setFormData(prev => ({ ...prev, asset: e.target.value }))}
                  placeholder="e.g., ETH, DAI"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Exchange (Optional)</label>
                <input
                  type="text"
                  value={formData.exchange}
                  onChange={(e) => setFormData(prev => ({ ...prev, exchange: e.target.value }))}
                  placeholder="e.g., Uniswap, SushiSwap"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-2">Alert Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                disabled={isSubmitting}
              >
                <option value="becomes_available">Becomes Available</option>
                <option value="price_above">Price Above Threshold</option>
                <option value="price_below">Price Below Threshold</option>
              </select>
            </div>

            {formData.condition !== 'becomes_available' && (
              <div className="mb-4">
                <label className="block text-white/70 text-sm mb-2">Price Threshold ($)</label>
                <input
                  type="number"
                  value={formData.threshold}
                  onChange={(e) => setFormData(prev => ({ ...prev, threshold: e.target.value }))}
                  placeholder="e.g., 2500"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required={formData.condition !== 'becomes_available'}
                  disabled={isSubmitting}
                />
              </div>
            )}

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Create Alert ($0.50)</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="text-white/70 hover:text-white"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="text-center py-8 text-white/70">
            <Loader2 className="w-12 h-12 mx-auto mb-4 opacity-50 animate-spin" />
            <p>Loading alerts...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-white/70">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No alerts created yet. Create your first alert to get notified when assets become available.</p>
              </div>
            ) : (
              alerts.map(alert => (
                <div key={alert.alertId || alert.id} className="p-4 bg-white/5 rounded-lg border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleToggleAlert(alert.alertId || alert.id)}
                        className={`p-2 rounded-md ${
                          alert.status === 'active' 
                            ? 'text-green-400 hover:bg-green-400/10' 
                            : 'text-gray-400 hover:bg-gray-400/10'
                        }`}
                      >
                        {alert.status === 'active' ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                      </button>
                      <div>
                        <div className="text-white font-semibold">
                          {alert.asset} {alert.exchange && `on ${alert.exchange}`}
                        </div>
                        <div className="text-white/70 text-sm">
                          {alert.condition === 'becomes_available' 
                            ? 'Notify when available'
                            : `Notify when price ${alert.condition.replace('_', ' ')} $${alert.threshold}`
                          }
                        </div>
                        <div className="text-white/50 text-xs">
                          Created: {new Date(alert.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        alert.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {alert.status}
                      </span>
                      <button
                        onClick={() => handleDeleteAlert(alert.alertId || alert.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsSection;
