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

export const AboutMennekes: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeSeriesId, setActiveSeriesId] = useState<string>("powertop");

  const mennekesCategories = [
    {
      id: "powertop",
      index: "01",
      code: "SERIES 01 // HEAVY DUTY CEE",
      title: "PowerTOP® Xtra CEE Plugs & Connectors",
      shortTitle: "PowerTOP® Plugs",
      desc: "Ergonomic industrial plugs with rubberized slip-proof grips and SafeCONTACT screwless insulation-displacement technology for fast, vibration-proof field wiring.",
      specs: "16A, 32A, 63A, 125A · IP44 / IP67 watertight · Highly heat-resistant contact carriers · Nickel-plated pins",
      products: [
        "PowerTOP® Xtra 16A 5P (400V 3P+N+E Red)",
        "PowerTOP® Xtra 32A 5P (400V 3P+N+E Red)",
        "PowerTOP® Xtra 63A / 125A Heavy Industrial",
        "SafeCONTACT Screwless Quick-Wire Plugs",
        "Appliance Inlets & Angled Couplers for machinery",
      ],
      image: "/images/menn-powertop.jpg",
    },
    {
      id: "amaxx",
      index: "02",
      code: "SERIES 02 // RECEPTACLE COMBOS",
      title: "AMAXX® Receptacle Combination Enclosures",
      shortTitle: "AMAXX® Combos",
      desc: "Modular, pre-wired power distribution units fabricated from high-impact AMAPLAST polymer. Configurable with MCBs, RCCBs, and CEE receptacles for manufacturing lines.",
      specs: "AMAPLAST impact polymer · IP44 / IP67 · Custom DIN rail windows · Pre-wired & factory tested",
      products: [
        "AMAXX® 2-Gang Compact Wall Units",
        "AMAXX® 4-Gang Floor / Wall Enclosures",
        "AMAXX® 5-Gang Heavy Industrial Combos",
        "Integrated Transparent MCB & RCD Windows",
        "Pivoted Enclosure Covers for Rapid Maintenance",
      ],
      image: "/images/menn-amaxx.jpg",
    },
    {
      id: "evergum",
      index: "03",
      code: "SERIES 03 // VULCANIZED RUBBER",
      title: "EverGUM® Solid Rubber Field Distributors",
      shortTitle: "EverGUM® Distributors",
      desc: "Virtually indestructible portable and wall-mount distribution boxes manufactured from solid vulcanized rubber, resistant to harsh acids, oils, and severe drop impacts.",
      specs: "Solid vulcanized synthetic rubber · Crush & drop proof · IP44 / IP67 · Safety yellow & black casing",
      products: [
        "EverGUM® Compact Portable Drop Boxes",
        "EverGUM® Heavy Floor Distribution Stand",
        "EverGUM® Wall Mount Receptacle Boxes",
        "Total Oil & Chemical Washdown Resistance",
        "Heavy-Duty Solid Rubber Carrying Handles",
      ],
      image: "/images/menn-evergum.jpg",
    },
    {
      id: "panel",
      index: "04",
      code: "SERIES 04 // PANEL RECEPTACLES",
      title: "CEE Panel Sockets & DUO Interlocked Switches",
      shortTitle: "DUO & Panel Sockets",
      desc: "Panel mount sockets with straight and angled flanges, plus DUO switched interlocked receptacles that mechanically prevent insertion or removal while electrically energized.",
      specs: "16A to 125A · Nickel-plated contacts · IP67 watertight · Padlockable rotary safety handle",
      products: [
        "Straight Flange Panel Sockets (16A / 32A)",
        "Angled Flange Receptacles for Machine Panels",
        "DUO Switched Interlocked Receptacles (Mechanical interlock)",
        "Phase Inverter Plugs (16A / 32A for 3-phase motors)",
        "CEE Surface Mounting High Current Wall Sockets",
      ],
      image: "/images/menn-panel.jpg",
    },
  ];

  const activeCategory = mennekesCategories.find((c) => c.id === activeSeriesId) || mennekesCategories[0];

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
            MENNEKES Germany · Bento Command Matrix
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          <div className="lg:col-span-8 rounded-3xl p-8 sm:p-10 border border-purple-900/40 bg-gradient-to-br from-[#1d0d24] via-[#120817] to-[#09040c] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-12 px-4 bg-white rounded-2xl border border-stone-200 shadow-md flex items-center justify-center">
                  <img
                    src="/images/logo-mennekes.png"
                    alt="Mennekes Germany Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 text-[#E8B4DC] font-mono font-bold text-xs uppercase tracking-wider border border-purple-400/40 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#E8B4DC]" />
                  Official Authorized Distributor
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-black/40 text-purple-200 font-mono text-xs font-semibold border border-purple-900/50">
                  🇩🇪 Kirchhundem, Germany · Est. 1935
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                  MENNEKES — Industrial CEE Plugs, Sockets & AMAXX® Enclosures
                </h1>
                <p className="text-purple-100/80 text-xs sm:text-sm leading-relaxed font-sans">
                  Founded in 1935 in Germany, Mennekes is the originator of standard industrial CEE circular power connections worldwide. Siddhi Kabel Corporation supplies heavy-duty 16A to 125A PowerTOP® Xtra industrial plugs, Switched Interlocked DUO receptacles, and AMAPLAST AMAXX combinations.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs font-mono text-purple-200/80">
              <div className="flex items-center gap-2 text-[#E8B4DC] font-bold">
                <Award size={15} />
                <span>VDE & CE Certified to IEC 60309-1 / -2</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Activity size={15} className="animate-pulse" />
                <span>Bangalore Hub: Ready Stock</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl p-8 border border-purple-900/40 bg-gradient-to-br from-[#1d0d24] via-[#120817] to-[#09040c] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E8B4DC] block">
                EXECUTIVE PROCUREMENT
              </span>
              <h3 className="text-lg font-bold text-white">
                Configuring plant power outlets or washdown plugs?
              </h3>
              <p className="text-xs text-purple-100/80 leading-relaxed">
                Configure pre-wired AMAXX assemblies with VDE test certification and fast dispatch.
              </p>
            </div>

            <div className="space-y-3 relative z-10">
              <Link
                to="/#productsSection"
                className="w-full py-3.5 bg-[#8B2272] hover:bg-[#721B5D] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-102"
              >
                <Zap size={14} />
                <span>Browse MENNEKES In Catalog</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedProduct("MENNEKES Germany Price List & Schedule")}
                className="w-full py-3.5 bg-black/40 hover:bg-black/60 text-purple-200 hover:text-white border border-purple-500/30 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={14} className="text-[#E8B4DC]" />
                <span>Request Project Quotation</span>
              </button>
            </div>
          </div>

        </div>

        <div className="space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-stone-300 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-800 font-bold block mb-1 flex items-center gap-1.5">
                <Terminal size={13} /> MENNEKES ENGINEERING CONSOLE
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
            {mennekesCategories.map((cat) => {
              const isSelected = activeSeriesId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSeriesId(cat.id)}
                  className={`p-5 rounded-2xl transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer border relative overflow-hidden shadow-sm ${
                    isSelected
                      ? "bg-[#120817] text-white border-purple-700/60 shadow-xl ring-2 ring-purple-400/40 translate-y-[-2px]"
                      : "bg-white border-stone-200 text-stone-700 hover:border-stone-400 hover:bg-stone-50"
                  }`}
                >
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${isSelected ? "text-[#E8B4DC]" : "text-stone-500"}`}>
                        SERIES {cat.index}
                      </span>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform ${isSelected ? "bg-[#8B2272] text-white font-bold rotate-90" : "bg-stone-100 text-stone-500"}`}>
                        <ChevronRight size={12} />
                      </div>
                    </div>
                    <h4 className={`text-sm font-black ${isSelected ? "text-white" : "text-stone-900"}`}>
                      {cat.shortTitle}
                    </h4>
                  </div>
                  <div className={`pt-4 relative z-10 flex items-center gap-2 text-[10px] font-mono ${isSelected ? "text-purple-200/80 font-bold" : "text-stone-500"}`}>
                    <Cpu size={12} className={isSelected ? "text-[#E8B4DC] animate-pulse" : ""} />
                    <span>{isSelected ? "Active Console Node" : "Click to Inspect"}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-[#120817] text-white rounded-3xl border border-purple-900/50 p-6 sm:p-10 relative overflow-hidden shadow-2xl animate-fade-in transition-all duration-500" key={activeCategory.id}>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E8B4DC] bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30 inline-block shadow-2xs">
                    {activeCategory.code}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                    {activeCategory.title}
                  </h3>
                </div>

                <p className="text-purple-100/80 text-xs sm:text-sm leading-relaxed font-sans">
                  {activeCategory.desc}
                </p>

                <div className="w-full h-48 rounded-2xl bg-[#09040c] border border-purple-900/40 p-4 flex items-center justify-center shadow-inner overflow-hidden group">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/menn-powertop.jpg";
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(`MENNEKES ${activeCategory.title}`)}
                  className="w-full py-4 bg-[#8B2272] hover:bg-[#721B5D] text-white font-black text-xs rounded-xl transition-all shadow-lg hover:scale-102 cursor-pointer uppercase tracking-wider text-center"
                >
                  Request Official Series Quotation
                </button>
              </div>

              <div className="lg:col-span-7 space-y-6 bg-[#1d0d24]/90 p-6 sm:p-8 rounded-2xl border border-purple-900/40 shadow-inner">
                
                <div className="space-y-2 font-mono">
                  <div className="flex items-center gap-2 text-[#E8B4DC] text-xs font-bold uppercase tracking-wider">
                    <Layers size={16} />
                    <span>Hardware Telemetry & Parameters</span>
                  </div>
                  <p className="text-stone-900 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-[#faf8f5] border border-purple-300 font-mono shadow-inner font-bold">
                    {activeCategory.specs}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-200/70 font-bold block">
                    Available Stock Configurations & Part Numbers:
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeCategory.products.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#09040c] border border-purple-900/50 text-xs text-purple-50 font-medium shadow-sm hover:border-purple-400 hover:bg-[#120817] hover:-translate-y-0.5 transition-all duration-300">
                        <CheckCircle2 size={16} className="text-[#E8B4DC] shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs">
                  <Link
                    to="/#productsSection"
                    className="font-bold text-purple-200 hover:text-[#E8B4DC] inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <span>Explore Full Catalog Inventory</span>
                    <ArrowRight size={14} className="text-[#E8B4DC] transition-transform group-hover:translate-x-1" />
                  </Link>
                  <span className="font-mono text-purple-200/60 text-[11px]">Bangalore Hub Stock</span>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-[#120817] text-white shadow-2xl border border-purple-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="text-[#E8B4DC] font-mono text-xs font-bold uppercase tracking-wider">
              READY INVENTORY · BANGALORE CENTRAL LOGISTICS HUB
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Configuring industrial plant power outlets or washdown plugs?
            </h3>
            <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed">
              Send your pin requirements or project socket combinations. We configure pre-wired AMAXX assemblies with VDE test certification.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/#rfqSection"
              className="px-6 py-3.5 bg-[#8B2272] hover:bg-[#721B5D] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 text-center"
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