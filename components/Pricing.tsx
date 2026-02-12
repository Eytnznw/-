
import React from 'react';

interface PricingProps {
  onUpgrade: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onUpgrade }) => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-indigo-950 mb-4">בחרי את מסלול ההחלמה שלך</h2>
        <p className="text-lg text-slate-600">שדרגי לנדיה פרימיום וקבלי תמיכה ללא הגבלה, בכל זמן ובכל מקום.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="glass p-8 rounded-3xl border border-slate-200 flex flex-col h-full relative overflow-hidden">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">מסלול בסיסי</h3>
            <p className="text-slate-500 italic">חינם לנצח</p>
          </div>
          <div className="text-4xl font-black mb-8 text-slate-900">₪0 <span className="text-sm font-normal text-slate-500">/ חודש</span></div>
          <ul className="space-y-4 mb-12 flex-1">
            <li className="flex items-center gap-3 text-slate-700">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              5 הודעות צ'אט ביום
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              גישה למילון המושגים
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              שאלון אבחון בסיסי
            </li>
          </ul>
          <button disabled className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-bold cursor-not-allowed">
            המסלול הנוכחי שלך
          </button>
        </div>

        {/* Premium Plan */}
        <div className="indigo-gradient p-8 rounded-3xl shadow-2xl flex flex-col h-full relative overflow-hidden transform hover:scale-105 transition-all">
          <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            מומלץ
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">נדיה פרימיום</h3>
            <p className="text-indigo-100 italic">החופש להחלים</p>
          </div>
          <div className="text-4xl font-black mb-8 text-white">₪49 <span className="text-sm font-normal text-indigo-100">/ חודש</span></div>
          <ul className="space-y-4 mb-12 flex-1 text-white">
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              שיחות צ'אט ללא הגבלה
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              מצב סימולטור גבולות מתקדם
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              דו"ח אבחון מפורט לשיתוף עם מטפל
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              תעדוף בתגובות הצוות האנושי
            </li>
          </ul>
          <button 
            onClick={onUpgrade}
            className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold shadow-xl hover:bg-indigo-50 transition-all active:scale-95"
          >
            שדרגי עכשיו
          </button>
        </div>
      </div>

      <div className="mt-16 text-center text-slate-400 text-sm">
        <p>התשלום מאובטח ודיסקרטי לחלוטין. החיוב יופיע כ-"N-Wellness Support".</p>
      </div>
    </div>
  );
};

export default Pricing;
