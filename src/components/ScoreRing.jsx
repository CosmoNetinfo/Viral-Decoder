import { useState, useEffect } from "react";

export default function ScoreRing({ score }) {
  const r = 44, circ = 2 * Math.PI * r;
  const [dash, setDash] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setDash((score / 100) * circ), 300);
    return () => clearTimeout(t);
  }, [score, circ]);
  
  const color = score >= 80 ? "var(--accent-green)" : 
                score >= 60 ? "var(--accent-yellow)" : 
                score >= 40 ? "var(--accent-orange)" : 
                "var(--accent-magenta)";
                
  return (
    <div style={{ position: "relative", width: 110, height: 110 }}>
      <svg width={110} height={110} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={55} cy={55} r={r} fill="none" stroke="#1a1a1a" strokeWidth={8} />
        <circle cx={55} cy={55} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 8px ${color})` }} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ fontSize: 22, fontWeight: 900, color, fontFamily: "'Space Mono', monospace" }}>{score}</span>
        <span style={{ fontSize: 9, color: "#666", letterSpacing: 2, fontFamily: "'Space Mono', monospace" }}>VIRAL</span>
      </div>
    </div>
  );
}
