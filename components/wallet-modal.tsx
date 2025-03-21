"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { X } from 'lucide-react';

export function WalletModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { connectors, connect, isPending, error: connectError } = useConnect();
  const { isConnected } = useAccount();
  const prevConnectedRef = useRef(isConnected);

  // Enhanced connection state tracking
  useEffect(() => {
    console.log('Connection state changed:', { wasConnected: prevConnectedRef.current, isNowConnected: isConnected });
    
    // Only close if we've just connected (transition from disconnected to connected)
    if (!prevConnectedRef.current && isConnected && isOpen) {
      console.log('Wallet just connected, closing modal');
      // Force close with a small delay to ensure UI updates
      setTimeout(() => {
        console.log('Executing delayed close');
        onClose();
      }, 500);
    }
    
    // Update ref for next render
    prevConnectedRef.current = isConnected;
  }, [isConnected, onClose, isOpen]);

  // Backup forced close - if modal is open and user is connected, close it
  useEffect(() => {
    if (isConnected && isOpen) {
      const timer = setTimeout(() => {
        console.log('Backup close triggered: user is connected but modal still open');
        onClose();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isConnected, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="bg-black/95 border border-white/20 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-white">Select Wallet</h2>
            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid gap-4 my-6">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => {
                  console.log('Connecting with:', connector.name);
                  connect({ connector });
                }}
                className="px-6 py-4 bg-black border border-white/20 text-white hover:border-primary/60 hover:bg-black/50 transition-all flex items-center justify-between"
              >
                <span className="text-lg">{connector.name}</span>
                {isPending && <span className="animate-spin">⏳</span>}
              </button>
            ))}
          </div>
          
          {connectError && (
            <div className="my-4 p-3 bg-red-900/30 border border-red-500/50 text-sm text-red-200">
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
        </div>
      </div>
    </>
  );
} 