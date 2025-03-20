"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Simple implementation of useInView using Intersection Observer
function useIntersectionObserver(ref: React.RefObject<HTMLElement>): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }
    );
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [ref]);
  
  return isIntersecting;
}

export default function HeroTitle() {
  const ref = useRef(null);
  const inView = useIntersectionObserver(ref);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  
  // Enhanced animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };
  
  const letterVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 70,
        damping: 12
      }
    }
  };
  
  // Geometric animation variants
  const geometricVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };
  
  const bauhausLetters = "BAUHAUS".split("");
  const signetLetters = "SIGNET".split("");
  
  return (
    <div ref={ref} className="relative">
      {/* Bauhaus-inspired geometric decorative elements */}
      <div className="absolute -top-10 -left-10 w-full h-full pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-12 h-12"
          variants={geometricVariants}
          custom={1}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{ delay: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          <div className="absolute top-0 left-0 h-full w-1 bg-primary"></div>
        </motion.div>
        
        <motion.div 
          className="absolute top-1/4 right-0 w-16 h-1 bg-[#1E88E5]"
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1, opacity: 0.7 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-1/3 w-1 h-12 bg-[#FDD835]"
          initial={{ scaleY: 0 }}
          animate={isVisible ? { scaleY: 1, opacity: 0.7 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        />
        
        <motion.div
          className="absolute top-1/2 -left-4 w-2 h-2 rounded-full bg-primary"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 1.7 }}
        />
      </div>
      
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none">
          <div className="flex overflow-hidden pb-2 relative justify-center">
            {bauhausLetters.map((letter, index) => (
              <motion.span 
                key={`bauhaus-${index}`}
                variants={letterVariants}
                className="text-primary inline-block relative"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          <div className="relative inline-flex overflow-hidden justify-center w-full">
            {signetLetters.map((letter, index) => (
              <motion.span 
                key={`signet-${index}`}
                variants={letterVariants}
                className="text-white inline-block"
              >
                {letter}
              </motion.span>
            ))}
            
            <motion.span 
              className="absolute -top-3 -right-6 text-sm bg-transparent border border-primary/30 text-primary/90 px-2 py-0.5 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
            >
              1922
            </motion.span>
          </div>
        </h1>
        
        <motion.div 
          className="mt-8 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="h-px flex-grow bg-white/10"></div>
          <motion.div className="px-6">
            <motion.p 
              className="text-lg md:text-xl text-gray-300 uppercase tracking-[0.15em] font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Oskar Schlemmer
            </motion.p>
          </motion.div>
          <div className="h-px flex-grow bg-white/10"></div>
        </motion.div>
      </motion.div>
      
      {/* Grid background */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array(64).fill(0).map((_, i) => (
            <motion.div 
              key={i} 
              className="border border-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.01 * i, duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
