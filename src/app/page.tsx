'use client';

import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import { useState, useEffect, useMemo } from 'react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // 1. OPTIMIZED SCROLL TRACKER
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ==========================================
  // BULLETPROOF ANIMATION MATH
  // ==========================================
  
  // 1. Hero: Fades out quickly (0 to 400px)
  const heroOpacity = Math.max(0, 1 - scrollY / 400);
  const warpScale = 1 + (scrollY * 0.005); 
  
  // 2. Profile: Fully visible from 800px to 2200px
  const dashboardOpacity = Math.min(1, Math.max(0, (scrollY - 800) / 300)) - Math.max(0, (scrollY - 2200) / 300);
  const dashboardLift = Math.max(0, 50 - (scrollY - 800) * 0.1); 
  
  // 3. Vault (Projects/Certs): Fully visible from 2200px to 3800px
  const vaultOpacity = Math.min(1, Math.max(0, (scrollY - 2200) / 300)) - Math.max(0, (scrollY - 3800) / 300);
  const vaultLift = Math.max(0, 100 - (scrollY - 2200) * 0.2);
  
  // 4. Contact Footer: Fully visible from 3800px onwards
  const footerOpacity = Math.min(1, Math.max(0, (scrollY - 3800) / 300));

  // ==========================================

  // 2. MEMOIZED SCENE
  const BackgroundScene = useMemo(() => (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      zIndex: -1, pointerEvents: 'none',
      transform: `scale(${warpScale})`, 
      transformOrigin: 'center center',
      transition: 'transform 0.1s linear',
      willChange: 'transform'
    }}>
      <Scene />
    </div>
  ), [warpScale]);

  // --- CV DATA ---
  const myProjects = [
    { 
        name: 'ATLAS_ME', 
        date: 'OCT 2025', 
        desc: 'A cross-platform location journaling app that lets users save meaningful places with personal notes. Built on a real-time Firebase backend with secure authentication and Firestore for geospatial data storage. Features include interactive OpenStreetMap integration, triple-tap location saving, GPS-based auto-centering, and persistent map state across sessions. Implemented real-time data synchronization ensuring seamless cross-device access, user-specific data isolation through Firebase security rules, and optimized queries for efficient location retrieval. The app combines intuitive UX with robust backend architecture, supporting unlimited users and locations while maintaining offline capability through intelligent caching.',  
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

  const myTrainings = [
    { name: 'ANDROID DEV PRO', issuer: 'Lovely Professional University', date: 'JUN 2025', desc: 'Hands-on development of apps from scratch. Implemented Firebase services for backend connectivity and deployed to Play Store.', stack: ['Teamwork', 'Deployment'] }
  ];

  const myCerts = [
    { name: 'GENERATIVE AI APPS', issuer: 'Udemy', date: 'JUL 2025' },
    { name: 'CLOUD COMPUTING', issuer: 'NPTEL', date: 'JUN 2025' },
    { name: 'RESPONSIVE WEB DESIGN', issuer: 'freeCodeCamp', date: 'APR 2023' },
  ];

  return (
    <main style={{ 
      width: '100%', 
      height: '5000px', // Locked pixel height for flawless scrolling
      position: 'relative', 
      background: 'transparent'
    }}>
      
      <Cursor />
      <Navbar />
      {BackgroundScene}

      <div id="about" style={{ position: 'absolute', top: '1500px' }} />
      <div id="work" style={{ position: 'absolute', top: '3000px' }} />
      <div id="contact" style={{ position: 'absolute', top: '4200px' }} />

      {/* --- SECTION 1: HERO --- */}
      <div style={{
          height: '100vh', width: '100%',
          position: 'fixed', top: 0, left: 0,
          zIndex: 10,
          opacity: heroOpacity, 
          pointerEvents: heroOpacity <= 0 ? 'none' : 'auto',
          willChange: 'opacity'
      }}>
        <div style={{ 
            width: '100%', height: '100%', position: 'relative',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            animation: 'cyber-boot 0.8s ease-out forwards' 
        }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '380px', height: '450px',
              opacity: isHovered ? 1 : 0, transition: 'opacity 0.8s ease-out', pointerEvents: 'none',
              zIndex: 0, borderRadius: '50%', overflow: 'hidden', boxShadow: 'inset 0 0 80px 60px rgba(0,0,0,0.9)',
            }}>
              <img src="/portrait.png" alt="Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isHovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 6s ease-out' }} />
            </div>
            <div 
              onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
              style={{ textAlign: 'center', cursor: 'default', zIndex: 20, padding: '60px', position: 'relative' }}
            >
              <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', margin: 0, letterSpacing: '-4px', fontWeight: '900', lineHeight: '0.9', color: 'white', opacity: isHovered ? 0 : 1, transition: 'opacity 0.6s ease' }}>
                A AUMKAR
              </h1>
              <p style={{ marginTop: '20px', fontSize: '1rem', letterSpacing: '8px', color: '#00ccff', textTransform: 'uppercase', opacity: isHovered ? 0 : 1, transition: 'opacity 0.4s ease' }}>
                CS Engineer
              </p>
            </div>
            
            {/* THE FIX: Forced 100% width with textAlign center for pixel-perfect alignment */}
            <div style={{
              position: 'absolute', bottom: '50px', width: '100%', textAlign: 'center',
              fontFamily: 'monospace', fontSize: '0.8rem', color: '#666', letterSpacing: '2px',
              opacity: isHovered ? 0 : 1, transition: 'opacity 0.5s', pointerEvents: 'none', animation: 'pulse 2s infinite'
            }}>
              {`> SYSTEM_LOCKED // SCROLL_TO_UNLOCK`}
              <span style={{ display: 'inline-block', width: '8px', height: '15px', backgroundColor: 'white', marginLeft: '10px', verticalAlign: 'middle', animation: 'blink 1s infinite' }}></span>
            </div>
        </div>
      </div>

      {/* --- SECTION 2: DASHBOARD (PROFILE) --- */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
        zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: dashboardOpacity,
        pointerEvents: dashboardOpacity <= 0 ? 'none' : 'auto', 
        willChange: 'opacity, transform'
      }}>
        <div style={{
            width: '90%', maxWidth: '1100px',
            border: '1px solid rgba(255,255,255,0.3)', 
            background: 'rgba(10, 15, 20, 0.6)', 
            backdropFilter: 'blur(15px)',
            padding: '50px', borderRadius: '4px', position: 'relative',
            transform: `translateY(${dashboardLift}px)`, 
            boxShadow: '0 0 80px rgba(0,0,0,0.8)'
        }}>
            <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '30px', height: '30px', borderTop: '4px solid white', borderLeft: '4px solid white' }}></div>
            <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '30px', height: '30px', borderBottom: '4px solid white', borderRight: '4px solid white' }}></div>

            <div style={{ 
                display: 'flex', justifyContent: 'space-between', 
                borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px', marginBottom: '40px', 
                fontFamily: 'monospace', color: '#aaa', fontSize: '0.9rem', letterSpacing: '1px'
            }}>
                <span>PROFILE: GENERAL</span>
                <span>STATUS: <span style={{color: '#00ff66', textShadow: '0 0 10px #00ff66'}}>ONLINE</span></span>
                <span>LOC: INDIA</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'start' }}>
                <div>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: '800', margin: '0 0 30px 0', lineHeight: '1', color: 'white', textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                        COMPUTER SCIENCE<br />ENGINEER
                    </h2>
                    <div style={{ color: '#eee', fontSize: '1.2rem', lineHeight: '1.8', fontFamily: 'monospace' }}>
                        <p style={{ marginBottom: '20px' }}>{`> 3rd Year B.Tech CSE Student at Lovely Professional University.`}</p>
                        <p>{`> A well-rounded developer with strong foundations in `} <span style={{ color: '#fff', borderBottom: '1px solid white'}}>Core Programming</span>{`, `} <span style={{ color: '#fff', borderBottom: '1px solid white'}}>Web Development</span>{`, and `} <span style={{ color: '#fff', borderBottom: '1px solid white'}}>Software Engineering</span>.</p>
                    </div>
                </div>
                
                <div>
                     <div style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#888', fontFamily: 'monospace', letterSpacing: '2px' }}>// TECHNICAL ARSENAL</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                        {['C++', 'JAVA', 'PYTHON', 'REACT.JS', 'NEXT.JS', 'THREE.JS', 'SQL', 'ANDROID'].map((skill) => (
                            <span key={skill} style={{
                                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                                padding: '10px 20px', fontSize: '0.85rem', color: 'white', fontFamily: 'monospace',
                                display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.2)', fontWeight: 'bold'
                            }}>
                                <span style={{ width: '8px', height: '8px', background: '#00ff66', borderRadius: '50%', boxShadow: '0 0 8px #00ff66' }}></span>
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#888', fontFamily: 'monospace', letterSpacing: '2px' }}>// TOOLS & PLATFORMS</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                        {['MYSQL', 'GIT', 'GITHUB', 'ANDROID DEV STUDIO', 'ATLASSIAN', 'SELENIUM IDE', 'ECLIPSE IDE'].map((tool) => (
                            <span key={tool} style={{
                                background: 'rgba(0, 204, 255, 0.05)', border: '1px solid rgba(0, 204, 255, 0.2)',
                                padding: '8px 16px', fontSize: '0.8rem', color: '#ddd', fontFamily: 'monospace',
                                display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '4px'
                            }}>
                                <span style={{ width: '6px', height: '6px', background: '#00ccff', borderRadius: '50%', boxShadow: '0 0 6px #00ccff' }}></span>
                                {tool}
                            </span>
                        ))}
                    </div>

                    <div style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#888', fontFamily: 'monospace', letterSpacing: '2px' }}>// SOFT SKILLS</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {['ADAPTABILITY', 'WORK ETHIC', 'STRONG SENSE OF RESPONSIBILITY'].map((skill) => (
                            <span key={skill} style={{
                                background: 'rgba(255, 51, 102, 0.05)', border: '1px solid rgba(255, 51, 102, 0.2)',
                                padding: '8px 16px', fontSize: '0.8rem', color: '#ddd', fontFamily: 'monospace',
                                display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '4px'
                            }}>
                                <span style={{ width: '6px', height: '6px', background: '#ff3366', borderRadius: '50%', boxShadow: '0 0 6px #ff3366' }}></span>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- SECTION 3: THE 3-COLUMN VAULT --- */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
        zIndex: 20,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: vaultOpacity,
        pointerEvents: vaultOpacity <= 0 ? 'none' : 'auto',
        transform: `translateY(${vaultLift}px)`, 
        willChange: 'opacity, transform',
        padding: '100px 40px',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px', width: '100%', maxWidth: '1400px', maxHeight: '80vh', overflowY: 'auto', paddingRight: '10px'
        }}>
            {/* COLUMN 1: PROJECTS (GREEN) */}
            <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '40px', borderRadius: '8px', height: 'fit-content' }}>
                <h3 style={{ fontFamily: 'monospace', color: '#00ff66', fontSize: '1.2rem', letterSpacing: '2px', borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '30px' }}>
                    // PROJECTS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    {myProjects.map((p, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                                <h4 style={{ color: 'white', fontSize: '1.5rem', margin: 0 }}>{p.name}</h4>
                                <span style={{ color: '#666', fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.date}</span>
                            </div>
                            <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '15px' }}>{p.desc}</p>
                            
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                                {p.stack.map(s => <span key={s} style={{ color: '#00ff66', border: '1px solid rgba(0,255,102,0.3)', background: 'rgba(0,255,102,0.05)', padding: '4px 10px', fontSize: '0.75rem', fontFamily: 'monospace', borderRadius: '4px' }}>{s}</span>)}
                            </div>

                            <a 
                                href={p.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block', alignSelf: 'flex-start',
                                    border: '1px solid #555', color: '#fff', textDecoration: 'none',
                                    fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '1px',
                                    padding: '8px 16px', borderRadius: '4px', transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.border = '1px solid #00ff66';
                                    e.currentTarget.style.color = '#00ff66';
                                    e.currentTarget.style.boxShadow = '0 0 15px rgba(0,255,102,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.border = '1px solid #555';
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                [ VIEW_SOURCE // GITHUB ]
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* COLUMN 2: TRAININGS (BLUE) */}
            <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '40px', borderRadius: '8px', height: 'fit-content' }}>
                <h3 style={{ fontFamily: 'monospace', color: '#00ccff', fontSize: '1.2rem', letterSpacing: '2px', borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '30px' }}>
                    // TRAININGS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    {myTrainings.map((t, i) => (
                        <div key={i}>
                            <h4 style={{ color: 'white', fontSize: '1.5rem', margin: '0 0 5px 0' }}>{t.name}</h4>
                            <div style={{ color: '#888', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '15px' }}>{t.issuer} | {t.date}</div>
                            <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '15px' }}>{t.desc}</p>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {t.stack.map(s => <span key={s} style={{ color: '#00ccff', border: '1px solid #00ccff', padding: '4px 10px', fontSize: '0.75rem', fontFamily: 'monospace', borderRadius: '20px' }}>{s}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* COLUMN 3: CERTIFICATIONS (RED) */}
            <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '40px', borderRadius: '8px', height: 'fit-content' }}>
                <h3 style={{ fontFamily: 'monospace', color: '#ff3366', fontSize: '1.2rem', letterSpacing: '2px', borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '30px' }}>
                    // CERTIFICATIONS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {myCerts.map((c, i) => (
                        <div key={i} style={{ borderLeft: '3px solid #ff3366', paddingLeft: '15px' }}>
                            <h4 style={{ color: 'white', fontSize: '1.2rem', margin: '0 0 5px 0' }}>{c.name}</h4>
                            <div style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '0.85rem' }}>{c.issuer}</div>
                            <div style={{ color: '#666', fontFamily: 'monospace', fontSize: '0.8rem', marginTop: '5px' }}>{c.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* --- SECTION 4: FOOTER (CONTACT) --- */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 30,
        opacity: footerOpacity,
        pointerEvents: footerOpacity <= 0 ? 'none' : 'auto',
      }}>
          <div style={{ color: '#888', fontFamily: 'monospace', marginBottom: '20px', letterSpacing: '2px' }}>
            // SECURE_CHANNEL_OPEN
          </div>
          <a 
            href="/contact"
            style={{ 
                display: 'inline-block', textDecoration: 'none',
                background: 'rgba(0, 255, 102, 0.05)', border: '1px solid #00ff66', color: '#00ff66',
                padding: '15px 30px', fontSize: '1rem', fontFamily: 'monospace', cursor: 'pointer',
                letterSpacing: '3px', transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = '#00ff66';
                e.currentTarget.style.color = 'black';
                e.currentTarget.style.boxShadow = '0 0 20px #00ff66';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 102, 0.05)';
                e.currentTarget.style.color = '#00ff66';
                e.currentTarget.style.boxShadow = 'none';
            }}
          >
              [ INITIATE_NEURAL_LINK ]
          </a>
      </div>

      <style jsx>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 0.5; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-5px); } }
        @keyframes cyber-boot {
          0% { opacity: 0; transform: translateY(15px); filter: blur(5px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>

    </main>
  );
}