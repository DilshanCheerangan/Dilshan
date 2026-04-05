import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextScramble } from "@/components/ui/text-scramble";
import { RevealText } from "@/components/ui/reveal-text";

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
          <motion.span 
            className="hero-subtitle"
            initial={{ opacity: 0, letterSpacing: "-10px", filter: "blur(10px)" }}
            animate={{ opacity: 1, letterSpacing: "2px", filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'block' }}
          >
            MUHAMMED
          </motion.span>
          
          <RevealText
            text="DILSHAN"
            textColor="var(--primary)"
            overlayColor="#ffffff"
            fontSize="clamp(4rem, 12vw, 11rem)"
            className="hero-title"
            letterDelay={0.1}
          />
          
          <div className="hero-description">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 1.2 }
                }
              }}
            >
              {"I create exceptional web experiences".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  style={{ display: 'inline-block', marginRight: '0.3rem' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
            
            <div style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              <TextScramble
                className="hero-role"
                as="h3"
                duration={1.2}
                speed={0.03}
                trigger={true}
              >
                Frontend Developer
              </TextScramble>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.2 }}
            >
              <a href="#work" className="btn-work">View My Work</a>
            </motion.div>
          </div>
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

