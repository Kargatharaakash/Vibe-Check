
import React from 'react';
import { HistoryItem } from '../types';
import { X, Clock, MapPin, ChevronRight, History } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onLoad: (item: HistoryItem) => void;
}

export const HistorySidebar: React.FC<Props> = ({ isOpen, onClose, history, onLoad }) => {
  return (
    <div 
      className={`fixed inset-y-0 right-0 z-[100] w-full max-w-sm bg-[#0a0a0a] border-l border-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0a0a0a]">
           <div className="flex items-center gap-2 text-white font-mono text-sm tracking-wide">
               <History className="w-4 h-4 text-signal-orange" />
               MISSION_LOGS
           </div>
           <button 
             onClick={onClose}
             className="text-gray-500 hover:text-white transition-colors"
           >
               <X className="w-5 h-5" />
           </button>
        </div>

        {/* List */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 font-mono text-xs text-center">
                    <History className="w-8 h-8 mb-4 opacity-20" />
                    <p>NO PREVIOUS MISSIONS DETECTED</p>
                    <p className="mt-2 text-[10px] text-gray-700">Scan a location to build your database.</p>
                </div>
            ) : (
                history.map((item) => (
                    <div 
                        key={item.id}
                        onClick={() => onLoad(item)}
                        className="group bg-anthro-gray/10 border border-gray-800 hover:border-signal-orange cursor-pointer transition-all duration-300 overflow-hidden"
                    >
                        <div className="flex h-24">
                            {/* Thumbnail Section */}
                            <div className="w-24 h-full bg-black border-r border-gray-800 relative overflow-hidden">
                                {item.thumbnail ? (
                                    <img src={item.thumbnail} alt="Log" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-700">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-signal-orange/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            
                            {/* Info Section */}
                            <div className="flex-grow p-3 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] font-mono text-gray-500">
                                            {new Date(item.timestamp).toLocaleDateString()}
                                        </span>
                                        <span className="text-[10px] font-mono text-signal-green">
                                            {item.report.viabilityScore}%
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white leading-tight line-clamp-2 uppercase">
                                        {item.report.locationVibe}
                                    </h4>
                                    <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                                        <MapPin className="w-3 h-3" />
                                        <span className="truncate max-w-[140px]">{item.report.coordinates.locationName}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Action Icon */}
                            <div className="w-8 flex items-center justify-center border-l border-gray-800 bg-black/20 group-hover:bg-signal-orange group-hover:text-black transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-[#0a0a0a]">
            <div className="text-[10px] font-mono text-gray-600 text-center">
                LOCAL STORAGE ACTIVE // CAP: 5 ITEMS
            </div>
        </div>
      </div>
    </div>
  );
};
