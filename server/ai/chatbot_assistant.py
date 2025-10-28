import os
from dotenv import load_dotenv

load_dotenv()

# Try to import OpenAI, but make it optional
try:
    from openai import OpenAI
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key:
        try:
            client = OpenAI(api_key=api_key)
        except Exception as e:
            print(f"Warning: Could not initialize OpenAI client: {e}")
            client = None
    else:
        client = None
except ImportError:
    print("Warning: OpenAI library not installed")
    client = None

def get_ai_response(message):
    """Return a real AI response from OpenAI GPT model or fallback response."""
    
    # If OpenAI is not configured, return a helpful fallback response
    if not client:
        return get_fallback_response(message)
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system", 
                    "content": """You are ReGen, an AI waste and sustainability assistant. 
                    Provide specific, actionable advice. Avoid repeating the list of topics.
                    If asked for sustainable living tips, give practical examples and tips 
                    without restating the list of topics you can help with."""
                },
                {"role": "user", "content": message}
            ],
            max_tokens=300,
            temperature=0.7
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("Error:", e)
        return get_fallback_response(message)

def get_fallback_response(message):
    """Provide helpful fallback responses when OpenAI is not available."""
    message_lower = message.lower()
    
    if any(word in message_lower for word in ['plastic', 'recycle plastic']):
        return """To recycle plastic properly:

1. Check the recycling number (1-7) on the bottom
2. Rinse containers to remove food residue
3. Remove caps and labels when possible
4. Flatten bottles to save space
5. Place in your recycling bin

Most recycling centers accept plastics #1 (PET) and #2 (HDPE). Check with your local center for other types."""

    elif any(word in message_lower for word in ['biogas', 'organic', 'compost']):
        return """Converting organic waste to biogas:

1. Collect organic waste (food scraps, agricultural waste)
2. Use a biogas digester or composting system
3. Maintain proper moisture and temperature
4. The process produces methane gas and nutrient-rich fertilizer

Benefits: Renewable energy, reduces landfill waste, creates organic fertilizer."""

    elif any(word in message_lower for word in ['paper', 'cardboard']):
        return """Recycling paper and cardboard:

1. Keep paper dry and clean
2. Remove plastic windows from envelopes
3. Flatten cardboard boxes
4. Don't recycle: greasy pizza boxes, tissues, paper towels
5. Shred sensitive documents before recycling

Paper can be recycled 5-7 times before fibers break down."""

    else:
        return """I can help you with:

• Recycling guidance (plastic, paper, metal, glass)
• Biogas and composting information
• Finding recycling centers
• Reducing your carbon footprint
• Sustainable living tips

What specific topic would you like to know more about?"""
