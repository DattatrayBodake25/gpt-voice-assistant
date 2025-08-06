# 🎤 GPT Voice Assistant

A user-friendly **Voice Interview Bot** built with Flask, OpenAI's API, and browser speech recognition. The bot responds to personal or interview-style questions as **Dattatray Bodake** himself would — short, human, and authentic.

---

## 🧠 What It Does

- Takes **voice or typed input**
- Sends it to OpenAI's ChatGPT API (gpt-4o-mini)
- Responds in a **short, casual style** — like a real Dattatray would
- Speaks the response using browser-based Text-to-Speech (TTS)

---

## ✅ Features

- 🎤 Voice input via browser mic
- ✍️ Text input fallback
- 🤖 GPT-powered answers (OpenAI API)
- 🔊 Voice output (TTS)
- 🌐 Fully deployed on **Railway.app**
- 📱 Mobile & desktop friendly
- 🔒 Secure `.env` usage (API key never exposed)

---

## 📦 Tech Stack

- **Backend**: Python + Flask
- **Frontend**: HTML + JS (mic input), Bootstrap-style layout
- **API**: OpenAI GPT-4o-mini
- **Deployment**: Railway (Free Tier)

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
   
3. **Create a .env file**
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the app**
   ```bash
   python app.py
   ```

5. **Open in browser**
   ```arduino
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

📁 Folder Structure
```bash
├── app.py               # Flask backend
├── templates/
│   └── index.html       # Frontend UI (HTML + JS for mic)
├── static/              # Optional CSS/JS if added
├── .env                 # (Not committed)
├── requirements.txt     # Python dependencies
└── README.md            # You're here!
```

---

## 🛡️ Security Notes
- .env is not committed to the repo (added in .gitignore)
- API key is securely stored on the Railway environment settings

---

## 🤝 Acknowledgments
Thanks to:
   - OpenAI for the GPT API
   - Railway for free hosting
   - You for testing this app!

