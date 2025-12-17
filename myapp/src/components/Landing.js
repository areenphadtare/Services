import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import userImg from "../assets/user.svg";
import aiImg from "../assets/ai.svg";
import codeImg from "../assets/code.svg";
import trendImg from "../assets/trendesetter.svg";
import portfolioImg from "../assets/portfolio.svg";

export default function LandingPage() {
  const navigate = useNavigate();

  /* =======================
     Typing Animation Logic
  ======================== */
  const codeLines = useMemo(
    () => [
      "const user = new User('You');",
      "user.learn('AI', 'ML', 'Web', 'Cloud');",
      "user.connect(community);",
      "user.buildPortfolio();",
      "user.getOpportunities();",
      "user.levelUp(); // 🚀",
    ],
    []
  );

  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= codeLines.length) return;

    if (charIdx < codeLines[lineIdx].length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + codeLines[lineIdx][charIdx]);
        setCharIdx((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      setDisplayed((prev) => prev + "\n");
      setLineIdx((prev) => prev + 1);
      setCharIdx(0);
    }
  }, [charIdx, lineIdx, codeLines]);

  /* =======================
     Particle Background
  ======================== */
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }).map(() => ({
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 20 + 10}px`,
        delay: Math.random() * 6,
      })),
    []
  );

  /* =======================
     Motion Variants
  ======================== */
  const heroVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const cards = [
    { img: aiImg, title: "AI & ML Integration", desc: "Hands-on AI/ML projects aligned with industry needs." },
    { img: codeImg, title: "Code Collaboration", desc: "Collaborate with developers and mentors worldwide." },
    { img: trendImg, title: "Latest Tech Trends", desc: "Stay ahead with curated tech updates." },
    { img: portfolioImg, title: "Portfolio Builder", desc: "Showcase verified projects to recruiters." },
    { img: userImg, title: "Personal Dashboard", desc: "Track growth with smart recommendations." },
    { img: aiImg, title: "Advanced Analytics", desc: "Data-driven insights into your learning journey." },
  ];

  return (
    <>
      <style>{`
        .landing-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 40px 20px;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px;
          max-width: 800px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 40px;
        }
        .landing-title {
          font-size: 2.8em;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 18px;
          text-align: center;
        }
        .landing-desc {
          font-size: 1.2em;
          color: #34495e;
          margin-bottom: 32px;
          line-height: 1.5;
          text-align: center;
        }
        .cta-btn {
          background: linear-gradient(90deg, #3498db 0%, #2980b9 100%);
          color: #fff;
          font-size: 1.1em;
          font-weight: 600;
          padding: 16px 40px;
          border: none;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          display: block;
          margin: 0 auto;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(52, 152, 219, 0.4);
        }
        .info-containers {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          margin-top: 48px;
          justify-items: center;
        }
        .info-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 24px;
          width: 100%;
          max-width: 300px;
          height: 250px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .info-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
          border-color: rgba(52, 152, 219, 0.3);
        }
        .info-img {
          width: 64px;
          height: 64px;
          margin-bottom: 18px;
          filter: drop-shadow(0 2px 8px rgba(52, 152, 219, 0.3));
          transition: all 0.3s ease;
        }
        .info-card:hover .info-img {
          transform: scale(1.1);
          filter: drop-shadow(0 4px 16px rgba(52, 152, 219, 0.5));
        }
        .info-card h2 {
          font-size: 1.3em;
          font-weight: 700;
          color: #3498db;
          margin-bottom: 10px;
        }
        .info-card p {
          color: #34495e;
          line-height: 1.4;
        }
        .coding-animation {
          background: rgba(255, 255, 255, 0.9);
          color: #2c3e50;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 1.1em;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
          padding: 24px 32px;
          margin: 48px auto 0 auto;
          max-width: 540px;
          min-height: 120px;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
        }
        .coding-cursor {
          display: inline-block;
          width: 10px;
          height: 1.2em;
          background: #3498db;
          margin-left: 2px;
          animation: blink 1s steps(2, start) infinite;
          vertical-align: middle;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .footer {
          margin-top: 64px;
          text-align: center;
          padding: 40px 20px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          margin-bottom: 20px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
        .footer h2 {
          font-size: 2em;
          margin-bottom: 20px;
          color: #2c3e50;
        }
        .website-btn {
          background: linear-gradient(90deg, #3498db, #2980b9);
          color: #fff;
          padding: 16px 32px;
          border: none;
          border-radius: 12px;
          font-size: 1.2em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(52, 152, 219, 0.3);
        }
        .website-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: -1;
        }
        .particle {
          position: absolute;
          background: linear-gradient(45deg, #3498db, #2980b9);
          border-radius: 50%;
          opacity: 0.3;
          animation: float 8s infinite linear;
        }
        .particle:nth-child(odd) {
          animation-duration: 10s;
          animation-direction: reverse;
        }
        .particle:nth-child(3n) {
          border-radius: 0;
          background: linear-gradient(45deg, #3498db, #00ff88);
          animation: float 12s infinite ease-in-out;
        }
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }
        @media (max-width: 900px) {
          .info-containers { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
        }
        @media (max-width: 600px) {
          .glass-card { padding: 24px 8px; }
          .landing-title { font-size: 2em; }
          .info-containers { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="landing-bg">
      {/* =======================
         Background Particles
      ======================== */}
      <div className="particles">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{ left: p.left, width: p.size, height: p.size }}
            animate={{ y: [0, -40, 0], x: [0, 20, -10, 0] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* =======================
         Hero Section
      ======================== */}
      <motion.div
        className="glass-card"
        variants={heroVariant}
        initial="hidden"
        animate="visible"
      >
        <h1 className="landing-title">
          Your Gateway to Tech Excellence
        </h1>
        <p className="landing-desc">
          A modern platform to learn, build, collaborate, and launch your tech career —
          powered by real-world projects and industry-grade workflows.
        </p>

        <motion.button
          className="cta-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* =======================
         Feature Cards
      ======================== */}
      <div className="info-containers">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="info-card"
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{
              y: -10,
              scale: 1.04,
              boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <img src={card.img} alt={card.title} className="info-img" loading="lazy" />
            <h2>{card.title}</h2>
            <p>{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* =======================
         Coding Animation
      ======================== */}
      <motion.div
        className="coding-animation"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <pre>
          {displayed}
          <span className="coding-cursor" />
        </pre>
      </motion.div>

      {/* =======================
         Footer CTA
      ======================== */}
      <motion.div
        className="footer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Build. Learn. Get Hired.</h2>
        <motion.button
          className="website-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 280 }}
          onClick={() => navigate("/login")}
        >
          Enter Platform
        </motion.button>
      </motion.div>
    </div>
    </>
  );
}
