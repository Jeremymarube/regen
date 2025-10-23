from flask import Blueprint, request, jsonify
from ai.chatbot_assistant import get_ai_response
# from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Message, User

ai_bp = Blueprint("ai", __name__)

@ai_bp.route("/api/ai-guide", methods=["POST"])
# @jwt_required()  # ensures only logged-in users can send messages
def ai_guide():
    data = request.get_json()
    message = data.get("message", "")
    if not message:
        return jsonify({"error": "Message is required"}), 400
    
    # user_id = get_jwt_identity()  # get logged-in user's ID

    # # Save user message
    # user_msg = Message(user_id=user_id, role="user", content=message)
    # db.session.add(user_msg)
    # db.session.commit()


     # Get AI response
    response = get_ai_response(message)
    #  # Save AI response
    # ai_msg = Message(user_id=user_id, role="assistant", content=response_text)
    # db.session.add(ai_msg)
    # db.session.commit()

    return jsonify({"response": response})
