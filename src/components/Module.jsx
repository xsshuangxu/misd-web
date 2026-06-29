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
}) {
  return (
    <>
      <button onClick={onBackToWorld} style={backButton}>
        ← Back to World
      </button>

      <div style={{ color: "#999", fontSize: "13px", marginTop: "28px" }}>
        {currentWorld?.name}
      </div>

      <h1 style={{ fontSize: "34px", marginTop: "8px" }}>{currentModule}</h1>

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

export default Module;
