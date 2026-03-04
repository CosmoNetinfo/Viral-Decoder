import { useState, useEffect, useRef } from "react";
import GlitchText from "./components/GlitchText";
import InputPanel from "./components/InputPanel";
import AnalysisResult from "./components/AnalysisResult";

const MOCK_DATA = {
  "title": "Come ho costruito un impero da 10M con l'AI (Demo)",
  "viralScore": 94,
  "viralCore": "L'uso di un contrasto netto tra fallimento iniziale e successo estremo, supportato da prove visive fast-paced.",
  "stats": {
    "views": "1.250.400",
    "likes": "142.000",
    "comments": "3.420",
    "engagementRate": "11.6%",
    "postingDate": "2 settimane fa"
  },
  "scores": {
    "hook": 98,
    "retention": 89,
    "emotion": 92,
    "trend": 85,
    "shareability": 95
  },
  "hookAnalysis": "Il video inizia con un frame di un conto in rosso (-1.400€) seguito immediatamente da una transizione glitch verso una villa lussuosa. Questo 'pattern interrupt' cattura l'attenzione in meno di 0.5 secondi.",
  "videoBlueprint": [
    { "time": "0-3s", "action": "Mostra un fallimento umiliante (es. ufficio vuoto, conto corrente basso) con testo rosso grande.", "audio": "Suono di errore o silenzio improvviso.", "reason": "Crea empatia e curiosità immediata (Hook di contrasto)." },
    { "time": "3-8s", "action": "Transizione rapida verso il successo. Montage di 0.5s per clip di lusso/risultati.", "audio": "Drop della musica (Phonk o Bass Boosted).", "reason": "Soddisfa il desiderio dello spettatore e promette una soluzione." },
    { "time": "8-20s", "action": "Spiegazione rapida di 3 tool AI usati. Mostra lo schermo per 2s per ogni tool.", "audio": "Voiceover accelerata (1.2x) chiara.", "reason": "Fornisce valore pratico 'gratis', aumentando la salvataggio del video." },
    { "time": "20-30s", "action": "Call to action: 'Commenta INFO per la guida'. Punta il dito verso il basso.", "audio": "Musica più calma, tono ispirazionale.", "reason": "Sfrutta l'algoritmo tramite i commenti per aumentare la reach." }
  ],
  "emotionalTriggers": [
    "Speranza (dal fallimento al successo)",
    "Avidità (guadagno facile con AI)",
    "Filtro di autorità (mostra prove reali)"
  ],
  "algorithmFactors": [
    "Alta velocità di montaggio (ritenzione)",
    "Loop perfetto della musica",
    "Trigger di commenti specifici (Keyword automation)"
  ],
  "creativeStrategy": "Crea una serie 'From Zero to Hero'. La gente ama le storie di riscatto. Usa sempre prove visive (screenshot, grafici) per validare ciò che dici.",
  "weaknesses": [
    "Troppo veloce per un pubblico over 45",
    "Rischio di sembrare 'get rich quick' se non calibrato bene"
  ],
  "contentType": "Educational / Business Case Study",
  "targetAudience": "Aspiring Entrepreneurs, Gen Z, Tech Enthusiasts",
  "bestPostingTime": "18:30",
  "keyInsight": "La viralità non è fortuna, è una struttura di contrasto emotivo supportata da micro-momenti di valore."
};

export default function ViralAnalyzer() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("YouTube");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const loadingRef = useRef(null);

  const LOADING_MSGS = [
    "Inizializzando Gemini 1.5 Flash...",
    "Accesso a Google Search Grounding...",
    "Recupero statistiche tempo reale...",
    "Analisi pattern virali in corso...",
    "Generazione report dati...",
  ];

  useEffect(() => {
    if (loading) {
      let i = 0;
      setLoadingText(LOADING_MSGS[0]);
      loadingRef.current = setInterval(() => {
        i = (i + 1) % LOADING_MSGS.length;
        setLoadingText(LOADING_MSGS[i]);
      }, 1200);
    } else {
      clearInterval(loadingRef.current);
    }
    return () => clearInterval(loadingRef.current);
  }, [loading]);

  const sanitizeJSON = (text) => {
    let s = text.replace(/```json|```/gi, "").trim();
    const match = s.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Nessun JSON trovato nella risposta");
    s = match[0];
    s = s.replace(/[\u201C\u201D\u201E\u201F]/g, '"');
    s = s.replace(/[\u2018\u2019\u02BC]/g, "'");
    
    let result = "";
    let inString = false;
    let escaped = false;
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (escaped) { result += ch; escaped = false; continue; }
        if (ch === "\\") { result += ch; escaped = true; continue; }
        if (ch === '"') { inString = !inString; result += ch; continue; }
        if (inString && (ch === "'" || ch === '"')) { 
            result += "\\" + ch; 
            continue; 
        }
        result += ch;
    }
    return result;
  };

  const callGemini = async (prompt) => {
    // We try both v1 and v1beta as fallback
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey.includes("xxxxxxxxxxxxxxxxxxxx")) {
      throw new Error("Gemini API Key mancante o non valida nel file .env");
    }

    const body = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      systemInstruction: {
        parts: [{
          text: `Sei un Creative Director e Analista Dati esperto di viralità social. 
          Il tuo obiettivo è analizzare video virali tramite Google Search per fornire un REPORT STATISTICO e un BLUEPRINT DI AZIONE.
          IMPORTANT: Trova dati REALI sul video (views, likes, engagement, data pubblicazione).
          Sii cinico, basati sui dati, identifica i trigger psicologici e spiega esattamente COSA filmare, COSA dire e QUALE audio usare.
          Rispondi SEMPRE in formato JSON puro seguendo lo schema richiesto.`
        }]
      },
      tools: [{
        google_search_retrieval: {}
      }],
      generationConfig: {
        response_mime_type: "application/json",
        temperature: 0.3
      }
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        const data = await res.json();
        return data.candidates[0].content.parts[0].text;
      }

      const err = await res.json().catch(() => ({}));
      const msg = err?.error?.message || "HTTP " + res.status;
      if (res.status === 429 || msg.includes("quota")) {
        throw new Error("Limite di quota raggiunto (Gemini Free Tier). Attendi un minuto o passa al piano Pay-as-you-go.");
      }
      throw new Error(msg);
    } catch (e) {
      throw e;
    }
  };

  const analyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const prompt = `Analizza questo video ${platform}: ${url}. 
      Usa Google Search per estrarre statistiche reali (views, likes, engagement rate, data posting) e descrivere il contenuto.
      
      Restituisci ESATTAMENTE questo JSON:
      {
        "title": "...",
        "viralScore": 0-100,
        "viralCore": "Il segreto n.1 da copiare",
        "stats": {
          "views": "...",
          "likes": "...",
          "comments": "...",
          "engagementRate": "...",
          "postingDate": "..."
        },
        "scores": {"hook":0-100, "retention":0-100, "emotion":0-100, "trend":0-100, "shareability":0-100},
        "hookAnalysis": "Analisi dei primi 3-5 sec",
        "videoBlueprint": [
          {"time": "...", "action": "...", "audio": "...", "reason": "..."}
        ],
        "emotionalTriggers": ["...", "..."],
        "creativeStrategy": "Consiglio strategico",
        "weaknesses": ["..."],
        "contentType": "...",
        "targetAudience": "...",
        "bestPostingTime": "HH:MM",
        "keyInsight": "..."
      }`;

      const responseText = await callGemini(prompt);
      const sanitized = sanitizeJSON(responseText);
      const parsed = JSON.parse(sanitized);
      setResult(parsed);
    } catch (e) {
        console.error(e);
        setError("Errore durante l'analisi: " + e.message);
    }
    setLoading(false);
  };

  const startDemo = () => {
    setLoading(true);
    setResult(null);
    setError("");
    setTimeout(() => {
      setResult(MOCK_DATA);
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="app-container">
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap" rel="stylesheet" />
      <div className="scanline" />
      <main className="content-wrapper">
        <header className="main-header">
          <div className="header-badge">◈ DATA-DRIVEN INTELLIGENCE ◈</div>
          <h1 className="main-title"><GlitchText text="VIRAL DECODER" /></h1>
          <p className="main-subtitle">GEMINI PRO POWERED. ANALISI REALE DELLE STATISTICHE.</p>
        </header>

        <InputPanel 
          url={url} setUrl={setUrl} 
          platform={platform} setPlatform={setPlatform} 
          analyze={analyze} loading={loading} 
          startDemo={startDemo}
        />

        {loading && (
          <div className="glass-panel loading-state">
            <div className="loader-dots">
              <div className="loader-dot" style={{ animationDelay: '0s' }} />
              <div className="loader-dot" style={{ animationDelay: '0.2s' }} />
              <div className="loader-dot" style={{ animationDelay: '0.4s' }} />
            </div>
            <div className="loading-text">{loadingText}</div>
          </div>
        )}

        {error && <div className="error-box">⚠ {error}</div>}
        {result && <AnalysisResult result={result} platform={platform} />}

        {!loading && !result && !error && (
          <div className="empty-state">
            <div className="empty-icon">◈</div>
            <div className="empty-text">INSERISCI UN URL PER ANALIZZARE I DATI REALI</div>
          </div>
        )}
      </main>

      <footer className="main-footer">
        Powered by Gemini 1.5 Flash (Data Grounding) · CosmoNet
      </footer>

      <style>{`
        .app-container {
          min-height: 100vh;
          background: var(--bg-dark);
          background-image: radial-gradient(ellipse at 20% 20%, #0a0a1a 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #0a1a0a 0%, transparent 60%);
          color: var(--text-main);
          padding-bottom: 60px;
        }
        .content-wrapper {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          position: relative;
          z-index: 10;
        }
        .main-header { text-align: center; margin-bottom: 48px; }
        .header-badge { font-size: 11px; letter-spacing: 6px; color: var(--accent-cyan); margin-bottom: 12px; opacity: 0.7; }
        .main-title {
          font-size: clamp(40px, 8vw, 72px); font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 4px; margin: 0; line-height: 1;
          background: linear-gradient(135deg, #ffffff 0%, var(--accent-cyan) 50%, #ffffff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .main-subtitle { color: #555; font-size: 11px; letter-spacing: 3px; margin-top: 12px; }
        .loading-state { text-align: center; padding: 60px; }
        .loader-dots { margin-bottom: 24px; }
        .loader-dot { animation: bounce 1.2s ease-in-out infinite; }
        .loading-text { color: var(--accent-cyan); font-size: 11px; letter-spacing: 3px; }
        .error-box {
          padding: 20px; background: #1a0505; border: 1px solid rgba(255, 61, 113, 0.2);
          border-radius: 2px; color: var(--accent-magenta); font-size: 11px; letter-spacing: 1px;
        }
        .empty-state { text-align: center; padding: 60px 20px; color: #222; }
        .empty-icon { font-size: 48px; margin-bottom: 16px; }
        .empty-text { font-size: 11px; letter-spacing: 4px; }
        .main-footer {
          position: absolute; bottom: 20px; width: 100%; text-align: center;
          font-size: 10px; letter-spacing: 2px; color: #333; pointer-events: none;
        }
      `}</style>
    </div>
  );
}
