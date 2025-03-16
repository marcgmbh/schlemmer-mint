"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MintButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <div className="mint-container relative">
      <motion.button
        className="relative px-10 py-5 bg-primary text-white font-bold tracking-widest overflow-hidden text-lg uppercase"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTapStart={() => setIsPressed(true)}
        onTap={() => {
          setTimeout(() => setIsPressed(false), 200);
          alert('Mint functionality will be connected soon');
        }}
        onTapCancel={() => setIsPressed(false)}
        
        initial={{ boxShadow: "6px 6px 0 rgba(0, 0, 0, 0.8)" }}
        animate={{ 
          y: isPressed ? 6 : 0, 
          x: isPressed ? 6 : 0,
          boxShadow: isPressed 
            ? "0px 0px 0 rgba(0, 0, 0, 0.8)" 
            : isHovered 
              ? "3px 3px 0 rgba(0, 0, 0, 0.8)" 
              : "6px 6px 0 rgba(0, 0, 0, 0.8)"
        }}
        whileHover={{ backgroundColor: "#C62828" }}
        transition={{ duration: 0.1 }}
      >
        <span className="relative z-10">MINT YOUR BAUHAUS SIGNET</span>
        
        {/* Shine effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
        
        {/* Corner decorative element */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30"></div>
      </motion.button>
      
      {/* Info panel with staggered animation */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute left-0 right-0 mt-3 bg-black/80 backdrop-blur-sm border border-white/10 overflow-hidden z-20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-white mb-2">Own a piece of Bauhaus history</h3>
                <ul className="space-y-2">
                  {[
                    "Limited Edition NFT Collection",
                    "Supports the Schlemmer Archives",
                    "Certificate of Authenticity Included",
                    "True to Bauhaus Principles"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start text-gray-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <span className="block w-2 h-2 bg-primary mt-1.5 mr-2"></span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            {/* Geometric pattern background */}
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-5">
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-3">
                {Array(18).fill(0).map((_, i) => (
                  <div key={i} className="border border-white"></div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom accent line that animates in */}
      <motion.div 
        className="h-1 bg-white/10 mt-1"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </div>
  );
}
