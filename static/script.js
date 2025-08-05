const userInput = document.getElementById("userInput");
const chatbox = document.getElementById("chatbox");
const fallbackMsg = document.getElementById("fallbackMsg");

// here Append messages to chatbox with alignment
function appendMessage(role, text) {
  const div = document.createElement("div");
  div.classList.add("message");

  if (role === "user") {
    div.classList.add("user-message");
    div.innerHTML = `<strong>You:</strong> ${text}`;
  } else {
    div.classList.add("bot-message");
    div.innerHTML = `<strong>Bot🔊:</strong> ${text}`;
  }

  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Voice response from bot
function speakText(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  synth.speak(utter);
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
    const reply = data.reply;

    appendMessage("bot", reply);
    speakText(reply);
  } catch (err) {
    console.error("Error:", err);
    appendMessage("bot", "Oops! Something went wrong.");
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

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    sendMessage();
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    alert("Could not understand. Please try again.");
  };
}

// Show fallback if no mic
if (!("webkitSpeechRecognition" in window)) {
  fallbackMsg.style.display = "block";
}
