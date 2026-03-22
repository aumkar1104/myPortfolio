import { moduleData } from "@/data/content";
import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import Link from "next/link";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  // 1. AWAIT PARAMS (Crucial for Next.js 15 to read the ID)
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // 2. FETCH DATA
  const data = moduleData[id as keyof typeof moduleData];

  // 3. ERROR HANDLING (If ID is wrong or file is missing)
  if (!data) {
    return (
      <div style={{ color: 'white', padding: '200px', textAlign: 'center', fontFamily: 'monospace' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>// ERROR: 404</h1>
        <p>MODULE_DATA_NOT_FOUND_FOR_ID: "{id}"</p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '30px', borderBottom: '1px solid white' }}>
          RETURN_HOME
        </Link>
      </div>
    );
  }

  return (
    <main style={{ width: '100%', minHeight: '100vh', position: 'relative', color: 'white' }}>
      
      {/* GLOBAL LAYOUT ELEMENTS */}
      <Cursor />
      <Scene />
      <Navbar />

      {/* CONTENT CONTAINER 
          paddingTop: '240px' -> FORCE content down below the Navbar.
          This value is very large to ensure it never overlaps.
      */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '240px 40px 100px 40px', // Top, Right, Bottom, Left
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* BREADCRUMB */}
        <div style={{ 
          color: '#666', 
          marginBottom: '30px', 
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          letterSpacing: '1px'
        }}>
           {`< MODULE_${id} />`}
        </div>

        {/* TITLE */}
        <h1 style={{ 
          fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
          fontWeight: '800', 
          marginBottom: '10px', 
          lineHeight: '1',
          letterSpacing: '-1px'
        }}>
          {data.title}
        </h1>
        
        {/* SUBTITLE */}
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#888', 
          marginBottom: '50px', 
          letterSpacing: '3px', 
          textTransform: 'uppercase' 
        }}>
          {data.subtitle}
        </p>

        {/* DESCRIPTION */}
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8', 
          color: '#ccc', 
          marginBottom: '60px',
          maxWidth: '700px'
        }}>
          {data.description}
        </p>

        {/* CODE BLOCK */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '30px',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          color: '#aaffaa',
          whiteSpace: 'pre-wrap',
          overflowX: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}>
          {data.code}
        </div>

        {/* BACK BUTTON */}
        <Link href="/" style={{
          display: 'inline-block',
          marginTop: '80px',
          color: 'white',
          borderBottom: '1px solid rgba(255,255,255,0.3)',
          textDecoration: 'none',
          paddingBottom: '5px',
          fontSize: '0.9rem',
          letterSpacing: '1px',
          opacity: 0.7
        }}>
          ← RETURN TO HUB
        </Link>
      </div>
    </main>
  );
}