import React from 'react';
import { Stethoscope, CheckSquare, Share2, Copy, AlertCircle, FileText, Check } from 'lucide-react';

export function DoctorChecklistTab({ checklistItems, onRemoveChecklistItem, language }) {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    let msg = `🩺 *Aushadhi Lens: Doctor Consultation Checklist*\n\n`;
    msg += `Patient Summary for Next Clinic Visit:\n\n`;
    
    checklistItems.forEach((item, index) => {
      msg += `${index + 1}. *${item.brandName}* (${item.activeSalt}):\n`;
      item.doctorChecklist.forEach(q => {
        msg += `   ❓ ${q}\n`;
      });
      msg += `\n`;
    });

    msg += `⚠️ *Note: Prepared as patient decision support. Please discuss these with your attending physician.*`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(msg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-4 shadow-soft border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Doctor Consultation Checklist
            </h2>
            <p className="text-xs text-slate-500">
              Clear questions for your doctor's next clinic visit.
            </p>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 transition active:scale-95 shadow-xs"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy / Share'}
        </button>
      </div>

      {/* List of Medicines and Questions */}
      <div className="space-y-3">
        {checklistItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center shadow-soft border border-slate-100">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-xs font-bold text-slate-700">No questions added yet</h3>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
              Scan a medicine strip in the Scanner tab and click "Add to Doctor Checklist" to generate questions.
            </p>
          </div>
        ) : (
          checklistItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="bg-white rounded-2xl p-4 shadow-soft border border-slate-100 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900">{item.brandName}</h3>
                  <span className="text-[11px] text-slate-500">{item.activeSalt}</span>
                </div>
                <button
                  onClick={() => onRemoveChecklistItem(item.id)}
                  className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Targeted Clarifications for Physician:
                </p>
                {item.doctorChecklist.map((q, qIdx) => (
                  <div key={qIdx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                    <CheckSquare className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      {q}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Responsible AI Compliance Note */}
      <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <b>Ground Rules Compliance:</b> Aushadhi Lens adheres strictly to the IEEE RGIPT mandate. It produces decision support insights to empower constructive patient-doctor dialogues, never replacing the medical judgment of licensed physicians.
        </p>
      </div>

    </div>
  );
}
