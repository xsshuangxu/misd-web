import { useState } from "react";
import MoonModal from "./components/MoonModal";
import Home from "./components/Home";
import World from "./components/World";

const chats = [
  {
    name: "Elizabeth",
    message: "Are you free tonight?",
    time: "2m",
    avatar: "E",
  },
  {
    name: "Jackie",
    message: "Let's sync tomorrow morning.",
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

const worlds = {
  "1111": {
    name: "Elizabeth World",
    type: "Long Distance",
    tone: "A quiet space to keep building what matters next.",
    idea: "Maybe create one small plan together this week.",
  },
  "2222": {
    name: "Project Alpha World",
    type: "Building Together",
    tone: "A focused space for ideas, decisions, and next steps.",
    idea: "Choose one clear milestone to move forward.",
  },
};

function App() {
  const [page, setPage] = useState("home");
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [showMoon, setShowMoon] = useState(false);
  const [secret, setSecret] = useState("");
  const [currentWorld, setCurrentWorld] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [plans, setPlans] = useState([
    {
      id: 1,
      title: "Dinner together",
      completed: false,
    },
  ]);
const [newPlan, setNewPlan] = useState("");
  

  function enterWorld() {
    const world = worlds[secret];

    if (!world) {
      alert("Wrong Secret");
      return;
    }

    setCurrentWorld(world);
    setSecret("");
    setShowMoon(false);
    setPage("world");
  }

  function exitWorld() {
    setCurrentWorld(null);
    setCurrentModule(null);
    setPage("home");
  }

  function openModule(moduleName) {
    setCurrentModule(moduleName);
    setPage("module");
  }

  if (page === "chat") {
    return (
      <AppShell>
        <button onClick={() => setPage("home")} style={backButton}>
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
      </AppShell>
    );
  }

  if (page === "module") {
    return (
      <AppShell>
        <button onClick={() => setPage("world")} style={backButton}>
          ← Back to World
        </button>

        <div style={{ color: "#999", fontSize: "13px", marginTop: "28px" }}>
          {currentWorld?.name}
        </div>

        <h1 style={{ fontSize: "34px", marginTop: "8px" }}>
          {currentModule}
        </h1>

        {currentModule === "Plans" && (
  <>
    <input
      value={newPlan}
      onChange={(e) => setNewPlan(e.target.value)}
      placeholder="New plan..."
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid #ddd",
        marginTop: "20px",
        boxSizing: "border-box",
      }}
    />

    <button
      onClick={() => {
        if (!newPlan.trim()) return;
        setPlans([
          ...plans,
          {
            id: Date.now(),
            title: newPlan,
            completed: false,
          },
        ]);        setNewPlan("");
      }}
      style={primaryButton}
    >
      Add Plan
    </button>

    <div style={{ marginTop: "24px" }}>
    {[...plans]
  .sort((a, b) => Number(a.completed) - Number(b.completed))
  .map((plan, index) => (
        <div
          key={index}
          style={{
            padding: "14px",
            borderRadius: "12px",
            background: "#f5f5f5",
            marginBottom: "12px",
          }}
        >
          <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <span>{plan.title}</span>

  <button
    onClick={() => {
      setPlans(
        plans.map((p) =>
          p.id === plan.id
            ? { ...p, completed: !p.completed }
            : p
        )
      );
    }}
    style={{
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: "18px",
    }}
  >
    {plan.completed ? "✅" : "⭕"}
  </button>
</div>
        </div>
      ))}
    </div>
  </>
)}

  <div
    style={{
      marginTop: "28px",
      padding: "18px",
      borderRadius: "18px",
      background: "#f7f7f7",
    }}
  >
    <div
      style={{
        fontSize: "13px",
        color: "#999",
        marginBottom: "10px",
      }}
    >
      Upcoming
    </div>

    <div style={{ fontWeight: 600 }}>
      Dinner together
    </div>

    <div
      style={{
        color: "#777",
        marginTop: "6px",
      }}
    >
      Friday · 7:00 PM
    </div>
  </div>

  <div
    style={{
      marginTop: "18px",
      padding: "18px",
      borderRadius: "18px",
      background: "#111",
      color: "#fff",
    }}
  >
    <div
      style={{
        fontSize: "13px",
        color: "#aaa",
        marginBottom: "10px",
      }}
    >
      Next Possibility
    </div>

    <div>
      Maybe spend one evening together this week.
    </div>
  </div>

      </AppShell>
    );
  }

  if (page === "world") {
    return (
      <AppShell>
        <World
          currentWorld={currentWorld}
          onExitWorld={exitWorld}
          onOpenModule={openModule}
          backButton={backButton}
          softCard={softCard}
          darkCard={darkCard}
          label={label}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
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

      {showMoon && (
        <MoonModal
          secret={secret}
          setSecret={setSecret}
          onCancel={() => setShowMoon(false)}
          onContinue={enterWorld}
        />
      )}
    </AppShell>
  );
}

function AppShell({ children }) {
  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#fff",
        border: "1px solid #eee",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}

export default App;