"use client";
import React, { useEffect, useRef } from 'react';

export const NeuralMagnifier = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowSize = 60; // Shrunk for precision

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - glowSize/2}px, ${y - glowSize/2}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(168, 85, 247, 0.12) 0%, transparent 100%)`;
      }
    };
    
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      {/* 1. High-Precision Neural Lens */}
      <div 
        ref={spotlightRef}
        className="fixed z-9999 pointer-events-none will-change-transform flex items-center justify-center"
        style={{
          width: glowSize,
          height: glowSize,
          borderRadius: '50%',
          /* BRIGHT LITE CORE */
          background: 'rgba(255, 255, 255, 0.6)', 
          boxShadow: `
            0 0 40px 10px rgba(168, 85, 247, 0.7), 
            0 0 80px 20px rgba(168, 85, 247, 0.2),
            inset 0 0 15px rgba(255, 255, 255, 0.9)
          `,
          border: '2.5px solid rgba(255, 255, 255, 1)', /* Solid Arctic White */
          backdropFilter: 'brightness(1.5) contrast(1.1) saturate(1.4)',
          left: 0,
          top: 0
        }}
      >
        {/* RETICLE EFFECTS */}
        <div className="absolute inset-0 border-[1.5px] border-dashed border-white/50 rounded-full animate-spin-slow opacity-80" />
        <div className="absolute inset-[30%] border-2 border-purple-400/40 rounded-full animate-pulse-fast" />
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" />
      </div>

      {/* 2. Soft Ambient Background Glow */}
      <div 
        ref={glowRef}
        className="fixed inset-0 z-9998 pointer-events-none"
      />

      <style jsx global>{`
        * {
          cursor: none !important;
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        .animate-pulse-fast {
          animation: pulse 1s ease-in-out infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </>
  );
};
