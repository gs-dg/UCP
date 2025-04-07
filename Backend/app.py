import os
from flask import Flask, request, jsonify # type: ignore
import google.generativeai as genai # type: ignore
from dotenv import load_dotenv # type: ignore
from flask_cors import CORS # type: ignore

# Load environment variables
load_dotenv()

# Get API key from .env file
api_key = os.getenv("GEMINI_API_KEY")

# Check if the API key is available
if not api_key:
    raise ValueError("No GEMINI_API_KEY found in .env file!")

# Configure Gemini API
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

app = Flask(__name__)
CORS(app)

# Store conversation history as a list
conversation_history = []

@app.route("/chat", methods=["POST"])
def chat():
    global conversation_history

    # Get user input from request
    user_input = request.json.get("message")
    
    if not user_input:
        return jsonify({"error": "No input provided!"}), 400

    try:
        # Append user input to conversation history
        conversation_history.append(f"Me: {user_input}")
        
        # Prepare conversation context
        context = "\n".join(conversation_history[-10:])  # Limit to last 10 messages
        
        # Generate response from Gemini API
        response = model.generate_content(context)
        reply = getattr(response, "text", "Sorry, I didn't understand.").strip()

        # Append AI response to conversation history
        conversation_history.append(f"AI: {reply}")
        
        return jsonify({"response": reply})

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
