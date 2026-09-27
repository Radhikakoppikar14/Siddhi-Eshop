import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  Sparkles,
  ExternalLink,
  Building2,
} from "lucide-react";
import { RFQModal } from "../ui/RFQModal";

interface BrandSeries {
  id: string;
  seriesCode: string;
  title: string;
  desc: string;
  specs: string;
  products: string[];
  image: string;
}

interface BrandProfile {
  id: string;
  name: string;
  fullName: string;
  country: string;
  flag: string;
  origin: string;
  logo: string;
  desc: string;
  tagline: string;
  partnerBadge: string;
  certs: string;
  catalogQuery: string;
  themeBg: string;
  themeHex: string;
  selectedCardBg: string;
  containerBg: string;
  borderAccent: string;
  buttonBg: string;
  badgeStyle: string;
  accentText: string;
  series: BrandSeries[];
}

export const BrandPortfoliosSection: React.FC = () => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>("mennekes");
  const [activeSeriesIndex, setActiveSeriesIndex] = useState<number>(0);
  const [rfqModalItem, setRfqModalItem] = useState<{ name: string; brand: string } | null>(null);
  const navigate = useNavigate();

  const brandProfiles: Record<string, BrandProfile> = {
    lapp: {
      id: "lapp",
      name: "LAPP KABEL",
      fullName: "LAPP India Private Limited — Integrated Cable & Connection Systems",
      country: "GERMANY",
      flag: "🇩🇪",
      origin: "Stuttgart, Germany · Jigani (Bangalore)",
      logo: "/images/logo-lapp.png",
      desc: "Global pioneer in integrated cable and connection technology. Inventor of ÖLFLEX®.",
      tagline:
        "Founded in Stuttgart, Germany by Oskar Lapp, LAPP is the world's leading manufacturer of integrated cable and connection systems. In India, LAPP operates manufacturing plants in Jigani (Bangalore) and Pilukhedi (Bhopal). Siddhi Kabel Corporation is an authorized channel partner providing warehouse drum stock of ÖLFLEX®, UNITRONIC®, and SKINTOP® with direct factory test certificates (EN 10204 3.1).",
      partnerBadge: "Official Authorized Channel Partner",
      certs: "VDE Reg. No. 7030 & ISO 9001:2015 · EN 10204 3.1 Certified",
      catalogQuery: "LAPP KABEL",
      themeBg: "bg-amber-500",
      themeHex: "#F59E0B",
      selectedCardBg: "bg-gradient-to-br from-[#421714] via-[#60241E] to-[#2B0E0B] text-white border-amber-400 shadow-2xl scale-[1.01]",
      containerBg: "bg-gradient-to-br from-[#421714] via-[#521c16] to-[#250c0a] text-white border-amber-500/40 shadow-2xl",
      borderAccent: "border-l-4 border-l-amber-400",
      buttonBg: "bg-amber-400 hover:bg-amber-300 text-slate-950 font-black",
      badgeStyle: "bg-black/40 text-amber-300 border-amber-400/40",
      accentText: "text-amber-300",
      series: [
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
          ],
          image: "/images/card-olflex.jpg",
        },
        {
          id: "unitronic",
          seriesCode: "SERIES 02 // FIELDBUS & DATA",
          title: "UNITRONIC® & ETHERLINE® Data Cables",
          desc: "High-speed sensor, instrumentation, and fieldbus communication cables for PROFINET, Industrial Gigabit Ethernet, RS-485, and CAN bus automation.",
          specs: "10 GBit/s Cat.6A · Optimum screening against electrical interference · Tinned copper braided shield",
          products: [
            "UNITRONIC® LiYCY (Screened instrumentation cables)",
            "ETHERLINE® Cat.5e & Cat.6A (PROFINET certified)",
            "UNITRONIC® BUS CAN / DeviceNet / PROFIBUS DP",
            "UNITRONIC® SENSOR M8/M12 automation wiring",
          ],
          image: "/images/card-unitronic.jpg",
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
          ],
          image: "/images/card-skintop.jpg",
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
          ],
          image: "/images/card-uniplus.jpg",
        },
      ],
    },
    eaton: {
      id: "eaton",
      name: "EATON - MOELLER",
      fullName: "EATON Power Quality & Moeller Industrial Switchgear",
      country: "GERMANY / USA",
      flag: "🇩🇪 / 🇺🇸",
      origin: "Bonn, Germany · Cleveland, USA",
      logo: "/images/logo-eaton.png",
      desc: "World leader in intelligent motor control, switchgear, automation and power distribution.",
      tagline:
        "Global technology leader in power management solutions, industrial motor protection, automated switchgear, and intelligent panel automation. Fully certified IEC/EN 60947 series components engineered for uninterrupted 24/7 heavy industrial reliability with smart automation interfaces.",
      partnerBadge: "Authorized Industrial Stockist",
      certs: "IEC / EN 60947 & UL 508 · ISO 9001 & CE Certified",
      catalogQuery: "EATON - MOELLER",
      themeBg: "bg-sky-500",
      themeHex: "#38BDF8",
      selectedCardBg: "bg-gradient-to-br from-[#08182b] via-[#0d2847] to-[#040e1b] text-white border-sky-400 shadow-2xl scale-[1.01]",
      containerBg: "bg-gradient-to-br from-[#08182b] via-[#0d2847] to-[#040e1b] text-white border-sky-500/40 shadow-2xl",
      borderAccent: "border-l-4 border-l-sky-400",
      buttonBg: "bg-sky-400 hover:bg-sky-300 text-slate-950 font-black",
      badgeStyle: "bg-black/40 text-sky-300 border-sky-400/40",
      accentText: "text-sky-300",
      series: [
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
          ],
          image: "/images/eaton-pkzm0.jpg",
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
            "ZB12 / ZB32 Differential Thermal Overload Relays",
          ],
          image: "/images/eaton-dilm.jpg",
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
            "Door Coupling Rotary Handles & Under-Voltage Trips",
          ],
          image: "/images/eaton-nzm.jpg",
        },
        {
          id: "rmq",
          seriesCode: "SERIES 04 // PILOT DEVICES",
          title: "RMQ-TITAN® Pilot Devices & Control Stations",
          desc: "Ergonomic 22.5 mm pushbuttons, selector switches, LED indicator lights, and emergency stop actuators built for extreme environmental toughness up to IP69K.",
          specs: "IP67 / IP69K front ring · LED illumination >100,000 hrs · Flat modular design · SmartWire compatible",
          products: [
            "M22-D Flush & Extended Pushbuttons",
            "M22-PV Emergency Stop Palms (ISO 13850)",
            "M22-W Rotary Illuminated Selector Switches",
            "Surface Mounting Control Enclosures M22-I",
          ],
          image: "/images/eaton-rmq.jpg",
        },
      ],
    },
    partex: {
      id: "partex",
      name: "PARTEX",
      fullName: "PARTEX Marking Systems — Industrial Wire & Cable Identification",
      country: "SWEDEN",
      flag: "🇸🇪",
      origin: "Gullspång, Sweden",
      logo: "/images/logo-partex.png",
      desc: "Precision wire, cable and component marking systems engineered in Sweden since 1948.",
      tagline:
        "Engineered in Sweden since 1948 by Tore Lööf, PARTEX is the undisputed worldwide benchmark in industrial cable, wire, and panel marking systems. UL94-V0 flame retardant chevron sleeves, high-speed thermal transfer printers, and AISI 316 acid-proof stainless tags.",
      partnerBadge: "Direct Authorized Identification Distributor",
      certs: "UL94-V0 Flame Retardant · RoHS & REACH Compliant",
      catalogQuery: "PARTEX SWEDEN",
      themeBg: "bg-emerald-500",
      themeHex: "#34D399",
      selectedCardBg: "bg-gradient-to-br from-[#072115] via-[#0e3b25] to-[#03110a] text-white border-emerald-400 shadow-2xl scale-[1.01]",
      containerBg: "bg-gradient-to-br from-[#072115] via-[#0e3b25] to-[#03110a] text-white border-emerald-500/40 shadow-2xl",
      borderAccent: "border-l-4 border-l-emerald-400",
      buttonBg: "bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black",
      badgeStyle: "bg-black/40 text-emerald-300 border-emerald-400/40",
      accentText: "text-emerald-300",
      series: [
        {
          id: "pa",
          seriesCode: "SERIES PA // CLOSED CHEVRON",
          title: "PA Closed Wire Markers (Chevron Cut)",
          desc: "Single-digit closed chevron cut sleeves for wires from 0.2 to 70 sq mm. The interlocking chevron profile ensures individual characters stay permanently aligned on wire bundles.",
          specs: "PA-02, PA-1, PA-2, PA-3 · Cadmium & Silicon-free PVC · UL94-V0 Flame Retardant · -30°C to +60°C",
          products: [
            "PA-02 (0.2 - 1.5 mm² wires / cables)",
            "PA-1 (0.75 - 4.0 mm² wires / cables)",
            "PA-2 (2.5 - 16 mm² wires / cables)",
            "Numbers 0-9, Letters A-Z, Standard Electrical Symbols",
          ],
          image: "/images/partex-pa.jpg",
        },
        {
          id: "t1000",
          seriesCode: "SERIES T-1000 // THERMAL PRINTER",
          title: "ProMark T-1000 Thermal Transfer Marker Printer",
          desc: "High-speed portable on-site industrial marker printer with 300 dpi resolution. Prints directly on continuous PO profile tubing, heat-shrinkable sleeves, and self-adhesive panel labels.",
          specs: "40 mm/sec print speed · USB PC connection + internal memory · 300 dpi high clarity · Portable battery pack",
          products: [
            "ProMark T-1000 Master Printer Kit",
            "Heavy-Duty Aluminium Transport & Site Case",
            "Black / White / Red Industrial Resin Ribbons",
            "Rechargeable Lithium-Ion Field Battery",
          ],
          image: "/images/partex-promark.jpg",
        },
        {
          id: "pc",
          seriesCode: "SERIES PC // RETROFIT SNAP-ON",
          title: "PC Clip-On Open Wire Markers",
          desc: "Open snap-on markers designed for direct installation on pre-connected wiring, terminal blocks, and retrofit maintenance without removing wire terminations.",
          specs: "PC-10, PC-20, PC-30, PC-40 · High retention spring clamp · Vibration-proof grip · Fast wand applicator",
          products: [
            "PC-10 (2.4 - 3.0 mm Outer Diameter)",
            "PC-20 (3.0 - 4.0 mm Outer Diameter)",
            "PC-30 (5.0 - 6.2 mm Outer Diameter)",
            "Applicator Wand Tools for Rapid Mounting",
          ],
          image: "/images/partex-pc.jpg",
        },
        {
          id: "pks",
          seriesCode: "SERIES PKS // ACID-PROOF SS316",
          title: "PKS Stainless Steel 316 Acid-Proof Markers",
          desc: "High-grade AISI 316 stainless steel identification tags engineered for extreme marine, chemical plants, offshore oil rigs, and high-temperature fire hazard zones.",
          specs: "AISI 316 Stainless Steel · -80°C to +500°C · Extreme fire, salt spray, and acid resistance",
          products: [
            "PKS Individual Raised Embossed Character Strips",
            "PKH Carrier Holders (6 to 24 Character Length)",
            "Stainless Steel Ball-Lock Roller Ties 316",
            "Custom Pre-Printed Asset Number Sequences",
          ],
          image: "/images/partex-pks.jpg",
        },
      ],
    },
    mennekes: {
      id: "mennekes",
      name: "MENNEKES",
      fullName: "MENNEKES Elektrotechnik — Industrial Plugs & AMAXX® Combinations",
      country: "GERMANY",
      flag: "🇩🇪",
      origin: "Kirchhundem, Germany",
      logo: "/images/logo-mennekes.png",
      desc: "Industry-defining standard in industrial plugs, CEE receptacles, and distribution units.",
      tagline:
        "Founded in Kirchhundem, Germany in 1935, MENNEKES is the global inventor of the modern industrial CEE plug and socket system. Unmatched mechanical impact resistance, IP67 watertight sealing, and modular AMAXX distribution boxes for world-class factory installations.",
      partnerBadge: "Authorized Industrial CEE Stockist",
      certs: "VDE Certified & IEC 60309-1/2 · DIN EN ISO 9001",
      catalogQuery: "MENNEKES",
      themeBg: "bg-purple-500",
      themeHex: "#C084FC",
      selectedCardBg: "bg-gradient-to-br from-[#1d0d24] via-[#2d1438] to-[#100615] text-white border-purple-400 shadow-2xl scale-[1.01]",
      containerBg: "bg-gradient-to-br from-[#1d0d24] via-[#2d1438] to-[#100615] text-white border-purple-500/40 shadow-2xl",
      borderAccent: "border-l-4 border-l-purple-400",
      buttonBg: "bg-purple-400 hover:bg-purple-300 text-slate-950 font-black",
      badgeStyle: "bg-black/40 text-purple-300 border-purple-400/40",
      accentText: "text-purple-300",
      series: [
        {
          id: "powertop",
          seriesCode: "SERIES 01 // HEAVY DUTY CEE",
          title: "PowerTOP® Xtra CEE Plugs & Connectors",
          desc: "Ergonomic industrial plugs with rubberized slip-proof grips and SafeCONTACT screwless insulation-displacement technology for fast, vibration-proof field wiring.",
          specs: "16A, 32A, 63A, 125A · IP44 / IP67 watertight · Highly heat-resistant contact carriers · Nickel-plated pins",
          products: [
            "PowerTOP® Xtra 16A 5P (400V 3P+N+E Red)",
            "PowerTOP® Xtra 32A 5P (400V 3P+N+E Red)",
            "SafeCONTACT Screwless Quick-Wire Plugs",
            "Appliance Inlets & Angled Couplers for machinery",
          ],
          image: "/images/menn-powertop.jpg",
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
            "Integrated Transparent MCB & RCD Windows",
            "Pivoted Enclosure Covers for Rapid Maintenance",
          ],
          image: "/images/menn-amaxx.jpg",
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
          ],
          image: "/images/menn-evergum.jpg",
        },
        {
          id: "panel",
          seriesCode: "SERIES 04 // PANEL RECEPTACLES",
          title: "CEE Panel Sockets & DUO Interlocked Switches",
          desc: "Surface and panel-mount industrial CEE receptacles with mechanical interlocks that prevent withdrawal under electrical load for total plant personnel safety.",
          specs: "Mechanical interlock DUO switch · IP44 / IP67 · Nickel-plated brass terminals · Padlockable handle",
          products: [
            "Panel Mounted Sockets Straight & Angled",
            "DUO Interlocked Switched Sockets (16A - 63A)",
            "Surface Mounted Wall Sockets IP67",
            "Auxiliary Contact Microswitches for PLC integration",
          ],
          image: "/images/menn-sockets.jpg",
        },
      ],
    },
  };

  const currentBrand = brandProfiles[selectedBrandId] || brandProfiles.mennekes;
  const activeSeries = currentBrand.series[activeSeriesIndex] || currentBrand.series[0];

  const handleBrandChange = (brandId: string) => {
    setSelectedBrandId(brandId);
    setActiveSeriesIndex(0);
  };

  const handleNavigateToCatalog = () => {
    navigate(`/catalog?brand=${encodeURIComponent(currentBrand.catalogQuery)}`);
  };

  return (
    <section className="py-14 lg:py-20 hybrid-light-bg border-b border-[#E2E8F0] select-none" id="brandPortfolios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${currentBrand.themeBg} animate-pulse`} />
              <span className={`${currentBrand.accentText} font-bold uppercase tracking-wider`}>OEM VERIFIED DIRECT CHANNELS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B0F17] tracking-tight">
              Authorized Brand Portfolios
            </h2>
          </div>
          <p className="text-sm text-[#475569] max-w-md leading-relaxed">
            Select a manufacturer below to inspect executive dossiers, compliance standards, and verified technical series specifications.
          </p>
        </div>

        {/* BRAND NAVIGATION PILLS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {Object.values(brandProfiles).map((brand) => {
            const isSelected = selectedBrandId === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => handleBrandChange(brand.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center justify-between cursor-pointer hover-card-lift border ${
                  isSelected ? brand.selectedCardBg : "bg-white text-[#0B0F17] border-[#CBD5E1] hover:border-[#475569]"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-9 px-2.5 rounded-xl border flex items-center justify-center shrink-0 ${isSelected ? "bg-black/30 border-white/20" : "bg-slate-50 border-[#E2E8F0]"}`}>
                    <img src={brand.logo} alt={brand.name} className={`h-4 object-contain max-w-[65px] ${isSelected ? "brightness-200" : ""}`} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black tracking-tight truncate">{brand.name}</h4>
                    <span className={`text-[10px] font-mono block ${isSelected ? "text-slate-300" : "text-[#64748B]"}`}>
                      {brand.country}
                    </span>
                  </div>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full ${brand.themeBg} shrink-0 shadow-sm`} />
              </button>
            );
          })}
        </div>

        {/* RESTRUCTURED SPLIT DOSSIER & SPEC VAULT WITH BRAND BACKGROUND */}
        <div className={`rounded-[2.5rem] p-6 sm:p-10 border relative overflow-hidden transition-all duration-700 ${currentBrand.containerBg}`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* LEFT COLUMN: EXECUTIVE DOSSIER & SERIES SELECTOR (Col 1-5) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-3 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`px-3.5 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${currentBrand.badgeStyle}`}>
                    <Building2 size={13} />
                    {currentBrand.partnerBadge}
                  </span>
                  <span className="text-xs font-mono text-slate-300">{currentBrand.origin}</span>
                </div>

                <h3 className="text-2xl font-black text-white tracking-tight leading-snug">
                  {currentBrand.fullName}
                </h3>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
                  {currentBrand.tagline}
                </p>

                <div className={`flex items-center gap-2 text-xs font-mono ${currentBrand.accentText} font-semibold pt-1`}>
                  <ShieldCheck size={14} />
                  <span>{currentBrand.certs}</span>
                </div>
              </div>

              {/* SERIES SELECTOR TABS */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 font-bold block">
                  Available Hardware Series ({currentBrand.series.length}):
                </span>
                
                <div className="space-y-2">
                  {currentBrand.series.map((s, idx) => {
                    const isSeriesActive = activeSeriesIndex === idx;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setActiveSeriesIndex(idx)}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs font-mono font-semibold transition-all duration-300 flex items-center justify-between cursor-pointer border hover-card-lift ${
                          isSeriesActive
                            ? `${currentBrand.themeBg} text-slate-950 border-white font-black shadow-lg scale-[1.01]`
                            : "bg-black/30 text-slate-200 border-white/10 hover:bg-black/50"
                        }`}
                      >
                        <div className="space-y-0.5 truncate pr-2">
                          <span className={`text-[10px] uppercase block ${isSeriesActive ? "text-slate-900 font-bold" : "text-slate-400"}`}>{s.seriesCode}</span>
                          <span className="truncate block font-bold">{s.title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleNavigateToCatalog}
                  className={`px-5 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 hover:scale-102 transition-transform cursor-pointer ${currentBrand.buttonBg}`}
                >
                  <Sparkles size={14} />
                  <span>BROWSE {currentBrand.name} IN CATALOG</span>
                  <ExternalLink size={14} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setRfqModalItem({
                      name: `${activeSeries.title}`,
                      brand: currentBrand.name,
                    })
                  }
                  className="px-5 py-3.5 rounded-2xl bg-black/40 hover:bg-black/60 text-white font-bold text-xs uppercase tracking-wider shadow-xs flex items-center justify-center gap-2 hover:scale-102 transition-transform cursor-pointer border border-white/20 backdrop-blur-xs"
                >
                  <FileText size={14} className={currentBrand.accentText} />
                  <span>Request Series Quote</span>
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: TECHNICAL SPECIFICATION VAULT (Col 6-12) */}
            <div className="lg:col-span-7">
              <div className="bg-white/95 backdrop-blur-md text-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 border border-white/40 shadow-2xl relative overflow-hidden group">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${currentBrand.accentText} font-bold block`}>
                      {activeSeries.seriesCode}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-0.5">
                      {activeSeries.title}
                    </h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold border flex items-center gap-1.5 ${currentBrand.badgeStyle}`}>
                    <ShieldCheck size={12} /> Authorized Stock
                  </span>
                </div>

                {/* Hardware Preview Stage */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5">
                    <div className="w-full aspect-square bg-slate-50 rounded-2xl border border-slate-200 p-3 flex items-center justify-center overflow-hidden shadow-inner">
                      <img
                        src={activeSeries.image}
                        alt={activeSeries.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/card-cables.jpg";
                        }}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {activeSeries.desc}
                    </p>

                    {/* Technical Parameters Readout Box */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1.5 font-mono text-xs shadow-2xs">
                      <div className={`text-[10px] font-bold ${currentBrand.accentText} uppercase tracking-wider flex items-center gap-1.5`}>
                        <ShieldCheck size={13} /> Technical Parameters
                      </div>
                      <p className="text-slate-700 leading-snug">
                        {activeSeries.specs}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Configurations List */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                    Standard Part Offerings & Configurations:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeSeries.products.map((p, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 flex items-center gap-2 shadow-2xs">
                        <CheckCircle2 size={13} className={currentBrand.accentText} />
                        <span className="truncate">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* RFQ Quote Modal */}
      {rfqModalItem && ( 
        <RFQModal
          product={`${rfqModalItem.brand} - ${rfqModalItem.name}`}
          onClose={() => setRfqModalItem(null)}
        />
      )}
    </section>
  );
};