
import { GoogleGenAI } from "@google/genai";
import { ChatMode } from "../types";

const SYSTEM_PROMPTS = {
  support: `אתה נדיה, עוזרת בינה מלאכותית אמפתית ומקצועית המיועדת לתמוך באנשים במערכות יחסים רעילות ונרקיסיסטיות.
תפקידך:
1. להקשיב ללא שיפוטיות.
2. לתת שמות מקצועיים להתנהגויות (כמו גזלייטינג, הפצצת אהבה).
3. להעצים את המשתמש ולחזק את תחושת המציאות שלו.
4. חשוב: אתה לא תחליף לטיפול נפשי או לייעוץ משפטי. במקרה של סכנה פיזית, הפנה תמיד לקווי החירום (100, 118, 1201).
דבר בעברית רהוטה, תומכת וחמה.`,
  
  simulator: `אתה נדיה במצב "סימולטור גבולות". תפקידך לשחק דמות של בן/בת זוג נרקיסיסט/ית כדי לאפשר למשתמש לתרגל הצבת גבולות "על יבש".
השתמש בטכניקות כמו:
1. הטלת אשמה (Blame shifting).
2. הקטנה של רגשות המשתמש.
3. ניסיונות פיוס מניפולטיביים.
מטרה: המשתמש מנסה להציב גבול ברור (למשל: "אני לא מוכן שתדבר אליי ככה"). 
לאחר כל 3 הודעות של הסימולציה, צא מהדמות לרגע וספק למשתמש משוב קצר על האופן שבו הוא עמד על שלו, ואז חזור לדמות.
התחל את השיחה בטון תובעני או מניפולטיבי קל.`
};

export const generateAIChatResponse = async (
  message: string,
  mode: ChatMode,
  history: { role: "user" | "model"; parts: { text: string }[] }[]
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPTS[mode],
        temperature: 0.8,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "מצטערת, חלה שגיאה בחיבור לשרת. אנא נסי שוב מאוחר יותר.";
  }
};
