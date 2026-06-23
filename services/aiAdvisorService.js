const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const askAdvisor = async ({
  profile,
  goals,
  analysis,
  recommendations,
  question,
}) => {
  const prompt = `
You are an AI Financial Advisor.

Profile:
${JSON.stringify(profile, null, 2)}

Goals:
${JSON.stringify(goals, null, 2)}

Investment Analysis:
${JSON.stringify(analysis, null, 2)}

Recommendations:
${JSON.stringify(recommendations, null, 2)}

Question:
${question}

Rules:
- Give practical financial planning advice.
- Do not recommend individual stocks.
- Do not guarantee returns.
- Keep answers concise and actionable.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return response.text;
};

module.exports = {
  askAdvisor,
};