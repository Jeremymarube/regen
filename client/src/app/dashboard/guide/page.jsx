'use client';

import {useState} from 'react';
//import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { Send, Bot, User, } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


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

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const res = await fetch('http://127.0.0.1:5000/api/ai-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Sorry, no response.'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI Guide Error:', err);
      // Show error message to user
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

    
   return (
    <div className="flex">
      <Sidebar />
       <div className="ml-2 flex-1 min-h-screen bg-gray-50  px-2">
        <div className="max-w-7xl mx-auto"> 
        
          <div className="mb-8">
    
            <h1 className="text-[55px] font-bold text-gray-900">AI Green Guide</h1>
            <p className="text-gray-600 mt-2 font-regular text-[24px]">
              Ask me anything about waste management and sustainability
            </p>
          </div>
           
                <div className="bg-white rounded-lg shadow-sm flex flex-col h-[500px] w-full max-w-5xl px-6">
  <div className="flex-1 overflow-y-auto p-6 space-y-4">
    {messages.map((message) => (
      <div
        key={message.id}
        className={`flex items-start space-x-3 ${
          message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 max-w-[80%] ${
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
              className={`inline-block max-w-[200%] px-4 py-3 rounded-lg whitespace-pre-line text-[24px] font-regular leading-relaxed ${
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
  <div className="relative">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      placeholder="Ask about waste disposal, recycling, biogas..."
      className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-[24px] font-regular"
    />
    <button
      onClick={handleSend}
      disabled={loading || !input.trim()}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-[#14AE5C] p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
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
