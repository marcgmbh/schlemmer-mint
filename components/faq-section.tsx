"use client";

import React, { useState } from 'react';
import { Plus, Minus } from "lucide-react";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqItems: FAQItem[] = [
  {
    question: "What is the Bauhaus Signet NFT?",
    answer: (
      <div className="space-y-2">
        <p>
          The Bauhaus Signet NFT is a digital collectible representing Oskar Schlemmer's 
          iconic 1923 Bauhaus logo design - now preserved on the blockchain as fully onchain SVG renditions.
        </p>
        <p>
          Each NFT is a unique interpretation of the original signet, with subtle variations in composition, 
          color, and form while maintaining the core Bauhaus aesthetic principles.
        </p>
      </div>
    )
  },
  {
    question: "How is this connected to Oskar Schlemmer?",
    answer: (
      <div className="space-y-2">
        <p>
          This is an authorized collaboration with The Oskar Schlemmer Theatre Archives, 
          ensuring authenticity and respect for Schlemmer's original work.
        </p>
        <p>
          A portion of all proceeds supports the preservation of Schlemmer's legacy and helps 
          fund ongoing efforts to save his studio space for future generations.
        </p>
      </div>
    )
  },
  {
    question: "What makes these NFTs special?",
    answer: (
      <div className="space-y-2">
        <p>
          Unlike many NFTs that rely on external storage, the Bauhaus Signet is 100% onchain - the artwork 
          exists entirely within the Ethereum blockchain, ensuring permanent preservation.
        </p>
        <p>
          Each piece connects the iconic Bauhaus design principles of the 1920s with contemporary 
          blockchain technology, bridging historical art movements with the digital future.
        </p>
      </div>
    )
  },
  {
    question: "How can I use my Bauhaus Signet NFT?",
    answer: (
      <div className="space-y-2">
        <p>
          As an owner, you receive the digital NFT, grants you a non-exclusive, personal use license for the digital artwork.
          The Bauhaus emblem is in the public domain, but the trademark rights are owned by C. Raman Schlemmer.
          Each NFT provides a non-exclusive, personal use license for the digital artwork, with all intellectual property rights retained by the trademark holders.
        </p>
        <p>
          You become part of a community of art history enthusiasts and collectors supporting 
          the preservation of Schlemmer's work and Bauhaus design heritage.
        </p>
      </div>
    )
  },
  {
    question: "Where do proceeds from sales go?",
    answer: (
      <div className="space-y-2">
        <p>
          A significant percentage of primary sales and royalties goes directly to The Oskar Schlemmer Theatre Archives 
          to support their preservation and educational efforts.
        </p>
        <p>
          Part of the proceeds also funds the campaign to save Schlemmer's original studio space, which is 
          currently at risk of being lost to commercial development.
        </p>
      </div>
    )
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="my-16 faq-section">
      <div className="bg-black/30 border border-white/10 p-8 rounded-lg">
        <h2 className="text-3xl mb-8 font-bold text-primary">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`border-l-4 transition-all duration-300 ${
                openIndex === index 
                  ? 'border-primary bg-black/40 shadow-lg' 
                  : 'border-white/20 bg-black/20 hover:border-white/40'
              }`}
            >
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className={`text-xl ${openIndex === index ? 'font-medium text-primary' : 'text-gray-300'}`}>
                  {item.question}
                </h3>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-primary" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-400" />
                  )}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-300">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
