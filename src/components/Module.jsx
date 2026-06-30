import { useState } from "react";

function Module({
  onBackToWorld,
  backButton,
  currentWorld,
  currentModule,
  newPlan,
  setNewPlan,
  plans,
  setPlans,
  primaryButton,
  messages,
  onSend,
}) {
  const [chatInput, setChatInput] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSend(chatInput.trim());
    setChatInput("");
  }

  return (
    <>
      <button onClick={onBackToWorld} style={backButton}>
        ← Back to World
      </button>

      <div style={{ color: "#999", fontSize: "13px", marginTop: "28px" }}>
        {currentWorld?.name}
      </div>

      <h1 style={{ fontSize: "34px", marginTop: "8px" }}>{currentModule}</h1>

      {currentModule === "Chat" && (
        <>
          <div style={{ padding: "0 0 12px" }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    message.from === "Me" ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "10px 14px",
                    borderRadius: "16px",
                    background: message.from === "Me" ? "#111" : "#f3f3f3",
                    color: message.from === "Me" ? "#fff" : "#111",
                    fontSize: "15px",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSend}
            style={{ display: "flex", gap: "10px", marginTop: "8px" }}
          >
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Message..."
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: "18px",
                border: "1px solid #ddd",
                fontSize: "15px",
              }}
            />
            <button type="submit" style={sendButton}>
              Send
            </button>
          </form>
        </>
      )}

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
              ]);
              setNewPlan("");
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

        <div style={{ fontWeight: 600 }}>Dinner together</div>

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

        <div>Maybe spend one evening together this week.</div>
      </div>
    </>
  );
}

const sendButton = {
  padding: "12px 20px",
  borderRadius: "18px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontSize: "15px",
};

export default Module;
