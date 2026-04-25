'use client';

import Link from 'next/link';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  return (
    <nav style={{
      position: 'fixed',
      top: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      background: 'rgba(10, 15, 20, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '50px',
      padding: '10px 30px',
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
    }}>
      
      <style>{`
        .nav-link {
          color: #aaa;
          text-decoration: none;
          font-size: 0.75rem;
          letter-spacing: 2px;
          transition: all 0.3s ease-out;
          font-family: monospace;
          cursor: pointer;
        }
        
        .nav-link:hover {
          color: #00ccff;
        }

        .nav-link.active {
          color: #00ccff;
          text-shadow: 0 0 10px rgba(0, 204, 255, 0.6);
          position: relative;
        }

        .nav-link.active::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: #00ccff;
          border-radius: 50%;
          box-shadow: 0 0 8px #00ccff;
        }
      `}</style>

      <Link href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>
          HOME
      </Link>

      <Link href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>
          ABOUT
      </Link>
      
      <Link href="#work" className={`nav-link ${activeSection === 'work' ? 'active' : ''}`}>
          WORK
      </Link>

      <Link href="#certifications" className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}>
          CERTIFICATIONS
      </Link>
      
      <Link href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>
          CONTACT
      </Link>
    </nav>
  );
}
