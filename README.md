# 🎤 GPT Voice Assistant

A user-friendly **Voice Interview Bot** built with Flask, OpenAI's API, and ElevenLabs Text-to-Speech. The bot responds to personal or interview-style questions as **Dattatray Bodake** himself would — short, human, and authentic.

---

## 🧠 What It Does

- Takes **voice or typed input**
- Sends it to OpenAI's ChatGPT API (**gpt-4o-mini**)
- Responds in a **short, casual style** — like a real Dattatray would
- Speaks the response using **ElevenLabs TTS** with the student-like voice "The Dedicated Scholar"

---

## ✅ Features

- 🎤 Voice input via browser mic
- ✍️ Text input fallback
- 🤖 GPT-powered answers (**OpenAI GPT-4o-mini**)
- 🔊 Natural voice output (**ElevenLabs TTS, "The Dedicated Scholar" voice**)
- 📱 Mobile & desktop friendly
- 🔒 Secure `.env` usage (API keys never exposed)

---

## 📦 Tech Stack

- **Backend**: Python + Flask
- **Frontend**: HTML + JS (mic input + chat UI)
- **API**: OpenAI GPT-4o-mini, ElevenLabs TTS
- **Deployment**: Railway (Free Tier or local development)

---

## 🚀 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/DattatrayBodake25/gpt-voice-assistant
   cd gpt-voice-assistant
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create a .env file**
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   ```

4. **Run the app**
   ```bash
   python app.py
   ```

5. **Open in browser**
   ```bash
   http://localhost:5000
   ```
   
---


## 🌐 How It’s Deployed (Railway)
- The app is containerized and deployed to Railway.
- .env is added securely via Railway Dashboard.
- Flask runs via Gunicorn on port 8080.
- Domain is generated via Railway's "Generate Domain" feature.

---

## 🗣️ Example Questions the Bot Answers
- These are just samples. Try asking your own!
- What should we know about your life story in a few sentences?
- What’s your #1 superpower?
- What are the top 3 areas you’d like to grow in?
- What misconception do your coworkers have about you?
- How do you push your boundaries and limits?

---

## 📁 Folder Structure
```bash
├── venv/ 
├── app.py                     # Flask backend
├── templates/
│   └── index.html             # Frontend UI (HTML + JS)
├── static/
│   ├── script.js              # Chat functionality + mic + TTS
│   └── style.css              # Chat UI styling
├── .env                       # API keys (not committed)
├── requirements.txt           # Python dependencies
└── README.md                  # You're here!
```

---

## 🛡️ Security Notes
- .env is not committed to the repo (added in .gitignore)
- OpenAI and ElevenLabs API keys are securely stored in environment variables

---

## 🤝 Acknowledgments
Thanks to:
- OpenAI for the GPT API
- ElevenLabs for natural TTS voices

```vbnet
This version reflects exactly:  

- GPT-4o-mini for responses  
- ElevenLabs TTS for voice, with **The Dedicated Scholar** voice  
- Flask backend, JS frontend with mic input  
- Removed the example phrases from UI (as per your last change)  

If you want, I can also **update the README with screenshots of the improved UI** and a **link to ElevenLabs voice demo** for better presentation.

Do you want me to do that next?
```

---
