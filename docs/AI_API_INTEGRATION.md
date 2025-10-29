# ReGen - AI API Integration Documentation

## Overview

ReGen uses **Groq API** with the **llama-3.3-70b-versatile** model for AI-powered sustainability guidance and waste management advice.

---

## Current AI Provider: Groq

### Why Groq?
- ✅ **Fast inference** - Ultra-low latency responses
- ✅ **Cost-effective** - Competitive pricing
- ✅ **Powerful model** - Llama 3.3 70B parameter model
- ✅ **Reliable** - High uptime and availability
- ✅ **Easy integration** - Simple REST API

### Model Details
- **Model:** `llama-3.3-70b-versatile`
- **Provider:** Groq (https://groq.com)
- **Context Window:** 8,192 tokens
- **Temperature:** 0.7 (balanced creativity/accuracy)
- **Max Tokens:** 500 per response

---

## API Configuration

### Environment Variables

```bash
# Required in .env file
GROQ_API_KEY=your_groq_api_key_here
```

### Getting a Groq API Key

1. Visit: https://console.groq.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and add to your `.env` file

---

## Implementation Details

### Backend Integration

**File:** `/server/routes/ai_routes.py`

```python
from groq import Groq
import os

# Initialize Groq client
groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@ai_bp.route('/', methods=['POST'])
def get_ai_guide():
    """
    AI Guide endpoint for sustainability advice
    """
    data = request.get_json()
    user_message = data.get('message', '')
    
    # Call Groq API
    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an AI sustainability expert..."
            },
            {
                "role": "user",
                "content": user_message
            }
        ],
        temperature=0.7,
        max_tokens=500
    )
    
    return jsonify({
        'message': 'AI response generated',
        'response': response.choices[0].message.content
    })
```

### API Endpoint

**Endpoint:** `POST /api/ai-guide`

**Request:**
```json
{
  "message": "How can I reduce plastic waste at home?"
}
```

**Response:**
```json
{
  "message": "AI response generated",
  "response": "Here are some effective ways to reduce plastic waste..."
}
```

---

## AI Features

### 1. Sustainability Advice Chatbot
- **Location:** Dashboard → AI Guide
- **Purpose:** Provide personalized eco-friendly tips
- **Topics:** Waste reduction, recycling, composting, sustainability

### 2. Waste Classification Assistance
- **Purpose:** Help users identify waste types
- **Input:** User description or image
- **Output:** Waste category and disposal method

### 3. Environmental Impact Insights
- **Purpose:** Explain CO₂ savings and environmental benefits
- **Context:** Based on user's recycling activities

---

## System Prompt

The AI is configured with a specialized system prompt:

```
You are an AI sustainability expert for ReGen, a waste management and 
environmental awareness platform. Your role is to:

1. Provide practical, actionable advice on waste reduction and recycling
2. Explain environmental concepts in simple, accessible language
3. Encourage sustainable behaviors with positive reinforcement
4. Offer location-specific guidance when relevant (focus on Kenya/Africa)
5. Calculate and explain CO₂ savings from recycling activities
6. Suggest proper disposal methods for different waste types

Always be:
- Encouraging and supportive
- Factually accurate
- Practical and actionable
- Culturally sensitive
- Brief but informative (aim for 2-3 paragraphs)
```

---

## Alternative AI Providers (Future Options)

### OpenAI GPT-4
- **Model:** gpt-4-turbo
- **Pros:** Most capable, best reasoning
- **Cons:** Higher cost, slower
- **Migration:** Change `groq_client` to `openai.OpenAI()`

### Anthropic Claude
- **Model:** claude-3-sonnet
- **Pros:** Long context, safety-focused
- **Cons:** API availability
- **Migration:** Use `anthropic` Python SDK

### Hugging Face
- **Model:** Various open-source models
- **Pros:** Free, customizable
- **Cons:** Self-hosting required
- **Migration:** Use `transformers` library

---

## Rate Limits & Quotas

### Groq Free Tier
- **Requests:** 30 requests/minute
- **Tokens:** 6,000 tokens/minute
- **Daily:** 14,400 requests/day

### Handling Rate Limits

```python
from groq import RateLimitError
import time

try:
    response = groq_client.chat.completions.create(...)
except RateLimitError:
    time.sleep(2)  # Wait 2 seconds
    response = groq_client.chat.completions.create(...)
```

---

## Error Handling

### Common Errors

**1. Missing API Key**
```python
if not os.environ.get("GROQ_API_KEY"):
    return jsonify({'error': 'AI service not configured'}), 503
```

**2. API Timeout**
```python
try:
    response = groq_client.chat.completions.create(...)
except TimeoutError:
    return jsonify({'error': 'AI service timeout'}), 504
```

**3. Invalid Request**
```python
try:
    response = groq_client.chat.completions.create(...)
except Exception as e:
    return jsonify({'error': 'AI request failed'}), 500
```

---

## Performance Optimization

### 1. Response Caching
Cache common questions to reduce API calls:

```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_cached_response(question):
    return groq_client.chat.completions.create(...)
```

### 2. Streaming Responses
For real-time chat experience:

```python
response = groq_client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=messages,
    stream=True
)

for chunk in response:
    yield chunk.choices[0].delta.content
```

### 3. Token Management
Monitor token usage to stay within limits:

```python
response = groq_client.chat.completions.create(...)
tokens_used = response.usage.total_tokens
print(f"Tokens used: {tokens_used}")
```

---

## Testing

### Manual Testing

```bash
# Test AI endpoint
curl -X POST http://localhost:5000/api/ai-guide \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I recycle plastic bottles?"}'
```

### Unit Tests

```python
def test_ai_guide_endpoint(client):
    response = client.post('/api/ai-guide', json={
        'message': 'Test question'
    })
    assert response.status_code == 200
    assert 'response' in response.get_json()
```

---

## Monitoring & Analytics

### Track AI Usage

```python
# Log AI requests
import logging

logger.info(f"AI request: {user_message}")
logger.info(f"AI response length: {len(ai_response)}")
logger.info(f"Tokens used: {response.usage.total_tokens}")
```

### Metrics to Monitor
- ✅ Request count per day
- ✅ Average response time
- ✅ Token usage
- ✅ Error rate
- ✅ User satisfaction (feedback)

---

## Cost Estimation

### Groq Pricing (as of 2025)
- **Free Tier:** 14,400 requests/day
- **Pro Tier:** $0.10 per 1M tokens
- **Enterprise:** Custom pricing

### Monthly Cost Estimate
Assuming 1,000 daily users, 2 AI queries each:
- **Requests:** 2,000/day = 60,000/month
- **Tokens:** ~300 tokens/request = 18M tokens/month
- **Cost:** ~$1.80/month (well within free tier)

---

## Security Best Practices

### 1. API Key Protection
```bash
# Never commit API keys
echo "GROQ_API_KEY=*" >> .gitignore

# Use environment variables
export GROQ_API_KEY=your_key_here
```

### 2. Input Validation
```python
def validate_message(message):
    if not message or len(message) > 1000:
        raise ValueError("Invalid message length")
    return message.strip()
```

### 3. Content Filtering
```python
# Filter inappropriate content
if contains_inappropriate_content(user_message):
    return jsonify({'error': 'Invalid content'}), 400
```

---

## Future Enhancements

### Planned Features
- [ ] **Multi-language support** - Swahili, French, etc.
- [ ] **Image analysis** - Identify waste from photos
- [ ] **Voice input** - Speech-to-text integration
- [ ] **Personalized recommendations** - Based on user history
- [ ] **Community insights** - Aggregate sustainability tips

### Advanced AI Features
- [ ] **Fine-tuned model** - Train on waste management data
- [ ] **RAG (Retrieval-Augmented Generation)** - Use local knowledge base
- [ ] **Multi-agent system** - Specialized agents for different tasks

---

## Troubleshooting

### Issue: "AI service not configured"
**Solution:** Add `GROQ_API_KEY` to `.env` file

### Issue: Rate limit exceeded
**Solution:** Implement request throttling or upgrade plan

### Issue: Slow responses
**Solution:** Use streaming or switch to faster model

### Issue: Inaccurate responses
**Solution:** Improve system prompt or add context

---

## Resources

- **Groq Documentation:** https://console.groq.com/docs
- **Llama 3.3 Model Card:** https://huggingface.co/meta-llama/Llama-3.3-70B
- **API Reference:** https://console.groq.com/docs/api-reference
- **Community:** https://discord.gg/groq

---

## Contact & Support

For AI integration issues:
- **Email:** support@regen.com
- **GitHub Issues:** https://github.com/Jeremymarube/regen/issues
- **Groq Support:** support@groq.com

---

**Last Updated:** October 29, 2025
**Version:** 1.0.0
**Status:** ✅ Production Ready
