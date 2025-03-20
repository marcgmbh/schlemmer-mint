"use client";

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from 'framer-motion';
import Footer from "./footer";
import HeroTitle from "./hero-title";
import { SignetExplanation } from "./signet-explanation";
import FAQSection from "./faq-section";
import SocialLinks from "./social-links";
import { MintButtonAlt } from "./mint-button-alt";
import { BauhausSignet } from "./bauhaus-signet";
import HeroDescription from "./hero-description";
import SchlemmerQuote from "./schlemmer-quote";
import BauhausGenerator from "./bauhaus-generator";
import { useAccount } from 'wagmi';

export default function ClientHome() {
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isConnected } = useAccount();
  
  // Define refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const mintRef = useRef<HTMLDivElement>(null);
  
  // Bauhaus primary colors
  const bauhausColors = {
    red: '#E53935',   // primary
    blue: '#1E88E5',
    yellow: '#FDD835',
  };

  useEffect(() => {
    setIsClient(true);
    console.log("ClientHome mounted, wallet connection status:", isConnected);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isConnected]);

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-light">
      {/* Bauhaus background pattern */}
      <div className="fixed inset-0 bg-[#0A0A0A] -z-20"></div>
      <div className="fixed inset-0 bg-grid-white opacity-[0.02] -z-10"></div>
      
      {/* Reduced background elements - just one subtle animation */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-[40%] right-[10%] w-64 h-64 border border-white/5 rounded-full opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Improved header design */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="https://www.schlemmer.org/" className="group">
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center border border-white/20 group-hover:border-primary transition-colors duration-300">
                <ArrowLeft className="w-3 h-3 text-white/70 group-hover:text-primary transition-colors duration-300" />
              </div>
              <span className="ml-2 text-sm uppercase tracking-wide text-white/70 group-hover:text-white transition-colors duration-300">Archives</span>
            </div>
          </Link>
          
          {/* Wallet Connection Status */}
          {isConnected ? (
            <div className="flex flex-col items-end">
              <div className="text-sm py-1 px-3 bg-primary/10 border border-primary/30 text-white/90 rounded-sm flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Wallet Connected
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-end">
              <div className="text-sm py-1 px-3 bg-white/5 border border-white/10 text-white/50 rounded-sm flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Wallet Not Connected
              </div>
            </div>
          )}
          
          {/* Simplified Bauhaus color blocks */}
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 bg-primary"></div>
            <div className="w-2 h-2 bg-[#1E88E5]"></div>
            <div className="w-2 h-2 bg-[#FDD835]"></div>
          </div>
        </div>
      </motion.header>
      
      <main className="flex-grow">
        {/* Hero Section - Redesigned for better viewport fit */}
        <section ref={heroRef} className="min-h-screen relative pt-20 flex flex-col justify-center">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
                {/* Left column - Title and Description */}
                <div>
                  {/* Title */}
                  <div className="mb-10">
                    <HeroTitle />
                  </div>
                  
                  {/* Centered tagline with more impact */}
                  <motion.p 
                    className="text-center mx-auto text-xl md:text-2xl text-white/90 font-light max-w-md leading-relaxed tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                  >
                    The ultimate intersection of human form and geometric precision — now preserved forever on the blockchain.
                  </motion.p>
                  
                  {/* Description - Shortened for viewport fit */}
                  <div className="mt-12">
                    <HeroDescription />
                  </div>
                </div>
                
                {/* Right column - Animated Signet and Mint Button */}
                <div className="flex flex-col items-center">
                  {/* Animated SVG Signet - 80% larger */}
                  <div className="mb-14">
                    <BauhausSignet size={360} showAnimation={true} />
                  </div>
                  
                  {/* Mint Button - Now smaller and more elegant */}
                  <div ref={mintRef} className="relative z-20 w-full">
                    {/* RGB stripe decorations - simplified */}
                    <div className="absolute -left-2 top-0 h-full flex items-center">
                      <div className="space-y-1">
                        <div className="w-0.5 h-10 bg-primary"></div>
                      </div>
                    </div>
                    
                    <MintButtonAlt />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle scroll indicator */}
          <div className="absolute bottom-8 left-0 w-full flex justify-center items-center z-10">
            <motion.div 
              className="w-0.5 h-10 bg-white/20"
              animate={{ scaleY: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </section>
        
        {/* Quote section - Enhanced with Bauhaus elements */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1 h-24 bg-[#1E88E5]"></div>
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SchlemmerQuote />
            </div>
          </div>
        </section>
        
        {/* About section - Enhanced with Bauhaus-inspired layout and added signet */}
        <section className="py-32 relative">
          <div className="absolute right-0 top-0 w-1 h-24 bg-[#FDD835]"></div>
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto relative">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-16">
                <div className="md:col-span-1">
                  <SignetExplanation />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Bauhaus Generator Section */}
        <section className="py-32 relative">
          <div className="absolute left-0 top-0 w-1 h-24 bg-primary"></div>
          <div className="container mx-auto px-6 lg:px-8">
            <div className="relative max-w-6xl mx-auto">
              {/* Generator header */}
              <div className="mb-16 flex items-center">
                <motion.div 
                  className="w-12 h-px bg-primary mr-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                />
                <motion.h2 
                  className="text-3xl font-light uppercase tracking-wide"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Generate Your Own
                </motion.h2>
              </div>
              
              <BauhausGenerator />
            </div>
          </div>
        </section>
        
        {/* FAQ Section - Reimagined with Bauhaus style */}
        <section className="py-32 relative">
          <div className="absolute right-0 top-0 w-1 h-24 bg-[#1E88E5]"></div>
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="mb-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-8">
                  <motion.div 
                    className="w-8 h-8 border border-[#1E88E5]/50 flex items-center justify-center mr-4"
                    initial={{ rotate: 45 }}
                    whileInView={{ rotate: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-4 h-4 bg-[#1E88E5]/50"></div>
                  </motion.div>
                  
                  <h2 className="text-3xl font-light uppercase tracking-wide">
                    FAQ
                  </h2>
                </div>
                
                <motion.div 
                  className="h-px w-full bg-white/10"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.div>
              
              <FAQSection />
            </div>
          </div>
        </section>
        
        {/* Connect - Simplified */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <motion.div 
              className="max-w-md mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-primary"></div>
                  <div className="w-2 h-2 bg-[#1E88E5]"></div>
                  <div className="w-2 h-2 bg-[#FDD835]"></div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <SocialLinks />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer - Enhanced with Bauhaus-inspired elements */}
      <footer className="py-8 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} The Oskar Schlemmer Theatre Archives</p>
            </div>
            <div className="flex items-center space-x-0.5">
              <div className="w-1 h-8 bg-primary/30"></div>
              <div className="w-1 h-8 bg-[#1E88E5]/30"></div>
              <div className="w-1 h-8 bg-[#FDD835]/30"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 