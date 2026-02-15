
import React, { useState, useRef, useEffect } from 'react';
import { Message, ChatMode, AppSection } from '../types';
import { generateAIChatResponse } from '../services/geminiService';

interface MessageWithSources extends Message {
  sources?: { title: string; uri: string }[];
}

interface AIChatProps {
  chatCount: number;
  isPremium: boolean;
  onMessageSent: () => void;
  onNavigate: (section: AppSection) => void;
}

const AIChat: React.FC<AIChatProps> = ({ chatCount, isPremium, onMessageSent, onNavigate }) => {
  const [messages, setMessages] = useState<MessageWithSources[]>(() => {
    const saved = localStorage.getItem('nadia_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
      } catch (e) { return []; }
    }
    return [
      { id: '1', role: 'model', text: 'שלום, אני נדיה. אני כאן בשבילך. זהו מרחב בטוח ודיסקרטי.', timestamp: new Date() },
      { id: '2', role: 'model', text: 'איך תרצי שנתקדם היום? אני יכולה להקשיב ולייעץ, או שנוכל לתרגל שיחה קשה בסימולטור.', timestamp: new Date() }
    ];
  });
  
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<ChatMode>('support');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const MAX_FREE_MESSAGES = 5;
  const isLimitReached = !isPremium && chatCount >= MAX_FREE_MESSAGES;

  useEffect(() => {
    localStorage.setItem('nadia_chat_history', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping || isLimitReached) return;

    const userMessage: MessageWithSources = {
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

    const response = await generateAIChatResponse(input, mode, history);

    const modelMessage: MessageWithSources = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response.text,
      sources: response.sources,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] animate-fade-in-up max-w-4xl mx-auto">
      {/* Header Panel */}
      <div className="glass-panel p-4 mb-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md ${mode === 'support' ? 'bg-indigo-500' : 'bg-orange-500'}`}>
                  {mode === 'support' ? '❤️' : '⚡'}
               </div>
               <div>
                   <span className="font-bold text-slate-800 block">
                      {mode === 'support' ? 'מצב תמיכה ואמפתיה' : 'סימולטור אימון'}
                   </span>
                   <span className="text-xs text-slate-500">
                      {!isPremium && `נותרו ${MAX_FREE_MESSAGES - chatCount} הודעות להיום`}
                      {isPremium && "מצב פרימיום פעיל - שיחות ללא הגבלה"}
                   </span>
               </div>
          </div>
          <div className="flex items-center gap-2">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => setMode('support')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${mode === 'support' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>תמיכה</button>
                  <button onClick={() => setMode('simulator')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${mode === 'simulator' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'}`}>סימולטור</button>
              </div>
          </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto space-y-4 p-6 glass-panel rounded-t-3xl border-b-0 shadow-inner bg-white/40 relative ${isLimitReached ? 'blur-[1px]' : ''}`}
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
            }`}>
              {msg.text}
            </div>
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 max-w-[80%]">
                <span className="text-[10px] text-slate-400 w-full mb-1 mr-2">מקורות לקריאה נוספת:</span>
                {msg.sources.slice(0, 3).map((source, idx) => (
                  <a 
                    key={idx} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors truncate max-w-[150px]"
                    title={source.title}
                  >
                    🔗 {source.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex w-full">
            <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            </div>
          </div>
        )}

        {/* Limit Overlay */}
        {isLimitReached && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center bg-white/60 backdrop-blur-md rounded-t-3xl">
            <div className="w-16 h-16 indigo-gradient rounded-full flex items-center justify-center text-white mb-4 shadow-lg text-2xl">🔒</div>
            <h3 className="text-xl font-bold text-indigo-950 mb-2">הגעת למכסת ההודעות היומית</h3>
            <p className="text-slate-600 text-sm mb-6 max-w-xs">
              כדי להמשיך לדבר עם נדיה ללא הגבלה ולתרגל בסימולטור, עברי למסלול הפרימיום.
            </p>
            <button 
              onClick={() => onNavigate(AppSection.Pricing)}
              className="px-6 py-3 indigo-gradient text-white rounded-xl font-bold shadow-md hover:scale-105 transition-all"
            >
              שדרוג עכשיו
            </button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 rounded-b-3xl flex gap-2 shadow-lg">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLimitReached}
          placeholder={isLimitReached ? "המכסה הסתיימה..." : "כתבי כאן משהו..."}
          className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-700 placeholder-slate-400 disabled:opacity-50"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isTyping || isLimitReached}
          className="bg-indigo-600 text-white w-14 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition shadow-md disabled:opacity-30"
        >
          <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </button>
      </form>
    </div>
  );
};

export default AIChat;
