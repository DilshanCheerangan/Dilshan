import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import SnakeBackground from './SnakeBackground';
import { TextScramble } from '@/components/ui/text-scramble';


const stats = [
  { value: "2+", label: "Years Building" },
  { value: "Modern", label: "Tech Stack" },
  { value: "Open", label: "To Opportunities" },
];

const paragraphs = [
  "I'm Dilshan, a frontend developer and student focused on building clean, fast, and user-friendly web experiences.",
  "I enjoy turning ideas into real products and creating interfaces that feel smooth and intuitive. I've been actively building projects to improve my skills in modern frontend development, focusing on performance, usability, and clean design.",
  "Currently, I'm looking for opportunities to learn, collaborate, and grow through real-world experience.",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const SpotlightHeading = ({ variants }) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch capability to handle mobile visual overrides
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="about-spotlight-container"
      variants={variants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TextScramble className="about-heading about-heading-dim" as="h2">
        ABOUT ME
      </TextScramble>
      <motion.div
        className="about-spotlight-reveal"    
        style={{
          WebkitMaskImage: isTouch 
            ? 'none' 
            : `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 80%)`,
          maskImage: isTouch 
            ? 'none' 
            : `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 80%)`,
        }}
        animate={isTouch ? {
          opacity: [0.7, 1, 0.7],
        } : {
          opacity: isHovered ? 1 : 0
        }}
        transition={isTouch ? {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        } : {
          duration: 0.3
        }}
      >
        <h2 className="about-heading about-heading-glow">
          ABOUT ME
        </h2>
      </motion.div>
    </motion.div>
  );
};

export default function AboutSection() {

  return (
    <section id="about" className="about-section">

      {/* ── Wave projecting UPWARDS from the top of the section ── */}
      <div className="about-wave-top">
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
          <path 
            className="about-wave-fill"
            d="M0,150 L1440,150 L1440,50 C1320,100 1200,10 1000,60 C800,110 600,20 400,80 C200,140 0,60 0,60 Z" 
          />
        </svg>
      </div>

      {/* ── Background animations layer updated to the new WASD Snake ── */}
      <div className="about-bg-layer">
        <SnakeBackground />
      </div>


      {/* ── Main Content ── */}
      <motion.div
        className="about-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SpotlightHeading variants={itemVariants} />

        <div className="about-body">
          {/* Bio text */}
          <motion.div className="about-bio" variants={containerVariants}>
            {paragraphs.map((para, i) => (
              <motion.p key={i} variants={itemVariants}>{para}</motion.p>
            ))}
          </motion.div>

          {/* Stats cards */}
          <motion.div className="about-stats" variants={containerVariants}>
            {stats.map((s, i) => (
              <motion.div key={i} className="about-stat-card" variants={itemVariants}>
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
