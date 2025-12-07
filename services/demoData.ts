import { EthnographyReport, BoundingBox } from '../types';

export const DEMO_IMAGE_URL = "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=2531&auto=format&fit=crop";

export const DEMO_REPORT: EthnographyReport = {
  language: "English",
  locationVibe: "Post-Industrial Creative Hub",
  observedDemographics: [
    { label: "Creative Professionals", percentage: 45, description: "Late 20s, Macbook Airs, thrifted coats." },
    { label: "Tourists", percentage: 30, description: "Taking photos of street art, slow walking speed." },
    { label: "Long-time Residents", percentage: 25, description: "Navigating quickly, ignoring the spectacle." }
  ],
  visualCues: ["Exposed brick", "Specialty coffee cups", "Street art murals", "Vintage bicycles"],
  detectedObjects: [
    { label: "Artisan Coffee", category: 'object', ymin: 400, xmin: 300, ymax: 600, xmax: 500 },
    { label: "Vintage Cyclist", category: 'person', ymin: 500, xmin: 100, ymax: 900, xmax: 300 },
    { label: "Mural Art", category: 'architecture', ymin: 100, xmin: 600, ymax: 400, xmax: 900 },
    { label: "Cobblestone", category: 'architecture', ymin: 800, xmin: 400, ymax: 1000, xmax: 1000 }
  ] as BoundingBox[],
  businessRecommendation: {
    title: "Analog Listening Bar & Natural Wine Cellar",
    description: "The visual data suggests high cultural capital but high stress. A 'Slow Audio' venue allows the creative class to perform leisure. The acoustics of the brickwork support high-fidelity sound.",
    reasoning: "High saturation of caffeine options detected. Gap identified in 'Third Space' for evening decompression that isn't a loud pub.",
    riskFactors: ["High commercial rent", "Noise complaints from gentrifying lofts"],
    marketingCopy: {
      slogan: "High Fidelity. Low Intervention.",
      hashtags: ["slowlife", "vinylcommunity", "naturalwine", "audiophile"],
      brandColors: ["#8B4513", "#F5F5DC", "#2F4F4F"]
    },
    menuItems: [
        { name: "Orange Wine (Georgia)", price: "$14" },
        { name: "Sourdough & Cultured Butter", price: "$8" },
        { name: "Japanese Whisky Highball", price: "$16" }
    ]
  },
  radarMetrics: {
    innovation: 85,
    walkability: 92,
    safety: 78,
    community: 65,
    affluence: 80
  },
  viabilityScore: 94,
  gentrificationIndex: 88,
  socialScore: 95,
  colorPalette: ["#A63C06", "#D9BCA3", "#2A2A2A", "#5D737E", "#E8C547"],
  soundscape: ["Distant espresso machine", "Indie rock from open windows", "Bicycle bells"],
  scentProfile: ["Roasted beans", "Ozone", "Old masonry", "Expensive perfume"],
  temporalProjection: {
    past: "Garment district sweatshops and warehouses.",
    future: "Hyper-curated retail experiences and membership clubs."
  },
  targetPersona: {
    archetype: "The Digital Nomad Director",
    quote: "I can work from anywhere, but I choose to pay $8 for coffee here.",
    accessories: ["Leica Camera", "Aesop Hand Cream", "Tote Bag from Berlin"]
  },
  antiPersona: "The Strip Mall Shopper",
  architecturalStyle: "Adaptive Reuse Industrial",
  atmosphere: "Curated Grittiness",
  commercialDensity: "High Saturation",
  constructionStatus: "Renovation Heavy",
  subcultures: ["Hypebeasts", "Designers", "Neo-Bohemians"],
  localCurrency: "Aesthetics & Authenticity",
  peakTime: "4:00 PM (Golden Hour)",
  transitAccess: ["Bicycle", "Rideshare", "Metro"],
  brandAffinity: ["Acne Studios", "Oatly", "Le Labo", "Sonos"],
  psychogeography: ["Aspiring", "Restless", "Performative"],
  
  // New Fields
  latteIndex: {
      price: "$6.50",
      insight: "Oat milk surcharge is standard. Single origin markup applied."
  },
  panopticonScore: {
      score: 65,
      details: "Moderate CCTV in retail, high social surveillance via smartphone cameras."
  },
  datingProfiles: [
      { name: "Jasper", age: 29, bio: "Creative Director. Looking for someone to go to gallery openings with. Must love natural wine.", app: "Raya", lookingFor: "Muse" },
      { name: "Elara", age: 27, bio: "UX Designer. I have a ceramics studio. Let's debate brutalism.", app: "Hinge", lookingFor: "Partner in Crime" },
      { name: "Felix", age: 31, bio: "Tech founder (stealth). Into bouldering and obscure vinyl.", app: "Feeld", lookingFor: "Third" }
  ],
  goldenHour: {
      time: "16:45",
      quality: "Warm, diffused light bouncing off brick facades. Perfect for portraits."
  },

  vibeMatches: [
    { location: "Williamsburg", city: "New York", matchScore: 96, reason: "Identical post-industrial gentrification arc." },
    { location: "Södermalm", city: "Stockholm", matchScore: 88, reason: "Similar creative density and fashion codes." },
    { location: "Silver Lake", city: "Los Angeles", matchScore: 82, reason: "Shared value system of artisanal consumption." }
  ],
  rentalOpportunity: {
    estimatedRentPerSqFt: "$85 - $120",
    vacancyRisk: 'LOW',
    permitDifficulty: 'MODERATE',
    bestLeaseTerm: "10 Year Commercial"
  },
  playlist: [
    { song: "Time to Pretend", artist: "MGMT", vibe: "Ironic Nostalgia" },
    { song: "Coffee", artist: "Sylvan Esso", vibe: "Morning Commute" },
    { song: "Archie, Marry Me", artist: "Alvvays", vibe: "Indie Optimism" }
  ],
  investorPitch: {
    subjectLine: "Opportunity: High-Yield 'Third Space' in Prime Creative District",
    emailBody: "I've identified a prime location with 94/100 viability score. The area is saturated with high-income creatives but lacks evening 'decompression' venues. I'm proposing a high-margin Natural Wine & Listening Bar to capture this overflow. Projected 18-month ROI based on current foot traffic analysis."
  },
  coordinates: {
    lat: 51.5245,
    lng: -0.0780,
    locationName: "Shoreditch, London"
  },

  // --- NEW ULTIMATE FIELDS ---
  dogIndex: {
      score: 85,
      dominantBreed: "French Bulldog",
      insight: "High frequency of purebreds suggests disposable income allocated to pet accessories."
  },
  digitalNomadScore: {
      score: 92,
      wifiReliability: "Fiber-optic everywhere",
      laptopDensity: "Extremely High (MacBook Pro M3 dominant)"
  },
  liminalSpaceScore: {
      score: 20,
      description: "Too crowded and curated to feel liminal, except at 4am on a Tuesday."
  },
  vibeTarot: {
      cardName: "The Hermit (Reversed)",
      meaning: "Hyper-connectivity masking deep loneliness. A need to disconnect.",
      visualSymbol: "📱"
  },
  eventHorizon: {
      likelyEvents: ["Vintage Kilo Sale", "Natural Wine Tasting", "Zine Fair"],
      vibe: "Performative Community"
  },
  competitorRadar: {
      indiePercentage: 75,
      chainPercentage: 25,
      dominantChain: "Pret A Manger (Hidden in plain sight)"
  },
  influencerTrap: {
      score: 88,
      photoSpots: ["Graffiti Wall on Brick Lane", "Flower Market Arch", "Neon Sign at Bagel Shop"]
  },
  caffeineSaturation: {
      shopsPerBlock: 4,
      dominantBrewMethod: "V60 Pour Over"
  },
  localUniform: {
      top: "Oversized Carhartt Jacket",
      bottom: "Wide-leg pleated trousers",
      shoes: "Salomon XT-6"
  }
};
