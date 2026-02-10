import { GoogleGenAI } from "@google/genai";

export const generateRomanticPoem = async (partnerName: string = "Kochanie"): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key not found, returning fallback poem.");
      return "Róże są czerwone,\nFiołki fioletowe,\nCieszę się, że jesteś,\nBo życie z Tobą jest kolorowe!";
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Napisz krótki, słodki i bardzo romantyczny wiersz (maksymalnie 4 wersy) po polsku dla mojej walentynki. Kontekst: Właśnie zapytałem, czy zostanie moją walentynką, a ona się zgodziła. Użyj imienia "${partnerName}", jeśli pasuje naturalnie, w przeciwnym razie użyj ogólnego zwrotu "Kochanie".`,
    });

    return response.text || "Jesteś słońcem mego dnia,\nKsiężycem w nocy,\nCieszę się, że powiedziałaś tak,\nTo dodaje mi mocy.";
  } catch (error) {
    console.error("Failed to generate poem:", error);
    return "Choć serwery padły,\nMiłość ma nie zginie.\nJesteś moim sercem,\nW każdej godzinie.";
  }
};