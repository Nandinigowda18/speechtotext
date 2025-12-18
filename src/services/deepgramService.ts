// src/services/deepgramService.ts

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;

  const response = await fetch(
    "https://api.deepgram.com/v1/listen?punctuate=true",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "audio/webm",
      },
      body: audioBlob,
    }
  );

  if (!response.ok) {
    throw new Error("Deepgram transcription failed");
  }

  const data = await response.json();

  return (
    data.results?.channels?.[0]?.alternatives?.[0]?.transcript || ""
  );
};
