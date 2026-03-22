'use client';

import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

export default function ProfilePage() {
  return (
    <main style={{ width: '100%', minHeight: '100vh', position: 'relative', background: '#050505', color: 'white' }}>
      
      <Cursor />
      <Navbar />
      
      {/* 3D Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.7 }}>
        <Scene />
      </div>

      {/* Main Content - ANIMATION ADDED HERE */}
      <div style={{ 
          paddingTop: '240px', paddingBottom: '100px', display: 'flex', flexDirection: 'column', 
          alignItems: 'center', zIndex: 10, position: 'relative',
          animation: 'cyber-boot 0.4s ease-out forwards' /* THE FIX */
      }}>
        <div style={{ width: '90%', maxWidth: '1200px' }}>
          
          {/* UPGRADED HEADING */}
          <div style={{ width: '100%', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
              <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '2.5rem', fontFamily: 'monospace', color: 'white', margin: 0, letterSpacing: '2px', fontWeight: '300' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ccff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(0,204,255,0.8))' }}>
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                </svg>
                USER_PROFILE
                <span style={{ display: 'inline-block', width: '14px', height: '4px', background: '#00ccff', marginBottom: '4px', animation: 'blink 1s step-end infinite', boxShadow: '0 0 8px #00ccff' }}></span>
              </h1>
              <div style={{ fontFamily: 'monospace', color: '#666', letterSpacing: '2px', fontSize: '0.85rem' }}>
                  [ ID: A_AUMKAR ]
              </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '50px', alignItems: 'start' }}>
            
            {/* LEFT COLUMN: CASUAL NARRATIVE */}
            <div style={{ 
                background: 'rgba(10, 15, 20, 0.8)', border: '1px solid rgba(0, 204, 255, 0.2)', 
                padding: '40px', borderRadius: '8px', backdropFilter: 'blur(10px)' 
            }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 20px 0', lineHeight: '1', color: 'white' }}>
                    HI, I'M AUMKAR.
                </h2>
                <div style={{ color: '#eee', fontSize: '1.1rem', lineHeight: '1.8', fontFamily: 'monospace' }}>
                    <p style={{ marginBottom: '20px' }}>
                        {`> I'm currently in my 3rd year of Computer Science Engineering at LPU, but more importantly, I'm a builder. I love taking complex problems and turning them into clean, functional software.`}
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        {`> Lately, my main focus has been diving deep into Android development and web technologies. Whether I am designing a map-driven interface like AtlasMe, setting up real-time Firebase databases for voice notes, or crafting responsive web experiences, I thrive on taking an idea from a blank screen to a fully deployed product.`}
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        {`> Beyond the code, I believe the best products are built by teams that can adapt quickly and communicate effectively—which comes in handy when you speak four languages! When I'm not glued to my IDE or debugging a tricky API, you will almost certainly find me out on the football pitch.`}
                    </p>
                    <p style={{ color: '#00ccff', marginTop: '40px', borderLeft: '2px solid #00ccff', paddingLeft: '15px' }}>
                        {`> You can grab a copy of my CV over on the right for the full technical breakdown of my stack, certifications, and training history.`}
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN: CV VIEWER & DOWNLOAD */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                {/* CV Image Container */}
                <div style={{ 
                    width: '100%', maxWidth: '450px',
                    background: 'rgba(0,0,0,0.5)', padding: '10px', 
                    border: '1px dashed #00ccff', borderRadius: '4px',
                    position: 'relative', marginBottom: '30px',
                    boxShadow: '0 0 30px rgba(0, 204, 255, 0.1)'
                }}>
                    <div style={{ position: 'absolute', top: '-12px', left: '20px', background: 'black', padding: '0 10px', color: '#00ccff', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        DOCUMENT_PREVIEW
                    </div>
                    
                    <img 
                        src="/cv-preview.png" 
                        alt="Aumkar CV Preview" 
                        style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.9, filter: 'contrast(1.1)' }} 
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML += '<div style="padding: 100px 20px; text-align: center; color: #555; font-family: monospace;">[ IMAGE NOT FOUND: Place cv-preview.png in public folder ]</div>';
                        }}
                    />
                </div>

                {/* Working Download Button pointing to myCV1.pdf */}
                <a 
                    href="/myCV1.pdf" 
                    download="Aumkar_CV.pdf"
                    style={{ 
                        display: 'inline-block', width: '100%', maxWidth: '450px', textAlign: 'center',
                        background: 'rgba(0, 204, 255, 0.1)', border: '1px solid #00ccff', color: '#00ccff',
                        padding: '15px 30px', fontSize: '1.2rem', fontFamily: 'monospace', cursor: 'pointer',
                        letterSpacing: '3px', textDecoration: 'none', transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#00ccff';
                        e.currentTarget.style.color = 'black';
                        e.currentTarget.style.boxShadow = '0 0 20px #00ccff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 204, 255, 0.1)';
                        e.currentTarget.style.color = '#00ccff';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    [ DOWNLOAD_CV.PDF ]
                </a>

            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
      `}</style>
    </main>
  );
}