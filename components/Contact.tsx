
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    phone: '',
    email: '',
    message: '',
    discreet: true
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjects = ['תמיכה רגשית', 'ייעוץ משפטי ראשוני', 'סיוע בדיור מוגן', 'אחר'];
  const WHATSAPP_LINK = "https://wa.me/972524767098?text=" + encodeURIComponent("שלום נדיה, הגעתי מהאתר ואשמח להתייעץ.");

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto glass p-12 rounded-3xl text-center animate-fade-in shadow-2xl">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">פנייתך התקבלה</h2>
        <p className="text-lg text-slate-600 mb-8">
          נציג מצוות "נדיה" יחזור אלייך בהקדם האפשרי ובצורה הדיסקרטית ביותר.
        </p>
        <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-700 font-medium">
          שימי לב: הפנייה לא תופיע בפירוט החיובים כ"נדיה" אלא כשם גנרי.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {/* WhatsApp Section */}
      <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/50 flex flex-col items-center justify-center p-8 text-center bg-emerald-50/30">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-200">
           <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
           </svg>
        </div>
        <h2 className="text-3xl font-bold text-emerald-950 mb-4">פנייה מהירה בווטסאפ</h2>
        <p className="text-emerald-800 mb-8 leading-relaxed">
          הדרך המהירה והפשוטה ביותר לקבל מענה. אנחנו זמינים עבורך לכל שאלה או תמיכה במספר 052-4767098.
        </p>
        <a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-xl hover:bg-emerald-600 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
        >
          פתחי שיחה בווטסאפ
        </a>
      </div>

      {/* Form Section */}
      <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/50 animate-fade-in flex flex-col">
        <div className="indigo-gradient p-8 text-white">
          <h2 className="text-2xl font-bold mb-1">פנייה דיסקרטית</h2>
          <p className="text-indigo-100 text-sm">השאירי פרטים ונחזור אלייך.</p>
        </div>

        <div className="p-8 flex-1">
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className={`flex-1 h-2 rounded-full transition-all ${step >= i ? 'bg-indigo-600' : 'bg-slate-100'}`} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-800 mb-2">באיזה נושא נוכל לעזור?</h3>
                {subjects.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setFormData({...formData, subject: s}); handleNext(); }}
                    className={`w-full p-4 rounded-xl border-2 text-right transition-all flex justify-between items-center ${
                      formData.subject === s ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-100 hover:border-indigo-200'
                    }`}
                  >
                    <span className="font-medium">{s}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-800 mb-2">פרטי התקשרות</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">שם (אפשר גם כינוי)</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
                    placeholder="איך תרצה/י שנקרא לך?"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">טלפון</label>
                  <input 
                    type="tel" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
                    placeholder="מספר לשיחה או הודעה"
                  />
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl mt-4">
                  <input 
                    type="checkbox" 
                    id="discreet" 
                    checked={formData.discreet} 
                    onChange={(e) => setFormData({...formData, discreet: e.target.checked})}
                    className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="discreet" className="text-xs text-slate-600 font-medium">
                    דיסקרטיות מקסימלית (אל תחזרו אלי בשיחה קולית, רק הודעות)
                  </label>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={handlePrev} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-sm">חזרה</button>
                  <button type="button" onClick={handleNext} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm">המשך</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-800 mb-2">הודעה נוספת</h3>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  placeholder="ספר/י לנו קצת יותר על המצב שלך..."
                ></textarea>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={handlePrev} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-sm">חזרה</button>
                  <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 text-sm">שלחי פנייה</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
