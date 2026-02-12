
import React from 'react';
import { GLOSSARY_ITEMS } from '../constants';

const Glossary: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-indigo-950 mb-4">מילון מונחים מקצועי</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          הצעד הראשון לצאת מהערפל הוא לתת שמות לדברים. כאן תמצאו הסברים פשוטים למונחים פסיכולוגיים מורכבים.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GLOSSARY_ITEMS.map((item) => (
          <div 
            key={item.id}
            className="group relative glass p-8 rounded-3xl shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-200"
          >
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.term}</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              {item.definition}
            </p>
            {item.example && (
              <div className="mt-4 p-3 bg-slate-50 rounded-xl text-sm italic text-slate-500 border-r-2 border-indigo-200">
                "{item.example}"
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Glossary;
