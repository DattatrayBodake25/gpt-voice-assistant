# importing required libraries
from flask import Flask, request, jsonify, render_template, send_file
from dotenv import load_dotenv
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import openai
import os
import datetime
import io
from elevenlabs import ElevenLabs

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
elevenlabs_api_key = os.getenv("ELEVENLABS_API_KEY")

# Initialize Flask app
app = Flask(__name__)

# Rate limiting: 10 requests per minute per IP
limiter = Limiter(get_remote_address, app=app, default_limits=["60 per minute"])

# Initialize ElevenLabs client
eleven_client = ElevenLabs(api_key=elevenlabs_api_key)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
@limiter.limit("10 per minute")
def ask():
    data = request.get_json()
    if not data or "message" not in data:
        return jsonify({"error": "Invalid request format"}), 400

    user_input = data.get("message", "").strip()
    if not user_input or not isinstance(user_input, str):
        return jsonify({"error": "Empty or invalid message"}), 400
    if len(user_input) > 500:
        return jsonify({"error": "Message too long (max 500 characters)"}), 400

    try:
        today = datetime.datetime.now().strftime("%d %B %Y")

        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        f"You are a voice assistant answering interview questions on behalf of Dattatray Bodake. "
                        f"The current date is {today}. "
                        "Answer as if you are Dattatray himself, keeping responses authentic and human. "
                        "Keep replies between 3 to 5 sentences. "
                        "Avoid sounding overly formal or robotic. "
                        "Do not use contractions like I'm, I'll, or I'd. "
                        "Use full forms like I am, I will, or I would instead."
                    )
                },
                {"role": "user", "content": user_input}
            ],
            max_tokens=150,
            temperature=0.7
        )

        reply = response.choices[0].message["content"].strip()
        return jsonify({"reply": reply})

    except Exception as e:
        print("OpenAI API Error:", e)
        return jsonify({"error": "Internal server error"}), 500


@app.route("/tts", methods=["POST"])
@limiter.limit("10 per minute")
def tts():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Invalid request format"}), 400

    text = data.get("text", "").strip()
    if not text:
        return jsonify({"error": "Empty text"}), 400

    try:
        # Convert text to speech using ElevenLabs
        audio_generator = eleven_client.text_to_speech.convert(
            text=text,
            voice_id="jvRPoufAEF7JQZv2NKhc",
            model_id="eleven_multilingual_v2",
            output_format="mp3_44100_128"
        )

        # Convert generator to bytes
        audio_bytes = b"".join(audio_generator)

        # Return audio as a file-like object
        return send_file(
            io.BytesIO(audio_bytes),
            mimetype="audio/mpeg",
            as_attachment=False,
            download_name="reply.mp3"
        )

    except Exception as e:
        print("ElevenLabs TTS Error:", e)
        return jsonify({"error": "Failed to generate audio"}), 500


if __name__ == "__main__":
    app.run(debug=True)