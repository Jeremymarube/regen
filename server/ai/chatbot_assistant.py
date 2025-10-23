

import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_ai_response(message):
    """Return a real AI response from OpenAI GPT model."""
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are ReGen — an AI waste and sustainability assistant. You give practical, friendly guidance on recycling, biogas, composting, and sustainability."},
                {"role": "user", "content": message}
            ],
            max_tokens=200
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("Error:", e)
        return "Sorry, I’m having trouble responding right now. Please try again later."
