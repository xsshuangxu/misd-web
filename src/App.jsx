import { useState } from "react";
import MoonModal from "./components/MoonModal";
import Home from "./components/Home";
import World from "./components/World";
import Module from "./components/Module";
import Chat from "./components/Chat";
import AppShell from "./components/AppShell";
import { chats, messages, worlds } from "./data/mockData";
import {
  backButton,
  softCard,
  darkCard,
  label,
  primaryButton,
} from "./styles/sharedStyles";
import useNavigation from "./hooks/useNavigation";

function App() {
  const {
    page,
    setPage,
    activeChat,
    setActiveChat,
    currentWorld,
    setCurrentWorld,
    currentModule,
    exitWorld,
    openModule,
  } = useNavigation();
  const [showMoon, setShowMoon] = useState(false);
  const [secret, setSecret] = useState("");
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

export default App;