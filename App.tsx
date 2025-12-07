import React, { useState, useRef } from 'react';
import { Upload, AlertTriangle, ArrowRight, Eye, RefreshCw, User, Clock, Speaker, TrendingUp, Activity, Layers, Loader2, MapPin, Cloud, Hexagon, BarChart3, Wind, Brain, Bus, ShoppingBag, Users, Coins } from 'lucide-react';
import { AnalysisStatus, EthnographyReport, FileData } from './types';
import { analyzeVibe } from './services/geminiService';
import { LoadingTerminal } from './components/LoadingTerminal';
import { AnalysisChart } from './components/AnalysisChart';
import { NoiseOverlay } from './components/NoiseOverlay';
import { VisualGrounding } from './components/VisualGrounding';
import { RadarAnalysis } from './components/RadarAnalysis';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [report, setReport] = useState<EthnographyReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 50 * 1024 * 1024) {
        setError("File too large. Please upload media under 50MB.");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setFileData({
        file,
        previewUrl,
        base64: '',
        mimeType: file.type
      });
      setStatus(AnalysisStatus.IDLE);
      setError(null);
    }
  };

  const startAnalysis = async () => {
    if (!fileData) return;
    setStatus(AnalysisStatus.PROCESSING);
    
    try {
      const result = await analyzeVibe(fileData.file);
      setReport(result);
      setStatus(AnalysisStatus.COMPLETE);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. The ethnography engine encountered an anomaly.");
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const reset = () => {
    setFileData(null);
    setReport(null);
    setStatus(AnalysisStatus.IDLE);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#0a0a0a',
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [imgWidth, imgHeight]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`VibeCheck_Report_${Date.now()}.pdf`);

    } catch (err) {
      console.error("PDF Export failed:", err);
      setError("Failed to generate PDF visualization.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-anthro-black text-anthro-light selection:bg-signal-orange selection:text-anthro-black">
      <NoiseOverlay />
      
      <main className="pt-12 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col">
        
        {/* State: IDLE / UPLOAD */}
        {!report && status !== AnalysisStatus.ANALYZING && status !== AnalysisStatus.PROCESSING && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-grow">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-2 py-1 border border-signal-orange text-signal-orange text-[10px] font-mono tracking-widest uppercase mb-2">
                  VIBE_CHECK // SYSTEM READY
                </div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[0.9]">
                  Decode the street.<br/>
                  <span className="text-gray-600">Predict the money.</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                  Upload a street-view video or image. Our AI analyzes architectural age, fashion indicators, and foot traffic pace to generate a precise business viability report.
                </p>
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-red-500 font-mono text-xs border border-red-900/50 bg-red-900/10 p-3">
                   <AlertTriangle className="w-4 h-4" /> {error}
                </div>
              )}
            </div>

            <div className="h-full flex flex-col justify-center">
              <div className="w-full min-h-[400px] lg:min-h-[500px] border border-dashed border-gray-700 bg-anthro-gray/30 hover:bg-anthro-gray/50 transition-colors group relative overflow-hidden flex flex-col items-center justify-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*,video/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                
                {!fileData ? (
                  <div className="flex flex-col items-center justify-center gap-6 p-8 text-center pointer-events-none">
                    <div className="w-20 h-20 border border-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 bg-black/50 backdrop-blur-sm">
                       <Upload className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-mono text-lg text-gray-300 tracking-wider">DROP FEED HERE</p>
                      <p className="text-xs text-gray-600 font-mono">MOV, MP4, JPG, PNG (Max 50MB)</p>
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
                                startAnalysis();
                            }}
                            className="pointer-events-auto bg-signal-orange hover:bg-orange-600 text-anthro-black font-bold px-8 py-3 flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,77,0,0.3)]"
                        >
                            RUN ETHNOGRAPHY <ArrowRight className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* State: PROCESSING */}
        {status === AnalysisStatus.PROCESSING && (
           <div className="fixed inset-0 z-50 bg-anthro-black flex flex-col items-center justify-center">
             <LoadingTerminal />
           </div>
        )}

        {/* State: REPORT */}
        {status === AnalysisStatus.COMPLETE && report && fileData && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 pt-8">
                
                {/* Control Bar (Moved into flow) */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-white pb-6 gap-6">
                     <div className="space-y-2">
                         <div className="flex items-center gap-2 text-signal-orange font-mono text-xs tracking-wider">
                            <Activity className="w-3 h-3" />
                            ANALYSIS COMPLETE
                         </div>
                         <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white leading-none">
                             {report.locationVibe}
                         </h1>
                         <div className="flex items-center gap-4 text-gray-500 font-mono text-xs">
                             <span>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                             <span>//</span>
                             <span>{new Date().toLocaleDateString()}</span>
                         </div>
                     </div>
                     <div className="flex gap-3">
                        <button 
                            onClick={handleExportPDF}
                            disabled={isExporting}
                            className="flex items-center gap-2 font-mono text-xs hover:bg-white hover:text-black transition-colors border border-gray-700 px-6 py-3 disabled:opacity-50"
                        >
                             {isExporting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Layers className="w-3 h-3" />} 
                             {isExporting ? 'RENDERING...' : 'EXPORT PDF'}
                        </button>
                        <button onClick={reset} className="flex items-center gap-2 font-mono text-xs bg-white text-black hover:bg-gray-200 transition-colors px-6 py-3 font-bold">
                            <RefreshCw className="w-3 h-3" /> NEW SCAN
                        </button>
                     </div>
                </div>

                {/* Report Content Wrapper for Capture */}
                <div ref={reportRef} className="bg-anthro-black pt-4 pb-8">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                        
                        {/* LEFT COLUMN: Visual Grounding & Core Stats */}
                        <div className="xl:col-span-5 space-y-6 order-2 xl:order-1">
                            
                            {/* Visual Grounding */}
                            <VisualGrounding fileData={fileData} boxes={report.detectedObjects} />

                            {/* Environmental Scan */}
                            <div className="bg-anthro-gray/10 p-5 border border-gray-800">
                                <h3 className="font-mono text-xs text-gray-500 mb-4 flex items-center gap-2">
                                    <Cloud className="w-3 h-3" />
                                    ENVIRONMENTAL SCAN
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: 'ARCHITECTURE', icon: Hexagon, value: report.architecturalStyle },
                                        { label: 'ATMOSPHERE', icon: Cloud, value: report.atmosphere },
                                        { label: 'DENSITY', icon: BarChart3, value: report.commercialDensity }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-black/40 border border-gray-800 p-3 h-24 flex flex-col justify-center">
                                            <div className="flex items-center gap-2 mb-2">
                                                <item.icon className="w-3 h-3 text-gray-500" />
                                                <span className="text-[9px] font-mono text-gray-500">{item.label}</span>
                                            </div>
                                            <p className="text-xs font-bold text-white leading-tight">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                             {/* Sensory Module (New) */}
                             <div className="bg-anthro-gray/10 p-5 border border-gray-800">
                                <h3 className="font-mono text-xs text-gray-500 mb-4 flex items-center gap-2">
                                    <Wind className="w-3 h-3" />
                                    SENSORY PROFILE
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <span className="text-[10px] font-mono text-gray-600 block mb-2">AUDIO SPECTRUM</span>
                                        <div className="flex flex-wrap gap-2">
                                            {report.soundscape.map((sound, i) => (
                                                <span key={i} className="px-2 py-1 bg-black/40 border border-gray-700 text-[10px] text-gray-300 font-mono flex items-center gap-2">
                                                    <Speaker className="w-2 h-2 text-gray-500" /> {sound}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono text-gray-600 block mb-2">OLFACTORY DETECTORS</span>
                                        <div className="flex flex-wrap gap-2">
                                            {report.scentProfile.map((scent, i) => (
                                                <span key={i} className="px-2 py-1 bg-black/40 border border-gray-700 text-[10px] text-gray-300 font-mono flex items-center gap-2">
                                                    <Wind className="w-2 h-2 text-gray-500" /> {scent}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Culture & Logistics (New) */}
                            <div className="bg-anthro-gray/10 p-5 border border-gray-800">
                                <h3 className="font-mono text-xs text-gray-500 mb-4 flex items-center gap-2">
                                    <Brain className="w-3 h-3" />
                                    CULTURAL & LOGISTICS
                                </h3>
                                <div className="space-y-4">
                                     <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                                         <div className="w-8 h-8 flex items-center justify-center bg-gray-900 border border-gray-700">
                                             <Users className="w-4 h-4 text-gray-400" />
                                         </div>
                                         <div className="flex-1">
                                             <span className="text-[10px] font-mono text-gray-500">DETECTED SUBCULTURES</span>
                                             <div className="flex flex-wrap gap-2 mt-1">
                                                 {report.subcultures.map((sub, i) => (
                                                     <span key={i} className="text-xs text-white bg-gray-900 px-2 py-0.5 rounded-sm">{sub}</span>
                                                 ))}
                                             </div>
                                         </div>
                                     </div>
                                     <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                                         <div className="w-8 h-8 flex items-center justify-center bg-gray-900 border border-gray-700">
                                             <Coins className="w-4 h-4 text-gray-400" />
                                         </div>
                                         <div className="flex-1">
                                             <span className="text-[10px] font-mono text-gray-500">LOCAL CURRENCY</span>
                                             <p className="text-sm font-bold text-white">{report.localCurrency}</p>
                                         </div>
                                     </div>
                                     <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1 mb-1"><Clock className="w-3 h-3" /> PEAK TIME</span>
                                            <p className="text-xs text-white">{report.peakTime}</p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1 mb-1"><Bus className="w-3 h-3" /> TRANSIT</span>
                                            <div className="flex gap-1 flex-wrap">
                                                {report.transitAccess.map((t, i) => <span key={i} className="text-[10px] text-gray-400 border border-gray-800 px-1">{t}</span>)}
                                            </div>
                                        </div>
                                     </div>
                                </div>
                            </div>

                            {/* Radar Analysis */}
                            <div className="bg-anthro-gray/10 p-5 border border-gray-800">
                                <h3 className="font-mono text-xs text-gray-500 mb-3 flex items-center gap-2 uppercase">
                                    <Activity className="w-3 h-3" />
                                    Vibe Metrics
                                </h3>
                                <RadarAnalysis metrics={report.radarMetrics} />
                            </div>

                            {/* Temporal Projection */}
                            <div className="bg-anthro-gray/10 p-5 border border-gray-800">
                                <h3 className="font-mono text-xs text-gray-500 mb-3 flex items-center gap-2">
                                    <Clock className="w-3 h-3" />
                                    TEMPORAL PROJECTION
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-[10px] text-gray-600 font-mono block mb-1">T-MINUS 10 YEARS</span>
                                        <p className="text-sm text-gray-400 border-l border-gray-700 pl-3">{report.temporalProjection.past}</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-signal-orange font-mono block mb-1">T-PLUS 10 YEARS</span>
                                        <p className="text-sm text-gray-300 border-l border-signal-orange pl-3">{report.temporalProjection.future}</p>
                                    </div>
                                    <div className="pt-2 border-t border-gray-800 mt-2">
                                        <span className="text-[10px] text-gray-600 font-mono block mb-1">CONSTRUCTION STATUS</span>
                                        <span className={`text-xs font-bold px-2 py-0.5 ${report.constructionStatus.toLowerCase().includes('decay') ? 'bg-red-900/50 text-red-300' : 'bg-gray-800 text-white'}`}>
                                            {report.constructionStatus.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Business Intelligence & Persona */}
                        <div className="xl:col-span-7 space-y-6 order-1 xl:order-2">
                            
                            {/* Main Recommendation */}
                            <div className="bg-gradient-to-br from-anthro-gray/40 to-black border border-gray-700 p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <TrendingUp className="w-32 h-32" />
                                </div>
                                <h3 className="font-mono text-xs text-signal-orange mb-2 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 bg-signal-orange animate-pulse"></span>
                                    Strategic Opportunity
                                </h3>
                                <h4 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-none">
                                    {report.businessRecommendation.title}
                                </h4>
                                <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                                    {report.businessRecommendation.description}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-800 pt-6">
                                    <div>
                                        <span className="font-mono text-[10px] text-gray-500 uppercase block mb-2">The Ethnographic Logic</span>
                                        <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-gray-700 pl-4">
                                            {report.businessRecommendation.reasoning}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] text-gray-500 uppercase block mb-2">Marketing Angle</span>
                                        <div className="bg-anthro-gray/20 p-4 border border-gray-800">
                                            <p className="text-lg text-white font-serif italic mb-2">"{report.businessRecommendation.marketingCopy.slogan}"</p>
                                            <div className="flex flex-wrap gap-2">
                                                {report.businessRecommendation.marketingCopy.hashtags.map((tag, i) => (
                                                    <span key={i} className="text-[10px] text-signal-green font-mono">#{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Psychogeography (New) */}
                            <div className="flex gap-2 items-center overflow-x-auto pb-2">
                                {report.psychogeography.map((mood, i) => (
                                    <div key={i} className="flex-shrink-0 border border-gray-800 bg-black/50 px-4 py-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                                        <span className="text-xs font-mono uppercase tracking-widest text-gray-300">{mood}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-900/50 p-6 border border-gray-800 text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-20"></div>
                                    <span className="font-mono text-[10px] text-gray-500 block mb-2">VIABILITY</span>
                                    <span className={`text-4xl font-bold ${report.viabilityScore > 70 ? 'text-signal-green' : 'text-signal-orange'}`}>
                                        {report.viabilityScore}
                                    </span>
                                </div>
                                <div className="bg-gray-900/50 p-6 border border-gray-800 text-center relative overflow-hidden">
                                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-20"></div>
                                    <span className="font-mono text-[10px] text-gray-500 block mb-2">GENTRIFICATION</span>
                                    <span className="text-4xl font-bold text-white">
                                        {report.gentrificationIndex}
                                    </span>
                                </div>
                                <div className="bg-gray-900/50 p-6 border border-gray-800 text-center relative overflow-hidden">
                                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-20"></div>
                                    <span className="font-mono text-[10px] text-gray-500 block mb-2">SOCIAL SCORE</span>
                                    <span className="text-4xl font-bold text-white">
                                        {report.socialScore}
                                    </span>
                                </div>
                                <div className="bg-gray-900/50 p-6 border border-gray-800 text-center relative overflow-hidden">
                                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-20"></div>
                                    <span className="font-mono text-[10px] text-gray-500 block mb-2">CUES DETECTED</span>
                                    <span className="text-4xl font-bold text-white">
                                        {report.visualCues.length}
                                    </span>
                                </div>
                            </div>

                            {/* Color DNA */}
                             <div className="bg-anthro-gray/10 p-5 border border-gray-800">
                                <h3 className="font-mono text-xs text-gray-500 mb-3 flex items-center gap-2">
                                    <Activity className="w-3 h-3" />
                                    AESTHETIC DNA
                                </h3>
                                <div className="flex h-12 w-full">
                                    {report.colorPalette.map((color, i) => (
                                        <div key={i} className="flex-1 group relative cursor-help border-r border-black/50 last:border-0" style={{ backgroundColor: color }}>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-[10px] font-mono px-2 py-1 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none border border-gray-700">
                                                {color}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Persona Card */}
                                <div className="bg-anthro-gray/20 border border-gray-800 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4 border-b border-gray-800 pb-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-600">
                                                <User className="w-4 h-4 text-gray-300" />
                                            </div>
                                            <div>
                                                <h3 className="font-mono text-xs text-gray-500 uppercase">Target Persona</h3>
                                                <p className="text-lg font-bold text-white">{report.targetPersona.archetype}</p>
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <p className="font-serif italic text-gray-400 text-lg leading-relaxed text-center px-2">"{report.targetPersona.quote}"</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] text-gray-600 block mb-2 uppercase">Everyday Carry (EDC)</span>
                                        <div className="flex flex-wrap gap-2">
                                            {report.targetPersona.accessories.map((item, i) => (
                                                <span key={i} className="text-xs text-gray-300 bg-black/50 px-3 py-1 border border-gray-800 rounded-full">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Anti-Persona & Brand (New) */}
                                <div className="bg-anthro-gray/20 border border-gray-800 p-6 flex flex-col justify-between">
                                     <div className="mb-6">
                                        <div className="flex items-center gap-3 mb-4 border-b border-gray-800 pb-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-600">
                                                <AlertTriangle className="w-4 h-4 text-gray-300" />
                                            </div>
                                            <div>
                                                <h3 className="font-mono text-xs text-gray-500 uppercase">The Anti-Persona</h3>
                                                <p className="text-sm font-bold text-gray-400 leading-tight">{report.antiPersona}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-mono text-[10px] text-gray-600 block mb-2 uppercase flex items-center gap-2"><ShoppingBag className="w-3 h-3"/> Brand Affinity</span>
                                        <div className="flex flex-wrap gap-2">
                                            {report.brandAffinity.map((brand, i) => (
                                                <span key={i} className="text-sm font-bold text-white font-sans tracking-tight opacity-70 border-b border-gray-700">
                                                    {brand}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Demographics */}
                            <div className="bg-anthro-gray/20 border border-gray-800 p-6">
                                <h3 className="font-mono text-xs text-gray-500 mb-4 uppercase">Observed Demographics</h3>
                                <AnalysisChart data={report.observedDemographics} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;