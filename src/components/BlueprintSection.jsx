export default function BlueprintSection({ blueprint }) {
  if (!blueprint || !Array.isArray(blueprint)) return null;

  return (
    <div className="glass-panel" style={{ padding: 24, marginBottom: 16 }}>
      <span className="section-label" style={{ color: "var(--accent-cyan)" }}>🎬 BLUEPRINT DI PRODUZIONE (COSA COPIARE)</span>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 10 }}>
        {blueprint.map((scene, i) => (
          <div key={i} style={{ 
            display: "grid", 
            gridTemplateColumns: "80px 1fr", 
            gap: 20,
            position: "relative"
          }}>
            {/* Timeline element */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center"
            }}>
              <div style={{ 
                fontSize: 12, fontWeight: 700, color: "var(--accent-cyan)", 
                background: "rgba(0, 229, 255, 0.1)", padding: "4px 8px", 
                borderRadius: 4, width: "100%", textAlign: "center" 
              }}>
                {scene.time}
              </div>
              {i < blueprint.length - 1 && (
                <div style={{ width: 1, flex: 1, background: "rgba(0, 229, 255, 0.2)", margin: "8px 0" }} />
              )}
            </div>

            {/* Scene Content */}
            <div style={{ paddingBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
                {scene.action}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ fontSize: 11, color: "var(--accent-yellow)", display: "flex", alignItems: "center", gap: 4 }}>
                  <span>🎵</span> {scene.audio}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontStyle: "italic" }}>
                  <span style={{ color: "var(--accent-green)" }}>💡</span> {scene.reason}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
