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
} from "lucide-react";
import { RFQModal } from "../assets/components/ui/RFQModal";

export const AboutPartex: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const partexCategories = [
    {
      id: "pa",
      seriesCode: "SERIES PA // CLOSED CHEVRON",
      title: "PA Closed Wire Markers (Chevron Cut)",
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
      highlightColor: "border-emerald-300 bg-emerald-50/30",
      accentTag: "bg-emerald-100 text-emerald-900 border-emerald-300",
      accentDot: "bg-emerald-500",
    },
    {
      id: "t1000",
      seriesCode: "SERIES T-1000 // THERMAL PRINTER",
      title: "ProMark T-1000 Thermal Transfer Marker Printer",
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
      highlightColor: "border-teal-300 bg-teal-50/30",
      accentTag: "bg-teal-100 text-teal-900 border-teal-300",
      accentDot: "bg-teal-500",
    },
    {
      id: "pc",
      seriesCode: "SERIES PC // RETROFIT SNAP-ON",
      title: "PC Clip-On Open Wire Markers",
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
      highlightColor: "border-cyan-300 bg-cyan-50/30",
      accentTag: "bg-cyan-100 text-cyan-900 border-cyan-300",
      accentDot: "bg-cyan-500",
    },
    {
      id: "pks",
      seriesCode: "SERIES PKS // ACID-PROOF SS316",
      title: "PKS Stainless Steel 316 Acid-Proof Markers",
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
      highlightColor: "border-emerald-400 bg-emerald-50/40",
      accentTag: "bg-emerald-100 text-emerald-950 border-emerald-400",
      accentDot: "bg-emerald-600",
    },
  ];

  return (
    <div className="pt-6 pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-mono">
          <Link to="/" className="hover:text-slate-950 transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link to="/#brandPortfolios" className="hover:text-slate-950 transition-colors">
            Authorized Brands
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-900 font-bold">
            PARTEX Sweden Industrial Marking Systems
          </span>
        </nav>

        {/* FANCY MODERN BRAND EXECUTIVE HERO */}
        <div className="rounded-3xl p-6 sm:p-10 border border-emerald-200/90 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white shadow-xl mb-10 relative overflow-hidden">
          
          {/* Ambient Lighting Orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-2xl">
              
              {/* Badge & Swedish Origin Header */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-11 px-3 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-center">
                  <img
                    src="/images/logo-partex.png"
                    alt="Partex Sweden Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-mono font-bold text-xs uppercase tracking-wider border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  Official Authorized Distributor
                </span>

                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold border border-slate-200">
                  🇸🇪 Gullspång, Sweden · Est. 1948
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                PARTEX Sweden — Wire, Cable & Panel Identification Systems
              </h1>

              {/* Editorial Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Founded in 1948 in Gullspång, Sweden, Partex is the undisputed benchmark in electrical marking technology. Siddhi Kabel Corporation is the authorized channel distributor across South India, delivering factory-original closed chevron markers, portable ProMark T-1000 thermal printers, and AISI 316 acid-proof stainless steel tags with guaranteed immediate Bangalore dispatches.
              </p>

              {/* Trust Indicators Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <Award size={14} />
                  <span>UL94-V0 Self-Extinguishing</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>RoHS & REACH Compliant</span>
                </div>
                <span>·</span>
                <span>Bangalore Ready Warehouse Stock</span>
              </div>

            </div>

            {/* Action Column */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 self-start lg:self-center">
              <Link
                to="/#productsSection"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 hover:scale-102"
              >
                <Zap size={15} />
                <span>Browse Partex In Catalog</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedProduct("PARTEX Sweden Commercial Price List")}
                className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={15} />
                <span>Request Project Quotation</span>
              </button>
            </div>

          </div>
        </div>

        {/* 4 CORE PARTEX DISCIPLINES (Fancy, Modern, Colorful Cards) */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 font-bold">
                APPROVED OEM PRODUCT LINES
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Partex Sweden Identification Series
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Showing 4 Specialized Marker Systems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {partexCategories.map((cat) => (
              <div
                key={cat.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 border-2 ${cat.highlightColor} shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  
                  {/* Top Bar: Series Code + Visual Thumbnail Pedestal */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full inline-block">
                        {cat.seriesCode}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-950 group-hover:text-emerald-700 transition-colors">
                        {cat.title}
                      </h3>
                    </div>

                    {/* Elevated Image Pedestal */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 border border-slate-200/90 p-2 shrink-0 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:scale-105 transition-all">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/card-unitronic.jpg";
                        }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  {/* Fancy Colorful Parameters Dock (Replaces the plain dull gray box!) */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/40 border border-emerald-200/90 text-xs text-slate-800 mb-5 font-mono shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-950 mb-1 text-[11px] uppercase tracking-wider">
                      <Layers size={13} className="text-emerald-600" />
                      <span>Technical Parameters</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-700">
                      {cat.specs}
                    </p>
                  </div>

                  {/* Standard Part Offerings with Interactive Checkmarks */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                      Standard Part Offerings & Configurations:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                      {cat.products.map((p, i) => (
                        <li key={i} className="flex items-center gap-2 p-1 rounded-lg hover:bg-emerald-50/60 transition-colors">
                          <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom Action Footer with Modern Colors */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to="/#productsSection"
                    className="text-xs font-bold text-slate-950 hover:text-emerald-600 inline-flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>View Models In Catalog</span>
                    <ArrowRight size={14} className="text-emerald-600" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(`Partex ${cat.title}`)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-2xs hover:scale-105 cursor-pointer"
                  >
                    Request Series Quote
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BANNER: REQUEST OFFICIAL BATCH QUOTATION */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              READY INVENTORY · BANGALORE CENTRAL LOGISTICS HUB
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Need custom marked cable tags or bulk chevron sleeve reels?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Send your wire schedule or Bill of Materials. We provide custom pre-printed sleeves or dispatch portable ProMark printers within 24 hours.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/#rfqSection"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-500/20 hover:scale-102 text-center"
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
