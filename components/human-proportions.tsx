"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HumanProportions() {
  return (
    <section className="my-24 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10"></div>
      
      {/* Guide lines inspired by Schlemmer's work */}
      <div className="absolute inset-0 flex justify-center items-center -z-5 opacity-10">
        <div className="w-0.5 h-full bg-primary absolute"></div>
        <div className="w-full h-0.5 bg-primary absolute"></div>
        <div className="w-[70%] h-[70%] border border-blue-500 rounded-full absolute"></div>
        <div className="w-[40%] h-[40%] border border-yellow-500 absolute transform rotate-45"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">Human Form & Geometric Precision</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 p-6 border-t-2 border-primary">
              <h3 className="text-xl font-bold mb-4 text-white">Measurement & Proportion</h3>
              <p className="text-gray-300">
                Schlemmer's work celebrated the human body as the ultimate source of proportion 
                and measurement, informing all design decisions in the Bauhaus movement.
              </p>
              <div className="mt-4 h-32 flex items-center justify-center relative">
                <div className="w-0.5 h-full bg-white/20 absolute"></div>
                <div className="w-full h-0.5 bg-white/20 absolute"></div>
                <div className="w-6 h-6 rounded-full border border-primary absolute"></div>
              </div>
            </div>
            
            <div className="bg-black/40 p-6 border-t-2 border-blue-500">
              <h3 className="text-xl font-bold mb-4 text-white">Movement & Dance</h3>
              <p className="text-gray-300">
                As a choreographer and theater designer, Schlemmer translated the dynamics 
                of the human body into abstract geometric forms and paths of movement.
              </p>
              <div className="mt-4 h-32 flex items-center justify-center relative">
                <motion.div 
                  className="w-2 h-2 bg-blue-500 rounded-full absolute"
                  animate={{
                    x: [0, 30, 0, -30, 0],
                    y: [0, -20, 20, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div 
                  className="w-full h-full absolute border border-blue-500/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
            
            <div className="bg-black/40 p-6 border-t-2 border-yellow-500">
              <h3 className="text-xl font-bold mb-4 text-white">Human & Environment</h3>
              <p className="text-gray-300">
                The Bauhaus Signet epitomizes Schlemmer's exploration of the relationship 
                between the human form and its surrounding space and architecture.
              </p>
              <div className="mt-4 h-32 flex items-center justify-center relative">
                <div className="w-16 h-16 border border-yellow-500/50 absolute"></div>
                <div className="w-4 h-8 bg-yellow-500/30 absolute rounded-full transform translate-y-[-6px]"></div>
                <div className="w-8 h-0.5 bg-yellow-500/50 absolute transform translate-y-[6px]"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 