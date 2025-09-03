import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import context providers
import { UserProvider } from './context/UserContext';
import { AssetProvider } from './context/AssetContext';
import { AlertProvider } from './context/AlertContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={getDefaultConfig({
      appName: "AquaFind",
      projectId: "9f4bd472c01ba49282b42e5e1874c2af",
      chains: [mainnet, polygon, optimism, arbitrum, base],
    })}>
      <QueryClientProvider client={new QueryClient()}>
        <RainbowKitProvider>
          <UserProvider>
            <AssetProvider>
              <AlertProvider>
                <App />
              </AlertProvider>
            </AssetProvider>
          </UserProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
