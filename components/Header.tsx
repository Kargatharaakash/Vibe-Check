import React from 'react';
import { History, Layers, RefreshCw, Loader2 } from 'lucide-react';

interface Props {
  onShowHistory: () => void;
  onExportPDF: () => void;
  isExporting: boolean;
  onReset: () => void;
}

export const Header: React.FC<Props> = ({ onShowHistory, onExportPDF, isExporting, onReset }) => {
  return (
    <div className="h-14 border-b border-gray-800 bg-anthro-black flex items-center justify-between px-6 shrink-0 z-50">
      <div className="flex items-center gap-6">
        <span className="font-bold tracking-tighter text-xl text-white">VIBE OS</span>
        <div className="h-4 w-[1px] bg-gray-700"></div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-signal-green">
          <div className="w-2 h-2 rounded-full bg-signal-green animate-pulse"></div>
          LIVE ANALYSIS
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={onShowHistory} 
          className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono border border-gray-700 hover:bg-gray-800 transition-colors text-gray-400"
        >
          <History className="w-3 h-3" />
        </button>
        <button 
          onClick={onExportPDF} 
          disabled={isExporting} 
          className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono border border-gray-700 hover:bg-gray-800 transition-colors text-anthro-light"
        >
          {isExporting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Layers className="w-3 h-3" />}
          EXPORT DOSSIER
        </button>
        <button 
          onClick={onReset} 
          className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono bg-white text-black hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          NEW SCAN
        </button>
      </div>
    </div>
  );
};