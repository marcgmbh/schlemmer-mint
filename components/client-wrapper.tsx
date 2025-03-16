"use client";

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Minimal Bauhaus-inspired loading component
function BauhausLoader() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Bauhaus-inspired geometric elements */}
        <div className="absolute -left-12 top-8 w-6 h-6 bg-[#E53935]"></div>
        <div className="absolute -right-24 bottom-0 w-12 h-12 border-2 border-[#1E88E5]"></div>
        <div className="absolute left-24 -bottom-12 w-8 h-8 bg-[#FDD835]"></div>
        
        {/* Center content */}
        <div className="mb-12 relative">
          <div className="w-16 h-1 bg-white mb-8 mx-auto"></div>
          <h1 className="text-3xl uppercase tracking-widest text-white font-light mb-8">Bauhaus Signet</h1>
          
          {/* Minimal progress indicator */}
          <div className="relative h-px w-48 bg-white/20 mx-auto overflow-hidden">
            <div className="absolute h-full bg-white w-1/3 animate-[loading_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="absolute bottom-6 text-xs text-white/30 uppercase tracking-wider">
        Oskar Schlemmer Archives
      </div>
      
      {/* Vertical line */}
      <div className="absolute h-32 w-px bg-white/10 bottom-10"></div>
    </div>
  );
}

export default function ClientWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Add animation keyframes for loader
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
      @keyframes loading {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
    `, styleSheet.cssRules.length);
  }, []);

  // Use dynamic import for the home component
  const ClientHome = dynamic(() => import('@/components/client-home'), {
    ssr: false,
    loading: () => <BauhausLoader />
  });

  if (!isClient) {
    return <BauhausLoader />;
  }

  return <ClientHome />;
} 