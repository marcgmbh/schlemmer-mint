import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'viem/chains';
import { injected, walletConnect } from '@wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('WalletConnect project ID is required');
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
}); 