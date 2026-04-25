'use client';

export default function Skeleton() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '30px',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }
        .skeleton-box::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 204, 255, 0.08), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
        .nav-pill {
          width: 400px;
          height: 50px;
          border-radius: 50px;
          margin-bottom: 20vh;
        }
        .hero-title {
          width: 60%;
          height: 80px;
          margin-bottom: 20px;
        }
        .hero-text-1 {
          width: 45%;
          height: 20px;
          margin-bottom: 12px;
        }
        .hero-text-2 {
          width: 38%;
          height: 20px;
        }
        @media (max-width: 768px) {
          .nav-pill { width: 80%; }
          .hero-title { width: 85%; height: 60px; }
          .hero-text-1 { width: 70%; }
          .hero-text-2 { width: 55%; }
        }
      `}</style>

      {/* Navbar Placeholder */}
      <div className="skeleton-box nav-pill"></div>

      {/* Hero Content Placeholders */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="skeleton-box hero-title"></div>
        <div className="skeleton-box hero-text-1"></div>
        <div className="skeleton-box hero-text-2"></div>
      </div>
    </div>
  );
}
