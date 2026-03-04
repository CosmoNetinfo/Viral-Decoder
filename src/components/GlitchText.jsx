import { useState, useEffect } from "react";

export default function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{
        position: glitch ? "absolute" : "static",
        left: glitch ? "-2px" : 0, top: 0,
        color: glitch ? "var(--accent-magenta)" : "inherit",
        clipPath: glitch ? "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)" : "none",
        opacity: glitch ? 0.7 : 1,
        zIndex: 1
      }}>{text}</span>
      {glitch && <span style={{
        position: "absolute", left: "2px", top: 0,
        color: "var(--accent-cyan)",
        clipPath: "polygon(0 50%, 100% 50%, 100% 70%, 0 70%)",
        opacity: 0.7,
        zIndex: 1
      }}>{text}</span>}
      <span style={{ position: "relative", zIndex: 2 }}>{text}</span>
    </span>
  );
}
