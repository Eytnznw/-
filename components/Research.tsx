
import React, { useState } from 'react';
import { performWebResearch } from '../services/geminiService';
import { ResearchResult } from '../types';

const Research: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isSearching) return;

    setIsSearching(true);
    try {
      const data = await performWebResearch(query);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('חלה שגיאה בחיפוש. אנא נסה שוב.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-8 pb-12">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-indigo-950 mb-4">מרכז מחקר וחדשות</h2>
        <p className="text-lg text-slate-600">
          חפשי מידע עדכני, מאמרים וחדשות על התמודדות עם נרקיסיזם ויחסים רעילים ישירות מגוגל.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="למשל: 'מחקרים חדשים על החלמה מטראומה נרקיסיסטית'..."
          className="w-full bg-white border-2 border-indigo-100 px-6 py-4 rounded-2xl shadow-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg transition-all"
        />
        <button 
          type="submit"
          disabled={!query.trim() || isSearching}
          className="absolute left-2 top-2 bottom-2 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-md disabled:opacity-50"
        >
          {isSearching ? 'מחפש...' : 'חפשי בגוגל'}
        </button>
      </form>

      {result && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="glass-panel p-8 rounded-3xl shadow-xl border border-indigo-50">
            <h3 className="text-2xl font-bold text-indigo-950 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              סיכום המחקר
            </h3>
            <div className="prose prose-indigo max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
              {result.text}
            </div>
          </div>

          {result.sources.length > 0 && (
            <div className="glass-panel p-6 rounded-3xl border border-emerald-50">
              <h4 className="text-lg font-bold text-emerald-950 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.242 9.242a4 4 0 115.656 5.656l-1.101 1.101m-.758-4.826L12 12"></path></svg>
                מקורות מידע מתוצאות החיפוש
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.sources.map((source, i) => (
                  <a 
                    key={i} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-white/50 rounded-xl border border-emerald-100 hover:border-emerald-300 hover:bg-white transition-all flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700 truncate ml-2">
                      {source.title}
                    </span>
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!result && !isSearching && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {[
            "מהן ההשפעות ארוכות הטווח של גזלייטינג?",
            "מחקרים על החלמה מטראומה מורכבת CPTSD",
            "איך לזהות נרקיסיזם סמוי?"
          ].map((suggestion, i) => (
            <button 
              key={i}
              onClick={() => { setQuery(suggestion); }}
              className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:bg-white hover:border-indigo-400 hover:text-indigo-600 transition-all text-right text-sm font-medium shadow-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Research;
