import React from 'react';
import { ShieldCheck, X, CheckCircle, AlertTriangle, Eye, Lock, FileCode, Award } from 'lucide-react';

export function ResponsibleAIModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center border border-teal-200">
              <Award className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Responsible AI & Governance
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                IEEE RGIPT QUAL-AI-01 Compliance Architecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 text-xs text-slate-700">
          
          {/* Section 1: Decision Support vs Replacement */}
          <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200/80">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-teal-700" />
              <h3 className="font-extrabold text-teal-950 text-xs">
                1. Decision Support, Not Autonomous Replacement
              </h3>
            </div>
            <p className="text-slate-700 leading-relaxed">
              In full compliance with IEEE Ground Rule #1, Aushadhi Lens never diagnoses illnesses or autonomously alters prescriptions. All outputs are strictly framed as informational safety verification, meal timing guidance, and doctor question checklists.
            </p>
          </div>

          {/* Section 2: Explainability & Visual Provenance */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-slate-700" />
              <h3 className="font-extrabold text-slate-900 text-xs">
                2. Explainability & Visual Provenance
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Outputs are never ungrounded black boxes. The system projects bounding boxes directly onto physical packaging, highlighting active salt lines with calculated confidence metrics grounded in official CDSCO Indian pharmacopeia.
            </p>
          </div>

          {/* Section 3: Privacy by Design */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-emerald-700" />
              <h3 className="font-extrabold text-emerald-950 text-xs">
                3. Absolute Privacy: 100% On-Device Processing
              </h3>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Camera feeds, medicine images, and patient queries are processed directly on the client device. Zero patient data, images, or prescription records are ever transmitted to or stored on external cloud servers.
            </p>
          </div>

          {/* Section 4: Uncertainty & Rejection Policy */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <h3 className="font-extrabold text-amber-950 text-xs">
                4. Uncertainty Refusal (Anti-Hallucination)
              </h3>
            </div>
            <p className="text-slate-700 leading-relaxed">
              If image capture is blurry, torn, or OCR confidence falls below 65%, the model refuses to guess and triggers an explicit safety warning: <i>"Image text illegible. Please consult your licensed chemist directly."</i>
            </p>
          </div>

          {/* Section 5: Grounded Formulary */}
          <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80">
            <div className="flex items-center gap-2 mb-1">
              <FileCode className="w-4 h-4 text-blue-700" />
              <h3 className="font-extrabold text-blue-950 text-xs">
                5. Grounded CDSCO Pharmacopeia
              </h3>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Food timing rules and contraindications are deterministically mapped against India's National List of Essential Medicines (NLEM), preventing dangerous dosage hallucinations.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition active:scale-95"
          >
            Understood & Close
          </button>
        </div>

      </div>
    </div>
  );
}
