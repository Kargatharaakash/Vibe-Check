
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
      brandColors: string[];
    };
    menuItems: { name: string; price: string }[];
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
  scentProfile: string[]; 
  temporalProjection: {
    past: string;
    future: string;
  };
  targetPersona: {
    archetype: string;
    quote: string;
    accessories: string[];
  };
  antiPersona: string;
  
  // Environment
  architecturalStyle: string;
  atmosphere: string;
  commercialDensity: string;
  constructionStatus: string;
  
  // Culture & Logistics
  subcultures: string[];
  localCurrency: string;
  peakTime: string;
  transitAccess: string[];
  brandAffinity: string[];
  psychogeography: string[];

  // CRAZY NEW FEATURES
  latteIndex: {
    price: string; // e.g. "$6.50"
    insight: string; // "Oat milk surcharge detected"
  };
  panopticonScore: {
    score: number; // 0-100
    details: string; // "High CCTV density"
  };
  datingProfiles: {
    name: string;
    age: number;
    bio: string;
    app: string; // "Hinge", "Raya"
    lookingFor: string;
  }[];
  goldenHour: {
    time: string;
    quality: string;
  };
  
  vibeMatches: {
    location: string;
    city: string;
    matchScore: number;
    reason: string;
  }[];
  
  rentalOpportunity: {
    estimatedRentPerSqFt: string;
    vacancyRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
    permitDifficulty: 'EASY' | 'MODERATE' | 'NIGHTMARE';
    bestLeaseTerm: string;
  };

  playlist: {
    song: string;
    artist: string;
    vibe: string;
  }[];

  investorPitch: {
    subjectLine: string;
    emailBody: string;
  };

  coordinates: {
    lat: number;
    lng: number;
    locationName: string;
  };
}

export interface FileData {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  report: EthnographyReport;
  thumbnail: string; // Base64 or Blob URL (if persisted safely)
}
