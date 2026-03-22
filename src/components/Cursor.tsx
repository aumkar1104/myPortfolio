'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // 1. Hide the default system cursor globally
    document.body.style.cursor = 'none';

    // 2. Track mouse movement
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Move the Main Asteroid (Instantly)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      // Move the Trail Particles (With calculated lag)
      trailRef.current.forEach((dot, index) => {
        // The higher the index, the more lag/delay it has
        const delay = index * 2; 
        setTimeout(() => {
          if (dot) {
             dot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
             // Fade out the tail as it moves
             dot.style.opacity = `${1 - (index / 15)}`; 
          }
        }, delay * 10);
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Cleanup when leaving the page
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* The Main Asteroid (Head) */}
      <div 
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: -6, // Center offset
          left: -6,
          width: '12px',
          height: '12px',
          backgroundColor: 'white',
          borderRadius: '50%',
          pointerEvents: 'none', // Lets clicks pass through
          zIndex: 9999, // Always on top
          boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)', // Glow effect
          mixBlendMode: 'difference' // Cool inversion effect over white cards
        }} 
      />

      {/* The Stardust Trail (12 particles) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRef.current[i] = el; }}
          style={{
            position: 'fixed',
            top: -3,
            left: -3,
            width: '6px',
            height: '6px',
            backgroundColor: '#aaa',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            transition: 'transform 0.1s linear', // Smooth movement
          }}
        />
      ))}
    </>
  );
}