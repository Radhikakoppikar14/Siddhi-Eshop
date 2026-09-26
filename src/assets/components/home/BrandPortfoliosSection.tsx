import React, { useState, useRef } from "react";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowRight,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles,
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
  highlightColor: string;
  accentTag: string;
  accentDot: string;
  btnColor: string;
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
  cardStyle: string;
  activeCardStyle: string;
  badgeStyle: string;
  actionColor: string;
  arrowColor: string;
  themeColor: string;
  heroBorder: string;
  heroBg: string;
  heroOrb: string;
  heroBtnBg: string;
  heroBtnText: string;
  disciplinesTitle: string;
  disciplinesSub: string;
  series: BrandSeries[];
}

export const BrandPortfoliosSection: React.FC = () => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>("lapp");
  const [rfqModalItem, setRfqModalItem] = useState<{ name: string; brand: string } | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

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
      certs: "VDE Reg. No. 7030 & ISO 9001:2015 · Direct Factory Batch Test Reports · Bangalore Ready Warehouse Drum Stock",
      cardStyle: "border-2 border-red-500/70 bg-red-50/25 hover:bg-red-50/60 shadow-2xs hover:shadow-xl hover:shadow-red-500/10",
      activeCardStyle: "border-2 border-red-600 bg-red-50/80 ring-2 ring-red-500 ring-offset-2 shadow-xl shadow-red-500/20 scale-[1.01]",
      badgeStyle: "bg-red-100 text-red-800 border border-red-300",
      actionColor: "text-red-700 hover:text-red-900",
      arrowColor: "text-red-600",
      themeColor: "red",
      heroBorder: "border-amber-300/80",
      heroBg: "from-amber-500/10 via-orange-400/5 to-white",
      heroOrb: "bg-amber-400/15",
      heroBtnBg: "bg-amber-500 hover:bg-amber-400 text-slate-950",
      heroBtnText: "text-slate-950",
      disciplinesTitle: "LAPP Kabel System Offerings",
      disciplinesSub: "Showing 4 Specialized Cable & Connection Ranges",
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
            "ÖLFLEX® HEAT 180 (Silicone high temp wire up to 180°C)",
          ],
          image: "/images/card-olflex.jpg",
          highlightColor: "border-amber-300 bg-white/90",
          accentTag: "bg-amber-100 text-amber-900 border-amber-300",
          accentDot: "bg-amber-500",
          btnColor: "bg-amber-500 hover:bg-amber-400 text-slate-950",
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
          image: "/images/card-unitronic.jpg",
          highlightColor: "border-amber-300 bg-white/90",
          accentTag: "bg-amber-100 text-amber-900 border-amber-300",
          accentDot: "bg-amber-500",
          btnColor: "bg-amber-500 hover:bg-amber-400 text-slate-950",
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
          image: "/images/card-skintop.jpg",
          highlightColor: "border-amber-300 bg-white/90",
          accentTag: "bg-amber-100 text-amber-900 border-amber-300",
          accentDot: "bg-amber-500",
          btnColor: "bg-amber-500 hover:bg-amber-400 text-slate-950",
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
          image: "/images/card-uniplus.jpg",
          highlightColor: "border-amber-300 bg-white/90",
          accentTag: "bg-amber-100 text-amber-900 border-amber-300",
          accentDot: "bg-amber-500",
          btnColor: "bg-amber-500 hover:bg-amber-400 text-slate-950",
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
      certs: "IEC / EN 60947 & UL 508 · ISO 9001 & CE Certified · Direct Factory MTC Warranty",
      cardStyle: "border-2 border-sky-500/70 bg-sky-50/25 hover:bg-sky-50/60 shadow-2xs hover:shadow-xl hover:shadow-sky-500/10",
      activeCardStyle: "border-2 border-blue-600 bg-sky-50/80 ring-2 ring-blue-500 ring-offset-2 shadow-xl shadow-blue-500/20 scale-[1.01]",
      badgeStyle: "bg-sky-100 text-sky-800 border border-sky-300",
      actionColor: "text-sky-800 hover:text-sky-950",
      arrowColor: "text-sky-700",
      themeColor: "blue",
      heroBorder: "border-sky-300/80",
      heroBg: "from-sky-500/10 via-blue-400/5 to-white",
      heroOrb: "bg-sky-400/15",
      heroBtnBg: "bg-[#1864f7] hover:bg-blue-600 text-white",
      heroBtnText: "text-white",
      disciplinesTitle: "EATON Moeller System Offerings",
      disciplinesSub: "Showing 4 Specialized Motor Control & Switchgear Ranges",
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
            "B3.1/3-PKZ0 Common Phase Busbar Adapters",
          ],
          image: "/images/eaton-pkzm0.jpg",
          highlightColor: "border-sky-300 bg-white/90",
          accentTag: "bg-sky-100 text-sky-900 border-sky-300",
          accentDot: "bg-sky-500",
          btnColor: "bg-[#1864f7] hover:bg-blue-600 text-white",
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
          image: "/images/eaton-dilm.jpg",
          highlightColor: "border-sky-300 bg-white/90",
          accentTag: "bg-sky-100 text-sky-900 border-sky-300",
          accentDot: "bg-sky-500",
          btnColor: "bg-[#1864f7] hover:bg-blue-600 text-white",
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
            "NZMN4-VE (1600A Diagnostic Releases)",
            "Door Coupling Rotary Handles & Under-Voltage Trips",
          ],
          image: "/images/eaton-nzm.jpg",
          highlightColor: "border-sky-300 bg-white/90",
          accentTag: "bg-sky-100 text-sky-900 border-sky-300",
          accentDot: "bg-sky-500",
          btnColor: "bg-[#1864f7] hover:bg-blue-600 text-white",
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
            "High-Output Multi-Color LED Elements",
          ],
          image: "/images/eaton-rmq.jpg",
          highlightColor: "border-sky-300 bg-white/90",
          accentTag: "bg-sky-100 text-sky-900 border-sky-300",
          accentDot: "bg-sky-500",
          btnColor: "bg-[#1864f7] hover:bg-blue-600 text-white",
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
      certs: "UL94-V0 Flame Retardant · RoHS & REACH Compliant · Swedish Benchmark Since 1948",
      cardStyle: "border-2 border-emerald-500/70 bg-emerald-50/25 hover:bg-emerald-50/60 shadow-2xs hover:shadow-xl hover:shadow-emerald-500/10",
      activeCardStyle: "border-2 border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500 ring-offset-2 shadow-xl shadow-emerald-500/20 scale-[1.01]",
      badgeStyle: "bg-emerald-100 text-emerald-800 border border-emerald-300",
      actionColor: "text-emerald-800 hover:text-emerald-950",
      arrowColor: "text-emerald-700",
      themeColor: "emerald",
      heroBorder: "border-emerald-300/80",
      heroBg: "from-emerald-500/10 via-teal-400/5 to-white",
      heroOrb: "bg-emerald-400/15",
      heroBtnBg: "bg-emerald-600 hover:bg-emerald-500 text-white",
      heroBtnText: "text-white",
      disciplinesTitle: "PARTEX Marking System Offerings",
      disciplinesSub: "Showing 4 Specialized Identification Ranges",
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
            "PA-3 (16 - 70 mm² heavy cables)",
            "Numbers 0-9, Letters A-Z, Standard Electrical Symbols",
          ],
          image: "/images/partex-pa.jpg",
          highlightColor: "border-emerald-300 bg-white/90",
          accentTag: "bg-emerald-100 text-emerald-900 border-emerald-300",
          accentDot: "bg-emerald-500",
          btnColor: "bg-emerald-600 hover:bg-emerald-500 text-white",
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
            "USB Cable & Windows Software Suite included",
            "Rechargeable Lithium-Ion Field Battery",
          ],
          image: "/images/partex-promark.jpg",
          highlightColor: "border-emerald-300 bg-white/90",
          accentTag: "bg-emerald-100 text-emerald-900 border-emerald-300",
          accentDot: "bg-emerald-500",
          btnColor: "bg-emerald-600 hover:bg-emerald-500 text-white",
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
            "PC-30 (4.0 - 5.0 mm Outer Diameter)",
            "PC-40 (5.0 - 6.2 mm Outer Diameter)",
            "Applicator Wand Tools for Rapid Mounting",
          ],
          image: "/images/partex-pc.jpg",
          highlightColor: "border-emerald-300 bg-white/90",
          accentTag: "bg-emerald-100 text-emerald-900 border-emerald-300",
          accentDot: "bg-emerald-500",
          btnColor: "bg-emerald-600 hover:bg-emerald-500 text-white",
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
            "Manual Tensioning & Cut-off Tool",
            "Custom Pre-Printed Asset Number Sequences",
          ],
          image: "/images/partex-pks.jpg",
          highlightColor: "border-emerald-300 bg-white/90",
          accentTag: "bg-emerald-100 text-emerald-900 border-emerald-300",
          accentDot: "bg-emerald-500",
          btnColor: "bg-emerald-600 hover:bg-emerald-500 text-white",
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
      certs: "VDE Certified & IEC 60309-1/2 · DIN EN ISO 9001 · DNV GL Marine Approvals",
      cardStyle: "border-2 border-purple-500/70 bg-purple-50/25 hover:bg-purple-50/60 shadow-2xs hover:shadow-xl hover:shadow-purple-500/10",
      activeCardStyle: "border-2 border-purple-600 bg-purple-50/80 ring-2 ring-purple-500 ring-offset-2 shadow-xl shadow-purple-500/20 scale-[1.01]",
      badgeStyle: "bg-purple-100 text-purple-800 border border-purple-300",
      actionColor: "text-purple-700 hover:text-purple-900",
      arrowColor: "text-purple-600",
      themeColor: "purple",
      heroBorder: "border-purple-300/80",
      heroBg: "from-purple-500/10 via-indigo-400/5 to-white",
      heroOrb: "bg-purple-400/15",
      heroBtnBg: "bg-purple-600 hover:bg-purple-500 text-white",
      heroBtnText: "text-white",
      disciplinesTitle: "MENNEKES CEE System Offerings",
      disciplinesSub: "Showing 4 Specialized CEE Plug & Receptacle Ranges",
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
            "PowerTOP® Xtra 63A / 125A Heavy Industrial",
            "SafeCONTACT Screwless Quick-Wire Plugs",
            "Appliance Inlets & Angled Couplers for machinery",
          ],
          image: "/images/menn-powertop.jpg",
          highlightColor: "border-purple-300 bg-white/90",
          accentTag: "bg-purple-100 text-purple-900 border-purple-300",
          accentDot: "bg-purple-500",
          btnColor: "bg-purple-600 hover:bg-purple-500 text-white",
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
            "AMAXX® 5-Gang Heavy Industrial Combos",
            "Integrated Transparent MCB & RCD Windows",
            "Pivoted Enclosure Covers for Rapid Maintenance",
          ],
          image: "/images/menn-amaxx.jpg",
          highlightColor: "border-purple-300 bg-white/90",
          accentTag: "bg-purple-100 text-purple-900 border-purple-300",
          accentDot: "bg-purple-500",
          btnColor: "bg-purple-600 hover:bg-purple-500 text-white",
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
            "Heavy-Duty Solid Rubber Carrying Handles",
          ],
          image: "/images/menn-evergum.jpg",
          highlightColor: "border-purple-300 bg-white/90",
          accentTag: "bg-purple-100 text-purple-900 border-purple-300",
          accentDot: "bg-purple-500",
          btnColor: "bg-purple-600 hover:bg-purple-500 text-white",
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
            "Fused CEE Receptacle Base Assemblies",
          ],
          image: "/images/menn-sockets.jpg",
          highlightColor: "border-purple-300 bg-white/90",
          accentTag: "bg-purple-100 text-purple-900 border-purple-300",
          accentDot: "bg-purple-500",
          btnColor: "bg-purple-600 hover:bg-purple-500 text-white",
        },
      ],
    },
  };

  const currentBrand = brandProfiles[selectedBrandId] || brandProfiles.lapp;

  const handleCardClick = (brandId: string) => {
    setSelectedBrandId(brandId);
    setTimeout(() => {
      showcaseRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 50);
  };

  const handleScrollToCatalog = () => {
    window.dispatchEvent(new CustomEvent("select-brand-catalog", { detail: { brand: currentBrand.name } }));
    const el = document.getElementById("productsSection") || document.getElementById("catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 lg:py-14 select-none bg-transparent" id="brandPortfolios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 max-w-3xl">
          <span className="text-[11px] font-mono uppercase tracking-wider text-red-600 font-bold block mb-1">
            DIRECT OEM CHANNELS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
            Authorized Brand Portfolios
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Click any brand card below to instantly display its complete OEM executive profile, authorized system offerings, and series technical parameters directly below.
          </p>
        </div>

        {/* 4 Brand Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-8">
          {Object.values(brandProfiles).map((brand) => {
            const isSelected = selectedBrandId === brand.id;
            return (
              <div
                key={brand.id}
                onClick={() => handleCardClick(brand.id)}
                className={`rounded-2xl sm:rounded-3xl p-4.5 sm:p-6 transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  isSelected ? brand.activeCardStyle : brand.cardStyle
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(brand.id);
                  }
                }}
                aria-label={`View ${brand.name} system offerings`}
              >
                <div>
                  {/* Logo & Country Badge Row */}
                  <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
                    <div className="h-9 sm:h-10 px-2.5 sm:px-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-center">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="h-5 sm:h-6 w-auto max-w-[100px] sm:max-w-[110px] object-contain"
                      />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${brand.badgeStyle}`}
                    >
                      {brand.country}
                    </span>
                  </div>

                  {/* Brand Name */}
                  <h3 className="text-base font-extrabold text-slate-950 mb-2 flex items-center justify-between">
                    <span>{brand.name}</span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      4 Series
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {brand.desc}
                  </p>
                </div>

                {/* Action Bottom */}
                <div className="mt-5 pt-3.5 border-t border-slate-300/60">
                  <div
                    className={`flex items-center justify-between text-xs font-bold transition-colors ${
                      isSelected ? "text-slate-950" : brand.actionColor
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {isSelected ? "Showing System Details" : "Inspect System Details"}
                    </span>
                    {isSelected ? (
                      <ChevronUp size={16} className="text-slate-900 animate-bounce" />
                    ) : (
                      <ChevronDown size={16} className={`transition-transform group-hover:translate-y-0.5 ${brand.arrowColor}`} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* INLINE BRAND EXECUTIVE PROFILE & 4 SYSTEM OFFERINGS (Exactly matching screenshot!) */}
        <div ref={showcaseRef} className="animate-fade-in scroll-mt-20">
          
          {/* FANCY MODERN BRAND EXECUTIVE HERO */}
          <div
            className={`rounded-3xl p-6 sm:p-10 border ${currentBrand.heroBorder} bg-gradient-to-br ${currentBrand.heroBg} shadow-xl mb-10 relative overflow-hidden`}
          >
            {/* Ambient Lighting Orb */}
            <div
              className={`absolute top-0 right-0 w-96 h-96 ${currentBrand.heroOrb} rounded-full blur-3xl pointer-events-none`}
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-2xl">
                
                {/* Badge & German Origin Header */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="h-11 px-3 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-center">
                    <img
                      src={currentBrand.logo}
                      alt={currentBrand.name}
                      className="h-6 w-auto max-w-[120px] object-contain"
                    />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs uppercase tracking-wider border border-amber-300 flex items-center gap-1.5 shadow-2xs">
                    <ShieldCheck size={14} className="text-amber-600" />
                    {currentBrand.partnerBadge}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold border border-slate-200">
                    {currentBrand.flag} {currentBrand.origin}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                  {currentBrand.fullName}
                </h1>

                {/* Editorial Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {currentBrand.tagline}
                </p>

                {/* Trust Indicators Bar */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-600">
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                    <Award size={14} />
                    <span>{currentBrand.certs}</span>
                  </div>
                </div>

              </div>

              {/* Executive Actions Box */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleScrollToCatalog}
                  className={`px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-102 transition-transform cursor-pointer ${currentBrand.heroBtnBg}`}
                >
                  <Sparkles size={15} />
                  <span>BROWSE {currentBrand.name} IN CATALOG</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setRfqModalItem({
                      name: `${currentBrand.name} Full Product Portfolio`,
                      brand: currentBrand.name,
                    })
                  }
                  className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 hover:scale-102 transition-transform cursor-pointer"
                >
                  <FileText size={15} className="text-amber-400" />
                  <span>REQUEST PROJECT QUOTATION</span>
                </button>
              </div>

            </div>
          </div>

          {/* SYSTEM OFFERINGS SUBHEADER */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-200 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-bold block mb-1">
                APPROVED OEM PRODUCT DISCIPLINES
              </span>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                {currentBrand.disciplinesTitle}
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {currentBrand.disciplinesSub}
            </span>
          </div>

          {/* 4 SERIES CARDS 2x2 GRID (Exactly matching screenshot!) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentBrand.series.map((item) => (
              <div
                key={item.id}
                className={`rounded-3xl p-6 sm:p-7 border ${item.highlightColor} shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group`}
              >
                <div>
                  
                  {/* Top Series Code & Image Row */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="space-y-1.5 flex-1">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${item.accentTag}`}
                      >
                        {item.seriesCode}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-950 group-hover:text-amber-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="w-16 h-16 rounded-2xl p-1.5 border border-slate-200 bg-white shadow-2xs shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Technical Parameters Box */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 mb-5 text-xs font-mono text-amber-950 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-amber-800">
                      <ShieldCheck size={13} className="text-amber-600" />
                      <span>Technical Parameters</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-700">
                      {item.specs}
                    </p>
                  </div>

                  {/* Standard Part Offerings List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Standard Part Offerings & Configurations:
                    </span>
                    <ul className="space-y-1.5">
                      {item.products.map((prod, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-slate-950 transition-colors"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-amber-600 shrink-0"
                          />
                          <span>{prod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom Actions Row */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleScrollToCatalog}
                    className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Models in Catalog</span>
                    <ArrowRight size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setRfqModalItem({
                        name: item.title,
                        brand: currentBrand.name,
                      })
                    }
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer ${item.btnColor}`}
                  >
                    Request Series Quote
                  </button>
                </div>

              </div>
            ))}
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
