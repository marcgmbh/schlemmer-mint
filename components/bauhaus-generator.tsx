"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { useMint } from '@/hooks/use-mint';
import TransactionToast from './transaction-toast';
import { WalletDialog } from './wallet-dialog';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { BauhausDesign } from './bauhaus-design';
import { useAppKit } from '@/hooks/use-appkit';

// Define art styles from the BauhausMetadata contract
enum ArtStyle {
  ORIGINAL = 'Original',
  ORIGINAL_INVERSE = 'Original Inverse',
  GOLD_SILVER = 'Gold Silver',
  PRIMARY = 'Bauhaus Primary',
  DANCE = 'Bauhaus Dance',
  TRIADIC_BALLET = 'Triadic Ballet',
  HOMAGE_DE_STIJL = 'Homage De Stijl',
  GRADIENT_RADIAL = 'Gradient Radial',
  GRADIENT_ANGLED = 'Gradient Angled',
  PUNKISM = 'Punkism'
}

// Define trait types based on the BauhausMetadata contract
interface TraitOptions {
  artStyle: ArtStyle[];
  faceColors: Record<ArtStyle, string[]>;
  backgroundColors: Record<ArtStyle, string[]>;
  hasGlitch: boolean[];
}

// Define NFT and trait types for type safety
interface NFTTraits {
  artStyle: ArtStyle;
  faceColor: string;
  backgroundColor: string;
  hasGlitch: boolean;
}

interface GeneratedNFT {
  id: number;
  traits: NFTTraits;
  name: string;
}

// Define color interfaces with index signatures
interface PrimaryColors {
  [key: string]: string;
  'Bright Red': string;
  'Cobalt Blue': string;
  'Lemon Yellow': string;
  'Pure Red': string;
  'Pure Blue': string;
  'Pure Yellow': string;
  'Lime Green': string;
  'Orange': string;
  'Purple': string;
  'Gray': string;
  'Near Black': string;
  'Off-White': string;
  'Light Gray': string;
  'Beige': string;
  'Brown': string;
  'Ochre': string;
}

interface DanceColors {
  [key: string]: string;
  'Deep Indigo': string;
  'Crimson': string;
  'Lemon Yellow': string;
  'Light Gray': string;
  'Slate Gray': string;
  'Burnt Orange': string;
  'Lime Green': string;
  'Royal Blue': string;
  'Ultramarine': string;
  'Orange': string;
  'Kelly Green': string;
  'Purple': string;
  'Teal': string;
  'Amber': string;
  'Hot Pink': string;
  'Blue Gray': string;
}

interface TriadicBalletColors {
  [key: string]: string;
  'Deep Orange': string;
  'Pale Yellow': string;
  'Amber': string;
  'Coral': string;
  'Marigold': string;
  'Vermilion': string;
  'Deep Purple': string;
  'Royal Purple': string;
  'Indigo': string;
  'Sky Blue': string;
  'Turquoise': string;
  'Pale Pink': string;
  'Lilac': string;
  'Medium Purple': string;
  'Cerise': string;
  'Magenta': string;
  'Forest Green': string;
  'Light Green': string;
  'Kelly Green': string;
  'Light Gray': string;
  'Slate Gray': string;
  'Blue Gray': string;
}

interface DeStijlColors {
  [key: string]: string;
  'Bright Red': string;
  'Cobalt Blue': string;
  'Lemon Yellow': string;
  'Pure Red': string;
  'Pure Blue': string;
  'Pure Yellow': string;
  'Medium Gray': string;
  'Light Gray': string;
  'Dark Gray': string;
  'Orange': string;
  'Green': string;
  'Purple': string;
  'Indian Red': string;
  'Steel Blue': string;
  'Goldenrod': string;
}

interface BauhausColors {
  bauhausPrimary: PrimaryColors;
  bauhausDance: DanceColors;
  triadicBallet: TriadicBalletColors;
  deStijl: DeStijlColors;
  goldSilver: Record<string, string>;
  original: Record<string, string>;
}

export default function BauhausGenerator() {
  console.log("BauhausGenerator component initialized");
  
  const [generatedNFT, setGeneratedNFT] = useState<GeneratedNFT | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'pending'>('pending');
  const [toastMessage, setToastMessage] = useState('');
  
  const { 
    handleMint: originalHandleMint, 
    isMinting, 
    isConnected, 
    isSaleActive,
    mintError,
    mintSuccess,
    mintTxHash,
    isConfirmed
  } = useMint();
  
  const { open } = useAppKit();
  
  // Create a direct handler to ensure the mint button works
  const handleMint = () => {
    console.log("Mint button clicked in BauhausGenerator");
    
    // Show pending toast
    setToastType('pending');
    setToastMessage('Your transaction is being processed...');
    setToastVisible(true);
    
    // Try the provided mint handler
    originalHandleMint();
  };
  
  // Watch for mint status changes
  useEffect(() => {
    if (mintError) {
      setToastType('error');
      setToastMessage(mintError);
      setToastVisible(true);
    } else if (mintSuccess) {
      setToastType('pending');
      setToastMessage('Transaction submitted! Waiting for confirmation...');
      setToastVisible(true);
    }
    
    if (isConfirmed) {
      setToastType('success');
      setToastMessage('Your Bauhaus Signet has been minted successfully!');
      setToastVisible(true);
    }
  }, [mintError, mintSuccess, isConfirmed]);
  
  // Wrap bauhausColors in useMemo to prevent dependency changes on every render
  const bauhausColors = React.useMemo<BauhausColors>(() => ({
    // Bauhaus Primary colors
    bauhausPrimary: {
      'Bright Red': '#F50101',
      'Cobalt Blue': '#0200f1',
      'Lemon Yellow': '#F9FF4C',
      'Pure Red': '#FF0000',
      'Pure Blue': '#0000FF',
      'Pure Yellow': '#FFFF00',
      'Lime Green': '#00FF00',
      'Orange': '#FFA500',
      'Purple': '#800080',
      'Gray': '#808080',
      'Near Black': '#1A1A1A',
      'Off-White': '#E6E6E6',
      'Light Gray': '#B3B3B3',
      'Beige': '#F5F5DC',
      'Brown': '#A52A2A',
      'Ochre': '#CC7722'
    },
    // Bauhaus Dance colors
    bauhausDance: {
      'Deep Indigo': '#303F9F',
      'Crimson': '#D32F2F',
      'Lemon Yellow': '#FFEB3B',
      'Light Gray': '#BDBDBD',
      'Slate Gray': '#78909C',
      'Burnt Orange': '#D84315',
      'Lime Green': '#66BB6A',
      'Royal Blue': '#3F51B5',
      'Ultramarine': '#3433FF',
      'Orange': '#FF9800',
      'Kelly Green': '#4CAF50',
      'Purple': '#9C27B0',
      'Teal': '#009688',
      'Amber': '#FFC107',
      'Hot Pink': '#E91E63',
      'Blue Gray': '#607D8B'
    },
    // Triadic Ballet colors
    triadicBallet: {
      'Deep Orange': '#F57C00',
      'Pale Yellow': '#FFEE58',
      'Amber': '#FFCA28',
      'Coral': '#FF7043',
      'Marigold': '#FFC107',
      'Vermilion': '#FF5722',
      'Deep Purple': '#5E35B1',
      'Royal Purple': '#673AB7',
      'Indigo': '#3949AB',
      'Sky Blue': '#42A5F5',
      'Turquoise': '#00BCD4',
      'Pale Pink': '#F8BBD0',
      'Lilac': '#CE93D8',
      'Medium Purple': '#AB47BC',
      'Cerise': '#E91E63',
      'Magenta': '#9C27B0',
      'Forest Green': '#388E3C',
      'Light Green': '#66BB6A',
      'Kelly Green': '#4CAF50',
      'Light Gray': '#BDBDBD',
      'Slate Gray': '#78909C',
      'Blue Gray': '#607D8B'
    },
    // De Stijl colors
    deStijl: {
      'Bright Red': '#F50101',
      'Cobalt Blue': '#0200F1',
      'Lemon Yellow': '#F9FF4C',
      'Pure Red': '#FF0000',
      'Pure Blue': '#0000FF',
      'Pure Yellow': '#FFFF00',
      'Medium Gray': '#808080',
      'Light Gray': '#D3D3D3',
      'Dark Gray': '#404040',
      'Orange': '#FFA500',
      'Green': '#008000',
      'Purple': '#800080',
      'Indian Red': '#CD5C5C',
      'Steel Blue': '#4682B4',
      'Goldenrod': '#DAA520'
    },
    // Gold and Silver
    goldSilver: {
      'Gold': 'linear-gradient(135deg, gold 0%, #fffec1 45%, #fffec1 55%, #e4c200 100%)',
      'Silver': 'linear-gradient(135deg, silver 0%, #FFF 45%, #FFF 55%, silver 100%)'
    },
    // Original
    original: {
      'White': '#FFFFFF',
      'Black': '#000000'
    }
  }), []);
  
  // Wrap traitOptions in useMemo to prevent dependency changes on every render
  const traitOptions = React.useMemo<TraitOptions>(() => ({
    artStyle: [
      ArtStyle.ORIGINAL,
      ArtStyle.ORIGINAL_INVERSE,
      ArtStyle.GOLD_SILVER,
      ArtStyle.PRIMARY,
      ArtStyle.DANCE,
      ArtStyle.TRIADIC_BALLET,
      ArtStyle.HOMAGE_DE_STIJL,
      ArtStyle.GRADIENT_RADIAL,
      ArtStyle.GRADIENT_ANGLED,
      ArtStyle.PUNKISM
    ],
    faceColors: {
      [ArtStyle.ORIGINAL]: ['White'],
      [ArtStyle.ORIGINAL_INVERSE]: ['Black'],
      [ArtStyle.GOLD_SILVER]: ['Gold', 'Silver'],
      [ArtStyle.PRIMARY]: Object.keys(bauhausColors.bauhausPrimary),
      [ArtStyle.DANCE]: Object.keys(bauhausColors.bauhausDance),
      [ArtStyle.TRIADIC_BALLET]: Object.keys(bauhausColors.triadicBallet),
      [ArtStyle.HOMAGE_DE_STIJL]: Object.keys(bauhausColors.deStijl),
      [ArtStyle.GRADIENT_RADIAL]: Object.keys(bauhausColors.bauhausPrimary),
      [ArtStyle.GRADIENT_ANGLED]: Object.keys(bauhausColors.bauhausPrimary),
      [ArtStyle.PUNKISM]: Object.keys(bauhausColors.bauhausPrimary)
    },
    backgroundColors: {
      [ArtStyle.ORIGINAL]: ['Black'],
      [ArtStyle.ORIGINAL_INVERSE]: ['White'],
      [ArtStyle.GOLD_SILVER]: ['Black'],
      [ArtStyle.PRIMARY]: ['Black'],
      [ArtStyle.DANCE]: ['Black'],
      [ArtStyle.TRIADIC_BALLET]: ['Black'],
      [ArtStyle.HOMAGE_DE_STIJL]: ['Black'],
      [ArtStyle.GRADIENT_RADIAL]: ['Black'],
      [ArtStyle.GRADIENT_ANGLED]: ['Black'],
      [ArtStyle.PUNKISM]: ['Black']
    },
    hasGlitch: [true, false]
  }), [bauhausColors]);
  
  // Function to get eye color based on art style
  const getEyeColor = useCallback((artStyle: ArtStyle, colorName: string): string => {
    // For most styles, use blue (as in the original)
    if (artStyle === ArtStyle.ORIGINAL || artStyle === ArtStyle.ORIGINAL_INVERSE) {
      return '#1E88E5'; // Default blue
    } else if (artStyle === ArtStyle.GOLD_SILVER) {
      return '#1E88E5'; // Blue for Gold/Silver
    } else if (artStyle === ArtStyle.PRIMARY) {
      // For primary style, randomly use face color or blue
      const random = Math.random();
      return random > 0.5 ? '#1E88E5' : bauhausColors.bauhausPrimary[colorName] || '#1E88E5';
    } else if (artStyle === ArtStyle.DANCE) {
      // For dance, use a contrasting color from the palette
      const colors = ['#303F9F', '#D32F2F', '#FFEB3B', '#66BB6A'];
      return colors[Math.floor(Math.random() * colors.length)];
    } else if (artStyle === ArtStyle.TRIADIC_BALLET) {
      // For triadic ballet, use a cool tone
      const colors = ['#5E35B1', '#3949AB', '#42A5F5', '#00BCD4'];
      return colors[Math.floor(Math.random() * colors.length)];
    } else if (artStyle === ArtStyle.HOMAGE_DE_STIJL) {
      // For de stijl, use primary colors
      const colors = ['#0200F1', '#F50101', '#F9FF4C'];
      return colors[Math.floor(Math.random() * colors.length)];
    } else {
      // Default to blue for other styles
      return '#1E88E5';
    }
  }, [bauhausColors]);
  
  // Function to generate a random NFT variant with enhanced randomization
  const generateRandomNFT = useCallback(() => {
    console.log("generateRandomNFT called");
    
    // Early return if already generating
    if (isGenerating) {
      console.log("Already generating, skipping");
      return;
    }
    
    // Set generating state first
    setIsGenerating(true);
    
    // Create a local variable for the NFT to avoid state dependencies
    let newNFT: GeneratedNFT | null = null;
    
    // Create the NFT object synchronously without state updates
    try {
      // Select an art style without complex shuffling
      const artStyleIndex = Math.floor(Math.random() * traitOptions.artStyle.length);
      const artStyle = traitOptions.artStyle[artStyleIndex];
      
      // Get face color options for the selected art style and pick one
      const faceColorOptions = traitOptions.faceColors[artStyle];
      const faceColorIndex = Math.floor(Math.random() * faceColorOptions.length);
      const faceColor = faceColorOptions[faceColorIndex];
      
      // Randomly select background color
      const backgroundColorOptions = traitOptions.backgroundColors[artStyle];
      const backgroundColor = backgroundColorOptions[Math.floor(Math.random() * backgroundColorOptions.length)];
      
      // Create traits object
      const randomTraits: NFTTraits = {
        artStyle: artStyle,
        faceColor: faceColor,
        backgroundColor: backgroundColor,
        hasGlitch: Math.random() < 0.15
      };
      
      // Create the NFT object
      newNFT = {
        id: Math.floor(Math.random() * 10000),
        traits: randomTraits,
        name: `Bauhaus Signet`,
      };
      
      console.log("Generated NFT:", newNFT);
    } catch (error) {
      console.error("Error generating NFT:", error);
      setIsGenerating(false);
      return;
    }
    
    // Use a single setTimeout for both state updates
    setTimeout(() => {
      setGeneratedNFT(newNFT);
      setIsGenerating(false);
    }, 500);
  }, [traitOptions, isGenerating]);
  
  // Function to get face color based on art style and color name
  const getFaceColor = useCallback((artStyle: ArtStyle, colorName: string): string => {
    if (artStyle === ArtStyle.ORIGINAL) {
      return '#FFFFFF';
    } else if (artStyle === ArtStyle.ORIGINAL_INVERSE) {
      return '#000000';
    } else if (artStyle === ArtStyle.GOLD_SILVER) {
      // Use direct colors instead of URL references which might be problematic
      return colorName === 'Gold' ? '#FFD700' : '#C0C0C0';
    } else if (artStyle === ArtStyle.PRIMARY) {
      return bauhausColors.bauhausPrimary[colorName] || '#E53935';
    } else if (artStyle === ArtStyle.DANCE) {
      return bauhausColors.bauhausDance[colorName] || '#303F9F';
    } else if (artStyle === ArtStyle.TRIADIC_BALLET) {
      return bauhausColors.triadicBallet[colorName] || '#F57C00';
    } else if (artStyle === ArtStyle.HOMAGE_DE_STIJL) {
      return bauhausColors.deStijl[colorName] || '#F50101';
    } else {
      // Default to Bauhaus red for other styles
      return '#E53935';
    }
  }, [bauhausColors]);
  
  // Generate an initial NFT on component mount
  useEffect(() => {
    // Only generate on initial mount, not on every re-render
    const shouldGenerate = !generatedNFT && !isGenerating;
    if (shouldGenerate) {
      generateRandomNFT();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally keeping an empty dependency array to run only once on mount
  
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Preview column */}
        <div className="md:col-span-7">
          <div className="sticky top-24">
            <div className="aspect-square w-full relative overflow-hidden rounded-md border border-white/20 bg-[#030303]">
              <BauhausDesign />
              {!isConnected && (
                <div 
                  className="absolute inset-0 backdrop-blur-[2px] flex justify-center items-center cursor-pointer z-10"
                  onClick={() => {
                    try {
                      open({ view: 'Connect' });
                    } catch (error) {
                      console.error('Error opening wallet modal:', error);
                    }
                  }}
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-black/85 border border-white/10 rounded-md py-3 px-6"
                  >
                    <div className="text-xl font-bold text-white mb-2">Connect Wallet</div>
                    <div className="text-white/70 text-sm">Connect to generate your Bauhaus signet</div>
                  </motion.div>
                </div>
              )}
              
              {isMinting && (
                <div className="absolute inset-0 backdrop-blur-[1px] flex justify-center items-center z-10 bg-black/40">
                  <div className="bg-black/90 border border-white/10 rounded-md p-5">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-3 w-10 h-10 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
                      <div className="text-xl font-medium text-white">Minting your NFT...</div>
                      <div className="text-white/70 text-sm mt-1">Please confirm in your wallet</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-white/60 text-sm text-center">
              {isConnected ? 
                "Your unique Bauhaus-inspired signet" : 
                "Connect wallet to generate your unique Bauhaus-inspired signet"
              }
            </div>
          </div>
        </div>
        
        {/* Info/Controls column */}
        <div className="md:col-span-5 flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">Bauhaus Signet</h2>
          <p className="text-white/70 mb-6">
            Each NFT features a unique generative signet inspired by the principles of
            Bauhaus design and the work of Oskar Schlemmer.
          </p>
          
          <div className="mb-6 bg-white/5 rounded-md p-4">
            <h3 className="text-lg font-medium text-white mb-2">About This Collection</h3>
            <ul className="text-white/70 text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>1,888 unique pieces commemorating Schlemmer&apos;s birth year</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1E88E5] mr-2">•</span>
                <span>Generative art with Bauhaus principles</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FDD835] mr-2">•</span>
                <span>Minted on Ethereum</span>
              </li>
            </ul>
          </div>
          
          <div className="flex-1"></div>
          
          <div className="space-y-4 mt-auto">
            <div className="text-white/70 text-sm">
              Price: <span className="text-white font-medium">0.08 ETH</span>
            </div>
            {isConnected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-white/5 rounded border border-white/10 text-sm text-white/80"
              >
                Your unique Bauhaus signet is ready to mint. Each piece honors the legacy of Oskar Schlemmer through geometric abstraction and bold colors.
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Toasts */}
      <TransactionToast 
        showSuccess={mintSuccess}
        showError={!!mintError}
        transactionHash={mintTxHash}
        errorMessage={mintError || "Transaction failed"}
      />
    </div>
  );
}

// Attribute display component - keeping for backward compatibility
function AttributeCard({ label, value, color }: { label: string, value: string, color?: string }) {
  return (
    <div 
      className="bg-white/5 p-3 border border-white/10 fade-in"
    >
      <div className="text-white/50 text-xs uppercase mb-1">{label}</div>
      <div className="flex items-center">
        {color && (
          <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: color }}></div>
        )}
        <div className="text-white font-medium">{value}</div>
      </div>
    </div>
  );
}

// Simplified attribute card with no animation dependencies
function SimpleAttributeCard({ label, value, colorHex }: { label: string, value: string, colorHex?: string }) {
  return (
    <div className="bg-white/5 p-3 border border-white/10">
      <div className="text-white/50 text-xs uppercase mb-1">{label}</div>
      <div className="flex items-center">
        {colorHex && (
          <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: colorHex }}></div>
        )}
        <div className="text-white font-medium">{value}</div>
      </div>
    </div>
  );
} 