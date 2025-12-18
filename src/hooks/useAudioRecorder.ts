import { useRef, useState } from "react";

export const useAudioRecorder = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // start recording & emit audio chunks
  const startRecording = async (onData: (chunk: Blob) => void) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log("🎤 audio chunk:", event.data.size, event.data.type);
          onData(event.data); // ✅ just pass the chunk
        }
      };

      mediaRecorder.start(250); // emit every 250ms
      setIsRecording(true);

    } catch (error) {
      console.error("Microphone access denied", error);
      alert("Microphone permission is required");
    }
  };

  // stop recording & release mic
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
  };

  return {
    startRecording,
    stopRecording,
    isRecording,
  };
};

