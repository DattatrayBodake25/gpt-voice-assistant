const userInput = document.getElementById("userInput");
const chatbox = document.getElementById("chatbox");
const fallbackMsg = document.getElementById("fallbackMsg");
const micBtn = document.getElementById("micBtn");

// Create a "Bot is speaking..." indicator element
let speakingIndicator = null;

// Append messages to chatbox
function appendMessage(role, text) {
  const div = document.createElement("div");
  div.classList.add("message");

  if (role === "user") {
    div.classList.add("user-message");
    div.innerHTML = `<strong>👤 You:</strong> ${text}`;
  } else {
    div.classList.add("bot-message");
    div.innerHTML = `<strong>🤖 Bot:</strong> ${text}`;
  }

  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Show "Bot is speaking..." indicator
function showSpeakingIndicator() {
  if (!speakingIndicator) {
    speakingIndicator = document.createElement("div");
    speakingIndicator.classList.add("bot-message", "speaking");
    speakingIndicator.id = "speakingIndicator";
    speakingIndicator.innerHTML = `<strong>🤖 Bot:</strong> 🗣️ Speaking...`;
    chatbox.appendChild(speakingIndicator);
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}

// Remove speaking indicator
function removeSpeakingIndicator() {
  if (speakingIndicator) {
    chatbox.removeChild(speakingIndicator);
    speakingIndicator = null;
  }
}

// Play bot audio using ElevenLabs TTS
async function speakText(text) {
  try {
    showSpeakingIndicator();

    const res = await fetch("/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) throw new Error("TTS request failed");

    const audioBlob = await res.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    micBtn.classList.add("mic-active"); // glow while speaking

    audio.onended = () => {
      removeSpeakingIndicator();
      micBtn.classList.remove("mic-active");
    };

    audio.play();
  } catch (err) {
    console.error("TTS Error:", err);
    removeSpeakingIndicator();
    micBtn.classList.remove("mic-active");

    // Fallback to browser speechSynthesis if ElevenLabs fails
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.onend = () => {
      removeSpeakingIndicator();
    };
    synth.speak(utter);
  }
}

// Send message to server
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    if (data.reply) {
      appendMessage("bot", data.reply);
      speakText(data.reply);
    } else {
      appendMessage("bot", "⚠️ Sorry, I could not process that.");
    }
  } catch (err) {
    console.error("Error:", err);
    appendMessage("bot", "⚠️ Oops! Something went wrong.");
  }
}

// Voice input via mic
function startListening() {
  if (!("webkitSpeechRecognition" in window)) {
    fallbackMsg.style.display = "block";
    alert("Your browser does not support voice input.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  micBtn.classList.add("mic-active"); // glow effect while listening

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    sendMessage();
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    appendMessage("bot", "⚠️ Could not understand. Please try again.");
  };

  recognition.onend = () => {
    micBtn.classList.remove("mic-active"); // remove glow when stop
  };
}

// Show fallback if no mic support
if (!("webkitSpeechRecognition" in window)) {
  fallbackMsg.style.display = "block";
}

// Enter key support
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});
