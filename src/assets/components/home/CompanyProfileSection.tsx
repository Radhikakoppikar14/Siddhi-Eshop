import React from "react";
import {
  ShieldCheck,
  Award,
  Warehouse,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

export const CompanyProfileSection: React.FC = () => {
  const brandLogos = [
    { name: "LAPP KABEL", logo: "/images/logo-lapp.png", origin: "Germany", role: "Direct Channel Partner" },
    { name: "EATON", logo: "/images/logo-eaton.png", origin: "Germany / USA", role: "Authorized Switchgear Stockist" },
    { name: "PARTEX", logo: "/images/logo-partex.png", origin: "Sweden", role: "Authorized Marking Distributor" },
    { name: "MENNEKES", logo: "/images/logo-mennekes.png", origin: "Germany", role: "Authorized CEE Stockist" },
  ];

  const pillars = [
    {
      id: "expertise",
      title: "Industrial Engineering Expertise",
      subtitle: "20+ Years Field Experience",
      desc: "Specialized technical assistance helping panel builders, automation engineers, and machine tool manufacturers select exact cable cross-sections, breaking capacities, and IP ratings.",
      icon: Award,
      badge: "TECHNICAL CONSULTING",
      colorTheme: {
        border: "border-amber-200/90 hover:border-amber-400",
        bg: "bg-gradient-to-b from-amber-50/40 via-white to-amber-50/15",
        iconBg: "bg-amber-500 text-slate-950",
        badgeStyle: "bg-amber-100 text-amber-900 border-amber-300",
        accent: "text-amber-800",
      },
      highlights: ["Cable Sizing & Ampacity", "EMC Screening Guidance", "Breaking Capacity Audits"],
    },
    {
      id: "warehouse",
      title: "Warehouse & Custom Cut Infrastructure",
      subtitle: "Bangalore Logistics Hub",
      desc: "Equipped with motorized cable decoilers, heavy drum cranes, and laser measuring stations to supply exact required cut lengths without charging for unnecessary scrap.",
      icon: Warehouse,
      badge: "READY WAREHOUSE DRUMS",
      colorTheme: {
        border: "border-sky-200/90 hover:border-sky-400",
        bg: "bg-gradient-to-b from-sky-50/40 via-white to-sky-50/15",
        iconBg: "bg-[#1864f7] text-white",
        badgeStyle: "bg-sky-100 text-sky-900 border-sky-300",
        accent: "text-sky-800",
      },
      highlights: ["Exact Meter Cut Delivery", "Heavy Drum Unspooling", "Same-Day Dispatch Pickups"],
    },
    {
      id: "commercials",
      title: "Transparent & Structured Commercials",
      subtitle: "100% Tax Compliant",
      desc: "Full 18% GST Input Tax Credit (ITC) invoicing, price-firm corporate annual contracting, and certified EN 10204 3.1 manufacturer test reports with every industrial consignment.",
      icon: FileCheck,
      badge: "GST ITC COMPLIANT",
      colorTheme: {
        border: "border-emerald-200/90 hover:border-emerald-400",
        bg: "bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/15",
        iconBg: "bg-emerald-600 text-white",
        badgeStyle: "bg-emerald-100 text-emerald-900 border-emerald-300",
        accent: "text-emerald-800",
      },
      highlights: ["EN 10204 3.1 MTC Test Certs", "Direct Factory Batch Pricing", "Corporate Credit Facilities"],
    },
  ];

  return (
    <section className="py-10 sm:py-14 select-none bg-slate-50/70" id="aboutSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Executive Card Container with 2-Color Shadow (Dark Cast + Light Highlight Shading) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-[12px_18px_36px_-6px_rgba(15,23,42,0.13),-8px_-8px_24px_0px_rgba(255,255,255,0.95)] relative overflow-hidden">
          
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row: Profile Info & Key Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 pb-8 border-b border-slate-200/80">
            
            {/* Left Col: Brand Mission & Heritage */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-700 font-bold">
                  COMPANY PROFILE & AUTHORIZED DISTRIBUTORSHIP
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Siddhi Kabel Corporation
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Established as South India&apos;s premier authorized industrial distributor for high-reliability electrical automation components, flexible power cables, and motor control switchgear. Headquartered in Bangalore&apos;s trade corridor, we bridge European engineering excellence with immediate on-the-ground warehouse inventory.
              </p>
            </div>

            {/* Right Col: Quick Trust Badge Card with 2-Color Shadow Shading */}
            <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-[8px_14px_24px_-4px_rgba(0,0,0,0.45),-4px_-4px_14px_0px_rgba(255,255,255,0.12)]">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider block mb-1">
                CORPORATE ASSURANCE
              </span>
              <h3 className="text-sm font-bold text-white mb-3">
                100% Factory Direct Channel
              </h3>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Direct Factory Batch Test Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>GST Invoicing with Input Tax Credit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Bangalore Central Stocking Depots</span>
                </div>
              </div>
            </div>

          </div>

          {/* OFFICIAL AUTHORIZED PARTNER LOGOS STRIP */}
          <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                <ShieldCheck size={14} className="text-amber-600" />
                <span>Direct Authorized OEM Brand Channels:</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                100% Genuine Warranty & Factory Traceability
              </span>
            </div>

            {/* 4 Brand Partner Logos Grid with 2-Color Shadow Shading */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {brandLogos.map((brand, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-[4px_8px_16px_-2px_rgba(15,23,42,0.07),-4px_-4px_12px_0px_rgba(255,255,255,0.95)] hover:shadow-[6px_12px_20px_-2px_rgba(15,23,42,0.12),-5px_-5px_15px_0px_rgba(255,255,255,1)] hover:border-slate-300 transition-all flex items-center justify-between gap-2.5 group"
                >
                  <div className="h-7 sm:h-8 max-w-[85px] sm:max-w-[100px] flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {brand.origin}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 PILLARS: Sculpted with 2-Color Shadow Shading (Dark Cast + Light Highlight) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className={`p-6 rounded-2xl border-2 ${pillar.colorTheme.border} ${pillar.colorTheme.bg} shadow-[8px_14px_24px_-4px_rgba(15,23,42,0.12),-6px_-6px_18px_0px_rgba(255,255,255,0.95)] hover:shadow-[12px_20px_32px_-4px_rgba(15,23,42,0.18),-8px_-8px_24px_0px_rgba(255,255,255,1)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
                >
                  <div>
                    {/* Header with Icon Badge & Tag */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div
                        className={`w-11 h-11 rounded-2xl ${pillar.colorTheme.iconBg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                      >
                        <IconComponent size={20} />
                      </div>
                      <span
                        className={`text-[9.5px] font-mono font-bold px-2.5 py-1 rounded-full border ${pillar.colorTheme.badgeStyle}`}
                      >
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 mb-2.5 leading-snug">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Highlights Bullets */}
                  <div className="pt-3 border-t border-slate-200/70 space-y-1.5">
                    {pillar.highlights.map((item, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700"
                      >
                        <CheckCircle2 size={12} className={`${pillar.colorTheme.accent} shrink-0`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
