import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Terminal } from 'lucide-react';
import { sendMessageToAI } from './api';

function App() {
  // --- Memory (State) ---
  const [messages, setMessages] = useState([]); // List of chat bubbles
  const [input, setInput] = useState('');       // Text inside the input box
  const [isLoading, setIsLoading] = useState(false); // Are we waiting for AI?
  const scrollRef = useRef(null);               // Reference to the chat window for scrolling

  // --- Auto-Scroll Logic ---
  // Every time the 'messages' array changes, scroll to the bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  // --- Send Logic ---
  const handleSend = async (e) => {
    e.preventDefault(); // Stop the page from refreshing
    if (!input.trim() || isLoading) return; // Don't send empty messages

    const userText = input.trim();
    setInput(''); // Clear the input box
    
    // 1. Add User's message to the screen
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    
    // 2. Start the "Loading" animation
    setIsLoading(true);
    
    // 3. Request AI answer from our Java Backend (api.js)
    const aiAnswer = await sendMessageToAI(userText);
    
    // 4. Add AI message to screen and stop loading
    setMessages(prev => [...prev, { role: 'bot', text: aiAnswer }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      
      {/* 1. HEADER */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg shadow-blue-200 shadow-lg">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Anexa AI</h1>
            <p className="text-xs text-green-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Spring Boot Connected
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-slate-500 text-xs font-mono">
           <Terminal size={14} /> localhost:8080
        </div>
      </header>

      {/* 2. CHAT AREA */}
      <main 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6"
      >
        {/* Welcome Message (Shows only if chat is empty) */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-slate-400">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <Sparkles size={40} className="text-blue-100" />
            </div>
            <p className="text-lg font-medium text-slate-500">How can Anexa help you today?</p>
            <p className="text-sm max-w-xs">Ask anything, and your Java backend will process it through GPT-3.5.</p>
          </div>
        )}

        {/* Message Bubbles */}
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
          >
            <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === 'user' ? 'bg-slate-800' : 'bg-blue-600'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
              </div>
              
              {/* Text Bubble */}
              <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <Loader2 size={16} className="text-slate-400 animate-spin" />
              </div>
              <p className="text-sm text-slate-400 italic">Anexa is typing...</p>
            </div>
          </div>
        )}
      </main>

      {/* 3. INPUT BAR */}
      <footer className="p-4 md:p-6 bg-white border-t border-slate-200">
        <form 
          onSubmit={handleSend}
          className="max-w-4xl mx-auto flex items-center gap-3 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all"
        >
          <input
            className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-700 placeholder:text-slate-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your problem or ask a question..."
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-xl transition-all ${
              !input.trim() || isLoading 
                ? 'text-slate-300' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95'
            }`}
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-[0.2em] font-bold">
          Full Stack AI System • v1.0
        </p>
      </footer>
    </div>
  );
}

export default App;