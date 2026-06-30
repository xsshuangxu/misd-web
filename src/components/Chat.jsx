import { useState } from "react";

function Chat({ onBack, backButton, activeChat, messages, onSend }) {
  const [input, setInput] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  }

  return (
    <div style={container}>
      <div>
        <button onClick={onBack} style={backButton}>
          ← Back
        </button>

        <header style={{ textAlign: "center", padding: "24px 0" }}>
          <h1 style={{ margin: 0 }}>{activeChat.name}</h1>
          <div style={{ color: "#999", marginTop: "8px" }}>Online</div>
        </header>
      </div>

      <main style={messageList}>
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

      <form onSubmit={handleSend} style={inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
          style={inputField}
        />
        <button type="submit" style={sendButton}>
          Send
        </button>
      </form>
    </div>
  );
}

const container = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
};

const messageList = {
  flex: 1,
  overflowY: "auto",
  padding: "24px",
};

const inputRow = {
  display: "flex",
  gap: "10px",
  padding: "16px 22px",
  borderTop: "1px solid #eee",
};

const inputField = {
  flex: 1,
  padding: "12px 16px",
  borderRadius: "18px",
  border: "1px solid #ddd",
  fontSize: "15px",
  outline: "none",
};

const sendButton = {
  padding: "12px 20px",
  borderRadius: "18px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontSize: "15px",
};

export default Chat;
