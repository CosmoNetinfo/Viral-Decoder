const METRICS = [
  { key: "hook", label: "Hook Score", icon: "🎣", color: "var(--accent-magenta)" },
  { key: "retention", label: "Retention", icon: "🔁", color: "var(--accent-cyan)" },
  { key: "emotion", label: "Emozione", icon: "⚡", color: "var(--accent-yellow)" },
  { key: "trend", label: "Trend Align", icon: "📈", color: "var(--accent-green)" },
  { key: "shareability", label: "Shareability", icon: "🚀", color: "var(--accent-orange)" },
];

export default function RadarChart({ scores }) {
  const size = 160;
  const cx = size / 2, cy = size / 2, r = 60;
  const keys = METRICS.map(m => m.key);
  const n = keys.length;
  const points = keys.map((k, i) => {
    const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
    const val = (scores[k] || 0) / 100;
    return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) };
  });
  const gridPoints = (level) => keys.map((_, i) => {
    const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
    return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
  }).join(" ");
  const dataPath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <svg width={size} height={size} style={{ overflow: "visible" }}>
      {[0.25, 0.5, 0.75, 1].map(l => (
        <polygon key={l} points={gridPoints(l)} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      {keys.map((_, i) => {
        const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy}
          x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)}
          stroke="rgba(255,255,255,0.1)" strokeWidth="1" />;
      })}
      <path d={dataPath} fill="rgba(0, 229, 255, 0.1)" stroke="var(--accent-cyan)" strokeWidth="1.5"
        style={{ filter: "drop-shadow(0 0 6px var(--accent-cyan))" }} />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={METRICS[i].color}
          style={{ filter: `drop-shadow(0 0 4px ${METRICS[i].color})` }} />
      ))}
    </svg>
  );
}
