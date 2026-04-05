import { motion } from 'framer-motion';

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
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutSection() {
  return (
    <section id="about" className="about-section">

      {/* ── Animated Background Orbs ── */}
      <div className="about-orb about-orb--1" />
      <div className="about-orb about-orb--2" />
      <div className="about-orb about-orb--3" />

      {/* ── Animated grid lines ── */}
      <div className="about-grid" aria-hidden="true" />

      {/* No separate divider needed — the curve is handled by clip-path in CSS */}

      {/* ── Main Content ── */}
      <motion.div
        className="about-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Label */}
        <motion.span className="about-label" variants={itemVariants}>
          — Who I Am
        </motion.span>

        {/* Heading */}
        <motion.h2 className="about-heading" variants={itemVariants}>
          About <span className="about-heading--accent">Me</span>
        </motion.h2>

        {/* Two-column layout on desktop */}
        <div className="about-body">

          {/* Bio text */}
          <motion.div className="about-bio" variants={containerVariants}>
            {paragraphs.map((para, i) => (
              <motion.p key={i} variants={itemVariants}>
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* Stats / Highlights cards */}
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
