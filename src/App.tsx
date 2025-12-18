// src/App.tsx
import RecorderControls from "./components/RecorderControls";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #0f172a)",
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
            marginBottom: "10px",
            color: "#f8fafc",
          }}
        >
          Wispr Flow
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "28px",
            color: "#94a3b8",
          }}
        >
          Simple voice-to-text powered by AI
        </p>

        <RecorderControls />
      </div>
    </div>
  );
}

export default App;
