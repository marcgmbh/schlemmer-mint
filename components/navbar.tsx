"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { WalletDialog } from './wallet-dialog';
import { useAccount } from 'wagmi';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-white text-lg font-medium">BAUHAUS SIGNET</span>
              <span className="ml-2 bg-primary px-1.5 py-0.5 text-xs font-bold text-white">NFT</span>
            </Link>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-white/80 hover:text-primary transition-colors">
              About
            </Link>
            <a 
              href="https://opensea.io/collection/bauhaus-signet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-primary transition-colors"
            >
              Collection
            </a>
          </nav>
          
          {/* Wallet connection - Desktop */}
          <div className="hidden md:block">
            <WalletDialog />
            
            {isConnected && address && (
              <div className="mt-2 text-xs text-white/60 text-right">
                {formatAddress(address)}
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block px-3 py-2 text-white hover:bg-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-white hover:bg-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <a 
              href="https://opensea.io/collection/bauhaus-signet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-3 py-2 text-white hover:bg-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collection
            </a>
            
            <div className="px-3 py-4">
              <WalletDialog />
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 