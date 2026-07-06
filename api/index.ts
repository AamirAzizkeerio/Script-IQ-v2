import express from "express";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables for local testing of this serverless function if needed
dotenv.config();

const app = express();
app.use(express.json());

let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set GEMINI_API_KEY in your Vercel Project Environment Variables.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build-vercel',
        }
      }
    });
  }
  return genAIClient;
}

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "ScriptIQ Backend (Vercel Serverless)" });
});

// API: Generate complete YouTube Script package
app.post("/api/generate-script", async (req, res) => {
  const { topic, tonality } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const ai = getGenAI();
    const tonePrompt = tonality ? `Tone: ${tonality}.` : "";
    const prompt = `Create a fully structured high-retention YouTube script package on the topic: "${topic}". ${tonePrompt}
Your response must include 3 highly compelling titles, an SEO-friendly search description, 8 keyword tags, and the script itself.
The script must have visual instructions formatted as [VISUAL: ...] and audio prompts as [AUDIO: ...] and divide sections into clear [SECTION: THE HOOK], [SECTION: BODY], and [SECTION: CALL TO ACTION].`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are ScriptIQ, the premier YouTube Script Writing Specialist. Provide a highly engaging, structured, and camera-ready script package in JSON format matching the schema provided.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Three alternative high-CTR titles for this video."
            },
            description: {
              type: Type.STRING,
              description: "An optimized search description featuring hooks and structural details."
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Eight highly searched keywords/tags for video SEO."
            },
            script: {
              type: Type.STRING,
              description: "The complete, polished script featuring Visual and Audio cues, Hooks, Body points, and a strong Call to Action."
            }
          },
          required: ["titles", "description", "keywords", "script"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from Gemini.");
    }

    const scriptPackage = JSON.parse(responseText.trim());
    res.json(scriptPackage);

  } catch (error: any) {
    console.error("Gemini Script Generation Error:", error);
    const isQuotaError = error?.message?.includes("Quota exceeded") || error?.status === 429;
    res.status(isQuotaError ? 429 : 500).json({
      error: isQuotaError 
        ? "Gemini API Quota exceeded. Please try again in a few moments or upgrade your account tier." 
        : (error instanceof Error ? error.message : "Failed to generate script using AI. Please try again.")
    });
  }
});

// API: Generate YouTube Titles based on Tone
app.post("/api/generate-titles", async (req, res) => {
  const { topic, tone } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const ai = getGenAI();
    const toneMap: Record<string, string> = {
      viral: "viral, extremely high CTR, life-changing or industry-shaking hook style",
      clickbait: "suspenseful, curiosity-gap, high click rate style (no spammy or misleading claims)",
      educational: "highly informative, step-by-step masterclass, beginners blueprint style",
      howTo: "how-to tutorial, fast results, practical strategy, budget-friendly style",
      suspense: "uncovering dark sides, mysteries, harsh truths or terrifying secrets style"
    };

    const selectedStyle = toneMap[tone] || "compelling, search-friendly titles";
    const prompt = `Generate exactly 5 distinct, highly catchy YouTube titles on the topic: "${topic}" using the tone style: ${selectedStyle}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are ScriptIQ, a YouTube CTR and SEO guru. Create a JSON response containing an array of 5 compelling, clickable title strings.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of exactly 5 generated YouTube title options."
            }
          },
          required: ["titles"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from Gemini.");
    }

    const titleData = JSON.parse(responseText.trim());
    res.json(titleData.titles || []);

  } catch (error: any) {
    console.error("Gemini Title Generation Error:", error);
    const isQuotaError = error?.message?.includes("Quota exceeded") || error?.status === 429;
    res.status(isQuotaError ? 429 : 500).json({
      error: isQuotaError 
        ? "Gemini API Quota exceeded. Please try again in a few moments or upgrade your account tier." 
        : (error instanceof Error ? error.message : "Failed to generate titles using AI. Please try again.")
    });
  }
});

export default app;
