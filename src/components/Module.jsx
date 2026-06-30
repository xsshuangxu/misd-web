import { useState } from "react";

function Module({
  onBackToWorld,
  backButton,
  currentWorld,
  currentModule,
  plans,
  setPlans,
  messages,
  onSend,
  memories,
  onAddMemory,
  reflections,
  onAddReflection,
  profile,
  onSaveProfile,
}) {
  const [chatInput, setChatInput] = useState("");
  const [caption, setCaption] = useState("");
  const [reflectionText, setReflectionText] = useState("");
  const [reflectionRating, setReflectionRating] = useState(3);
  const [planTitle, setPlanTitle] = useState("");
  const [planOwner, setPlanOwner] = useState("Both");
  const [planDueDate, setPlanDueDate] = useState("");
  const [profileDraft, setProfileDraft] = useState(null);

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

      {currentModule === "Profile" && (() => {
        const draft = profileDraft ?? profile;
        const relTypes = ["Couple", "Friend", "Family", "Project", "Mentor", "Healthcare", "Custom"];
        return (
          <>
            <p style={{ color: "#999", fontSize: "13px", marginTop: "8px", lineHeight: 1.5 }}>
              This is the relationship context used to understand this World. Keep it honest and current.
            </p>

            <div style={profileSection}>
              <div style={profileLabel}>World Name</div>
              <div style={{ fontWeight: 600, fontSize: "16px" }}>{currentWorld?.name}</div>
            </div>

            <div style={profileSection}>
              <div style={profileLabel}>Relationship Type</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {relTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setProfileDraft({ ...draft, relType: t })}
                    style={{
                      ...profileChip,
                      background: (draft.relType || profile.relType) === t ? "#111" : "#f3f3f3",
                      color: (draft.relType || profile.relType) === t ? "#fff" : "#111",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={profileSection}>
              <div style={profileLabel}>Describe this relationship</div>
              <textarea
                value={draft.description ?? profile.description ?? ""}
                onChange={(e) => setProfileDraft({ ...draft, description: e.target.value })}
                placeholder="One sentence about what this relationship means..."
                rows={2}
                style={profileTextarea}
              />
            </div>

            <div style={profileSection}>
              <div style={profileLabel}>Current Shared Goal</div>
              <textarea
                value={draft.goal ?? profile.goal ?? ""}
                onChange={(e) => setProfileDraft({ ...draft, goal: e.target.value })}
                placeholder="What are you both working toward right now?"
                rows={2}
                style={profileTextarea}
              />
            </div>

            <div style={profileSection}>
              <div style={profileLabel}>Shared Interests</div>
              <input
                value={draft.interests ?? profile.interests ?? ""}
                onChange={(e) => setProfileDraft({ ...draft, interests: e.target.value })}
                placeholder="e.g. hiking, cooking, travel"
                style={profileInput}
              />
            </div>

            <button
              onClick={() => {
                onSaveProfile(draft);
                setProfileDraft(null);
              }}
              style={saveProfileButton}
            >
              Save Context
            </button>
          </>
        );
      })()}

      {currentModule === "Reflection" && (
        <>
          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="What's on your mind..."
            rows={4}
            style={reflectionTextarea}
          />

          <div style={{ marginTop: "14px" }}>
            <div style={{ fontSize: "13px", color: "#999", marginBottom: "8px" }}>
              Mood
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setReflectionRating(n)}
                  style={{
                    ...moodButton,
                    background: reflectionRating === n ? "#111" : "#f3f3f3",
                    color: reflectionRating === n ? "#fff" : "#111",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              if (!reflectionText.trim()) return;
              onAddReflection({
                id: Date.now(),
                text: reflectionText.trim(),
                rating: reflectionRating,
                createdAt: new Date().toLocaleString(),
              });
              setReflectionText("");
              setReflectionRating(3);
            }}
            style={saveReflectionButton}
          >
            Save Reflection
          </button>

          {reflections.length > 0 && (
            <div style={{ marginTop: "28px" }}>
              <div style={{ fontSize: "13px", color: "#999", marginBottom: "12px" }}>
                Past Reflections
              </div>
              {reflections.map((r) => (
                <div key={r.id} style={reflectionCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", color: "#999" }}>{r.createdAt}</span>
                    <span style={{ fontWeight: 700 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  </div>
                  <div style={{ lineHeight: 1.5 }}>{r.text}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {currentModule === "Memories" && (
        <>
          <label style={uploadLabel}>
            📷 Add Photo
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                onAddMemory({ url, caption: caption.trim(), id: Date.now() });
                setCaption("");
                e.target.value = "";
              }}
            />
          </label>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption (optional)"
            style={captionInput}
          />
          {memories.length === 0 && (
            <p style={{ color: "#999", marginTop: "24px", textAlign: "center" }}>
              No memories yet. Upload a photo above.
            </p>
          )}
          <div style={memoryGrid}>
            {memories.map((m) => (
              <div key={m.id} style={memoryCard}>
                <img src={m.url} alt={m.caption || "memory"} style={memoryImg} />
                {m.caption ? (
                  <div style={memoryCaption}>{m.caption}</div>
                ) : null}
              </div>
            ))}
          </div>
        </>
      )}

      {currentModule === "Plans" && (
        <>
          <input
            value={planTitle}
            onChange={(e) => setPlanTitle(e.target.value)}
            placeholder="Plan title..."
            style={planInput}
          />

          <div style={{ marginTop: "10px" }}>
            <div style={{ fontSize: "13px", color: "#999", marginBottom: "6px" }}>Owner</div>
            <div style={{ display: "flex", gap: "8px" }}>
              {["Me", "Partner", "Both"].map((o) => (
                <button
                  key={o}
                  onClick={() => setPlanOwner(o)}
                  style={{
                    ...ownerButton,
                    background: planOwner === o ? "#111" : "#f3f3f3",
                    color: planOwner === o ? "#fff" : "#111",
                  }}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          <input
            type="date"
            value={planDueDate}
            onChange={(e) => setPlanDueDate(e.target.value)}
            style={{ ...planInput, marginTop: "10px" }}
          />

          <button
            onClick={() => {
              if (!planTitle.trim()) return;
              setPlans([
                ...plans,
                {
                  id: Date.now(),
                  title: planTitle.trim(),
                  owner: planOwner,
                  dueDate: planDueDate,
                  completed: false,
                },
              ]);
              setPlanTitle("");
              setPlanOwner("Both");
              setPlanDueDate("");
            }}
            style={addPlanButton}
          >
            Add Plan
          </button>

          <div style={{ marginTop: "24px" }}>
            {[...plans]
              .sort((a, b) => Number(a.completed) - Number(b.completed))
              .map((plan) => (
                <div
                  key={plan.id}
                  style={{
                    ...planCard,
                    opacity: plan.completed ? 0.5 : 1,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 600, textDecoration: plan.completed ? "line-through" : "none" }}>
                        {plan.title}
                      </div>
                      <div style={{ fontSize: "13px", color: "#999", marginTop: "4px" }}>
                        {plan.owner}{plan.dueDate ? ` · ${plan.dueDate}` : ""}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <button
                        onClick={() =>
                          setPlans(plans.map((p) =>
                            p.id === plan.id ? { ...p, completed: !p.completed } : p
                          ))
                        }
                        style={iconButton}
                      >
                        {plan.completed ? "✅" : "⭕"}
                      </button>
                      <button
                        onClick={() => setPlans(plans.filter((p) => p.id !== plan.id))}
                        style={iconButton}
                      >
                        🗑️
                      </button>
                    </div>
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

const profileSection = {
  marginTop: "22px",
};

const profileLabel = {
  fontSize: "13px",
  color: "#999",
  marginBottom: "6px",
};

const profileChip = {
  padding: "8px 14px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 600,
};

const profileTextarea = {
  display: "block",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  marginTop: "6px",
  boxSizing: "border-box",
  fontSize: "15px",
  resize: "vertical",
  fontFamily: "inherit",
};

const profileInput = {
  display: "block",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  marginTop: "6px",
  boxSizing: "border-box",
  fontSize: "15px",
};

const saveProfileButton = {
  marginTop: "24px",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontSize: "15px",
};

const planInput = {
  display: "block",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  marginTop: "16px",
  boxSizing: "border-box",
  fontSize: "15px",
};

const ownerButton = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
};

const addPlanButton = {
  marginTop: "14px",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontSize: "15px",
};

const planCard = {
  padding: "14px",
  borderRadius: "14px",
  background: "#f5f5f5",
  marginBottom: "12px",
};

const iconButton = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "18px",
  padding: "2px",
};

const reflectionTextarea = {
  display: "block",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  marginTop: "20px",
  boxSizing: "border-box",
  fontSize: "15px",
  resize: "vertical",
  fontFamily: "inherit",
};

const moodButton = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 700,
};

const saveReflectionButton = {
  marginTop: "16px",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontSize: "15px",
};

const reflectionCard = {
  padding: "16px",
  borderRadius: "14px",
  background: "#f7f7f7",
  marginBottom: "12px",
};

const uploadLabel = {
  display: "block",
  marginTop: "20px",
  padding: "12px",
  borderRadius: "12px",
  border: "1px dashed #ccc",
  textAlign: "center",
  cursor: "pointer",
  color: "#555",
  fontSize: "15px",
};

const captionInput = {
  display: "block",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  marginTop: "10px",
  boxSizing: "border-box",
  fontSize: "15px",
};

const memoryGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginTop: "20px",
};

const memoryCard = {
  borderRadius: "14px",
  overflow: "hidden",
  background: "#f5f5f5",
};

const memoryImg = {
  width: "100%",
  aspectRatio: "1",
  objectFit: "cover",
  display: "block",
};

const memoryCaption = {
  padding: "8px 10px",
  fontSize: "13px",
  color: "#555",
};

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
