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
  insight,
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

      {insight && (
        <section style={insightCard}>
          <div style={insightHeader}>✨ AI Insight</div>
          <div style={insightTitle}>{insight.title}</div>
          <p style={insightSummary}>{insight.summary}</p>
          <div style={recommendationBox}>
            <div style={recommendationLabel}>Recommended Action</div>
            <p style={recommendationText}>{insight.recommendation}</p>
          </div>
          <div style={insightFooter}>Powered by MisD Intelligence</div>
        </section>
      )}

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
        <ModuleRow name="👤 Profile" onClick={() => onOpenModule("Profile")} />
      </main>
    </>
  );
}

const insightCard = {
  margin: "0 22px 14px",
  padding: "18px",
  borderRadius: "18px",
  background: "#fff",
  border: "1px solid #eee",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
};

const insightHeader = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#999",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: "10px",
};

const insightTitle = {
  fontSize: "17px",
  fontWeight: 700,
  marginBottom: "6px",
};

const insightSummary = {
  fontSize: "15px",
  color: "#444",
  lineHeight: 1.5,
  margin: "0 0 14px",
};

const recommendationBox = {
  background: "#f7f7f7",
  borderRadius: "12px",
  padding: "12px 14px",
  marginBottom: "14px",
};

const recommendationLabel = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#999",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  marginBottom: "6px",
};

const recommendationText = {
  fontSize: "15px",
  color: "#222",
  lineHeight: 1.5,
  margin: 0,
};

const insightFooter = {
  fontSize: "11px",
  color: "#bbb",
  textAlign: "right",
};

export default World;
