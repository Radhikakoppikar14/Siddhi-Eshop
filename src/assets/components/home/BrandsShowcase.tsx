import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, ChevronLeft, ChevronRight, PackageCheck, ShoppingCart, Cpu, Radio, Zap } from "lucide-react";
import { useCart } from "../../../context/CartContext";

export const BrandsShowcase: React.FC = () => {
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const { addToCart } = useCart();

  const brands = [
    {
      id: "lapp",
      name: "LAPP KABEL GERMANY",
      shortName: "LAPP KABEL",
      tag: "FEATURED_ALLIANCE_PARTNER // DIRECT OEM",
      country: "Germany · Stuttgart",
      products: "ÖLFLEX® Power & Control Cables",
      desc: "European benchmark oil-resistant flexible control cables, screened UNITRONIC® data lines, and IP68 SKINTOP® nickel-plated brass cable glands.",
      link: "/catalog?brand=LAPP+KABEL",
      logo: "/images/logo-lapp.png",
      image: "/images/card-olflex.jpg",
      defaultProductId: "lapp-1119203",
      accentBg: "bg-[#FFCC4D] hover:bg-[#F2B935] text-slate-950",
      cardTheme: "from-[#2e1210] via-[#521c16] to-[#1a0806]",
      glowColor: "bg-amber-500/25",
      borderColor: "border-amber-500/40",
      activeTabStyle: "bg-[#60241E] text-amber-300 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]",
      icon: Cpu,
    },
    {
      id: "eaton",
      name: "EATON MOELLER",
      shortName: "EATON - MOELLER",
      tag: "AUTHORIZED_SWITCHGEAR // 24/7 RELIABILITY",
      country: "Germany · Bonn",
      products: "PKZM0 Breakers & DILM Contactors",
      desc: "Switching capacity up to 150 kA, differential phase-failure sensitivity, and electronic wide-range coil technology for modern automated industrial panels.",
      link: "/catalog?brand=EATON+-+MOELLER",
      logo: "/images/logo-eaton.png",
      image: "/images/eaton-pkzm0.jpg",
      defaultProductId: "eaton-pkzm0-0.16",
      accentBg: "bg-sky-400 hover:bg-sky-300 text-slate-950",
      cardTheme: "from-[#061424] via-[#0b223d] to-[#030912]",
      glowColor: "bg-sky-500/25",
      borderColor: "border-sky-500/40",
      activeTabStyle: "bg-[#0f2d52] text-sky-300 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]",
      icon: Zap,
    },
    {
      id: "partex",
      name: "PARTEX SWEDEN",
      shortName: "PARTEX",
      tag: "IDENTIFICATION_PIONEER // SINCE 1948",
      country: "Sweden · Gullspång",
      products: "Wire & Cable Marking Systems",
      desc: "Precision PA closed chevron sleeves, ProMark T-1000 300dpi thermal transfer marker printers, and AISI 316 acid-proof stainless steel tags.",
      link: "/catalog?brand=PARTEX+SWEDEN",
      logo: "/images/logo-partex.png",
      image: "/images/partex-pa.jpg",
      defaultProductId: "partex-pa-02",
      accentBg: "bg-emerald-400 hover:bg-emerald-300 text-slate-950",
      cardTheme: "from-[#051c11] via-[#0b3320] to-[#020f09]",
      glowColor: "bg-emerald-500/25",
      borderColor: "border-emerald-500/40",
      activeTabStyle: "bg-[#113d28] text-emerald-300 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]",
      icon: Radio,
    },
    {
      id: "mennekes",
      name: "MENNEKES GERMANY",
      shortName: "MENNEKES",
      tag: "CEE_INDUSTRIAL_PLUG_STANDARD",
      country: "Germany · Kirchhundem",
      products: "CEE Plugs IP67 & AMAXX® Units",
      desc: "World leader in heavy-duty CEE industrial plugs, PowerTOP® Xtra rubberized connectors, and modular AMAPLAST power distribution enclosures.",
      link: "/catalog?brand=MENNEKES",
      logo: "/images/logo-mennekes.png",
      image: "/images/menn-powertop.jpg",
      defaultProductId: "menn-powertop-16a",
      accentBg: "bg-purple-400 hover:bg-purple-300 text-slate-950",
      cardTheme: "from-[#160a1d] via-[#281133] to-[#0c0410]",
      glowColor: "bg-purple-500/25",
      borderColor: "border-purple-500/40",
      activeTabStyle: "bg-[#32173f] text-purple-300 border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.3)]",
      icon: Cpu,
    },
  ];

  const current = brands[activeBrandIndex];

  // Auto-rotate hero slider every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBrandIndex((prev) => (prev + 1) % brands.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [brands.length]);

  const handleQuickAdd = () => {
    addToCart(current.defaultProductId, 1);
  };

  return (
    <section className="py-8 bg-[#faf8f5] border-b border-stone-300 select-none" id="brandsSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unified Engineering Command Console Box */}
        <div className={`bg-gradient-to-br ${current.cardTheme} text-white rounded-[2.5rem] p-6 sm:p-9 shadow-2xl border ${current.borderColor} relative overflow-hidden flex flex-col justify-between transition-all duration-700 animate-fade-in`}>
          
          {/* Ambient Animated Glow */}
          <div className={`absolute top-0 right-0 w-96 h-96 ${current.glowColor} rounded-full blur-3xl pointer-events-none transition-all duration-700`} />

          {/* TOP INTEGRATED BRAND COMMAND DOCK */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-bold">
                OEM CONSOLE // ACTIVE CHANNEL:
              </span>
            </div>

            {/* Brand Switcher Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {brands.map((b, idx) => {
                const isActive = activeBrandIndex === idx;
                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveBrandIndex(idx)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
                      isActive
                        ? b.activeTabStyle
                        : "bg-black/30 text-slate-300 border-white/10 hover:bg-black/50 hover:text-white"
                    }`}
                  >
                    <img src={b.logo} alt={b.shortName} className="h-3.5 object-contain max-w-[55px] brightness-200" />
                    <span className="truncate">{b.shortName.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TOP META STATUS BAR */}
          <div className="flex items-center justify-between gap-3 flex-wrap relative z-10 mb-4">
            <span className="px-3 py-1 rounded-full bg-black/30 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1.5 backdrop-blur-xs">
              <Sparkles size={12} className="text-amber-400 animate-spin" />
              {current.tag}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/30 text-slate-200 font-mono text-[10px] font-semibold border border-white/10 flex items-center gap-1 backdrop-blur-xs">
              <PackageCheck size={12} className="text-emerald-400" />
              PAN-INDIA WAREHOUSE DISPATCH
            </span>
          </div>

          {/* MIDDLE MAIN CONTENT STAGE */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10 my-2">
            
            {/* Left Column: Brand Telemetry & Actions */}
            <div className="md:col-span-7 space-y-3.5">
              <div className="flex items-center gap-2.5">
                <div className="h-10 px-3.5 bg-white rounded-2xl flex items-center justify-center border border-white/20 shadow-md">
                  <img src={current.logo} alt={current.name} className="h-5 object-contain max-w-[90px]" />
                </div>
                <span className="text-xs font-mono text-slate-300 font-semibold">{current.country}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {current.products}
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans line-clamp-3">
                {current.desc}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-row items-center gap-3 flex-wrap">
                <Link
                  to={current.link}
                  className={`px-5 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg flex flex-row items-center gap-2 transition-transform hover:scale-102 cursor-pointer whitespace-nowrap shrink-0 ${current.accentBg}`}
                >
                  <span>EXPLORE {current.shortName}</span>
                  <ArrowRight size={14} className="shrink-0" />
                </Link>

                <button
                  type="button"
                  onClick={handleQuickAdd}
                  className="px-5 py-3.5 rounded-2xl bg-black/70 hover:bg-black/90 text-white font-bold text-xs uppercase tracking-wider shadow-md flex flex-row items-center gap-2 transition-transform hover:scale-102 cursor-pointer border border-white/20 backdrop-blur-xs whitespace-nowrap shrink-0"
                >
                  <ShoppingCart size={14} className="text-amber-400 shrink-0" />
                  <span>Quick Add to RFQ</span>
                </button>
              </div>

              <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-slate-300">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck size={13} /> DIRECT FACTORY RATES
                </span>
                <span>·</span>
                <span>Bangalore Ready Stock</span>
              </div>
            </div>

            {/* Right Column: Floating Live Product Hologram Stage */}
            <div className="md:col-span-5">
              <div className="bg-white/95 backdrop-blur-md text-stone-900 rounded-3xl p-4 border border-white/30 shadow-2xl flex flex-col items-center justify-center text-center space-y-3 group">
                <div className="w-full aspect-square bg-stone-50 rounded-2xl border border-stone-200 p-3 flex items-center justify-center overflow-hidden shadow-inner max-h-[180px]">
                  <img
                    src={current.image}
                    alt={current.products}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="w-full flex items-center justify-between text-[11px] font-mono px-1">
                  <span className="text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Authorized Stockist
                  </span>
                  <span className="text-stone-700 font-bold flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-600" /> 100% Genuine
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM TELEMETRY & SLIDER CONTROLS */}
          <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              {brands.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBrandIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeBrandIndex === i ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveBrandIndex((prev) => (prev === 0 ? brands.length - 1 : prev - 1))}
                className="p-2 rounded-xl bg-black/30 hover:bg-black/50 text-white transition-colors border border-white/20 cursor-pointer backdrop-blur-xs"
                aria-label="Previous brand"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActiveBrandIndex((prev) => (prev + 1) % brands.length)}
                className="p-2 rounded-xl bg-black/30 hover:bg-black/50 text-white transition-colors border border-white/20 cursor-pointer backdrop-blur-xs"
                aria-label="Next brand"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};