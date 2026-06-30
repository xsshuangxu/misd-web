import { useState } from "react";

function useMoonModal() {
  const [showMoon, setShowMoon] = useState(false);
  const [secret, setSecret] = useState("");

  return { showMoon, setShowMoon, secret, setSecret };
}

export default useMoonModal;
