"use client";

import React from 'react';
import { useWallet } from './wallet-provider';
import { formatEthereumAddress } from '@/lib/utils';

export function WalletConnectButton() {
  const { openWalletModal, isWalletConnected, walletAddress } = useWallet();
  
  const handleClick = () => {
    console.log('Wallet connect button clicked');
    openWalletModal();
  };
  
  if (isWalletConnected && walletAddress) {
    return (
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
        <span className="mr-2">{formatEthereumAddress(walletAddress)}</span>
      </div>
    );
  }
  
  return (
    <button 
      onClick={handleClick}
      className="flex items-center px-4 py-2 bg-black border border-white/20 text-white hover:border-primary/60 transition-all"
    >
      <div className="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
      <span>Connect Wallet</span>
    </button>
  );
} 