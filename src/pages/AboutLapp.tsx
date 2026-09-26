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

export const AboutLapp: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const lappCategories = [
    {
      id: "olflex",
      seriesCode: "SERIES 01 // OIL RESISTANT",
      title: "ÖLFLEX® Power & Control Cables",
      desc: "European benchmark oil-resistant flexible control and power cables for machinery, automated assembly lines, drag chains, and CNC machine tools.",
      specs: "VDE Reg. No. 7030 · PVC / PUR / TPE outer sheath · Flame retardant to IEC 60332-1-2 · -40°C to +80°C",
      products: [
        "ÖLFLEX® CLASSIC 110 (Numbered black cores + earth)",
        "ÖLFLEX® CLASSIC 110 SY (Galvanised steel wire braid)",
        "ÖLFLEX® CLASSIC 110 CY (Tinned copper EMC screen)",
        "ÖLFLEX® FD 855 CP (Continuous high flex drag chain)",
        "ÖLFLEX® HEAT 180 (Silicone high temp wire up to 180°C)",
      ],
      link: "/#productsSection",
      image: "/images/card-olflex.jpg",
      highlightColor: "border-amber-300 bg-amber-50/30",
      accentTag: "bg-amber-100 text-amber-900 border-amber-300",
      accentDot: "bg-amber-500",
    },
    {
      id: "unitronic",
      seriesCode: "SERIES 02 // FIELDBUS & DATA",
      title: "UNITRONIC® & ETHERLINE® Data Cables",
      desc: "High-speed sensor, instrumentation, and fieldbus communication cables for PROFINET, Industrial Gigabit Ethernet, RS-485, and CAN bus automation.",
      specs: "10 Gbit/s Cat.6A · Optimum screening against electrical interference · Tinned copper braided shield",
      products: [
        "UNITRONIC® LiYCY (Screened instrumentation cables)",
        "ETHERLINE® Cat.5e & Cat.6A (PROFINET certified)",
        "UNITRONIC® BUS CAN / DeviceNet / PROFIBUS DP",
        "UNITRONIC® SENSOR M8/M12 automation wiring",
        "UNITRONIC® FD CP (Continuous flex screened data)",
      ],
      link: "/#productsSection",
      image: "/images/card-unitronic.jpg",
      highlightColor: "border-orange-300 bg-orange-50/30",
      accentTag: "bg-orange-100 text-orange-900 border-orange-300",
      accentDot: "bg-orange-500",
    },
    {
      id: "skintop",
      seriesCode: "SERIES 03 // CABLE GLANDS",
      title: "SKINTOP® Cable Glands & Metric Nuts",
      desc: "Worldwide patented cable entry systems providing reliable IP68 strain relief, liquid tightness, and vibration-proof locking for electrical enclosures.",
      specs: "Metric M12 to M63 · Nickel-plated Brass & Polyamide · IP68 10 Bar pressure tightness · Lamellar cage",
      products: [
        "SKINTOP® MS-M (Nickel-plated brass IP68 glands)",
        "SKINTOP® ST-M (Polyamide black / light grey glands)",
        "SKINDICHT® (Specialised PG & metric adapters)",
        "SKINTOP® BRUSH (EMC brass earthing brushes)",
        "SKINTOP® Counter Nuts GMP-GL & O-Rings",
      ],
      link: "/#productsSection",
      image: "/images/card-skintop.jpg",
      highlightColor: "border-amber-400 bg-amber-50/40",
      accentTag: "bg-amber-100 text-amber-950 border-amber-400",
      accentDot: "bg-amber-600",
    },
    {
      id: "uniplus",
      seriesCode: "SERIES 04 // PANEL SINGLE CORES",
      title: "UNIPLUS® Control Cabinet Single Cores",
      desc: "High-performance panel wiring single cores with bright annealed electrolytic copper and heat-resistant PVC for control desks, switchgear, and relays.",
      specs: "450/750V rating · IS:694 & HAR standard · High flexibility Class 5 copper · Multiple bright colors",
      products: [
        "UNIPLUS® H05V-K (0.5 to 1.0 mm² fine strand)",
        "UNIPLUS® H07V-K (1.5 to 240 mm² control wiring)",
        "UNIPLUS® Tri-Rated (UL / CSA / BS multi-standard)",
        "LAPP INFRA® Building Wires (FR-LSH flame retardant)",
        "UNIPLUS® Dual-Approved European switchboard wire",
      ],
      link: "/#productsSection",
      image: "/images/card-uniplus.jpg",
      highlightColor: "border-yellow-400 bg-yellow-50/30",
      accentTag: "bg-yellow-100 text-yellow-900 border-yellow-300",
      accentDot: "bg-yellow-500",
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
            LAPP Kabel Germany · Technical Make Sheet
          </span>
        </nav>

        {/* FANCY MODERN BRAND EXECUTIVE HERO (Coordinated Minimalist Light Amber) */}
        <div className="rounded-3xl p-6 sm:p-10 border border-amber-200/90 bg-gradient-to-br from-amber-500/10 via-orange-400/5 to-white shadow-xl mb-10 relative overflow-hidden">
          
          {/* Ambient Lighting Orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-2xl">
              
              {/* Badge & German Origin Header */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-11 px-3 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-center">
                  <img
                    src="/images/logo-lapp.png"
                    alt="Lapp Kabel Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs uppercase tracking-wider border border-amber-300 flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck size={14} className="text-amber-600" />
                  Official Authorized Channel Partner
                </span>

                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold border border-slate-200">
                  🇩🇪 Stuttgart, Germany · Jigani (Bangalore)
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                LAPP India Private Limited — Integrated Cable & Connection Systems
              </h1>

              {/* Editorial Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Founded in Stuttgart, Germany by Oskar Lapp, LAPP is the world's leading manufacturer of integrated cable and connection systems. In India, LAPP operates manufacturing plants in Jigani (Bangalore) and Pilukhedi (Bhopal). Siddhi Kabel Corporation is an authorized channel partner providing warehouse drum stock of ÖLFLEX®, UNITRONIC®, and SKINTOP® with direct factory test certificates (EN 10204 3.1).
              </p>

              {/* Trust Indicators Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                  <Award size={14} />
                  <span>VDE Reg. No. 7030 & ISO 9001:2015</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Direct Factory Batch Test Reports</span>
                </div>
                <span>·</span>
                <span>Bangalore Ready Warehouse Drum Stock</span>
              </div>

            </div>

            {/* Action Column */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 self-start lg:self-center">
              <Link
                to="/#productsSection"
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-102"
              >
                <Zap size={15} />
                <span>Browse LAPP In Catalog</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedProduct("LAPP India Commercial Price List")}
                className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={15} />
                <span>Request Project Quotation</span>
              </button>
            </div>

          </div>
        </div>

        {/* 4 CORE LAPP DISCIPLINES (Fancy, Modern, Coordinated Light Amber Cards) */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-bold">
                APPROVED OEM PRODUCT DISCIPLINES
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                LAPP Kabel System Offerings
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Showing 4 Specialized Cable & Connection Ranges
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {lappCategories.map((cat) => (
              <div
                key={cat.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 border-2 ${cat.highlightColor} shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  
                  {/* Top Bar: Series Code + Visual Thumbnail Pedestal */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full inline-block">
                        {cat.seriesCode}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-950 group-hover:text-amber-700 transition-colors">
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
                          e.currentTarget.src = "/images/cable-olflex-thumb.png";
                        }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  {/* Fancy Colorful Parameters Dock */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50/40 border border-amber-200/90 text-xs text-slate-800 mb-5 font-mono shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-950 mb-1 text-[11px] uppercase tracking-wider">
                      <Layers size={13} className="text-amber-600" />
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
                        <li key={i} className="flex items-center gap-2 p-1 rounded-lg hover:bg-amber-50/60 transition-colors">
                          <CheckCircle2 size={14} className="text-amber-600 shrink-0" />
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
                    className="text-xs font-bold text-slate-950 hover:text-amber-600 inline-flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>View Models In Catalog</span>
                    <ArrowRight size={14} className="text-amber-600" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(`LAPP ${cat.title}`)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-2xs hover:scale-105 cursor-pointer"
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              READY INVENTORY · BANGALORE CENTRAL LOGISTICS HUB
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Need custom drum cutting or volume project pricing?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Send your cable schedule or Bill of Materials. We provide calibrated drum cutting without scrap surcharge, dispatched with manufacturer test reports.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/#rfqSection"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/20 hover:scale-102 text-center"
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
