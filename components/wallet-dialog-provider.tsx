"use client";

import React, { useState, useEffect } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';

export function WalletDialogProvider() {
  const [open, setOpen] = useState(false);
  const { connectors, connect, isPending, error: connectError } = useConnect();
  const { isConnected } = useAccount();
  
  // Log connectors for debugging
  useEffect(() => {
    console.log('Available connectors:', connectors);
    connectors.forEach(connector => {
      console.log(`Connector: ${connector.name}, Ready: ${connector.ready}, ID: ${connector.id}`);
    });
    
    if (connectError) {
      console.error('Connection error:', connectError);
    }
  }, [connectors, connectError]);
  
  // Listen for custom events to open the dialog
  useEffect(() => {
    const handleOpenDialog = () => {
      if (!isConnected) {
        console.log('Opening wallet dialog');
        setOpen(true);
      }
    };
    
    window.addEventListener('open-wallet-dialog', handleOpenDialog);
    return () => window.removeEventListener('open-wallet-dialog', handleOpenDialog);
  }, [isConnected]);
  
  const handleConnect = async (connector: any) => {
    try {
      console.log('Attempting to connect with connector:', connector.name, connector);
      
      // Force connector to be ready (workaround for some deployment environments)
      const connectorToUse = {...connector, ready: true};
      
      connect({ connector: connectorToUse });
      console.log('Connection request sent');
      
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
      <DialogContent className="bg-black/95 border border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white mb-6">Select Wallet</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => handleConnect(connector)}
              // Remove the disabled state to allow clicking even if not "ready"
              // disabled={!connector.ready || isPending}
              className="px-6 py-4 bg-black border border-white/20 text-white hover:border-primary/60 hover:bg-black/50 transition-all flex items-center justify-between"
            >
              <span className="text-lg">{connector.name}</span>
              {!connector.ready && <span className="text-sm text-gray-500">(click to try anyway)</span>}
              {isPending && <span className="animate-spin">⏳</span>}
            </button>
          ))}
        </div>
        
        {connectError && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 text-sm text-red-200">
            Error: {connectError.message || 'Failed to connect wallet'}
          </div>
        )}
        
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