import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, useLayoutEffect, useState } from 'react'
import * as THREE from 'three'

export default function Model() {
  const points = useRef<THREE.Points>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // 1. Mouse Tracker (Same as before, keeps it interactive)
  useLayoutEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    window.addEventListener('mousemove', updateMouse)
    return () => window.removeEventListener('mousemove', updateMouse)
  }, [])

  // 2. Generate 5000 Random Particles (Stardust)
  const particleCount = 5000
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // Create a spread of particles across a wide area (Space)
      const x = (Math.random() - 0.5) * 25
      const y = (Math.random() - 0.5) * 25
      const z = (Math.random() - 0.5) * 25
      
      positions.set([x, y, z], i * 3)
    }
    
    return positions
  }, [])

  // 3. Animation Loop
  useFrame((state, delta) => {
    if (points.current) {
      // Slow, heavy rotation based on mouse (Cinematic feel)
      points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, mouse.y * 0.2, 0.02)
      points.current.rotation.y = THREE.MathUtils.lerp(points.current.rotation.y, mouse.x * 0.2, 0.02)
      
      // Constant slow drift (So it's never perfectly still)
      points.current.rotation.z += delta * 0.05
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}           // Tiny, elegant dots
        color="#ffffff"       // Pure white stars
        sizeAttenuation={true} // Makes distant stars look smaller
        transparent={true}
        opacity={0.8}
      />
    </points>
  )
}