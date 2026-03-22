'use client';

import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

export default function ContactPage() {
  
  const contacts = [
    {
        id: 'EMAIL',
        value: 'aumkar1104@gmail.com',
        href: 'mailto:aumkar1104@gmail.com',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
        )
    },
    {
        id: 'MOBILE',
        value: '+91 74839 71805',
        href: 'tel:+917483971805',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        )
    },
    {
        id: 'LINKEDIN',
        value: '/in/aumkar1104',
        href: 'https://linkedin.com/in/aumkar1104/',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
            </svg>
        )
    },
    {
        id: 'GITHUB',
        value: '/aumkar1104',
        href: 'https://github.com/aumkar1104',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
        )
    }
  ];

  const handleTransmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const msg = formData.get('message');
    window.location.href = `mailto:aumkar1104@gmail.com?subject=Contact via Portfolio [${name}]&body=${msg}`;
  };

  return (
    <main style={{ width: '100%', minHeight: '100vh', position: 'relative', background: '#050505', color: 'white' }}>
      
      <Cursor />
      <Navbar />
      
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.7 }}>
        <Scene />
      </div>

      {/* Main Content Container - ANIMATION ADDED HERE */}
      <div style={{ 
          position: 'relative', zIndex: 10, paddingTop: '180px', paddingBottom: '100px', 
          maxWidth: '1200px', width: '90%', margin: '0 auto',
          animation: 'cyber-boot 0.4s ease-out forwards' /* THE FIX */
      }}>
        
        {/* HEADER */}
        <div style={{ width: '100%', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '2.5rem', fontFamily: 'monospace', color: 'white', margin: 0, letterSpacing: '2px', fontWeight: '300' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ccff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(0,204,255,0.8))' }}>
                  <polyline points="13 17 18 12 13 7"></polyline>
                  <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
              INITIATE_CONTACT
              <span style={{ display: 'inline-block', width: '14px', height: '4px', background: '#00ccff', marginBottom: '4px', animation: 'blink 1s step-end infinite', boxShadow: '0 0 8px #00ccff' }}></span>
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0, 204, 255, 0.05)', border: '1px solid rgba(0, 204, 255, 0.2)', padding: '8px 16px', borderRadius: '20px' }}>
                <span style={{ width: '8px', height: '8px', background: '#00ccff', borderRadius: '50%', boxShadow: '0 0 10px #00ccff', animation: 'pulse 2s infinite' }}></span>
                <span style={{ fontFamily: 'monospace', color: '#00ccff', fontSize: '0.85rem', letterSpacing: '1px' }}>SYSTEM ONLINE // LISTENING</span>
            </div>
        </div>

        {/* 2-COLUMN DASHBOARD LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            
            {/* LEFT COLUMN: Links & Telemetry */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                
                {/* Contact Links Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                {contacts.map((contact) => (
                    <a 
                        key={contact.id}
                        href={contact.href} 
                        target={contact.id !== 'EMAIL' && contact.id !== 'MOBILE' ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        style={{ 
                            background: 'rgba(10, 15, 20, 0.8)', border: '1px solid rgba(0, 204, 255, 0.1)', 
                            padding: '20px', borderRadius: '8px', backdropFilter: 'blur(10px)',
                            textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '10px',
                            transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => { 
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.borderColor = 'rgba(0, 204, 255, 0.6)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,204,255,0.1) 0%, rgba(10,15,20,0.8) 100%)';
                            const icon = e.currentTarget.querySelector('.contact-icon') as HTMLElement;
                            if(icon) icon.style.color = 'white';
                        }}
                        onMouseLeave={(e) => { 
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(0, 204, 255, 0.1)';
                            e.currentTarget.style.background = 'rgba(10, 15, 20, 0.8)';
                            const icon = e.currentTarget.querySelector('.contact-icon') as HTMLElement;
                            if(icon) icon.style.color = '#00ccff';
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="contact-icon" style={{ color: '#00ccff', transition: 'color 0.3s ease' }}>{contact.icon}</div>
                            <span style={{ color: '#555', fontFamily: 'monospace', fontSize: '1rem' }}>↗</span>
                        </div>
                        <div>
                            <div style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '3px' }}>{contact.id}</div>
                            <div style={{ color: 'white', fontFamily: 'monospace', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.value}</div>
                        </div>
                    </a>
                ))}
                </div>

                {/* Operator Telemetry Panel */}
                <div style={{ background: 'rgba(10, 15, 20, 0.8)', border: '1px solid rgba(0, 204, 255, 0.2)', padding: '25px', borderRadius: '8px', backdropFilter: 'blur(10px)' }}>
                    <h2 style={{ color: '#00ccff', fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: '20px', letterSpacing: '1px' }}>
                        [ OPERATOR_TELEMETRY ]
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#888' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #333', paddingBottom: '8px' }}>
                            <span>BASE_LOCATION:</span> <span style={{ color: '#ddd' }}>India</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #333', paddingBottom: '8px' }}>
                            <span>EDUCATION_STATUS:</span> <span style={{ color: '#ddd' }}>3rd Year B.Tech CSE</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #333', paddingBottom: '8px' }}>
                            <span>CURRENT_DIRECTIVE:</span> <span style={{ color: '#ddd' }}>Android Dev / DSA</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #333', paddingBottom: '8px' }}>
                            <span>LINGUISTIC_MODULES:</span> <span style={{ color: '#ddd' }}>EN, HI, KN, TE</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div style={{ background: 'rgba(10, 15, 20, 0.8)', border: '1px solid rgba(0, 204, 255, 0.2)', padding: '30px', borderRadius: '8px', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ color: 'white', fontFamily: 'monospace', fontSize: '1.3rem', marginBottom: '5px', letterSpacing: '1px' }}>
                    DIRECT_MESSAGE_PROTOCOL
                </h2>
                <p style={{ color: '#888', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '25px' }}>
                    // SECURE END-TO-END TRANSMISSION
                </p>

                <form onSubmit={handleTransmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1 }}>
                    <input 
                        required type="text" name="name" placeholder="INITIATOR_NAME" 
                        style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid #333', padding: '15px', color: 'white', fontFamily: 'monospace', borderRadius: '4px', outline: 'none', transition: 'border 0.3s' }}
                        onFocus={(e) => e.target.style.border = '1px solid #00ccff'}
                        onBlur={(e) => e.target.style.border = '1px solid #333'}
                    />
                    
                    <input 
                        required type="email" name="email" placeholder="RETURN_ADDRESS (EMAIL)" 
                        style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid #333', padding: '15px', color: 'white', fontFamily: 'monospace', borderRadius: '4px', outline: 'none', transition: 'border 0.3s' }}
                        onFocus={(e) => e.target.style.border = '1px solid #00ccff'}
                        onBlur={(e) => e.target.style.border = '1px solid #333'}
                    />
                    
                    <textarea 
                        required name="message" placeholder="ENTER_MESSAGE_PAYLOAD..." rows={5}
                        style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid #333', padding: '15px', color: 'white', fontFamily: 'monospace', borderRadius: '4px', outline: 'none', transition: 'border 0.3s', resize: 'none', flexGrow: 1 }}
                        onFocus={(e) => e.target.style.border = '1px solid #00ccff'}
                        onBlur={(e) => e.target.style.border = '1px solid #333'}
                    ></textarea>

                    <button 
                        type="submit" 
                        style={{ background: 'rgba(0, 204, 255, 0.1)', border: '1px solid #00ccff', color: '#00ccff', padding: '15px', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '2px', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#00ccff'; e.currentTarget.style.color = 'black'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0,204,255,0.4)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 204, 255, 0.1)'; e.currentTarget.style.color = '#00ccff'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                        [ TRANSMIT_PAYLOAD ] ↗
                    </button>
                </form>
            </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
            100% { opacity: 1; transform: scale(1); }
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
      `}</style>
    </main>
  );
}