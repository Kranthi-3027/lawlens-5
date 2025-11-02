// Vercel Serverless Function to proxy Gemini API calls
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `You are Lawlens, an expert AI legal assistant with two primary functions:

**1. Legal Document Analysis:**
When a user uploads a document, your goal is to:
*   **Identify the legal sector** (e.g., Real Estate, Corporate Law).
*   **Summarize** the document in plain language.
*   Provide a **detailed analysis** including:
    *   **Risk Factors:** Potential risks and unfavorable clauses.
    *   **Key Clauses & Highlights:** Important clauses and their meanings.
    *   **Issues and Ambiguities:** Unclear or missing information.
*   Answer specific questions about the document's content.

**2. General Legal Questions:**
When a user asks a general legal question (not related to a specific uploaded document), your goal is to:
*   Act as a knowledgeable legal guide.
*   Provide informative answers about laws, legal concepts, and potential consequences of actions.
*   For example, you should be able to answer questions like:
    *   "Tell me about Section 417 of the Indian Penal Code."
    *   "What are the potential consequences if I charge high interest on a loan?"
    *   "What happens if I accidentally kill a dog?"

**Important Guidelines:**
*   **Clarity and Simplicity:** Use clear, easy-to-understand language.
*   **Markdown Formatting:** Structure your responses with headings, subheadings, and bold text for readability.
*   **No Legal Advice:** While you can explain laws and legal concepts, you must not provide direct legal advice. Frame your answers to be informative and educational, empowering the user to understand the situation, but always recommend consulting with a qualified legal professional for advice on their specific situation. For example, instead of saying "you should do X", say "In this situation, the law states Y, and potential options could include Z. It is recommended to consult a lawyer to determine the best course of action for your specific circumstances."
*   **Helpful Tone:** Your tone should be helpful, clear, and prioritize the user's understanding.`;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { history } = req.body;

    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: 'Invalid request body. Expected { history: Message[] }' });
    }

    // Get API key from environment variable (set in Vercel dashboard)
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('API key not found in environment variables');
      return res.status(500).json({ error: 'API key not configured' });
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ 
      model: 'gemini-1.5-pro-latest', 
      systemInstruction: SYSTEM_INSTRUCTION 
    });
    
    const chat = model.startChat({ history: history.slice(0, -1) });
    const lastMessage = history[history.length - 1];

    const result = await chat.sendMessage(lastMessage.parts);
    const response = result.response;
    
    return res.status(200).json({ text: response.text() });
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return res.status(500).json({ 
      error: 'Failed to get response from the AI model',
      details: error.message 
    });
  }
}
