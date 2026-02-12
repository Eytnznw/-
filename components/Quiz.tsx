
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';

const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const toggleAnswer = (id: number) => {
    setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateScore = () => {
    return Object.values(answers).filter(Boolean).length;
  };

  const getResult = () => {
    const score = calculateScore();
    if (score >= 8) {
      return {
        title: "סיכון גבוה מאוד",
        message: "הסימנים שאת/ה מתאר/ת מצביעים בסבירות גבוהה מאוד על קשר נרקיסיסטי רעיל ופוגעני. מומלץ בחום לפנות לעזרה מקצועית ולתכנן את צעדייך בבטחה.",
        color: "text-red-600",
        bg: "bg-red-50"
      };
    } else if (score >= 5) {
      return {
        title: "דגלים אדומים משמעותיים",
        message: "ישנם מספר מאפיינים מדאיגים בקשר. ייתכן שמדובר בדפוסים רעילים שדורשים התייחסות והצבת גבולות ברורה.",
        color: "text-amber-600",
        bg: "bg-amber-50"
      };
    } else {
      return {
        title: "סימנים קלים",
        message: "הציון נמוך, אך אם את/ה מרגיש/ה חוסר נוחות בקשר, כדאי להמשיך ולחקור את הרגשות שלך ולסמוך על האינטואיציה.",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
      };
    }
  };

  const results = getResult();

  return (
    <div className="max-w-3xl mx-auto glass p-8 rounded-3xl shadow-xl animate-fade-in">
      {!showResults ? (
        <>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">שאלון אבחון עצמי</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            השאלון מבוסס על קריטריונים קליניים לזיהוי נרקיסיזם והתנהגות רעילה. סמנ/י את ההיגדים שמרגישים לך נכונים לקשר הנוכחי שלך.
          </p>

          <div className="space-y-4 mb-8">
            {QUIZ_QUESTIONS.map((q) => (
              <div 
                key={q.id}
                onClick={() => toggleAnswer(q.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  answers[q.id] ? 'border-indigo-600 bg-indigo-50 shadow-md translate-x-1' : 'border-slate-100 hover:border-indigo-200 bg-white'
                }`}
              >
                <span className="text-lg text-slate-800">{q.text}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${answers[q.id] ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                  {answers[q.id] && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowResults(true)}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
          >
            צפה בתוצאות
          </button>
        </>
      ) : (
        <div className="text-center animate-fade-in">
          <div className={`inline-block p-4 rounded-full mb-6 ${results.bg}`}>
            <svg className={`w-12 h-12 ${results.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className={`text-4xl font-black mb-4 ${results.color}`}>{results.title}</h2>
          <div className="text-2xl font-bold text-slate-700 mb-6">הציון שלך: {calculateScore()} מתוך {QUIZ_QUESTIONS.length}</div>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto">
            {results.message}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowResults(false)}
              className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
            >
              בצע שוב
            </button>
            <button 
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-all"
            >
              שוחח עם נדיה (AI) על התוצאות
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
