import { GoogleGenAI, Type, Schema } from "@google/genai";
import { EthnographyReport } from "../types";

const processFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove Data-URI prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const reportSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    locationVibe: {
      type: Type.STRING,
      description: "A 3-4 word evocative description of the street's energy."
    },
    observedDemographics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          percentage: { type: Type.NUMBER },
          description: { type: Type.STRING }
        }
      }
    },
    visualCues: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of visual items seen."
    },
    detectedObjects: {
      type: Type.ARRAY,
      description: "Bounding boxes for specific visual evidence. Categorize them accurately.",
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          category: { 
             type: Type.STRING, 
             enum: ['person', 'architecture', 'object', 'nature', 'transport', 'other'],
             description: "The category of the object."
          },
          ymin: { type: Type.NUMBER },
          xmin: { type: Type.NUMBER },
          ymax: { type: Type.NUMBER },
          xmax: { type: Type.NUMBER }
        }
      }
    },
    businessRecommendation: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        reasoning: { type: Type.STRING },
        riskFactors: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        marketingCopy: {
           type: Type.OBJECT,
           properties: {
              slogan: { type: Type.STRING },
              hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
           }
        }
      }
    },
    radarMetrics: {
        type: Type.OBJECT,
        properties: {
            innovation: { type: Type.NUMBER },
            walkability: { type: Type.NUMBER },
            safety: { type: Type.NUMBER },
            community: { type: Type.NUMBER },
            affluence: { type: Type.NUMBER }
        }
    },
    viabilityScore: { type: Type.NUMBER },
    gentrificationIndex: { type: Type.NUMBER },
    socialScore: { type: Type.NUMBER },
    colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
    soundscape: { type: Type.ARRAY, items: { type: Type.STRING } },
    scentProfile: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Inferred smells (e.g. 'Stale beer', 'Fresh pine')." },
    temporalProjection: {
      type: Type.OBJECT,
      properties: {
        past: { type: Type.STRING },
        future: { type: Type.STRING }
      }
    },
    targetPersona: {
      type: Type.OBJECT,
      properties: {
        archetype: { type: Type.STRING },
        quote: { type: Type.STRING },
        accessories: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    antiPersona: { type: Type.STRING, description: "The type of person who would feel out of place here." },
    architecturalStyle: { type: Type.STRING },
    atmosphere: { type: Type.STRING },
    commercialDensity: { type: Type.STRING },
    constructionStatus: { type: Type.STRING, description: "e.g. 'Active Construction', 'Established', 'Decaying'." },
    subcultures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific social tribes (e.g. 'Skaters', 'Suits')." },
    localCurrency: { type: Type.STRING, description: "What is socially valued here? (e.g. 'Time', 'Authenticity', 'Money')." },
    peakTime: { type: Type.STRING, description: "Best time of day for the vibe (e.g. 'Late Night', 'Early Morning')." },
    transitAccess: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Detected/Inferred transport modes." },
    brandAffinity: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Real brands that match this aesthetic (e.g. 'Carhartt', 'Tesla')." },
    psychogeography: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Emotional keywords (e.g. 'Anxious', 'Serene', 'Chaotic')." }
  },
  required: [
    "locationVibe", "observedDemographics", "visualCues", "businessRecommendation", 
    "viabilityScore", "gentrificationIndex", "detectedObjects", "soundscape", "scentProfile",
    "temporalProjection", "targetPersona", "antiPersona", "socialScore", "radarMetrics", "colorPalette",
    "architecturalStyle", "atmosphere", "commercialDensity", "constructionStatus",
    "subcultures", "localCurrency", "peakTime", "transitAccess", "brandAffinity", "psychogeography"
  ]
};

export const analyzeVibe = async (file: File): Promise<EthnographyReport> => {
  const base64Data = await processFileToBase64(file);
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelId = "gemini-2.5-flash"; 

  const prompt = `
    Act as a world-renowned Urban Anthropologist and Business Strategist.
    
    Perform a deep "Visual Ethnography" on this media.
    1. Observe "micro-cues": fashion, walking speed, architectural state, and clutter.
    2. Infer "invisible" data: disposable income, cultural capital, and the "missing" demographic.
    3. Synthesize a "Vibe Code".
    4. Propose the ONE business that fills a desperate gap. Provide marketing angles (slogans/hashtags).
    5. IDENTIFY VISUAL EVIDENCE: Return bounding boxes for 3-5 key objects or areas. CATEGORIZE THEM (person, architecture, object, nature).
    6. HALLUCINATE SENSORY DATA: Sounds AND Scents.
    7. TIME TRAVEL: Predict past and future.
    8. PERSONA ANALYSIS: Who belongs here? Who DOESN'T belong (Anti-Persona)?
    9. CALCULATE INDICES: Innovation, Walkability, Safety, Community, Affluence.
    10. BRAND AFFINITY: What existing brands fit this vibe?
    11. PSYCHOGEOGRAPHY: What are the emotions of this place?
    
    Be critical. Be specific. Use "The Eyes of the Street".
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: file.type,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
        temperature: 0.4,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as EthnographyReport;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};