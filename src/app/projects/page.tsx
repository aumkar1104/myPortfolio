'use client';

import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

export default function ProjectsPage() {
  
  // --- EXACT CV DATA ---
  const myProjects = [
    { 
        name: 'ATLAS_ME', 
        date: 'OCT 2025', 
        desc: 'A location journaling app enabling users to save meaningful places with personal notes. Built with Firebase backend for real-time data sync, secure authentication, and geospatial storage. Features interactive OpenStreetMap integration, triple-tap saving, GPS auto-centering, and persistent map state. Implemented cross-device synchronization, user-specific data isolation, and optimized Firestore queries for efficient retrieval. Supports unlimited users with offline capability through intelligent caching.', 
        stack: ['Kotlin', 'Android (Jetpack Compose)', 'Firebase (Auth & Firestore)', 'OSMDroid', 'Google Location Services'],
        github: 'https://github.com/aumkar1104'
    },
    { 
        name: 'SKYNOTE', 
        date: 'JUL 2025', 
        desc: 'SkyNote is a clean and intuitive voice-based note-taking app designed to make capturing ideas effortless. It allows users to record, transcribe, and store notes in real time, ensuring nothing important is missed. Built with a minimal, user-friendly interface and integrated with Firebase for secure storage, SkyNote combines functionality with simplicity. Its smart organization and seamless navigation enhance productivity, making it an ideal tool for students and professionals who prefer fast, voice-driven note management.', 
        stack: ['Java', 'Android Studio', 'XML (UI Design)', 'Firebase Auth & Firestore', 'Speech-to-Text API', 'Material Design'],
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

      {/* Main Content - Using standard block layout to prevent Flexbox overflow bugs! */}
      <div style={{ 
          position: 'relative', 
          zIndex: 10, 
          paddingTop: '680px', /* Safely clears the navbar */
          paddingBottom: '100px', 
          maxWidth: '1000px', 
          width: '90%', 
          margin: '0 auto' /* Perfectly centers it horizontally without breaking vertical flow */
      }}>
          
        <h1 style={{ fontSize: '3rem', fontFamily: 'monospace', color: '#00ff66', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '50px', letterSpacing: '4px' }}>
          //PROJECT_DIRECTORY
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {myProjects.map((p, i) => (
            <div key={i} style={{ 
                background: 'rgba(10, 15, 20, 0.8)', 
                border: '1px solid rgba(0, 255, 102, 0.2)', 
                padding: '40px', 
                borderRadius: '8px', 
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,255,102,0.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}>
              
              {/* Title & Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                  <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'white', letterSpacing: '2px', fontWeight: '800' }}>{p.name}</h2>
                  <span style={{ color: '#00ff66', fontFamily: 'monospace', fontSize: '1rem', border: '1px solid #00ff66', padding: '5px 15px', borderRadius: '20px' }}>{p.date}</span>
              </div>
              
              {/* Description */}
              <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '30px' }}>{p.desc}</p>
              
              {/* Tech Stack Tags */}
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
                  {p.stack.map(s => <span key={s} style={{ 
                      background: 'rgba(0,255,102,0.05)', color: '#00ff66', border: '1px solid rgba(0,255,102,0.3)', 
                      padding: '8px 16px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem' 
                  }}>{s}</span>)}
              </div>
              
              {/* GitHub Link Button */}
              <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ 
                  display: 'inline-block', border: '1px solid #555', color: 'white', 
                  padding: '12px 24px', textDecoration: 'none', fontFamily: 'monospace', fontSize: '1rem', 
                  transition: 'all 0.3s', borderRadius: '4px' 
              }}
              onMouseEnter={(e) => { 
                  e.currentTarget.style.borderColor = '#00ff66'; 
                  e.currentTarget.style.color = '#00ff66'; 
                  e.currentTarget.style.background = 'rgba(0,255,102,0.05)';
              }}
              onMouseLeave={(e) => { 
                  e.currentTarget.style.borderColor = '#555'; 
                  e.currentTarget.style.color = 'white'; 
                  e.currentTarget.style.background = 'transparent';
              }}>
                  [ VIEW_SOURCE // GITHUB ]
              </a>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}