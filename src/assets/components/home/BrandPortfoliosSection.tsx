import React, { useState, useRef } from "react";
import { ShieldCheck, Building2 } from "lucide-react";
import { RFQModal } from "../ui/RFQModal";

interface ProductItem {
  name: string;
  desc: string;
  specs: string;
  image: string;
}

interface BrandSeries {
  id: string;
  seriesCode: string;
  title: string;
  desc: string;
  specs: string;
  items: ProductItem[]; // the two products shown under this series
  image: string; // fallback image for the series
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
  const [selectedBrandId, setSelectedBrandId] = useState<string>("lapp");
  const [activeSeriesIndex, setActiveSeriesIndex] = useState<number>(0);
  const [rfqModalItem, setRfqModalItem] = useState<{ name: string; brand: string } | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const brandProfiles: Record<string, BrandProfile> = {
    lapp: {
      id: "lapp",
      name: "LAPP KABEL",
      fullName: "LAPP India Private Limited — Integrated Cable & Connection Systems",
      country: "GERMANY",
      flag: "🇩🇪",
      origin: "Stuttgart, Germany · Bangalore, Bhopal, India",
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
          items: [
            {
              name: "ÖLFLEX CLASSIC 110",
              desc: "Oil-resistant PVC control cable with coloured cores, made for fixed and light-flex use on machine tools, conveyors and production lines.",
              specs: "300/500 V · PVC insulation and sheath · Oil resistant · Fixed -40°C to +80°C",
              image: "/images/cable13.png",
            },
            {
              name: "ÖLFLEX CLASSIC 110 CY",
              desc: "Screened version of CLASSIC 110 with a tinned copper braid and transparent PVC sheath, keeping control signals clear of electrical interference.",
              specs: "300/500 V · Tinned copper braided screen · Transparent PVC sheath · Oil resistant",
              image: "/images/olflex-v2.jpg",
            },
          ],
          image: "/images/cable1.png",
        },
        {
          id: "unitronic",
          seriesCode: "SERIES 02 // FIELDBUS & DATA",
          title: "UNITRONIC® & ETHERLINE® Data Cables",
          desc: "High-speed sensor, instrumentation, and fieldbus communication cables for PROFINET, Industrial Gigabit Ethernet, RS-485, and CAN bus automation.",
          specs: "10 Gbit/s Cat.6A · Optimum screening against electrical interference · Tinned copper braided shield",
          items: [
            {
              name: "UNITRONIC LiYCY",
              desc: "Screened data and signal cable with fine-wire conductors, for electronic control, measurement and instrumentation lines in noisy environments.",
              specs: "Tinned copper braided screen · Fine-wire stranded conductors · PVC insulation and sheath",
              image: "/images/cable10.png",
            },
            {
              name: "ETHERLINE Cat.5e & Cat.6A",
              desc: "Industrial Ethernet cables for PROFINET and Gigabit networks. The Cat.6A versions carry up to 10 Gbit/s over screened twisted pairs.",
              specs: "Cat.5e for Gigabit · Cat.6A up to 10 Gbit/s · Screened twisted pairs",
              image: "/images/cable8.jpg",
            },
          ],
          image: "/images/cable14.png",
        },
        {
          id: "skintop",
          seriesCode: "SERIES 03 // CABLE GLANDS",
          title: "SKINTOP® Cable Glands & Metric Nuts",
          desc: "Worldwide patented cable entry systems providing reliable IP68 strain relief, liquid tightness, and vibration-proof locking for electrical enclosures.",
          specs: "Metric M12 to M63 · Nickel-plated Brass & Polyamide · IP68 10 Bar pressure tightness · Lamellar cage",
          items: [
            {
              name: "SKINTOP MS-M Brass",
              desc: "Nickel-plated brass cable gland for rugged strain relief and sealing where enclosures see vibration, heat or heavy handling.",
              specs: "Metric M12 to M63 · Nickel-plated brass · IP68 · Lamellar cage",
              image: "/images/cable10.png",
            },
            {
              name: "SKINTOP ST-M Polyamide",
              desc: "Polyamide cable gland that gives light, economical entry protection for general industrial enclosures and junction boxes.",
              specs: "Metric thread · Polyamide (PA) · IP68 · Sealing ring included",
               image: "/images/cable7.jpg",
            },
          ],
          image: "/images/cable3.jpg",
        },
        {
          id: "uniplus",
          seriesCode: "SERIES 04 // PANEL SINGLE CORES",
          title: "UNIPLUS® Control Cabinet Single Cores",
          desc: "High-performance panel wiring single cores with bright annealed electrolytic copper and heat-resistant PVC for control desks, switchgear, and relays.",
          specs: "450/750V rating · IS:694 & HAR standard · High flexibility Class 5 copper · Multiple bright colors",
          items: [
            {
              name: "UNIPLUS H05V-K",
              desc: "Fine-stranded single core for internal wiring of control panels, relays and small switchgear where space is tight.",
              specs: "300/500 V · Class 5 flexible copper · PVC insulation · Multiple colours",
              image: "/images/cable2.png",
            },
            {
              name: "UNIPLUS H07V-K",
              desc: "Heavier-duty single core for switchgear and power wiring inside cabinets, available in larger cross-sections.",
              specs: "450/750 V · Class 5 flexible copper · PVC insulation · Multiple colours",
              image: "/images/cable4.jpg",
            },
          ],
          image: "/images/cable3.png",
        },
        {
          id: "silflex",
          seriesCode: "SERIES 05 // HIGH TEMP SILICONE",
          title: "SILFLEX® Heat-Resistant Silicone Cables",
          desc: "Halogen-free silicone cables designed for high ambient temperature applications such as steel mills, foundries, glass plants, and sauna construction.",
          specs: "-50°C to +180°C continuous · Halogen-free · Flame retardant · Excellent UV and ozone resistance",
          items: [
            {
              name: "SILFLEX EWKF Classic",
              desc: "Multi-core silicone-insulated cable for connections near ovens, furnaces and heaters where PVC would soften or fail.",
              specs: "-50°C to +180°C continuous · Silicone insulation · Halogen-free",
              image: "/images/cable4.png",
            },
            {
              name: "SIHF Silicone Single Cores",
              desc: "Silicone single cores for wiring inside hot equipment, heating elements and lighting fittings.",
              specs: "-50°C to +180°C continuous · Flexible copper · UV and ozone resistant",
              image: "/images/cable7.jpg",
            },
          ],
          image: "/images/cable5.png",
        },
        {
          id: "solarlink",
          seriesCode: "SERIES 06 // PHOTOVOLTAIC",
          title: "ÖLFLEX® SOLAR PV DC Power Cables",
          desc: "Electron-beam cross-linked solar cables engineered for extreme weather resistance and multi-decade service life in commercial photovoltaic solar farms.",
          specs: "TÜV approved · Weather & UV resistant · Double insulated · Halogen-free cross-linked copolymer",
          items: [
            {
              name: "ÖLFLEX SOLAR XLS",
              desc: "Single-core cross-linked solar cable for the DC string wiring between panels and inverters in commercial PV plants.",
              specs: "TÜV approved · Cross-linked, halogen-free · UV and weather resistant",
              image: "/images/cable9.png",
            },
            {
              name: "ÖLFLEX SOLAR H1Z2Z2-K",
              desc: "Double-insulated PV cable to the H1Z2Z2-K standard, built for long outdoor service in solar farms.",
              specs: "Tinned copper · Double insulated · Halogen-free · UV and weather resistant",
              image: "/images/cable8.jpg",
            },
          ],
          image: "/images/cable7.png",
        },
        {
          id: "epiglass",
          seriesCode: "SERIES 07 // ARMOURED POWER",
          title: "NYY-J / NYY-O Underground Power Cables",
          desc: "Heavy-duty PVC insulated power and control cables for fixed underground installation in power stations, industrial plants, and switchboards.",
          specs: "0.6/1 kV rating · Solid/stranded copper conductor · Direct burial rated · Flame retardant",
          items: [
            {
              name: "NYY-J 3-Core Power",
              desc: "Three-core PVC power cable including a green-yellow earth conductor, for fixed installation indoors, in ducts and underground.",
              specs: "0.6/1 kV · 3 cores with earth · PVC insulation and sheath · Direct burial rated",
              image: "/images/cable1.png",
            },
            {
              name: "NYY-J 4-Core Armoured",
              desc: "Four-core version for three-phase distribution with neutral, for plants, switchboards and buried feeders.",
              specs: "0.6/1 kV · 4 cores · PVC insulation and sheath · Flame retardant",
              image: "/images/cable8.jpg",
            },
          ],
          image: "/images/cable4.png",
        },
        {
          id: "epic",
          seriesCode: "SERIES 08 // INDUSTRIAL CONNECTORS",
          title: "EPIC® Heavy-Duty Rectangular Connectors",
          desc: "Modular industrial rectangular plug connectors providing secure power and signal transmission in harsh factory environments and robotics.",
          specs: "IP65 / IP68 protection · Die-cast aluminium housing · Gold-plated crimp contacts · Modular inserts",
          items: [
            {
              name: "EPIC H-B Connectors",
              desc: "Heavy-duty rectangular housings that carry power and signal connections through machine and robot cabling.",
              specs: "IP65 / IP68 · Die-cast aluminium housing · Modular inserts",
              image: "/images/cable11.png",
            },
            {
              name: "EPIC MHS Inserts",
              desc: "Insert modules that fit inside EPIC housings, letting you mix power, signal and data contacts in one connector.",
              specs: "Gold-plated crimp contacts · Modular design · Fits EPIC housings",
              image: "/images/cable13.jpg",
            },
          ],
          image: "/images/cable12.png",
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
          items: [
            {
              name: "PKZM0-0.16 to PKZM0-32",
              desc: "Motor-protective circuit-breaker range with an adjustable overload release and short-circuit protection for three-phase motors.",
              specs: "0.16 A to 32 A · Thermal and magnetic release · IEC/EN 60947-4-1",
              image: "/images/eaton-nzm.jpg",
            },
            {
              name: "PKZM01 Pushbutton Starter",
              desc: "Compact manual motor starter with pushbutton start and stop, for switching and protecting small motors.",
              specs: "Pushbutton operation · Thermal and magnetic release · IEC/EN 60947-4-1",
              image: "/images/pkzm0-v2.jpg",
            },
          ],
          image: "/images/eaton-pkzm0.jpg",
        },
        {
          id: "dilm",
          seriesCode: "SERIES 02 // POWER CONTACTORS",
          title: "DILM® Power Contactors & Overload Relays",
          desc: "World-class power contactors engineered for heavy AC-3 motor starting, capacitive switching, and industrial automation with SmartWire-DT connectivity.",
          specs: "3-Pole 7A to 1000A · Electronic AC/DC coils · Low holding power consumption · 10 million operations",
          items: [
            {
              name: "DILM7 to DILM15",
              desc: "Compact contactors for switching small three-phase motors and light industrial loads.",
              specs: "7 A to 15 A (AC-3) · 3-pole · AC/DC coil options",
              image: "/images/dilm-v2.jpg",
            },
            {
              name: "DILM17 to DILM38",
              desc: "Mid-size contactors for larger motors, pumps and compressors in machine and panel builds.",
              specs: "17 A to 38 A (AC-3) · 3-pole · AC/DC coil options",
              image: "/images/eaton-rmq.jpg",
            },
          ],
          image: "/images/eaton-dilm.jpg",
        },
        {
          id: "nzm",
          seriesCode: "SERIES 03 // COMPACT MCCB",
          title: "NZM® Molded Case Circuit Breakers (MCCB)",
          desc: "Compact circuit breakers up to 1600 A with state-of-the-art microprocessor releases, energy monitoring, and comprehensive selectivity for distribution panels.",
          specs: "NZM1 to NZM4 · 20A to 1600A · Breaking capacity 25kA to 150kA · Worldwide market approvals",
          items: [
            {
              name: "NZMN1-A (160A)",
              desc: "Compact molded case circuit-breaker (frame size 1) for feeders and motor circuits up to 160 A.",
              specs: "160 A · NZM1 frame size · IEC/EN 60947-2",
              image: "/images/drives.jpg",
            },
            {
              name: "NZMN2-A250 Electronic",
              desc: "Frame size 2 breaker for main and sub-distribution circuits up to 250 A.",
              specs: "250 A · NZM2 frame size · IEC/EN 60947-2",
              image: "/images/nzm-v2.jpg",
            },
          ],
          image: "/images/eaton-nzm.jpg",
        },
        {
          id: "rmq",
          seriesCode: "SERIES 04 // PILOT DEVICES",
          title: "RMQ-TITAN® Pilot Devices & Control Stations",
          desc: "Ergonomic 22.5 mm pushbuttons, selector switches, LED indicator lights, and emergency stop actuators built for extreme environmental toughness up to IP69K.",
          specs: "IP67 / IP69K front ring · LED illumination >100,000 hrs · Flat modular design · SmartWire compatible",
          items: [
            {
              name: "M22-D Pushbuttons",
              desc: "Flat-front 22.5 mm pushbutton actuators for machine control panels, in multiple colours.",
              specs: "22.5 mm mounting · IP67 / IP69K front ring · Flat modular design",
              image: "/images/eaton-rmq.jpg",
            },
            {
              name: "M22-PV Emergency Stop",
              desc: "Red mushroom-head emergency stop actuator for machine safety circuits.",
              specs: "22.5 mm mounting · Mushroom head · IP67 / IP69K front ring",
              image: "/images/eaton-faz.jpg",
            },
          ],
          image: "/images/eaton-rmq.jpg",
        },
        {
          id: "xpole",
          seriesCode: "SERIES 05 // MCB & RCCB",
          title: "xPole Residential & Commercial MCBs",
          desc: "High-precision miniature circuit breakers and residual current circuit breakers for building automation, data centers, and commercial distribution.",
          specs: "6kA to 15kA breaking capacity · Type A and AC residual current · Dual function arc fault detection",
          items: [
            {
              name: "PLHT Miniature Breakers",
              desc: "Miniature circuit breakers that guard final circuits against overload and short-circuit in distribution boards.",
              specs: "6 kA to 15 kA breaking capacity · Overload and short-circuit protection",
              image: "/images/eaton-drives.jpg",
            },
            {
              name: "FI Residual Current Devices",
              desc: "Residual current breakers that trip on earth-leakage to protect people and installations.",
              specs: "Type A and AC · Residual current protection · For distribution boards",
              image: "/images/xpole-v2.jpg",
            },
          ],
          image: "/images/eaton-pkzm0.jpg",
        },
        {
          id: "easy",
          seriesCode: "SERIES 06 // CONTROL RELAYS",
          title: "easyE4® Micro PLCs & Logic Controllers",
          desc: "Compact control relays designed for straightforward automation tasks, lighting control, and machinery monitoring with built-in web server functionality.",
          specs: "Expandable I/O channels · TFT color display · Ethernet TCP/IP connectivity · 12/24V DC & 240V AC",
          items: [
            {
              name: "easyE4 Base Controllers",
              desc: "Compact control relay base units for lighting, machinery monitoring and simple automation, with Ethernet built in.",
              specs: "Ethernet TCP/IP · Expandable I/O · 12/24V DC & 240V AC",
              image: "/images/gearboxes.jpg",
            },
            {
              name: "Digital Expansion Modules",
              desc: "Expansion modules that add digital inputs and outputs to an easyE4 base controller.",
              specs: "Extra digital I/O channels · Plugs onto the base unit",
              image: "/images/easy-v2.jpg",
            },
          ],
          image: "/images/eaton-dilm.jpg",
        },
        {
          id: "softstarter",
          seriesCode: "SERIES 07 // SOFT STARTERS",
          title: "S801+ & DS7 Digital Soft Starters",
          desc: "Advanced electronic soft starters providing smooth, stress-free acceleration and deceleration for heavy industrial pumps, fans, and compressors.",
          specs: "18A to 1000A ratings · Built-in bypass contactor · Torque control algorithms · LCD diagnostic keypad",
          items: [
            {
              name: "DS7 Compact Soft Starters",
              desc: "Compact digital soft starters with built-in bypass for smooth motor start and stop.",
              specs: "Built-in bypass contactor · Smooth start and stop · Compact housing",
              image: "/images/havells.jpg",
            },
            {
              name: "S801+ High Performance Units",
              desc: "Higher-performance soft starters for pumps, fans and compressors, with torque control and a diagnostic keypad.",
              specs: "Torque control algorithms · LCD diagnostic keypad · Built-in bypass",
              image: "/images/softstarter-v2.jpg",
            },
          ],
          image: "/images/eaton-nzm.jpg",
        },
        {
          id: "ups",
          seriesCode: "SERIES 08 // POWER QUALITY",
          title: "9PX & 9E Online Double Conversion UPS",
          desc: "Enterprise-grade uninterruptible power supplies delivering reliable backup power and clean sine-wave output for critical automation servers and SCADA.",
          specs: "1 kVA to 300 kVA · 95% high efficiency rating · Hot-swappable batteries · ABM battery management",
          items: [
            {
              name: "Eaton 9PX Tower / Rack UPS",
              desc: "Online double-conversion UPS in tower or rack form for servers, network gear and automation systems.",
              specs: "Online double conversion · Hot-swappable batteries · ABM battery management",
              image: "/images/eaton-pkzm0.jpg",
            },
            {
              name: "Eaton 9E Online UPS",
              desc: "Online UPS delivering clean sine-wave power to SCADA and critical automation loads.",
              specs: "Online double conversion · Clean sine-wave output · High efficiency",
              image: "/images/ups-v2.jpg",
            },
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
          items: [
            {
              name: "PA-02 (0.2 - 1.5 mm²)",
              desc: "Closed chevron-cut markers for thin control wires, holding each character in line on dense wire bundles.",
              specs: "Wire 0.2 - 1.5 mm² · Cadmium & silicon-free PVC · UL94-V0",
              image: "/images/partex-po.jpg",
            },
            {
              name: "PA-1 (0.75 - 4.0 mm²)",
              desc: "Closed chevron-cut markers for standard panel wiring, one character per sleeve.",
              specs: "Wire 0.75 - 4.0 mm² · Cadmium & silicon-free PVC · UL94-V0",
              image: "/images/partex-ties.jpg",
            },
          ],
          image: "/images/partex-po.jpg",
        },
        {
          id: "t1000",
          seriesCode: "SERIES T-1000 // THERMAL PRINTER",
          title: "ProMark T-1000 Thermal Transfer Marker Printer",
          desc: "High-speed portable on-site industrial marker printer with 300 dpi resolution. Prints directly on continuous PO profile tubing, heat-shrinkable sleeves, and self-adhesive panel labels.",
          specs: "40 mm/sec print speed · USB PC connection + internal memory · 300 dpi high clarity · Portable battery pack",
          items: [
            {
              name: "ProMark T-1000 Kit",
              desc: "Portable thermal transfer printer kit for printing wire markers and labels on site.",
              specs: "300 dpi · USB connection + internal memory · Portable battery pack",
              image: "/images/partex-pc.jpg",
            },
            {
              name: "MK10 Desktop Machine",
              desc: "Desktop marker printer for workshop and panel-shop production.",
              specs: "Desktop unit · Prints tubing, sleeves and labels",
              image: "/images/partex-pks.jpg",
            },
          ],
          image: "/images/partex-printer.jpg",
        },
        {
          id: "pc",
          seriesCode: "SERIES PC // RETROFIT SNAP-ON",
          title: "PC Clip-On Open Wire Markers",
          desc: "Open snap-on markers designed for direct installation on pre-connected wiring, terminal blocks, and retrofit maintenance without removing wire terminations.",
          specs: "PC-10, PC-20, PC-30, PC-40 · High retention spring clamp · Vibration-proof grip · Fast wand applicator",
          items: [
            {
              name: "PC-10 (2.4 - 3.0 mm)",
              desc: "Snap-on open marker for smaller wires and cables, fitted without disconnecting terminations.",
              specs: "Fits 2.4 - 3.0 mm · Spring clamp retention · Vibration-proof grip",
              image: "/images/partex-pa.jpg",
            },
            {
              name: "PC-20 (3.0 - 4.0 mm)",
              desc: "Snap-on open marker for mid-size wires and cables, for retrofit and maintenance work.",
              specs: "Fits 3.0 - 4.0 mm · Spring clamp retention · Vibration-proof grip",
              image: "/images/partex-po.jpg",
            },
          ],
          image: "/images/partex-steel.jpg",
        },
        {
          id: "pks",
          seriesCode: "SERIES PKS // ACID-PROOF SS316",
          title: "PKS Stainless Steel 316 Acid-Proof Markers",
          desc: "High-grade AISI 316 stainless steel identification tags engineered for extreme marine, chemical plants, offshore oil rigs, and high-temperature fire hazard zones.",
          specs: "AISI 316 Stainless Steel · -80°C to +500°C · Extreme fire, salt spray, and acid resistance",
          items: [
            {
              name: "PKS Embossed Strips",
              desc: "Stainless steel marker strips with embossed characters that survive fire, salt spray and acid.",
              specs: "AISI 316 stainless steel · -80°C to +500°C · Embossed characters",
              image: "/images/partex-ties.jpg",
            },
            {
              name: "PKH Carrier Holders",
              desc: "Holders that carry PKS marker strips and fix them onto cables.",
              specs: "AISI 316 stainless steel · Secure fixing · Corrosion resistant",
              image: "/images/partex-promark.jpg",
            },
          ],
          image: "/images/partex-tags.jpg",
        },
        {
          id: "po",
          seriesCode: "SERIES PO // HEAT SHRINK TUBING",
          title: "PO-060 Heat Shrinkable Wire Markers",
          desc: "Flame-retardant polyolefin heat shrink tubing with a 2:1 shrink ratio, specifically designed for professional high-end aerospace, rail, and military switchboards.",
          specs: "2:1 shrink ratio · MIL-STD cross-linked polyolefin · -55°C to +135°C operating range",
          items: [
            {
              name: "PO-068 Tubing (Black/White)",
              desc: "Flame-retardant heat-shrink tubing for individual wire and cable identification.",
              specs: "2:1 shrink ratio · Cross-linked polyolefin · -55°C to +135°C",
              image: "/images/promo-partex.jpg",
            },
            {
              name: "PO-100 Tubing Reels",
              desc: "Continuous heat-shrink tubing on reels for high-volume printing and marking.",
              specs: "2:1 shrink ratio · Continuous reel · Cross-linked polyolefin",
              image: "/images/partex-pks.jpg",
            },
          ],
          image: "/images/partex-sleeves.jpg",
        },
        {
          id: "pp",
          seriesCode: "SERIES PP // SNAP-ON PROFILE",
          title: "PP Profile Halogen-Free Holders & Strips",
          desc: "Extruded transparent holder profiles combined with card inserts for labeling larger power cables, conduit pipes, and instrument loops.",
          specs: "Halogen-free material · UV stable profile · Secure slide-in insert window",
          items: [
            {
              name: "PP-01 Profile Holders",
              desc: "Transparent holder profiles with card inserts for labelling power cables and instrument loops.",
              specs: "Halogen-free · UV stable · Slide-in insert window",
              image: "/images/slider2.jpg",
            },
            {
              name: "PP-02 Heavy Duty Rails",
              desc: "Heavier rails for marking larger cables, conduit pipes and long runs.",
              specs: "Halogen-free · UV stable · Heavy-duty profile",
              image: "/images/slider1.jpg",
            },
          ],
          image: "/images/partex-printer.jpg",
        },
        {
          id: "mg",
          seriesCode: "SERIES MG // MODULAR PLATES",
          title: "MG-Kdp Modular Push-In Plate Markers",
          desc: "Multi-card plastic tag plates designed for marking control panel pushbuttons, contactors, terminal blocks, and modular DIN enclosures.",
          specs: "Flame retardant polycarbonate · Snap-fit installation · Laser printable",
          items: [
            {
              name: "MG-CPM Panel Plates",
              desc: "Push-in plates for identifying pushbuttons, contactors and other control panel devices.",
              specs: "Flame retardant polycarbonate · Snap-fit installation · Laser printable",
              image: "/images/partex-po.jpg",
            },
            {
              name: "MG-TD Terminal Markers",
              desc: "Modular markers for terminal blocks and DIN enclosure components.",
              specs: "Flame retardant polycarbonate · Snap-fit installation · Laser printable",
              image: "/images/partex-pks.jpg",
            },
          ],
          image: "/images/partex-steel.jpg",
        },
        {
          id: "tk",
          seriesCode: "SERIES TK // CABLE TIE TAGS",
          title: "TK Heavy-Duty Cable Tie Marker Tags",
          desc: "Large format identification plates secured with standard cable ties for heavy cable bundles, conduits, hydraulic hoses, and pole lines.",
          specs: "Rigid PVC / Nylon material · High tensile holding strength · Dual-end tie slots",
          items: [
            {
              name: "TK-1 40x10mm Tags",
              desc: "Compact tie-on tags for identifying cable bundles, hoses and small conduits.",
              specs: "40 x 10 mm · Rigid PVC / Nylon · Dual-end tie slots",
              image: "/images/partex-ties.jpg",
            },
            {
              name: "TK-2 60x15mm Tags",
              desc: "Larger tie-on tags with more space for text on heavy cables, hydraulic hoses and pole lines.",
              specs: "60 x 15 mm · Rigid PVC / Nylon · Dual-end tie slots",
              image: "/images/partex-promark.jpg",
            },
          ],
          image: "/images/partex-tags.jpg",
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
          items: [
            {
              name: "PowerTOP Xtra 16A 5P",
              desc: "16 A five-pole CEE plug with a rubberized slip-proof grip, built for everyday field and workshop use.",
              specs: "16 A · 5-pole · IP44 / IP67 · Nickel-plated pins",
              image: "/images/menn-phase.jpg",
            },
            {
              name: "PowerTOP Xtra 32A 5P",
              desc: "32 A five-pole CEE plug for heavier machines and mobile equipment, with the same tough housing and grip.",
              specs: "32 A · 5-pole · IP44 / IP67 · Nickel-plated pins",
              image: "/images/powertop-v2.jpg",
            },
          ],
          image: "/images/menn-powertop.jpg",
        },
        {
          id: "amaxx",
          seriesCode: "SERIES 02 // RECEPTACLE COMBOS",
          title: "AMAXX® Receptacle Combination Enclosures",
          desc: "Modular, pre-wired power distribution units fabricated from high-impact AMAPLAST polymer. Configurable with MCBs, RCCBs, and CEE receptacles for manufacturing lines.",
          specs: "AMAPLAST impact polymer · IP44 / IP67 · Custom DIN rail windows · Pre-wired & factory tested",
          items: [
            {
              name: "AMAXX® 2-Gang Wall Units",
              desc: "Pre-wired two-gang wall enclosure with CEE receptacles and protective devices for smaller work areas.",
              specs: "2-gang · AMAPLAST impact polymer · IP44 / IP67 · Pre-wired & factory tested",
              image: "/images/menn-duo.jpg",
            },
            {
              name: "AMAXX® 4-Gang Enclosures",
              desc: "Pre-wired four-gang enclosure for production lines and workshops that need more outlets in one unit.",
              specs: "4-gang · AMAPLAST impact polymer · IP44 / IP67 · Pre-wired & factory tested",
              image: "/images/amaxx-v2.jpg",
            },
          ],
          image: "/images/menn-amaxx.jpg",
        },
        {
          id: "evergum",
          seriesCode: "SERIES 03 // VULCANIZED RUBBER",
          title: "EverGUM® Solid Rubber Field Distributors",
          desc: "Virtually indestructible portable and wall-mount distribution boxes manufactured from solid vulcanized rubber, resistant to harsh acids, oils, and severe drop impacts.",
          specs: "Solid vulcanized synthetic rubber · Crush & drop proof · IP44 / IP67 · Safety yellow & black casing",
          items: [
            {
              name: "EverGUM® Portable Boxes",
              desc: "Solid rubber portable distribution boxes that shrug off drops, crushing, oils and acids on site.",
              specs: "Solid vulcanized rubber · Crush & drop proof · IP44 / IP67",
              image: "/images/menn-evergum.jpg",
            },
            {
              name: "EverGUM® Floor Stands",
              desc: "Floor-standing solid rubber distributors for fixed or semi-fixed power points in rough environments.",
              specs: "Solid vulcanized rubber · Floor-standing · IP44 / IP67",
              image: "/images/promo-mennekes.jpg",
            },
          ],
          image: "/images/menn-evergum.jpg",
        },
        {
          id: "panel",
          seriesCode: "SERIES 04 // PANEL RECEPTACLES",
          title: "CEE Panel Sockets & DUO Interlocked Switches",
          desc: "Surface and panel-mount industrial CEE receptacles with mechanical interlocks that prevent withdrawal under electrical load for total plant personnel safety.",
          specs: "Mechanical interlock DUO switch · IP44 / IP67 · Nickel-plated brass terminals · Padlockable handle",
          items: [
            {
              name: "Panel Sockets Straight",
              desc: "Straight panel-mount CEE receptacles for building into machines and distribution enclosures.",
              specs: "Straight panel mount · IP44 / IP67 · Nickel-plated brass terminals",
              image: "/images/menn-powertop.jpg",
            },
            {
              name: "DUO Interlocked Sockets",
              desc: "Interlocked socket-switch combinations that prevent plug withdrawal under load.",
              specs: "Mechanical interlock · Padlockable handle · IP44 / IP67",
              image: "/images/panel-v2.jpg",
            },
          ],
          image: "/images/menn-phase.jpg",
        },
        {
          id: "ceeviu",
          seriesCode: "SERIES 05 // REFRIGERATED CONTAINER",
          title: "CEE-IU Refrigerated Container Sockets",
          desc: "Interlocked switched socket outlets specially designed for refrigerated containers (reefer plugs) in ports, logistics yards, and container ships.",
          specs: "32A 3P+N+E 3h (yellow voltage code) · IP67 watertight · Built-in phase inverter",
          items: [
            {
              name: "Reefer Sockets 32A",
              desc: "Interlocked switched sockets for reefer containers in ports, logistics yards and on ships.",
              specs: "32 A 3P+N+E · IP67 watertight · Interlocked switch",
              image: "/images/menn-powertop.jpg",
            },
            {
              name: "CEE Plug 3h Yellow",
              desc: "Matching reefer plug with yellow 3h voltage coding and a built-in phase inverter.",
              specs: "3h yellow voltage code · IP67 watertight · Built-in phase inverter",
              image: "/images/menn-evergum.jpg",
            },
          ],
          image: "/images/menn-powertop.jpg",
        },
        {
          id: "amatur",
          seriesCode: "SERIES 06 // PILLAR DISTRIBUTION",
          title: "AMATUR® Outdoor Energy & Lighting Pillars",
          desc: "Stainless steel energy and lighting distribution pillars for marinas, camping grounds, public squares, and industrial loading docks.",
          specs: "V2A Stainless Steel housing · Lockable service doors · Integrated CEE and Schuko sockets",
          items: [
            {
              name: "AMATUR Marina Pillar",
              desc: "Stainless steel distribution pillar giving boats and docks a safe, weatherproof power point.",
              specs: "V2A stainless steel · Lockable service door · CEE and Schuko sockets",
              image: "/images/menn-amaxx.jpg",
            },
            {
              name: "Camping Distribution Column",
              desc: "Distribution column for camping grounds and public sites, with lockable access and mixed sockets.",
              specs: "V2A stainless steel · Lockable service door · CEE and Schuko sockets",
              image: "/images/menn-phase.jpg",
            },
          ],
          image: "/images/menn-amaxx.jpg",
        },
        {
          id: "toptr",
          seriesCode: "SERIES 07 // PORTABLE ADAPTERS",
          title: "TOP-TROPIC Industrial Cable Reels & Splitters",
          desc: "Robust rubber and steel cable drums and mobile splitters designed for construction sites, outdoor events, and emergency power supply squads.",
          specs: "Thermal cut-out protection · Heavy-duty rubberized drums · IP44 spray-proof outlets",
          items: [
            {
              name: "TOP-TROPIC Cable Drums",
              desc: "Rubberized cable drums for construction sites, events and temporary power supply.",
              specs: "Thermal cut-out protection · Heavy-duty rubberized drum · IP44 outlets",
              image: "/images/menn-duo.jpg",
            },
            {
              name: "Rubber Portable Splitters",
              desc: "Portable rubber splitters that turn one supply into several outlets on site.",
              specs: "Rubber housing · IP44 spray-proof outlets · Portable",
              image: "/images/toptr-v2.jpg",
            },
          ],
          image: "/images/socket2.png",
        },
        {
          id: "lowvolt",
          seriesCode: "SERIES 08 // EXTRA LOW VOLTAGE",
          title: "Extra-Low Voltage 20V to 50V CEE Plugs",
          desc: "Specialized industrial plugs and sockets designed for safety extra-low voltage applications in confined metal vessels, boilers, and wet underground maintenance.",
          specs: "24V / 42V / 50V AC/DC · Mechanical keying prevents wrong voltage insertion · Frequency specific pins",
          items: [
            {
              name: "ELV Panel Sockets 24V",
              desc: "Panel-mount extra-low voltage sockets for safe supply inside boilers, tanks and wet areas.",
              specs: "24 V · Panel mount · Mechanical keying prevents wrong voltage",
              image: "/images/menn-panel.jpg",
            },
            {
              name: "ELV Portable Plugs",
              desc: "Portable plugs for extra-low voltage tools and lamps in confined metal vessels.",
              specs: "24 V / 42 V / 50 V · Frequency specific pins · Keyed against wrong voltage",
              image: "/images/socket1.png",
            },
          ],
          image: "/images/menn-panel.jpg",
        },
      ],
    },
  };

  const currentBrand = brandProfiles[selectedBrandId] || brandProfiles.lapp;
  const activeSeries = currentBrand.series[activeSeriesIndex] || currentBrand.series[0];

  // Each series shows its two products, each with its own image, description and specs.
  // Image fallback order: product image -> series image -> /images/card-cables.jpg
  const detailRows = activeSeries.items.slice(0, 2);

  const handleBrandChange = (brandId: string) => {
    setSelectedBrandId(brandId);
    setActiveSeriesIndex(0);
  };

  return (
    <section className="py-14 lg:py-20 hybrid-light-bg border-b border-[#E2E8F0] select-none" id="brandPortfolios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B0F17] tracking-tight">
            Authorized Brands Portfolio
          </h2>
          <p className="text-sm text-[#475569] leading-relaxed">
            Select a manufacturer below to see Products Details.
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

        {/* SPLIT DOSSIER & SPEC VAULT */}
        <div
          ref={showcaseRef}
          className={`rounded-[2.5rem] p-6 sm:p-10 border relative overflow-hidden transition-all duration-700 ${currentBrand.containerBg}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">

            {/* LEFT COLUMN: EXECUTIVE DOSSIER & SERIES SELECTOR */}
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

              {/* SERIES SELECTOR TABS (2-COLUMN GRID) */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 font-bold block">
                  Products Range ({currentBrand.series.length}):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentBrand.series.map((s, idx) => {
                    const isSeriesActive = activeSeriesIndex === idx;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setActiveSeriesIndex(idx)}
                        className={`w-full p-3.5 rounded-xl text-left transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                          isSeriesActive
                            ? `${currentBrand.themeBg} text-slate-950 border-white font-black shadow-lg scale-[1.01]`
                            : "bg-black/30 text-slate-200 border-white/10 hover:bg-black/50"
                        }`}
                      >
                        <span className={`text-[9px] font-mono uppercase block tracking-wider mb-0.5 ${isSeriesActive ? "text-slate-900 font-bold" : "text-slate-400"}`}>
                          SERIES {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-bold text-xs tracking-tight line-clamp-1">{s.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ONE HEADER CARD, THEN ROWS OF [IMAGE CARD | DESCRIPTION + PARAMETERS] */}
            <div className="lg:col-span-7 flex self-stretch">
              <div className="w-full h-full flex flex-col bg-white/95 backdrop-blur-md text-slate-900 rounded-3xl p-6 sm:p-8 border border-white/40 shadow-xl">

                {/* Header: series code + title on the left, Authorized Stock pill on the right */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
                  <div className="min-w-0">
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${currentBrand.accentText} font-bold block`}>
                      {activeSeries.seriesCode}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-0.5">
                      {activeSeries.title}
                    </h4>
                  </div>
                  <span className={`shrink-0 px-3 py-1 rounded-full font-mono text-[10px] font-bold border flex items-center gap-1.5 ${currentBrand.badgeStyle}`}>
                    <ShieldCheck size={12} /> Authorized Stock
                  </span>
                </div>

                {/* Rows */}
                <div className="flex-1 flex flex-col justify-evenly gap-5 pt-6">
                  {detailRows.map((item, rowIdx) => (
                    <div
                      key={`${activeSeries.id}-${rowIdx}`}
                      className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
                    >
                      {/* Left: image card (white tile with a light grey image well) */}
                      <div className="md:col-span-5">
                        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-md">
                          <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain rounded-xl"
                              onError={(e) => {
                                const img = e.currentTarget;
                                if (!img.src.endsWith(activeSeries.image)) {
                                  img.src = activeSeries.image;
                                  return;
                                }
                                img.onerror = null;
                                img.src = "/images/card-cables.jpg";
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: description + Technical Parameters card */}
                      <div className="md:col-span-7 space-y-4">
                        <h5 className="text-base font-black text-slate-950 tracking-tight">
                          {item.name}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                          {item.desc}
                        </p>

                        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-md space-y-1.5 font-mono text-xs">
                          <div className={`text-[10px] font-bold ${currentBrand.accentText} uppercase tracking-wider flex items-center gap-1.5`}>
                            <ShieldCheck size={13} /> Technical Parameters
                          </div>
                          <p className="text-slate-700 leading-snug">{item.specs}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
