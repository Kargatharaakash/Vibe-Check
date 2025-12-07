
import React, { useState, useRef } from 'react';
import { FileData, BoundingBox } from '../types';
import { Target, Maximize, User, Box, Building2, Trees, Car } from 'lucide-react';

interface Props {
  fileData: FileData;
  boxes: BoundingBox[];
  staticMode?: boolean; // New prop for PDF export
}

export const VisualGrounding: React.FC<Props> = ({ fileData, boxes, staticMode = false }) => {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to convert normalized coordinates (0-1000) to percentages
  const getStyle = (box: BoundingBox) => ({
    top: `${(box.ymin / 1000) * 100}%`,
    left: `${(box.xmin / 1000) * 100}%`,
    height: `${((box.ymax - box.ymin) / 1000) * 100}%`,
    width: `${((box.xmax - box.xmin) / 1000) * 100}%`,
  });

  const getCategoryColor = (category: BoundingBox['category']) => {
      switch(category) {
          case 'person': return 'text-cyan-400 border-cyan-400';
          case 'architecture': return 'text-orange-500 border-orange-500';
          case 'nature': return 'text-emerald-400 border-emerald-400';
          case 'transport': return 'text-yellow-400 border-yellow-400';
          default: return 'text-purple-400 border-purple-400';
      }
  };

  const getCategoryIcon = (category: BoundingBox['category']) => {
      switch(category) {
          case 'person': return <User className="w-3 h-3" />;
          case 'architecture': return <Building2 className="w-3 h-3" />;
          case 'nature': return <Trees className="w-3 h-3" />;
          case 'transport': return <Car className="w-3 h-3" />;
          default: return <Box className="w-3 h-3" />;
      }
  };

  return (
    <div className={`w-full bg-anthro-gray/20 border border-gray-800 p-1 group/container ${staticMode ? '' : ''}`}>
      {!staticMode && (
          <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-gray-800/50">
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                <Target className="w-3 h-3 text-signal-orange" />
                <span>VISION_SYSTEM_V4.1 // TARGET_ACQUISITION</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono text-gray-600">
                <span>ISO: 1600</span>
                <span>AI_CONF: 98%</span>
                <span className="text-signal-green animate-pulse">LIVE</span>
            </div>
          </div>
      )}
      
      <div 
        ref={containerRef}
        className="relative w-full h-auto overflow-hidden bg-black"
      >
        {/* Media Layer */}
        {fileData.mimeType.startsWith('video') ? (
           <video 
            src={fileData.previewUrl} 
            className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            loop={!staticMode}
            autoPlay={!staticMode}
            muted 
            playsInline
            controls={false}
           />
        ) : (
           <img 
            src={fileData.previewUrl} 
            alt="Analysis Source" 
            className={`w-full h-auto max-h-[70vh] object-contain mx-auto block ${staticMode ? 'opacity-100' : 'opacity-80 group-hover/container:opacity-100 transition-opacity duration-700'}`}
           />
        )}

        {/* Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
               backgroundSize: '10% 10%'
             }}>
        </div>

        {/* Crosshairs Overlay - Hide in static PDF mode if desired, or keep for aesthetic */}
        <div className="absolute inset-0 pointer-events-none p-4">
             <div className="w-full h-full border border-white/10 relative">
                 <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40"></div>
                 <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40"></div>
                 <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40"></div>
                 <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40"></div>
                 {!staticMode && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white/20">
                        <Maximize className="w-full h-full" strokeWidth={1} />
                    </div>
                 )}
             </div>
        </div>

        {/* Cyber-Scan Animation - Hide in static mode */}
        {!staticMode && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                <div className="w-full h-1 bg-signal-green shadow-[0_0_15px_#00cc66] absolute animate-scan"></div>
            </div>
        )}

        {/* Bounding Boxes Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {boxes.map((box, idx) => {
            const colorClass = getCategoryColor(box.category);
            const isHovered = hoveredBox === idx;
            
            return (
                <div
                key={idx}
                className={`absolute transition-all duration-300 ${
                    isHovered ? 'z-20' : 'z-10'
                }`}
                style={getStyle(box)}
                >
                {/* Bracket Style Corners for HUD look */}
                <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300 ${isHovered ? 'border-white' : colorClass.split(' ')[1]}`}></div>
                <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300 ${isHovered ? 'border-white' : colorClass.split(' ')[1]}`}></div>
                <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300 ${isHovered ? 'border-white' : colorClass.split(' ')[1]}`}></div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300 ${isHovered ? 'border-white' : colorClass.split(' ')[1]}`}></div>
                
                {/* Center Fill on Hover */}
                {!staticMode && (
                    <div className={`absolute inset-0 transition-opacity duration-300 bg-current opacity-0 ${isHovered ? 'opacity-10 text-white' : ''}`}></div>
                )}

                {/* Label - Always visible in Static Mode for PDF */}
                <div className={`absolute -top-6 left-0 bg-black/90 backdrop-blur-sm px-2 py-1 text-[9px] font-mono whitespace-nowrap border flex items-center gap-2 transition-opacity duration-300 ${
                    (staticMode || isHovered) ? 'opacity-100 border-white text-white z-50' : `opacity-0 ${colorClass}`
                }`}>
                    {getCategoryIcon(box.category)}
                    <span className="uppercase tracking-wide">{box.label}</span>
                </div>
                </div>
            );
          })}
        </div>
      </div>

      {/* Legend / Interactive List - Hide in PDF */}
      {!staticMode && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 p-2 bg-black/20">
            {boxes.map((box, idx) => {
                const colorClass = getCategoryColor(box.category);
                return (
                    <button
                        key={idx}
                        onMouseEnter={() => setHoveredBox(idx)}
                        onMouseLeave={() => setHoveredBox(null)}
                        className={`text-left text-[10px] font-mono px-3 py-2 border transition-all flex items-center gap-2 group/btn relative overflow-hidden ${
                            hoveredBox === idx 
                            ? `${colorClass} bg-white/5` 
                            : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'
                        }`}
                    >
                        <div className={`absolute inset-0 opacity-10 transition-transform duration-300 bg-current ${hoveredBox === idx ? 'translate-x-0' : '-translate-x-full'}`}></div>
                        <span className={`text-[8px] opacity-50 font-bold relative z-10`}>0{idx + 1}</span>
                        <span className="truncate relative z-10 uppercase">{box.label}</span>
                    </button>
                )
            })}
        </div>
      )}
    </div>
  );
};
