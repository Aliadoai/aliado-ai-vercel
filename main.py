from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")
openai.project = os.getenv("OPENAI_PROJECT_ID")

@app.route("/respond", methods=["POST"])
def respond():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Missing 'message' in request."}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Eres Aliado AI, un asistente que responde con claridad, profesionalismo y amabilidad para negocios pequeños. Siempre respondes en español."},
                {"role": "user", "content": user_message}
            ]
        )
        reply = response["choices"][0]["message"]["content"]
        return jsonify({"reply": reply.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500