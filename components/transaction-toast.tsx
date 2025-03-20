"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ExternalLink, AlertCircle } from "lucide-react";

interface TransactionToastProps {
  showSuccess?: boolean;
  showError?: boolean;
  transactionHash?: `0x${string}` | null;
  errorMessage?: string;
}

export default function TransactionToast({
  showSuccess = false,
  showError = false,
  transactionHash,
  errorMessage
}: TransactionToastProps) {
  const [visible, setVisible] = useState(false);

  // Show toast when props change
  useEffect(() => {
    if (showSuccess || showError) {
      setVisible(true);
      
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccess, showError]);

  // Generate etherscan link
  const etherscanLink = transactionHash 
    ? `https://etherscan.io/tx/${transactionHash}` 
    : "";

  // Don't render if nothing to show
  if (!showSuccess && !showError) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 flex justify-center mb-4 px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="relative bg-black border border-white/10 shadow-lg rounded-md max-w-md w-full p-4">
            <button
              onClick={() => setVisible(false)}
              className="absolute top-3 right-3 text-white/60 hover:text-white"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {showSuccess ? (
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check size={16} className="text-green-500" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                    <AlertCircle size={16} className="text-red-500" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-medium text-sm">
                  {showSuccess ? "Transaction Successful" : "Transaction Failed"}
                </h3>
                
                <p className="text-white/70 text-xs mt-1">
                  {showSuccess
                    ? "Your NFT has been minted successfully."
                    : errorMessage || "There was an error processing your transaction."}
                </p>
                
                {showSuccess && transactionHash && (
                  <a
                    href={etherscanLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-2 text-xs text-primary hover:text-primary/80"
                  >
                    <span>View on Etherscan</span>
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 