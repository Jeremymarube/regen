'use client';

import {useState} from 'react';
//import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { Send, Bot, User, } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


const AI_RESPONCES = {
   plastic: 'For plastic waste:\n\n1. Clean and dry the plastic items\n2. Check the recycling number (1-7)\n3. Separate by type:\n   • PET/PETE (#1) - bottles, containers\n   • HDPE (#2) - milk jugs, detergent bottles\n   • PVC (#3) - pipes, credit cards\n   • LDPE (#4) - shopping bags\n   • PP (#5) - bottle caps, straws\n   • PS (#6) - styrofoam cups\n   • Other (#7) - mixed plastics\n\n4. Take to your local recycling center\n\nTip: Avoid #3, #6, and #7 plastics as they\'re harder to recycle.',

   biogas: 'Converting agricultural waste to biogas:\n\n1. Collect organic waste (crop residue, animal manure, food scraps)\n2. Use a biogas digester (can be homemade or purchased)\n3. Mix waste with water in 1:1 ratio\n4. Maintain temperature at 35-37°C\n5. Wait 20-30 days for gas production\n\nBenefits:\n• Free cooking fuel\n• Reduces methane emissions\n• Creates organic fertilizer as byproduct\n• Saves money on energy costs\n\nA small household digester can produce 2-4 hours of cooking gas daily!',

   ewaste: 'E-waste disposal guidelines:\n\n1. Never throw electronics in regular trash\n2. Remove personal data first\n3. Options for disposal:\n   • Manufacturer take-back programs\n   • Certified e-waste recycling centers\n   • Retail drop-off locations\n   • Community e-waste collection events\n\n4. What can be recycled:\n   • Computers and laptops\n   • Phones and tablets\n   • TVs and monitors\n   • Batteries\n   • Small appliances\n\nE-waste contains valuable materials (gold, silver, copper) that can be recovered!',
    reduce: 'Top 10 ways to reduce your carbon footprint:\n\n1. Reduce single-use plastics\n2. Compost organic waste\n3. Use reusable bags and containers\n4. Choose products with minimal packaging\n5. Repair instead of replace\n6. Buy second-hand when possible\n7. Use public transportation or carpool\n8. Switch to LED bulbs\n9. Reduce food waste\n10. Support local and sustainable products\n\nSmall changes add up to big impact!',
 
   compost: 'Composting organic waste:\n\n✓ What to compost:\n• Fruit and vegetable scraps\n• Coffee grounds and tea bags\n• Eggshells\n• Yard waste (leaves, grass)\n• Shredded paper and cardboard\n\n✗ What NOT to compost:\n• Meat and dairy\n• Oils and fats\n• Pet waste\n• Diseased plants\n\nBasic steps:\n1. Choose a composting method (bin, pile, or tumbler)\n2. Layer green (nitrogen) and brown (carbon) materials\n3. Keep moist but not wet\n4. Turn regularly for air\n5. Ready in 2-6 months\n\nUse finished compost as natural fertilizer!', 
   default: 'I can help you with specific questions about:\n\n• Waste classification and disposal\n• Recycling guidelines\n• Biogas production from agricultural waste\n• Finding recycling centers\n• Reducing environmental impact\n• Sustainable living practices\n\nPlease ask me something specific, like "How do I recycle plastic?" or "How can I make biogas?"'
  
  };

  function GuideContent() {
    const [messages, setMessages] = useState([
      {
        id: 1,
        role: 'assistant',
         content: 'Hello! I\'m your AI sustainability assistant. I can help you with:\n\n• Waste disposal and recycling guidance\n• Finding nearby recycling centers\n• Converting agricultural waste to biogas\n• Reducing your carbon footprint\n• Sustainable living tips\n\nWhat would you like to know?'
      }
    ]);
     const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('plastic') || lowerMessage.includes('recycle plastic')) {
      return AI_RESPONSES.plastic;
  }
      if (lowerMessage.includes('biogas') || lowerMessage.includes('agricultural')) {
      return AI_RESPONSES.biogas;
    }

    if (lowerMessage.includes('e-waste') || lowerMessage.includes('electronic')) {
      return AI_RESPONSES.ewaste;
    }
      if (lowerMessage.includes('reduce') || lowerMessage.includes('carbon footprint')) {
      return AI_RESPONSES.reduce;
    }

    if (lowerMessage.includes('compost') || lowerMessage.includes('organic')) {
      return AI_RESPONSES.compost;
    }

    return AI_RESPONSES.default;
  };
      const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = getAIResponse(userMessage.content);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      };
       setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 500);
  };
   return (
    <div className="flex">
      <Sidebar />
       <div className="ml-14 flex-1 min-h-screen bg-gray-50  px-6">
        <div className="max-w-7xl mx-auto"> 
        
          <div className="mb-8">
    
            <h1 className="text-[55px] font-bold text-gray-900">AI Green Guide</h1>
            <p className="text-gray-600 mt-2 font-regular text-[24px]">
              Ask me anything about waste management and sustainability
            </p>
          </div>
           
                <div className="bg-white rounded-lg shadow-sm flex flex-col h-[600px]">
  <div className="flex-1 overflow-y-auto p-6 space-y-4">
    {messages.map((message) => (
      <div
        key={message.id}
        className={`flex items-start space-x-3 ${
          message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div
  className={`flex-1 px-4 py-3 rounded-lg whitespace-pre-line text-[24px] font-regular leading-relaxed ${
    message.role === 'user'
      ? 'bg-green-600 text-white'
      : 'bg-gray-100 text-gray-900'
  }`}
>
                    {message.content}
                  </div>
                </div>
              ))}
               {loading && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2 text-[24px] font-regular">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about waste disposal, recycling, biogas..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="bg-[#14AE5C] text-white px-6 py-2.5 rounded-lg hover:bg-[#129C53] transition"
             >
                 <Send className="w-6 h-6" />
           </button>

              </div>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-card border-border hover:shadow-md transition-smooth ">
              <CardHeader>
                <CardTitle className="text-[24px] font-semibold ">Quick Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[23px] text-muted-foreground font-regular">
                  Rinse containers before recycling to prevent contamination.
                </p>
              </CardContent>
            </Card>
             <Card className="bg-gradient-card border-border hover:shadow-md transition-smooth">
              <CardHeader>
                <CardTitle className="text-[24px] font-semibold">Did You Know?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[23px] text-muted-foreground font-regular">
                  Composting can reduce waste by up to 30%.
                </p>
              </CardContent>
            </Card>
             <Card className="bg-gradient-card border-border hover:shadow-md transition-smooth">
              <CardHeader>
                <CardTitle className="text-[24px] font-semibold">Pro Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[23px] text-muted-foreground font-regular">
                  Use reusable bags and containers to minimize single-use plastics.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Guide() {
  return (
    //<ProtectedRoute>
      <GuideContent />
    //</ProtectedRoute>
  );
}
