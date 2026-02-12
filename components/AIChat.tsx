
import React, { useState, useRef, useEffect } from 'react';
import { Message, ChatMode, AppSection } from '../types';
import { generateAIChatResponse } from '../services/geminiService';

interface AIChatProps {
  chatCount: number;
  isPremium: boolean;
  onMessageSent: () => void;
  onNavigate: (section: AppSection) => void;
}

const AIChat: React.FC<AIChatProps> = ({ chatCount, isPremium, onMessageSent, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'שלום, אני נדיה. אני כאן כדי להקשיב לך ולתמוך בך. איך את/ה מרגיש/ה היום?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<ChatMode>('support');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const MAX_FREE_MESSAGES = 5;
  const isLimitReached = !isPremium && chatCount >= MAX_FREE_MESSAGES;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping || isLimitReached) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    onMessageSent();
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await generateAIChatResponse(input, mode, history);

    const modelMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsTyping(false);
  };

  const toggleMode = (newMode: ChatMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    setMessages([
      {
        id: Date.now().toString(),
        role: 'model',
        text: newMode === 'support' 
          ? 'חזרתי למצב תמיכה. אני כאן בשבילך.' 
          : 'עברנו למצב סימולטור. אני אגלם דמות נרקיסיסטית כדי שתוכל/י לתרגל הצבת גבולות. מה תרצה/י להגיד לי?',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-4xl mx-auto glass rounded-3xl overflow-hidden shadow-2xl border border-white/50 relative">
      {/* Chat Header */}
      <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">N</div>
          <div>
            <h3 className="font-bold">נדיה - {mode === 'support' ? 'מצב תמיכה' : 'סימולטור גבולות'}</h3>
            <span className="text-xs text-indigo-100 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              זמינה עכשיו
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex gap-2 bg-indigo-700/50 p-1 rounded-xl">
            <button 
              onClick={() => toggleMode('support')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${mode === 'support' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:bg-white/10'}`}
            >
              תמיכה
            </button>
            <button 
              onClick={() => toggleMode('simulator')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${mode === 'simulator' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:bg-white/10'}`}
            >
              סימולטור
            </button>
          </div>
          {!isPremium && (
            <span className="text-[10px] text-indigo-200">
              הודעות להיום: {chatCount} / {MAX_FREE_MESSAGES}
            </span>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 ${isLimitReached ? 'blur-[2px] pointer-events-none' : ''}`}
      >
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm text-lg leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-white text-slate-900 rounded-tr-none' 
                : 'bg-indigo-600 text-white rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div className={`text-[10px] mt-1 opacity-60 ${msg.role === 'user' ? 'text-left' : 'text-right'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-end">
            <div className="bg-indigo-600/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Limit Overly */}
      {isLimitReached && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center bg-white/40 backdrop-blur-md animate-fade-in">
          <div className="w-20 h-20 indigo-gradient rounded-full flex items-center justify-center text-white mb-6 shadow-xl">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h3 className="text-2xl font-black text-indigo-950 mb-4">הגעת למכסת ההודעות היומית</h3>
          <p className="text-slate-600 text-lg mb-8 max-w-sm">
            כדי להמשיך את השיחה ללא הגבלה ולשמור על רצף הטיפול, שדרגי למסלול הפרימיום שלנו.
          </p>
          <button 
            onClick={() => onNavigate(AppSection.Pricing)}
            className="px-8 py-4 indigo-gradient text-white rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all"
          >
            שדרגי עכשיו לפרימיום
          </button>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 glass border-t border-slate-200 flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLimitReached}
          placeholder={isLimitReached ? "המכסה היומית הסתיימה..." : "כתבי כאן משהו..."}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white disabled:bg-slate-50 disabled:text-slate-400"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isTyping || isLimitReached}
          className="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AIChat;
