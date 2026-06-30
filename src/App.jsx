import { useState } from "react";
import MoonModal from "./components/MoonModal";
import Home from "./components/Home";
import World from "./components/World";
import Module from "./components/Module";
import Chat from "./components/Chat";

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
        <Chat
          onBack={() => setPage("home")}
          backButton={backButton}
          activeChat={activeChat}
          messages={messages}
        />
      </AppShell>
    );
  }

  if (page === "module") {
    return (
      <AppShell>
        <Module
          onBackToWorld={() => setPage("world")}
          backButton={backButton}
          currentWorld={currentWorld}
          currentModule={currentModule}
          newPlan={newPlan}
          setNewPlan={setNewPlan}
          plans={plans}
          setPlans={setPlans}
          primaryButton={primaryButton}
        />
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
      <Home
        chats={chats}
        setActiveChat={setActiveChat}
        setPage={setPage}
        setShowMoon={setShowMoon}
      />
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


const backButton = {
  border: "none",
  background: "transparent",
  fontSize: "15px",
  margin: "24px 0 0 22px",
  cursor: "pointer",
};

const softCard = {
  margin: "0 22px 14px",
  padding: "18px",
  borderRadius: "18px",
  background: "#f7f7f7",
  textAlign: "center",
};

const darkCard = {
  margin: "0 22px 22px",
  padding: "18px",
  borderRadius: "18px",
  background: "#111",
  color: "#fff",
  textAlign: "center",
};

const label = {
  fontSize: "13px",
  color: "#999",
  marginBottom: "8px",
};

const primaryButton = {
  marginTop: "14px",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
};

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