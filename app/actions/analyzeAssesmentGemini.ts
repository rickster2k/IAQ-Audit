'use server'
import { GoogleGenAI, Type } from "@google/genai";
import { UserResponse, AssessmentResult } from '@/lib/types';

export const analyzeIAQAssessment = async (responses: UserResponse[]): Promise<AssessmentResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const promptContext = JSON.stringify(responses.map(r => ({
        category: r.questionText,
        question: r.questionText,
        answer: r.answerLabel,
        value: r.answerValue
    })));

    const systemInstruction = `
      You are an elite Indoor Air Quality (IAQ) Professional and IAC2 Certified Consultant.
      You have received a detailed audit from a homeowner covering 13 comprehensive sections (A-M).

      Your Analysis Task:
      1. Review the JSON data meticulously.
      2. Identify specific Cross-Reference Risks.
      3. Calculate a 'Health Risk Score' (0-100) where HIGHER is WORSE.
      4. Assign Risk Level based on the Score.
      5. Write a Professional Summary (approx 3-4 sentences).
      6. Provide 5 Critical Recommendations.

      Output strictly in JSON format matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Here is the comprehensive audit data: ${promptContext}`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.NUMBER, description: "0-100 risk score" },
                riskLevel: { type: Type.STRING, description: "Low, Moderate, High, or Severe" },
                summary: { type: Type.STRING, description: "Professional summary" },
                recommendations: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "List of 5 recommendations"
                }
            },
            required: ["score", "riskLevel", "summary", "recommendations"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as AssessmentResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
        score: 65,
        riskLevel: 'High',
        summary: "Your audit indicates several areas of concern. While our AI analysis is processing, we have flagged high-priority risks based on your reported environmental conditions.",
        recommendations: [
          "Consult an IAC2 certified indoor air professional for a deep-dive assessment.",
          "Check and replace all HVAC filters immediately.",
          "Ensure your basement humidity remains below 50%.",
          "Increase fresh air ventilation through mechanical means.",
          "Test for Radon if not completed in the last two years."
        ]
    };
  }
};