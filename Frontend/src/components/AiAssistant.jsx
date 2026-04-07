import React, { useState, useRef, useEffect } from "react";
import { MessageSquareText, X, Send, Loader2Icon, Bot } from "lucide-react";

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, isBot: true, text: "Hi! I'm the SocialSwap AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMessage = input;
    
    // Add user message to UI
    setMessages(prev => [...prev, { id: Date.now(), isBot: false, text: userMessage }]);
    setInput("");
    setIsSending(true);

    try {
      // Connect to your Node.js backend running on port 3000
      const response = await fetch('https://social-swap-backend.vercel.app/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      const data = await response.json();

      // Add the AI's actual response to the chat window
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        isBot: true, 
        text: data.reply || "Sorry, I encountered an error." 
      }]);
      setIsSending(false);

    } catch (error) {
      console.error("Error communicating with AI:", error);
      setMessages(prev => [...prev, { id: Date.now(), isBot: true, text: "Server connection failed." }]);
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Chat Window */}
      {isOpen && (
        <div className="mb-4 bg-[#0d0018] border border-white/10 rounded-2xl shadow-2xl shadow-purple-900/20 w-[350px] h-[500px] flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-lg bg-linear-to-r from-white to-purple-400 bg-clip-text text-transparent">
                AI Assistant
              </h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  message.isBot 
                    ? "bg-white/10 border border-white/10 text-gray-200 rounded-bl-sm" 
                    : "bg-purple-600 text-white rounded-br-sm"
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                   <Loader2Icon className="w-4 h-4 animate-spin text-purple-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#1a0a2e] border-t border-white/10">
            <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-purple-500/60 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Ask me anything..."
                className="flex-1 resize-none bg-transparent text-white placeholder-white/30 focus:outline-none max-h-32 text-sm py-1"
                rows={1}
              />
              <button
                disabled={!input.trim() || isSending}
                type="submit"
                className="shrink-0 w-8 h-8 rounded-lg bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-colors mb-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-purple-600 hover:bg-purple-500 rounded-full shadow-lg shadow-purple-900/50 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquareText className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default AiAssistant;