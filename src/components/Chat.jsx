function Chat({ onBack, backButton, activeChat, messages }) {
  return (
    <>
      <button onClick={onBack} style={backButton}>
        ← Back
      </button>

      <header style={{ textAlign: "center", padding: "24px 0" }}>
        <h1 style={{ margin: 0 }}>{activeChat.name}</h1>
        <div style={{ color: "#999", marginTop: "8px" }}>Online</div>
      </header>

      <main style={{ padding: "24px" }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                message.from === "Me" ? "flex-end" : "flex-start",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px 16px",
                borderRadius: "18px",
                background: message.from === "Me" ? "#111" : "#f3f3f3",
                color: message.from === "Me" ? "#fff" : "#111",
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default Chat;
