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

export const AboutEaton: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const eatonCategories = [
    {
      id: "pkzm0",
      seriesCode: "SERIES 01 // MOTOR PROTECTORS",
      title: "PKZM0® Motor-Protective Circuit-Breakers",
      desc: "Manual motor starters with thermal overload and magnetic short-circuit releases up to 150 kA breaking capacity. Safe phase failure sensitivity for 3-phase AC motors.",
      specs: "0.16A to 32A ratings · 150 kA at 400V · IEC/EN 60947-4-1 · UL 508 / CSA approved",
      products: [
        "PKZM0-0.16 to PKZM0-32 (Standard rotary handle)",
        "PKZM01 Pushbutton Starter for machinery",
        "PKE Electronic Wide Range Motor Starter",
        "DILA Auxiliary Contact Relays",
        "B3.1/3-PKZ0 Common Phase Busbar Adapters",
      ],
      link: "/#productsSection",
      image: "/images/eaton-pkzm0.jpg",
      highlightColor: "border-sky-300 bg-sky-50/30",
      accentTag: "bg-sky-100 text-sky-900 border-sky-300",
      accentDot: "bg-sky-500",
    },
    {
      id: "dilm",
      seriesCode: "SERIES 02 // POWER CONTACTORS",
      title: "DILM® Power Contactors & Overload Relays",
      desc: "World-class power contactors engineered for heavy AC-3 motor starting, capacitive switching, and industrial automation with SmartWire-DT connectivity.",
      specs: "3-Pole 7A to 1000A · Electronic AC/DC coils · Low holding power consumption · 10 million operations",
      products: [
        "DILM7, DILM9, DILM12, DILM15 (Compact Frame 1)",
        "DILM17 to DILM38 (Frame 2 Automation Starters)",
        "DILM40 to DILM72 (Frame 3 Heavy Duty Contactor)",
        "DILM80 to DILM170 (Frame 4 High Current)",
        "ZB12 / ZB32 Differential Thermal Overload Relays",
      ],
      link: "/#productsSection",
      image: "/images/eaton-dilm.jpg",
      highlightColor: "border-blue-300 bg-blue-50/30",
      accentTag: "bg-blue-100 text-blue-900 border-blue-300",
      accentDot: "bg-blue-500",
    },
    {
      id: "nzm",
      seriesCode: "SERIES 03 // COMPACT MCCB",
      title: "NZM® Molded Case Circuit Breakers (MCCB)",
      desc: "Compact circuit breakers up to 1600 A with state-of-the-art microprocessor releases, energy monitoring, and comprehensive selectivity for distribution panels.",
      specs: "NZM1 to NZM4 · 20A to 1600A · Breaking capacity 25kA to 150kA · Worldwide market approvals",
      products: [
        "NZMN1-A (Basic 160A Thermal-Magnetic MCCB)",
        "NZMN2-A250 (Electronic Microprocessor Trip Unit)",
        "NZMN3-AE (Up to 630A Heavy Substation Feeder)",
        "NZMN4-VE (1600A Diagnostic Diagnostic Releases)",
        "Door Coupling Rotary Handles & Under-Voltage Trips",
      ],
      link: "/#productsSection",
      image: "/images/eaton-nzm.jpg",
      highlightColor: "border-sky-400 bg-sky-50/40",
      accentTag: "bg-sky-100 text-sky-950 border-sky-400",
      accentDot: "bg-sky-600",
    },
    {
      id: "rmq",
      seriesCode: "SERIES 04 // PILOT DEVICES",
      title: "RMQ-TITAN® Pilot Devices & Control Stations",
      desc: "Heavy-duty 22.5mm modular pushbuttons, emergency stop palm buttons, selector switches, and multi-chip LED indicator lights with IP67/IP69K washdown ratings.",
      specs: "M22 Series · IP67/IP69K washdown · Titanium front bezel · 5 million operations · Toolless clip contact",
      products: [
        "M22-D Flush & Extended Pushbutton Actuators",
        "M22-PV Emergency Stop Mushroom Palms (ISO 13850)",
        "M22-W 2-Position & 3-Position Selector Switches",
        "M22-L Multi-Chip High Luminance LED Indicators",
        "Surface Mounting Enclosures M22-IY & Legend Plates",
      ],
      link: "/#productsSection",
      image: "/images/eaton-rmq.jpg",
      highlightColor: "border-indigo-300 bg-indigo-50/30",
      accentTag: "bg-indigo-100 text-indigo-900 border-indigo-300",
      accentDot: "bg-indigo-500",
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
            EATON MOELLER Germany · Switchgear Make Sheet
          </span>
        </nav>

        {/* FANCY MODERN BRAND EXECUTIVE HERO (Coordinated Minimalist Light Sky Blue) */}
        <div className="rounded-3xl p-6 sm:p-10 border border-sky-200/90 bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-white shadow-xl mb-10 relative overflow-hidden">
          
          {/* Ambient Lighting Orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-2xl">
              
              {/* Badge & German / US Origin Header */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-11 px-3 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-center">
                  <img
                    src="/images/logo-eaton.png"
                    alt="Eaton Moeller Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>

                <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 font-mono font-bold text-xs uppercase tracking-wider border border-sky-300 flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck size={14} className="text-sky-600" />
                  Official Authorized Stockist
                </span>

                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold border border-slate-200">
                  🇩🇪 Bonn, Germany · 🇺🇸 Cleveland, USA
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                EATON Moeller — Industrial Motor Control & Power Distribution
              </h1>

              {/* Editorial Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Eaton Moeller is an international technology leader in electrical systems for power quality, distribution, and motor control automation. Siddhi Kabel Corporation maintains ready warehouse stocks of PKZM0 motor-protective circuit breakers, DILM contactors, and NZM MCCBs with direct manufacturer warranties and rapid dispatch to automation panel builders across South India.
              </p>

              {/* Trust Indicators Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-1.5 text-sky-700 font-bold">
                  <Award size={14} />
                  <span>IEC/EN 60947 & UL 508 Worldwide Approvals</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-sky-500" />
                  <span>150 kA Tested Short-Circuit Breaking</span>
                </div>
                <span>·</span>
                <span>Bangalore Ready Stock</span>
              </div>

            </div>

            {/* Action Column */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 self-start lg:self-center">
              <Link
                to="/#productsSection"
                className="px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 hover:scale-102"
              >
                <Zap size={15} />
                <span>Browse EATON In Catalog</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedProduct("EATON Moeller Switchgear Price List")}
                className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={15} />
                <span>Request Project Quotation</span>
              </button>
            </div>

          </div>
        </div>

        {/* 4 CORE EATON DISCIPLINES (Fancy, Modern, Coordinated Light Sky Cards) */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-600 font-bold">
                APPROVED OEM SWITCHGEAR RANGES
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                EATON Moeller Power Control Series
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Showing 4 Industry-Standard Control Disciplines
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {eatonCategories.map((cat) => (
              <div
                key={cat.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 border-2 ${cat.highlightColor} shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  
                  {/* Top Bar: Series Code + Visual Thumbnail Pedestal */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-800 bg-sky-100/90 px-2.5 py-0.5 rounded-full inline-block">
                        {cat.seriesCode}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-950 group-hover:text-sky-700 transition-colors">
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
                          e.currentTarget.src = "/images/eaton-pkzm0.jpg";
                        }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  {/* Fancy Colorful Parameters Dock */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-sky-50/40 border border-sky-200/90 text-xs text-slate-800 mb-5 font-mono shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-sky-950 mb-1 text-[11px] uppercase tracking-wider">
                      <Layers size={13} className="text-sky-600" />
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
                        <li key={i} className="flex items-center gap-2 p-1 rounded-lg hover:bg-sky-50/60 transition-colors">
                          <CheckCircle2 size={14} className="text-sky-600 shrink-0" />
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
                    className="text-xs font-bold text-slate-950 hover:text-sky-600 inline-flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>View Models In Catalog</span>
                    <ArrowRight size={14} className="text-sky-600" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(`Eaton ${cat.title}`)}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition-all shadow-2xs hover:scale-105 cursor-pointer"
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="text-sky-400 font-mono text-xs font-bold uppercase tracking-wider">
              READY INVENTORY · BANGALORE CENTRAL LOGISTICS HUB
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Building motor control centers or automated machine panels?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Send your switchgear Bill of Materials. We provide calibrated breaker-contactor coordination schedules and immediate Bangalore dispatches.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/#rfqSection"
              className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-500/20 hover:scale-102 text-center"
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
