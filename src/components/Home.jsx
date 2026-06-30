import { useState } from "react";

function Home({ chats, setActiveChat, setPage, setShowMoon, onCreateWorld }) {
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSecret, setNewSecret] = useState("");
  const [newType, setNewType] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim() || !newSecret.trim() || !newType.trim()) return;
    onCreateWorld({ name: newName.trim(), secret: newSecret.trim(), type: newType.trim() });
    setNewName("");
    setNewSecret("");
    setNewType("");
    setShowCreate(false);
  }

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

        {showCreate ? (
          <form onSubmit={handleCreate} style={{ padding: "22px" }}>
            <div style={{ fontWeight: 700, marginBottom: "16px" }}>
              Create World
            </div>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="World name"
              style={formInput}
            />
            <input
              value={newSecret}
              onChange={(e) => setNewSecret(e.target.value)}
              placeholder="Secret code"
              style={formInput}
            />
            <input
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              placeholder="World type (e.g. Long Distance)"
              style={formInput}
            />
            <button type="submit" style={createButton}>
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              style={cancelButton}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div style={{ padding: "22px" }}>
            <button onClick={() => setShowCreate(true)} style={createButton}>
              + Create World
            </button>
          </div>
        )}
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

const formInput = {
  display: "block",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  marginBottom: "12px",
  boxSizing: "border-box",
  fontSize: "15px",
};

const createButton = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontSize: "15px",
  marginBottom: "10px",
};

const cancelButton = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  background: "transparent",
  cursor: "pointer",
  fontSize: "15px",
};

export default Home;