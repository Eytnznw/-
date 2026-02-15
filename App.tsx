
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';
import Quiz from './components/Quiz';
import Glossary from './components/Glossary';
import Resources from './components/Resources';
import Contact from './components/Contact';
import Pricing from './components/Pricing';
import Research from './components/Research';
import { AppSection } from './types';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.Dashboard);
  const [isLoading, setIsLoading] = useState(true);
  
  // Usage & Premium State
  const [chatCount, setChatCount] = useState<number>(0);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  const WHATSAPP_LINK = "https://wa.me/972524767098?text=" + encodeURIComponent("שלום נדיה, הגעתי מהאתר ואשמח להתייעץ.");

  useEffect(() => {
    // 1. Load critical state from localStorage instantly
    const savedCount = localStorage.getItem('nadia_chat_count');
    const lastDate = localStorage.getItem('nadia_last_chat_date');
    const savedPremium = localStorage.getItem('nadia_is_premium');
    
    const today = new Date().toDateString();
    
    if (lastDate !== today) {
      setChatCount(0);
      localStorage.setItem('nadia_chat_count', '0');
      localStorage.setItem('nadia_last_chat_date', today);
    } else if (savedCount) {
      setChatCount(parseInt(savedCount, 10));
    }
    
    if (savedPremium === 'true') {
      setIsPremium(true);
    }

    // 2. Hide loading screen immediately after state is ready
    requestAnimationFrame(() => {
      setIsLoading(false);
    });

    // Panic ESC key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.location.href = 'https://www.google.com/search?q=מזג+האוויר+היום';
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMessageSent = () => {
    const newCount = chatCount + 1;
    setChatCount(newCount);
    localStorage.setItem('nadia_chat_count', newCount.toString());
  };

  const handleUpgrade = () => {
    setIsPremium(true);
    localStorage.setItem('nadia_is_premium', 'true');
    setCurrentSection(AppSection.Dashboard);
  };

  const handlePanic = () => {
    window.location.href = 'https://www.google.com';
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
        <div className="w-16 h-16 indigo-gradient rounded-2xl animate-pulse shadow-2xl flex items-center justify-center text-white text-3xl font-black">
          N
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (currentSection) {
      case AppSection.Dashboard: return <Dashboard onNavigate={setCurrentSection} />;
      case AppSection.AIChat: return (
        <AIChat 
          chatCount={chatCount} 
          isPremium={isPremium} 
          onMessageSent={handleMessageSent} 
          onNavigate={setCurrentSection}
        />
      );
      case AppSection.Research: return <Research />;
      case AppSection.Quiz: return <Quiz />;
      case AppSection.Glossary: return <Glossary />;
      case AppSection.Resources: return <Resources />;
      case AppSection.Contact: return <Contact />;
      case AppSection.Pricing: return <Pricing onUpgrade={handleUpgrade} />;
      default: return <Dashboard onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 sm:pb-8 animate-fade-in">
      <Header 
        currentSection={currentSection} 
        setSection={setCurrentSection} 
        isPremium={isPremium}
      />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 md:py-8">
        {renderSection()}
      </main>

      {/* Floating Panic Button */}
      <button 
        onClick={handlePanic}
        className="fixed bottom-6 left-6 z-[60] group flex items-center gap-2 bg-red-600 text-white px-5 py-4 rounded-full shadow-2xl hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
        title="מילוט מהיר (או לחצו Esc)"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-bold">
          יציאה מהירה
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] group flex items-center gap-2 bg-emerald-500 text-white px-5 py-4 rounded-full shadow-2xl hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95"
        title="דברי איתנו בווטסאפ"
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-bold">
          ווטסאפ סיוע
        </span>
      </a>

      <footer className="w-full text-center py-6 text-slate-400 text-xs">
        <p>© 2024 NADIA - הפלטפורמה הבטוחה שלך. הכל אנונימי ודיסקרטי.</p>
      </footer>
    </div>
  );
};

export default App;
