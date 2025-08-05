#importing required libraries
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import openai
import os

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize Flask app
app = Flask(__name__)

# Rate limiting: 10 requests per minute per IP
limiter = Limiter(get_remote_address, app=app, default_limits=["60 per minute"])

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
@limiter.limit("10 per minute")
def ask():
    data = request.get_json()

    # Validate request structure
    if not data or "message" not in data:
        return jsonify({"error": "Invalid request format"}), 400

    user_input = data.get("message", "").strip()

    # Validate message content
    if not user_input or not isinstance(user_input, str):
        return jsonify({"error": "Empty or invalid message"}), 400

    # Validate message length
    if len(user_input) > 100:
        return jsonify({"error": "Message too long (max 100 characters)"}), 400

    try:
        # OpenAI API call
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a voice assistant answering interview questions on behalf of Dattatray Bodake. "
                        "Answer briefly (3-5 sentences max) and casually, as if you're Dattatray himself. "
                        "Avoid formal or corporate-sounding responses. Keep it human, authentic, and short. "
                        "Avoid contractions such as I'm, I'll, or I'd. Use full forms like I am, I will, or I would instead."
                    )
                },
                {"role": "user", "content": user_input}
            ],
            max_tokens=70,
            temperature=0.7
        )

        reply = response.choices[0].message["content"].strip()
        return jsonify({"reply": reply})

    except Exception as e:
        print("OpenAI API Error:", e)
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=True)
