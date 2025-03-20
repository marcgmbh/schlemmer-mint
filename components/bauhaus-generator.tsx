"use client";

import React, { useState, useEffect } from 'react';
import { Download, RefreshCw } from 'lucide-react';

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
  
  // Colors from the BauhausMetadata contract
  const bauhausColors: BauhausColors = {
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
  };
  
  // Trait options based on the BauhausMetadata contract
  const traitOptions: TraitOptions = {
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
  };
  
  // Function to get eye color based on art style
  const getEyeColor = (artStyle: ArtStyle, colorName: string): string => {
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
  };
  
  // Function to generate a random NFT variant with enhanced randomization
  const generateRandomNFT = () => {
    console.log("generateRandomNFT called");
    setIsGenerating(true);
    
    // Clear previous NFT to avoid any visual persistence
    setGeneratedNFT(null);
    
    // Super-strong entropy with multiple sources of randomness
    const timestamp = Date.now();
    const entropy = Math.random().toString(36) + Math.random().toString(36);
    console.log(`Generation entropy: ${timestamp}-${entropy}`);
    
    // Fisher-Yates shuffle to randomize art style selection
    const shuffledStyles = [...traitOptions.artStyle];
    for (let i = shuffledStyles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledStyles[i], shuffledStyles[j]] = [shuffledStyles[j], shuffledStyles[i]];
    }
    
    // Select an art style from the shuffled array - completely random
    // We'll select from different positions each time to ensure variety
    const stylePosition = Math.floor(Math.random() * shuffledStyles.length);
    const artStyle = shuffledStyles[stylePosition];
    console.log("Shuffled art styles:", shuffledStyles);
    console.log("Selected art style:", artStyle, "at position", stylePosition);
    
    // Get face color options for the selected art style
    const faceColorOptions = traitOptions.faceColors[artStyle];
    
    // Shuffle the face color options for true randomness
    const shuffledFaceColors = [...faceColorOptions];
    for (let i = shuffledFaceColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledFaceColors[i], shuffledFaceColors[j]] = [shuffledFaceColors[j], shuffledFaceColors[i]];
    }
    
    // Randomly select face color with enhanced randomness
    const faceColorIndex = Math.floor(Math.random() * shuffledFaceColors.length);
    const faceColor = shuffledFaceColors[faceColorIndex];
    console.log("Shuffled face colors:", shuffledFaceColors);
    console.log("Selected face color:", faceColor, "at position", faceColorIndex);
    
    // Randomly select background color
    const backgroundColorOptions = traitOptions.backgroundColors[artStyle];
    const backgroundColor = backgroundColorOptions[Math.floor(Math.random() * backgroundColorOptions.length)];
    
    // Randomly select traits with enhanced entropy
    const randomTraits: NFTTraits = {
      artStyle: artStyle,
      faceColor: faceColor,
      backgroundColor: backgroundColor,
      // Increase glitch frequency to 15% for more variety
      hasGlitch: Math.random() < 0.15
    };
    
    // Create the NFT object - keep ID only for internal reference
    const newNFT: GeneratedNFT = {
      id: Math.floor(Math.random() * 10000), // Only for internal reference
      traits: randomTraits,
      name: `Bauhaus Signet`,
    };
    
    // Log the generated NFT for debugging
    console.log("Generated NFT:", newNFT);
    
    // Shorter delay for better UX
    setTimeout(() => {
      setGeneratedNFT(newNFT);
      setIsGenerating(false);
    }, 600);
  };
  
  // Generate an initial NFT on component mount
  useEffect(() => {
    generateRandomNFT();
  }, []);
  
  // Function to get face color based on art style and color name
  const getFaceColor = (artStyle: ArtStyle, colorName: string): string => {
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
  };
  
  // Add debugging useEffect
  useEffect(() => {
    if (generatedNFT) {
      console.log("Rendering NFT:", generatedNFT);
      console.log("Face color:", getFaceColor(generatedNFT.traits.artStyle, generatedNFT.traits.faceColor));
      
      // Check DOM for SVG
      setTimeout(() => {
        const svgElement = document.querySelector('.bauhaus-signet-svg');
        console.log("SVG element found:", svgElement);
        
        // Check size of container
        const container = document.querySelector('.nft-preview-container');
        if (container) {
          console.log("Container dimensions:", container.getBoundingClientRect());
        }
      }, 300);
    }
  }, [generatedNFT]);
  
  return (
    <div className="w-full py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Generate Your Own Signet</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore official Bauhaus Signet variations from the Ethereum contract. 
            Generate random combinations matching the on-chain collection that honors Oskar Schlemmer's iconic design.
          </p>
        </div>
        
        {/* Simplified layout - Just SVG and buttons */}
        <div className="flex flex-col items-center space-y-8">
          {/* SVG Preview - Larger size (400px) */}
          <div className="relative w-[400px] h-[400px] border border-white/10">
            {isGenerating ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="w-16 h-16 animate-spin">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-[#1E88E5] rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FDD835] rounded-full"></div>
                  <div className="w-full h-full rounded-full border border-white/20"></div>
                </div>
              </div>
            ) : generatedNFT ? (
              <div className="w-full h-full relative">
                {/* Background */}
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    backgroundColor: generatedNFT.traits.backgroundColor === 'White' ? '#FFFFFF' : '#000000',
                  }}
                ></div>
                
                {/* Simple SVG implementation */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1337 1337" 
                  className="absolute inset-0 w-full h-full"
                  id="bauhaus-signet"
                >
                  {/* Background circle */}
                  <circle 
                    cx="668.5" 
                    cy="668.5" 
                    r="628" 
                    fill={generatedNFT.traits.backgroundColor === 'White' ? '#FFFFFF' : '#000000'} 
                  />
                  
                  {/* Neck */}
                  <path 
                    d="M592.85 1147.5h146.83v147.25H592.85z" 
                    fill={getFaceColor(generatedNFT.traits.artStyle, generatedNFT.traits.faceColor)}
                  />
                  
                  {/* Mouth */}
                  <path 
                    d="M792.68 810.36v345.25H502.1v-15.24h234.64V964.74h-58.31v-25.59h58.31V810.36z" 
                    fill={generatedNFT.traits.artStyle === ArtStyle.ORIGINAL_INVERSE ? '#000000' : '#FFFFFF'}
                  />
                  
                  {/* Nose */}
                  <path 
                    d="M819.52 807.07v8.53H680.53v-8.53h105.43l.28-753.56 33 7z" 
                    fill={getFaceColor(generatedNFT.traits.artStyle, generatedNFT.traits.faceColor)}
                  />
                  
                  {/* Eye */}
                  <path 
                    d="M647.25 255.71v317.7h-10.63v-119.7H445.89V266.34H330.22v-10.63z" 
                    fill={getEyeColor(generatedNFT.traits.artStyle, generatedNFT.traits.faceColor)}
                  />
                  
                  {/* Circle border */}
                  <circle 
                    cx="668.5" 
                    cy="668.5" 
                    r="628" 
                    strokeWidth="10"
                    stroke={generatedNFT.traits.artStyle === ArtStyle.GOLD_SILVER 
                      ? (generatedNFT.traits.faceColor === 'Gold' ? '#FFD700' : '#C0C0C0') 
                      : '#FDD835'}
                    fill="none"
                  />
                </svg>
                
                {/* Optional: Simple glitch effect */}
                {generatedNFT.traits.hasGlitch && (
                  <div className="absolute inset-0" style={{ 
                    mixBlendMode: 'color-dodge',
                    filter: 'drop-shadow(3px 3px 0 red) drop-shadow(-3px -3px 0 cyan)',
                    opacity: 0.5
                  }}></div>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-black text-white/50">
                Initializing generator...
              </div>
            )}
          </div>
          
          {/* Generate and Mint buttons */}
          <div className="w-[400px] space-y-4">
            <button 
              className="w-full px-6 py-4 bg-black border border-white/20 hover:border-primary/60 text-white font-medium uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
              onClick={() => {
                // Force full regeneration with each click
                console.log("Generate button clicked");
                generateRandomNFT();
              }}
              disabled={isGenerating}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              <span>Generate Random Variation</span>
            </button>
            
            {/* Mint button */}
            <button 
              className="w-full px-6 py-4 bg-primary/10 border border-primary hover:bg-primary/20 text-white font-medium uppercase tracking-wider flex items-center justify-center transition-colors"
              disabled={isGenerating || !generatedNFT}
              onClick={() => {
                if (generatedNFT) {
                  console.log("Mint button clicked");
                  // This would connect to wallet and mint NFT in a real implementation
                  alert("This would mint the Bauhaus Signet in a real implementation");
                }
              }}
            >
              <span>Mint Bauhaus Signet</span>
            </button>
          </div>
        </div>
      </div>
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