
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTravelAdvice(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are Lagan Bus Travel Assistant. 
        You help users with routes in Sri Lanka, especially Nintavur and Kandy. 
        Keep responses concise, friendly, and helpful. 
        Mention that for official bookings, they should use the booking form on the main page.
        
        Bus services and prices:
        - Sakeer Express: LKR 2,700
        - RS Express: LKR 2,900
        - Myown Express: LKR 2,700
        - Al Ahla: LKR 2,800
        - Al Rashith: LKR 2,700
        - Star Travels: LKR 1,600 (Cheapest / Economy option)
        - Lloyds Travels: LKR 2,700
        - Super Line: LKR 2,700

        Routes: Primary routes connect Nintavur to Kandy, Badulla, Nuwara Eliya, etc.
        Support Hours: 7:00 AM - 10:00 PM
        Support Contact: Mr. Fawas (+94701362527)`,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to my travel database. Please try again later.";
  }
}
