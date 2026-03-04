const PLATFORMS = ["YouTube", "TikTok", "Instagram Reels", "Facebook", "Twitter/X"];

export default function InputPanel({ url, setUrl, platform, setPlatform, analyze, loading, startDemo }) {
  return (
    <div className="glass-panel" style={{ padding: 28, marginBottom: 28 }}>
      <span className="section-label">▶ INPUT PARAMETRI</span>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {PLATFORMS.map(p => (
          <button 
            key={p} 
            onClick={() => setPlatform(p)} 
            className={`platform-btn ${platform === p ? 'active' : ''}`}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "stretch", flexWrap: "wrap" }}>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === "Enter" && analyze()}
          placeholder="Incolla URL del video o descrivi il contenuto..."
          className="cyber-input"
          style={{ flex: "1 1 300px" }}
        />
        <div style={{ display: "flex", gap: 12, flex: "0 0 auto" }}>
          <button
            onClick={analyze}
            disabled={loading || !url.trim()}
            className="cyber-button"
          >
            {loading ? "..." : "ANALIZZA"}
          </button>
          <button
            onClick={startDemo}
            disabled={loading}
            className="cyber-button"
            style={{ 
              borderColor: "var(--accent-magenta)", 
              color: "var(--accent-magenta)",
              background: "linear-gradient(135deg, rgba(255, 61, 113, 0.1), rgba(255, 61, 113, 0.2))",
              boxShadow: "0 0 15px rgba(255, 61, 113, 0.1)"
            }}
          >
            DEMO ◈
          </button>
        </div>
      </div>
    </div>
  );
}
