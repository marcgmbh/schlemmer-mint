"use client";

import React, { useState, useEffect } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface WalletDialogProps {
  children?: React.ReactNode;
}

export function WalletDialog({ children }: WalletDialogProps) {
  const [open, setOpen] = useState(false);
  const { connectors, connect, isPending } = useConnect();
  const { isConnected } = useAccount();
  
  // Listen for custom event to open the dialog
  useEffect(() => {
    const handleOpenDialog = () => {
      if (!isConnected) {
        setOpen(true);
      }
    };
    
    window.addEventListener('open-wallet-dialog', handleOpenDialog);
    return () => window.removeEventListener('open-wallet-dialog', handleOpenDialog);
  }, [isConnected]);
  
  const handleConnect = async (connector: any) => {
    try {
      console.log('Connecting to wallet with connector:', connector.name);
      connect({ connector });
      // Close dialog after connecting
      setTimeout(() => setOpen(false), 500);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };
  
  // Don't open dialog if already connected
  const handleOpenChange = (isOpen: boolean) => {
    if (isConnected && isOpen) {
      return;
    }
    setOpen(isOpen);
  };
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="w-full">
          {children}
        </div>
      </DialogTrigger>
      
      <DialogContent className="bg-black/95 border border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white mb-6">Select Wallet</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => handleConnect(connector)}
              disabled={!connector.ready || isPending}
              className="px-6 py-4 bg-black border border-white/20 text-white hover:border-primary/60 hover:bg-black/50 transition-all flex items-center justify-between"
            >
              <span className="text-lg">{connector.name}</span>
              {!connector.ready && <span className="text-sm text-gray-500">(unsupported)</span>}
              {isPending && <span className="animate-spin">⏳</span>}
            </button>
          ))}
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          New to Ethereum wallets?
          <a 
            href="https://ethereum.org/en/wallets/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline ml-1"
          >
            Learn more
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
} 