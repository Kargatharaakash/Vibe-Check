
import React, { useState, useRef, useEffect } from 'react';
import { AnalysisStatus, EthnographyReport, FileData, HistoryItem } from './types';
import { analyzeVibe, processFileToBase64 } from './services/geminiService';
import { LoadingTerminal } from './components/LoadingTerminal';
import { NoiseOverlay } from './components/NoiseOverlay';
import { HistorySidebar } from './components/HistorySidebar';
import { DEMO_REPORT, DEMO_IMAGE_URL } from './services/demoData';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { PdfReportTemplate } from './components/PdfReportTemplate';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [report, setReport] = useState<EthnographyReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load history on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('vibe_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const addToHistory = (reportToAdd: EthnographyReport, fileToAdd: FileData) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      report: reportToAdd,
      thumbnail: fileToAdd.base64 ? `data:${fileToAdd.mimeType};base64,${fileToAdd.base64}` : '' 
    };

    if (newItem.thumbnail.length > 2000000) {
      newItem.thumbnail = ''; 
    }

    const updatedHistory = [newItem, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('vibe_history', JSON.stringify(updatedHistory));
  };
  
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
      const base64 = await processFileToBase64(fileData.file);
      const updatedFileData = { ...fileData, base64 };
      setFileData(updatedFileData);

      const result = await analyzeVibe(fileData.file, selectedLanguage);
      setReport(result);
      setStatus(AnalysisStatus.COMPLETE);
      
      addToHistory(result, updatedFileData);

    } catch (err) {
      console.error(err);
      setError("Analysis failed. The ethnography engine encountered an anomaly.");
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const loadDemo = async () => {
    setStatus(AnalysisStatus.PROCESSING);
    setTimeout(() => {
      const file = new File([""], "demo_shoreditch.jpg", { type: "image/jpeg" });
      const demoFileData = {
        file,
        previewUrl: DEMO_IMAGE_URL,
        base64: "", 
        mimeType: "image/jpeg"
      };
      setFileData(demoFileData);
      setReport(DEMO_REPORT);
      setStatus(AnalysisStatus.COMPLETE);
    }, 2500);
  };

  const loadFromHistory = (item: HistoryItem) => {
    const file = new File([""], "history_item", { type: "image/jpeg" });
    setFileData({
      file,
      previewUrl: item.thumbnail || '', 
      base64: item.thumbnail?.split(',')[1] || '',
      mimeType: "image/jpeg" 
    });
    setReport(item.report);
    setStatus(AnalysisStatus.COMPLETE);
    setShowHistory(false);
  };

  const reset = () => {
    setFileData(null);
    setReport(null);
    setStatus(AnalysisStatus.IDLE);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExportPDF = async () => {
    const pages = document.querySelectorAll('.pdf-page');
    if (!pages.length) return;
    
    setIsExporting(true);

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [1000, 1414] 
      });

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        const canvas = await html2canvas(page, {
          scale: 2,
          backgroundColor: '#0a0a0a',
          useCORS: true,
          logging: false,
          allowTaint: true
        });

        const imgData = canvas.toDataURL('image/png');
        
        if (i > 0) {
          pdf.addPage([1000, 1414]);
        }
        pdf.addImage(imgData, 'PNG', 0, 0, 1000, 1414);
      }

      pdf.save(`VibeOS_Dossier_${Date.now()}.pdf`);

    } catch (err) {
      console.error("PDF Export failed:", err);
      setError("Failed to generate PDF visualization.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-anthro-black text-anthro-light selection:bg-signal-orange selection:text-anthro-black overflow-x-hidden relative">
      <NoiseOverlay />
      
      <HistorySidebar 
         isOpen={showHistory} 
         onClose={() => setShowHistory(false)} 
         history={history} 
         onLoad={loadFromHistory} 
      />

      {/* HIDDEN PDF TEMPLATE (Off-screen) */}
      {report && fileData && (
        <div className="fixed top-0 left-[-9999px] z-[-100] overflow-hidden">
          <PdfReportTemplate report={report} fileData={fileData} />
        </div>
      )}
      
      {/* State: IDLE / UPLOAD */}
      {!report && status !== AnalysisStatus.ANALYZING && status !== AnalysisStatus.PROCESSING && (
        <LandingPage 
          fileData={fileData}
          error={error}
          fileInputRef={fileInputRef}
          onFileSelect={handleFileSelect}
          onStartAnalysis={startAnalysis}
          onLoadDemo={loadDemo}
          onShowHistory={() => setShowHistory(true)}
          selectedLanguage={selectedLanguage}
          onLanguageSelect={setSelectedLanguage}
          onReset={reset}
        />
      )}

      {/* State: PROCESSING */}
      {status === AnalysisStatus.PROCESSING && (
        <div className="fixed inset-0 z-50 bg-anthro-black flex flex-col items-center justify-center">
          <LoadingTerminal />
        </div>
      )}

      {/* State: REPORT (DASHBOARD MODE) */}
      {status === AnalysisStatus.COMPLETE && report && fileData && (
        <div className="h-screen flex flex-col overflow-hidden animate-in fade-in duration-1000">
          <Header 
            onShowHistory={() => setShowHistory(true)}
            onExportPDF={handleExportPDF}
            isExporting={isExporting}
            onReset={reset}
          />
          <Dashboard report={report} fileData={fileData} />
        </div>
      )}
    </div>
  );
};

export default App;
