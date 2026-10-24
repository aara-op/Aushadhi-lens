import React from 'react';
import { Pill, ShieldCheck, Volume2, Globe, Info, Sparkles, Smartphone } from 'lucide-react';

export function Header({ language, onToggleLanguage, onOpenGovernance, isFullscreen, onToggleFullscreen }) {
  // Current time for realistic mobile status bar
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      {/* Native-style mobile status bar */}
      <div className="flex items-center justify-between px-6 py-1.5 text-xs text-slate-500 font-medium select-none bg-slate-50/70 border-b border-slate-100/50">
        <span className="font-semibold text-slate-800">{timeStr}</span>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
            100% On-Device AI
          </span>
          <button 
            onClick={onToggleFullscreen}
            title="Toggle Desktop / Mobile Preview Mode"
            className="hidden md:flex items-center text-slate-400 hover:text-slate-700 transition p-0.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20">
            <Pill className="w-5 h-5 transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-slate-900 text-lg tracking-tight">Aushadhi Lens</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                IEEE QUAL-AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Medication Safety & Decision Support
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Vernacular Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition active:scale-95 border border-slate-200/80 shadow-xs"
            title="Switch Language (English / हिंदी)"
          >
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'hi' ? 'हिंदी (Hindi)' : 'English'}</span>
          </button>

          {/* Responsible AI Governance Modal Button */}
          <button
            onClick={onOpenGovernance}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 flex items-center justify-center transition active:scale-95 border border-slate-200/80 shadow-xs"
            title="Responsible AI & Governance Details"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
