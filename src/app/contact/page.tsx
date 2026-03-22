'use client';

import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

export default function ContactPage() {
  
  // Reusable hover effect styles for the links
  const linkStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: 'rgba(0, 255, 102, 0.05)',
    border: '1px solid rgba(0, 255, 102, 0.2)',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  return (
    <main style={{ width: '100%', minHeight: '100vh', position: 'relative', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      <Cursor />
      <Navbar />
      
      {/* 3D Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Scene />
      </div>

      {/* Main Content Terminal */}
      <div style={{ 
          zIndex: 10, width: '90%', maxWidth: '650px', 
          background: 'rgba(10, 15, 20, 0.8)', border: '1px solid rgba(0, 255, 102, 0.4)', 
          padding: '50px', borderRadius: '8px', backdropFilter: 'blur(10px)', 
          boxShadow: '0 0 50px rgba(0,0,0,0.8)' 
      }}>
        
        <h1 style={{ fontSize: '2rem', fontFamily: 'monospace', color: '#00ff66', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '40px', letterSpacing: '4px', textAlign: 'center' }}>
          // CONTACT_DETAILS
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* EMAIL */}
            <a 
                href="mailto:aumkar1104@gmail.com" 
                style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 102, 0.15)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,102,0.2)'; e.currentTarget.style.borderColor = '#00ff66'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 102, 0.05)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(0, 255, 102, 0.2)'; }}
            >
                <span style={{ color: '#00ff66', fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '2px' }}>[ EMAIL ]</span>
                <span style={{ color: 'white', fontFamily: 'monospace', fontSize: '1rem' }}>aumkar1104@gmail.com</span>
            </a>

            {/* MOBILE */}
            <a 
                href="tel:+917483971805" 
                style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 102, 0.15)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,102,0.2)'; e.currentTarget.style.borderColor = '#00ff66'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 102, 0.05)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(0, 255, 102, 0.2)'; }}
            >
                <span style={{ color: '#00ff66', fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '2px' }}>[ MOBILE ]</span>
                <span style={{ color: 'white', fontFamily: 'monospace', fontSize: '1rem' }}>+91-7483971805</span>
            </a>

            {/* LINKEDIN */}
            <a 
                href="https://linkedin.com/in/aumkar1104/" 
                target="_blank" rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 102, 0.15)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,102,0.2)'; e.currentTarget.style.borderColor = '#00ff66'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 102, 0.05)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(0, 255, 102, 0.2)'; }}
            >
                <span style={{ color: '#00ff66', fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '2px' }}>[ LINKEDIN ]</span>
                <span style={{ color: 'white', fontFamily: 'monospace', fontSize: '1rem' }}>/in/aumkar1104</span>
            </a>

            {/* GITHUB */}
            <a 
                href="https://github.com/aumkar1104" 
                target="_blank" rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 102, 0.15)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,102,0.2)'; e.currentTarget.style.borderColor = '#00ff66'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 102, 0.05)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(0, 255, 102, 0.2)'; }}
            >
                <span style={{ color: '#00ff66', fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '2px' }}>[ GITHUB ]</span>
                <span style={{ color: 'white', fontFamily: 'monospace', fontSize: '1rem' }}>/aumkar1104</span>
            </a>

        </div>
      </div>
    </main>
  );
}