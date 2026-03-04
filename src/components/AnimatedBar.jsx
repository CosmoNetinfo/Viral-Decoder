import { useState, useEffect } from "react";

export default function AnimatedBar({ value, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 4, height: 6, overflow: "hidden", flex: 1 }}>
      <div style={{
        height: "100%", background: color, borderRadius: 4,
        width: `${width}%`, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: `0 0 10px ${color}40`
      }} />
    </div>
  );
}
