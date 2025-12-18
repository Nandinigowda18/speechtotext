// src/components/RecorderControls.tsx
import { useRef, useState } from "react";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { transcribeAudio } from "../services/deepgramService";

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const RecorderControls = () => {
  const [transcript, setTranscript] = useState("");
  const [liveText, setLiveText] = useState("");
  const [loading, setLoading] = useState(false);

  const { startRecording, stopRecording, isRecording } = useAudioRecorder();

  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  // 🔊 Sound effects
  const startSoundRef = useRef<HTMLAudioElement>(
    new Audio("/sounds/sound.wav")
  );
  const stopSoundRef = useRef<HTMLAudioElement>(new Audio("/sounds/sound.wav"));

  const handleStart = () => {
    // 🔊 Play start sound
    startSoundRef.current.currentTime = 0;
    startSoundRef.current.play().catch(() => {});

    // ---- Live Speech Recognition ----
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          interim += event.results[i][0].transcript;
        }
        setLiveText(interim);
      };

      recognition.start();
      recognitionRef.current = recognition;
    }

    audioChunksRef.current = [];
    setTranscript("");
    setLiveText("");

    startRecording((chunk) => {
      audioChunksRef.current.push(chunk);
    });
  };

  const handleStop = async () => {
    // 🔊 Play stop sound
    stopSoundRef.current.currentTime = 0;
    stopSoundRef.current.play().catch(() => {});

    stopRecording();
    recognitionRef.current?.stop();

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
      setTranscript(text || "No speech detected.");
    } catch (err) {
      console.error("❌ Transcription failed", err);
      alert("Failed to transcribe audio");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
    alert("Copied to clipboard ✅");
  };

  const clearTranscript = () => {
    setTranscript("");
    setLiveText("");
  };

  return (
    <div
      style={{
        maxWidth: "520px",
        margin: "0 auto",
        padding: "28px",
        borderRadius: "18px",
        background: "linear-gradient(135deg, #1e293b, #020617)",
        color: "#f8fafc",
        boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "8px" }}>
        🎙️ Voice to Text
      </h2>

      <p
        style={{
          textAlign: "center",
          fontSize: "14px",
          color: "#94a3b8",
          marginBottom: "24px",
        }}
      >
        Click the microphone, speak naturally, then stop to convert your voice
        into text.
      </p>

      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <button
          onClick={isRecording ? handleStop : handleStart}
          disabled={loading}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
          style={{
            padding: "14px 28px",
            fontSize: "16px",
            borderRadius: "999px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            backgroundColor: isRecording ? "#ef4444" : "#22c55e",
            color: "#fff",
            transition: "all 0.3s ease",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {isRecording ? "⏹ Stop Recording" : "🎤 Start Recording"}
        </button>
      </div>

      {isRecording && (
        <p style={{ textAlign: "center", color: "#facc15" }}>
          🔴 Listening… speak now
        </p>
      )}

      {loading && (
        <p style={{ textAlign: "center", color: "#38bdf8" }}>
          ⏳ Transcribing audio…
        </p>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "16px",
          backgroundColor: "#020617",
          borderRadius: "12px",
          minHeight: "120px",
          maxHeight: "200px",
          overflowY: "auto",
          lineHeight: "1.6",
        }}
      >
        <strong>📝 Transcribed Text</strong>
        <p style={{ marginTop: "10px", color: "#e5e7eb" }}>
          {isRecording
            ? liveText || "Listening..."
            : transcript || "Your transcribed text will appear here…"}
        </p>
      </div>

      {transcript && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "12px",
          }}
        >
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

          <button
            onClick={clearTranscript}
            style={{
              background: "transparent",
              border: "none",
              color: "#f87171",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            🧹 Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default RecorderControls;
