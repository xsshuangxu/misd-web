function ModuleRow({ name, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "16px 0",
        borderTop: "1px solid #eee",
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      {name}
    </div>
  );
}

function World({
  currentWorld,
  onExitWorld,
  onOpenModule,
  backButton,
  softCard,
  darkCard,
  label,
}) {
  return (
    <>
      <button onClick={onExitWorld} style={backButton}>
        ← Exit World
      </button>

      <header style={{ textAlign: "center", padding: "28px 0 18px" }}>
        <div style={{ color: "#999", fontSize: "13px" }}>Private World</div>
        <h1 style={{ fontSize: "32px", margin: "8px 0 0" }}>
          {currentWorld?.name}
        </h1>
        <p style={{ color: "#666", lineHeight: 1.5 }}>{currentWorld?.tone}</p>
      </header>

      <section style={softCard}>
        <div style={label}>Current Direction</div>
        <div style={{ fontSize: "18px", fontWeight: 600 }}>
          {currentWorld?.type}
        </div>
      </section>

      <section style={darkCard}>
        <div style={{ ...label, color: "#aaa" }}>Next Possibility</div>
        <div style={{ fontSize: "18px", fontWeight: 600 }}>
          {currentWorld?.idea}
        </div>
      </section>

      <main style={{ marginTop: "22px" }}>
        <ModuleRow name="💬 Chat" onClick={() => onOpenModule("Chat")} />
        <ModuleRow
          name="🖼️ Memories"
          onClick={() => onOpenModule("Memories")}
        />
        <ModuleRow
          name="🪞 Reflection"
          onClick={() => onOpenModule("Reflection")}
        />
        <ModuleRow name="📍 Plans" onClick={() => onOpenModule("Plans")} />
      </main>
    </>
  );
}

export default World;
