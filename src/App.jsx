import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      <motion.nav 
        className="nav-container"
        initial={{ y: -100, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
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
      </motion.nav>

      {/* Hero Section */}
      <main className="hero-container">

        <div className="hero-content">
          <div style={{ position: 'relative', height: '2rem', marginBottom: '0.5rem' }}>
            <RevealText
              text="MUHAMMED"
              textColor="#ffffff"
              overlayColor="var(--primary)"
              fontSize="1.3rem"
              letterDelay={0.05}
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <RevealText
              text="DILSHAN"
              textColor="var(--primary)"
              overlayColor="#ffffff"
              fontSize="clamp(4rem, 12vw, 11rem)"
              letterDelay={0.1}
            />
          </div>
          
          <motion.div 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          >
            <p>I create exceptional web experiences</p>
            <div style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
               <RevealText
                text="Frontend Developer"
                textColor="#ffffff"
                overlayColor="var(--primary)"
                fontSize="1.8rem"
                letterDelay={0.04}
              />
            </div>
            <a href="#work" className="btn-work">View My Work</a>
          </motion.div>
        </div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img 
            src="/hero/boarderline_nobg.png" 
            alt="Muhammed Dilshan" 
            className="hero-avatar" 
          />
        </motion.div>
      </main>
    </div>
  );
};

export default App;

