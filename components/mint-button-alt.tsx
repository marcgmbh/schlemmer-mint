"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useMint } from '@/hooks/use-mint';
import { useAppKit } from '@/hooks/use-appkit';

export function MintButtonAlt() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [initialAnimation, setInitialAnimation] = useState(true);
  const [mintedCount, setMintedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const { isConnected } = useAccount();
  const { 
    handleMint,
    isMinting,
    isSaleActive
  } = useMint();
  
  const { open } = useAppKit();
  
  const MAX_NFTS = 1888; // Commemorating Schlemmer's birth year
  const REMAINING = MAX_NFTS - mintedCount;
  
  // Bauhaus primary colors
  const bauhausColors = {
    red: '#E53935',
    blue: '#1E88E5',
    yellow: '#FDD835',
  };
  
  useEffect(() => {
    // Turn off initial animation after it completes
    const timer = setTimeout(() => {
      setInitialAnimation(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Fetch the latest mint count from the contract or API
  useEffect(() => {
    async function fetchMintCount() {
      try {
        setIsLoading(true);
        // In a real implementation, you would fetch this from the contract or API
        // For demo purposes, we'll simulate a random progress between 100-400 minted NFTs
        // Remove this simulation and implement the actual API call in production
        const simulatedMintedCount = Math.floor(Math.random() * 300) + 100;
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMintedCount(simulatedMintedCount);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching mint count:", error);
        // Fallback to a default value if there's an error
        setMintedCount(188); // 10% minted as fallback
        setIsLoading(false);
      }
    }
    
    fetchMintCount();
  }, []);
  
  // Handle button click - either mint or prompt wallet connection
  const handleButtonClick = async () => {
    console.log('Button clicked!');
    if (isConnected) {
      handleMint();
    } else {
      // Open the AppKit modal to connect wallet
      try {
        console.log('Opening wallet connection modal');
        open({ view: 'Connect' });
        
        // Also dispatch the event directly as a backup
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('open-wallet-dialog'));
        }
      } catch (error) {
        console.error('Error opening wallet modal:', error);
        // Fallback if connection modal fails
        window.dispatchEvent(new Event('open-wallet-dialog'));
      }
    }
  };
  
  return (
    <div className="mint-container relative max-w-md mx-auto">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Bold frame */}
        <div className="absolute -inset-1.5 z-0">
          <div className="absolute top-0 left-0 w-8 h-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <div className="absolute top-0 left-0 h-full w-1 bg-primary"></div>
          </div>
          
          <div className="absolute top-0 right-0 w-8 h-8">
            <div className="absolute top-0 right-0 w-full h-1 bg-[#1E88E5]"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-[#1E88E5]"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-8 h-8">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FDD835]"></div>
            <div className="absolute bottom-0 left-0 w-1 h-full bg-[#FDD835]"></div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-8 h-8">
            <div className="absolute bottom-0 right-0 w-full h-1 bg-primary"></div>
            <div className="absolute bottom-0 right-0 w-1 h-full bg-primary"></div>
          </div>
        </div>
        
        {/* Prominent highlight */}
        <motion.div 
          className="absolute -inset-px rounded-sm bg-gradient-to-r from-primary/20 via-[#1E88E5]/20 to-[#FDD835]/20 z-0"
          animate={{
            opacity: isHovered ? 0.8 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Main button */}
        <button 
          className="relative px-8 py-6 bg-black text-white font-medium tracking-widest overflow-hidden text-xl uppercase z-10 w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onClick={handleButtonClick}
          disabled={isConnected && (isMinting || !isSaleActive)}
        >
          <motion.div 
            className="relative z-10 flex flex-col items-center justify-center"
            animate={{ y: isActive ? 2 : 0 }}
            transition={{ duration: 0.1 }}
          >
            {/* Prominent mint text */}
            <div className="flex items-center justify-center mb-4">
              <motion.span 
                className="text-white relative text-2xl"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {isConnected && isMinting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 mr-3 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
                    MINTING...
                  </span>
                ) : isConnected && !isSaleActive ? (
                  "SALE NOT ACTIVE"
                ) : (
                  "MINT YOUR BAUHAUS SIGNET"
                )}
                <motion.div 
                  className="absolute -bottom-2 left-0 h-0.5 bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: isHovered ? '100%' : initialAnimation ? '100%' : '0%' }}
                  transition={{ duration: 0.7, delay: initialAnimation ? 0.8 : 0 }}
                />
              </motion.span>
            </div>
            
            {/* Clear remaining NFTs display - now with loading state */}
            <motion.div 
              className="flex items-center justify-center mt-2 p-2 bg-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center">
                {isLoading ? (
                  <span className="text-white/70 text-base">Loading mint count...</span>
                ) : (
                  <>
                    <span className="text-white font-bold text-xl mr-2">{REMAINING.toLocaleString()}</span>
                    <span className="text-white/70 text-lg mr-2">of</span>
                    <span className="text-white font-bold text-xl mr-2">{MAX_NFTS.toLocaleString()}</span>
                    <span className="text-white/70 text-base">NFTs Remaining</span>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Animated background pattern */}
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] z-[1]"
            style={{
              backgroundSize: '30px 30px',
            }}
            animate={{
              backgroundPosition: initialAnimation || isHovered ? ['0px 0px', '30px 30px'] : '0px 0px',
            }}
            transition={{
              duration: 1,
              repeat: initialAnimation ? 0 : isHovered ? Infinity : 0,
              ease: "linear",
            }}
          />
        </button>
      </motion.div>
      
      {/* Enhanced progress bar with pulsing effect */}
      <div className="relative mt-3">
        <motion.div 
          className="text-center mb-1 text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Commemorating 1888, Oskar Schlemmer&apos;s Birth Year
        </motion.div>
        
        <motion.div 
          className="w-full h-2 bg-white/10 overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {isLoading ? (
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-[#1E88E5] to-[#FDD835]"
              initial={{ width: "20%" }}
              animate={{ 
                width: ["20%", "40%", "20%"],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ) : (
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-[#1E88E5] to-[#FDD835]"
              initial={{ width: 0 }}
              animate={{ width: `${(mintedCount / MAX_NFTS) * 100}%` }}
              transition={{ duration: 1.8, delay: 0.2 }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
} 