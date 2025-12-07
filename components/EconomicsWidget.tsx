
import React from 'react';
import { Coffee, Eye, Sun, AlertTriangle } from 'lucide-react';

interface Props {
  latteIndex: { price: string; insight: string };
  panopticon: { score: number; details: string };
  goldenHour: { time: string; quality: string };
}

export const EconomicsWidget: React.FC<Props> = ({ latteIndex, panopticon, goldenHour }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Latte Index */}
      <div className="bg-anthro-gray/10 border border-gray-800 p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3 text-[10px] font-mono text-gray-500 uppercase">
          <Coffee className="w-3 h-3 text-white" /> THE LATTE INDEX
        </div>
        <div className="text-3xl font-bold text-white mb-1">{latteIndex.price}</div>
        <div className="text-[10px] text-gray-400 border-l border-gray-600 pl-2 leading-tight">
          {latteIndex.insight}
        </div>
      </div>

      {/* Panopticon */}
      <div className="bg-anthro-gray/10 border border-gray-800 p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3 text-[10px] font-mono text-gray-500 uppercase">
          <Eye className={`w-3 h-3 ${panopticon.score > 70 ? 'text-red-500 animate-pulse' : 'text-white'}`} /> 
          SURVEILLANCE SCORE
        </div>
        <div className="flex items-end gap-2 mb-1">
           <div className="text-3xl font-bold text-white">{panopticon.score}</div>
           <div className="text-[10px] text-gray-500 mb-1">/100</div>
        </div>
        <div className="w-full bg-gray-800 h-1 mb-2">
            <div className={`h-full ${panopticon.score > 70 ? 'bg-red-500' : 'bg-signal-green'}`} style={{width: `${panopticon.score}%`}}></div>
        </div>
        <div className="text-[10px] text-gray-400">{panopticon.details}</div>
      </div>

      {/* Golden Hour */}
      <div className="bg-anthro-gray/10 border border-gray-800 p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3 text-[10px] font-mono text-gray-500 uppercase">
          <Sun className="w-3 h-3 text-yellow-500" /> GOLDEN HOUR
        </div>
        <div className="text-3xl font-bold text-white mb-1">{goldenHour.time}</div>
        <div className="text-[10px] text-yellow-500/80 font-mono uppercase tracking-wide">
          LIGHT QUALITY: {goldenHour.quality}
        </div>
      </div>
    </div>
  );
};
