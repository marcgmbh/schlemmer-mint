"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-16 bg-black/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Bauhaus Signet</h3>
            <p className="text-gray-400 mb-4">
              A digital collectible preserving Oskar Schlemmer's iconic 1922 design, 
              celebrating the intersection of human form and geometric abstraction.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Connect</h3>
            <div className="flex flex-col space-y-2">
              <Link href="https://twitter.com/bauhaussignet" className="text-gray-400 hover:text-primary transition-colors">Twitter</Link>
              <Link href="https://discord.gg/bauhaus" className="text-gray-400 hover:text-primary transition-colors">Discord</Link>
              <Link href="https://opensea.io/collection/bauhaus-signet" className="text-gray-400 hover:text-primary transition-colors">OpenSea</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Resources</h3>
            <div className="flex flex-col space-y-2">
              <Link href="https://www.schlemmer.org/" className="text-gray-400 hover:text-primary transition-colors">Schlemmer Archives</Link>
              <Link href="https://www.change.org/p/save-the-oskar-schlemmer-studio-for-future-generations-313bb710-4a95-4cb7-9dbf-8523c3871c32" className="text-gray-400 hover:text-primary transition-colors">Support the Studio</Link>
              <Link href="https://bauhaus-movement.com/" className="text-gray-400 hover:text-primary transition-colors">Bauhaus Movement</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Bauhaus Signet. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-500 hover:text-white text-sm">Terms</Link>
            <Link href="/privacy" className="text-gray-500 hover:text-white text-sm">Privacy</Link>
            <Link href="/faq" className="text-gray-500 hover:text-white text-sm">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
