
import React, { useState } from 'react';
import { EthnographyReport } from '../../types';
import { InstantIPO } from '../InstantIPO';
import { TrendChart } from '../TrendChart';
import { TrendingUp, Coins, FileText, CheckCircle2, Copy, Wifi, Camera, Coffee, Target, Ghost, Instagram, Sparkles } from 'lucide-react';

interface Props {
  report: EthnographyReport;
}

export const BusinessTab: React.FC<Props> = ({ report }) => {
  const [pitchCopied, setPitchCopied] = useState(false);

  const copyPitch = () => {
    if(report) {
        navigator.clipboard.writeText(`Subject: ${report.investorPitch.subjectLine}\n\n${report.investorPitch.emailBody}`);
        setPitchCopied(true);
        setTimeout(() => setPitchCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* The Instant IPO */}
      <InstantIPO recommendation={report.businessRecommendation} />

      {/* 4-Grid Business Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Nomad Score */}
          <div className="bg-anthro-gray/10 border border-gray-800 p-4">
              <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase mb-2">
                  <Wifi className="w-3 h-3 text-signal-green" /> NOMAD SCORE
              </div>
              <div className="text-2xl font-bold text-white">{report.digitalNomadScore.score}/100</div>
              <div className="text-[9px] text-gray-400 mt-1 truncate" title={report.digitalNomadScore.wifiReliability}>{report.digitalNomadScore.wifiReliability}</div>
          </div>

          {/* Liminal Space (Replaces Influencer Trap in grid) */}
          <div className="bg-anthro-gray/10 border border-gray-800 p-4">
              <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase mb-2">
                  <Ghost className="w-3 h-3 text-purple-400" /> LIMINAL SCORE
              </div>
              <div className="text-2xl font-bold text-white">{report.liminalSpaceScore.score}/100</div>
              <div className="text-[9px] text-gray-400 mt-1 truncate" title={report.liminalSpaceScore.description}>
                  {report.liminalSpaceScore.score > 50 ? 'Eerie / Empty' : 'Alive / Dense'}
              </div>
          </div>

          {/* Caffeine Saturation */}
          <div className="bg-anthro-gray/10 border border-gray-800 p-4">
              <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase mb-2">
                  <Coffee className="w-3 h-3 text-yellow-500" /> CAFFEINE
              </div>
              <div className="text-2xl font-bold text-white">{report.caffeineSaturation.shopsPerBlock} <span className="text-xs font-normal text-gray-500">/block</span></div>
              <div className="text-[9px] text-gray-400 mt-1 truncate" title={report.caffeineSaturation.dominantBrewMethod}>{report.caffeineSaturation.dominantBrewMethod}</div>
          </div>

          {/* Competitor Radar */}
          <div className="bg-anthro-gray/10 border border-gray-800 p-4">
              <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase mb-2">
                  <Target className="w-3 h-3 text-red-500" /> COMPETITORS
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span>INDIE: {report.competitorRadar.indiePercentage}%</span>
              </div>
               <div className="w-full bg-gray-700 h-1 mt-1 mb-1">
                   <div className="h-full bg-signal-green" style={{ width: `${report.competitorRadar.indiePercentage}%`}}></div>
               </div>
               <div className="text-[9px] text-gray-400">vs Chain: {report.competitorRadar.chainPercentage}%</div>
          </div>
      </div>

      {/* Influencer Trap - Detailed Section (New) */}
      <div className="bg-gradient-to-r from-pink-900/10 to-purple-900/10 border border-gray-800 p-6 relative overflow-hidden group">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-pink-400 uppercase mb-2">
                      <Instagram className="w-3 h-3" /> INFLUENCER INTELLIGENCE
                  </div>
                  <div className="flex items-baseline gap-3">
                      <div className="text-4xl font-bold text-white">{report.influencerTrap.score}</div>
                      <div className="text-sm font-mono text-gray-500">/ 100 VIRALITY SCORE</div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 max-w-md">
                      High score indicates extreme likelihood of organic social amplification. 
                      This location contains visual "hooks" optimized for vertical video formats.
                  </p>
              </div>
              
              {/* Visual Meter */}
              <div className="w-full md:w-1/3">
                  <div className="flex justify-between text-[9px] font-mono text-gray-500 mb-1">
                      <span>HIDDEN GEM</span>
                      <span>TOURIST TRAP</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" 
                        style={{ width: `${report.influencerTrap.score}%` }}
                      ></div>
                  </div>
              </div>
          </div>

          <div className="mt-6 border-t border-gray-800/50 pt-4">
              <span className="text-[9px] font-mono text-gray-500 uppercase block mb-3 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> DETECTED PHOTO OPPORTUNITIES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {report.influencerTrap.photoSpots.map((spot, i) => (
                      <div key={i} className="flex items-center gap-3 bg-black/40 border border-gray-700/50 p-2.5 text-xs text-gray-200 rounded-sm hover:border-pink-500/50 transition-colors">
                          <Camera className="w-3 h-3 text-gray-500 shrink-0" />
                          <span>{spot}</span>
                      </div>
                  ))}
                  {report.influencerTrap.photoSpots.length === 0 && (
                      <div className="text-xs text-gray-500 italic">No specific viral hotspots detected.</div>
                  )}
              </div>
          </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-anthro-gray/10 border border-gray-800 p-4">
        <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-4 flex items-center gap-2">
          <TrendingUp className="w-3 h-3" /> Growth Projection (5 YR)
        </h4>
        <TrendChart />
      </div>

      {/* Real Estate Data & Pitch */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-anthro-gray/10 border border-gray-800 p-4 h-full">
          <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-4 flex items-center gap-2">
            <Coins className="w-3 h-3" /> Real Estate Intelligence
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-xs text-gray-400">Est. Rent / SqFt</span>
              <span className="text-sm font-bold text-white">{report.rentalOpportunity.estimatedRentPerSqFt}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-xs text-gray-400">Vacancy Risk</span>
              <span className={`text-[10px] px-2 py-0.5 font-bold rounded-sm ${report.rentalOpportunity.vacancyRisk === 'HIGH' ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
                {report.rentalOpportunity.vacancyRisk}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-xs text-gray-400">Permit Difficulty</span>
              <span className="text-xs text-white">{report.rentalOpportunity.permitDifficulty}</span>
            </div>
             <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-xs text-gray-400">Lease Term</span>
              <span className="text-xs text-white">{report.rentalOpportunity.bestLeaseTerm}</span>
            </div>
          </div>
        </div>

        {/* Investor Pitch */}
        <div className="bg-anthro-gray/10 border border-gray-800 p-4 flex flex-col h-full min-h-[250px]">
          <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-4 flex items-center gap-2">
            <FileText className="w-3 h-3" /> The Pitch
          </h4>
          <div className="flex-grow bg-black/40 p-3 text-xs text-gray-400 font-mono leading-relaxed mb-4 border border-gray-800 overflow-y-auto max-h-[200px] scrollbar-thin">
             <div className="mb-2 text-gray-500 font-bold">{report.investorPitch.subjectLine}</div>
            {report.investorPitch.emailBody}
          </div>
          <button 
            onClick={copyPitch}
            className="w-full bg-white text-black py-2 text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shrink-0"
          >
            {pitchCopied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {pitchCopied ? 'COPIED TO CLIPBOARD' : 'COPY INVESTOR EMAIL'}
          </button>
        </div>
      </div>
    </div>
  );
};
