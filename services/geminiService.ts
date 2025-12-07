
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { EthnographyReport } from "../types";

export const processFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
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
    language: { type: Type.STRING },
    locationVibe: { type: Type.STRING },
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
    visualCues: { type: Type.ARRAY, items: { type: Type.STRING } },
    detectedObjects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          category: { type: Type.STRING, enum: ['person', 'architecture', 'object', 'nature', 'transport', 'other'] },
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
        riskFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
        marketingCopy: {
           type: Type.OBJECT,
           properties: {
              slogan: { type: Type.STRING },
              hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
              brandColors: { type: Type.ARRAY, items: { type: Type.STRING } }
           }
        },
        menuItems: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    price: { type: Type.STRING }
                }
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
    scentProfile: { type: Type.ARRAY, items: { type: Type.STRING } },
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
    antiPersona: { type: Type.STRING },
    architecturalStyle: { type: Type.STRING },
    atmosphere: { type: Type.STRING },
    commercialDensity: { type: Type.STRING },
    constructionStatus: { type: Type.STRING },
    subcultures: { type: Type.ARRAY, items: { type: Type.STRING } },
    localCurrency: { type: Type.STRING },
    peakTime: { type: Type.STRING },
    transitAccess: { type: Type.ARRAY, items: { type: Type.STRING } },
    brandAffinity: { type: Type.ARRAY, items: { type: Type.STRING } },
    psychogeography: { type: Type.ARRAY, items: { type: Type.STRING } },
    
    // EXISTING CRAZY FIELDS
    latteIndex: {
        type: Type.OBJECT,
        properties: {
            price: { type: Type.STRING },
            insight: { type: Type.STRING }
        }
    },
    panopticonScore: {
        type: Type.OBJECT,
        properties: {
            score: { type: Type.NUMBER },
            details: { type: Type.STRING }
        }
    },
    datingProfiles: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                age: { type: Type.NUMBER },
                bio: { type: Type.STRING },
                app: { type: Type.STRING },
                lookingFor: { type: Type.STRING }
            }
        }
    },
    goldenHour: {
        type: Type.OBJECT,
        properties: {
            time: { type: Type.STRING },
            quality: { type: Type.STRING }
        }
    },

    vibeMatches: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                location: { type: Type.STRING },
                city: { type: Type.STRING },
                matchScore: { type: Type.NUMBER },
                reason: { type: Type.STRING }
            }
        }
    },
    rentalOpportunity: {
        type: Type.OBJECT,
        properties: {
            estimatedRentPerSqFt: { type: Type.STRING },
            vacancyRisk: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'EXTREME'] },
            permitDifficulty: { type: Type.STRING, enum: ['EASY', 'MODERATE', 'NIGHTMARE'] },
            bestLeaseTerm: { type: Type.STRING }
        }
    },
    playlist: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                song: { type: Type.STRING },
                artist: { type: Type.STRING },
                vibe: { type: Type.STRING }
            }
        }
    },
    investorPitch: {
        type: Type.OBJECT,
        properties: {
            subjectLine: { type: Type.STRING },
            emailBody: { type: Type.STRING }
        }
    },
    coordinates: {
        type: Type.OBJECT,
        properties: {
            lat: { type: Type.NUMBER },
            lng: { type: Type.NUMBER },
            locationName: { type: Type.STRING }
        }
    },

    // --- NEW ULTIMATE FIELDS ---
    dogIndex: {
        type: Type.OBJECT,
        properties: {
            score: { type: Type.NUMBER },
            dominantBreed: { type: Type.STRING },
            insight: { type: Type.STRING }
        }
    },
    digitalNomadScore: {
        type: Type.OBJECT,
        properties: {
            score: { type: Type.NUMBER },
            wifiReliability: { type: Type.STRING },
            laptopDensity: { type: Type.STRING }
        }
    },
    liminalSpaceScore: {
        type: Type.OBJECT,
        properties: {
            score: { type: Type.NUMBER },
            description: { type: Type.STRING }
        }
    },
    vibeTarot: {
        type: Type.OBJECT,
        properties: {
            cardName: { type: Type.STRING },
            meaning: { type: Type.STRING },
            visualSymbol: { type: Type.STRING }
        }
    },
    eventHorizon: {
        type: Type.OBJECT,
        properties: {
            likelyEvents: { type: Type.ARRAY, items: { type: Type.STRING } },
            vibe: { type: Type.STRING }
        }
    },
    competitorRadar: {
        type: Type.OBJECT,
        properties: {
            indiePercentage: { type: Type.NUMBER },
            chainPercentage: { type: Type.NUMBER },
            dominantChain: { type: Type.STRING }
        }
    },
    influencerTrap: {
        type: Type.OBJECT,
        properties: {
            score: { type: Type.NUMBER },
            photoSpots: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
    },
    caffeineSaturation: {
        type: Type.OBJECT,
        properties: {
            shopsPerBlock: { type: Type.NUMBER },
            dominantBrewMethod: { type: Type.STRING }
        }
    },
    localUniform: {
        type: Type.OBJECT,
        properties: {
            top: { type: Type.STRING },
            bottom: { type: Type.STRING },
            shoes: { type: Type.STRING }
        }
    }
  },
  required: [
    "language", "locationVibe", "observedDemographics", "businessRecommendation", 
    "viabilityScore", "gentrificationIndex", "detectedObjects", "soundscape",
    "temporalProjection", "targetPersona", "antiPersona", "socialScore", "radarMetrics", "colorPalette",
    "architecturalStyle", "atmosphere", "commercialDensity", "constructionStatus",
    "subcultures", "localCurrency", "peakTime", "transitAccess", "brandAffinity", "psychogeography",
    "latteIndex", "panopticonScore", "datingProfiles", "goldenHour",
    "vibeMatches", "rentalOpportunity", "playlist", "investorPitch", "coordinates",
    "dogIndex", "digitalNomadScore", "liminalSpaceScore", "vibeTarot", "eventHorizon",
    "competitorRadar", "influencerTrap", "caffeineSaturation", "localUniform"
  ]
};

export const analyzeVibe = async (file: File, language: string): Promise<EthnographyReport> => {
  const base64Data = await processFileToBase64(file);
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const promptText = `
    Act as a world-renowned Urban Anthropologist & Cultural Strategist.
    Analyze this footage.
    
    CRITICAL INSTRUCTION:
    You must output ALL string values in the following language: "${language}".
    Keep the JSON keys in English, but the content must be in ${language}.

    PERFORM THESE 20 DEEP ANALYSES:
    1. "LATTE INDEX": Estimate coffee price.
    2. "PANOPTICON": Surveillance level.
    3. "TINDER ARCHETYPES": Dating profiles.
    4. "GOLDEN HOUR": Lighting quality.
    5. "INSTANT IPO": Business idea.
    6. "DOG INDEX": Analyze pet breeds as economic indicators.
    7. "NOMAD SCORE": Laptop/WiFi density.
    8. "LIMINAL METER": Is it soulless/eerie?
    9. "VIBE TAROT": Assign a mystical tarot card to this place.
    10. "EVENT HORIZON": What pop-ups happen here?
    11. "COMPETITOR RADAR": Indie vs Chain ratio.
    12. "INFLUENCER TRAP": TikTok/Instagram potential.
    13. "CAFFEINE SATURATION": Density of coffee.
    14. "LOCAL UNIFORM": What are they wearing exactly?
    15. "GEOLOCATION": Coordinates.
    
    Be witty, specific, and culturally sharp.
  `;

  // PRIMARY ATTEMPT: GEMINI 3 PRO (The Brain)
  try {
    console.log(`Initiating Scan with Gemini 3 Pro in ${language}...`);
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: file.type } },
          { text: promptText },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
        thinkingConfig: { thinkingBudget: 1024 }
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini 3 Pro");
    return JSON.parse(text) as EthnographyReport;

  } catch (error: any) {
    console.warn("⚠️ Gemini 3 Pro Quota Hit. Engaging Backup Protocols (Gemini 2.5 Flash)...");
    
    // BACKUP ATTEMPT: GEMINI 2.5 FLASH (The Workhorse)
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                { inlineData: { data: base64Data, mimeType: file.type } },
                { text: promptText },
                ],
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: reportSchema,
            },
        });

        const text = response.text;
        if (!text) throw new Error("No response from Gemini 2.5 Flash");
        return JSON.parse(text) as EthnographyReport;

    } catch (backupError) {
        console.error("CRITICAL FAILURE: Backup model also failed.", backupError);
        throw error;
    }
  }
};

export const generateBrandLogo = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using Flash Image for fast generation
      contents: {
        parts: [{ text: `Design a minimal, cool, vector-style logo for: ${prompt}. White background.` }],
      },
    });
    
    if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
    }
    return '';
  } catch (e) {
    console.error("Logo Generation Failed", e);
    return ''; 
  }
};
