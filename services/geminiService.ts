
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
        Mention that for official bookings, they should use the booking form.
        Bus services available: Sakeer Express, RS Express, Myown Express, Al Ahla, Star Travels.
        Prices range from 1600 LKR to 2900 LKR.`,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to my travel database. Please try again later.";
  }
}
