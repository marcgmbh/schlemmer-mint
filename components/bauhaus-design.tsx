"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function BauhausDesign() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Delay the animation slightly to ensure it plays after page load
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);
  
  const svgVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
  };
  
  const headGroupVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.5,
        duration: 0.8
      } 
    }
  };
  
  const partVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };
  
  const circleVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { 
        duration: 1.5,
        ease: "easeInOut",
        delay: 1.2
      } 
    }
  };
  
  return (
    <div className="flex justify-center items-center w-full h-full">
      <motion.div
        initial="initial"
        animate={loaded ? "animate" : "initial"}
        variants={svgVariants}
        className="relative w-full h-full"
      >
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg"
          data-name="Bauhaus Signet" 
          id="Bauhaus_Signet" 
          viewBox="0 0 1337 1337"
          style={{ backgroundColor: 'transparent' }}
          className="w-full h-full"
        >
          <defs>
            <style>
              {`
                #Neck { fill: var(--color, #E53935); }
                #Mouth { fill: var(--color, #FFFFFF); }
                #Nose { fill: var(--color, #E53935); }
                #Eye { fill: var(--color, #1E88E5); }
                circle { stroke: #FDD835; }
              `}
            </style>
          </defs>
          
          <motion.circle 
            cx="50%" 
            cy="50%" 
            r="628" 
            fill="black" 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          
          <motion.g 
            id="headGroup"
            variants={headGroupVariants}
          >
            <motion.path 
              d="M592.85 1147.5h146.83v147.25H592.85z" 
              className="head" 
              id="Neck" 
              variants={partVariants}
            />
            <motion.path 
              d="M792.68 810.36v345.25H502.1v-15.24h234.64V964.74h-58.31v-25.59h58.31V810.36z" 
              className="head" 
              id="Mouth" 
              variants={partVariants}
            />
            <motion.path 
              d="M819.52 807.07v8.53H680.53v-8.53h105.43l.28-753.56 33 7z" 
              className="head" 
              id="Nose" 
              variants={partVariants}
            />
            <motion.path 
              d="M647.25 255.71v317.7h-10.63v-119.7H445.89V266.34H330.22v-10.63z" 
              className="head" 
              id="Eye" 
              variants={partVariants}
            />
          </motion.g>
          
          <motion.circle 
            cx="50%" 
            cy="50%" 
            r="628" 
            strokeWidth="10px" 
            style={{ fill: 'transparent' }}
            variants={circleVariants}
          />
        </motion.svg>
        
        {/* Animated Bauhaus color dots */}
        <motion.div 
          className="absolute -right-4 -bottom-4 flex space-x-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <div className="w-2 h-2 bg-[#E53935]"></div>
          <div className="w-2 h-2 bg-[#1E88E5]"></div>
          <div className="w-2 h-2 bg-[#FDD835]"></div>
        </motion.div>
      </motion.div>
    </div>
  );
} 