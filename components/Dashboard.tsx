
import React from 'react';
import { AppSection } from '../types';

interface DashboardProps {
  onNavigate: (section: AppSection) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl indigo-gradient text-white p-8 md:p-16 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            את/ה לא לבד.<br />אנחנו כאן כדי להחזיר לך את הביטחון.
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl leading-relaxed">
            נדיה היא המרחב הבטוח שלך לזיהוי, הבנה והתמודדות עם מערכות יחסים רעילות ונרקיסיסטיות. הכל בצורה אנונימית ודיסקרטית לחלוטין.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate(AppSection.AIChat)}
              className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg shadow-xl hover:bg-indigo-50 transition-all active:scale-95"
            >
              התחילי צ'אט תמיכה
            </button>
            <button 
              onClick={() => onNavigate(AppSection.Quiz)}
              className="px-8 py-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              בחני את הקשר
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl" />
      </section>

      {/* Stats bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl text-center shadow-sm">
          <div className="text-3xl font-bold text-indigo-600 mb-1">100%</div>
          <div className="text-slate-600 font-medium">דיסקרטיות ואנונימיות</div>
        </div>
        <div className="glass p-6 rounded-2xl text-center shadow-sm border-x border-indigo-100">
          <div className="text-3xl font-bold text-indigo-600 mb-1">24/7</div>
          <div className="text-slate-600 font-medium">זמינות מלאה לתמיכה</div>
        </div>
        <div className="glass p-6 rounded-2xl text-center shadow-sm">
          <div className="text-3xl font-bold text-indigo-600 mb-1">AI</div>
          <div className="text-slate-600 font-medium">ניתוח מקצועי ומתקדם</div>
        </div>
      </div>

      {/* Bento Grid Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        {/* Large Item - Chat */}
        <div 
          onClick={() => onNavigate(AppSection.AIChat)}
          className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-slate-100 border border-slate-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="p-8 h-full flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">צ'אט AI חכם</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                דברי איתנו. נדיה מבינה את הניואנסים של קשרים רעילים ויכולה לעזור לך לעבד את מה שקורה.
              </p>
            </div>
            <span className="text-indigo-600 font-bold flex items-center gap-2">
              התחילי שיחה <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
        </div>

        {/* Medium - Quiz */}
        <div 
          onClick={() => onNavigate(AppSection.Quiz)}
          className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-emerald-50 border border-emerald-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="p-8 h-full flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">שאלון אבחון עצמי</h3>
                <p className="text-emerald-700">בדקי אם הקשר שלך עומד בקריטריונים של נרקיסיזם לפי ה-DSM-5.</p>
              </div>
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Small - Glossary */}
        <div 
          onClick={() => onNavigate(AppSection.Glossary)}
          className="group relative overflow-hidden rounded-3xl bg-indigo-50 border border-indigo-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-indigo-900 mb-1">מילון מושגים</h3>
            <p className="text-indigo-700 text-sm">גזלייטינג, הוברינג ועוד...</p>
          </div>
        </div>

        {/* Small - Resources */}
        <div 
          onClick={() => onNavigate(AppSection.Resources)}
          className="group relative overflow-hidden rounded-3xl bg-amber-50 border border-amber-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-amber-900 mb-1">מרכז עזרה</h3>
            <p className="text-amber-700 text-sm">מספרי חירום וסיוע</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
