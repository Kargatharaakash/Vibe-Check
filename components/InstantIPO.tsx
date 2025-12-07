
import React, { useState } from 'react';
import { generateBrandLogo } from '../services/geminiService';
import { Sparkles, Loader2, DollarSign, Type, ShoppingBag, Palette } from 'lucide-react';

interface Props {
  recommendation: {
    title: string;
    marketingCopy: {
      slogan: string;
      hashtags: string[];
      brandColors?: string[];
    };
    menuItems: { name: string; price: string }[];
  };
}

export const InstantIPO: React.FC<Props> = ({ recommendation }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateLogo = async () => {
    setIsGenerating(true);
    try {
      const prompt = `${recommendation.title} - ${recommendation.marketingCopy.slogan}. Modern, hipster, high-end design.`;
      const url = await generateBrandLogo(prompt);
      setLogoUrl(url);
    } catch (e) {
      console.error("Failed to generate logo");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-24 h-24 text-white" />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="bg-signal-green text-black px-2 py-1 text-[10px] font-bold font-mono">INSTANT_IPO</div>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Generative Brand Engine</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2 leading-tight">{recommendation.title}</h2>
           <p className="font-serif italic text-gray-400 mb-6">"{recommendation.marketingCopy.slogan}"</p>
           
           <div className="space-y-4">
              <div className="bg-black/40 border border-gray-800 p-3">
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-gray-500 uppercase">
                      <ShoppingBag className="w-3 h-3" /> Signature Offerings
                  </div>
                  <ul className="space-y-1">
                      {recommendation.menuItems?.map((item, i) => (
                          <li key={i} className="flex justify-between text-xs text-gray-300">
                              <span>{item.name}</span>
                              <span className="font-mono text-signal-green">{item.price}</span>
                          </li>
                      ))}
                  </ul>
              </div>

              {recommendation.marketingCopy.brandColors && (
                  <div className="flex items-center gap-2">
                      <Palette className="w-3 h-3 text-gray-600" />
                      <div className="flex gap-1">
                          {recommendation.marketingCopy.brandColors.map((c, i) => (
                              <div key={i} className="w-4 h-4 rounded-full border border-gray-700" style={{ backgroundColor: c }} />
                          ))}
                      </div>
                  </div>
              )}
           </div>
        </div>

        <div className="flex flex-col items-center justify-center border border-dashed border-gray-700 bg-black/20 min-h-[200px] relative">
            {logoUrl ? (
                <img src={logoUrl} alt="Generated Logo" className="w-full h-full object-contain p-4 animate-in zoom-in duration-500" />
            ) : (
                <div className="text-center p-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Type className="w-6 h-6 text-gray-500" />
                    </div>
                    <button 
                        onClick={handleGenerateLogo}
                        disabled={isGenerating}
                        className="bg-white text-black px-4 py-2 text-xs font-bold font-mono hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                        GENERATE ASSETS
                    </button>
                    <p className="text-[9px] text-gray-600 mt-2 font-mono">USES GEMINI 2.5 FLASH IMAGE</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
