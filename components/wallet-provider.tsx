"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { useAccount } from 'wagmi';
import { WalletModal } from './wallet-modal';

// Create a context for wallet connection management
type WalletContextType = {
  openWalletModal: () => void;
  closeWalletModal: () => void;
  isWalletConnected: boolean;
  walletAddress: string | undefined;
};

const WalletContext = createContext<WalletContextType>({
  openWalletModal: () => {},
  closeWalletModal: () => {},
  isWalletConnected: false,
  walletAddress: undefined,
});

// Custom hook to use the wallet context
export const useWallet = () => useContext(WalletContext);

// Provider component to wrap the application
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  
  // Close modal when connected
  useEffect(() => {
    if (isConnected && isModalOpen) {
      console.log('WalletProvider: User connected, closing modal');
      setIsModalOpen(false);
    }
  }, [isConnected, isModalOpen]);
  
  // Listen for custom events to open the modal
  useEffect(() => {
    const handleOpenModal = () => {
      console.log('open-wallet-dialog event received in WalletProvider');
      if (!isConnected) {
        setIsModalOpen(true);
      }
    };
    
    window.addEventListener('open-wallet-dialog', handleOpenModal);
    return () => window.removeEventListener('open-wallet-dialog', handleOpenModal);
  }, [isConnected]);
  
  // Functions to open and close the modal
  const openWalletModal = () => {
    console.log('Opening wallet modal from context');
    setIsModalOpen(true);
  };
  
  const closeWalletModal = () => {
    setIsModalOpen(false);
  };
  
  // Context value
  const contextValue = {
    openWalletModal,
    closeWalletModal,
    isWalletConnected: isConnected,
    walletAddress: address,
  };
  
  return (
    <WalletContext.Provider value={contextValue}>
      {children}
      <WalletModal 
        isOpen={isModalOpen} 
        onClose={closeWalletModal} 
      />
    </WalletContext.Provider>
  );
} 