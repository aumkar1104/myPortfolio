'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Detects the current page

export default function Navbar() {
  const pathname = usePathname(); // Gets the current URL (e.g., '/projects')

  // Helper function: returns true if the link matches the current URL
  const isActive = (path: string) => pathname === path;

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
      background: '#050505',
      borderBottom: '1px solid rgba(0, 255, 102, 0.1)', 
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
        
        /* Base link styling */
        .nav-link {
          color: #aaa;
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 2px;
          transition: all 0.3s ease-out;
          font-family: monospace;
          cursor: pointer;
          position: relative;
        }
        
        .nav-link:hover {
          color: #00ff66;
        }

        /* ACTIVE STATE: Glowing text and glowing underline */
        .nav-link.active {
          color: #00ff66;
          text-shadow: 0 0 10px rgba(0, 255, 102, 0.5);
          font-weight: bold;
        }
        
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #00ff66;
          box-shadow: 0 0 8px #00ff66;
          border-radius: 2px;
        }
      `}</style>

      {/* Home Icon (Lights up if on the exact homepage) */}
      <Link href="/" className="home-icon" style={{ 
          color: isActive('/') ? '#00ff66' : 'white',
          filter: isActive('/') ? 'drop-shadow(0 0 8px rgba(0,255,102,0.5))' : 'none'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </Link>

      <div style={{ display: 'flex', gap: '40px' }}>
        
        {/* We dynamically add the 'active' class if the pathname matches */}
        <Link href="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
            PROFILE
        </Link>
        
        <Link href="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`}>
            PROJECTS
        </Link>

        <Link href="/certifications" className={`nav-link ${isActive('/certifications') ? 'active' : ''}`}>
            CERTIFICATIONS
        </Link>
        
        <Link href="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            CONTACT
        </Link>
      </div>
    </nav>
  );
}