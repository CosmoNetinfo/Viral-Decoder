const PLATFORMS = ["YouTube", "TikTok", "Instagram Reels", "Facebook", "Twitter/X"];

export default function InputPanel({ url, setUrl, platform, setPlatform, analyze, loading }) {
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

      <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === "Enter" && analyze()}
          placeholder="Incolla URL del video o descrivi il contenuto..."
          className="cyber-input"
          style={{ flex: 1 }}
        />
        <button
          onClick={analyze}
          disabled={loading || !url.trim()}
          className="cyber-button"
        >
          {loading ? "..." : "ANALIZZA"}
        </button>
      </div>
    </div>
  );
}
