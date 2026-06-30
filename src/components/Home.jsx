function Home({
    chats,
    setActiveChat,
    setPage,
    setShowMoon,
    
  }) {
    return (
      <>
        <header style={{ padding: "28px 22px 16px" }}>
          <div style={{ color: "#999", fontSize: "13px", textAlign: "center" }}>
            Public Hub
          </div>
  
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ fontSize: "34px", margin: 0 }}>MisD</h1>
  
            <button
              onClick={() => setShowMoon(true)}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              🌙
            </button>
          </div>
  
          <p style={{ marginTop: "8px", color: "#666" }}>
            Every relationship deserves its own world.
          </p>
  
          <div style={searchBox}>🔍 Search people, chats</div>
        </header>
  
        <main>
          {chats.map((chat) => (
            <div
              key={chat.name}
              onClick={() => {
                setActiveChat(chat);
                setPage("chat");
              }}
              style={chatRow}
            >
              <div style={avatar}>{chat.avatar}</div>
  
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{chat.name}</div>
                <div style={{ color: "#777", marginTop: "6px" }}>
                  {chat.message}
                </div>
              </div>
  
              <div style={{ color: "#999", fontSize: "12px" }}>{chat.time}</div>
            </div>
          ))}
        </main>
      </>
    );
  }
  
  const searchBox = {
    marginTop: "22px",
    padding: "14px",
    borderRadius: "18px",
    background: "#f5f5f5",
    color: "#999",
    textAlign: "center",
  };
  
  const chatRow = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px 22px",
    borderTop: "1px solid #f1f1f1",
    cursor: "pointer",
  };
  
  const avatar = {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#111",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  };

  export default Home;