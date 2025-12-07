export enum AnalysisStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface BoundingBox {
  label: string;
  category: 'person' | 'architecture' | 'object' | 'nature' | 'transport' | 'other';
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface EthnographyReport {
  locationVibe: string;
  observedDemographics: {
    label: string;
    percentage: number;
    description: string;
  }[];
  visualCues: string[];
  detectedObjects: BoundingBox[];
  businessRecommendation: {
    title: string;
    description: string;
    reasoning: string;
    riskFactors: string[];
    marketingCopy: {
      slogan: string;
      hashtags: string[];
    };
  };
  radarMetrics: {
    innovation: number;
    walkability: number;
    safety: number;
    community: number;
    affluence: number;
  };
  viabilityScore: number; // 0-100
  gentrificationIndex: number; // 0-100
  socialScore: number; // 0-100 (Instagrammability)
  colorPalette: string[]; // Hex codes
  soundscape: string[];
  scentProfile: string[]; // New: Olfactory
  temporalProjection: {
    past: string;
    future: string;
  };
  targetPersona: {
    archetype: string;
    quote: string;
    accessories: string[];
  };
  antiPersona: string; // New: Who doesn't belong
  
  // Environment
  architecturalStyle: string;
  atmosphere: string;
  commercialDensity: string;
  constructionStatus: string; // New: Stable, Developing, decaying
  
  // Culture & Logistics
  subcultures: string[]; // New: Specific tribes
  localCurrency: string; // New: What is valued (Time, Space, etc)
  peakTime: string; // New: Best time of day
  transitAccess: string[]; // New: Mobility modes
  brandAffinity: string[]; // New: Brands that fit
  psychogeography: string[]; // New: Emotional keywords
}

export interface FileData {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: string;
}