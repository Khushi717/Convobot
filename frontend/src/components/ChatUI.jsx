import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import InputBox from "./InputBox";

function ChatUI() {
  const [messages, setMessages] = useState([]);
  const vantaRef = useRef(null);

  const sendMessage = (text) => {
    if (!text) return;
    const userMsg = { sender: "user", text };
    const botMsg = { sender: "bot", text: "Hey! I'm Convobot 🤖✨" };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  useEffect(() => {
    let effect;
    const interval = setInterval(() => {
      if (window.VANTA && window.THREE && vantaRef.current) {
        clearInterval(interval);
        effect = window.VANTA.HALO({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          baseColor: 0x6d28d9,
          backgroundColor: 0x0f172a,
          amplitudeFactor: 1.5,
          size: 1.5,
        });
        setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
      }
    }, 100);
    return () => {
      clearInterval(interval);
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>

      {/* Vanta BG */}
      <div ref={vantaRef} style={{
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* Overlay */}
      <div style={{
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
      }}>

        {/* Card */}
        <div style={{
          pointerEvents: "all",
          width: "85vw",
          maxWidth: "60vw",
          height: "80vh",
          minHeight: "420px",
          display: "flex",
          flexDirection: "column",
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.9)",
        }}>

          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            padding: "14px 24px",
            background: "rgba(0, 0, 0, 0.9)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              width: "40px", height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", flexShrink: 0,
            }}>🤖</div>
            <span style={{
              color: "#ffffff",
              fontSize: "25px",
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}>Convobot</span>
          </div>
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
            background: "transparent",
          }}>
            {messages.length === 0 ? (
              <div style={{
                height: "100%",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center",
              }}>
                <p style={{ margin: 0, color: "#ffffff", fontSize: "20px" }}>
                  Hey!
                </p>
                <p style={{
                  margin: "10px 0 0",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "15px",
                }}>
                  What's on your mind today?
                </p>
              </div>
            ) : (
              messages.map((msg, i) => <Message key={i} msg={msg} />)
            )}
          </div>

          {/* Input */}
<div style={{
  padding: "12px 20px 16px 20px",
  background: "rgba(0,0,0,0.4)",
  borderTop: "1px solid rgba(255,255,255,0.06)",
}}>
  <InputBox onSend={sendMessage} />
</div>

        </div>
      </div>
    </div>
  );
}

export default ChatUI;