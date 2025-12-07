import React, { useEffect, useState } from 'react';

const STEPS = [
  "INITIALIZING OPTICAL SENSORS...",
  "EXTRACTING ARCHITECTURAL GEOMETRY...",
  "DETECTING FOOT TRAFFIC PATTERNS...",
  "ANALYZING SARTORIAL SIGNIFIERS...",
  "CROSS-REFERENCING CENSUS PROJECTIONS...",
  "CALCULATING GENTRIFICATION VECTOR...",
  "SYNTHESIZING VIBE CODE..."
];

export const LoadingTerminal: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 font-mono text-signal-orange">
      <div className="w-full max-w-md space-y-2">
        <div className="border-b border-signal-orange/20 pb-2 mb-4 flex justify-between">
            <span>PROCESS_ID: 9942-ALPHA</span>
            <span className="animate-pulse">RUNNING</span>
        </div>
        
        {STEPS.map((step, index) => (
          <div 
            key={index} 
            className={`flex items-center space-x-3 transition-opacity duration-300 ${index > currentStep ? 'opacity-0' : index === currentStep ? 'opacity-100' : 'opacity-40'}`}
          >
            <span className="text-[10px]">{index === currentStep ? '>' : '#'}</span>
            <span className="tracking-wider text-sm">{step}</span>
            {index === currentStep && <span className="w-2 h-4 bg-signal-orange animate-pulse inline-block ml-2"/>}
          </div>
        ))}

        <div className="mt-8 h-1 w-full bg-anthro-gray overflow-hidden">
            <div 
                className="h-full bg-signal-orange transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
        </div>
      </div>
    </div>
  );
};