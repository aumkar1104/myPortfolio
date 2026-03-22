export const moduleData = {
  '01': {
    title: 'PARTICLE SYSTEMS',
    subtitle: 'High-Performance Rendering',
    description: 'Rendering thousands of individual 3D objects (like spheres) will crash a browser instantly. To create the starfield in this site, we used "Instanced Rendering" via React Three Fiber. This allows the GPU to draw 5,000 points in a single draw call, maintaining 60FPS.',
    code: `// The "Starfield" Logic
const particleCount = 5000;
const positions = new Float32Array(particleCount * 3);

// Create random X, Y, Z coordinates
for(let i = 0; i < particleCount; i++) {
  positions[i] = (Math.random() - 0.5) * 25;
}

// Render as a single <points> object
return (
  <points>
    <bufferGeometry>
      <bufferAttribute 
        attach="attributes-position" 
        array={positions} 
        itemSize={3} 
      />
    </bufferGeometry>
    <pointsMaterial size={0.03} color="white" />
  </points>
)`
  },
  '02': {
    title: 'PHYSICS & LERP',
    subtitle: 'Simulating Weight',
    description: 'The asteroid cursor feels heavy because it does not follow your mouse instantly. We use Linear Interpolation (Lerp) and a delay loop to create "drag." The tail consists of 12 separate DOM elements that follow the leader with increasing delay, creating a fluid comet trail.',
    code: `// The "Comet Tail" Logic
trailRef.current.forEach((dot, index) => {
  // Higher index = longer delay = longer tail
  const delay = index * 2; 
  
  setTimeout(() => {
    if (dot) {
       // Move particle to where mouse WAS
       dot.style.transform = \`translate3d(\${x}px, \${y}px, 0)\`;
       // Fade out the end of the tail
       dot.style.opacity = \`\${1 - (index / 15)}\`; 
    }
  }, delay * 10);
});`
  },
  '03': {
    title: 'GLASSMORPHISM',
    subtitle: 'CSS Backdrop Filters',
    description: 'To make the UI feel like it exists inside the 3D world, we use backdrop-filters. This blurs the WebGL canvas behind the HTML elements. We also use "mix-blend-mode: overlay" on the text to allow the bright stars to shine through the letters.',
    code: `// The "Frosted Glass" Style
const glassStyle = {
  background: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black
  backdropFilter: 'blur(10px)',     // Blurs the stars behind it
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  zIndex: 100 // Must sit on top of the Canvas
};

// The "Glowing Text" Style
const textStyle = {
  mixBlendMode: 'overlay', // Blends text with stars
  color: 'white',
  opacity: 0.9
};`
  },
  '04': {
    title: 'INTERACTIVITY',
    subtitle: 'React State & Transforms',
    description: 'Bridging the gap between 2D mouse events and 3D-feeling animations. We use simple React State to track which card is hovered, and then apply a CSS Transform with a cubic-bezier ease. This creates the "spring" physics effect when the cards lift up.',
    code: `// The "Hover Lift" Logic
const [hovered, setHovered] = useState(null);

<div 
  onMouseEnter={() => setHovered(id)}
  onMouseLeave={() => setHovered(null)}
  style={{
    // If hovered, lift up -10px. If not, go back to 0.
    transform: hovered === id ? 'translateY(-10px)' : 'translateY(0)',
    
    // Custom spring physics curve
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    
    // Glow effect
    background: hovered === id ? 'rgba(255,255,255,0.1)' : 'transparent'
  }}
/>`
  }
};