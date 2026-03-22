'use client';

import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

export default function CertificationsPage() {
  
  // --- TRAINING DATA ---
  const myTrainings = [
    { 
        name: 'ANDROID DEV PRO: HANDS-ON PROJECTS', 
        issuer: 'Lovely Professional University', 
        date: 'JUN 2025', 
        desc: 'Completed comprehensive Android App Development training, gaining hands-on experience designing, developing, and deploying applications from scratch. Implemented Firebase services for efficient data handling and collaborated with a multidisciplinary team to launch a fully functional final project.', 
        stack: ['Android Studio', 'Firebase', 'Teamwork', 'Project Management'],
        certLink: '/training-cert.pdf' // Replace with your actual PDF filename in the public folder
    }
  ];

  // --- CERTIFICATIONS DATA ---
  const myCerts = [
    { 
        name: 'GENERATIVE AI APPS & SOLUTIONS', 
        issuer: 'Udemy', 
        date: 'JUL 2025', 
        desc: 'Built generative AI applications and solutions using no-code tools.',
        certLink: '/ai-cert.pdf' 
    },
    { 
        name: 'CLOUD COMPUTING', 
        issuer: 'NPTEL', 
        date: 'JUN 2025', 
        desc: 'In-depth certification covering cloud architecture, deployment models, and scalable computing infrastructure.',
        certLink: '/cloud-cert.pdf' 
    },
    { 
        name: 'RESPONSIVE WEB DESIGN', 
        issuer: 'freeCodeCamp', 
        date: 'APR 2023', 
        desc: 'Completed a rigorous 300-hour developer certification focused on modern CSS, HTML5, and building adaptable, mobile-friendly web architectures.',
        certLink: '/web-cert.pdf' 
    },
  ];

  return (
    <main style={{ width: '100%', minHeight: '100vh', position: 'relative', background: '#050505', color: 'white' }}>
      
      <Cursor />
      <Navbar />
      
      {/* 3D Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Scene />
      </div>

      {/* Main Content - Block Layout */}
      <div style={{ 
          position: 'relative', zIndex: 10, paddingTop: '180px', paddingBottom: '100px', 
          maxWidth: '1000px', width: '90%', margin: '0 auto' 
      }}>
          
        <h1 style={{ fontSize: '3rem', fontFamily: 'monospace', color: '#00ff66', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '50px', letterSpacing: '4px' }}>
          // CREDENTIALS_&_TRAINING
        </h1>

        {/* --- TRAININGS SECTION --- */}
        <h2 style={{ fontSize: '1.5rem', color: '#00ccff', fontFamily: 'monospace', letterSpacing: '2px', marginBottom: '30px' }}>
            [01] ACCELERATED_TRAINING
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '60px' }}>
          {myTrainings.map((t, i) => (
            <div key={i} style={{ 
                background: 'rgba(10, 15, 20, 0.8)', border: '1px solid rgba(0, 204, 255, 0.2)', 
                padding: '30px', borderRadius: '8px', backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                  <div>
                      <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'white', letterSpacing: '1px' }}>{t.name}</h3>
                      <div style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '0.9rem', marginTop: '5px' }}>{t.issuer}</div>
                  </div>
                  <span style={{ color: '#00ccff', fontFamily: 'monospace', fontSize: '0.9rem', border: '1px solid #00ccff', padding: '5px 15px', borderRadius: '20px' }}>{t.date}</span>
              </div>
              
              <p style={{ color: '#ddd', lineHeight: '1.7', fontSize: '1rem', marginBottom: '20px' }}>{t.desc}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {t.stack.map(s => <span key={s} style={{ background: 'rgba(0,204,255,0.05)', color: '#00ccff', border: '1px solid rgba(0,204,255,0.3)', padding: '6px 12px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>{s}</span>)}
                  </div>
                  
                  {/* View Certificate Button */}
                  <a href={t.certLink} target="_blank" rel="noopener noreferrer" style={{ 
                      border: '1px solid #555', color: 'white', padding: '10px 20px', textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.9rem', transition: 'all 0.3s', borderRadius: '4px', whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#00ccff'; e.currentTarget.style.color = '#00ccff'; e.currentTarget.style.background = 'rgba(0,204,255,0.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'transparent'; }}>
                      [ VIEW_CERTIFICATE ]
                  </a>
              </div>
            </div>
          ))}
        </div>

        {/* --- CERTIFICATIONS SECTION --- */}
        <h2 style={{ fontSize: '1.5rem', color: '#ff3366', fontFamily: 'monospace', letterSpacing: '2px', marginBottom: '30px' }}>
            [02] VERIFIED_CERTIFICATIONS
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {myCerts.map((c, i) => (
            <div key={i} style={{ 
                background: 'rgba(10, 15, 20, 0.8)', border: '1px solid rgba(255, 51, 102, 0.2)', 
                padding: '30px', borderRadius: '8px', backdropFilter: 'blur(10px)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'white', lineHeight: '1.3' }}>{c.name}</h3>
                    </div>
                    <div style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '0.9rem', marginBottom: '15px' }}>{c.issuer} | <span style={{color: '#ff3366'}}>{c.date}</span></div>
                    <p style={{ color: '#ddd', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '30px' }}>{c.desc}</p>
                </div>

                <a href={c.certLink} target="_blank" rel="noopener noreferrer" style={{ 
                    alignSelf: 'flex-start', border: '1px solid #555', color: 'white', padding: '8px 16px', textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.85rem', transition: 'all 0.3s', borderRadius: '4px' 
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ff3366'; e.currentTarget.style.color = '#ff3366'; e.currentTarget.style.background = 'rgba(255,51,102,0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'transparent'; }}>
                    [ VIEW_CERTIFICATE ]
                </a>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}