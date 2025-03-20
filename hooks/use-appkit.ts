"use client";

import { useState, useCallback } from 'react';
import { useAccount, useConnect } from 'wagmi';

type View = 'Connect' | 'Network';

// This is a minimal implementation to provide the open function expected by components
export function useAppKit() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  
  const open = useCallback(({ view }: { view: View }) => {
    console.log(`Opening modal with view: ${view}`);
    setIsOpen(true);
    
    if (view === 'Connect' && !isConnected) {
      // Try to find an injected connector (like MetaMask) and connect to it
      const injectedConnector = connectors.find(c => c.id === 'injected');
      
      if (injectedConnector) {
        // If we have an injected connector, try to connect to it
        try {
          connect({ connector: injectedConnector });
        } catch (error) {
          console.error('Failed to connect:', error);
          // Fallback to alert if connection fails
          window.alert('Please install MetaMask or another Ethereum wallet to connect.');
        }
      } else {
        // If no injected connector, show message
        window.alert('No wallet detected. Please install MetaMask or another Ethereum wallet.');
      }
    }
  }, [isConnected, connect, connectors]);
  
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  return { open, close, isOpen };
} 