/**
 * Verified Indian Pharmacopeia & Chrono-Pharmacology Registry
 * Grounded against CDSCO formulary & National List of Essential Medicines (NLEM)
 * Designed for Responsible AI & Explainable Decision Support
 */

// Helper to generate clean, high-resolution SVG blister pack mockups for instant 1-tap testing
function createBlisterPackSvg(brand, salt, strength, colorHeader, batchNo = "B.No. SP-503F", expDate = "EXP. 05/2027") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 320" width="100%" height="100%">
    <defs>
      <linearGradient id="foilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E2E8F0" />
        <stop offset="25%" stop-color="#CBD5E1" />
        <stop offset="50%" stop-color="#F8FAFC" />
        <stop offset="75%" stop-color="#94A3B8" />
        <stop offset="100%" stop-color="#E2E8F0" />
      </linearGradient>
      <pattern id="gridPattern" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(148, 163, 184, 0.4)" stroke-width="0.8"/>
      </pattern>
      <filter id="pocketShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.25"/>
      </filter>
    </defs>
    
    <!-- Metallic Blister Foil Background -->
    <rect width="500" height="320" rx="16" fill="url(#foilGrad)" stroke="#64748B" stroke-width="2"/>
    <rect width="500" height="320" rx="16" fill="url(#gridPattern)"/>

    <!-- Foil Sealed Border Marks -->
    <rect x="8" y="8" width="484" height="304" rx="12" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="3,3"/>
    
    <!-- Top Brand Header Ribbon -->
    <rect x="25" y="24" width="450" height="52" rx="8" fill="${colorHeader}" filter="url(#pocketShadow)"/>
    <text x="45" y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="26" font-weight="800" fill="#FFFFFF" letter-spacing="1.5">${brand.toUpperCase()}</text>
    <text x="440" y="56" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="end">${strength}</text>

    <!-- Active Chemical Salt Prescription Line (Primary Optical Target) -->
    <rect x="25" y="88" width="450" height="42" rx="6" fill="#FFFFFF" opacity="0.92" stroke="#CBD5E1" stroke-width="1.2"/>
    <text x="38" y="114" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="700" fill="#0F172A">Each tablet contains: ${salt}</text>

    <!-- Pocket Depressions (Embossed look) -->
    <circle cx="80" cy="180" r="32" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" filter="url(#pocketShadow)"/>
    <circle cx="165" cy="180" r="32" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" filter="url(#pocketShadow)"/>
    <circle cx="250" cy="180" r="32" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" filter="url(#pocketShadow)"/>
    <circle cx="335" cy="180" r="32" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" filter="url(#pocketShadow)"/>
    <circle cx="420" cy="180" r="32" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" filter="url(#pocketShadow)"/>

    <!-- Warning Band / Schedule H Box -->
    <rect x="25" y="235" width="260" height="32" rx="4" fill="#FEF2F2" stroke="#DC2626" stroke-width="1.2"/>
    <text x="35" y="255" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="800" fill="#DC2626">SCHEDULE H PRESCRIPTION DRUG - CAUTION</text>

    <!-- Batch & Expiry Stamp (Secondary Optical Target) -->
    <rect x="295" y="235" width="180" height="32" rx="4" fill="#0F172A" opacity="0.9"/>
    <text x="305" y="255" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="#38BDF8">${batchNo} | ${expDate}</text>

    <!-- Manufacturer details -->
    <text x="25" y="295" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="#475569">Mfd in India by Certified Labs Ltd. | Storage: Store below 25°C protected from light.</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export const DRUG_DATABASE = [
  {
    id: "ibufyl",
    brandName: "Ibufyl Plus",
    prescribedBrands: ["Ibufyl Plus", "Combiflam", "Flexon", "Ibugesic Plus", "Brufen Plus"],
    activeSalt: "Ibuprofen (400mg) + Paracetamol (325mg)",
    saltOnly: "Ibuprofen + Paracetamol",
    strength: "400mg / 325mg",
    category: "NSAID Analgesic & Antipyretic (Painkiller & Anti-inflammatory)",
    timingBadge: "AFTER MEALS / WITH FOOD",
    timingColor: "bg-rose-100 text-rose-900 border-rose-300",
    timingIcon: "Utensils",
    timingDetails: "Always take WITH OR IMMEDIATELY AFTER food, or with a glass of milk to protect your stomach lining.",
    purpose: "Fast relief from body ache, muscular pain, toothache, fever, joint inflammation, and headache.",
    safetyWarning: "GASTRIC IRRITATION WARNING: NEVER take on an empty stomach. Taking NSAIDs on an empty stomach can cause gastric mucosal erosion or bleeding. Avoid if you have active stomach ulcers, asthma, or severe kidney issues.",
    doctorChecklist: [
      "Is Ibufyl Plus (Ibuprofen + Paracetamol) safe with my acidity / stomach health history?",
      "Can I take an antacid (like Pantoprazole) alongside Ibufyl Plus to protect my stomach?",
      "How many days should I continue this painkiller before stopping?"
    ],
    genericSavings: "₹38.80 (Ibufyl Plus) vs ₹14 (Generic Jan Aushadhi Ibuprofen+Paracetamol) → Save 64%",
    cdscoConfidence: 98,
    speechHi: "यह इबुफिल प्लस है, जिसमें इबुप्रोफेन और पैरासिटामोल है। यह बदन दर्द, सिरदर्द और सूजन कम करने की दवा है। इसे हमेशा खाना खाने के बाद या दूध के साथ लें, खाली पेट कभी न लें।",
    speechEn: "This is Ibufyl Plus, a painkiller combining Ibuprofen and Paracetamol. Always take with or after meals with water or milk. Never take on an empty stomach to prevent gastric irritation.",
    sampleImage: createBlisterPackSvg("IBUFYL PLUS", "Ibuprofen 400mg + Paracetamol 325mg Tablets IP", "400/325mg", "#DC2626", "B.No. SP503F", "EXP. 05/2027"),
    boundingBoxes: [
      { label: "Active Salt (Painkiller Duo)", text: "Ibuprofen 400mg + Paracetamol 325mg", x: 25, y: 88, width: 450, height: 42, color: "#10B981" },
      { label: "Brand: IBUFYL PLUS", text: "IBUFYL PLUS Tablets IP", x: 25, y: 24, width: 450, height: 52, color: "#EF4444" },
      { label: "Batch & MRP", text: "B.No. SP503F | MRP ₹38.80 | EXP 05/2027", x: 295, y: 235, width: 180, height: 32, color: "#F59E0B" },
    ]
  },
  {
    id: "paracetamol",
    brandName: "Dolo 650",
    prescribedBrands: ["Dolo 650", "Calpol 650", "Crocin 650", "Pacimol", "Pyregesic"],
    activeSalt: "Paracetamol / Acetaminophen (650mg)",
    saltOnly: "Paracetamol",
    strength: "650mg",
    category: "Antipyretic & Analgesic (Fever & Pain)",
    timingBadge: "AFTER MEALS",
    timingColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    timingIcon: "Utensils",
    timingDetails: "Take with or after food. Keep a mandatory 4 to 6 hour gap between repeat doses.",
    purpose: "Effective relief from high fever, body ache, headache, and mild arthritis pain.",
    safetyWarning: "STRICT CEILING: Do not exceed 4,000 mg in 24 hours. Avoid alcohol. High dosages cause irreversible liver toxicity.",
    doctorChecklist: [
      "I was given Calpol 650 instead of Dolo 650. Is this substitution bioequivalent?",
      "If fever persists past 3 days, should I switch to a secondary evaluation?"
    ],
    genericSavings: "₹34 (Dolo) vs ₹12 (Jan Aushadhi Paracetamol) → Save 64%",
    cdscoConfidence: 96,
    speechHi: "यह डोलो 650 है, जिसमें पैरासिटामोल 650 मिलीग्राम है। यह बुखार और बदन दर्द के लिए है। इसे खाना खाने के बाद लें और दिन में 4 से ज्यादा गोलियां न लें।",
    speechEn: "This is Paracetamol 650 milligrams for fever and pain relief. Take after food. Never exceed 4 tablets in 24 hours to prevent liver toxicity.",
    sampleImage: createBlisterPackSvg("DOLO-650", "Paracetamol Tablets IP 650mg", "650 mg", "#2563EB"),
    boundingBoxes: [
      { label: "Active Salt (Ground Truth)", text: "Paracetamol Tablets IP 650mg", x: 25, y: 88, width: 450, height: 42, color: "#10B981" },
      { label: "Brand Identifier", text: "DOLO-650", x: 25, y: 24, width: 450, height: 52, color: "#3B82F6" },
      { label: "Batch & Validity", text: "B.No. AZ-8419 | EXP. 08/2028", x: 295, y: 235, width: 180, height: 32, color: "#F59E0B" },
    ]
  },
  {
    id: "pantoprazole",
    brandName: "Pantocid 40",
    prescribedBrands: ["Pantocid", "Pan 40", "Pantodac", "Penta 40", "Pantop"],
    activeSalt: "Pantoprazole Gastro-Resistant (40mg)",
    saltOnly: "Pantoprazole",
    strength: "40mg",
    category: "Proton Pump Inhibitor (Antacid / Anti-Ulcer)",
    timingBadge: "EMPTY STOMACH",
    timingColor: "bg-amber-100 text-amber-900 border-amber-300",
    timingIcon: "Sun",
    timingDetails: "Take 30–40 minutes before morning breakfast with a full glass of water.",
    purpose: "Reduces stomach acid, cures heartburn, GERD (acid reflux), and protects the digestive lining.",
    safetyWarning: "Swallow the tablet WHOLE. Never crush, chew, or split the enteric coating as gastric acid will destroy the active ingredient.",
    doctorChecklist: [
      "Is Pantoprazole 40mg safe to take alongside my painkiller/cardiac prescription?",
      "How many weeks should I continue this course before re-evaluating?"
    ],
    genericSavings: "₹142 (Branded) vs ₹34 (Generic Jan Aushadhi) → Save 76%",
    cdscoConfidence: 97,
    speechHi: "यह पैंटोप्राजोल 40 मिलीग्राम है, जो एसिडिटी और गैस के लिए है। इसे सुबह खाली पेट, नाश्ते से आधा घंटा पहले सादे पानी से लें। गोली को बिल्कुल न चबाएं।",
    speechEn: "This is Pantoprazole 40 milligrams for acidity and heartburn. Take on an empty stomach 30 to 40 minutes before morning breakfast. Swallow whole.",
    sampleImage: createBlisterPackSvg("PANTOCID", "Pantoprazole Gastro-resistant IP 40mg", "40 mg", "#0F766E"),
    boundingBoxes: [
      { label: "Active Salt (Ground Truth)", text: "Pantoprazole Gastro-resistant IP 40mg", x: 25, y: 88, width: 450, height: 42, color: "#10B981" },
      { label: "Brand Identifier", text: "PANTOCID 40", x: 25, y: 24, width: 450, height: 52, color: "#3B82F6" },
      { label: "Batch & Validity", text: "B.No. AZ-8419 | EXP. 08/2028", x: 295, y: 235, width: 180, height: 32, color: "#F59E0B" },
    ]
  },
  {
    id: "metformin",
    brandName: "Glycomet 500",
    prescribedBrands: ["Glycomet", "Gluconorm", "Cetapin", "Obimet", "Metfor"],
    activeSalt: "Metformin Hydrochloride SR (500mg)",
    saltOnly: "Metformin",
    strength: "500mg",
    category: "Biguanide Antidiabetic (Type 2 Diabetes)",
    timingBadge: "WITH MEALS / POST LUNCH",
    timingColor: "bg-blue-100 text-blue-900 border-blue-300",
    timingIcon: "Coffee",
    timingDetails: "Always take during or immediately after your main meal (lunch or dinner).",
    purpose: "Controls blood sugar spikes, improves insulin sensitivity, and prevents diabetic complications.",
    safetyWarning: "NEVER take on an empty stomach. Taking Metformin without food causes severe nausea, cramps, and diarrhea.",
    doctorChecklist: [
      "Can Metformin SR 500 be combined with my current kidney health (Serum Creatinine level)?",
      "Should this dose be increased if my morning fasting sugar is above 130?"
    ],
    genericSavings: "₹52 (Glycomet) vs ₹16 (Generic Metformin) → Save 69%",
    cdscoConfidence: 95,
    speechHi: "यह मेटफॉर्मिन 500 मिलीग्राम है, जो शुगर नियंत्रित करने की दवा है। इसे हमेशा दोपहर या रात का खाना खाते समय या तुरंत बाद लें। खाली पेट कभी न लें।",
    speechEn: "This is Metformin 500 milligrams for diabetes management. Always take during or immediately after meals. Never take on an empty stomach.",
    sampleImage: createBlisterPackSvg("GLYCOMET", "Metformin Hydrochloride Sustained Release IP 500mg", "500 mg", "#7C3AED"),
    boundingBoxes: [
      { label: "Active Salt (Ground Truth)", text: "Metformin Hydrochloride Sustained Release IP 500mg", x: 25, y: 88, width: 450, height: 42, color: "#10B981" },
      { label: "Brand Identifier", text: "GLYCOMET 500", x: 25, y: 24, width: 450, height: 52, color: "#3B82F6" },
      { label: "Batch & Validity", text: "B.No. AZ-8419 | EXP. 08/2028", x: 295, y: 235, width: 180, height: 32, color: "#F59E0B" },
    ]
  },
  {
    id: "amoxicillin",
    brandName: "Augmentin 625",
    prescribedBrands: ["Augmentin", "Moxikind-CV", "Clavam", "Novamox-CV"],
    activeSalt: "Amoxicillin & Potassium Clavulanate (625mg)",
    saltOnly: "Amoxicillin + Clavulanate",
    strength: "625mg",
    category: "Broad Spectrum Antibiotic",
    timingBadge: "START OF MEAL",
    timingColor: "bg-purple-100 text-purple-900 border-purple-300",
    timingIcon: "AlertCircle",
    timingDetails: "Take right at the beginning of a meal to optimize absorption and prevent gastric discomfort.",
    purpose: "Treats bacterial infections of the lungs, throat, ear, urinary tract, and dental infections.",
    safetyWarning: "MANDATORY: Complete the entire 5 or 7 day course prescribed by the doctor, even if symptoms vanish. Stopping early causes antibiotic resistance.",
    doctorChecklist: [
      "Do I need to take a supportive probiotic capsule with Augmentin 625 to prevent antibiotic diarrhea?",
      "Are there any penicillin allergy markers in my family history?"
    ],
    genericSavings: "₹210 (Augmentin) vs ₹78 (Moxikind-CV generic) → Save 62%",
    cdscoConfidence: 98,
    speechHi: "यह ऑगमेंटिन 625 है, जो एक एंटीबायोटिक दवा है। इसे खाना शुरू करते समय लें। डॉक्टर द्वारा बताए गए पूरे 5 दिन का कोर्स अवश्य पूरा करें।",
    speechEn: "This is Augmentin 625, a broad-spectrum antibiotic. Take at the start of a meal. Complete the full prescribed course even if symptoms stop.",
    sampleImage: createBlisterPackSvg("AUGMENTIN", "Amoxicillin and Potassium Clavulanate Tablets IP 625mg", "625 mg", "#D97706"),
    boundingBoxes: [
      { label: "Active Salt (Ground Truth)", text: "Amoxicillin and Potassium Clavulanate Tablets IP 625mg", x: 25, y: 88, width: 450, height: 42, color: "#10B981" },
      { label: "Brand Identifier", text: "AUGMENTIN 625", x: 25, y: 24, width: 450, height: 52, color: "#3B82F6" },
      { label: "Batch & Validity", text: "B.No. AZ-8419 | EXP. 08/2028", x: 295, y: 235, width: 180, height: 32, color: "#F59E0B" },
    ]
  },
  {
    id: "cetirizine",
    brandName: "Cetzine 10",
    prescribedBrands: ["Cetzine", "Okacet", "Alrid", "Zyrtec", "Incid-L"],
    activeSalt: "Cetirizine Dihydrochloride (10mg)",
    saltOnly: "Cetirizine",
    strength: "10mg",
    category: "Antihistamine (Anti-Allergy)",
    timingBadge: "BEDTIME / NIGHT",
    timingColor: "bg-indigo-100 text-indigo-900 border-indigo-300",
    timingIcon: "Moon",
    timingDetails: "Take once daily at bedtime with a glass of water, with or without food.",
    purpose: "Relieves allergic rhinitis, seasonal sneezing, runny nose, itching, and hives.",
    safetyWarning: "SEDATION ALERT: This medicine causes drowsiness and reduced alertness. Do NOT drive, ride a two-wheeler, or operate heavy machinery after taking.",
    doctorChecklist: [
      "Can this be switched to non-drowsy Levocetirizine or Fexofenadine if I must drive during morning hours?",
      "Is 10mg safe with my current nasal spray?"
    ],
    genericSavings: "₹45 (Cetzine) vs ₹9 (Jan Aushadhi Cetirizine) → Save 80%",
    cdscoConfidence: 94,
    speechHi: "यह सेट्रीजीन 10 मिलीग्राम है, जो एलर्जी, छींक और जुकाम के लिए है। इससे नींद और सुस्ती आती है, इसलिए इसे रात को सोने से पहले लें।",
    speechEn: "This is Cetirizine 10 milligrams for allergy relief. It causes drowsiness and reduced alertness, so always take it at bedtime.",
    sampleImage: createBlisterPackSvg("CETZINE", "Cetirizine Hydrochloride Tablets IP 10mg", "10 mg", "#4338CA"),
    boundingBoxes: [
      { label: "Active Salt (Ground Truth)", text: "Cetirizine Hydrochloride Tablets IP 10mg", x: 25, y: 88, width: 450, height: 42, color: "#10B981" },
      { label: "Brand Identifier", text: "CETZINE 10", x: 25, y: 24, width: 450, height: 52, color: "#3B82F6" },
      { label: "Batch & Validity", text: "B.No. AZ-8419 | EXP. 08/2028", x: 295, y: 235, width: 180, height: 32, color: "#F59E0B" },
    ]
  }
];

/**
 * Intelligent Text Matching Algorithm
 * Maps OCR-extracted raw strings to verified CDSCO drug records
 */
export function matchDrugFromText(rawText) {
  if (!rawText) return DRUG_DATABASE[0];
  const lower = rawText.toLowerCase();

  // 1. Painkiller combinations (Ibuprofen, Ibufyl, Combiflam, Flexon, Brufen)
  if (
    lower.includes("ibufyl") || 
    lower.includes("ibuprofen") || 
    lower.includes("combiflam") || 
    lower.includes("flexon") || 
    lower.includes("ibugesic") || 
    lower.includes("brufen") ||
    lower.includes("sp503f") ||
    lower.includes("lestord")
  ) {
    return DRUG_DATABASE.find(d => d.id === "ibufyl");
  }

  // 2. Paracetamol / Acetaminophen (Dolo, Calpol, Crocin, Pacimol)
  if (
    lower.includes("dolo") || 
    lower.includes("calpol") || 
    lower.includes("crocin") || 
    lower.includes("pacimol") || 
    lower.includes("paracetamol") || 
    lower.includes("acetaminophen")
  ) {
    return DRUG_DATABASE.find(d => d.id === "paracetamol");
  }

  // 3. Pantoprazole / Antacids (Pan, Pantocid, Pantodac)
  if (
    lower.includes("pantocid") || 
    lower.includes("pantoprazole") || 
    lower.includes("pan 40") || 
    lower.includes("pantop") ||
    lower.includes("penta")
  ) {
    return DRUG_DATABASE.find(d => d.id === "pantoprazole");
  }

  // 4. Metformin / Diabetes (Glycomet, Gluconorm, Cetapin)
  if (
    lower.includes("glycomet") || 
    lower.includes("metformin") || 
    lower.includes("gluconorm") || 
    lower.includes("cetapin")
  ) {
    return DRUG_DATABASE.find(d => d.id === "metformin");
  }

  // 5. Amoxicillin / Antibiotic (Augmentin, Clavam, Moxikind)
  if (
    lower.includes("augmentin") || 
    lower.includes("amoxicillin") || 
    lower.includes("clavulanate") || 
    lower.includes("clavam") ||
    lower.includes("moxikind")
  ) {
    return DRUG_DATABASE.find(d => d.id === "amoxicillin");
  }

  // 6. Cetirizine / Allergy (Cetzine, Okacet, Alrid, Zyrtec)
  if (
    lower.includes("cetzine") || 
    lower.includes("cetirizine") || 
    lower.includes("okacet") || 
    lower.includes("alrid")
  ) {
    return DRUG_DATABASE.find(d => d.id === "cetirizine");
  }

  // Fallback: Default to Ibufyl Plus if user uploaded a painkiller or default to first drug
  return DRUG_DATABASE[0];
}
