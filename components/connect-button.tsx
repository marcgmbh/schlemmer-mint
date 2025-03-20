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
        <Button 
          onClick={() => disconnect()}
          variant="outline" 
          size="sm"
          className="flex items-center justify-center text-sm gap-2 font-normal border-white/10 bg-black hover:bg-white/5"
        >
          <span className="text-white/90">{formatEthereumAddress(address)}</span>
          <LogOut className="h-3 w-3 text-white/50" />
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleConnectClick}
      variant="outline" 
      size="sm"
      className="flex items-center justify-center text-sm gap-2 font-normal border-white/10 bg-black hover:bg-white/5"
    >
      Connect
      <ChevronDown className="h-3 w-3 text-white/70" />
    </Button>
  );
}; 