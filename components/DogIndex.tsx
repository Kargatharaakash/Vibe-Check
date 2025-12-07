
import React from 'react';
import { Dog } from 'lucide-react';

interface Props {
  data: {
    score: number;
    dominantBreed: string;
    insight: string;
  };
}

export const DogIndex: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-anthro-gray/10 border border-gray-800 p-4">
        <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-4 flex items-center gap-2">
            <Dog className="w-3 h-3 text-white" /> THE DOG INDEX (WEALTH PROXY)
        </h4>
        
        <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold text-white">{data.score}</span>
            <span className="text-[10px] text-gray-500 mb-1">/ 100</span>
        </div>
        
        <div className="w-full bg-gray-800 h-1 mb-3">
             <div 
                className="h-full bg-gradient-to-r from-gray-500 to-white" 
                style={{ width: `${data.score}%` }}
             ></div>
        </div>
        
        <div className="flex justify-between items-start text-xs border-t border-gray-800 pt-2">
            <div>
                <span className="text-[9px] text-gray-500 block">DOMINANT BREED</span>
                <span className="text-white font-bold">{data.dominantBreed}</span>
            </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 italic leading-tight">{data.insight}</p>
    </div>
  );
};
