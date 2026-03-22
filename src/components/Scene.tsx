'use client';

import { Canvas } from '@react-three/fiber';
import Model from './Model';

export default function Scene() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }} 
        gl={{ antialias: true }}
        style={{ background: '#000000' }}
      >
        {/* We don't need lights for simple particles, they emit their own color */}
        <Model />
      </Canvas>
    </div>
  );
}