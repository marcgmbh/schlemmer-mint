"use client";

import React, { useEffect, useRef } from 'react';

export default function BauhausGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Make canvas full screen and handle resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Draw Bauhaus-inspired grid with human proportions
    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw primary grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      
      // Draw vertical lines
      const verticalSpacing = 40;
      for (let x = 0; x < canvas.width; x += verticalSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw horizontal lines
      const horizontalSpacing = 40;
      for (let y = 0; y < canvas.height; y += horizontalSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw golden ratio based design elements
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Golden ratio: 1.618
      const phi = 1.618;
      
      // Draw golden spiral points (very subtle)
      ctx.fillStyle = 'rgba(229, 57, 53, 0.01)';
      let a = 0;
      let b = 1;
      const maxPoints = 8;
      
      for (let i = 0; i < maxPoints; i++) {
        const radius = 5 * Math.pow(phi, i/2);
        const angle = 0.5 * Math.PI * i;
        
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // Draw single vertical line at center (representing the human figure)
      ctx.strokeStyle = 'rgba(229, 57, 53, 0.01)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, canvas.height);
      ctx.stroke();
      
      // Draw horizontal line at golden ratio height
      ctx.beginPath();
      ctx.moveTo(0, centerY * phi / (phi + 1));
      ctx.lineTo(canvas.width, centerY * phi / (phi + 1));
      ctx.stroke();
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 -z-20 opacity-100"
    />
  );
} 