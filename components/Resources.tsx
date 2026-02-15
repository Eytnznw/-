
import React from 'react';
import { EMERGENCY_NUMBERS } from '../constants';

const Resources: React.FC = () => {
  const WHATSAPP_LINK = "https://wa.me/972524767098?text=" + encodeURIComponent("שלום נדיה, אשמח לקבל סיוע.");

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-12">
      <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-emerald-900">מוקד נדיה בווטסאפ</h2>
        </div>
        <p className="text-emerald-800 mb-6 font-medium">
          מענה אנושי מהיר ודיסקרטי במספר 052-4767098. אנחנו כאן ללוות אותך.
        </p>
        <a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-md active:scale-95"
        >
          שלחי הודעה עכשיו
        </a>
      </section>

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
