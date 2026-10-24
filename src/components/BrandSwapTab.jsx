import React, { useState } from 'react';
import { Repeat, ShieldCheck, AlertTriangle, ArrowRight, DollarSign, CheckCircle, Info } from 'lucide-react';
import { DRUG_DATABASE } from '../data/drugDatabase';

export function BrandSwapTab({ language }) {
  const [prescribedDrugId, setPrescribedDrugId] = useState(DRUG_DATABASE[1].id); // Dolo 650
  const [proposedSubstitute, setProposedSubstitute] = useState("Calpol 650");

  const prescribedDrug = DRUG_DATABASE.find(d => d.id === prescribedDrugId) || DRUG_DATABASE[0];

  // Common market substitute options
  const substituteOptions = [
    { name: "Calpol 650", salt: "Paracetamol", strength: "650mg", safeFor: "paracetamol", price: "₹30" },
    { name: "Crocin 650", salt: "Paracetamol", strength: "650mg", safeFor: "paracetamol", price: "₹33" },
    { name: "Jan Aushadhi Paracetamol", salt: "Paracetamol", strength: "650mg", safeFor: "paracetamol", price: "₹12" },
    { name: "Pan 40", salt: "Pantoprazole", strength: "40mg", safeFor: "pantoprazole", price: "₹130" },
    { name: "Pantodac 40", salt: "Pantoprazole", strength: "40mg", safeFor: "pantoprazole", price: "₹135" },
    { name: "Jan Aushadhi Pantoprazole", salt: "Pantoprazole", strength: "40mg", safeFor: "pantoprazole", price: "₹28" },
    { name: "Gluconorm 500", salt: "Metformin", strength: "500mg", safeFor: "metformin", price: "₹45" },
    { name: "Moxikind-CV 625", salt: "Amoxicillin + Clavulanate", strength: "625mg", safeFor: "amoxicillin", price: "₹85" },
    { name: "Okacet 10", salt: "Cetirizine", strength: "10mg", safeFor: "cetirizine", price: "₹22" }
  ];

  const currentSub = substituteOptions.find(s => s.name === proposedSubstitute) || substituteOptions[0];
  const isMatch = currentSub.safeFor === prescribedDrug.id;

  return (
    <div className="space-y-4 pb-20">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-4 shadow-soft border border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
            <Repeat className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Chemist Brand-Swap Auditor
            </h2>
            <p className="text-xs text-slate-500">
              Verify if the substitute offered by your local chemist is bioequivalent.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Selector Matrix */}
      <div className="bg-white rounded-2xl p-4 shadow-soft border border-slate-100 space-y-3">
        
        {/* Prescribed Medicine */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            1. Prescribed Brand Written by Doctor:
          </label>
          <select
            value={prescribedDrugId}
            onChange={(e) => setPrescribedDrugId(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {DRUG_DATABASE.map(d => (
              <option key={d.id} value={d.id}>
                {d.brandName} — {d.activeSalt}
              </option>
            ))}
          </select>
        </div>

        {/* Chemist Proposed Swap */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            2. Brand Proposed by Chemist / Medical Store:
          </label>
          <select
            value={proposedSubstitute}
            onChange={(e) => setProposedSubstitute(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {substituteOptions.map(s => (
              <option key={s.name} value={s.name}>
                {s.name} ({s.salt} {s.strength}) — {s.price}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Comparison Audit Results */}
      <div className={`rounded-2xl p-4 shadow-soft border ${
        isMatch 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
          : 'bg-rose-50 border-rose-200 text-rose-950'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          {isMatch ? (
            <>
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-extrabold text-emerald-900">
                ✅ 100% Bioequivalent: Safe to Accept
              </h3>
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h3 className="text-sm font-extrabold text-rose-900">
                ❌ Salt Mismatch: Do Not Accept
              </h3>
            </>
          )}
        </div>

        {isMatch ? (
          <div className="space-y-2 text-xs">
            <p className="text-emerald-900 font-medium">
              Both <b>{prescribedDrug.brandName}</b> and <b>{currentSub.name}</b> share the exact identical active compound:
            </p>
            <div className="p-2.5 rounded-lg bg-white/80 border border-emerald-200/60 font-mono text-[11px] text-emerald-900 font-semibold">
              Active Salt: {prescribedDrug.activeSalt} ({prescribedDrug.strength})
            </div>
            <p className="text-emerald-800">
              <b>Pharmacological Guidance:</b> Therapeutically interchangeable. The clinical therapeutic window and absorption rate are equivalent under CDSCO generic equivalence standards.
            </p>
            <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] font-bold text-emerald-900">
              <span>💰 Generic Savings:</span>
              <span className="bg-emerald-200 px-2 py-0.5 rounded text-emerald-950">
                {prescribedDrug.genericSavings}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-xs text-rose-900">
            <p className="font-medium">
              <b>Caution:</b> The chemist's proposed brand contains <b>{currentSub.salt}</b>, whereas the doctor prescribed <b>{prescribedDrug.saltOnly}</b>.
            </p>
            <p className="text-rose-800">
              Do not accept this substitution without direct written approval from your prescribing doctor.
            </p>
          </div>
        )}
      </div>

      {/* Information Box */}
      <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-700 text-xs flex items-start gap-2">
        <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <b>Indian Generic Drug Rule (MCI Guidelines):</b> Pharmacists in India are legally permitted to substitute branded formulations with generic equivalents of identical active chemical salts and strength, providing significant cost relief for chronic patients.
        </p>
      </div>

    </div>
  );
}
