import React from 'react';
import { EthnographyReport } from '../../types';
import { GeoMap } from '../GeoMap';
import { EconomicsWidget } from '../EconomicsWidget';
import { RadarAnalysis } from '../RadarAnalysis';
import { Globe, Hexagon, Cloud, BarChart3, Activity, Clock } from 'lucide-react';

interface Props {
  report: EthnographyReport;
}

export const OverviewTab: React.FC<Props> = ({ report }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Map & Matches Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-64">
        <div className="h-64 md:h-full w-full">
          <GeoMap coordinates={report.coordinates} />
        </div>
        <div className="h-64 md:h-full overflow-y-auto pr-2 space-y-3 scrollbar-thin">
          <h4 className="text-[10px] font-mono text-gray-500 uppercase sticky top-0 bg-anthro-black pb-2 z-10">Global Vibe Matches</h4>
          {report.vibeMatches.map((match, i) => (
            <div key={i} className="bg-anthro-gray/10 border border-gray-800 p-4 hover:border-gray-600 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-3 h-3 text-gray-500" />
                <span className="text-[10px] font-mono text-gray-400">VIBE TWIN {i+1}</span>
              </div>
              <div className="font-bold text-sm text-white mb-1 truncate">{match.location}, {match.city}</div>
              <div className="w-full bg-gray-800 h-1 mt-2">
                <div className="h-full bg-signal-green" style={{width: `${match.matchScore}%`}}></div>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 line-clamp-2">{match.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-anthro-gray/10 p-4 border border-gray-800 flex flex-col items-center justify-center text-center h-32 hover:bg-anthro-gray/20 transition-colors">
          <Hexagon className="w-5 h-5 text-gray-500 mb-2" />
          <span className="text-[9px] font-mono text-gray-500 block mb-1">ARCHITECTURE</span>
          <span className="text-xs font-bold leading-tight text-white line-clamp-2" title={report.architecturalStyle}>{report.architecturalStyle}</span>
        </div>
        <div className="bg-anthro-gray/10 p-4 border border-gray-800 flex flex-col items-center justify-center text-center h-32 hover:bg-anthro-gray/20 transition-colors">
          <Cloud className="w-5 h-5 text-gray-500 mb-2" />
          <span className="text-[9px] font-mono text-gray-500 block mb-1">ATMOSPHERE</span>
          <span className="text-xs font-bold leading-tight text-white line-clamp-2" title={report.atmosphere}>{report.atmosphere}</span>
        </div>
        <div className="bg-anthro-gray/10 p-4 border border-gray-800 flex flex-col items-center justify-center text-center h-32 hover:bg-anthro-gray/20 transition-colors">
          <BarChart3 className="w-5 h-5 text-gray-500 mb-2" />
          <span className="text-[9px] font-mono text-gray-500 block mb-1">DENSITY</span>
          <span className="text-xs font-bold leading-tight text-white line-clamp-2" title={report.commercialDensity}>{report.commercialDensity}</span>
        </div>
        <div className="bg-anthro-gray/10 p-4 border border-gray-800 flex flex-col items-center justify-center text-center h-32 hover:bg-anthro-gray/20 transition-colors">
          <Activity className="w-5 h-5 text-gray-500 mb-2" />
          <span className="text-[9px] font-mono text-gray-500 block mb-1">GENTRIFICATION</span>
          <span className="text-xl font-bold text-signal-orange">{report.gentrificationIndex}</span>
        </div>
      </div>
      
      <EconomicsWidget latteIndex={report.latteIndex} panopticon={report.panopticonScore} goldenHour={report.goldenHour} />

      {/* Radar */}
      <div className="bg-anthro-gray/10 border border-gray-800 p-4">
        <h3 className="font-mono text-[10px] text-gray-500 mb-4 flex items-center gap-2 uppercase">
          Vibe Metrics
        </h3>
        <RadarAnalysis metrics={report.radarMetrics} />
      </div>

      {/* Temporal */}
      <div className="border border-gray-800 p-4 bg-black/40">
        <div className="flex items-center gap-2 text-signal-orange mb-3">
          <Clock className="w-3 h-3" />
          <span className="text-[10px] font-mono tracking-wider">TEMPORAL PROJECTION</span>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <span className="text-[9px] text-gray-600 block mb-1 font-mono">PAST (-10 YRS)</span>
            <p className="text-xs text-gray-400 border-l border-gray-800 pl-3 pt-1 leading-relaxed">{report.temporalProjection.past}</p>
          </div>
          <div className="flex-1">
            <span className="text-[9px] text-gray-600 block mb-1 font-mono">FUTURE (+10 YRS)</span>
            <p className="text-xs text-gray-300 border-l border-signal-orange pl-3 pt-1 leading-relaxed">{report.temporalProjection.future}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
