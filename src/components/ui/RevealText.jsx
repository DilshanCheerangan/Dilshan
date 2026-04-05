import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function RevealText({
  text = "STUNNING",
  textColor = "inherit",
  overlayColor = "var(--primary)",
  fontSize = "clamp(4rem, 12vw, 11rem)",
  letterDelay = 0.08,
  overlayDelay = 0.05,
  overlayDuration = 0.4,
  springDuration = 600,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showRedText, setShowRedText] = useState(false);
  
  useEffect(() => {
    const lastLetterDelay = (text.length - 1) * letterDelay;
    const totalDelay = (lastLetterDelay * 1000) + springDuration;
    
    const timer = setTimeout(() => {
      setShowRedText(true);
    }, totalDelay);
    
    return () => clearTimeout(timer);
  }, [text.length, letterDelay, springDuration]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div style={{ display: "flex" }}>
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              fontSize: fontSize,
              fontWeight: 900,
              letterSpacing: "-2px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              lineHeight: 0.85,
              textTransform: "uppercase",
              display: "inline-block", // crucial for transform scale to work properly!
            }}
            initial={{ 
              scale: 0,
              opacity: 0,
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
            }}
            whileHover={{ 
              scale: 1.15,
              color: overlayColor, // Added simple color change on hover
              transition: { delay: 0, type: "spring", stiffness: 400, damping: 10 }
            }}
            transition={{
              delay: index * letterDelay,
              type: "spring",
              damping: 8,
              stiffness: 200,
              mass: 0.8,
            }}
          >
            {/* Base text layer */}
            <motion.span 
              style={{
                position: "relative",
                color: hoveredIndex === index ? overlayColor : textColor,
                transition: "color 0.2s ease",
                display: "inline-block",
                textShadow: "0 15px 35px rgba(0,0,0,0.9), 0 5px 10px rgba(0,0,0,0.8)"
              }}
            >
              {letter}
            </motion.span>
            
            {/* Overlay text layer that sweeps across each letter initially */}
            {showRedText && (
              <motion.span
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, bottom: 0,
                  color: overlayColor,
                  pointerEvents: "none"
                }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  delay: index * overlayDelay,
                  duration: overlayDuration,
                  times: [0, 0.1, 0.7, 1],
                  ease: "easeInOut"
                }}
              >
                {letter}
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
