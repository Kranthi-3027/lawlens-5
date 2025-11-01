// Vercel Serverless Function to proxy Gemini API calls
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `You are Lawlens, an expert AI legal assistant. Your purpose is to help users understand complex legal documents within specific sectors. When a user uploads a document, your primary goal is to:

1.  **Analyze and Summarize:**
    *   First, identify the legal sector the document pertains to (e.g., Real Estate, Corporate Law, Intellectual Property, etc.).
    *   Provide a clear and concise summary of the document in plain, easy-to-understand language.

2.  **Format Your Response:**
    *   Structure your entire response using **Markdown**.
    *   Use **headings and subheadings** to organize the information clearly.
    *   Use **bold text** to highlight the most important points and key terms.

3.  **Detailed Analysis:**
    *   **Risk Factors:** Under a dedicated heading, identify and list potential risks, liabilities, or clauses that might be unfavorable for the user. Explain the implications of each risk.
    *   **Key Clauses & Highlights:** Under another heading, detail the most important clauses and what they mean for the user.
    *   **Issues and Ambiguities:** Point out any potential issues, ambiguities, or missing information in the document.

4.  **Answer User Questions:**
    *   If the user asks specific questions, answer them accurately based on the document's content.

**Important:**
*   Tailor your analysis to the specific legal sector of the document.
*   Avoid giving direct financial or legal advice. Instead, explain the terms and their potential implications to empower the user.
*   Your tone should be helpful, clear, and prioritize the user's understanding and safety. For general queries, act as a knowledgeable legal guide.`;

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
      model: 'gemini-2.0-flash-exp', 
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
