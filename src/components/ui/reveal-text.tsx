import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
  text?: string;
  textColor?: string;
  overlayColor?: string;
  fontSize?: string;
  fontWeight?: number;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function RevealText({
  text = "STUNNING",
  textColor = "inherit",
  overlayColor = "var(--primary)",
  fontSize = "clamp(4rem, 12vw, 11rem)",
  fontWeight = 800,
  letterDelay = 0.08,
  overlayDelay = 0.05,
  overlayDuration = 0.4,
  springDuration = 600,
  style = {},
  className = "",
}: RevealTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <div 
      className={className} 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        position: "relative",
        ...style 
      }}
    >
      <div style={{ display: "flex" }}>
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              fontSize: fontSize,
              fontWeight: fontWeight,
              letterSpacing: "-2px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              lineHeight: 0.85,
              textTransform: "uppercase",
              display: "inline-block",
              zIndex: index, /* Ensure each letter stacks on top of the previous one */
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
              color: overlayColor,
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
            <motion.span 
              style={{
                position: "relative",
                color: hoveredIndex === index ? overlayColor : textColor,
                transition: "color 0.2s ease",
                display: "inline-block",
                textShadow: "var(--hero-3d-shadow, -6px 6px 15px rgba(0,0,0,0.9), -2px 2px 5px rgba(0,0,0,0.7))"
              }}
            >
              {letter}
            </motion.span>
            
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
