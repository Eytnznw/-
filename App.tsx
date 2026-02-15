
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';
import Quiz from './components/Quiz';
import Glossary from './components/Glossary';
import Resources from './components/Resources';
import Contact from './components/Contact';
import Pricing from './components/Pricing';
import { AppSection } from './types';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.Dashboard);
  const [isLoading, setIsLoading] = useState(true);
  
  // Usage & Premium State
  const [chatCount, setChatCount] = useState<number>(0);
  const [isPremium, setIsPremium] = useState<boolean>(false);

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
    // We use requestAnimationFrame to ensure the first paint has happened
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

      <footer className="w-full text-center py-6 text-slate-400 text-xs">
        <p>© 2024 NADIA - הפלטפורמה הבטוחה שלך. הכל אנונימי ודיסקרטי.</p>
      </footer>
    </div>
  );
};

export default App;
