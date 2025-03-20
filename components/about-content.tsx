"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { BauhausSignet } from './bauhaus-signet';

export default function AboutContent() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  const lineAnimation = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 1, delay: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="group">
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center border border-white/20 group-hover:border-primary transition-colors duration-300">
                <ArrowLeft className="w-3 h-3 text-white/70 group-hover:text-primary transition-colors duration-300" />
              </div>
              <span className="ml-2 text-sm uppercase tracking-wide text-white/70 group-hover:text-white transition-colors duration-300">Back to Home</span>
            </div>
          </Link>
          
          {/* Bauhaus color blocks */}
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 bg-[#E53935]"></div>
            <div className="w-2 h-2 bg-[#1E88E5]"></div>
            <div className="w-2 h-2 bg-[#FDD835]"></div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 relative">
        {/* Content */}
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Hero Section */}
            <motion.div variants={fadeIn} className="text-center relative mb-16">
              <div className="absolute -top-16 -left-24 w-40 h-40 opacity-5 pointer-events-none">
                <div className="w-full h-full border-2 border-white/50 rounded-full"></div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">The Bauhaus Signet Story</h1>
              
              <motion.div variants={lineAnimation} className="h-0.5 bg-primary w-24 mx-auto mb-8"></motion.div>
              
              <div className="flex justify-center mb-12">
                <div className="w-64 h-64">
                  <BauhausSignet size={256} showAnimation={true} />
                </div>
              </div>
              
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                The iconic Bauhaus logo created in 1923 by Oskar Schlemmer represents both 
                the human form and the school&apos;s artistic philosophy in a single, powerful design.
              </p>
            </motion.div>

            {/* First Image - The Signet */}
            <motion.div variants={fadeIn} className="flex justify-center mb-16">
              <div className="relative border border-white/10 p-4 max-w-md">
                <Image 
                  src="/bauhaus-signet-stamp.jpg" 
                  alt="The original Bauhaus signet designed by Oskar Schlemmer" 
                  width={500} 
                  height={500}
                  className="w-full"
                />
                <div className="mt-2 text-sm text-white/60 text-center">
                  The original Bauhaus signet, featuring the distinctive geometric face design
                </div>
              </div>
            </motion.div>

            {/* Story Content */}
            <motion.div variants={fadeIn} className="space-y-8">
              <h2 className="text-3xl font-light tracking-wide border-l-2 border-primary pl-4">The Story Behind the Signet</h2>
              
              <div className="text-white/80 space-y-6 leading-relaxed">
                <p>
                  &quot;The Bauhaus school realized that they had to be more contemporary. In the master council they discussed creating a new logo, and the artists were asked to present proposals.&quot;
                </p>
                
                <div className="pl-6 border-l border-white/20">
                  <p className="italic">
                    &quot;If you think that at that time, there was Wassily Kandinsky, Paul Klee, Lyonel Feininger, but also László Moholy-Nagy; who was very much interested in graphic design. It&apos;s amazing that they chose the logo of Oskar Schlemmer.&quot;
                  </p>
                </div>
                
                <p>
                  &quot;The new logo was both about the human being as well as about art, about teaching. It encompassed so many aspects. Very striking how with a few sort of vertical and horizontal elements, you create a face.&quot;
                </p>
                
                <p className="text-primary text-lg">
                  — C. Raman Schlemmer (@OskarSchlemmer)
                </p>
              </div>
            </motion.div>

            {/* Second Image - Bauhaus Masters */}
            <motion.div variants={fadeIn} className="mt-16 flex justify-center">
              <div className="relative border border-white/10 p-4 max-w-2xl">
                <Image 
                  src="/bauhaus-masters.jpg" 
                  alt="Bauhaus masters including Oskar Schlemmer" 
                  width={800} 
                  height={500}
                  className="w-full"
                />
                <div className="mt-2 text-sm text-white/60 text-center">
                  Lyonel Feininger, Wassily Kandinsky, Oskar Schlemmer, Georg Muche, and Paul Klee. In Paul Klee&apos;s studio at the Bauhaus Weimar, 1925.
                </div>
              </div>
            </motion.div>

            {/* Additional Information */}
            <motion.div variants={fadeIn} className="mt-16 space-y-6">
              <div className="bg-white/5 p-8 border-t border-white/10">
                <h3 className="text-2xl font-light mb-4">Discover More</h3>
                <p className="text-white/70 mb-6">
                  The full interview with C. Raman Schlemmer, the grandson of Oskar Schlemmer, is available on @one33seven_
                </p>
                
                <Link 
                  href="https://one33seven.com/people/oskar-schlemmer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white/10 text-white hover:bg-white/15 transition duration-300 text-sm uppercase tracking-wider group"
                >
                  Visit One33seven
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bauhaus-inspired decorative elements */}
        <div className="fixed top-1/3 right-6 h-64 w-1 bg-primary/20 hidden md:block"></div>
        <div className="fixed bottom-1/3 left-6 h-64 w-1 bg-[#1E88E5]/20 hidden md:block"></div>
        <motion.div 
          className="fixed bottom-10 right-10 w-20 h-20 border-2 border-[#FDD835]/30 hidden md:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 relative bg-black border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} Oskar Schlemmer Archives</p>
            </div>
            <div className="flex items-center space-x-0.5">
              <div className="w-1 h-8 bg-[#E53935]/30"></div>
              <div className="w-1 h-8 bg-[#1E88E5]/30"></div>
              <div className="w-1 h-8 bg-[#FDD835]/30"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 