import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  FileText,
  Award,
  Cpu,
  Terminal,
  Activity,
  Layers,
} from "lucide-react";
import { RFQModal } from "../assets/components/ui/RFQModal";

export const AboutLapp: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeSeriesId, setActiveSeriesId] = useState<string>("olflex");

  const lappCategories = [
    {
      id: "olflex",
      index: "01",
      code: "SERIES 01 // OIL RESISTANT POWER",
      title: "ÖLFLEX® Power & Control Cables",
      shortTitle: "ÖLFLEX® Power",
      desc: "European benchmark oil-resistant flexible control and power cables for machinery, automated assembly lines, drag chains, and CNC machine tools.",
      specs: "VDE Reg. No. 7030 · PVC / PUR / TPE outer sheath · Flame retardant to IEC 60332-1-2 · -40°C to +80°C",
      products: [
        "ÖLFLEX® CLASSIC 110 (Numbered black cores + earth 0.5 to 120mm²)",
        "ÖLFLEX® CLASSIC 110 SY (Galvanised steel wire braid armour)",
        "ÖLFLEX® CLASSIC 110 CY (Tinned copper braided EMC screen)",
        "ÖLFLEX® FD 855 CP (Continuous high flex robotic drag chain cable)",
        "ÖLFLEX® HEAT 180 SIHF (Silicone high temp wire up to 180°C)",
        "ÖLFLEX® ROBUST 215 C (Chemical, washdown & weather resistant)",
        "ÖLFLEX® CRANE 2x (Flat pendant hoisting and festoon cable)",
        "ÖLFLEX® SOLAR XLS+ (Photovoltaic DC power cable with dual insulation)",
      ],
      image: "/images/card-olflex.jpg",
    },
    {
      id: "unitronic",
      index: "02",
      code: "SERIES 02 // FIELDBUS & DATA",
      title: "UNITRONIC® & ETHERLINE® Data Cables",
      shortTitle: "UNITRONIC® Data",
      desc: "High-speed sensor, instrumentation, and fieldbus communication cables for PROFINET, Industrial Gigabit Ethernet, RS-485, and CAN bus automation.",
      specs: "10 Gbit/s Cat.6A · Optimum screening against electrical interference · Tinned copper braided shield",
      products: [
        "UNITRONIC® LiYCY (Overall screened instrumentation control cable)",
        "ETHERLINE® Cat.5e & Cat.6A (PROFINET certified industrial Ethernet)",
        "UNITRONIC® BUS CAN / DeviceNet / PROFIBUS DP industrial bus",
        "UNITRONIC® SENSOR M8/M12 pre-wired automation cables",
        "UNITRONIC® FD CP (Continuous flex screened high-speed data)",
        "ETHERLINE® TORSION (Wind turbine nacelle network cable)",
        "UNITRONIC® LAN Structured Cat.7 Heavy Shield Installation Cable",
        "Industrial Gigabit Patch Cords with molded IP20 RJ45 boots",
      ],
      image: "/images/card-unitronic.jpg",
    },
    {
      id: "skintop",
      index: "03",
      code: "SERIES 03 // CABLE GLANDS",
      title: "SKINTOP® Cable Glands & Metric Nuts",
      shortTitle: "SKINTOP® Glands",
      desc: "Worldwide patented cable entry systems providing reliable IP68 strain relief, liquid tightness, and vibration-proof locking for electrical enclosures.",
      specs: "Metric M12 to M63 · Nickel-plated Brass & Polyamide · IP68 10 Bar pressure tightness · Lamellar cage",
      products: [
        "SKINTOP® MS-M (Nickel-plated brass IP68 EMC cable glands)",
        "SKINTOP® ST-M (Polyamide black / light grey strain relief glands)",
        "SKINDICHT® (Specialised PG & metric threaded conduit adapters)",
        "SKINTOP® BRUSH (EMC brass earthing glands with brush technology)",
        "SKINTOP® Counter Nuts GMP-GL & High-Grade O-Rings",
        "SKINTOP® INOX (Stainless steel hygienic design gland for pharma)",
        "SKINTOP® MULTI (Multi-cable insertion sealing insert plates)",
        "SKINTOP® Solar (Photovoltaic specialized connector gland)",
      ],
      image: "/images/card-skintop.jpg",
    },
    {
      id: "uniplus",
      index: "04",
      code: "SERIES 04 // PANEL SINGLE CORES",
      title: "UNIPLUS® Control Cabinet Single Cores",
      shortTitle: "UNIPLUS® Cores",
      desc: "High-performance panel wiring single cores with bright annealed electrolytic copper and heat-resistant PVC for control desks, switchgear, and relays.",
      specs: "450/750V rating · IS:694 & HAR standard · High flexibility Class 5 copper · Multiple bright colors",
      products: [
        "UNIPLUS® H05V-K (0.5 to 1.0 mm² fine strand control wire)",
        "UNIPLUS® H07V-K (1.5 to 240 mm² switchboard wiring cable)",
        "UNIPLUS® Tri-Rated (UL / CSA / BS British standard multi-approval)",
        "LAPP INFRA® Building Wires (FR-LSH low smoke flame retardant)",
        "UNIPLUS® Dual-Approved European switchboard wire",
        "H07V-R Stranded Rigid Panel Wiring Conductor",
        "H05V-U Solid Copper Instrument Panel Control Wire",
        "LAPP Panel Earth Bonding Flexible Copper Braided Strap",
      ],
      image: "/images/card-uniplus.jpg",
    },
    {
      id: "silvyn",
      index: "05",
      code: "SERIES 05 // PROTECTIVE CONDUITS",
      title: "SILVYN® Protective Conduit Systems",
      shortTitle: "SILVYN® Conduits",
      desc: "Flexible protective conduits and cable carrier chains engineered to protect automation wiring against mechanical friction, chips, and fluids.",
      specs: "IP67 / IP68 protection · Polyamide & Galvanized steel inner cores · High tear resistance",
      products: [
        "SILVYN® RLS (Galvanised steel conduit with PVC protective sheath)",
        "SILVYN® FPPA (Flexible corrugated polyamide PA6 plastic conduit)",
        "SILVYN® KLICK-M (Metric quick-connect straight conduit fitting)",
        "SILVYN® CHAIN (High-speed nylon cable carrier track systems)",
        "SILVYN® HIPROJACK (High temperature fiberglass protective sleeve)",
        "SILVYN® SCHLAV (Spiral corrugated plastic suction & protection hose)",
        "SILVYN® MPC (Metallic fitting with PG and metric threads)",
        "SILVYN® MG-M (Brass nickel-plated conduit gland connector)",
      ],
      image: "/images/card-unitronic.jpg",
    },
    {
      id: "epic",
      index: "06",
      code: "SERIES 06 // INDUSTRIAL CONNECTORS",
      title: "EPIC® Rectangular & Circular Connectors",
      shortTitle: "EPIC® Connectors",
      desc: "Heavy-duty industrial plug connectors designed for safe power and signal transmission in harsh factory floor environments and robotic cells.",
      specs: "IP65 to IP68 rating · Screw, crimp, and cage clamp terminations · Vibration secure locking levers",
      products: [
        "EPIC® H-BE Series Screw Termination Inserts (6 to 32 contacts)",
        "EPIC® H-A Metal & Plastic Housing Hoods and Panel Bases",
        "EPIC® M12 Sensor / Actuator Circular Connectors",
        "EPIC® SIGNAL M23 Servo Feedback Circular Connectors",
        "EPIC® ULTRA EMC Shielded Heavy Duty Connector Hoods",
        "EPIC® POWER LS1 High Current Servo Motor Connectors",
        "EPIC® DATA RJ45 Panel Mount Industrial Bulkhead Adapters",
        "Gold-Plated Crimp Contacts (Male & Female pin sets)",
      ],
      image: "/images/olflex-servo-fd-796.jpg",
    },
    {
      id: "fleximark",
      index: "07",
      code: "SERIES 07 // IDENTIFICATION SYSTEMS",
      title: "FLEXIMARK® Cable Marking Systems",
      shortTitle: "FLEXIMARK® Tags",
      desc: "Durable stainless steel, aluminum, and polyester cable and component marking systems for clear cabinet wiring identification.",
      specs: "Halogen-free materials · Laser and thermal transfer printable · Extreme UV & chemical resistance",
      products: [
        "FLEXIMARK® Stainless Steel Character Holders & Plates",
        "FLEXIMARK® Cable Marking Rings (Closed and open grip sleeves)",
        "FLEXIMARK® TA Marking Tags for heavy cable bundles",
        "FLEXIMARK® Shrink Mark Heat Shrinkable Identification Tubing",
        "FLEXIMARK® Software for automated legend printing",
        "FLEXIMARK® Push-Button Legend Plates & Holder Strips",
        "Acid-Proof Stainless Steel Cable Ties (AISI 316)",
        "Self-Adhesive Polyester Warning and Terminal Strip Labels",
      ],
      image: "/images/olflex-FD-891.jpg",
    },
    {
      id: "hitFlex",
      index: "08",
      code: "SERIES 08 // ROBOTIC CABLE ASSEMBLIES",
      title: "LAPP Custom Cable Assemblies & Servo Solutions",
      shortTitle: "Custom Assemblies",
      desc: "Ready-to-install pre-terminated cable assemblies, servo cable harnesses, and multi-axis robotic dress packs built to exact customer drawings.",
      specs: "100% factory continuity & hipot tested · Custom lengths · Certified traceability",
      products: [
        "Pre-Terminated Servo Drive Cable Assemblies (Siemens / Fanuc specs)",
        "Multi-Axis Robotic Dress Pack Complete Assemblies",
        "Custom Cut-To-Length ÖLFLEX® Drums with Terminated Lugs",
        "Pre-Wired Control Cabinet Interconnection Cable Looms",
        "Custom ETHERLINE® Industrial Network Patch Harnesses",
        "Water-Cooled Welding Cable Assemblies with Fitted Terminals",
        "Harsh Environment Sealed Cable Pigtail Assemblies",
        "Engineered Pull-Tested Heavy Industrial Lifting Slings with Wire",
      ],
      image: "/images/olflex-spiral.jpg",
    },
  ];

  const activeCategory = lappCategories.find((c) => c.id === activeSeriesId) || lappCategories[0];

  return (
    <div className="pt-6 pb-24 bg-[#faf8f5] text-stone-900 min-h-screen select-none relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
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
            LAPP Kabel Germany · Bento Command Matrix
          </span>
        </nav>

        {/* LAPP BRAND HERO CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          <div className="lg:col-span-8 rounded-3xl p-8 sm:p-10 border border-amber-900/40 bg-gradient-to-br from-[#1f150b] via-[#140e07] to-[#0a0704] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="h-12 px-4 bg-white rounded-2xl border border-stone-200 shadow-md flex items-center justify-center">
                  <img
                    src="/images/logo-lapp.png"
                    alt="Lapp Kabel Logo"
                    className="h-6 w-auto max-w-[120px] object-contain"
                  />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-[#FFCC4D] font-mono font-bold text-xs uppercase tracking-wider border border-amber-400/40 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#FFCC4D]" />
                  Official Authorized Channel Partner
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-black/40 text-amber-200/90 font-mono text-xs font-semibold border border-amber-900/50">
                  🇩🇪 Stuttgart · Bangalore Hub
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                  LAPP India Private Limited — Integrated Cable & Connection Systems
                </h1>
                <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed font-sans">
                  Founded in Stuttgart, Germany by Oskar Lapp, LAPP is the world's leading manufacturer of integrated cable and connection systems. Siddhi Kabel Corporation is an authorized channel partner providing warehouse drum stock of ÖLFLEX®, UNITRONIC®, and SKINTOP® with direct factory test certificates (EN 10204 3.1).
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-amber-900/40 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs font-mono text-amber-200/80">
              <div className="flex items-center gap-2 text-[#FFCC4D] font-bold">
                <Award size={15} />
                <span>VDE Reg. No. 7030 & ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Activity size={15} className="animate-pulse" />
                <span>Bangalore Hub: Ready Stock</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-3xl p-8 border border-amber-900/40 bg-gradient-to-br from-[#1f150b] via-[#140e07] to-[#0a0704] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FFCC4D] block">
                EXECUTIVE PROCUREMENT
              </span>
              <h3 className="text-lg font-bold text-white">
                Need custom drum cutting or project pricing?
              </h3>
              <p className="text-xs text-amber-100/80 leading-relaxed">
                Access direct commercial pricing schedules or submit your calibrated cable schedule.
              </p>
            </div>

            <div className="space-y-3 relative z-10">
              <button
                type="button"
                onClick={() => setSelectedProduct("LAPP India Commercial Price List")}
                className="w-full py-3.5 bg-[#FFCC4D] hover:bg-[#F2B935] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 cursor-pointer"
              >
                <FileText size={14} className="text-slate-950" />
                <span>Request Project Quotation</span>
              </button>
            </div>
          </div>

        </div>

        {/* BENTO SPOTLIGHT SPEC-MATRIX */}
        <div className="space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-stone-300 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold block mb-1 flex items-center gap-1.5">
                <Terminal size={13} /> LAPP ENGINEERING CONSOLE
              </span>
              <h2 className="text-2xl font-black text-stone-950 tracking-tight">
                Interactive Series Architecture Deck
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-500">
              Click any series card below to load live hardware parameters
            </span>
          </div>

          {/* 8 Interactive Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lappCategories.map((cat) => {
              const isSelected = activeSeriesId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSeriesId(cat.id)}
                  className={`p-5 rounded-2xl transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer border relative overflow-hidden shadow-sm ${
                    isSelected
                      ? "bg-[#140e07] text-white border-amber-700/60 shadow-xl ring-2 ring-amber-400/40 translate-y-[-2px]"
                      : "bg-white border-stone-200 text-stone-700 hover:border-stone-400 hover:bg-stone-50"
                  }`}
                >
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${isSelected ? "text-[#FFCC4D]" : "text-stone-500"}`}>
                        SERIES {cat.index}
                      </span>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform ${isSelected ? "bg-[#FFCC4D] text-slate-950 font-bold rotate-90" : "bg-stone-100 text-stone-500"}`}>
                        <ChevronRight size={12} />
                      </div>
                    </div>
                    <h4 className={`text-sm font-black ${isSelected ? "text-white" : "text-stone-900"}`}>
                      {cat.shortTitle}
                    </h4>
                  </div>
                  <div className={`pt-4 relative z-10 flex items-center gap-2 text-[10px] font-mono ${isSelected ? "text-amber-200/80 font-bold" : "text-stone-500"}`}>
                    <Cpu size={12} className={isSelected ? "text-[#FFCC4D] animate-pulse" : ""} />
                    <span>{isSelected ? "Active Console Node" : "Click to Inspect"}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Asymmetric Spotlight Display Card */}
          <div className="bg-[#140e07] text-white rounded-3xl border border-amber-900/50 p-6 sm:p-10 relative overflow-hidden shadow-2xl animate-fade-in transition-all duration-500" key={activeCategory.id}>
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Spotlight Series Info & Image */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFCC4D] bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30 inline-block shadow-2xs">
                    {activeCategory.code}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                    {activeCategory.title}
                  </h3>
                </div>

                <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed font-sans">
                  {activeCategory.desc}
                </p>

                {/* Floating Preview Pedestal */}
                <div className="w-full h-48 rounded-2xl bg-[#0a0704] border border-amber-900/40 p-4 flex items-center justify-center shadow-inner overflow-hidden group">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/card-olflex.jpg";
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(`LAPP ${activeCategory.title}`)}
                  className="w-full py-4 bg-[#FFCC4D] hover:bg-[#F2B935] text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg hover:scale-102 cursor-pointer uppercase tracking-wider text-center"
                >
                  Request Official Series Quotation
                </button>
              </div>

              {/* Right Column: Hardware Parameter Matrix & Part Lists */}
              <div className="lg:col-span-7 space-y-6 bg-[#1f150b]/90 p-6 sm:p-8 rounded-2xl border border-amber-900/40 shadow-inner">
                
                <div className="space-y-2 font-mono">
                  <div className="flex items-center gap-2 text-[#FFCC4D] text-xs font-bold uppercase tracking-wider">
                    <Layers size={16} />
                    <span>Hardware Telemetry & Parameters</span>
                  </div>
                  <p className="text-stone-900 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-[#faf8f5] border border-amber-300 font-mono shadow-inner font-bold">
                    {activeCategory.specs}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200/70 font-bold block">
                    Available Stock Configurations & Part Numbers (8 Standard Items):
                  </span>
                  <div className="grid grid-cols-1 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {activeCategory.products.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0a0704] border border-amber-900/50 text-xs text-amber-50 font-medium shadow-sm hover:border-amber-400 hover:bg-[#140e07] hover:-translate-y-0.5 transition-all duration-300">
                        <CheckCircle2 size={16} className="text-[#FFCC4D] shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-900/40 flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-200/60 text-[11px]">Bangalore Central Hub Ready Stock</span>
                </div>

              </div>

            </div>

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