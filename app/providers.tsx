"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, goerli } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { injected, walletConnect, coinbaseWallet } from '@wagmi/connectors';

// Create a queryClient for React Query
const queryClient = new QueryClient();

// Get WalletConnect project ID from environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '01764473978d16b5211765f313689e59';

// Create Wagmi config with multiple chains for better compatibility
const config = createConfig({
  chains: [mainnet, sepolia, goerli],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [goerli.id]: http(),
  },
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({ 
      projectId,
      showQrModal: true,
      metadata: {
        name: 'Bauhaus Signet',
        description: 'Mint your own unique Bauhaus Signet NFT',
        url: 'https://bauhaus-signet.xyz',
        icons: ['https://bauhaus-signet.xyz/favicon.ico'],
      }
    }),
    coinbaseWallet({
      appName: 'Bauhaus Signet',
    }),
  ],
});

// Diagnostic log to ensure config is created properly
console.log('Wagmi config created with chains:', config.chains.map(c => c.name));

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
} 