import { useState } from "react";

const chats = [
  {
    name: "Elizabeth",
    message: "Are you free tonight?",
    time: "2m",
    avatar: "E",
  },
  {
    name: "Jackie",
    message: "Let’s sync tomorrow morning.",
    time: "1h",
    avatar: "J",
  },
  {
    name: "Project Alpha",
    message: "Sprint notes updated.",
    time: "Yesterday",
    avatar: "P",
  },
];

const messages = [
  { from: "Elizabeth", text: "Are you free tonight?" },
  { from: "Me", text: "Yes, what’s up?" },
  { from: "Elizabeth", text: "Let’s have dinner later." },
  { from: "Me", text: "Sounds good." },
];

function App() {
  const [page, setPage] = useState("home");
  const [activeChat, setActiveChat] = useState(chats[0]);

  if (page === "chat") {
    return (
      <div
        style={{
          maxWidth: "430px",
          margin: "0 auto",
          minHeight: "100vh",
          background: "#ffffff",
          border: "1px solid #eee",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <header
          style={{
            padding: "18px 22px",
            borderBottom: "1px solid #f1f1f1",
          }}
        >
          <button
            onClick={() => setPage("home")}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "15px",
              marginBottom: "14px",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>

          <h2 style={{ margin: 0 }}>{activeChat.name}</h2>
          <div style={{ color: "#999", fontSize: "13px", marginTop: "4px" }}>
            Online
          </div>
        </header>

        <main style={{ padding: "20px 22px" }}>
          {messages.map((message, index) => {
            const isMe = message.from === "Me";

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    maxWidth: "72%",
                    background: isMe ? "#111" : "#f3f3f5",
                    color: isMe ? "#fff" : "#111",
                    padding: "11px 14px",
                    borderRadius: "18px",
                    fontSize: "15px",
                    lineHeight: 1.4,
                  }}
                >
                  {message.text}
                </div>
              </div>
            );
          })}
        </main>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#ffffff",
        border: "1px solid #eee",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <header style={{ padding: "28px 22px 16px" }}>
        <div style={{ fontSize: "13px", color: "#999", marginBottom: "6px" }}>
          Public Hub
        </div>

        <h1 style={{ fontSize: "34px", margin: 0, letterSpacing: "-1px" }}>
          MisD
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: "20px",
            color: "#666",
            fontSize: "15px",
          }}
        >
          Every relationship deserves its own world.
        </p>

        <div
          style={{
            background: "#f5f5f7",
            borderRadius: "16px",
            padding: "13px 15px",
            color: "#999",
            fontSize: "15px",
          }}
        >
          🔍 Search people, chats
        </div>
      </header>

      <main>
        {chats.map((chat) => (
          <div
            key={chat.name}
            onClick={() => {
              setActiveChat(chat);
              setPage("chat");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "14px 22px",
              borderTop: "1px solid #f1f1f1",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#111",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
              }}
            >
              {chat.avatar}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <strong>{chat.name}</strong>
                <span style={{ fontSize: "12px", color: "#999" }}>
                  {chat.time}
                </span>
              </div>

              <div style={{ color: "#777", fontSize: "14px" }}>
                {chat.message}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;