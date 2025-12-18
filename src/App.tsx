// src/App.tsx
// src/App.tsx
import RecorderControls from "./components/RecorderControls";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #020617, #0f172a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "12px",
            color: "#f8fafc",
            fontSize: "2.2rem",
            fontWeight: 700,
          }}
        >
          Wispr Flow
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "32px",
            color: "#94a3b8",
            fontSize: "1rem",
          }}
        >
          Speak naturally. Convert voice to text instantly.
        </p>

        <RecorderControls />
      </div>
    </div>
  );
}

export default App;
