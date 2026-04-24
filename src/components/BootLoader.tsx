'use client';

import { useState, useEffect } from 'react';

const BOOT_SEQUENCES = [
  '> MOUNTING_CORE_DRIVE',
  '> NEURAL_LINK_STABLE',
  '> ACCESS_GRANTED',
];

export default function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const newProgress = p + 2;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setFadeOut(true), 200);
          setTimeout(onComplete, 800);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentStep((step) => {
        if (step < BOOT_SEQUENCES.length - 1) {
          return step + 1;
        }
        clearInterval(textInterval);
        return step;
      });
    }, 900);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s ease-out',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px #00ff66, inset 0 0 20px rgba(0, 255, 102, 0.1); }
          50% { box-shadow: 0 0 40px #00ff66, inset 0 0 40px rgba(0, 255, 102, 0.2); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px #00ff66; }
          50% { text-shadow: 0 0 20px #00ff66, 0 0 30px #00ff66; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      <div
        style={{
          width: '400px',
          padding: '40px',
          border: '1px solid rgba(0, 255, 102, 0.3)',
          background: 'rgba(0, 0, 0, 0.8)',
          animation: 'glow-pulse 2s infinite',
        }}
      >
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: '#00ff66',
            letterSpacing: '3px',
            marginBottom: '30px',
            textShadow: '0 0 10px #00ff66',
          }}
        >
          AUMKAR.SYS // v2.026
        </div>

        <div style={{ marginBottom: '20px', minHeight: '80px' }}>
          {BOOT_SEQUENCES.slice(0, currentStep + 1).map((text, i) => (
            <div
              key={i}
              style={{
                fontFamily: 'monospace',
                fontSize: '1rem',
                color: i === currentStep ? '#00ff66' : '#00ff66',
                textShadow: '0 0 10px #00ff66',
                animation: i === currentStep ? 'text-glow 0.5s infinite' : 'none',
                marginBottom: '10px',
                opacity: i < currentStep ? 0.5 : 1,
              }}
            >
              {text}
              {i === currentStep && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '18px',
                    backgroundColor: '#00ff66',
                    marginLeft: '5px',
                    verticalAlign: 'middle',
                    animation: 'blink 0.5s infinite',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            width: '100%',
            height: '4px',
            background: 'rgba(0, 255, 102, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#00ff66',
              boxShadow: '0 0 10px #00ff66, 0 0 20px #00ff66',
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: '#666',
            marginTop: '15px',
            letterSpacing: '2px',
          }}
        >
          {progress}% COMPLETE
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}