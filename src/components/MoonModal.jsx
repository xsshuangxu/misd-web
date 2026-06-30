function MoonModal({ secret, setSecret, onCancel, onContinue }) {
    return (
      <div
        onClick={onCancel}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "320px",
            background: "#fff",
            borderRadius: "20px",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ textAlign: "center", marginTop: 0 }}>Enter Secret</h2>
  
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter your secret"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
            }}
          />
  
          <button onClick={onContinue} style={primaryButton}>
            Continue
          </button>
        </div>
      </div>
    );
  }
  
  const backButton = {
    border: "none",
    background: "transparent",
    fontSize: "15px",
    margin: "24px 0 0 22px",
    cursor: "pointer",
  };
  
  const searchBox = {
    marginTop: "22px",
    padding: "14px",
    borderRadius: "18px",
    background: "#f5f5f5",
    color: "#999",
    textAlign: "center",
  };
  
  const chatRow = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px 22px",
    borderTop: "1px solid #f1f1f1",
    cursor: "pointer",
  };
  
  const avatar = {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#111",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
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
  
  export default MoonModal;