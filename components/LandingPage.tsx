
import React from 'react';
import { Upload, PlayCircle, AlertTriangle, ArrowRight, History, Aperture, Trash2 } from 'lucide-react';
import { FileData } from '../types';
import { LanguageSelector } from './LanguageSelector';

interface Props {
  fileData: FileData | null;
  error: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartAnalysis: () => void;
  onLoadDemo: () => void;
  onShowHistory: () => void;
  selectedLanguage: string;
  onLanguageSelect: (lang: string) => void;
  onReset: () => void;
}

export const LandingPage: React.FC<Props> = ({
  fileData,
  error,
  fileInputRef,
  onFileSelect,
  onStartAnalysis,
  onLoadDemo,
  onShowHistory,
  selectedLanguage,
  onLanguageSelect,
  onReset
}) => {
  return (
    <main className="relative min-h-screen w-full bg-anthro-black overflow-hidden flex flex-col justify-center py-24 md:py-32 px-6 lg:px-12 selection:bg-signal-orange selection:text-black">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gray-900/50"></div>
          <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gray-900/50"></div>
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gray-900/50"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-gray-900/50"></div>
      </div>

      {/* Top Controls - Positioned Absolute */}
      <div className="absolute top-8 right-8 flex items-center gap-6 z-50 animate-in fade-in slide-in-from-top-4 duration-700">
        <LanguageSelector selectedLanguage={selectedLanguage} onSelect={onLanguageSelect} />
        
        <button 
          onClick={onShowHistory}
          className="flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-white transition-colors border border-transparent hover:border-gray-800 px-3 py-2 rounded-sm"
        >
          <History className="w-4 h-4" /> HISTORY
        </button>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left Side: Typography */}
        <div className="space-y-10 animate-in fade-in slide-in-from-left duration-700">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-signal-green animate-pulse rounded-full"></div>
                <div className="text-signal-orange text-[10px] font-mono tracking-[0.2em] uppercase">
                System Online // V4.2
                </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] text-white">
              Decode<br/>
              <span className="text-gray-800">the Street.</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed font-light border-l-2 border-gray-800 pl-6">
              The world's first <strong className="text-white font-medium">Visual Ethnography Engine</strong> powered by Gemini 3 Pro. We analyze fashion, architecture, and entropy to predict economic viability.
            </p>
            
            <div className="flex gap-4 pt-4">
                <button 
                onClick={onLoadDemo}
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-signal-green/50 text-white px-8 py-4 transition-all rounded-sm group"
                >
                <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-signal-green transition-colors" />
                <span className="font-mono text-xs tracking-widest uppercase group-hover:text-signal-green transition-colors">Load Live Demo</span>
                </button>
            </div>
          </div>
          
          {error && (
            <div className="flex items-center gap-3 text-red-400 font-mono text-xs border-l-2 border-red-500 bg-red-950/20 p-4 max-w-md">
               <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}
        </div>

        {/* Right Side: Upload Interface */}
        <div className="h-full flex flex-col justify-center animate-in fade-in slide-in-from-right duration-700 delay-200">
          <div className="w-full max-w-[500px] aspect-square max-h-[500px] bg-black/40 border border-gray-800 relative group cursor-pointer overflow-hidden transition-all hover:border-gray-600 shadow-2xl mx-auto">
            
            {/* Tactical Corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gray-700 group-hover:border-signal-orange transition-colors duration-500 z-20"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gray-700 group-hover:border-signal-orange transition-colors duration-500 z-20"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gray-700 group-hover:border-signal-orange transition-colors duration-500 z-20"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gray-700 group-hover:border-signal-orange transition-colors duration-500 z-20"></div>

            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0" 
                 style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>
            
            {/* Scanline Animation */}
            {!fileData && (
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-full h-[2px] bg-signal-orange/50 shadow-[0_0_20px_rgba(255,77,0,0.5)] absolute top-0 animate-[scan_3s_ease-in-out_infinite]"></div>
                </div>
            )}

            {/* Render input ONLY when no file is selected to prevent overlaying the RUN button */}
            {!fileData && (
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileSelect}
                  accept="image/*,video/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                />
            )}
            
            {!fileData ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none p-10">
                <div className="relative mb-10">
                    <div className="w-32 h-32 rounded-full border border-gray-800 flex items-center justify-center relative bg-black/50 backdrop-blur-sm group-hover:border-gray-600 transition-colors duration-500">
                       <div className="absolute inset-0 rounded-full border border-dashed border-gray-700 animate-[spin_20s_linear_infinite] opacity-50"></div>
                       <div className="absolute inset-2 rounded-full border border-t-transparent border-l-transparent border-signal-orange/20 animate-[spin_3s_linear_infinite]"></div>
                       <Upload className="w-8 h-8 text-gray-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                </div>
                
                <div className="space-y-4 text-center">
                  <h3 className="font-mono text-2xl text-white tracking-[0.2em] group-hover:text-signal-orange transition-colors duration-300">INITIATE SCAN</h3>
                  <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                     <span className="border-b border-gray-800 pb-1">Video</span>
                     <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                     <span className="border-b border-gray-800 pb-1">Image</span>
                  </div>
                  <p className="text-[10px] text-gray-600 font-mono mt-4 pt-4 border-t border-gray-800/50 w-full max-w-[200px] mx-auto">
                      MAX UPLOAD: 50MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden z-20">
                 {fileData.mimeType.startsWith('video') ? (
                   <video 
                    src={fileData.previewUrl} 
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"
                    loop 
                    autoPlay 
                    muted 
                    playsInline
                   />
                 ) : (
                   <img 
                    src={fileData.previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" 
                   />
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                 
                 {/* File Info HUD */}
                 <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-signal-green bg-black/80 border border-signal-green/30 px-3 py-1">
                        <Aperture className="w-3 h-3 animate-spin-slow" />
                        SOURCE_LOCKED
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 bg-black/50 px-2 py-1">{fileData.file.name}</span>
                    
                    {/* Change File Button */}
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onReset();
                        }}
                        className="flex items-center gap-2 text-[9px] font-mono text-red-400 bg-black/50 hover:bg-red-900/30 px-2 py-1 transition-colors border border-transparent hover:border-red-900/50"
                    >
                        <Trash2 className="w-3 h-3" /> CHANGE FILE
                    </button>
                 </div>

                 {/* Action Button */}
                 <div className="absolute bottom-12 left-0 right-0 flex justify-center z-30 pointer-events-none">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onStartAnalysis();
                        }}
                        className="pointer-events-auto bg-signal-orange hover:bg-[#ff5d1a] text-black font-bold px-12 py-5 flex items-center gap-3 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,77,0,0.3)] hover:shadow-[0_0_60px_rgba(255,77,0,0.5)] tracking-[0.15em] text-sm clip-path-slant z-50"
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
