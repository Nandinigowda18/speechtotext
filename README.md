🎙️ Wispr Flow – Voice to Text (Tauri + React + Deepgram)

A cross-platform voice-to-text application inspired by Wispr Flow.
This project demonstrates how to build an AI-powered desktop and web application that converts speech into text using modern frontend tools and cloud-based speech recognition.

The app focuses on functionality, clean architecture, and user experience, rather than pixel-perfect UI replication.

✨ Features

🎤 Push-to-Talk Voice Input

Start and stop recording with a single button

Clear visual and audio feedback

🗣️ Live Transcription While Speaking

Real-time interim text using the browser Speech Recognition API

🧠 Accurate AI Transcription

Final high-quality transcription powered by Deepgram Speech-to-Text API

🔊 Sound Effects

Audible cues when recording starts and stops

📋 Copy & Clear Transcript

Copy transcribed text to clipboard

Clear text with one click

🎨 Clean & Modern UI

Dark theme with smooth visual feedback

Optimized for both desktop and web usage

🖥️ Cross-Platform

Web version deployed on Vercel

Desktop version built using Tauri (Windows / macOS / Linux)

🧱 Tech Stack

Frontend: React + Vite

Desktop Framework: Tauri

Speech-to-Text: Deepgram API

Live Preview: Web Speech API

Deployment: Vercel (web version)

🏗️ Architecture Overview
src/
 ├── components/
 │    └── RecorderControls.tsx   # UI + recording controls
 ├── hooks/
 │    └── useAudioRecorder.ts    # Microphone & audio capture logic
 ├── services/
 │    └── deepgramService.ts     # Deepgram REST API integration
 └── App.tsx                     # App layout

src-tauri/
 └── Tauri configuration & Rust backend


Separation of concerns is maintained between UI, audio capture, and transcription logic for clean and maintainable code.

🚀 How It Works

User clicks Start Recording

Microphone access is requested

Live text appears while speaking (browser Speech Recognition)

User clicks Stop Recording

Recorded audio is sent to Deepgram

Final AI-generated transcript is displayed

User can copy or clear the text

🖱️ How to Use (Web)

Open the live demo:

https://speechtotext-three.vercel.app/


Click Start Recording

Speak clearly into your microphone

Click Stop Recording

View and copy the transcribed text

Make sure microphone permissions are enabled in your browser.

🖥️ How to Run Locally
1️⃣ Clone the repository
git clone https://github.com/Nandinigowda18/speechtotext.git
cd speechtotext

2️⃣ Install dependencies
npm install

3️⃣ Set up environment variables

Create a .env file in the root directory:

VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here


You can obtain an API key from https://deepgram.com

4️⃣ Run the web app
npm run dev

5️⃣ Run the desktop app (Tauri)
npm run tauri dev

📦 Building Desktop Executables

To create native builds:

npm run tauri build


This will generate platform-specific executables:

Windows → .exe

macOS → .dmg

Linux → AppImage

🎯 Design & Technical Decisions

REST-based transcription was chosen for reliability in browser and WebView environments.

Live preview + AI final transcription provides the best balance between responsiveness and accuracy.

Minimal UI ensures focus on core voice-to-text workflow.

Sound cues improve usability and user feedback.

⚠️ Known Limitations

Live transcription uses the browser’s Speech Recognition API and may vary slightly by browser.

Deepgram transcription occurs after recording stops (not streamed in real time).

Requires an internet connection for AI transcription.

📹 Demo

A demo video showing the complete workflow (record → transcribe → copy) is included with the project submission.

📄 License

This project is created for learning and evaluation purposes.

🙌 Acknowledgements

Deepgram
 – Speech-to-Text API

Tauri
 – Desktop framework

React
 – Frontend library

⭐ Final Note

This project demonstrates real-world problem solving, AI integration, and desktop application development using modern tools.
The focus is on functionality, clarity, and maintainable code rather than visual complexity.
