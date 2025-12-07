
import React, { useState } from 'react';
import { Sparkles, Eye } from 'lucide-react';

interface Props {
  card: {
    cardName: string;
    meaning: string;
    visualSymbol: string;
  };
}

export const VibeTarot: React.FC<Props> = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="bg-anthro-gray/10 border border-gray-800 p-4 relative group perspective-1000">
        <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-4 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-purple-400" /> VIBE TAROT
        </h4>

        <div 
            className="relative h-64 w-full cursor-pointer transition-transform duration-700 transform-style-3d"
            style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            onClick={() => setFlipped(!flipped)}
        >
            {/* FRONT (Card Back) */}
            <div className="absolute inset-0 bg-black border border-gray-700 backface-hidden flex flex-col items-center justify-center p-4">
                <div className="w-full h-full border-2 border-dashed border-gray-800 flex items-center justify-center opacity-50 relative overflow-hidden">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                     <Eye className="w-12 h-12 text-gray-600 animate-pulse" />
                </div>
                <div className="mt-4 text-[10px] font-mono text-gray-500 tracking-widest">TAP TO REVEAL SOUL</div>
            </div>

            {/* BACK (Result) */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 backface-hidden flex flex-col items-center justify-center p-6 text-center"
                style={{ transform: 'rotateY(180deg)' }}
            >
                <div className="text-4xl mb-2">{card.visualSymbol}</div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">{card.cardName}</h3>
                <div className="w-8 h-[1px] bg-purple-500 mb-3"></div>
                <p className="text-xs text-gray-300 font-serif italic leading-relaxed">"{card.meaning}"</p>
            </div>
        </div>
        
        <style>{`
            .perspective-1000 { perspective: 1000px; }
            .transform-style-3d { transform-style: preserve-3d; }
            .backface-hidden { backface-visibility: hidden; }
        `}</style>
    </div>
  );
};
