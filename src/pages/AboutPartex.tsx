import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  FileText,
  Sparkles,
  Layers,
  Award,
  Cpu,
  Terminal,
  Activity,
} from "lucide-react";
import { RFQModal } from "../assets/components/ui/RFQModal";

export const AboutPartex: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeSeriesId, setActiveSeriesId] = useState<string>("pa");

  const partexCategories = [
    {
      id: "pa",
      index: "01",
      code: "SERIES 01 // CLOSED CHEVRON",
      title: "PA Closed Wire Markers (Chevron Cut)",
      shortTitle: "PA Chevron Cut",
      desc: "Single-digit closed chevron cut sleeves for wires from 0.2 to 70 sq mm. The interlocking chevron profile ensures individual characters stay permanently aligned on wire bundles.",
      specs: "PA-02, PA-1, PA-2, PA-3 · Cadmium & Silicon-free PVC · UL94-V0 Flame Retardant · -30°C to +60°C",
      products: [
        "PA-02 (0.2 - 1.5 mm² wires / cables)",
        "PA-1 (0.75 - 4.0 mm² wires / cables)",
        "PA-2 (2.5 - 16 mm² wires / cables)",
        "PA-3 (16 - 70 mm² heavy cables)",
        "Numbers 0-9, Letters A-Z, Standard Electrical Symbols (+, -, Earth)",
      ],
      image: "/images/partex-pa.jpg",
    },
    {
      id: "t1000",
      index: "02",
      code: "SERIES 02 // THERMAL PRINTER",
      title: "ProMark T-1000 Thermal Transfer Marker Printer",
      shortTitle: "ProMark T-1000",
      desc: "High-speed portable on-site industrial marker printer with 300 dpi resolution. Prints directly on continuous PO profile tubing, heat-shrinkable sleeves, and self-adhesive panel labels.",
      specs: "40 mm/sec print speed · USB PC connection + internal memory · 300 dpi high clarity · Portable battery pack",
      products: [
        "ProMark T-1000 Master Printer Kit",
        "Heavy-Duty Aluminium Transport & Site Case",
        "Black / White / Red Industrial Resin Ribbons",
        "USB Cable & Windows Software Suite included",
        "Rechargeable Lithium-Ion Field Battery",
      ],
      image: "/images/partex-promark.jpg",
    },
    {
      id: "pc",
      index: "03",
      code: "SERIES 03 // RETROFIT SNAP-ON",
      title: "PC Clip-On Open Wire Markers",
      shortTitle: "PC Clip-On",
      desc: "Open snap-on markers designed for direct installation on pre-connected wiring, terminal blocks, and retrofit maintenance without removing wire terminations.",
      specs: "PC-10, PC-20, PC-30, PC-40 · High retention spring clamp · Vibration-proof grip · Fast wand applicator",
      products: [
        "PC-10 (2.4 - 3.0 mm Outer Diameter)",
        "PC-20 (3.0 - 4.0 mm Outer Diameter)",
        "PC-30 (4.0 - 5.0 mm Outer Diameter)",
        "PC-40 (5.0 - 6.2 mm Outer Diameter)",
        "Applicator Wand Tools for Rapid Mounting",
      ],
      image: "/images/partex-pc.jpg",
    },
    {
      id: "pks",
      index: "04",
      code: "SERIES 04 // ACID-PROOF SS316",
      title: "PKS Stainless Steel 316 Acid-Proof Markers",
      shortTitle: "PKS Stainless Steel",
      desc: "High-grade AISI 316 stainless steel identification tags engineered for extreme marine, chemical plants, offshore oil rigs, and high-temperature fire hazard zones.",
      specs: "AISI 316 Stainless Steel · -80°C to +500°C · Extreme fire, salt spray, and acid resistance",
      products: [
        "PKS Individual Embossed Characters",
        "PKB Steel Marker Carrier Strips",
        "Ball-Lock Stainless Steel Cable Ties",
        "Custom Multi-Line Embossed Asset Tags",
        "Heavy-Duty Tensioning & Cutting Tools",
      ],
      image: "/images/partex-pks.jpg",
    },
  ];

  const activeCategory = partexCategories.find((c) => c.id === activeSeriesId) || partexCategories[0];

  return (
    <div className="pt-6 pb-24 bg-[#faf8f5] text-stone-900 min-h-screen select-none relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 font-mono">
          <Link to="/" className="hover:text-stone-950 transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-stone-400" />
          <Link to="/#brandPortfolios" className="hover:text-stone-950 transition-colors">
            Authorized Brands
          </Link>
          <ChevronRight size={13} className="text-stone-400" />
          <span className="text-stone-900 font-bold">
            PARTEX Sweden · Bento Command Matrix
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          <div className="lg:col-span-8 rounded-3xl p-8 sm:p-10 border border-emerald-900/40 bg-gradient-to-br from-[#0a2014] via-[#05130b] to-[#020906] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-12 px-4 bg-white rounded-2xl border border-stone-200 shadow-md flex items-center justify-center">
                  <img
                    src="/images/logo-partex.png"
                    alt="Partex Sweden Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-[#A5D6A7] font-mono font-bold text-xs uppercase tracking-wider border border-emerald-400/40 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#A5D6A7]" />
                  Official Authorized Distributor
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-black/40 text-emerald-200 font-mono text-xs font-semibold border border-emerald-900/50">
                  🇸🇪 Gullspång, Sweden · Est. 1948
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                  PARTEX Sweden — Wire, Cable & Panel Identification Systems
                </h1>
                <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed font-sans">
                  Founded in 1948 in Gullspång, Sweden, Partex is the undisputed benchmark in electrical marking technology. Siddhi Kabel Corporation is the authorized channel distributor across South India, delivering factory-original closed chevron markers, portable ProMark T-1000 thermal printers, and AISI 316 acid-proof stainless steel tags.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-emerald-900/40 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs font-mono text-emerald-200/80">
              <div className="flex items-center gap-2 text-[#A5D6A7] font-bold">
                <Award size={15} />
                <span>UL94-V0 Self-Extinguishing</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Activity size={15} className="animate-pulse" />
                <span>Bangalore Hub: Ready Stock</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl p-8 border border-emerald-900/40 bg-gradient-to-br from-[#0a2014] via-[#05130b] to-[#020906] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A5D6A7] block">
                EXECUTIVE PROCUREMENT
              </span>
              <h3 className="text-lg font-bold text-white">
                Need custom marked cable tags or bulk chevron sleeve reels?
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Send your wire schedule or Bill of Materials for rapid pre-printed sleeve dispatches.
              </p>
            </div>

            <div className="space-y-3 relative z-10">
              <Link
                to="/#productsSection"
                className="w-full py-3.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-102"
              >
                <Zap size={14} />
                <span>Browse Partex In Catalog</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedProduct("PARTEX Sweden Commercial Price List")}
                className="w-full py-3.5 bg-black/40 hover:bg-black/60 text-emerald-200 hover:text-white border border-emerald-500/30 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={14} className="text-[#A5D6A7]" />
                <span>Request Project Quotation</span>
              </button>
            </div>
          </div>

        </div>

        <div className="space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-stone-300 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold block mb-1 flex items-center gap-1.5">
                <Terminal size={13} /> PARTEX ENGINEERING CONSOLE
              </span>
              <h2 className="text-2xl font-black text-stone-950 tracking-tight">
                Interactive Series Architecture Deck
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-500">
              Click any series card below to load live hardware parameters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partexCategories.map((cat) => {
              const isSelected = activeSeriesId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSeriesId(cat.id)}
                  className={`p-5 rounded-2xl transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer border relative overflow-hidden shadow-sm ${
                    isSelected
                      ? "bg-[#05130b] text-white border-emerald-700/60 shadow-xl ring-2 ring-emerald-400/40 translate-y-[-2px]"
                      : "bg-white border-stone-200 text-stone-700 hover:border-stone-400 hover:bg-stone-50"
                  }`}
                >
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${isSelected ? "text-[#A5D6A7]" : "text-stone-500"}`}>
                        SERIES {cat.index}
                      </span>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform ${isSelected ? "bg-[#2E7D32] text-white font-bold rotate-90" : "bg-stone-100 text-stone-500"}`}>
                        <ChevronRight size={12} />
                      </div>
                    </div>
                    <h4 className={`text-sm font-black ${isSelected ? "text-white" : "text-stone-900"}`}>
                      {cat.shortTitle}
                    </h4>
                  </div>
                  <div className={`pt-4 relative z-10 flex items-center gap-2 text-[10px] font-mono ${isSelected ? "text-emerald-200/80 font-bold" : "text-stone-500"}`}>
                    <Cpu size={12} className={isSelected ? "text-[#A5D6A7] animate-pulse" : ""} />
                    <span>{isSelected ? "Active Console Node" : "Click to Inspect"}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-[#05130b] text-white rounded-3xl border border-emerald-900/50 p-6 sm:p-10 relative overflow-hidden shadow-2xl animate-fade-in transition-all duration-500" key={activeCategory.id}>
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A5D6A7] bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30 inline-block shadow-2xs">
                    {activeCategory.code}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                    {activeCategory.title}
                  </h3>
                </div>

                <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed font-sans">
                  {activeCategory.desc}
                </p>

                <div className="w-full h-48 rounded-2xl bg-[#020906] border border-emerald-900/40 p-4 flex items-center justify-center shadow-inner overflow-hidden group">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/partex-pa.jpg";
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(`Partex ${activeCategory.title}`)}
                  className="w-full py-4 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-xs rounded-xl transition-all shadow-lg hover:scale-102 cursor-pointer uppercase tracking-wider text-center"
                >
                  Request Official Series Quotation
                </button>
              </div>

              <div className="lg:col-span-7 space-y-6 bg-[#0a2014]/90 p-6 sm:p-8 rounded-2xl border border-emerald-900/40 shadow-inner">
                
                <div className="space-y-2 font-mono">
                  <div className="flex items-center gap-2 text-[#A5D6A7] text-xs font-bold uppercase tracking-wider">
                    <Layers size={16} />
                    <span>Hardware Telemetry & Parameters</span>
                  </div>
                  <p className="text-stone-900 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-[#faf8f5] border border-emerald-300 font-mono shadow-inner font-bold">
                    {activeCategory.specs}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-200/70 font-bold block">
                    Available Stock Configurations & Part Numbers:
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeCategory.products.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#020906] border border-emerald-900/50 text-xs text-emerald-50 font-medium shadow-sm hover:border-emerald-400 hover:bg-[#05130b] hover:-translate-y-0.5 transition-all duration-300">
                        <CheckCircle2 size={16} className="text-[#A5D6A7] shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-900/40 flex items-center justify-between text-xs">
                  <Link
                    to="/#productsSection"
                    className="font-bold text-emerald-200 hover:text-[#A5D6A7] inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <span>Explore Full Catalog Inventory</span>
                    <ArrowRight size={14} className="text-[#A5D6A7] transition-transform group-hover:translate-x-1" />
                  </Link>
                  <span className="font-mono text-emerald-200/60 text-[11px]">Bangalore Hub Stock</span>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-[#05130b] text-white shadow-2xl border border-emerald-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="text-[#A5D6A7] font-mono text-xs font-bold uppercase tracking-wider">
              READY INVENTORY · BANGALORE CENTRAL LOGISTICS HUB
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Need custom marked cable tags or bulk chevron sleeve reels?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Send your wire schedule or Bill of Materials. We provide custom pre-printed sleeves or dispatch portable ProMark printers within 24 hours.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/#rfqSection"
              className="px-6 py-3.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 text-center"
            >
              Submit Project RFQ
            </Link>
          </div>
        </div>

      </div>

      {selectedProduct && (
        <RFQModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};