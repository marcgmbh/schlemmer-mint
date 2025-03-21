"use client";

import { useState, useCallback, useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';

type View = 'Connect' | 'Network';

// This is a minimal implementation to provide the open function expected by components
export function useAppKit() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  
  // Log wallet connection status
  useEffect(() => {
    console.log('Wallet connection status:', isConnected ? 'Connected' : 'Not connected');
  }, [isConnected]);
  
  const open = useCallback(({ view }: { view: View }) => {
    console.log(`Opening modal with view: ${view}`);
    setIsOpen(true);
    
    if (view === 'Connect' && !isConnected) {
      // Dispatch a custom event to open the wallet dialog
      if (typeof window !== 'undefined') {
        console.log('Dispatching open-wallet-dialog event');
        
        // Create a custom event that can be bubbled and is cancelable
        const event = new CustomEvent('open-wallet-dialog', {
          bubbles: true,
          cancelable: true,
          detail: { timestamp: Date.now() }
        });
        
        window.dispatchEvent(event);
        
        // Fallback - try direct connection with injected wallet if available
        const injectedConnector = connectors.find(c => c.id === 'injected' && c.ready);
        if (injectedConnector) {
          console.log('Found ready injected connector:', injectedConnector.name);
          setTimeout(() => {
            try {
              connect({ connector: injectedConnector });
            } catch (error) {
              console.error('Failed to connect directly:', error);
            }
          }, 300);
        }
      }
    }
  }, [isConnected, connect, connectors]);
  
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  return { open, close, isOpen };
} 