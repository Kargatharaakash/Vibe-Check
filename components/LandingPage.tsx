import React from 'react';
import { Upload, PlayCircle, AlertTriangle, ArrowRight, History } from 'lucide-react';
import { FileData } from '../types';

interface Props {
  fileData: FileData | null;
  error: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartAnalysis: () => void;
  onLoadDemo: () => void;
  onShowHistory: () => void;
}

export const LandingPage: React.FC<Props> = ({
  fileData,
  error,
  fileInputRef,
  onFileSelect,
  onStartAnalysis,
  onLoadDemo,
  onShowHistory
}) => {
  return (
    <main className="pt-12 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col relative z-10">
      <div className="absolute top-6 right-6">
        <button 
          onClick={onShowHistory}
          className="flex items-center gap-2 text-[10px] font-mono text-gray-400 hover:text-white transition-colors"
        >
          <History className="w-4 h-4" /> HISTORY
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-grow">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <div className="space-y-4">
            <div className="inline-block px-2 py-1 border border-signal-orange text-signal-orange text-[10px] font-mono tracking-widest uppercase mb-2">
              VIBE_OS // V4.2
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-white">
              Decode the street.<br/>
              <span className="text-gray-700">Predict the wealth.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              The first <strong>Visual Ethnography Engine</strong> powered by Gemini 3 Pro. We analyze fashion, architecture, and entropy to generate institutional-grade business intelligence.
            </p>
            
            <button 
              onClick={onLoadDemo}
              className="mt-6 flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-6 py-3 transition-all rounded-sm group"
            >
              <PlayCircle className="w-5 h-5 text-signal-green group-hover:scale-110 transition-transform" />
              <span className="font-mono text-sm tracking-wide">TRY LIVE DEMO (LONDON)</span>
            </button>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs border border-red-900/50 bg-red-900/10 p-3">
               <AlertTriangle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>

        <div className="h-full flex flex-col justify-center animate-in fade-in slide-in-from-right duration-700 delay-200">
          <div className="w-full min-h-[400px] lg:min-h-[500px] border border-dashed border-gray-700 bg-anthro-gray/30 hover:bg-anthro-gray/50 transition-colors group relative overflow-hidden flex flex-col items-center justify-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileSelect}
              accept="image/*,video/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            
            {!fileData ? (
              <div className="flex flex-col items-center justify-center gap-6 p-8 text-center pointer-events-none">
                <div className="w-24 h-24 border border-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 bg-black/50 backdrop-blur-sm shadow-2xl">
                   <Upload className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-2">
                  <p className="font-mono text-lg text-gray-300 tracking-wider">INITIATE SCAN</p>
                  <p className="text-xs text-gray-600 font-mono">UPLOAD FOOTAGE (MAX 50MB)</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden">
                 {fileData.mimeType.startsWith('video') ? (
                   <video 
                    src={fileData.previewUrl} 
                    className="w-full h-full object-cover opacity-60"
                    loop 
                    autoPlay 
                    muted 
                    playsInline
                   />
                 ) : (
                   <img src={fileData.previewUrl} alt="Preview" className="w-full h-full object-cover opacity-60" />
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-anthro-black via-transparent to-transparent" />
                 
                 <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono text-signal-orange bg-black/50 px-2 py-1">SOURCE_LOCKED</span>
                    <span className="text-[10px] font-mono text-gray-400">{fileData.file.name}</span>
                 </div>

                 <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent re-triggering file input
                            onStartAnalysis();
                        }}
                        className="pointer-events-auto bg-signal-orange hover:bg-orange-600 text-anthro-black font-bold px-10 py-4 flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,77,0,0.4)] tracking-widest text-sm"
                    >
                        RUN VIBE_OS <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
