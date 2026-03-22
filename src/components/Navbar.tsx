'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      boxSizing: 'border-box', 
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      background: '#050505', /* Changed to solid dark background to block the 3D stars */
      borderBottom: '1px solid rgba(0, 255, 102, 0.1)', /* Subtle green border */
    }}>
      
      <style>{`
        .home-icon {
          color: white;
          display: flex;
          align-items: center;
          transition: all 0.3s ease-out;
          cursor: pointer;
        }
        .home-icon:hover {
          color: #00ff66;
        }
        .nav-link {
          color: #aaa;
          text-decoration: none;
          font-size: 0.8rem;
          letter-spacing: 2px;
          transition: all 0.3s ease-out;
          font-family: monospace;
          cursor: pointer;
        }
        .nav-link:hover {
          color: #00ff66;
        }
      `}</style>

      {/* Home Icon (Routes to Homepage) */}
      <Link href="/" className="home-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </Link>

      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Routes to the dedicated Profile screen */}
        <Link href="/profile" className="nav-link">PROFILE</Link>
        
        {/* Routes to the dedicated Projects screen */}
        <Link href="/projects" className="nav-link">PROJECTS</Link>
        
        {/* Routes to the dedicated Contact screen */}
        <Link href="/contact" className="nav-link">CONTACT</Link>
      </div>
    </nav>
  );
}