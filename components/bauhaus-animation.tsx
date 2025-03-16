"use client";

import React from 'react';

// A much simpler version without Framer Motion to test if that's causing issues
export function BauhausAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`absolute rounded-full ${
            ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-black', 'bg-red-500'][i]
          }`}
          style={{
            width: `${(i + 1) * 40}px`,
            height: `${(i + 1) * 40}px`,
            top: `${20 + i * 10}%`,
            left: `${20 + i * 10}%`,
            opacity: 0.1,
          }}
        />
      ))}
      
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`line-${i}`}
          className="absolute bg-gray-800"
          style={{
            height: i % 2 === 0 ? '2px' : '100%',
            width: i % 2 === 0 ? '100%' : '2px',
            top: i % 2 === 0 ? `${(i / 4) * 100}%` : 0,
            left: i % 2 === 1 ? `${(i / 4) * 100}%` : 0,
            opacity: 0.03,
          }}
        />
      ))}
    </div>
  );
}