// src/components/RecorderControls.tsx
import { useRef, useState } from "react";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { transcribeAudio } from "../services/deepgramService";

const RecorderControls = () => {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const { startRecording, stopRecording, isRecording } = useAudioRecorder();

  const audioChunksRef = useRef<Blob[]>([]);

  const handleStart = () => {
    audioChunksRef.current = [];
    setTranscript("");

    startRecording((chunk) => {
      audioChunksRef.current.push(chunk);
    });
  };

  const handleStop = async () => {
    stopRecording();

    if (audioChunksRef.current.length === 0) {
      alert("No audio recorded");
      return;
    }

    const audioBlob = new Blob(audioChunksRef.current, {
      type: "audio/webm",
    });

    try {
      setLoading(true);
      const text = await transcribeAudio(audioBlob);
      setTranscript(text || "No speech detected");
    } catch (err) {
      alert("Failed to transcribe audio");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
    alert("Copied to clipboard ✅");
  };

  return (
    <div
      style={{
        maxWidth: "520px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        color: "#f8fafc",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🎙️ Voice to Text
      </h2>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={isRecording ? handleStop : handleStart}
          style={{
            padding: "14px 26px",
            fontSize: "16px",
            borderRadius: "50px",
            border: "none",
            cursor: "pointer",
            backgroundColor: isRecording ? "#ef4444" : "#22c55e",
            color: "#fff",
            transition: "0.3s",
          }}
        >
          {isRecording ? "⏹ Stop Recording" : "🎤 Start Recording"}
        </button>
      </div>

      {isRecording && (
        <p style={{ textAlign: "center", color: "#facc15" }}>🔴 Listening...</p>
      )}

      {loading && (
        <p style={{ textAlign: "center", color: "#38bdf8" }}>
          ⏳ Transcribing audio...
        </p>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "16px",
          backgroundColor: "#020617",
          borderRadius: "12px",
          minHeight: "100px",
          lineHeight: "1.6",
        }}
      >
        <strong>📝 Transcribed Text</strong>
        <p style={{ marginTop: "10px", color: "#e5e7eb" }}>
          {transcript || "Speak to see text here..."}
        </p>
      </div>

      {transcript && (
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <button
            onClick={copyToClipboard}
            style={{
              background: "transparent",
              border: "none",
              color: "#38bdf8",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            📋 Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default RecorderControls;
