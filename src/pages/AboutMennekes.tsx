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

export const AboutMennekes: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const mennekesCategories = [
    {
      id: "powertop",
      seriesCode: "SERIES 01 // HEAVY DUTY CEE",
      title: "PowerTOP® Xtra CEE Plugs & Connectors",
      desc: "Ergonomic industrial plugs with rubberized slip-proof grips and SafeCONTACT screwless insulation-displacement technology for fast, vibration-proof field wiring.",
      specs: "16A, 32A, 63A, 125A · IP44 / IP67 watertight · Highly heat-resistant contact carriers · Nickel-plated pins",
      products: [
        "PowerTOP® Xtra 16A 5P (400V 3P+N+E Red)",
        "PowerTOP® Xtra 32A 5P (400V 3P+N+E Red)",
        "PowerTOP® Xtra 63A / 125A Heavy Industrial",
        "SafeCONTACT Screwless Quick-Wire Plugs",
        "Appliance Inlets & Angled Couplers for machinery",
      ],
      link: "/#productsSection",
      image: "/images/menn-powertop.jpg",
      highlightColor: "border-purple-300 bg-purple-50/30",
      accentTag: "bg-purple-100 text-purple-900 border-purple-300",
      accentDot: "bg-purple-500",
    },
    {
      id: "amaxx",
      seriesCode: "SERIES 02 // RECEPTACLE COMBOS",
      title: "AMAXX® Receptacle Combination Enclosures",
      desc: "Modular, pre-wired power distribution units fabricated from high-impact AMAPLAST polymer. Configurable with MCBs, RCCBs, and CEE receptacles for manufacturing lines.",
      specs: "AMAPLAST impact polymer · IP44 / IP67 · Custom DIN rail windows · Pre-wired & factory tested",
      products: [
        "AMAXX® 2-Gang Compact Wall Units",
        "AMAXX® 4-Gang Floor / Wall Enclosures",
        "AMAXX® 5-Gang Heavy Industrial Combos",
        "Integrated Transparent MCB & RCD Windows",
        "Pivoted Enclosure Covers for Rapid Maintenance",
      ],
      link: "/#productsSection",
      image: "/images/menn-amaxx.jpg",
      highlightColor: "border-indigo-300 bg-indigo-50/30",
      accentTag: "bg-indigo-100 text-indigo-900 border-indigo-300",
      accentDot: "bg-indigo-500",
    },
    {
      id: "evergum",
      seriesCode: "SERIES 03 // VULCANIZED RUBBER",
      title: "EverGUM® Solid Rubber Field Distributors",
      desc: "Virtually indestructible portable and wall-mount distribution boxes manufactured from solid vulcanized rubber, resistant to harsh acids, oils, and severe drop impacts.",
      specs: "Solid vulcanized synthetic rubber · Crush & drop proof · IP44 / IP67 · Safety yellow & black casing",
      products: [
        "EverGUM® Compact Portable Drop Boxes",
        "EverGUM® Heavy Floor Distribution Stand",
        "EverGUM® Wall Mount Receptacle Boxes",
        "Total Oil & Chemical Washdown Resistance",
        "Heavy-Duty Solid Rubber Carrying Handles",
      ],
      link: "/#productsSection",
      image: "/images/menn-evergum.jpg",
      highlightColor: "border-violet-300 bg-violet-50/30",
      accentTag: "bg-violet-100 text-violet-900 border-violet-300",
      accentDot: "bg-violet-500",
    },
    {
      id: "panel",
      seriesCode: "SERIES 04 // PANEL RECEPTACLES",
      title: "CEE Panel Sockets & DUO Interlocked Switches",
      desc: "Panel mount sockets with straight and angled flanges, plus DUO switched interlocked receptacles that mechanically prevent insertion or removal while electrically energized.",
      specs: "16A to 125A · Nickel-plated contacts · IP67 watertight · Padlockable rotary safety handle",
      products: [
        "Straight Flange Panel Sockets (16A / 32A)",
        "Angled Flange Receptacles for Machine Panels",
        "DUO Switched Interlocked Receptacles (Mechanical interlock)",
        "Phase Inverter Plugs (16A / 32A for 3-phase motors)",
        "CEE Surface Mounting High Current Wall Sockets",
      ],
      link: "/#productsSection",
      image: "/images/menn-panel.jpg",
      highlightColor: "border-purple-400 bg-purple-50/40",
      accentTag: "bg-purple-100 text-purple-950 border-purple-400",
      accentDot: "bg-purple-600",
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
            MENNEKES Germany · Industrial CEE Plugs Make Sheet
          </span>
        </nav>

        {/* FANCY MODERN BRAND EXECUTIVE HERO (Coordinated Minimalist Light Purple) */}
        <div className="rounded-3xl p-6 sm:p-10 border border-purple-200/90 bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-white shadow-xl mb-10 relative overflow-hidden">
          
          {/* Ambient Lighting Orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-2xl">
              
              {/* Badge & German Origin Header */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-11 px-3 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-center">
                  <img
                    src="/images/logo-mennekes.png"
                    alt="Mennekes Germany Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>

                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-mono font-bold text-xs uppercase tracking-wider border border-purple-300 flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck size={14} className="text-purple-600" />
                  Official Authorized Distributor
                </span>

                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold border border-slate-200">
                  🇩🇪 Kirchhundem, Germany · Est. 1935
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                MENNEKES — Industrial CEE Plugs, Sockets & AMAXX® Enclosures
              </h1>

              {/* Editorial Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Founded in 1935 in Germany, Mennekes is the originator of standard industrial CEE circular power connections worldwide. Siddhi Kabel Corporation supplies heavy-duty 16A to 125A PowerTOP® Xtra industrial plugs, Switched Interlocked DUO receptacles, and AMAPLAST AMAXX combinations for automotive assembly, chemical washdown plants, and heavy fabrication shops.
              </p>

              {/* Trust Indicators Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-1.5 text-purple-700 font-bold">
                  <Award size={14} />
                  <span>VDE & CE Certified to IEC 60309-1 / -2</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-purple-500" />
                  <span>IP67 Watertight Submersible Performance</span>
                </div>
                <span>·</span>
                <span>Bangalore Ready Warehouse Stock</span>
              </div>

            </div>

            {/* Action Column */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 self-start lg:self-center">
              <Link
                to="/#productsSection"
                className="px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 hover:scale-102"
              >
                <Zap size={15} />
                <span>Browse MENNEKES In Catalog</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedProduct("MENNEKES Germany Price List & Schedule")}
                className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={15} />
                <span>Request Project Quotation</span>
              </button>
            </div>

          </div>
        </div>

        {/* 4 CORE MENNEKES DISCIPLINES (Fancy, Modern, Coordinated Light Purple Cards) */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-purple-600 font-bold">
                APPROVED OEM CEE POWER RANGES
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                MENNEKES Industrial Connection Series
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Showing 4 Heavy-Duty Industrial Series
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {mennekesCategories.map((cat) => (
              <div
                key={cat.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 border-2 ${cat.highlightColor} shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  
                  {/* Top Bar: Series Code + Visual Thumbnail Pedestal */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-800 bg-purple-100/90 px-2.5 py-0.5 rounded-full inline-block">
                        {cat.seriesCode}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-950 group-hover:text-purple-700 transition-colors">
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
                          e.currentTarget.src = "/images/menn-powertop.jpg";
                        }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  {/* Fancy Colorful Parameters Dock */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50/40 border border-purple-200/90 text-xs text-slate-800 mb-5 font-mono shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-purple-950 mb-1 text-[11px] uppercase tracking-wider">
                      <Layers size={13} className="text-purple-600" />
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
                        <li key={i} className="flex items-center gap-2 p-1 rounded-lg hover:bg-purple-50/60 transition-colors">
                          <CheckCircle2 size={14} className="text-purple-600 shrink-0" />
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
                    className="text-xs font-bold text-slate-950 hover:text-purple-600 inline-flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>View Models In Catalog</span>
                    <ArrowRight size={14} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(`Mennekes ${cat.title}`)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-2xs hover:scale-105 cursor-pointer"
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
              READY INVENTORY · BANGALORE CENTRAL LOGISTICS HUB
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Configuring industrial plant power outlets or washdown plugs?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Send your pin requirements or project socket combinations. We configure pre-wired AMAXX assemblies with VDE test certification.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/#rfqSection"
              className="px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-purple-600/20 hover:scale-102 text-center"
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
