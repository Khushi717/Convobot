import { useState, useEffect, useRef } from "react";
import logoo from "../assets/logoo.png";
import ReactMarkdown from "react-markdown";
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #000000;
    --card-bg: rgba(15, 17, 26, 0.72);
    --card-border: rgba(255,255,255,0.08);
    --header-bg: rgba(20, 22, 35, 0.9);
    --input-bg: rgba(28, 30, 45, 0.95);
    --accent: #2563eb;
    --accent-hover: #1d4ed8;
    --text: #f0f0f5;
    --muted: rgba(240,240,245,0.38);
    --font: 'Inter', sans-serif;
  }

  body { font-family: var(--font); background: #000; }

  .root {
    position: relative;
    width: 100vw; height: 100vh;
    display: flex; align-items: center; justify-content: center;
  }

  .outer-card {
    position: relative; z-index: 10;
    width: min(700px, 88vw);
    height: min(680px, 88vh);
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(10,12,20,0.55);
    backdrop-filter: blur(6px);
    display: flex; flex-direction: column;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.04),
                0 32px 80px rgba(0,0,0,0.85);
  }


  .header-card {
    margin: 14px 14px 0 14px;
    border-radius: 12px;
    background: var(--header-bg);
    border: 1px solid rgba(255,255,255,0.07);
    padding: 18px 24px;
    display: flex; align-items: center; justify-content: center; gap: 14px;
    flex-shrink: 0;
  }
    .header-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
  .header-avatar {
  
    width: 42px; height: 42px; border-radius: 50%;
    background: linear-gradient(135deg, #06b6d4, #0284c7);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .header-name {
    font-size: 26px; font-weight: 700;
    color: var(--text); letter-spacing: -0.01em;
  }

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px 20px 8px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
background: transparent;
}
  .messages::-webkit-scrollbar { width: 3px; }
  .messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }

  .empty {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 6px;
  }
  .empty p { color: var(--muted); font-size: 13px; }

  .row { display: flex; gap: 8px; align-items: flex-end; animation: pop-in 0.18s ease both;  background: transparent;}
  .row.user { flex-direction: row-reverse; }
  @keyframes pop-in {
    from { opacity:0; transform:translateY(6px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .av {
    width: 28px; height: 28px; border-radius: 50%;
    flex-shrink: 0; display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
     background: transparent;
  }
  .av.bot { background: linear-gradient(135deg,#06b6d4,#0284c7); font-size:14px;  background: linear-gradient(135deg,#06b6d4,#0284c7);}
  .av.user { background: rgba(80,80,100,0.9); color: rgba(255,255,255,0.8); font-size:11px; font-family:monospace; background: #444;}

  .bubble {
    max-width: min(420px, 70%);
    padding: 10px 14px;
    font-size: 14px; line-height: 1.6;
    word-break: break-word;
  }
.bubble {
  max-width: min(320px, 70%);
  padding: 8px 12px;
  font-size: 13px;
  line-height: 1.4;
  word-break: break-word;
  border-radius: 12px;
  white-space: pre-wrap;
}

.bubble.bot {
  background: #2563eb;  
  color: #fff;
  border-radius: 12px 12px 12px 4px;
}

.bubble.user {
  background: #2f2f2f;  
  color: #fff;
  border-radius: 12px 12px 4px 12px;
}

  .dots { display:flex; gap:4px; align-items:center; }
  .dots span {
    width:5px; height:5px; border-radius:50%;
    background: var(--muted);
    animation: blink 1.1s ease-in-out infinite;
  }
  .dots span:nth-child(2){animation-delay:.18s;}
  .dots span:nth-child(3){animation-delay:.36s;}
  @keyframes blink{0%,60%,100%{opacity:.3;transform:translateY(0);}30%{opacity:1;transform:translateY(-4px);}}

  .input-card {
    margin: 8px 14px 14px 14px;
    border-radius: 12px;
    background: var(--input-bg);
    border: 1px solid rgba(255,255,255,0.07);
    display: flex; align-items: center;
    overflow: hidden; flex-shrink: 0;
  }
    pre {
  background: #0f172a;
  padding: 12px;
  border-radius: 10px;
  overflow-x: auto;
  font-size: 12px;
}

code {
  color: #e2e8f0;
  font-family: monospace;
}
  .chat-input {
    flex: 1; background: transparent;
    border: none; outline: none;
    padding: 16px 18px;
    font-size: 14px; color: var(--text);
    font-family: var(--font); resize: none;
  }
  .chat-input::placeholder { color: var(--muted); }
  .send-btn {
    width: 52px; height: 52px; margin: 6px;
    border-radius: 10px;
    background: var(--accent);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background 0.14s, transform 0.1s;
  }
  .send-btn:hover:not(:disabled) { background: var(--accent-hover); }
  .send-btn:active:not(:disabled) { transform: scale(0.94); }
  .send-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .send-btn svg { width:18px; height:18px; fill:#fff; }
`;

const SendIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const vantaRef  = useRef(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = FONTS + css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    let effect;
    const id = setInterval(() => {
      if (window.VANTA && window.THREE && vantaRef.current) {
        clearInterval(id);
        const fn = window.VANTA.DOTS || window.VANTA.NET;
        effect = fn({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          color: 0x06d6a0,
          color2: 0x06b6d4,
          backgroundColor: 0x000000,
          size: 2.5,
          spacing: 28,
          showLines: false,
          //net
          points: 10,
          maxDistance: 16,
          amplitudeFactor: 0.8,
        });
        setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
      }
    }, 100);
    return () => { clearInterval(id); effect?.destroy(); };
  }, []);

const callAPI = async (msg) => {
  try {
    const res = await fetch("https://convobot-mbah.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: msg }) 
    });

    const data = await res.json();
    return data?.reply || "No response from AI";

  } catch {
    return "Server error — please try again.";
  }
};

  const handleSend = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setMessages(p => [...p, { text: msg, sender: "user" }]);
    setLoading(true);
    const reply = await callAPI(msg);
    setLoading(false);
    setMessages(p => [...p, { text: reply, sender: "bot" }]);
    inputRef.current?.focus();
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="root">
      <div ref={vantaRef} style={{ position:"fixed", inset:0, zIndex:0 }} />

      <div className="outer-card">

        <div className="header-card">
          <div className="header-avatar"><img src={logoo} alt="logo" /></div>
          <span className="header-name">Convobot</span>
        </div>

    
        <div className="messages">
          {messages.length === 0 && !loading ? (
            <div className="empty"><p>Start a conversation</p></div>
          ) : (
            <>
              {messages.map((m, i) => (
                <div key={i} className={`row ${m.sender}`}>
                  <div className={`av ${m.sender}`}>{m.sender === "bot" ? "🤖" : "A"}</div>
                <div className={`bubble ${m.sender}`}>
  <ReactMarkdown>
    {m.text}
  </ReactMarkdown>
</div>
                </div>
              ))}
              {loading && (
                <div className="row">
                  <div className="av bot">🤖</div>
                  <div className="bubble bot"><div className="dots"><span/><span/><span/></div></div>
                </div>
              )}
            </>
          )}
          <div ref={bottomRef} />
        </div>

        {/* input */}
        <div className="input-card">
          <textarea
            ref={inputRef}
            className="chat-input"
            rows={1}
            placeholder="Type Something..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
          />
          <button className="send-btn" onClick={() => handleSend()} disabled={!input.trim() || loading}>
            <SendIcon />
          </button>
        </div>

      </div>
    </div>
  );
}

export default ChatUI;
