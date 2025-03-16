"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

interface NFT {
  identifier: string;
  name: string;
  image_url: string;
  permalink: string;
}

export default function NFTGallery() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedNft, setSelectedNft] = useState<NFT | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Sample filters - these would be dynamic in a real app
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'rare', label: 'Rare' },
    { id: 'unique', label: 'Unique' },
    { id: 'colorful', label: 'Colorful' }
  ];
  
  // Generate a decorative grid background
  const GridBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-5 pointer-events-none">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
        {Array(144).fill(0).map((_, i) => (
          <motion.div 
            key={i}
            className="border border-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.01 * (i % 24), duration: 0.5 }}
          />
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    async function fetchNFTs() {
      try {
        setLoading(true);
        const response = await fetch('/api/nfts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch NFTs');
        }
        
        const data = await response.json();
        setNfts(data.nfts || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load NFTs from the collection');
      } finally {
        setLoading(false);
      }
    }

    fetchNFTs();
  }, []);

  // Staggered loading animation for gallery items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  // For decorative elements
  const decorationVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <div className="w-full py-32 flex flex-col items-center">
        <motion.div 
          className="relative w-20 h-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-[#1E88E5] rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FDD835] rounded-full"></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
          <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
        </motion.div>
        <motion.p 
          className="mt-8 text-gray-400 uppercase tracking-widest text-sm"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Collection
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-20 text-center">
        <motion.div 
          className="inline-block p-8 border border-red-500/30 bg-black/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-red-400">{error}</p>
          <button 
            className="mt-4 px-4 py-2 border border-white/20 text-white hover:bg-white/10 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full py-24 relative" ref={ref}>
      <GridBackground />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-12 -right-16 w-32 h-32 border-r-2 border-t-2 border-[#FDD835]/20"
          variants={decorationVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
        />
        <motion.div 
          className="absolute -bottom-12 -left-16 w-24 h-24 border-l-2 border-b-2 border-primary/20"
          variants={decorationVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 relative text-center"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-primary mx-auto mb-8"
          />
          
          <h2 className="text-5xl font-light text-white mb-6 tracking-tight">
            Bauhaus Signet <span className="text-primary">Collection</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Explore the NFT collection that preserves Schlemmer's geometric human forms as digital artifacts,
            each limited to only <span className="text-white font-medium">1888</span> editions.
          </p>
          
          {/* Filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === filter.id 
                    ? 'bg-primary text-white' 
                    : 'bg-transparent border border-white/20 text-white/70 hover:text-white hover:border-white/40'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {nfts.map((nft, index) => (
            <motion.div 
              key={nft.identifier}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedNft(nft)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer relative group"
              transition={{ duration: 0.4 }}
            >
              <div className="relative">
                {/* Decorative frame */}
                <motion.div 
                  className="absolute -inset-2 border border-white/10 z-0"
                  variants={{
                    rest: { opacity: 0.5, scale: 0.98 },
                    hover: { opacity: 1, scale: 1 }
                  }}
                  animate={hoveredIndex === index ? "hover" : "rest"}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute -inset-4 border border-primary/20 z-0"
                  variants={{
                    rest: { opacity: 0, scale: 0.95 },
                    hover: { opacity: 1, scale: 1 }
                  }}
                  animate={hoveredIndex === index ? "hover" : "rest"}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Main card */}
                <div className="bg-black border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-primary/50 z-10 relative">
                  <div className="aspect-square relative">
                    <Image 
                      src={nft.image_url} 
                      alt={nft.name}
                      fill
                      className="object-cover transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1.0)'
                      }}
                    />
                    
                    {/* Overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                      variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1 }
                      }}
                      animate={hoveredIndex === index ? "hover" : "rest"}
                    />
                    
                    {/* View details button that appears on hover */}
                    <motion.div
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-primary text-white uppercase tracking-wider text-sm"
                      variants={{
                        rest: { opacity: 0, y: 20 },
                        hover: { opacity: 1, y: 0 }
                      }}
                      animate={hoveredIndex === index ? "hover" : "rest"}
                      transition={{ duration: 0.3 }}
                    >
                      View Details
                    </motion.div>
                  </div>
                  
                  <div className="p-5 border-t border-white/10 backdrop-blur-sm bg-black/50 relative z-20">
                    <h3 className="text-white font-medium group-hover:text-primary transition-colors duration-300 text-lg">
                      {nft.name}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-400">
                        #{nft.identifier}
                      </p>
                      <div className="bg-white/10 px-2 py-1 text-xs text-white/80 uppercase">
                        {index % 3 === 0 ? 'Rare' : index % 2 === 0 ? 'Unique' : 'Common'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {nfts.length === 0 && (
          <motion.div 
            className="text-center py-16 border-2 border-dashed border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="max-w-md mx-auto">
              <p className="text-xl text-gray-400 mb-4">No NFTs Found</p>
              <p className="text-gray-500">The collection appears to be empty. Check back soon for new additions.</p>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <a 
            href="https://opensea.io/collection/bauhaus-signet"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-[#1E88E5] to-[#FDD835] rounded-sm blur-sm opacity-70 group-hover:opacity-100 transition duration-1000"></div>
            <button className="relative px-10 py-5 bg-black text-white font-bold tracking-widest overflow-hidden uppercase z-10">
              <span className="relative z-10 group-hover:text-white transition-colors">Explore Full Collection</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <motion.div 
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
              >→</motion.div>
            </button>
          </a>
        </motion.div>
      </div>
      
      {/* NFT Detail Modal - Enhanced */}
      <AnimatePresence>
        {selectedNft && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNft(null)}
          >
            <motion.div 
              className="relative max-w-5xl w-full max-h-[90vh]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Decorative frame */}
              <motion.div 
                className="absolute -inset-1 border-2 border-primary/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
              
              <div className="bg-black/80 border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square relative bg-black/50 overflow-hidden">
                  <Image 
                    src={selectedNft.image_url} 
                    alt={selectedNft.name}
                    fill
                    className="object-contain p-6"
                  />
                  
                  {/* Bauhaus-inspired decorative elements */}
                  <div className="absolute top-0 left-0 w-12 h-12">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                    <div className="absolute top-0 left-0 h-full w-1 bg-primary"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12">
                    <div className="absolute bottom-0 right-0 w-full h-1 bg-[#1E88E5]"></div>
                    <div className="absolute bottom-0 right-0 h-full w-1 bg-[#1E88E5]"></div>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col relative overflow-auto max-h-[90vh] md:max-h-full">
                  <button 
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    onClick={() => setSelectedNft(null)}
                  >
                    ✕
                  </button>
                  
                  <div className="mb-2 text-sm text-primary uppercase tracking-wider">Bauhaus Signet NFT</div>
                  <h3 className="text-3xl font-bold text-white mb-3">{selectedNft.name}</h3>
                  <div className="flex items-center mb-8">
                    <div className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-sm">
                      Token #{selectedNft.identifier}
                    </div>
                    <div className="w-1 h-1 bg-white/30 rounded-full mx-3"></div>
                    <div className="text-white/60 text-sm">Edition 1 of 1888</div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-white text-xl mb-3 font-light">About this Artwork</h4>
                        <p className="text-gray-300 leading-relaxed">
                          This Bauhaus Signet NFT embodies Oskar Schlemmer's philosophy of geometric human form,
                          preserved as a digital collectible on the Ethereum blockchain. Each piece carries the 
                          legacy of Schlemmer's revolutionary approach to design and form.
                        </p>
                      </div>
                      
                      <div className="pt-6 border-t border-white/10">
                        <h4 className="text-white text-xl mb-3 font-light">Attributes</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/5 p-3">
                            <div className="text-white/50 text-xs uppercase mb-1">Type</div>
                            <div className="text-white font-medium">Original</div>
                          </div>
                          <div className="bg-white/5 p-3">
                            <div className="text-white/50 text-xs uppercase mb-1">Year</div>
                            <div className="text-white font-medium">1923/2023</div>
                          </div>
                          <div className="bg-white/5 p-3">
                            <div className="text-white/50 text-xs uppercase mb-1">Artist</div>
                            <div className="text-white font-medium">Oskar Schlemmer</div>
                          </div>
                          <div className="bg-white/5 p-3">
                            <div className="text-white/50 text-xs uppercase mb-1">Rarity</div>
                            <div className="text-white font-medium">{parseInt(selectedNft.identifier) % 3 === 0 ? 'Rare' : parseInt(selectedNft.identifier) % 2 === 0 ? 'Unique' : 'Common'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <a 
                      href={selectedNft.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-primary text-white font-bold hover:bg-primary/90 transition-colors text-center"
                    >
                      VIEW ON OPENSEA
                    </a>
                    <button 
                      onClick={() => setSelectedNft(null)}
                      className="px-8 py-3 border border-white/20 text-white hover:bg-white/10 transition-colors"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 