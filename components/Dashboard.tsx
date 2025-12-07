import React, { useState, useEffect } from 'react';
import { EthnographyReport, FileData } from '../types';
import { VisualGrounding } from './VisualGrounding';
import { OverviewTab } from './tabs/OverviewTab';
import { BusinessTab } from './tabs/BusinessTab';
import { CultureTab } from './tabs/CultureTab';

interface Props {
  report: EthnographyReport;
  fileData: FileData;
}

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText(''); 
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => text.substring(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
      }, 20); 
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

export const Dashboard: React.FC<Props> = ({ report, fileData }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'BUSINESS' | 'CULTURE'>('OVERVIEW');

  return (
    <div className="flex-grow flex flex-col lg:flex-row overflow-hidden h-full">
      {/* LEFT: VISUAL (Sticky on desktop, stacked on mobile) */}
      <div className="lg:w-[45%] h-[40vh] lg:h-full border-r border-gray-800 bg-black relative flex flex-col shrink-0">
        <div className="flex-grow relative overflow-hidden bg-black flex items-center justify-center">
          <VisualGrounding fileData={fileData} boxes={report.detectedObjects} />
        </div>
        {/* MINI METRICS UNDER VISUAL */}
        <div className="h-auto p-4 bg-anthro-gray/20 border-t border-gray-800 grid grid-cols-2 gap-4 shrink-0">
          <div>
            <span className="text-[9px] font-mono text-gray-500 block mb-1">LOCATION VIBE</span>
            <div className="text-xl font-bold leading-none uppercase text-white truncate pr-2" title={report.locationVibe}>
              <TypewriterText text={report.locationVibe} delay={500} />
            </div>
          </div>
          <div className="flex justify-end items-end">
            <div className="text-right">
              <span className="text-[9px] font-mono text-gray-500 block mb-1">VIABILITY INDEX</span>
              <span className={`text-2xl font-bold ${report.viabilityScore > 75 ? 'text-signal-green' : 'text-signal-orange'}`}>{report.viabilityScore}/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: DATA DASHBOARD (Scrollable) */}
      <div className="lg:w-[55%] h-full flex flex-col bg-anthro-black overflow-hidden relative">
        {/* TABS */}
        <div className="flex border-b border-gray-800 sticky top-0 bg-anthro-black z-40 shrink-0">
          {(['OVERVIEW', 'BUSINESS', 'CULTURE'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-xs font-mono tracking-widest border-b-2 transition-colors ${activeTab === tab ? 'border-signal-orange text-white' : 'border-transparent text-gray-600 hover:text-gray-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENT SCROLL AREA */}
        <div className="flex-grow overflow-y-auto scrollbar-thin">
           <div className="p-6 pb-24">
              {activeTab === 'OVERVIEW' && <OverviewTab report={report} />}
              {activeTab === 'BUSINESS' && <BusinessTab report={report} />}
              {activeTab === 'CULTURE' && <CultureTab report={report} />}
           </div>
        </div>
      </div>
    </div>
  );
};
