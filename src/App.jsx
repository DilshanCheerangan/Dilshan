import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Magnetic from "@/components/ui/magnetic";
import ThemeSwitch from "@/components/ui/theme-switch";
import { RevealText } from "@/components/ui/reveal-text";
import AboutSection from "@/components/sections/AboutSection";

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [homeKey, setHomeKey] = useState(0); // Key used to re-trigger home animations

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.pageX, y: e.pageY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        // If the About section has scrolled up to at least halfway into the viewport, it is active
        if (rect.top <= window.innerHeight * 0.5) {
          setActiveSection('about');
        } else {
          setActiveSection('home');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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

        {/* Desktop Navigation Links */}
        <div className="nav-links-desktop">
          <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen(false);
            setHomeKey(prev => prev + 1); // Trigger re-animation
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>Home</a>
          <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blog</a>
          <ThemeSwitch />
          <a href="#hire" className="btn-hire" onClick={() => setIsMenuOpen(false)}>Hire Me</a>
        </div>
      </motion.nav>
      
      {/* ── Mobile Navigation Menu (Global Overlay) ── */}
      <div className={`nav-links-mobile ${isMenuOpen ? 'open' : ''}`}>
        <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => {
          e.preventDefault();
          setIsMenuOpen(false);
          setHomeKey(prev => prev + 1); // Trigger re-animation
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>Home</a>
        <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>About</a>
        <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</a>
        <a href="#blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blog</a>
        <ThemeSwitch />
        <a href="#hire" className="btn-hire" onClick={() => setIsMenuOpen(false)}>Hire Me</a>
      </div>

      {/* ── Scroll Container ── */}
      <div className="scroll-wrapper">

        {/* ── Hero sticky wrap (About slides over it) ── */}
        <div className="hero-sticky-wrap" id="home">
          <main className="hero-container">
            <motion.div 
              key={homeKey}
              className="hero-content"
            >
              <motion.span
                className="hero-subtitle"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                style={{ display: 'block', paddingLeft: '4px' }}
              >
                MUHAMMED
              </motion.span>

              <RevealText
                text="DILSHAN"
                textColor="var(--primary)"
                overlayColor="var(--text-main)"
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
                  {"I'm a frontend developer focused on building fast, modern, and user-friendly web experiences.  I enjoy turning ideas into clean, interactive interfaces that feel smooth and intuitive.".split(" ").map((word, i) => (
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
                  <motion.h3
                    className="hero-role"
                    initial={{ opacity: 0, letterSpacing: "-8px", filter: "blur(12px)" }}
                    animate={{
                      opacity: 1,
                      letterSpacing: "2px",
                      filter: "blur(0px)",
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      opacity: { duration: 1.5, delay: 1.6 },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    style={{ margin: 0 }}
                  >
                    Frontend Developer
                  </motion.h3>
                </div>

                <motion.div
                  style={{ marginTop: '3rem' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.2 }}
                >
                  <Magnetic strength={0.35}>
                    <a href="#about" className="btn-work">View My Work</a>
                  </Magnetic>
                </motion.div>
              </div>
            </motion.div>

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

        {/* ── About Section (rises from bottom over hero) ── */}
        <AboutSection />

      </div>
    </div>
  );
};

export default App;
