import ScoreRing from "./ScoreRing";
import RadarChart from "./RadarChart";
import AnimatedBar from "./AnimatedBar";
import BlueprintSection from "./BlueprintSection";

const METRICS = [
  { key: "hook", label: "Hook Score", icon: "🎣", color: "var(--accent-magenta)" },
  { key: "retention", label: "Retention", icon: "🔁", color: "var(--accent-cyan)" },
  { key: "emotion", label: "Emozione", icon: "⚡", color: "var(--accent-yellow)" },
  { key: "trend", label: "Trend Align", icon: "📈", color: "var(--accent-green)" },
  { key: "shareability", label: "Shareability", icon: "🚀", color: "var(--accent-orange)" },
];

export default function AnalysisResult({ result, platform }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      
      {/* Viral Core / Secret Sauce */}
      {result.viralCore && (
        <div className="glass-panel" style={{ 
          padding: "16px 24px", 
          borderLeft: "4px solid var(--accent-magenta)",
          background: "linear-gradient(90deg, rgba(255, 61, 113, 0.1), transparent)"
        }}>
          <span style={{ fontSize: 10, letterSpacing: 2, color: "var(--accent-magenta)", fontWeight: 700 }}>
            🔥 VIRAL CORE (IL SEGRETO)
          </span>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginTop: 4 }}>
            {result.viralCore}
          </div>
        </div>
      )}

      {/* Real Statistics Report */}
      {result.stats && (
        <div className="stats-report-grid">
          <div className="stat-card">
            <span className="stat-label">VIEWS</span>
            <span className="stat-value">{result.stats.views}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">LIKES</span>
            <span className="stat-value">{result.stats.likes}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">ENGAGEMENT</span>
            <span className="stat-value" style={{ color: 'var(--accent-cyan)' }}>{result.stats.engagementRate}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">PUBBLICATO</span>
            <span className="stat-value" style={{ fontSize: '11px' }}>{result.stats.postingDate}</span>
          </div>
        </div>
      )}

      {/* Score + Radar Row */}
      <div className="glass-panel" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 28
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <ScoreRing score={result.viralScore} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>{result.contentType}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4, letterSpacing: 2 }}>{result.targetAudience}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <RadarChart scores={result.scores} />
          <div style={{ fontSize: 9, color: "#333", letterSpacing: 2, marginTop: 8 }}>RADAR VIRALITÀ</div>
        </div>
      </div>

      {/* Blueprint Section (THE NEW CORE) */}
      <BlueprintSection blueprint={result.videoBlueprint} />

      {/* Metric Bars */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <span className="section-label">▶ METRICHE CHIAVE</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {METRICS.map((m, i) => (
            <div key={m.key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14 }}>{m.icon}</span>
              <span style={{ fontSize: 10, letterSpacing: 1, color: "#555", width: 90, flexShrink: 0 }}>{m.label}</span>
              <AnimatedBar value={result.scores[m.key] || 0} color={m.color} delay={i * 100} />
              <span style={{ fontSize: 11, fontWeight: 700, color: m.color, width: 32, textAlign: "right" }}>
                {result.scores[m.key]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy Section */}
      <div className="glass-panel" style={{
        background: "linear-gradient(135deg, rgba(0, 255, 136, 0.05), var(--panel-bg))",
        borderColor: "rgba(0, 255, 136, 0.2)", padding: 24
      }}>
        <span className="section-label" style={{ color: "var(--accent-green)" }}>📈 CREATIVE STRATEGY</span>
        <p style={{ margin: 0, fontSize: 13, color: "#c0c0c0", lineHeight: 1.7 }}>{result.creativeStrategy}</p>
      </div>

      {/* Hook Analysis */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <span className="section-label" style={{ color: "var(--accent-magenta)" }}>🎣 HOOK INSIGHT</span>
        <p style={{ margin: 0, fontSize: 12, color: "#aaa", lineHeight: 1.8 }}>{result.hookAnalysis}</p>
      </div>

      {/* Key Insight Bottom */}
      <div className="glass-panel" style={{
        background: "linear-gradient(135deg, rgba(0, 229, 255, 0.05), var(--panel-bg))",
        borderColor: "rgba(0, 229, 255, 0.2)", padding: 24
      }}>
        <span className="section-label" style={{ color: "var(--accent-cyan)" }}>💡 KEY INSIGHT</span>
        <p style={{ margin: 0, fontSize: 12, color: "#aaa", lineHeight: 1.9, whiteSpace: "pre-line" }}>
          {result.keyInsight}
        </p>
      </div>
    </div>
  );
}
