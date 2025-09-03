import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Droplets } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AquaFind</h1>
            <p className="text-sm text-white/70">Discover the best crypto prices</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6 text-sm text-white/80">
            <span>Price Comparisons: $0.10</span>
            <span>Alerts: $0.50</span>
          </div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;