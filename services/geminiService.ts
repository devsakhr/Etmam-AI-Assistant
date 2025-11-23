import { GoogleGenAI, Content, Part } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message, Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-2.5-flash as it is fast and efficient for chat interactions
const MODEL_NAME = "gemini-2.5-flash";

export const sendMessageToGemini = async (
  history: Message[],
  currentMessage: string,
  imageBase64?: string | null,
  relevantProducts?: Product[]
): Promise<string> => {
  try {
    // 1. Prepare history for the API
    const formattedHistory: Content[] = history.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    // 2. Prepare the current user message parts
    const parts: Part[] = [];
    
    if (imageBase64) {
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      const mimeType = imageBase64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)?.[0] || 'image/jpeg';

      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      });
    }

    // 3. Inject Product Context if available
    let finalMessage = currentMessage;
    if (relevantProducts && relevantProducts.length > 0) {
      const productsJson = JSON.stringify(relevantProducts, null, 2);
      finalMessage = `${currentMessage}\n\n[System Context: The following products are available in the store and match the user's query. Use this data to provide specific prices and names. Do not invent products not in this list if the user is asking for specific stock:\n${productsJson}\n]`;
    }

    if (finalMessage) {
      parts.push({ text: finalMessage });
    }

    // 4. Make the request
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        ...formattedHistory, 
        { role: 'user', parts: parts }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, 
      },
    });

    return response.text || "عذرًا، حدث خطأ غير متوقع. حاول مرة أخرى.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذرًا، أواجه مشكلة في الاتصال حاليًا. يرجى المحاولة لاحقًا.";
  }
};