"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BauhausSignet } from './bauhaus-signet';

export function SignetExplanation() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        
        {/* Left Side - Replace scaling human with BauhausSignet */}
        <motion.div 
          className="flex justify-center items-center h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full max-w-md relative flex justify-center items-center">
            {/* Replace this human form with the BauhausSignet component */}
            <motion.div
              className="relative w-80 h-80 flex justify-center items-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <BauhausSignet size={320} showAnimation={true} />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Right Side - Description */}
        <div className="flex flex-col space-y-6">
          <motion.h2 
            className="text-4xl md:text-5xl font-normal text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Bauhaus Signet
          </motion.h2>
          
          <motion.div 
            className="h-0.5 w-16 bg-primary"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <motion.p 
            className="text-white/80 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            The Bauhaus Signet was designed by Oskar Schlemmer in 1923 and became the iconic symbol of the revolutionary art school. Schlemmer&apos;s design embodies the Bauhaus philosophy: a harmonious blend of art and technology, with clean geometric forms arranged in perfect balance.
          </motion.p>
          
          <motion.p 
            className="text-white/80 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Like the Bauhaus movement itself, this Signet NFT connects historical artistic innovation with modern technology. By owning this NFT, you own a piece of art history reimagined for the blockchain era.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link 
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white hover:bg-white/15 transition duration-300 text-sm uppercase tracking-wider"
            >
              Learn more about Bauhaus Signet
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Historical Images Section - Added below the main content */}
      <motion.div 
        className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex flex-col">
          <div className="overflow-hidden border border-white/10 rounded-md bg-black">
            <Image 
              src="/bauhaus-masters.jpg" 
              alt="Historical photo of Bauhaus masters" 
              width={600}
              height={400}
              priority
              className="w-full object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
          <p className="mt-3 text-sm text-white/60 italic">
            The Bauhaus masters gathered in 1923. From left to right: Joseph Hartwig, Wassily Kandinsky, Paul Klee, Heinrich Koch, and Oskar Schlemmer.
          </p>
        </div>
        
        <div className="flex flex-col">
          <div className="overflow-hidden border border-white/10 rounded-md bg-white p-6 flex items-center justify-center">
            <Image 
              src="/bauhaus-signet-stamp.jpg" 
              alt="Official Bauhaus signet stamp" 
              width={400}
              height={400}
              priority
              className="w-4/5 max-h-48 object-contain transition-all duration-500 hover:scale-105"
            />
          </div>
          <p className="mt-3 text-sm text-white/60 italic">
            The iconic Staatliches Bauhaus Weimar signet designed by Oskar Schlemmer in 1922, representing the school&apos;s unified approach to art and technology.
          </p>
        </div>
      </motion.div>
    </section>
  );
} 