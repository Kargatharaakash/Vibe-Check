import React, { useState } from 'react';
import { EthnographyReport } from '../../types';
import { InstantIPO } from '../InstantIPO';
import { TrendChart } from '../TrendChart';
import { TrendingUp, Coins, FileText, CheckCircle2, Copy } from 'lucide-react';

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
