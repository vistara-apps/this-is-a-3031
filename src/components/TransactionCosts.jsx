import React, { useState, useEffect } from 'react';
import { Calculator, Zap, Clock } from 'lucide-react';

const TransactionCosts = ({ selectedAsset }) => {
  const [analysis, setAnalysis] = useState(null);
  const [amount, setAmount] = useState('1');

  useEffect(() => {
    if (selectedAsset) {
      // Simulate cost analysis
      const mockAnalysis = {
        asset: selectedAsset,
        amount: parseFloat(amount) || 1,
        scenarios: [
          {
            exchange: 'Uniswap V3',
            basePrice: 2341.25,
            networkFee: 15.50,
            slippage: 0.1,
            totalCost: 2356.85,
            timeEstimate: '2-3 minutes',
            gasPrice: 'High'
          },
          {
            exchange: 'SushiSwap',
            basePrice: 2339.80,
            networkFee: 12.30,
            slippage: 0.3,
            totalCost: 2352.40,
            timeEstimate: '3-5 minutes',
            gasPrice: 'Medium'
          },
          {
            exchange: 'Curve',
            basePrice: 2342.10,
            networkFee: 8.90,
            slippage: 0.05,
            totalCost: 2351.05,
            timeEstimate: '2-4 minutes',
            gasPrice: 'Low'
          }
        ]
      };
      setAnalysis(mockAnalysis);
    }
  }, [selectedAsset, amount]);

  if (!selectedAsset) {
    return (
      <div className="glass-effect rounded-xl p-8 text-center">
        <Calculator className="w-16 h-16 text-white/50 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Transaction Cost Analysis</h3>
        <p className="text-white/70">Search for an asset first to see detailed cost breakdown</p>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6">Transaction Cost Estimation</h3>
      
      <div className="mb-6">
        <label className="block text-white/70 text-sm mb-2">Amount to purchase</label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            className="w-32 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="text-white">{selectedAsset}</span>
        </div>
      </div>

      {analysis && (
        <div className="space-y-4">
          {analysis.scenarios.map((scenario, index) => (
            <div key={scenario.exchange} className="p-4 bg-white/5 rounded-lg border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{scenario.exchange}</h4>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    scenario.gasPrice === 'Low' ? 'bg-green-400' :
                    scenario.gasPrice === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                  <span className="text-sm text-white/70">{scenario.gasPrice} Gas</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-white/70">Base Price</div>
                  <div className="text-white font-medium">${scenario.basePrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-white/70">Network Fee</div>
                  <div className="text-white font-medium">${scenario.networkFee}</div>
                </div>
                <div>
                  <div className="text-white/70">Slippage</div>
                  <div className="text-white font-medium">{scenario.slippage}%</div>
                </div>
                <div>
                  <div className="text-white/70">Est. Time</div>
                  <div className="text-white font-medium flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{scenario.timeEstimate}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Total Cost ({analysis.amount} {selectedAsset})</span>
                  <span className="text-xl font-bold text-white">${(scenario.totalCost * analysis.amount).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <h4 className="font-semibold text-white">Optimization Tip</h4>
            </div>
            <p className="text-white/80 text-sm">
              {analysis.scenarios.find(s => s.gasPrice === 'Low')?.exchange} offers the lowest total cost 
              for this transaction, saving you up to ${(
                Math.max(...analysis.scenarios.map(s => s.totalCost)) - 
                Math.min(...analysis.scenarios.map(s => s.totalCost))
              ).toFixed(2)} compared to the most expensive option.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionCosts;