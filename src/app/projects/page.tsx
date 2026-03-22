'use client';

import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

export default function ProjectsPage() {
  
  const myProjects = [
    { 
        id: '01',
        name: 'ATLAS_ME', 
        date: 'OCT 2025', 
        desc: 'A cross-platform location journaling app that lets users save meaningful places with personal notes. Built on a real-time Firebase backend with secure authentication and Firestore for geospatial data storage. Features include interactive OpenStreetMap integration, triple-tap location saving, GPS-based auto-centering, and persistent map state across sessions. Implemented real-time data synchronization ensuring seamless cross-device access, user-specific data isolation through Firebase security rules, and optimized queries for efficient location retrieval.', 
        stack: ['Kotlin', 'Android (Jetpack Compose)', 'Firebase', 'OSMDroid', 'Google Location Services'],
        github: 'https://github.com/aumkar1104'
    },
    { 
        id: '02',
        name: 'SKYNOTE', 
        date: 'JUL 2025', 
        desc: 'SkyNote is a clean and intuitive voice-based note-taking app designed to make capturing ideas effortless. It allows users to record, transcribe, and store notes in real time, ensuring nothing important is missed. Built with a minimal, user-friendly interface and integrated with Firebase for secure storage, SkyNote combines functionality with simplicity. Its smart organization and seamless navigation enhance productivity, making it an ideal tool for fast, voice-driven note management.', 
        stack: ['Java', 'Android Studio', 'XML UI', 'Firebase', 'Speech-to-Text API', 'Material Design'],
        github: 'https://github.com/aumkar1104'
    }
  ];

  return (
    <main style={{ width: '100%', minHeight: '100vh', position: 'relative', background: '#050505', color: 'white' }}>
      
      <Cursor />
      <Navbar />
      
      {/* 3D Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Scene />
      </div>

      {/* Main Content - SURGICAL ANIMATION ADDED HERE */}
      <div style={{ 
          position: 'relative', zIndex: 10, 
          paddingTop: '150px', /* Your custom fixed padding */
          paddingBottom: '100px', 
          maxWidth: '1000px', width: '90%', margin: '0 auto',
          animation: 'cyber-boot 0.4s ease-out forwards' /* Safely animates ONLY the content */
      }}>
          
        {/* UPGRADED HEADING */}
        <div style={{ width: '100%', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '2.5rem', fontFamily: 'monospace', color: 'white', margin: 0, letterSpacing: '2px', fontWeight: '300' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ccff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(0,204,255,0.8))' }}>
                  <polyline points="13 17 18 12 13 7"></polyline>
                  <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
              FEATURED_WORK
              <span style={{ display: 'inline-block', width: '14px', height: '4px', background: '#00ccff', marginBottom: '4px', animation: 'blink 1s step-end infinite', boxShadow: '0 0 8px #00ccff' }}></span>
            </h1>
            <div style={{ fontFamily: 'monospace', color: '#666', letterSpacing: '2px', fontSize: '0.85rem' }}>
                [ SYSTEM LOGGED ]
            </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {myProjects.map((p, i) => (
            <div key={i} style={{ 
                background: 'rgba(10, 15, 20, 0.8)', 
                border: '1px solid rgba(0, 204, 255, 0.2)', 
                padding: '40px', 
                borderRadius: '8px', 
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                display: 'flex', flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 204, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(0, 204, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(0, 204, 255, 0.2)';
            }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                  <div>
                      <h2 style={{ margin: 0, fontSize: '2rem', color: 'white', letterSpacing: '1px' }}>{p.name}</h2>
                  </div>
                  <span style={{ color: '#00ccff', fontFamily: 'monospace', fontSize: '0.9rem', border: '1px solid #00ccff', padding: '5px 15px', borderRadius: '20px' }}>
                      {p.date}
                  </span>
              </div>
              
              <p style={{ color: '#ddd', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '30px' }}>
                  {p.desc}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginTop: 'auto' }}>
                  
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {p.stack.map(s => <span key={s} style={{ 
                          background: 'rgba(0,204,255,0.05)', color: '#00ccff', 
                          border: '1px solid rgba(0,204,255,0.3)', padding: '6px 12px', 
                          borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85rem' 
                      }}>{s}</span>)}
                  </div>
                  
                  <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ 
                      border: '1px solid #555', color: 'white', padding: '10px 20px', 
                      textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.9rem', 
                      transition: 'all 0.3s', borderRadius: '4px', whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => { 
                      e.currentTarget.style.borderColor = '#00ccff'; 
                      e.currentTarget.style.color = '#00ccff'; 
                      e.currentTarget.style.background = 'rgba(0,204,255,0.05)'; 
                  }}
                  onMouseLeave={(e) => { 
                      e.currentTarget.style.borderColor = '#555'; 
                      e.currentTarget.style.color = 'white'; 
                      e.currentTarget.style.background = 'transparent'; 
                  }}>
                      [ VIEW_REPOSITORY ]
                  </a>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Keeps the cursor blink animation working */}
      <style jsx>{`
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
      `}</style>
    </main>
  );
}