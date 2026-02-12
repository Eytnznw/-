
import React from 'react';
import { EMERGENCY_NUMBERS } from '../constants';

const Resources: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-12">
      <section className="bg-red-50 border border-red-100 rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-red-900">קווי חירום וסיוע מיידי</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EMERGENCY_NUMBERS.map((item) => (
            <a 
              key={item.number}
              href={`tel:${item.number}`}
              className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 flex items-center justify-between group hover:border-red-500 transition-all hover:shadow-md"
            >
              <div>
                <h4 className="font-bold text-slate-900">{item.name}</h4>
                <p className="text-sm text-slate-500">{item.description}</p>
                <span className="text-2xl font-black text-red-600 mt-2 block">{item.number}</span>
              </div>
              <div className="p-3 rounded-full bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="glass p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-indigo-900 mb-6">ספרות מומלצת</h3>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors border border-transparent hover:border-indigo-100">
            <div className="w-16 h-24 bg-slate-200 rounded shrink-0 shadow-md"></div>
            <div>
              <h5 className="font-bold text-lg">להתעורר מהסיוט הנרקיסיסטי</h5>
              <p className="text-slate-600 text-sm">מדריך להבנת דפוסים נרקיסיסטיים בקשרים זוגיים ובמשפחה.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors border border-transparent hover:border-indigo-100">
            <div className="w-16 h-24 bg-slate-200 rounded shrink-0 shadow-md"></div>
            <div>
              <h5 className="font-bold text-lg">גבולות: מתי להגיד כן, איך להגיד לא</h5>
              <p className="text-slate-600 text-sm">ספר יסוד בבניית גבולות אישיים בריאים מול אנשים תובעניים.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
