
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
    <div className="max-w-2xl mx-auto glass rounded-3xl overflow-hidden shadow-2xl border border-white/50 animate-fade-in">
      <div className="indigo-gradient p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">צרי קשר</h2>
        <p className="text-indigo-100">אנחנו כאן כדי לעזור, בכל דרך שנוחה לך.</p>
      </div>

      <div className="p-8">
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${step >= i ? 'bg-indigo-600' : 'bg-slate-100'}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-bold text-slate-800 mb-4">באיזה נושא נוכל לעזור?</h3>
              {subjects.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setFormData({...formData, subject: s}); handleNext(); }}
                  className={`w-full p-4 rounded-xl border-2 text-right transition-all flex justify-between items-center ${
                    formData.subject === s ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-100 hover:border-indigo-200'
                  }`}
                >
                  <span className="font-medium text-lg">{s}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-bold text-slate-800 mb-4">פרטי התקשרות</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">שם (אפשר גם כינוי)</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="איך תרצה/י שנקרא לך?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">טלפון</label>
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
                <label htmlFor="discreet" className="text-sm text-slate-600 font-medium">
                  דיסקרטיות מקסימלית (אל תחזרו אלי בשיחה קולית, רק הודעות)
                </label>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={handlePrev} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">חזרה</button>
                <button type="button" onClick={handleNext} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold">המשך</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-bold text-slate-800 mb-4">הודעה נוספת</h3>
              <textarea 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                placeholder="ספר/י לנו קצת יותר על המצב שלך..."
              ></textarea>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800 flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p>טיפ בטיחות: לאחר השליחה, מומלץ למחוק את היסטוריית הגלישה בדפדפן כדי למנוע עקבות.</p>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={handlePrev} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">חזרה</button>
                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700">שלחי פנייה</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
