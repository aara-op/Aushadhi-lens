import React from 'react';
import { Clock, Sun, Sunset, Moon, Coffee, Share2, Check, AlertCircle, Trash2 } from 'lucide-react';

export function ScheduleTab({ scheduleList, onRemoveScheduleItem, language }) {
  // Pre-configured slots
  const slots = [
    {
      id: "morning",
      title: "Morning (सुबह)",
      subtext: "Empty Stomach / Before Breakfast",
      icon: Sun,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      items: scheduleList.filter(d => d.timingBadge?.includes("EMPTY") || d.id === "pantoprazole")
    },
    {
      id: "afternoon",
      title: "Afternoon (दोपहर)",
      subtext: "With or Immediately After Lunch",
      icon: Coffee,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      items: scheduleList.filter(d => d.timingBadge?.includes("MEALS") || d.id === "metformin")
    },
    {
      id: "night",
      title: "Night / Bedtime (रात)",
      subtext: "After Dinner or Right Before Sleep",
      icon: Moon,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      items: scheduleList.filter(d => d.timingBadge?.includes("BEDTIME") || d.timingBadge?.includes("NIGHT") || d.id === "cetirizine" || d.id === "paracetamol")
    }
  ];

  const handleShareSchedule = () => {
    let text = `📋 *Aushadhi Lens: My 24-Hour Medication Routine*\n\n`;
    slots.forEach(slot => {
      text += `🕒 *${slot.title}* (${slot.subtext}):\n`;
      if (slot.items.length === 0) {
        text += `  • No medicines scheduled\n`;
      } else {
        slot.items.forEach(item => {
          text += `  • *${item.brandName}* (${item.activeSalt}) - ${item.timingDetails}\n`;
        });
      }
      text += `\n`;
    });
    text += `🛡️ *Generated via Aushadhi Lens (Decision Support Only - Consult Doctor)*`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert("24-Hour Medication Schedule copied to clipboard! You can paste it into WhatsApp.");
    }
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-4 shadow-soft border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
            24-Hour Medication Routine
          </h2>
          <p className="text-xs text-slate-500">
            Chrono-pharmacology mapping to prevent food & drug clashes.
          </p>
        </div>
        <button
          onClick={handleShareSchedule}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 flex items-center gap-1.5 transition active:scale-95"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share Routine
        </button>
      </div>

      {/* Slots List */}
      <div className="space-y-3">
        {slots.map((slot) => {
          const Icon = slot.icon;
          return (
            <div key={slot.id} className="bg-white rounded-2xl p-4 shadow-soft border border-slate-100">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${slot.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900">{slot.title}</h3>
                  <span className="text-[11px] text-slate-500">{slot.subtext}</span>
                </div>
                <span className="ml-auto text-xs font-mono font-bold text-slate-400">
                  {slot.items.length} {slot.items.length === 1 ? 'dose' : 'doses'}
                </span>
              </div>

              {slot.items.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2">
                  No medicines currently assigned to this time window.
                </p>
              ) : (
                <div className="space-y-2">
                  {slot.items.map((item, idx) => (
                    <div 
                      key={`${item.id}-${idx}`}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 group hover:border-teal-300 transition"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-extrabold text-slate-900">{item.brandName}</h4>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800">
                            {item.strength}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                          {item.activeSalt}
                        </p>
                        <p className="text-[11px] text-teal-800 font-semibold mt-1">
                          👉 {item.timingDetails}
                        </p>
                      </div>

                      <button
                        onClick={() => onRemoveScheduleItem(item.id)}
                        className="text-slate-400 hover:text-rose-500 transition p-1"
                        title="Remove from routine"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety Notice */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-900 text-xs flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p>
          <b>Responsible AI Guardrail:</b> Never alter insulin dosages, blood thinners, or critical heart medication schedules without direct approval from your primary physician.
        </p>
      </div>

    </div>
  );
}
