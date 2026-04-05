import React, { useState, useEffect } from 'react';
import { RevealText } from './components/ui/RevealText';

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.pageX, y: e.pageY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app-container">
      {/* Interactive Dot Lighting Layer */}
      <div 
        className="dots-bright"
        style={{
          '--mouse-x': `${mousePos.x}px`,
          '--mouse-y': `${mousePos.y}px`
        }}
      />
      
      {/* Background Sparkles/Glow */}
      <div className="bg-sparkles" />
      
      {/* Navbar */}
      <nav className="nav-container">
        <div className="nav-logo">
          MUHAMMED <span>DILSHAN</span>
        </div>

        {/* Hamburger Toggle */}
        <button 
          className={`mobile-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="#home" className="nav-link active" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blog</a>
          <a href="#hire" className="btn-hire" onClick={() => setIsMenuOpen(false)}>Hire Me</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-container">
        {/* Paper Plane Decoration */}
        <div className="paper-plane">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 3L3 10.5L11 13L13 21L21 3Z" stroke="#ccc" strokeWidth="1" />
            <path d="M11 13L21 3" stroke="#ccc" strokeWidth="1" />
          </svg>
        </div>

        <div className="hero-content">
          <span className="hero-subtitle">MUHAMMED</span>
          
          <div style={{ marginBottom: "1.5rem" }}>
            <RevealText 
              text="DILSHAN"
              textColor="var(--primary)"
              overlayColor="#ffffff"
              fontSize="clamp(4rem, 12vw, 11rem)"
            />
          </div>
          
          <div className="hero-description">
            <p>I create exceptional web experiences</p>
            <h3 className="hero-role">Frontend Developer</h3>
            <a href="#work" className="btn-work">View My Work</a>
          </div>
        </div>

        <div className="hero-visual">
          <img 
            src="/hero/boarderline_nobg.png" 
            alt="Muhammed Dilshan" 
            className="hero-avatar" 
          />
        </div>
      </main>
    </div>
  );
};

export default App;

