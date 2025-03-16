"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MintButtonAlt() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [initialAnimation, setInitialAnimation] = useState(true);
  
  const MAX_NFTS = 1888;
  const CURRENT_MINTED = 562; // Example value - would be fetched from contract
  const REMAINING = MAX_NFTS - CURRENT_MINTED;
  
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
          onClick={() => alert('Mint functionality will be connected soon')}
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
                MINT YOUR BAUHAUS SIGNET
                <motion.div 
                  className="absolute -bottom-2 left-0 h-0.5 bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: isHovered ? '100%' : initialAnimation ? '100%' : '0%' }}
                  transition={{ duration: 0.7, delay: initialAnimation ? 0.8 : 0 }}
                />
              </motion.span>
            </div>
            
            {/* Clear remaining NFTs display */}
            <motion.div 
              className="flex items-center justify-center mt-2 p-2 bg-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center">
                <span className="text-white font-bold text-xl mr-2">{REMAINING}</span>
                <span className="text-white/70 text-lg mr-2">of</span>
                <span className="text-white font-bold text-xl mr-2">{MAX_NFTS}</span>
                <span className="text-white/70 text-base">NFTs Remaining</span>
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
          Commemorating 1888, Oskar Schlemmer's Birth Year
        </motion.div>
        
        <motion.div 
          className="w-full h-2 bg-white/10 overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-[#1E88E5] to-[#FDD835]"
            initial={{ width: 0 }}
            animate={{ width: `${(CURRENT_MINTED / MAX_NFTS) * 100}%` }}
            transition={{ duration: 1.8, delay: 1.6 }}
          />
        </motion.div>
      </div>
    </div>
  );
} 