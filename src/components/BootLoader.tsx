'use client';

import { useState, useEffect } from 'react';

export default function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show the orbital animation for 1.5 seconds before starting exit sequence
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Wait for the exit animation (0.6s) to finish before unmounting
      setTimeout(onComplete, 600);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.7, 0, 0.3, 1)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(20)' : 'scale(1)',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      <style>{`
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .orbital-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(0, 204, 255, 0.4);
          box-shadow: 0 0 15px rgba(0, 204, 255, 0.2), inset 0 0 15px rgba(0, 204, 255, 0.1);
        }
        .outer-circle {
          width: 120px;
          height: 120px;
          animation: spin-cw 3s linear infinite;
          border-top-color: #00ccff;
          border-bottom-color: #00ccff;
        }
        .inner-circle {
          width: 80px;
          height: 80px;
          animation: spin-ccw 2s linear infinite;
          border-left-color: #00ccff;
          border-right-color: #00ccff;
        }
      `}</style>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="orbital-circle outer-circle"></div>
        <div className="orbital-circle inner-circle"></div>
      </div>
    </div>
  );
}
