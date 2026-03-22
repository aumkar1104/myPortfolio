'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// -- 1. The Explosion Component --
const StarExplosion = ({ x, y }: { x: number; y: number }) => {
  // Create 20 particles with random directions
  const particles = Array.from({ length: 20 }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / 20; // Radial spread
    const velocity = 100 + Math.random() * 150; // Random distance
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    return { id: i, tx, ty };
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: '4px',
            height: '4px',
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: '0 0 10px 2px white', // Glow
            animation: `explode 0.6s ease-out forwards`,
            // We use CSS variables to pass the random values to the keyframe
            // @ts-expect-error - Custom CSS properties are valid
            '--tx': `${p.tx}px`,
            // @ts-expect-error
            '--ty': `${p.ty}px`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes explode {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// -- 2. The Main Component --
export default function Work() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [explosion, setExplosion] = useState<{x: number, y: number} | null>(null);

  const modules = [
    { id: '01', title: 'PARTICLES', category: 'Three.js BufferGeometry' },
    { id: '02', title: 'PHYSICS', category: 'React Three Cannon' },
    { id: '03', title: 'SHADERS', category: 'GLSL & Raw Materials' },
    { id: '04', title: 'POST-FX', category: 'Bloom & Depth of Field' },
  ];

  const handleCardClick = (e: React.MouseEvent, id: string) => {
    // 1. Get click position
    const { clientX, clientY } = e;
    
    // 2. Trigger Explosion
    setExplosion({ x: clientX, y: clientY });

    // 3. Wait 500ms for animation, then navigate
    setTimeout(() => {
      router.push(`/modules/${id}`);
    }, 500);
  };

  return (
    <section style={{
      padding: '100px 40px',
      color: 'white',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {/* Render Explosion if active */}
      {explosion && <StarExplosion x={explosion.x} y={explosion.y} />}

      <h2 style={{
        fontSize: '1rem',
        letterSpacing: '4px',
        marginBottom: '60px',
        color: '#888',
        textTransform: 'uppercase',
        borderBottom: '1px solid #333',
        paddingBottom: '20px'
      }}>
        Learning Modules
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        {modules.map((module) => (
          <div 
            key={module.id}
            onClick={(e) => handleCardClick(e, module.id)}
            onMouseEnter={() => setHovered(module.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === module.id ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              border: hovered === module.id ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
              transform: hovered === module.id ? 'translateY(-10px)' : 'translateY(0px)',
              padding: '40px',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden' // Keeps the glow contained inside the card (optional)
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '20px' }}>
              /MODULE_{module.id}
            </div>
            <h3 style={{ fontSize: '2rem', margin: '0 0 10px 0', fontWeight: 'bold', color: 'white' }}>
              {module.title}
            </h3>
            <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem', fontFamily: 'monospace' }}>
              {`> ${module.category}`}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}