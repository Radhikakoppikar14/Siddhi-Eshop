import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";

interface SlideData {
  id: string;
  tabNumber: string;
  tabLabel: string;
  tabSub: string;
  cardTopLabel: string;
  cardBottomText: string;
  cardBadge: string;
  brandTag: string;
  headline: string;
  description: string;
  exploreText: string;
  exploreLink: string;
  exploreColor: string;
  brandLogo: string;
  brandOrigin: string;
  productImage: string;
  secondaryImage?: string;
  badgeText: string;
  colorTheme: {
    tabActive: string;
    tabNumberActive: string;
    tabBorder: string;
    pill: string;
    accentText: string;
    glowBg: string;
  };
  tabTheme: {
    activeCard: string;
    activeBadge: string;
    activeSub: string;
    activeLogoBg: string;
    hoverCard: string;
    hoverTitle: string;
    hoverSub: string;
    hoverBadge: string;
    hoverLogo: string;
  };
  sampleItem: {
    id: string;
    name: string;
    partNo: string;
    brand: string;
    price: number;
    unit: string;
  };
}

interface HeroSliderProps {
  onSelectBrand?: (brandId: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectBrand }) => {
  const { addCustomItem } = useCart();
  const { showToast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides: SlideData[] = [
    {
      id: "lapp",
      tabNumber: "01",
      tabLabel: "LAPP",
      tabSub: "ÖLFLEX® Cables & Glands",
      cardTopLabel: "LAPP KABEL",
      cardBottomText: "ÖLFLEX® Cables",
      cardBadge: "GERMANY",
      brandTag: "LAPP KABEL · Germany",
      headline: "ÖLFLEX® Power & Control Cables",
      description:
        "European benchmark in oil-resistant flexible control cables, screened UNITRONIC® data lines, and IP68 SKINTOP® nickel-plated brass cable glands.",
      exploreText: "EXPLORE LAPP CABLES",
      exploreLink: "/about-lapp",
      exploreColor: "bg-red-600 hover:bg-red-500 text-white font-black shadow-lg shadow-red-600/30",
      brandLogo: "/images/logo-lapp.png",
      brandOrigin: "Stuttgart, Germany",
      productImage: "/images/cable-olflex-angle.png",
      secondaryImage: "/images/card-olflex.jpg",
      badgeText: "Direct OEM Partner · Ready Drum Stock",
      colorTheme: {
        tabActive: "bg-red-950/40 text-red-200 border-t-2 border-red-500",
        tabNumberActive: "bg-red-500 text-white font-bold",
        tabBorder: "hover:border-red-400/50",
        pill: "bg-red-500/15 text-red-300 border-red-500/40",
        accentText: "text-red-400",
        glowBg: "from-red-600/20 via-orange-600/10 to-transparent",
      },
      tabTheme: {
        activeCard: "bg-[#dc2626] text-white shadow-xl shadow-red-600/35 border-red-500 ring-2 ring-red-400/50 scale-[1.01]",
        activeBadge: "bg-white/20 text-white border border-white/30",
        activeSub: "text-red-100",
        activeLogoBg: "bg-white shadow-xs border border-red-200",
        hoverCard: "hover:bg-red-50/70 hover:border-red-400 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-0.5",
        hoverTitle: "group-hover:text-red-600",
        hoverSub: "group-hover:text-red-500",
        hoverBadge: "group-hover:bg-red-100 group-hover:text-red-700 group-hover:border-red-200",
        hoverLogo: "group-hover:border-red-300 group-hover:bg-red-50/50",
      },
      sampleItem: {
        id: "hero-olflex-110",
        name: "ÖLFLEX® CLASSIC 110 Control Cable 4G 1.5 sq mm",
        partNo: "1119304",
        brand: "LAPP KABEL",
        price: 98,
        unit: "meter",
      },
    },
    {
      id: "eaton",
      tabNumber: "02",
      tabLabel: "EATON",
      tabSub: "Motor Starters & Switchgear",
      cardTopLabel: "EATON - MOELLER",
      cardBottomText: "Switchgear & Breakers",
      cardBadge: "GERMANY / USA",
      brandTag: "EATON - MOELLER · Germany / USA",
      headline: "PKZM0 Breakers & DILM Contactors",
      description:
        "Switching capacity up to 150 kA, differential phase-failure sensitivity, and electronic wide-range coil technology for modern automated industrial panels.",
      exploreText: "EXPLORE EATON SWITCHGEAR",
      exploreLink: "/about-eaton",
      exploreColor: "bg-[#1864f7] hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30",
      brandLogo: "/images/logo-eaton.png",
      brandOrigin: "Germany / USA",
      productImage: "/images/eaton-pkzm0.jpg",
      secondaryImage: "/images/eaton-dilm.jpg",
      badgeText: "Authorized Stockist · 100% Genuine OEM",
      colorTheme: {
        tabActive: "bg-sky-950/40 text-sky-200 border-t-2 border-sky-400",
        tabNumberActive: "bg-sky-400 text-slate-950 font-bold",
        tabBorder: "hover:border-sky-400/50",
        pill: "bg-sky-400/15 text-sky-300 border-sky-400/40",
        accentText: "text-sky-400",
        glowBg: "from-sky-600/15 via-indigo-600/10 to-transparent",
      },
      tabTheme: {
        activeCard: "bg-[#1864f7] text-white shadow-xl shadow-blue-600/35 border-blue-500 ring-2 ring-blue-400/50 scale-[1.01]",
        activeBadge: "bg-white/20 text-white border border-white/30",
        activeSub: "text-blue-100",
        activeLogoBg: "bg-white shadow-xs border border-blue-200",
        hoverCard: "hover:bg-blue-50/70 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5",
        hoverTitle: "group-hover:text-blue-600",
        hoverSub: "group-hover:text-blue-500",
        hoverBadge: "group-hover:bg-blue-100 group-hover:text-blue-700 group-hover:border-blue-200",
        hoverLogo: "group-hover:border-blue-300 group-hover:bg-blue-50/50",
      },
      sampleItem: {
        id: "hero-pkzm0-16",
        name: "PKZM0-16 Motor Protective Circuit Breaker (10-16A)",
        partNo: "PKZM0-16",
        brand: "EATON - MOELLER",
        price: 3450,
        unit: "pc",
      },
    },
    {
      id: "partex",
      tabNumber: "03",
      tabLabel: "PARTEX",
      tabSub: "Wire Marking & Printers",
      cardTopLabel: "PARTEX",
      cardBottomText: "Wire & Cable Marking",
      cardBadge: "SWEDEN",
      brandTag: "PARTEX SWEDEN · Sweden",
      headline: "ProMark T-1000 & Chevron Markers",
      description:
        "Precision closed chevron wire sleeves, snap-on markers, and portable 300 dpi thermal transfer printers for industrial electrical panel identification.",
      exploreText: "EXPLORE PARTEX MARKING",
      exploreLink: "/about-partex",
      exploreColor: "bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-lg shadow-emerald-600/30",
      brandLogo: "/images/logo-partex.png",
      brandOrigin: "Gullspång, Sweden",
      productImage: "/images/partex-promark.jpg",
      secondaryImage: "/images/partex-pa.jpg",
      badgeText: "Authorized Stockist · UL94-V0 Compliant",
      colorTheme: {
        tabActive: "bg-emerald-950/40 text-emerald-200 border-t-2 border-emerald-400",
        tabNumberActive: "bg-emerald-400 text-slate-950 font-bold",
        tabBorder: "hover:border-emerald-400/50",
        pill: "bg-emerald-400/15 text-emerald-300 border-emerald-400/40",
        accentText: "text-emerald-400",
        glowBg: "from-emerald-600/15 via-teal-600/10 to-transparent",
      },
      tabTheme: {
        activeCard: "bg-[#059669] text-white shadow-xl shadow-emerald-600/35 border-emerald-500 ring-2 ring-emerald-400/50 scale-[1.01]",
        activeBadge: "bg-white/20 text-white border border-white/30",
        activeSub: "text-emerald-100",
        activeLogoBg: "bg-white shadow-xs border border-emerald-200",
        hoverCard: "hover:bg-emerald-50/70 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5",
        hoverTitle: "group-hover:text-emerald-600",
        hoverSub: "group-hover:text-emerald-500",
        hoverBadge: "group-hover:bg-emerald-100 group-hover:text-emerald-700 group-hover:border-emerald-200",
        hoverLogo: "group-hover:border-emerald-300 group-hover:bg-emerald-50/50",
      },
      sampleItem: {
        id: "hero-promark-t1000",
        name: "ProMark T-1000 Thermal Transfer Marking Machine",
        partNo: "PROMARK-T1000",
        brand: "PARTEX SWEDEN",
        price: 68500,
        unit: "set",
      },
    },
    {
      id: "mennekes",
      tabNumber: "04",
      tabLabel: "MENNEKES",
      tabSub: "CEE Plugs IP67 & AMAXX",
      cardTopLabel: "MENNEKES",
      cardBottomText: "CEE Plugs IP67",
      cardBadge: "GERMANY",
      brandTag: "MENNEKES · Germany",
      headline: "PowerTOP® Xtra Plugs & AMAXX® Enclosures",
      description:
        "Industry-defining standard in heavy-duty 16A-125A industrial CEE plugs, switched interlocked sockets, and drop-proof EverGUM® rubber power distributors.",
      exploreText: "EXPLORE MENNEKES PLUGS",
      exploreLink: "/about-mennekes",
      exploreColor: "bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/30",
      brandLogo: "/images/logo-mennekes.png",
      brandOrigin: "Kirchhundem, Germany",
      productImage: "/images/menn-powertop.jpg",
      secondaryImage: "/images/menn-amaxx.jpg",
      badgeText: "Authorized Stockist · VDE Certified",
      colorTheme: {
        tabActive: "bg-purple-950/40 text-purple-200 border-t-2 border-purple-500",
        tabNumberActive: "bg-purple-500 text-white font-bold",
        tabBorder: "hover:border-purple-400/50",
        pill: "bg-purple-500/15 text-purple-300 border-purple-500/40",
        accentText: "text-purple-400",
        glowBg: "from-purple-600/20 via-rose-600/10 to-transparent",
      },
      tabTheme: {
        activeCard: "bg-purple-600 text-white shadow-xl shadow-purple-600/35 border-purple-500 ring-2 ring-purple-400/50 scale-[1.01]",
        activeBadge: "bg-white/20 text-white border border-white/30",
        activeSub: "text-purple-100",
        activeLogoBg: "bg-white shadow-xs border border-purple-200",
        hoverCard: "hover:bg-purple-50/70 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5",
        hoverTitle: "group-hover:text-purple-600",
        hoverSub: "group-hover:text-purple-500",
        hoverBadge: "group-hover:bg-purple-100 group-hover:text-purple-700 group-hover:border-purple-200",
        hoverLogo: "group-hover:border-purple-300 group-hover:bg-purple-50/50",
      },
      sampleItem: {
        id: "hero-powertop-32a",
        name: "PowerTOP® Xtra 32A 5P IP67 Industrial Plug",
        partNo: "13512",
        brand: "MENNEKES",
        price: 2840,
        unit: "pc",
      },
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  const slide = slides[currentSlide];

  const handleQuickAdd = () => {
    addCustomItem(slide.sampleItem, slide.sampleItem.unit === "meter" ? 100 : 1);
    showToast(`Added ${slide.sampleItem.name} to RFQ Cart!`);
  };

  return (
    <section
      className="py-5 sm:py-7 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Dark Slider Stage Card - Now on Top */}
        <div className="bg-[#0a0f1d] text-white rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Dynamic Background Glow Keyed to Brand Color */}
          <div
            className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-gradient-to-br ${slide.colorTheme.glowBg} transition-all duration-700`}
          ></div>

          {/* Slide Content Grid */}
          <div className="p-4 sm:p-9 lg:p-11 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Editorial Content */}
              <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                
                {/* Brand Tag Pill with Authentic Brand Logo */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="h-6 sm:h-7 px-2 sm:px-2.5 bg-white rounded-lg flex items-center justify-center shadow-xs shrink-0">
                    <img
                      src={slide.brandLogo}
                      alt={slide.tabLabel}
                      className="h-3.5 sm:h-4 w-auto object-contain max-w-[55px] sm:max-w-[65px]"
                    />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase border ${slide.colorTheme.pill}`}
                  >
                    {slide.brandTag}
                  </span>
                </div>

                {/* Big Headline */}
                <h1 className="text-xl sm:text-3xl lg:text-[38px] font-black text-white tracking-tight leading-[1.15]">
                  {slide.headline}
                </h1>

                {/* Subtext */}
                <p className="text-slate-300 text-xs sm:text-sm lg:text-[14px] leading-relaxed max-w-xl">
                  {slide.description}
                </p>

                {/* Action Buttons Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
                  {onSelectBrand ? (
                    <button
                      type="button"
                      onClick={() => onSelectBrand(slide.id)}
                      className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:scale-102 cursor-pointer ${slide.exploreColor}`}
                    >
                      <span>{slide.exploreText}</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <Link
                      to={slide.exploreLink}
                      className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:scale-102 ${slide.exploreColor}`}
                    >
                      <span>{slide.exploreText}</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleQuickAdd}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
                    title="Quick Add Sample Item to RFQ"
                  >
                    <FileText size={14} className={slide.colorTheme.accentText} />
                    <span>Quick Add to RFQ</span>
                  </button>
                </div>

                {/* Trust Line */}
                <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] font-mono text-slate-400">
                  <div className={`flex items-center gap-1.5 font-semibold ${slide.colorTheme.accentText}`}>
                    <ShieldCheck size={13} />
                    <span>DIRECT FACTORY RATES</span>
                  </div>
                  <span className="text-slate-700 hidden sm:inline">·</span>
                  <span>Bangalore Ready Stock</span>
                  <span className="text-slate-700 hidden sm:inline">·</span>
                  <span>GST Tax Invoice</span>
                </div>

              </div>

              {/* Right Column: Illuminated Product Showcase Stage */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900/90 rounded-3xl p-3.5 sm:p-5 border border-slate-800 shadow-xl relative hover-card-lift">
                  
                  {/* White Product Image Stage */}
                  <div className="h-44 sm:h-60 w-full bg-white rounded-2xl p-3 sm:p-4 flex items-center justify-center gap-3 overflow-hidden border border-slate-700 shadow-md">
                    <img
                      src={slide.productImage}
                      alt={slide.headline}
                      className="max-h-full max-w-[48%] object-contain hover:scale-105 transition-transform duration-300"
                    />
                    {slide.secondaryImage && (
                      <img
                        src={slide.secondaryImage}
                        alt={slide.headline}
                        className="max-h-full max-w-[48%] object-contain hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  {/* Brand Auth Footer inside Stage Card */}
                  <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-6 px-2 bg-white rounded-md flex items-center justify-center shadow-xs">
                        <img
                          src={slide.brandLogo}
                          alt={slide.tabLabel}
                          className="h-4 w-auto object-contain max-w-[65px]"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-300">
                        Authorized Stockist
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      100% Genuine OEM
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Slider Controls Bar (Dots & Arrows) */}
          <div className="px-5 sm:px-9 py-3 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
            {/* Dots indicator with Active Brand Color */}
            <div className="flex items-center gap-2">
              {slides.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all rounded-full cursor-pointer ${
                    currentSlide === idx
                      ? `w-8 ${
                          s.id === "lapp"
                            ? "bg-red-500"
                            : s.id === "eaton"
                            ? "bg-blue-500"
                            : s.id === "partex"
                            ? "bg-emerald-500"
                            : "bg-purple-500"
                        }`
                      : "w-2 bg-slate-700 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={nextSlide}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

        </div>

        {/* 4 Brand Card Tabs - Positioned BELOW the slider, made smaller/compact, with brand-specific hover and active colors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 mt-3 sm:mt-4">
          {slides.map((tab, idx) => {
            const isActive = currentSlide === idx;
            const theme = tab.tabTheme;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`py-2 px-2.5 sm:py-2.5 sm:px-3.5 rounded-xl sm:rounded-2xl text-left transition-all duration-200 flex items-center gap-2 sm:gap-3 group cursor-pointer border ${
                  isActive
                    ? theme.activeCard
                    : `bg-white text-slate-800 border-slate-200/90 shadow-2xs ${theme.hoverCard}`
                }`}
                aria-label={`Select ${tab.cardTopLabel} portfolio`}
              >
                {/* Compact Logo Box */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center p-1 sm:p-1.5 shrink-0 transition-colors ${
                    isActive
                      ? theme.activeLogoBg
                      : `bg-slate-50 border border-slate-200/90 shadow-2xs ${theme.hoverLogo}`
                  }`}
                >
                  <img
                    src={tab.brandLogo}
                    alt={tab.tabLabel}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Text Content & Country Badge */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span
                      className={`text-[8px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider truncate transition-colors ${
                        isActive ? theme.activeSub : `text-slate-500 ${theme.hoverSub}`
                      }`}
                    >
                      {tab.cardTopLabel}
                    </span>
                    <span
                      className={`hidden xs:inline-block sm:inline-block px-1.5 py-0.2 rounded text-[7.5px] sm:text-[8.5px] font-mono font-bold tracking-wider uppercase shrink-0 transition-colors ${
                        isActive
                          ? theme.activeBadge
                          : `bg-slate-100 text-slate-500 border border-slate-200/80 ${theme.hoverBadge}`
                      }`}
                    >
                      {tab.cardBadge}
                    </span>
                  </div>

                  <h4
                    className={`text-[10.5px] sm:text-xs font-black tracking-tight leading-tight truncate transition-colors ${
                      isActive
                        ? "text-white"
                        : `text-slate-900 ${theme.hoverTitle}`
                    }`}
                  >
                    {tab.cardBottomText}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
