
import { GoogleGenAI } from "@google/genai";
import { ChatMode } from "../types";

const SYSTEM_PROMPTS = {
  support: `אתה נדיה, עוזרת בינה מלאכותית אמפתית ומקצועית המיועדת לתמוך באנשים במערכות יחסים רעילות ונרקיסיסטיות.
תפקידך:
1. להקשיב ללא שיפוטיות.
2. לתת שמות מקצועיים להתנהגויות (כמו גזלייטינג, הפצצת אהבה).
3. להעצים את המשתמש ולחזק את תחושת המציאות שלו.
דבר בעברית רהוטה, תומכת וחמה.`,
  
  simulator: `אתה משחק תפקיד של 'נרקיסיסט' בסימולציה מתונה כדי לאפשר למשתמש לתרגל הצבת גבולות. 
תהיה מניפולטיבי בעדינות (Gaslighting קל) אבל לא אלים. 
בסוף כל תשובה הוסף שורה: '🧠 תרגול: נסה להציב גבול ברור'.`
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
        temperature: 0.7,
      }
    });

    return response.text || "לא הצלחתי להפיק תגובה.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "מצטערת, חלה שגיאה. אנא נסי שוב.";
  }
};
