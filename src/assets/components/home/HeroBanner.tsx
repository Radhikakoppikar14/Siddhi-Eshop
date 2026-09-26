import React, { useState } from "react";
import {
  ArrowRight,
  ShoppingCart,
  Sparkles,
  Zap,
} from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";

export const HeroBanner: React.FC = () => {
  const { addCustomItem } = useCart();
  const { showToast } = useToast();

  const [activeItem, setActiveItem] = useState<"lapp" | "eaton" | "partex" | "mennekes">("lapp");
  
  // Interactive configurator state for cable inspector
  const [cores, setCores] = useState(4);
  const [size, setSize] = useState(1.5);
  const [drumLength, setDrumLength] = useState(100);

  // Dynamic calculations for Lapp cable interactive display
  const calculatedWeight = Math.round((cores * size * 11.2 + 25) * (drumLength / 100));
  const estimatedUnitPrice = Math.max(
    32,
    Math.round(28 * Math.pow(cores, 0.45) * Math.pow(size, 0.72) + 14)
  );
  const estimatedLineTotal = estimatedUnitPrice * drumLength;

  const handleAddConfiguredCable = () => {
    const configName = `ÖLFLEX® CLASSIC 110 ${cores} Core x ${size} sq mm (${drumLength}m Drum)`;
    addCustomItem(
      {
        id: `hero-lapp-${cores}x${size}-${drumLength}m`,
        name: configName,
        partNo: `LAPP-111920${cores}`,
        brand: "LAPP KABEL",
        price: estimatedUnitPrice,
        unit: "meter",
      },
      drumLength
    );
    showToast(`Added ${drumLength}m of ${configName} to RFQ Cart!`);
  };

  const handleAddPresetItem = (partNo: string, name: string, brand: string, price: number, unit: string) => {
    addCustomItem(
      {
        id: `hero-${partNo}`,
        name,
        partNo,
        brand,
        price,
        unit,
      },
      1
    );
    showToast(`Added ${name} to RFQ Cart!`);
  };

  return (
    <section className="relative overflow-hidden py-12 lg:py-18 select-none bg-gradient-to-b from-white via-slate-50/60 to-white border-b border-slate-200/80">
      
      {/* Light Ambient Glow Accents */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-sky-200/25 blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-10 right-16 w-96 h-96 rounded-full bg-rose-200/20 blur-3xl pointer-events-none animate-float" style={{ animationDelay: "1.5s" }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Clean Light Minimalist Editorial Presentation */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Status Indicators */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/90 text-xs font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                BANGALORE CENTRAL SUPPLY HUB
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-mono">
                &lt;24H PAN-INDIA DISPATCH
              </span>
            </div>

            {/* Editorial Headline in Sharp Contrast Slate-950 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Industrial Electrical Infrastructure.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-rose-600 block mt-1 font-extrabold">
                Direct European OEM Sourcing.
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Authorised channel partners for <strong className="text-slate-950">Lapp Kabel Germany</strong>, <strong className="text-slate-950">Eaton Moeller</strong>, <strong className="text-slate-950">Partex Sweden</strong>, and <strong className="text-slate-950">Mennekes</strong>. Zero grey imports, ready warehouse drum stock, and fast B2B quotation generation.
            </p>

            {/* Brand Matrix Badges with Light Pastel Tints */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>LAPP Germany</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span>EATON Moeller</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>PARTEX Sweden</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>MENNEKES</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <a
                href="#rfqSection"
                className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:scale-102"
              >
                <span>Request Project RFQ</span>
                <ArrowRight size={14} />
              </a>

              <a
                href="#productsSection"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border border-slate-200 shadow-2xs hover:scale-102"
              >
                <Zap size={14} className="text-amber-500" />
                <span>Browse Inventory Catalog</span>
              </a>
            </div>

            {/* Live Metrics Grid with Clean Hybrid Styling */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200">
              <div className="p-3.5 bg-white border border-rose-100 rounded-2xl shadow-2xs">
                <span className="text-xl sm:text-2xl font-black text-rose-600 font-mono block">4</span>
                <span className="text-[11px] text-slate-500 font-medium">Direct OEMs</span>
              </div>
              <div className="p-3.5 bg-white border border-sky-100 rounded-2xl shadow-2xs">
                <span className="text-xl sm:text-2xl font-black text-sky-600 font-mono block">&lt;24h</span>
                <span className="text-[11px] text-slate-500 font-medium">Dispatch Lead</span>
              </div>
              <div className="p-3.5 bg-white border border-emerald-100 rounded-2xl shadow-2xs">
                <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono block">100%</span>
                <span className="text-[11px] text-slate-500 font-medium">OEM Certified</span>
              </div>
              <div className="p-3.5 bg-white border border-purple-100 rounded-2xl shadow-2xs">
                <span className="text-xl sm:text-2xl font-black text-purple-600 font-mono block">18%</span>
                <span className="text-[11px] text-slate-500 font-medium">GST Tax Credit</span>
              </div>
            </div>

          </div>

          {/* Right Column: Deep Obsidian Component Terminal (The Perfect Dark Accent) */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-800 relative hover-card-lift">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">
                    SPEC_TERMINAL // v2.6
                  </span>
                </div>

                <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20 font-mono tracking-wider flex items-center gap-1">
                  <Sparkles size={11} className="text-sky-400" />
                  Live Component Inspector
                </span>
              </div>

              {/* Segmented Brand Selector */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-900 rounded-2xl mb-5 border border-slate-800">
                {[
                  { id: "lapp", label: "LAPP Cable", activeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-xs font-bold" },
                  { id: "eaton", label: "EATON Switch", activeClass: "bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-xs font-bold" },
                  { id: "partex", label: "PARTEX Mark", activeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-xs font-bold" },
                  { id: "mennekes", label: "MENNEKES", activeClass: "bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-xs font-bold" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveItem(tab.id as any)}
                    className={`py-2 px-2 rounded-xl text-[11px] transition-all text-center border ${
                      activeItem === tab.id
                        ? tab.activeClass
                        : "border-transparent text-slate-400 hover:text-white font-medium"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Content Panel based on active selection */}
              {activeItem === "lapp" && (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Visual and Header */}
                  <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                    <div className="w-20 h-20 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-slate-700 shadow-sm">
                      <img
                        src="/images/cable-olflex-angle.png"
                        alt="LAPP Cable"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/card-olflex.jpg";
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider block">
                        LAPP KABEL GERMANY · OIL RESISTANT
                      </span>
                      <h3 className="text-sm font-bold text-white truncate">
                        ÖLFLEX® CLASSIC 110 Control Cable
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        VDE Reg. 7030 · PVC Sheath · -40°C to +80°C · Flame retardant
                      </p>
                    </div>
                  </div>

                  {/* Interactive Controls */}
                  <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    
                    {/* Cores Selector */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400 font-medium">Core Configuration:</span>
                        <span className="font-mono text-white font-bold">{cores} Cores</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 text-xs font-mono">
                        {[2, 3, 4, 5, 7].map((c) => (
                          <button
                            key={c}
                            onClick={() => setCores(c)}
                            className={`py-1.5 rounded-xl border text-center transition-all ${
                              cores === c
                                ? "bg-rose-600 text-white font-bold border-rose-500 shadow-xs"
                                : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                            }`}
                          >
                            {c}C
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Selector */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400 font-medium">Conductor Cross Section:</span>
                        <span className="font-mono text-white font-bold">{size} sq mm</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                        {[0.5, 0.75, 1.0, 1.5, 2.5].map((s) => (
                          <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`py-1.5 rounded-xl border text-center transition-all ${
                              size === s
                                ? "bg-rose-600 text-white font-bold border-rose-500 shadow-xs"
                                : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                            }`}
                          >
                            {s} mm²
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Drum Cut Length Slider */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400 font-medium">Package / Drum Length:</span>
                        <span className="font-mono text-rose-400 font-bold">{drumLength} Meters</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="1000"
                        step="50"
                        value={drumLength}
                        onChange={(e) => setDrumLength(parseInt(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                        <span>50m (Ring)</span>
                        <span>500m (Standard Drum)</span>
                        <span>1000m (Master Reel)</span>
                      </div>
                    </div>

                  </div>

                  {/* Calculations & Quick Add Footer */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">
                        Estimated Total ({drumLength}m)
                      </div>
                      <div className="text-lg font-black font-mono text-white">
                        ₹{estimatedLineTotal.toLocaleString("en-IN")}
                        <span className="text-xs text-slate-400 font-normal ml-1.5">
                          (₹{estimatedUnitPrice}/m)
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Approx Weight: ~{calculatedWeight} kg
                      </div>
                    </div>

                    <button
                      onClick={handleAddConfiguredCable}
                      className="py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-rose-600/25 hover:scale-102"
                    >
                      <ShoppingCart size={14} />
                      <span>Add to RFQ</span>
                    </button>
                  </div>

                </div>
              )}

              {activeItem === "eaton" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                    <div className="w-20 h-20 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-slate-700 shadow-sm">
                      <img
                        src="/images/eaton-pkzm0.jpg"
                        alt="EATON PKZM0"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider block">
                        EATON MOELLER GERMANY · MOTOR PROTECTION
                      </span>
                      <h3 className="text-sm font-bold text-white truncate">
                        PKZM0-16 Motor-Protective Circuit-Breaker
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        10 - 16A Setting Range · 150 kA Breaking · Phase failure sensitive
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                      <span>Rated Operational Voltage:</span>
                      <span className="font-mono text-white font-bold">690V AC</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                      <span>Short-Circuit Breaking Capacity:</span>
                      <span className="font-mono text-white font-bold">150 kA @ 400V</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-400">
                      <span>Standards Compliance:</span>
                      <span className="font-mono text-white font-bold">IEC/EN 60947-4-1, VDE 0660</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">
                        Base List Price
                      </div>
                      <div className="text-lg font-black font-mono text-white">
                        ₹3,250.00
                        <span className="text-xs text-slate-400 font-normal ml-1">/ unit</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddPresetItem("EATON-PKZM0-16", "PKZM0-16 Motor Starter", "EATON - MOELLER", 3250, "unit")}
                      className="py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-sky-600/25 hover:scale-102"
                    >
                      <ShoppingCart size={14} />
                      <span>Add to RFQ</span>
                    </button>
                  </div>
                </div>
              )}

              {activeItem === "partex" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                    <div className="w-20 h-20 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-slate-700 shadow-sm">
                      <img
                        src="/images/partex-pa.jpg"
                        alt="Partex PA"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                        PARTEX SWEDEN · WIRE IDENTIFICATION
                      </span>
                      <h3 className="text-sm font-bold text-white truncate">
                        PA-1 Closed Chevron Cut Wire Markers
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Interlocking chevron profile · 0.75 - 4.0 mm² · Cadmium-free PVC
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                      <span>Wire Diameter Compatibility:</span>
                      <span className="font-mono text-white font-bold">2.5 mm to 5.0 mm</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                      <span>Flammability Rating:</span>
                      <span className="font-mono text-white font-bold">UL94-V0 Self-Extinguishing</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-400">
                      <span>Packaging:</span>
                      <span className="font-mono text-white font-bold">1,000 Markers / Reel</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">
                        Base List Price (1000 Pack)
                      </div>
                      <div className="text-lg font-black font-mono text-white">
                        ₹480.00
                        <span className="text-xs text-slate-400 font-normal ml-1">/ pack</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddPresetItem("PARTEX-PA1-SET", "PA-1 Wire Markers (1000 Pack)", "PARTEX SWEDEN", 480, "pack")}
                      className="py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-amber-600/25 hover:scale-102"
                    >
                      <ShoppingCart size={14} />
                      <span>Add to RFQ</span>
                    </button>
                  </div>
                </div>
              )}

              {activeItem === "mennekes" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                    <div className="w-20 h-20 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-slate-700 shadow-sm">
                      <img
                        src="/images/menn-powertop.jpg"
                        alt="Mennekes PowerTOP"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
                        MENNEKES GERMANY · CEE PLUGS & SOCKETS
                      </span>
                      <h3 className="text-sm font-bold text-white truncate">
                        PowerTOP® Xtra 32A 5P Heavy Duty Plug
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        IP67 Watertight · SafeCONTACT insulation displacement · 400V Red
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                      <span>Poles & Voltage:</span>
                      <span className="font-mono text-white font-bold">5-Pole (3P+N+E) 400V 6h</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                      <span>Ingress Protection:</span>
                      <span className="font-mono text-white font-bold">IP67 Submersible Watertight</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-400">
                      <span>Terminal Style:</span>
                      <span className="font-mono text-white font-bold">Screwless SafeCONTACT</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">
                        Base List Price
                      </div>
                      <div className="text-lg font-black font-mono text-white">
                        ₹2,840.00
                        <span className="text-xs text-slate-400 font-normal ml-1">/ unit</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddPresetItem("MENN-PT-32A5P", "PowerTOP Xtra 32A 5P Plug", "MENNEKES", 2840, "unit")}
                      className="py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-purple-600/25 hover:scale-102"
                    >
                      <ShoppingCart size={14} />
                      <span>Add to RFQ</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
