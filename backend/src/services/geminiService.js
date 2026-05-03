const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');

dotenv.config();

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generateResponse = async (userMessage) => {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return "I'm VoteSathi! My AI brain (Gemini) is not connected yet. Please add the API key to the backend .env file.";
    }

    const systemPrompt = `
      You are VoteSathi, a friendly and simple AI assistant for Indian voters.
      Your goal is to help citizens understand how to vote, how to register, what documents are needed, and general election facts.
      Keep your answers short, simple, and very easy to understand (max 2-3 sentences).
      If the user speaks Hindi (written in English script or Devanagari), reply in the same language.
      Do not answer questions completely unrelated to voting, elections, or Indian democracy.
    `;

    const prompt = `${systemPrompt}\n\nUser: ${userMessage}\nVoteSathi:`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error('Error with Gemini AI:', error);
    return "I'm having a little trouble thinking right now. Please try again later!";
  }
};
