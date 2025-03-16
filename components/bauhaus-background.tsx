"use client";

import { useEffect, useRef } from 'react';

export default function BauhausBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };
    
    const draw = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Bauhaus colors
      const colors = ['#E53935', '#1E88E5', '#FDD835', '#000000'];
      
      // Draw geometric patterns
      for (let i = 0; i < 15; i++) {
        const size = Math.random() * 120 + 30;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.1;
        
        // Draw random shapes
        const shape = Math.floor(Math.random() * 3);
        
        if (shape === 0) {
          // Circle
          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (shape === 1) {
          // Rectangle
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        } else {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(x, y - size / 2);
          ctx.lineTo(x + size / 2, y + size / 2);
          ctx.lineTo(x - size / 2, y + size / 2);
          ctx.closePath();
          ctx.fill();
        }
      }
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 bg-gray-50"
    />
  );
} 