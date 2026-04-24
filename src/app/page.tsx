'use client';

import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import BootLoader from "@/components/BootLoader";
import { useState, useEffect, useMemo, useRef } from 'react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [activeTab, setActiveTab] = useState('TRAININGS');
  const [isGlitching, setIsGlitching] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // DIAGONAL SPLIT STATE 
  const [activePanel, setActivePanel] = useState<'NONE' | 'TRAININGS' | 'CERTS'>('NONE'); 
  const [hoveredPanel, setHoveredPanel] = useState<'NONE' | 'TRAININGS' | 'CERTS'>('NONE'); 

  // --- NATIVE SCROLL REVEAL HOOK --- 
  useEffect(() => { 
    const observer = new IntersectionObserver( 
      (entries) => { 
        entries.forEach((entry) => { 
          if (entry.isIntersecting) { 
            entry.target.classList.add('is-visible'); 
          } else { 
            // Optional: Remove if you want it to animate every single time you scroll past 
            entry.target.classList.remove('is-visible'); 
          } 
        }); 
      }, 
      { threshold: 0.2 } // Triggers when 20% of the item is on screen 
    ); 

    const hiddenElements = document.querySelectorAll('.observe-me'); 
    hiddenElements.forEach((el) => observer.observe(el)); 

    // --- CRT GLITCH & Z-WARP OBSERVER ---
    const glitchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const warpTarget = entry.target.querySelector('.z-warp-container');

          if (entry.isIntersecting) {
            // Update Active Section for Navbar
            setActiveSection(entry.target.id);

            // Trigger CRT Glitch
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 250);

            // Trigger Z-Warp In
            if (warpTarget) {
              warpTarget.classList.add('is-warped-in');
              warpTarget.classList.remove('is-warped-past');
            }
          } else {
            // Handle scrolling away (Warp Past or reset)
            if (warpTarget) {
              if (entry.boundingClientRect.y < 0) {
                // Scrolled down past the section
                warpTarget.classList.add('is-warped-past');
                warpTarget.classList.remove('is-warped-in');
              } else {
                // Scrolled up before the section
                warpTarget.classList.remove('is-warped-in', 'is-warped-past');
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section:not(#home)');
    sections.forEach((s) => glitchObserver.observe(s));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
      sections.forEach((s) => glitchObserver.unobserve(s));
    };
  }, []); 

  // 1. 3D SCROLL REVEAL (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          } else {
            // Removes class when scrolling away so it animates again next time
            entry.target.classList.remove('reveal-visible');
          }
        });
      },
      { threshold: 0.35 } // Triggers when 35% of the section is visible
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // 2. ANIMATED HEADING OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    const headings = document.querySelectorAll('.animated-heading');
    headings.forEach((h) => observer.observe(h));

    return () => {
      headings.forEach((h) => observer.unobserve(h));
    };
  }, []);

  // 3. OPTIMIZED SCROLL TRACKER (Hardware-Accelerated)
  const lastPanelOpenTime = useRef(0);

  useEffect(() => {
    if (activePanel !== 'NONE') {
      lastPanelOpenTime.current = Date.now();
    }
  }, [activePanel]);

  useEffect(() => {
    // Only lock body scroll for the Full-Screen Modal (activeItem)
    if (activeItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const scrollHeight = document.documentElement.scrollHeight;
          const clientHeight = window.innerHeight;
          const progress = scrollTop / (scrollHeight - clientHeight);
          
          setScrollProgress(progress);
          setScrollY(scrollTop);
          
          // Auto-close diagonal panels on main window scroll
          if (activePanel !== 'NONE' && Date.now() - lastPanelOpenTime.current > 500) {
            setActivePanel('NONE');
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Also detect mouse wheel/touch intent to close panels
    const handleGesture = (e: any) => {
      if (activePanel !== 'NONE' && Date.now() - lastPanelOpenTime.current > 500) {
        // If it's a wheel event, we close it
        // We add a small delay (500ms) to ensure the user doesn't accidentally close it right after opening
        setActivePanel('NONE');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleGesture, { passive: true });
    window.addEventListener('touchmove', handleGesture, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleGesture);
      window.removeEventListener('touchmove', handleGesture);
    };
  }, [activeItem, activePanel]);

  // BACKGROUND WARP EFFECT (Building around existing logic)
  const warpScale = 1 + (scrollY * 0.0005); 
  
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

  // --- DATA (Preserved) ---
  const myProjects = [
    { 
        category: 'PROJECT',
        name: 'ATLAS_ME', 
        date: 'OCT 2025', 
        desc: 'A cross-platform location journaling app that lets users save meaningful places with personal notes. Built on a real-time Firebase backend with secure authentication and Firestore for geospatial data storage. Features include interactive OpenStreetMap integration, triple-tap location saving, GPS-based auto-centering, and persistent map state across sessions. Implemented real-time data synchronization ensuring seamless cross-device access, user-specific data isolation through Firebase security rules, and optimized queries for efficient location retrieval. The app combines intuitive UX with robust backend architecture, supporting unlimited users and locations while maintaining offline capability through intelligent caching.',  
        stack: ['Kotlin', 'Android (Jetpack Compose)', 'Firebase (Auth & Firestore)', 'OSMDroid', 'Google Location Services'],
        github: 'https://github.com/aumkar1104'
    },
    { 
        category: 'PROJECT',
        name: 'SKYNOTE', 
        date: 'JUL 2025', 
        desc: 'SkyNote is a clean and intuitive voice-based note-taking app designed to make capturing ideas effortlessly. It allows users to record, transcribe, and store notes in real time, ensuring nothing important is missed. Built with a minimal, user-friendly interface and integrated with Firebase for secure storage, SkyNote combines functionality with simplicity. Its smart organization and seamless navigation enhance productivity, making it an ideal tool for students and professionals who prefer fast, voice-driven note management.', 
        stack: ['Java', 'Android Studio', 'XML (UI Design)', 'Firebase Auth & Firestore', 'Speech-to-Text API', 'Material Design'],
        github: 'https://github.com/aumkar1104'
    }
  ];

  const myTrainings = [
    { 
        category: 'TRAINING',
        name: 'ANDROID DEV PRO', 
        issuer: 'Lovely Professional University', 
        date: 'JUN 2025', 
        desc: 'Hands-on development of apps from scratch. Implemented Firebase services for backend connectivity and deployed to Play Store.', 
        stack: ['Teamwork', 'Deployment'] 
    }
  ];

  const myCerts = [
    { category: 'CERTIFICATION', name: 'GENERATIVE AI APPS', issuer: 'Udemy', date: 'JUL 2025', desc: 'Advanced course on building applications using Generative AI models and LLMs.', stack: ['AI', 'LLM'] },
    { category: 'CERTIFICATION', name: 'CLOUD COMPUTING', issuer: 'NPTEL', date: 'JUN 2025', desc: 'Comprehensive study of cloud architecture, virtualization, and distributed systems.', stack: ['Cloud', 'Infra'] },
    { category: 'CERTIFICATION', name: 'RESPONSIVE WEB DESIGN', issuer: 'freeCodeCamp', date: 'APR 2023', desc: 'Certification covering HTML5, CSS3, and modern responsive design principles.', stack: ['Web', 'UI/UX'] },
  ];

  const myCertifications = [ 
    { name: 'GENERATIVE AI APPS', issuer: 'Udemy', date: 'JUL 2025', stack: ['AI', 'LLM'] }, 
    { name: 'CLOUD COMPUTING', issuer: 'NPTEL', date: 'JUN 2025', stack: ['Cloud', 'Infra'] }, 
    { name: 'RESPONSIVE WEB DESIGN', issuer: 'freeCodeCamp', date: 'APR 2023', stack: ['Web', 'UI/UX'] } 
  ]; 

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'PROJECT': return '#00ff66';
      case 'TRAINING': return '#00ccff';
      case 'CERTIFICATION': return '#ff3366';
      default: return '#ffffff';
    }
  };

  const VaultCard = ({ item }: { item: any }) => {
    const color = getCategoryColor(item.category);
    return (
      <div 
        onClick={() => setActiveItem(item)}
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '25px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '220px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = `0 10px 30px -10px ${color}44`;
          e.currentTarget.style.borderColor = color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: color, letterSpacing: '1px' }}>//{item.category}</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#666' }}>{item.date}</span>
        </div>
        
        <h3 style={{ color: 'white', fontSize: '1.2rem', margin: '0 0 10px 0', fontWeight: 'bold' }}>{item.name}</h3>
        
        <p style={{ 
          color: '#aaa', 
          fontSize: '0.85rem', 
          lineHeight: '1.5', 
          marginBottom: '15px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {item.desc}
        </p>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {item.stack?.slice(0, 2).map((s: string) => (
              <span key={s} style={{ fontSize: '0.65rem', color: '#888', border: '1px solid #333', padding: '2px 6px', borderRadius: '4px' }}>{s}</span>
            ))}
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: color, opacity: 0.8 }}>
            {`> DEEP_DIVE`}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading && <BootLoader onComplete={() => setIsLoading(false)} />}
      
      <main style={{ 
        width: '100%', 
        position: 'relative', 
        background: 'transparent',
        overflowX: 'hidden'
      }}>
        
        <Cursor />
        <div className={`crt-overlay ${isGlitching ? 'is-glitching' : ''}`}></div>
        <Navbar activeSection={activeSection} />
        {BackgroundScene}

        {/* --- SCROLL PROGRESS CLOCK --- */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-clock"
          style={{
            position: 'fixed', bottom: '40px', right: '40px',
            zIndex: 100, cursor: 'pointer',
            width: '60px', height: '60px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s'
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            {/* Background Track */}
            <circle 
              cx="30" cy="30" r="25" 
              fill="none" stroke="rgba(255,255,255,0.1)" 
              strokeWidth="4" 
            />
            {/* Glowing Foreground Track */}
            <circle 
              cx="30" cy="30" r="25" 
              fill="none" stroke="#00ccff" 
              strokeWidth="4" 
              strokeDasharray={2 * Math.PI * 25}
              strokeDashoffset={(2 * Math.PI * 25) * (1 - scrollProgress)}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.1s linear',
                filter: 'drop-shadow(0 0 5px #00ccff)'
              }}
              transform="rotate(-90 30 30)"
            />
          </svg>
          <div style={{ position: 'absolute', fontSize: '0.6rem', color: '#00ccff', fontFamily: 'monospace' }}>
            {Math.round(scrollProgress * 100)}%
          </div>
        </div>

        <style>{`
          .scroll-clock:active { transform: scale(0.9) translateY(2px); }
          .scroll-clock:hover circle:last-child { filter: drop-shadow(0 0 10px #00ccff); }
          .reveal-on-scroll { 
            opacity: 0; 
            transform: perspective(1000px) rotateX(8deg) translateY(50px) scale(0.96); 
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); 
            will-change: opacity, transform; 
          } 
          
          .reveal-visible { 
            opacity: 1; 
            transform: perspective(1000px) rotateX(0deg) translateY(0) scale(1); 
          }
          
          .animated-heading { 
            opacity: 0; 
            transform: perspective(600px) rotateX(45deg) translateY(40px); 
            transform-origin: bottom; 
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            margin-bottom: 2rem; 
            font-family: monospace; 
            font-size: 2.5rem; 
            color: #00ccff;
            text-transform: uppercase; 
            letter-spacing: 4px; 
          } 
          
          .animated-heading.visible { 
            opacity: 1; 
            transform: perspective(600px) rotateX(0deg) translateY(0); 
          }

          /* --- NATIVE SCROLL ANIMATIONS (FIXED) --- */
          :global(.observe-me) {
              opacity: 0;
              will-change: transform, opacity;
              transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          :global(.fade-down) { transform: translateY(-30px); }
          :global(.slide-in-left) { transform: translateX(-80px); }
          :global(.slide-in-right) { transform: translateX(80px); }

          :global(.observe-me.is-visible) {
              opacity: 1 !important;
              transform: translate(0, 0) !important;
          } 
  
          /* --- CIRCUIT BOARD TIMELINE LAYOUT --- */ 
          .center-line { 
              position: absolute; 
              left: 50%; 
              top: 0; 
              bottom: 0; 
              width: 2px; 
              background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 90%, transparent); 
              transform: translateX(-50%); 
              z-index: 1; 
          } 
  
          .timeline-row { 
              display: flex; 
              align-items: center; 
              justify-content: space-between; 
              position: relative; 
              width: 100%; 
              z-index: 2; 
          } 
  
          .timeline-content { width: 45%; } 
          .pl-padding { padding-left: 40px; } 
          .pr-padding { padding-right: 40px; } 
  
          .center-node { 
              position: absolute; 
              left: 50%; 
              top: 50%; 
              transform: translate(-50%, -50%); 
              width: 12px; 
              height: 12px; 
              border-radius: 50%; 
              z-index: 3; 
              border: 2px solid #050505; 
          } 
  
          /* MOBILE FIX (Collapses the timeline so it doesn't break on small screens) */ 
          @media (max-width: 768px) { 
              .center-line, .center-node { display: none; } 
              .timeline-row { flexDirection: column; gap: 30px; } 
              .timeline-row.row-reverse { flexDirection: column; } 
              .timeline-content { width: 100%; text-align: left !important; } 
              .pl-padding, .pr-padding { padding: 0; } 
              .timeline-content > div { justify-content: flex-start !important; } 
          }

          /* --- DIAGONAL SPLIT ENGINE --- */ 
          .diagonal-panel { 
              position: absolute; 
              top: 0; 
              left: 0; 
              width: 100%; 
              height: 100%; 
              transition: clip-path 0.7s cubic-bezier(0.165, 0.84, 0.44, 1), background 0.5s ease; 
              cursor: pointer; 
              backdrop-filter: blur(5px); 
          } 
  
          /* Default Split: 60/40 slope */ 
          .panel-left { 
              clip-path: polygon(0 0, 55% 0, 45% 100%, 0 100%); 
              background: rgba(0, 204, 255, 0.02); 
              border-right: 1px solid rgba(0,204,255,0.2); 
          } 
          
          .panel-right { 
              clip-path: polygon(55% 0, 100% 0, 100% 100%, 45% 100%); 
              background: rgba(255, 51, 102, 0.02); 
              border-left: 1px solid rgba(255,51,102,0.2); 
          } 
  
          /* Hover Peek Animations */ 
          .panel-left.is-peek { clip-path: polygon(0 0, 60% 0, 50% 100%, 0 100%); background: rgba(0, 204, 255, 0.08); } 
          .panel-right.is-peek { clip-path: polygon(50% 0, 100% 0, 100% 100%, 40% 100%); background: rgba(255, 51, 102, 0.08); } 
  
          /* Click Expand Animations */ 
          .panel-left.is-expanded { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); background: rgba(10, 15, 20, 0.95); z-index: 20; cursor: default; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; } 
          .panel-right.is-expanded { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); background: rgba(10, 15, 20, 0.95); z-index: 20; cursor: default; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; } 
          
          .panel-left.is-expanded::-webkit-scrollbar, .panel-right.is-expanded::-webkit-scrollbar { display: none; }
  
          /* Hidden State (When the other is expanded) */ 
          .panel-left.is-hidden { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); pointer-events: none; } 
          .panel-right.is-hidden { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); pointer-events: none; } 
  
          /* Content Styling */ 
          .panel-content { position: relative; width: 100%; height: 100%; } 
          
          /* FIX 1: Precisely center and resize titles in their respective triangles */ 
          .giant-title { 
              font-size: clamp(1.5rem, 4vw, 3rem); 
              font-family: monospace; 
              letter-spacing: 12px; 
              font-weight: 300;
              transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); 
              position: absolute; 
              top: 50%; 
              white-space: nowrap; 
              z-index: 5;
              pointer-events: none;
              text-shadow: 0 0 20px currentColor;
          } 
          
          .left-title { 
              left: 25%; 
              transform: translate(-50%, -50%); 
              text-align: center;
          } 
          
          .right-title { 
              left: 75%; 
              transform: translate(-50%, -50%); 
              text-align: center;
          } 
          
          .expanded-content { position: absolute; top: 0; left: 0; width: 100%; min-height: 100%; padding: 120px 5%; transition: opacity 0.5s ease 0.3s; display: flex; align-items: flex-start; justify-content: center; box-sizing: border-box; } 
          
          /* FIX 2: Fixed Close Button so it never scrolls away */ 
          .close-btn { position: fixed; top: 100px; right: 5%; background: rgba(0,0,0,0.8); border: 1px solid #00ccff; color: #00ccff; padding: 10px 20px; font-family: monospace; cursor: pointer; transition: 0.3s; letter-spacing: 2px; z-index: 100; backdrop-filter: blur(5px); } 
          .close-btn:hover { background: rgba(255,255,255,0.1); } 
  
          /* FIX 3: Cyber-Frame to contain the empty space */ 
          .cyber-frame { position: relative; width: 100%; max-width: 1200px; padding: 60px; background: rgba(10, 15, 20, 0.85); border: 1px solid; border-radius: 4px; box-shadow: 0 0 50px rgba(0,0,0,0.8); margin-top: 40px; } 
          .cyber-corner { position: absolute; width: 30px; height: 30px; border: 4px solid transparent; } 
          .top-left { top: -2px; left: -2px; border-right: none; border-bottom: none; } 
          .bottom-right { bottom: -2px; right: -2px; border-left: none; border-top: none; } 
  
          .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; } 
          .center-grid { display: flex; justify-content: center; }
          .glass-card { background: rgba(0,0,0,0.6); border: 1px solid #333; padding: 30px; border-radius: 4px; transition: transform 0.3s; } 
          .glass-card:hover { transform: translateY(-5px); } 

          .drive-link { 
              display: block; 
              text-align: center; 
              margin-top: 40px; 
              color: #ff3366; 
              font-family: monospace; 
              text-decoration: none; 
              font-size: 0.9rem; 
              letter-spacing: 2px; 
              transition: all 0.3s; 
          } 
          .drive-link:hover { text-shadow: 0 0 10px #ff3366; text-decoration: underline; }
  
          /* --- CONTACT SECTION & FORM STYLING --- */
          .console-wrapper {
              display: grid;
              grid-template-columns: 1fr 1.2fr;
              gap: 60px;
              padding: 50px;
              border-radius: 4px;
              position: relative;
              overflow: hidden;
          }

          @media (max-width: 768px) {
              .console-wrapper { grid-template-columns: 1fr; gap: 40px; padding: 30px; }
          }

          .comms-list { 
              display: flex; 
              flex-direction: column; 
              gap: 20px; 
              list-style: none; 
              padding: 0; 
              margin: 0; 
          }
          .comms-item { 
              display: flex; 
              align-items: center; 
              gap: 15px; 
              text-decoration: none; 
              transition: all 0.3s ease;
              justify-content: flex-start;
          }
          .comms-item:hover { transform: translateX(5px); color: #00ff66 !important; }
          .comms-item:hover .status-tag { border-color: #00ff66; color: #00ff66; }

          .status-tag {
              font-family: monospace;
              font-size: 0.7rem;
              padding: 4px 10px;
              border: 1px solid #00ccff;
              color: #00ccff;
              letter-spacing: 1px;
              transition: all 0.3s ease;
              white-space: nowrap;
              display: inline-block;
              text-align: center;
          }

          .uplink-form { 
              display: flex; 
              flex-direction: column; 
              gap: 30px; 
              width: 100%;
          }
          .input-group { 
              display: flex;
              flex-direction: column;
              gap: 10px;
              position: relative; 
              width: 100%; 
          }
          .input-label { 
              display: block; 
              font-family: monospace; 
              font-size: 0.75rem; 
              color: #666; 
              letter-spacing: 2px;
          }

          .uplink-input, .uplink-textarea {
              width: 100%;
              background: transparent;
              border: none;
              border-bottom: 1px solid #333;
              color: white;
              padding: 10px 0;
              font-family: monospace;
              font-size: 1rem;
              outline: none;
              transition: all 0.3s ease;
          }

          .uplink-input:focus, .uplink-textarea:focus {
              border-bottom-color: #00ccff;
              box-shadow: 0 2px 10px rgba(0,204,255,0.2);
          }

          .transmit-btn {
              background: transparent;
              border: 1px solid #00ff66;
              color: #00ff66;
              padding: 15px;
              font-family: monospace;
              letter-spacing: 3px;
              cursor: pointer;
              transition: all 0.3s ease;
              margin-top: 10px;
              width: 100%;
              text-align: center;
          }

          .transmit-btn:hover {
              background: #00ff66;
              color: #050505;
              box-shadow: 0 0 20px rgba(0,255,102,0.4);
          }

          /* --- CRT GLITCH EFFECT --- */
          .crt-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              pointer-events: none;
              z-index: 9999;
              background: rgba(255, 255, 255, 0.05);
              opacity: 0;
              visibility: hidden;
          }

          .is-glitching {
              animation: crt-glitch 0.25s steps(2) infinite;
              visibility: visible;
              opacity: 1;
          }

          @keyframes crt-glitch {
              0% { 
                  background: rgba(255, 255, 255, 0.1); 
                  transform: skew(0.5deg) scaleY(1.005); 
                  filter: hue-rotate(90deg) contrast(1.2);
                  box-shadow: 2px 0 0 rgba(255,0,0,0.2), -2px 0 0 rgba(0,255,255,0.2);
              }
              50% { 
                  background: rgba(255, 255, 255, 0.05); 
                  transform: skew(-0.5deg) scaleY(0.995); 
                  filter: hue-rotate(-90deg) brightness(1.2);
                  box-shadow: -2px 0 0 rgba(255,0,0,0.2), 2px 0 0 rgba(0,255,255,0.2);
              }
              100% { 
                  background: rgba(255, 255, 255, 0.1); 
                  transform: skew(0deg) scaleY(1);
                  filter: hue-rotate(0deg);
              }
          }

          /* --- Z-WARP DEPTH EFFECTS --- */
          .z-warp-container { 
              opacity: 0; 
              transform: scale(0.85) translateZ(-100px); 
              transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.6s ease-out; 
              will-change: transform, opacity; 
              width: 100%; 
              display: flex; 
              justify-content: center; 
              align-items: center;
          } 
          
          .z-warp-container.is-warped-in { 
              opacity: 1; 
              transform: scale(1) translateZ(0); 
          } 
          
          .z-warp-container.is-warped-past { 
              opacity: 0; 
              transform: scale(1.15) translateZ(50px); 
          }
        `}</style>

        {/* --- SECTION 1: HOME (HERO) --- */}
        <section id="home" style={{
            height: '100vh', width: '100%',
            scrollSnapAlign: 'start',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
        }}>
          <div className="reveal-on-scroll" style={{ 
              width: '100%', height: '100%', position: 'relative',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
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
              
              <div style={{
                position: 'absolute', bottom: '50px', width: '100%', textAlign: 'center',
                fontFamily: 'monospace', fontSize: '0.8rem', color: '#666', letterSpacing: '2px',
                opacity: isHovered ? 0 : 1, transition: 'opacity 0.5s', pointerEvents: 'none', animation: 'pulse 2s infinite'
              }}>
                {`> SYSTEM_LOCKED // SCROLL_TO_UNLOCK`}
                <span style={{ display: 'inline-block', width: '8px', height: '15px', backgroundColor: 'white', marginLeft: '10px', verticalAlign: 'middle', animation: 'blink 1s infinite' }}></span>
              </div>
          </div>
        </section>

        {/* --- SECTION 2: ABOUT (DASHBOARD) --- */}
        <section id="about" style={{
          width: '100%', height: '100vh',
          scrollSnapAlign: 'start',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          zIndex: 20,
        }}>
          <div style={{ position: 'absolute', top: '10vh', left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
            <h2 className="animated-heading"></h2>
          </div>
          <div className="z-warp-container observe-warp">
            <div className="reveal-on-scroll" style={{
                width: '90%', maxWidth: '1100px',
                border: '1px solid rgba(255,255,255,0.1)', 
                background: 'rgba(10, 15, 20, 0.8)', 
                backdropFilter: 'blur(15px)',
                padding: '60px', borderRadius: '4px', position: 'relative',
                boxShadow: '0 0 80px rgba(0,0,0,0.8)'
            }}>
                {/* CYBER-FRAME BRACKETS */}
                <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '40px', height: '40px', borderTop: '4px solid white', borderLeft: '4px solid white', boxShadow: '0 0 15px rgba(255,255,255,0.3)' }}></div>
                <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '40px', height: '40px', borderTop: '4px solid white', borderRight: '4px solid white', boxShadow: '0 0 15px rgba(255,255,255,0.3)' }}></div>
                <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '40px', height: '40px', borderBottom: '4px solid white', borderLeft: '4px solid white', boxShadow: '0 0 15px rgba(255,255,255,0.3)' }}></div>
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '40px', height: '40px', borderBottom: '4px solid white', borderRight: '4px solid white', boxShadow: '0 0 15px rgba(255,255,255,0.3)' }}></div>

                <div style={{ 
                    display: 'flex', justifyContent: 'space-between', 
                    borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px', marginBottom: '40px', 
                    fontFamily: 'monospace', color: '#aaa', fontSize: '0.9rem', letterSpacing: '1px'
                }}>
                    <span>OPERATIVE_BIO: v2.4</span>
                    <span>STATUS: <span style={{color: '#00ff66', textShadow: '0 0 10px #00ff66'}}>ACTIVE</span></span>
                    <span>LOC: INDIA_SRV</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
                    <div>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', margin: '0 0 30px 0', lineHeight: '1', color: 'white', textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                            COMPUTER SCIENCE<br />ENGINEER
                        </h2>
                        <div style={{ color: '#eee', fontSize: '1.1rem', lineHeight: '1.8', fontFamily: 'monospace' }}>
                            <p style={{ marginBottom: '20px' }}>{`> 3rd Year B.Tech CSE Student at Lovely Professional University.`}</p>
                            <p style={{ marginBottom: '30px' }}>{`> A well-rounded developer with strong foundations in `} <span style={{ color: '#fff', borderBottom: '1px solid white'}}>Core Programming</span>{`, `} <span style={{ color: '#fff', borderBottom: '1px solid white'}}>Web Development</span>{`, and `} <span style={{ color: '#fff', borderBottom: '1px solid white'}}>Software Engineering</span>.</p>
                            
                            <a 
                                href="/myCV1.pdf" 
                                target="_blank"
                                style={{
                                    display: 'inline-block', textDecoration: 'none',
                                    background: 'rgba(255, 51, 102, 0.1)', border: '1px solid #ff3366', color: '#ff3366',
                                    padding: '12px 24px', fontSize: '0.9rem', fontFamily: 'monospace', cursor: 'pointer',
                                    letterSpacing: '2px', transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#ff3366';
                                    e.currentTarget.style.color = 'black';
                                    e.currentTarget.style.boxShadow = '0 0 20px #ff3366';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 51, 102, 0.1)';
                                    e.currentTarget.style.color = '#ff3366';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                [ DECRYPT_CV.PDF ]
                            </a>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div>
                            <div style={{ marginBottom: '15px', fontSize: '0.8rem', color: '#888', fontFamily: 'monospace', letterSpacing: '2px' }}>// TECHNICAL ARSENAL</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {['C++', 'JAVA', 'PYTHON', 'REACT.JS', 'NEXT.JS', 'THREE.JS', 'SQL', 'ANDROID'].map((skill) => (
                                    <span key={skill} style={{
                                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                        padding: '8px 16px', fontSize: '0.75rem', color: 'white', fontFamily: 'monospace',
                                        display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold'
                                    }}>
                                        <span style={{ width: '6px', height: '6px', background: '#00ff66', borderRadius: '50%', boxShadow: '0 0 6px #00ff66' }}></span>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div style={{ marginBottom: '15px', fontSize: '0.8rem', color: '#888', fontFamily: 'monospace', letterSpacing: '2px' }}>// TOOLS & PLATFORMS</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {['MYSQL', 'GIT', 'GITHUB', 'ANDROID STUDIO', 'ATLASSIAN', 'SELENIUM IDE', 'ECLIPSE'].map((tool) => (
                                    <span key={tool} style={{
                                        background: 'rgba(0, 204, 255, 0.05)', border: '1px solid rgba(0, 204, 255, 0.1)',
                                        padding: '8px 16px', fontSize: '0.75rem', color: '#ddd', fontFamily: 'monospace',
                                        display: 'flex', alignItems: 'center', gap: '8px'
                                    }}>
                                        <span style={{ width: '5px', height: '5px', background: '#00ccff', borderRadius: '50%', boxShadow: '0 0 5px #00ccff' }}></span>
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div style={{ marginBottom: '15px', fontSize: '0.8rem', color: '#888', fontFamily: 'monospace', letterSpacing: '2px' }}>// SOFT SKILLS</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {['ADAPTABILITY', 'WORK ETHIC', 'RESPONSIBILITY'].map((skill) => (
                                    <span key={skill} style={{
                                        background: 'rgba(255, 51, 102, 0.05)', border: '1px solid rgba(255, 51, 102, 0.1)',
                                        padding: '8px 16px', fontSize: '0.75rem', color: '#ddd', fontFamily: 'monospace',
                                        display: 'flex', alignItems: 'center', gap: '8px'
                                    }}>
                                        <span style={{ width: '5px', height: '5px', background: '#ff3366', borderRadius: '50%', boxShadow: '0 0 5px #ff3366' }}></span>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: THE CIRCUIT BOARD (PROJECTS) --- */} 
        <section id="work" style={{ minHeight: '100vh', width: '100%', scrollSnapAlign: 'start', padding: '120px 20px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
          
          {/* GATEWAY HEADING */} 
          <div className="observe-me fade-down" style={{ width: '100%', maxWidth: '1200px', marginBottom: '80px', display: 'flex', alignItems: 'center', gap: '20px' }}> 
              <div style={{ color: '#00ccff', fontFamily: 'monospace', fontSize: '1.2rem', letterSpacing: '4px', whiteSpace: 'nowrap' }}>// FEATURED WORK</div> 
              <div style={{ height: '1px', width: '100%', background: 'linear-gradient(90deg, #00ccff, transparent)' }}></div> 
          </div> 
  
          {/* TIMELINE WRAPPER */} 
          <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '150px' }}> 
              
              {/* THE CENTER LINE */} 
              <div className="center-line"></div> 
  
              {/* PROJECT 1: ATLAS_ME (Image Left, Text Right) */} 
              <div className="timeline-row"> 
                  <div className="observe-me slide-in-left timeline-content visual-box"> 
                      <div style={{ width: '100%', height: '300px', background: 'rgba(10,15,20,0.6)', border: '1px solid rgba(0,255,102,0.2)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                          <span style={{ color: '#333', fontFamily: 'monospace' }}>[ ATLAS_ME VISUAL ]</span> 
                      </div> 
                  </div> 
                  
                  <div className="center-node" style={{ boxShadow: '0 0 15px #00ff66', background: '#00ff66' }}></div> 
                  
                  <div className="observe-me slide-in-right timeline-content text-box pl-padding"> 
                      <h3 style={{ fontSize: '2.5rem', color: '#00ff66', margin: '0 0 15px 0', fontFamily: 'monospace' }}>ATLAS_ME</h3> 
                      <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '20px' }}>A cross-platform location journaling app that lets users save meaningful places with personal notes. Built on a real-time Firebase backend with secure authentication.</p> 
                      <div style={{ display: 'flex', gap: '10px' }}> 
                          {['Kotlin', 'Firebase', 'OSMDroid'].map(s => <span key={s} style={{ fontSize: '0.8rem', color: '#888', border: '1px solid #333', padding: '4px 8px' }}>{s}</span>)} 
                      </div> 
                  </div> 
              </div> 
  
              {/* PROJECT 2: SKYNOTE (Text Left, Image Right) */} 
              <div className="timeline-row row-reverse"> 
                  <div className="observe-me slide-in-left timeline-content text-box pr-padding" style={{ textAlign: 'right' }}> 
                      <h3 style={{ fontSize: '2.5rem', color: '#00ccff', margin: '0 0 15px 0', fontFamily: 'monospace' }}>SKYNOTE</h3> 
                      <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '20px' }}>A clean and intuitive voice-based note-taking app designed to make capturing ideas effortless. Integrated with Speech API and Firebase.</p> 
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}> 
                          {['Java', 'Android', 'Speech API'].map(s => <span key={s} style={{ fontSize: '0.8rem', color: '#888', border: '1px solid #333', padding: '4px 8px' }}>{s}</span>)} 
                      </div> 
                  </div> 
  
                  <div className="center-node" style={{ boxShadow: '0 0 15px #00ccff', background: '#00ccff' }}></div> 
  
                  <div className="observe-me slide-in-right timeline-content visual-box"> 
                      <div style={{ width: '100%', height: '300px', background: 'rgba(10,15,20,0.6)', border: '1px solid rgba(0,204,255,0.2)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                          <span style={{ color: '#333', fontFamily: 'monospace' }}>[ SKYNOTE VISUAL ]</span> 
                      </div> 
                  </div> 
              </div> 
  
          </div> 
        </section> 

        {/* --- SECTION 4: DIAGONAL SPLIT (TRAININGS / CERTS) --- */} 
        <section id="certifications" style={{ height: '100vh', width: '100%', scrollSnapAlign: 'start', position: 'relative', overflow: 'hidden', background: 'transparent' }}> 
            
            {/* LEFT PANEL: TRAININGS */} 
            <div 
              className={`diagonal-panel panel-left ${activePanel === 'TRAININGS' ? 'is-expanded' : ''} ${activePanel === 'CERTS' ? 'is-hidden' : ''} ${hoveredPanel === 'TRAININGS' && activePanel === 'NONE' ? 'is-peek' : ''}`} 
              onMouseEnter={() => setHoveredPanel('TRAININGS')} 
              onMouseLeave={() => setHoveredPanel('NONE')} 
              onClick={() => activePanel === 'NONE' && setActivePanel('TRAININGS')} 
            > 
                <div className="panel-content"> 
                    {/* Default View - Positioned to the Left of the Cut */} 
                    <h2 className="giant-title left-title" style={{ color: '#00ccff', opacity: activePanel === 'TRAININGS' ? 0 : 1 }}>[ TRAININGS ]</h2> 
                    
                    {/* Expanded View */} 
                    <div className="expanded-content" style={{ opacity: activePanel === 'TRAININGS' ? 1 : 0, pointerEvents: activePanel === 'TRAININGS' ? 'auto' : 'none' }}> 
                        <button className="close-btn" onClick={(e) => { e.stopPropagation(); setActivePanel('NONE'); }}>[ X ] CLOSE</button> 
                        
                    <div className="z-warp-container observe-warp">
                        <div className="cyber-frame" style={{ borderColor: 'rgba(0,204,255,0.3)' }}> 
                            <div className="cyber-corner top-left" style={{ borderColor: '#00ccff' }}></div> 
                            <div className="cyber-corner bottom-right" style={{ borderColor: '#00ccff' }}></div> 
                            
                            <h3 style={{ color: '#00ccff', fontSize: '2.5rem', marginBottom: '40px', fontFamily: 'monospace' }}>// RECENT TRAININGS</h3> 
                            <div className="center-grid"> 
                                <div className="card-grid" style={{ width: '100%', maxWidth: '400px' }}> 
                                    {myTrainings.map((t, i) => ( 
                                        <div key={i} className="glass-card" style={{ borderColor: 'rgba(0,204,255,0.3)' }}> 
                                            <h4 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 10px 0' }}>{t.name}</h4> 
                                            <div style={{ color: '#00ccff', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '15px' }}>{t.issuer} | {t.date}</div> 
                                            <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6' }}>{t.desc}</p> 
                                        </div> 
                                    ))} 
                                </div> 
                            </div> 
                        </div> 
                    </div>
                    </div> 
                </div> 
            </div> 
  
            {/* RIGHT PANEL: CERTIFICATIONS */} 
            <div 
              className={`diagonal-panel panel-right ${activePanel === 'CERTS' ? 'is-expanded' : ''} ${activePanel === 'TRAININGS' ? 'is-hidden' : ''} ${hoveredPanel === 'CERTS' && activePanel === 'NONE' ? 'is-peek' : ''}`} 
              onMouseEnter={() => setHoveredPanel('CERTS')} 
              onMouseLeave={() => setHoveredPanel('NONE')} 
              onClick={() => activePanel === 'NONE' && setActivePanel('CERTS')} 
            > 
                <div className="panel-content"> 
                    {/* Default View - Positioned to the Right of the Cut */} 
                    <h2 className="giant-title right-title" style={{ color: '#ff3366', opacity: activePanel === 'CERTS' ? 0 : 1 }}>[ CERTS ]</h2> 
                    
                    {/* Expanded View */} 
                    <div className="expanded-content" style={{ opacity: activePanel === 'CERTS' ? 1 : 0, pointerEvents: activePanel === 'CERTS' ? 'auto' : 'none' }}> 
                        <button className="close-btn" style={{ color: '#ff3366', borderColor: '#ff3366' }} onClick={(e) => { e.stopPropagation(); setActivePanel('NONE'); }}>[ X ] CLOSE</button> 
                        
                    <div className="z-warp-container observe-warp">
                        <div className="cyber-frame" style={{ borderColor: 'rgba(255,51,102,0.3)' }}> 
                            <div className="cyber-corner top-left" style={{ borderColor: '#ff3366' }}></div> 
                            <div className="cyber-corner bottom-right" style={{ borderColor: '#ff3366' }}></div> 
                            
                            <h3 style={{ color: '#ff3366', fontSize: '2.5rem', marginBottom: '40px', fontFamily: 'monospace' }}>// CERTIFICATIONS</h3> 
                            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}> 
                                {myCertifications.map((c, i) => ( 
                                    <div key={i} className="glass-card" style={{ borderColor: 'rgba(255,51,102,0.3)', flex: '1', minWidth: '300px', maxWidth: '350px' }}> 
                                        <h4 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 10px 0' }}>{c.name}</h4> 
                                        <div style={{ color: '#ff3366', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '15px' }}>{c.issuer} | {c.date}</div> 
                                        <div style={{ display: 'flex', gap: '10px' }}> 
                                            {c.stack.map(s => <span key={s} style={{ color: '#666', fontSize: '0.8rem', fontFamily: 'monospace' }}>#{s}</span>)} 
                                        </div> 
                                    </div> 
                                ))} 
                            </div> 

                            <a 
                                href="https://drive.google.com/drive/u/0/folders/1lVz9-7J4jcibRTniGQ4-a_DGqtCE8Hzm" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="drive-link"
                            >
                                {`> CLICK TO VIEW MORE CERTIFICATES`}
                            </a>
                        </div> 
                    </div>
                    </div> 
                </div> 
            </div> 
        </section> 

        {/* --- FULL-SCREEN OVERLAY (MODAL) --- */}
        {activeItem && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(5, 5, 5, 0.95)',
            backdropFilter: 'blur(25px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            animation: 'cyber-boot 0.4s ease-out forwards'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '900px',
              position: 'relative',
              color: 'white'
            }}>
              {/* CLOSE BUTTON */}
              <button 
                onClick={() => setActiveItem(null)}
                style={{
                  position: 'fixed',
                  top: '40px',
                  right: '40px',
                  background: 'none',
                  border: '1px solid #ff3366',
                  color: '#ff3366',
                  fontFamily: 'monospace',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  letterSpacing: '2px',
                  zIndex: 1001,
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ff3366';
                  e.currentTarget.style.color = 'black';
                  e.currentTarget.style.boxShadow = '0 0 20px #ff3366';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = '#ff3366';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                [X] CLOSE_CONNECTION
              </button>

              <div style={{ borderLeft: `4px solid ${getCategoryColor(activeItem.category)}`, paddingLeft: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'monospace', color: getCategoryColor(activeItem.category), fontSize: '0.9rem', letterSpacing: '2px' }}>
                    //{activeItem.category}
                  </span>
                  <span style={{ fontFamily: 'monospace', color: '#666', fontSize: '1rem' }}>{activeItem.date}</span>
                </div>

                <h2 style={{ fontSize: '4rem', fontWeight: '900', margin: '0 0 20px 0', lineHeight: '1', letterSpacing: '-2px' }}>
                  {activeItem.name}
                </h2>

                {activeItem.issuer && (
                  <div style={{ fontSize: '1.2rem', color: '#888', marginBottom: '30px', fontFamily: 'monospace' }}>
                    ISSUED_BY: {activeItem.issuer}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
                  {activeItem.stack?.map((s: string) => (
                    <span key={s} style={{ 
                      color: getCategoryColor(activeItem.category), 
                      border: `1px solid ${getCategoryColor(activeItem.category)}33`, 
                      background: `${getCategoryColor(activeItem.category)}11`, 
                      padding: '6px 15px', 
                      fontSize: '0.8rem', 
                      fontFamily: 'monospace', 
                      borderRadius: '4px' 
                    }}>{s}</span>
                  ))}
                </div>

                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', maxWidth: '800px', marginBottom: '50px' }}>
                  {activeItem.desc}
                </div>

                {activeItem.github && (
                  <a 
                    href={activeItem.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      background: 'white',
                      color: 'black',
                      padding: '15px 30px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      letterSpacing: '2px'
                    }}
                  >
                    [ VIEW_SOURCE // GITHUB ]
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- SECTION 5: CONTACT (SECURE UPLINK) --- */}
        <section id="contact" style={{
          width: '100%', minHeight: '100vh',
          scrollSnapAlign: 'start',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          zIndex: 30,
          padding: '100px 20px'
        }}>
            <div className="z-warp-container observe-warp">
                <div className="reveal-on-scroll console-wrapper" style={{
                    width: '90%', maxWidth: '1000px',
                    background: 'rgba(10, 15, 20, 0.7)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(0,204,255,0.2)',
                    boxShadow: '0 0 50px rgba(0,0,0,0.5)'
                }}>
                    {/* LEFT COLUMN: COMMS_CHANNELS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <div>
                            <h3 style={{ color: '#00ccff', fontFamily: 'monospace', fontSize: '1.2rem', letterSpacing: '4px', marginBottom: '30px' }}>
                                // CONNECT
                            </h3>
                            <div className="comms-list">
                                <a href="mailto:contact@aumkar.live" className="comms-item" style={{ color: '#ddd' }}>
                                    <span className="status-tag">EMAIL</span>
                                    <span style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>contact@aumkar.live</span>
                                </a>
                                <a href="https://linkedin.com/in/aumkar" target="_blank" className="comms-item" style={{ color: '#ddd' }}>
                                    <span className="status-tag">LINKEDIN</span>
                                    <span style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>linkedin.com/in/aumkar</span>
                                </a>
                                <a href="https://github.com/aumkar1104" target="_blank" className="comms-item" style={{ color: '#ddd' }}>
                                    <span className="status-tag">GITHUB</span>
                                    <span style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>github.com/aumkar1104</span>
                                </a>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', borderLeft: '1px solid rgba(0,204,255,0.1)', paddingLeft: '20px' }}>
                            <div style={{ color: '#444', fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '2px', lineHeight: '2' }}>
                                {`> ENCRYPTION_LEVEL: AES-256`} <br />
                                {`> PROTOCOL: SECURE_SOCKET_LAYER`} <br />
                                {`> LOCATION: INDIA_SRV_NODE_01`}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: DIRECT_UPLINK */}
                    <div>
                        <h3 style={{ color: '#00ff66', fontFamily: 'monospace', fontSize: '1.2rem', letterSpacing: '4px', marginBottom: '30px' }}>
                            // SEND A MESSAGE
                        </h3>
                        <form className="uplink-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="input-group">
                                <label className="input-label">Name</label>
                                <input type="text" className="uplink-input" placeholder="NAME_OR_ORG" required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Email Address</label>
                                <input type="email" className="uplink-input" placeholder="EMAIL_ADDRESS" required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Your Message...</label>
                                <textarea className="uplink-textarea" rows={4} placeholder="TRANSMIT_MESSAGE..." required />
                            </div>
                            <button type="submit" className="transmit-btn">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* FOOTER & QUOTE */}
            <div style={{
                position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
                textAlign: 'center', width: '100%', padding: '0 20px', pointerEvents: 'none'
            }}>
                <div style={{ 
                    fontFamily: 'monospace', color: '#444', opacity: 0.6, letterSpacing: '6px', 
                    fontSize: '0.7rem', marginBottom: '10px', textTransform: 'uppercase' 
                }}>
                    "Building clean, scalable, and user-focused solutions."
                </div>
                <div style={{ fontFamily: 'monospace', color: '#333', fontSize: '0.6rem', letterSpacing: '2px' }}>
                    © 2026 AUMKAR. // ALL_RIGHTS_RESERVED
                </div>
            </div>
        </section>

        <style jsx>{`
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
          @keyframes pulse { 0%, 100% { opacity: 0.5; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-5px); } }
          @keyframes cyber-boot {
            0% { opacity: 0; transform: translateY(15px); filter: blur(5px); }
            100% { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
        `}</style>

      </main>
    </>
  );
}
