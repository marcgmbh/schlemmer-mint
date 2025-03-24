"use client";

import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatEther, parseEther } from 'viem';

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMint: (quantity: number) => void;
  maxPerTransaction?: number;
  price: string; // in ETH
}

export function MintModal({ 
  isOpen, 
  onClose, 
  onMint, 
  maxPerTransaction = 5,
  price = "0.0888" 
}: MintModalProps) {
  const [quantity, setQuantity] = useState(1);
  
  if (!isOpen) return null;
  
  const handleIncrement = () => {
    if (quantity < maxPerTransaction) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const totalPrice = parseFloat(price) * quantity;
  
  return (
    <>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <motion.div 
          className="bg-black border border-white/20 p-6 rounded"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-white">Mint Bauhaus Signet</h2>
            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="my-8">
            <p className="text-white/70 mb-4">Select how many NFTs you would like to mint:</p>
            
            <div className="flex items-center justify-between bg-white/5 p-4 rounded">
              <button 
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className={`p-2 rounded-full ${quantity <= 1 ? 'text-white/30' : 'text-white hover:bg-white/10'}`}
              >
                <Minus size={20} />
              </button>
              
              <span className="text-2xl font-bold text-white">{quantity}</span>
              
              <button 
                onClick={handleIncrement}
                disabled={quantity >= maxPerTransaction}
                className={`p-2 rounded-full ${quantity >= maxPerTransaction ? 'text-white/30' : 'text-white hover:bg-white/10'}`}
              >
                <Plus size={20} />
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-white/5 rounded">
              <div className="flex justify-between text-white/70 mb-2">
                <span>Price per NFT:</span>
                <span>{price} ETH</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg">
                <span>Total:</span>
                <span>{totalPrice.toFixed(4)} ETH</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Mint Now button clicked with quantity:', quantity);
              // Use a try-catch block to handle potential errors
              try {
                onMint(quantity);
              } catch (error) {
                console.error("Error calling onMint:", error);
              }
            }}
            className="w-full py-4 bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-colors rounded"
          >
            Mint Now
          </button>
          
          <p className="mt-4 text-center text-white/50 text-sm">
            Gas fees will be added to the transaction by your wallet
          </p>
        </motion.div>
      </div>
    </>
  );
} 