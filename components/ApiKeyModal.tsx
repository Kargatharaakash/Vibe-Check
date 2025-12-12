
import React, { useState } from 'react';
import { Key, Shield, AlertTriangle, ArrowRight, PlayCircle, Lock } from 'lucide-react';

interface Props {
  onSave: (key: string) => void;
  onDemo: () => void;
}

export const ApiKeyModal: React.FC<Props> = ({ onSave, onDemo }) => {
  const [inputKey, setInputKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      onSave(inputKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-anthro-black border border-gray-800 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Top Decorative Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-signal-orange via-purple-600 to-signal-green"></div>
        
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700">
               <Key className="w-5 h-5 text-signal-orange" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">AUTHENTICATION</h2>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">System Access Control</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase flex items-center gap-2">
                <Lock className="w-3 h-3" /> Enter Gemini API Key
              </label>
              <input 
                type="password" 
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-black border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:border-signal-orange focus:outline-none focus:ring-1 focus:ring-signal-orange/50 transition-all placeholder:text-gray-800"
                autoFocus
              />
            </div>

            <div className="bg-gray-900/50 border border-gray-800 p-3 flex gap-3 items-start">
              <Shield className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-400 leading-relaxed font-mono">
                <strong className="text-gray-300">PRIVACY PROTOCOL:</strong> Your API key is stored locally in your browser's encrypted storage. It is never sent to our servers, only directly to Google's API for analysis.
              </p>
            </div>

            <button 
              type="submit"
              disabled={!inputKey}
              className="w-full bg-signal-orange text-black font-bold py-3 text-sm tracking-widest uppercase hover:bg-[#ff5d1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              INITIALIZE SYSTEM <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-[10px] text-gray-500 font-mono mb-3">NO KEY? ACCESS RESTRICTED MODE</p>
            <button 
              onClick={onDemo}
              className="text-xs text-white hover:text-signal-green transition-colors flex items-center justify-center gap-2 mx-auto border border-gray-700 hover:border-signal-green px-4 py-2 bg-white/5"
            >
              <PlayCircle className="w-3 h-3" /> LAUNCH DEMO VERSION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
