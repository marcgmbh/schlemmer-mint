"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Custom hook to handle scroll progress
const useScrollProgress = (ref: React.RefObject<HTMLElement>, offset = ["start end", "end start"]) => {
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    let frameId: number;
    
    const updateScrollProgress = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on element's position relative to viewport
      let progress = 0;
      
      // When element enters viewport from bottom
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate progress (0 when element just enters, 1 when it's about to leave)
        progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
        progress = Math.max(0, Math.min(1, progress));
      } else if (rect.top < 0) {
        // Element has passed viewport
        progress = 1;
      }
      
      setScrollYProgress(progress);
      frameId = requestAnimationFrame(updateScrollProgress);
    };
    
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [ref]);
  
  return { scrollYProgress };
};

// Custom transform function to replicate framer-motion's useTransform
const useCustomTransform = (value: number, inputRange: number[], outputRange: (string | number)[]) => {
  // Map input value to output range
  const index = inputRange.findIndex(input => value <= input);
  
  if (index === 0) return outputRange[0];
  if (index === -1) return outputRange[outputRange.length - 1];
  
  // Calculate progress between the two closest input values
  const inputMin = inputRange[index - 1];
  const inputMax = inputRange[index];
  const progress = (value - inputMin) / (inputMax - inputMin);
  
  // Interpolate between the two closest output values
  const outputMin = outputRange[index - 1];
  const outputMax = outputRange[index];
  
  if (typeof outputMin === 'string' && typeof outputMax === 'string') {
    // Assume percentage strings
    const numMin = parseFloat(outputMin);
    const numMax = parseFloat(outputMax);
    const result = numMin + progress * (numMax - numMin);
    return `${result}%`;
  }
  
  if (typeof outputMin === 'number' && typeof outputMax === 'number') {
    return outputMin + progress * (outputMax - outputMin);
  }
  
  return outputMin;
};

export default function SchlemmerQuote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScrollProgress(ref);

  // Calculate transform values
  const yValue = useCustomTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityValue = useCustomTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0.8]);
  const y2Value = useCustomTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  return (
    <section className="w-full px-6 py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Background geometric elements */}
      <motion.div 
        className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px opacity-10 pointer-events-none"
        style={{ y: yValue, opacity: opacityValue }}
      >
        {Array(12*6).fill(0).map((_, i) => (
          <div key={i} className={`${i % 8 === 0 ? 'bg-primary/20' : 'bg-white/5'}`}></div>
        ))}
      </motion.div>
      
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
        style={{ y: y2Value }}
      ></motion.div>
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div 
          className="bg-black/70 backdrop-blur-xl p-12 border-l-4 border-primary relative overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-primary to-transparent"></div>
          
          <blockquote className="relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="block text-5xl text-primary font-serif absolute -left-6 -top-2">&quot;</span>
              <p className="text-xl md:text-2xl font-light text-gray-200 italic leading-relaxed pl-4">
                The human being, the measure of all matters
                presents countless possibilities for variations and relationships in building and craftsmanship, 
                making it crucial to emphasize the essentials: measurement, proportions, anatomy, type, and distinctive features.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <p className="text-xl md:text-2xl font-light text-gray-200 italic leading-relaxed pl-4">
                The various ideals of artistic styles. 
                Dynamics of the body. 
                Movement. 
                Dance. 
                Body feeling. 
                Man in his relationship to the environment.
              </p>
            </motion.div>
            
            <motion.footer 
              className="mt-8 text-right text-gray-400 flex justify-end items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-px bg-primary mr-3"></div>
              <span>Oskar Schlemmer, <span className="italic">Diary, November 1922</span></span>
            </motion.footer>
          </blockquote>
          
          {/* Animated line traversing the quote - inspired by Bauhaus movement studies */}
          <motion.div 
            className="absolute left-0 bottom-0 w-full h-1 bg-primary/20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
} 