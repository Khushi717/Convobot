function Message({ msg }) {
  const isUser = msg.sender === "user";

  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: "12px",
    }}>

      {!isUser && (
        <div style={{
          width: "32px", height: "32px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px",
          flexShrink: 0,
          marginRight: "8px",
          alignSelf: "flex-end",
        }}>🤖</div>
      )}

      {/* Bubble */}
      <div style={{
        maxWidth: "65%",
        padding: "10px 14px",
        borderRadius: isUser
          ? "18px 18px 4px 18px"   
          : "18px 18px 18px 4px", 
        background: isUser
          ? "linear-gradient(135deg, #7c3aed, #4f46e5)" 
          : "rgba(255,255,255,0.08)",
        color: "#ffffff",
        fontSize: "14px",
        lineHeight: "1.5",
        wordBreak: "break-word",
        border: isUser ? "none" : "1px solid rgba(255,255,255,0.1)",
      }}>
        {msg.text}
      </div>
      {isUser && (
        <div style={{
          width: "32px", height: "32px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", fontWeight: "700",
          color: "#fff",
          flexShrink: 0,
          marginLeft: "8px",
          alignSelf: "flex-end",
        }}>A</div>
      )}

    </div>
  );
}

export default Message;