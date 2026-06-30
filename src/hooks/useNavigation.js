import { useState } from "react";
import { chats } from "../data/mockData";

function useNavigation() {
  const [page, setPage] = useState("home");
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [currentWorld, setCurrentWorld] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);

  function exitWorld() {
    setCurrentWorld(null);
    setCurrentModule(null);
    setPage("home");
  }

  function openModule(moduleName) {
    setCurrentModule(moduleName);
    setPage("module");
  }

  return {
    page,
    setPage,
    activeChat,
    setActiveChat,
    currentWorld,
    setCurrentWorld,
    currentModule,
    setCurrentModule,
    exitWorld,
    openModule,
  };
}

export default useNavigation;
