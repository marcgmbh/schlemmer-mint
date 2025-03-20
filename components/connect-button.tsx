"use client";

import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ChevronDown, LogOut } from 'lucide-react';
import { formatEthereumAddress } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppKit } from '@/hooks/use-appkit';

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  const handleConnectClick = async () => {
    try {
      open({ view: 'Connect' });
    } catch (error) {
      console.error('Error opening wallet modal:', error);
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
        <span className="mr-2">{address ? formatEthereumAddress(address) : 'Connected'}</span>
        <button onClick={() => disconnect()} className="text-xs text-gray-400">Disconnect</button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div className="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
      <button onClick={handleConnectClick}>Connect Wallet</button>
    </div>
  );
}; 