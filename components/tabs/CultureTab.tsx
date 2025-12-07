import React from 'react';
import { EthnographyReport } from '../../types';
import { DatingProfiles } from '../DatingProfiles';
import { SoundscapePlayer } from '../SoundscapePlayer';
import { AnalysisChart } from '../AnalysisChart';
import { User, Music, Wind } from 'lucide-react';

interface Props {
  report: EthnographyReport;
}

export const CultureTab: React.FC<Props> = ({ report }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Persona */}
        <div className="bg-anthro-gray/20 border border-gray-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-600 shrink-0">
                <User className="w-4 h-4 text-gray-300" />
              </div>
              <div>
                <h3 className="font-mono text-xs text-gray-500 uppercase">Target Persona</h3>
                <p className="text-lg font-bold text-white leading-tight">{report.targetPersona.archetype}</p>
              </div>
            </div>
            <p className="font-serif italic text-gray-400 text-sm leading-relaxed mb-6 border-l-2 border-gray-700 pl-4">"{report.targetPersona.quote}"</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-auto">
            {report.targetPersona.accessories.map((item, i) => (
              <span key={i} className="text-[10px] text-gray-300 bg-black/50 px-2 py-1 border border-gray-800 rounded-full">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Dating Profiles */}
        <DatingProfiles profiles={report.datingProfiles} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sonic Identity */}
        <div className="space-y-4">
          <SoundscapePlayer metrics={report.radarMetrics} vibeDescription={report.locationVibe} />

          <div className="bg-anthro-gray/10 border border-gray-800 p-4">
            <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-3 flex items-center gap-2">
              <Music className="w-3 h-3" /> Playlist Recommendation
            </h4>
            <div className="space-y-2 max-h-[150px] overflow-y-auto scrollbar-thin pr-1">
              {report.playlist.map((track, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-800 pb-2 last:border-0 hover:bg-white/5 px-2 transition-colors">
                  <div className="overflow-hidden">
                    <span className="text-xs text-white block font-bold truncate">{track.song}</span>
                    <span className="text-[10px] text-gray-500 truncate block">{track.artist}</span>
                  </div>
                  <span className="text-[9px] text-gray-600 font-mono uppercase shrink-0 ml-2">{track.vibe}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-anthro-gray/10 border border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-gray-500">
              <Wind className="w-3 h-3" /> SCENT PROFILE
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">{report.scentProfile.join(' • ')}</p>
          </div>
        </div>
        
        {/* Demographics Chart */}
        <div className="bg-anthro-gray/10 border border-gray-800 p-4 flex flex-col h-full">
          <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-4">Observed Demographics</h4>
          <div className="flex-grow">
             <AnalysisChart data={report.observedDemographics} />
          </div>
        </div>
      </div>

      {/* Psychogeography */}
      <div className="flex gap-2 items-center overflow-x-auto pb-2 scrollbar-thin">
        {report.psychogeography.map((mood, i) => (
          <div key={i} className="flex-shrink-0 border border-gray-800 bg-black/50 px-4 py-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300">{mood}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
