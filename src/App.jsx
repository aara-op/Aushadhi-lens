import React, { useState } from 'react';
import { Camera, Calendar, Repeat, Stethoscope, Maximize2, Minimize2 } from 'lucide-react';
import { Header } from './components/Header';
import { ScannerTab } from './components/ScannerTab';
import { ScheduleTab } from './components/ScheduleTab';
import { BrandSwapTab } from './components/BrandSwapTab';
import { DoctorChecklistTab } from './components/DoctorChecklistTab';
import { ResponsibleAIModal } from './components/ResponsibleAIModal';
import { DRUG_DATABASE } from './data/drugDatabase';

export function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'
  const [isGovernanceOpen, setIsGovernanceOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // User state across tabs
  const [scheduleList, setScheduleList] = useState([
    DRUG_DATABASE[0], // Pantocid 40 (Morning)
    DRUG_DATABASE[2], // Glycomet 500 (Noon)
    DRUG_DATABASE[4]  // Cetzine 10 (Bedtime)
  ]);

  const [checklistItems, setChecklistItems] = useState([
    DRUG_DATABASE[0],
    DRUG_DATABASE[1]
  ]);

  const handleToggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleAddToSchedule = (drug) => {
    if (!scheduleList.some(d => d.id === drug.id)) {
      setScheduleList(prev => [...prev, drug]);
    }
  };

  const handleRemoveScheduleItem = (drugId) => {
    setScheduleList(prev => prev.filter(d => d.id !== drugId));
  };

  const handleAddToDoctorChecklist = (drug) => {
    if (!checklistItems.some(d => d.id === drug.id)) {
      setChecklistItems(prev => [...prev, drug]);
    }
  };

  const handleRemoveChecklistItem = (drugId) => {
    setChecklistItems(prev => prev.filter(d => d.id !== drugId));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isFullscreen ? 'bg-slate-900 p-0' : 'bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-2 sm:p-6'}`}>
      
      {/* Mobile Chassis Device Container on Desktop */}
      <div className={`w-full transition-all duration-300 relative flex flex-col ${
        isFullscreen 
          ? 'max-w-none h-screen rounded-none shadow-none bg-slate-50' 
          : 'max-w-[460px] h-[92vh] max-h-[920px] rounded-[44px] shadow-phone border-[8px] border-slate-800/90 overflow-hidden bg-slate-50'
      }`}>
        
        {/* Dynamic Island on Desktop frame */}
        {!isFullscreen && (
          <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-black rounded-full z-50 pointer-events-none flex items-center justify-end px-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/80 mr-1"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-950/80"></span>
          </div>
        )}

        {/* Top App Header */}
        <Header 
          language={language}
          onToggleLanguage={handleToggleLanguage}
          onOpenGovernance={() => setIsGovernanceOpen(true)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 pt-3.5 pb-6">
          {activeTab === 'scanner' && (
            <ScannerTab 
              language={language}
              onAddToSchedule={handleAddToSchedule}
              onAddToDoctorChecklist={handleAddToDoctorChecklist}
            />
          )}

          {activeTab === 'schedule' && (
            <ScheduleTab 
              scheduleList={scheduleList}
              onRemoveScheduleItem={handleRemoveScheduleItem}
              language={language}
            />
          )}

          {activeTab === 'brand-swap' && (
            <BrandSwapTab 
              language={language}
            />
          )}

          {activeTab === 'doctor' && (
            <DoctorChecklistTab 
              checklistItems={checklistItems}
              onRemoveChecklistItem={handleRemoveChecklistItem}
              language={language}
            />
          )}
        </main>

        {/* Bottom Mobile Tab Bar */}
        <nav className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 shadow-lg">
          <div className="grid grid-cols-4 gap-1">
            
            {/* Tab 1: Scanner */}
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition ${
                activeTab === 'scanner' 
                  ? 'text-teal-700 font-extrabold bg-teal-50/70' 
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <Camera className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">Scanner</span>
            </button>

            {/* Tab 2: 24h Schedule */}
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition relative ${
                activeTab === 'schedule' 
                  ? 'text-teal-700 font-extrabold bg-teal-50/70' 
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <Calendar className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">Schedule</span>
              {scheduleList.length > 0 && (
                <span className="absolute top-1 right-3 w-4 h-4 bg-teal-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {scheduleList.length}
                </span>
              )}
            </button>

            {/* Tab 3: Chemist Swap */}
            <button
              onClick={() => setActiveTab('brand-swap')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition ${
                activeTab === 'brand-swap' 
                  ? 'text-teal-700 font-extrabold bg-teal-50/70' 
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <Repeat className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">Chemist Swap</span>
            </button>

            {/* Tab 4: Doctor Checklist */}
            <button
              onClick={() => setActiveTab('doctor')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition relative ${
                activeTab === 'doctor' 
                  ? 'text-teal-700 font-extrabold bg-teal-50/70' 
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <Stethoscope className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">Doctor Note</span>
              {checklistItems.length > 0 && (
                <span className="absolute top-1 right-3 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {checklistItems.length}
                </span>
              )}
            </button>

          </div>
        </nav>

        {/* Responsible AI Modal */}
        <ResponsibleAIModal 
          isOpen={isGovernanceOpen}
          onClose={() => setIsGovernanceOpen(false)}
        />

      </div>

    </div>
  );
}

export default App;
