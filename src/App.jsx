import { useState } from "react";
import MoonModal from "./components/MoonModal";
import Home from "./components/Home";
import World from "./components/World";
import Module from "./components/Module";
import Chat from "./components/Chat";
import { chats, messages, worlds } from "./data/mockData";
import {
  backButton,
  softCard,
  darkCard,
  label,
  primaryButton,
} from "./styles/sharedStyles";

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