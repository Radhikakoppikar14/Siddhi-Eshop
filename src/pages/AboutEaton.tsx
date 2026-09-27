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

export const AboutEaton: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeSeriesId, setActiveSeriesId] = useState<string>("pkzm0");

  const eatonCategories = [
    {
      id: "pkzm0",
      index: "01",
      code: "SERIES 01 // MOTOR PROTECTION",
      title: "PKZM0® Motor-Protective Circuit-Breakers",
      shortTitle: "PKZM0 Starters",
      desc: "Manual motor starters with thermal overload and magnetic short-circuit releases up to 150 kA breaking capacity. Safe phase failure sensitivity for 3-phase AC motors.",
      specs: "0.16A to 32A ratings · 150 kA at 400V · IEC/EN 60947-4-1 · UL 508 / CSA approved",
      products: [
        "PKZM0-0.16 to PKZM0-32 (Standard rotary handle)",
        "PKZM01 Pushbutton Starter for machinery",
        "PKE Electronic Wide Range Motor Starter",
        "DILA Auxiliary Contact Relays",
        "B3.1/3-PKZ0 Common Phase Busbar Adapters",
      ],
      image: "/images/eaton-pkzm0.jpg",
    },
    {
      id: "dilm",
      index: "02",
      code: "SERIES 02 // POWER SWITCHING",
      title: "DILM® Power Contactors & Overload Relays",
      shortTitle: "DILM Contactors",
      desc: "World-class power contactors engineered for heavy AC-3 motor starting, capacitive switching, and industrial automation with SmartWire-DT connectivity.",
      specs: "3-Pole 7A to 1000A · Electronic AC/DC coils · Low holding power consumption · 10 million operations",
      products: [
        "DILM7, DILM9, DILM12, DILM15 (Compact Frame 1)",
        "DILM17 to DILM38 (Frame 2 Automation Starters)",
        "DILM40 to DILM72 (Frame 3 Heavy Duty Contactor)",
        "DILM80 to DILM170 (Frame 4 High Current)",
        "ZB12 / ZB32 Differential Thermal Overload Relays",
      ],
      image: "/images/eaton-dilm.jpg",
    },
    {
      id: "nzm",
      index: "03",
      code: "SERIES 03 // DISTRIBUTION MCCB",
      title: "NZM® Molded Case Circuit Breakers (MCCB)",
      shortTitle: "NZM MCCB Range",
      desc: "Compact circuit breakers up to 1600 A with state-of-the-art microprocessor releases, energy monitoring, and comprehensive selectivity for distribution panels.",
      specs: "NZM1 to NZM4 · 20A to 1600A · Breaking capacity 25kA to 150kA · Worldwide market approvals",
      products: [
        "NZMN1-A (Basic 160A Thermal-Magnetic MCCB)",
        "NZMN2-A250 (Electronic Microprocessor Trip Unit)",
        "NZMN3-AE (Up to 630A Heavy Substation Feeder)",
        "NZMN4-VE (1600A Diagnostic Releases)",
        "Door Coupling Rotary Handles & Under-Voltage Trips",
      ],
      image: "/images/eaton-nzm.jpg",
    },
    {
      id: "rmq",
      index: "04",
      code: "SERIES 04 // CONTROL STATIONS",
      title: "RMQ-TITAN® Pilot Devices & Control Stations",
      shortTitle: "RMQ Pilot Devices",
      desc: "Heavy-duty 22.5mm modular pushbuttons, emergency stop palm buttons, selector switches, and multi-chip LED indicator lights with IP67/IP69K washdown ratings.",
      specs: "M22 Series · IP67/IP69K washdown · Titanium front bezel · 5 million operations · Toolless clip contact",
      products: [
        "M22-D Flush & Extended Pushbutton Actuators",
        "M22-PV Emergency Stop Mushroom Palms (ISO 13850)",
        "M22-W 2-Position & 3-Position Selector Switches",
        "M22-L Multi-Chip High Luminance LED Indicators",
        "Surface Mounting Enclosures M22-IY & Legend Plates",
      ],
      image: "/images/eaton-rmq.jpg",
    },
  ];

  const activeCategory = eatonCategories.find((c) => c.id === activeSeriesId) || eatonCategories[0];

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
            EATON MOELLER Germany · Bento Command Matrix
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          <div className="lg:col-span-8 rounded-3xl p-8 sm:p-10 border border-sky-900/40 bg-gradient-to-br from-[#0b132b] via-[#070b19] to-[#04060f] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-12 px-4 bg-white rounded-2xl border border-stone-200 shadow-md flex items-center justify-center">
                  <img
                    src="/images/logo-eaton.png"
                    alt="Eaton Moeller Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 font-mono font-bold text-xs uppercase tracking-wider border border-sky-400/40 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-sky-400" />
                  Official Authorized Stockist
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-black/40 text-sky-200 font-mono text-xs font-semibold border border-sky-900/50">
                  🇩🇪 Bonn · 🇺🇸 Cleveland
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                  EATON Moeller — Industrial Motor Control & Power Distribution
                </h1>
                <p className="text-sky-100/80 text-xs sm:text-sm leading-relaxed font-sans">
                  Eaton Moeller is an international technology leader in electrical systems for power quality, distribution, and motor control automation. Siddhi Kabel Corporation maintains ready warehouse stocks of PKZM0 motor-protective circuit breakers, DILM contactors, and NZM MCCBs with direct manufacturer warranties.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-sky-900/40 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs font-mono text-sky-200/80">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <Award size={15} />
                <span>IEC/EN 60947 & UL 508 Worldwide Approvals</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Activity size={15} className="animate-pulse" />
                <span>Bangalore Hub: Ready Stock</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl p-8 border border-sky-900/40 bg-gradient-to-br from-[#0b132b] via-[#070b19] to-[#04060f] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400 block">
                EXECUTIVE PROCUREMENT
              </span>
              <h3 className="text-lg font-bold text-white">
                Ready to dispatch switchgear packages?
              </h3>
              <p className="text-xs text-sky-100/80 leading-relaxed">
                Access direct commercial pricing schedules or submit your automated panel Bill of Materials.
              </p>
            </div>

            <div className="space-y-3 relative z-10">
              <Link
                to="/#productsSection"
                className="w-full py-3.5 bg-[#0073e6] hover:bg-[#005bb5] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-102"
              >
                <Zap size={14} />
                <span>Browse EATON In Catalog</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedProduct("EATON Moeller Switchgear Price List")}
                className="w-full py-3.5 bg-black/40 hover:bg-black/60 text-sky-200 hover:text-white border border-sky-500/30 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={14} className="text-sky-400" />
                <span>Request Project Quotation</span>
              </button>
            </div>
          </div>

        </div>

        <div className="space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-stone-300 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-sky-700 font-bold block mb-1 flex items-center gap-1.5">
                <Terminal size={13} /> EATON ENGINEERING CONSOLE
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
            {eatonCategories.map((cat) => {
              const isSelected = activeSeriesId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSeriesId(cat.id)}
                  className={`p-5 rounded-2xl transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer border relative overflow-hidden shadow-sm ${
                    isSelected
                      ? "bg-[#070b19] text-white border-sky-700/60 shadow-xl ring-2 ring-sky-400/40 translate-y-[-2px]"
                      : "bg-white border-stone-200 text-stone-700 hover:border-stone-400 hover:bg-stone-50"
                  }`}
                >
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${isSelected ? "text-sky-400" : "text-stone-500"}`}>
                        SERIES {cat.index}
                      </span>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform ${isSelected ? "bg-[#0073e6] text-white font-bold rotate-90" : "bg-stone-100 text-stone-500"}`}>
                        <ChevronRight size={12} />
                      </div>
                    </div>
                    <h4 className={`text-sm font-black ${isSelected ? "text-white" : "text-stone-900"}`}>
                      {cat.shortTitle}
                    </h4>
                  </div>
                  <div className={`pt-4 relative z-10 flex items-center gap-2 text-[10px] font-mono ${isSelected ? "text-sky-200/80 font-bold" : "text-stone-500"}`}>
                    <Cpu size={12} className={isSelected ? "text-sky-400 animate-pulse" : ""} />
                    <span>{isSelected ? "Active Console Node" : "Click to Inspect"}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-[#070b19] text-white rounded-3xl border border-sky-900/50 p-6 sm:p-10 relative overflow-hidden shadow-2xl animate-fade-in transition-all duration-500" key={activeCategory.id}>
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-500/20 px-3 py-1 rounded-full border border-sky-400/30 inline-block shadow-2xs">
                    {activeCategory.code}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                    {activeCategory.title}
                  </h3>
                </div>

                <p className="text-sky-100/80 text-xs sm:text-sm leading-relaxed font-sans">
                  {activeCategory.desc}
                </p>

                <div className="w-full h-48 rounded-2xl bg-[#04060f] border border-sky-900/40 p-4 flex items-center justify-center shadow-inner overflow-hidden group">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/eaton-pkzm0.jpg";
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(`EATON ${activeCategory.title}`)}
                  className="w-full py-4 bg-[#0073e6] hover:bg-[#005bb5] text-white font-black text-xs rounded-xl transition-all shadow-lg hover:scale-102 cursor-pointer uppercase tracking-wider text-center"
                >
                  Request Official Series Quotation
                </button>
              </div>

              <div className="lg:col-span-7 space-y-6 bg-[#0b132b]/90 p-6 sm:p-8 rounded-2xl border border-sky-900/40 shadow-inner">
                
                <div className="space-y-2 font-mono">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                    <Layers size={16} />
                    <span>Hardware Telemetry & Parameters</span>
                  </div>
                  <p className="text-stone-900 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-[#faf8f5] border border-sky-300 font-mono shadow-inner font-bold">
                    {activeCategory.specs}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-200/70 font-bold block">
                    Available Stock Configurations & Part Numbers:
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeCategory.products.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#04060f] border border-sky-900/50 text-xs text-sky-50 font-medium shadow-sm hover:border-sky-400 hover:bg-[#070b19] hover:-translate-y-0.5 transition-all duration-300">
                        <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-sky-900/40 flex items-center justify-between text-xs">
                  <Link
                    to="/#productsSection"
                    className="font-bold text-sky-200 hover:text-sky-400 inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <span>Explore Full Catalog Inventory</span>
                    <ArrowRight size={14} className="text-sky-400 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <span className="font-mono text-sky-200/60 text-[11px]">Bangalore Hub Stock</span>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-[#070b19] text-white shadow-2xl border border-sky-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="text-sky-400 font-mono text-xs font-bold uppercase tracking-wider">
              READY INVENTORY · BANGALORE CENTRAL LOGISTICS HUB
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Building motor control centers or automated machine panels?
            </h3>
            <p className="text-xs sm:text-sm text-sky-100/80 leading-relaxed">
              Send your switchgear Bill of Materials. We provide calibrated breaker-contactor coordination schedules and immediate Bangalore dispatches.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/#rfqSection"
              className="px-6 py-3.5 bg-[#0073e6] hover:bg-[#005bb5] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 text-center"
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