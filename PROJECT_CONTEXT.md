# PROJECT_CONTEXT.md

## 🚀 Project: Personal Portfolio Website (aumkar.live)
**Current Status:** "Golden Version" restored from GitHub. 

## 🛠 Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript / React
- **Styling:** Inline CSS-in-JS + Tailwind
- **Graphics:** Three.js / React Three Fiber (The `<Scene />` component)

## 🏗 Structure
- `src/app/page.tsx` → The core entry point.
- `src/components/Scene.tsx` → The 3D background engine.
- `src/components/Navbar.tsx` → Global navigation controls.
- `public/` → Contains `portrait.png` and `myCV1.pdf`.

## 📜 Core Rules (The Memory)
1. **Performance First:** All scroll-based animations must use the `useRef` + `requestAnimationFrame` hardware-accelerated loop. **Never** use `useState` for scrolling.
2. **Aesthetic Integrity:** Maintain the "Cyber-Terminal" theme. 
   - Background: Dark Navy/Black (#050505).
   - Accents: Neon Green (#00ff66) for projects, Cyan (#00ccff) for headers, Crimson (#ff3366) for alerts/CV.
3. **Data Protection:** Do NOT delete or summarize technical skills (e.g., Selenium IDE, Eclipse, AtlasMe details) during refactors.
4. **Layout Stability:** Do not alter the viewport-independent layout unless explicit responsive scaling is requested.

## 🎯 Current Goals
1. **Stability:** Ensure the GitHub-cloned version is running smoothly without lag.
2. **Refinement:** Slowly introduce a single-page scrolling experience *only* once the navigation logic is confirmed safe.
3. **Responsive Audit:** Fix portrait and header scaling for smaller mobile viewports.

---
👉 **AI INSTRUCTION:** Reference this file before every code generation to ensure architectural alignment.