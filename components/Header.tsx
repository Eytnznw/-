
import React from 'react';
import { AppSection } from '../types';

interface HeaderProps {
  currentSection: AppSection;
  setSection: (section: AppSection) => void;
  isPremium: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentSection, setSection, isPremium }) => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 sm:px-8">
      <nav className="mx-auto max-w-7xl glass rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          onClick={() => setSection(AppSection.Dashboard)}
        >
          <div className="w-10 h-10 indigo-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-indigo-900 tracking-tight leading-none">NADIA</span>
            {isPremium && <span className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase">Premium</span>}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-indigo-950 font-medium">
          <button 
            onClick={() => setSection(AppSection.Dashboard)}
            className={`transition-colors hover:text-indigo-600 ${currentSection === AppSection.Dashboard ? 'text-indigo-600 font-bold underline underline-offset-4' : ''}`}
          >
            בית
          </button>
          <button 
            onClick={() => setSection(AppSection.AIChat)}
            className={`transition-colors hover:text-indigo-600 ${currentSection === AppSection.AIChat ? 'text-indigo-600 font-bold underline underline-offset-4' : ''}`}
          >
            צ'אט AI
          </button>
          <button 
            onClick={() => setSection(AppSection.Quiz)}
            className={`transition-colors hover:text-indigo-600 ${currentSection === AppSection.Quiz ? 'text-indigo-600 font-bold underline underline-offset-4' : ''}`}
          >
            שאלון אבחון
          </button>
          <button 
            onClick={() => setSection(AppSection.Glossary)}
            className={`transition-colors hover:text-indigo-600 ${currentSection === AppSection.Glossary ? 'text-indigo-600 font-bold underline underline-offset-4' : ''}`}
          >
            מילון
          </button>
          <button 
            onClick={() => setSection(AppSection.Pricing)}
            className={`transition-colors text-emerald-600 font-bold ${currentSection === AppSection.Pricing ? 'underline underline-offset-4' : ''}`}
          >
            פרימיום ✨
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSection(AppSection.Contact)}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-all hover:shadow-indigo-200 active:scale-95"
          >
            צור קשר
          </button>
          <button 
            onClick={() => setSection(AppSection.Resources)}
            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors md:hidden"
            title="עזרה דחופה"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
